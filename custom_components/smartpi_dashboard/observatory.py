"""Read-only HA observer and admin API for local notes and observed episodes."""

from copy import deepcopy
import asyncio
from collections import deque
from datetime import timedelta
import logging
from time import monotonic
from uuid import uuid4

import probatio

from homeassistant.components import websocket_api
from homeassistant.const import EVENT_HOMEASSISTANT_STOP, EVENT_STATE_CHANGED
from homeassistant.core import CoreState, HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.event import async_track_time_interval
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import DOMAIN
from .observations import ObservationBook

_LOGGER = logging.getLogger(__name__)
STORAGE_KEY = f"{DOMAIN}.observatory"


class Observatory:
    """Observe published states without requesting or altering regulation."""

    def __init__(self, hass: HomeAssistant):
        self.hass = hass
        self.store = Store(hass, 1, STORAGE_KEY, private=True, atomic_writes=True)
        self.book = ObservationBook()
        self.unsubscribers = []
        self._requests = asyncio.Lock()
        self._stopped = False
        self._reads = deque()
        self._writes = deque()
        self._save_scheduled = False

    @staticmethod
    def now():
        return dt_util.utcnow().timestamp()

    @staticmethod
    def at(root, path):
        for key in path.split("."):
            root = root.get(key) if isinstance(root, dict) else None
        return root

    def snapshot(self, entity_id):
        sensor = self.hass.states.get(entity_id)
        if sensor is None or not entity_id.startswith("sensor.") or sensor.attributes.get("schema_version") != 2:
            return None
        if not isinstance(sensor.attributes.get("live"), dict) or not isinstance(sensor.attributes.get("history"), dict):
            return None
        climates = [s for s in self.hass.states.async_all("climate") if self.at(s.attributes, "specific_states.regulation_diagnostics") == entity_id]
        climate = climates[0] if len(climates) == 1 else None
        available = sensor.state not in ("unknown", "unavailable") and climate is not None and climate.state not in ("unknown", "unavailable")
        live = sensor.attributes["live"] if available else {}
        attrs = climate.attributes if climate is not None else {}
        unit = self.at(attrs, "configuration.temperature_unit") or attrs.get("temperature_unit") or self.hass.config.units.temperature_unit
        n = ObservationBook.number
        twin = lambda key: self.at(live, f"analysis.twin.{key}")
        return {"time": sensor.last_updated.timestamp(), "observed_at": self.now(), "revision": sensor.last_updated.isoformat(), "available": available, "climate_id": climate.entity_id if climate else None, "climate_time": climate.last_updated.timestamp() if climate else None,
                "temperature": n(self.at(live, "temperature.indoor")), "outdoor": n(self.at(live, "temperature.outdoor")), "target": n(attrs.get("temperature")) if available else None,
                "filtered": n(self.at(live, "setpoint.filtered_setpoint")), "preset": attrs.get("preset_mode"), "mode": climate.state if climate else None, "unit": unit if unit in ("°C", "°F") else None,
                "applied": n(self.at(live, "power.applied_percent")),
                "twin": {"status": twin("twin_status"), "model_reliable": twin("twin_model_reliable"), "warming_up": twin("twin_warming_up"), "tau_reliable": self.at(live, "model.tau_reliable"), "eta_s": n(twin("eta_s")), "reason": twin("eta_reason")}}

    async def start(self):
        data = await self.store.async_load()
        self.book = ObservationBook(data, self.now())
        self.book.expire(self.now())
        for sensor in self.hass.states.async_all("sensor"):
            point = self.snapshot(sensor.entity_id)
            if point is not None and (sensor.entity_id in self.book.data["rooms"] or len(self.book.data["rooms"]) < ObservationBook.MAX_ROOMS):
                self.book.observe(sensor.entity_id, point, published=False)
        self.unsubscribers = [self.hass.bus.async_listen(EVENT_STATE_CHANGED, self.on_state),
                              async_track_time_interval(self.hass, self.on_time, timedelta(minutes=1)),
                              self.hass.bus.async_listen_once(EVENT_HOMEASSISTANT_STOP, self.on_stop)]
        self.schedule_save()

    @callback
    def schedule_save(self):
        if not self._stopped and not self._save_scheduled:
            self._save_scheduled = True
            self.store.async_delay_save(self.pending_data, 30)

    @callback
    def pending_data(self):
        """Release the throttle when HA consumes the pending snapshot."""
        self._save_scheduled = False
        return self.book.data

    @callback
    def on_state(self, event):
        if self._stopped:
            return
        entity_id = event.data.get("entity_id", "")
        if not entity_id.startswith(("sensor.", "climate.")):
            return
        if entity_id.startswith("sensor."):
            targets = [entity_id]
        else:
            new_state = event.data.get("new_state")
            old_state = event.data.get("old_state")
            targets = list({link for state in (new_state, old_state) if state is not None
                            if isinstance(link := self.at(state.attributes, "specific_states.regulation_diagnostics"), str)})
        for target in targets:
            point = self.snapshot(target)
            if point is None:
                old = self.book.data["rooms"].get(target, {}).get("current")
                if old:
                    point = {**old, "available": False, "target": None, "climate_id": None, "observed_at": self.now()}
                else:
                    continue
            if target not in self.book.data["rooms"] and len(self.book.data["rooms"]) >= ObservationBook.MAX_ROOMS:
                continue
            self.book.observe(target, point, published=entity_id.startswith("sensor."))
            self.schedule_save()

    @callback
    def on_time(self, _now):
        if self._stopped:
            return
        self.book.expire(self.now())
        self.schedule_save()

    async def on_stop(self, _event):
        await self.stop()

    async def stop(self):
        if self._stopped:
            return
        self._stopped = True
        for unsubscribe in self.unsubscribers:
            unsubscribe()
        self.unsubscribers = []
        async with self._requests:
            await self.store.async_save(deepcopy(self.book.data))

    def admit(self, action):
        """Bound API work globally; the endpoint is already admin-only."""
        times, limit = (self._reads, 120) if action == "get" else (self._writes, 30)
        now = monotonic()
        while times and times[0] <= now - 60:
            times.popleft()
        if len(times) >= limit:
            raise ValueError("Trop de demandes. Attendez une minute avant de réessayer.")
        times.append(now)

    async def save_confirmed(self):
        """Store may log write failures instead of raising: verify a disk read."""
        write_id = uuid4().hex
        self.book.data["write_id"] = write_id
        self._save_scheduled = False
        await self.store.async_save(deepcopy(self.book.data))
        try:
            # A separate instance has no pending in-memory save to return.
            saved = await Store(self.hass, 1, STORAGE_KEY, read_only=True).async_load()
        except HomeAssistantError as error:
            raise OSError("Local save could not be verified") from error
        if not isinstance(saved, dict) or saved.get("write_id") != write_id:
            raise OSError("Local save was not confirmed")

    async def request(self, entity_id, action, payload):
        ObservationBook.validate_request(entity_id, action, payload)
        self.admit(action)
        async with self._requests:
            if self._stopped or self.hass.state is CoreState.stopping:
                raise ValueError("L’observatoire est en cours d’arrêt. Rechargez le panneau après redémarrage.")
            point = self.snapshot(entity_id)
            if point is None:
                raise ValueError("Diagnostic SmartPI v2 introuvable.")
            self.book.observe(entity_id, point, published=False)
            result = self.book.action(entity_id, action, payload, self.now())
            if action != "get":
                await self.save_confirmed()
            return deepcopy(result)


@websocket_api.websocket_command({
    probatio.Required("type"): "smartpi_dashboard/observatory",
    probatio.Required("entity_id"): str,
    probatio.Required("action"): probatio.In(("get", "clear", "bookmark_save", "bookmark_delete", "trial_start", "trial_stop", "trial_feedback", "trial_delete", "forecast_delete", "receipt_delete", "receipt_begin", "receipt_finish")),
    probatio.Optional("payload", default={}): dict,
})
@websocket_api.require_admin
@websocket_api.async_response
async def handle_observatory(hass, connection, msg):
    observer = hass.data.get(DOMAIN, {}).get("observatory")
    if observer is None:
        connection.send_error(msg["id"], "not_loaded", "L’observatoire n’est pas chargé.")
        return
    try:
        result = await observer.request(msg["entity_id"], msg["action"], msg["payload"])
    except ValueError as error:
        connection.send_error(msg["id"], "invalid_request", str(error))
    except OSError:
        _LOGGER.exception("Cannot persist the local SmartPI observation book")
        connection.send_error(msg["id"], "storage_error", "Sauvegarde non confirmée. Actualisez le carnet avant de réessayer et vérifiez le stockage Home Assistant.")
    else:
        connection.send_result(msg["id"], result)


@callback
def register_api(hass):
    data = hass.data.setdefault(DOMAIN, {})
    if not data.get("observatory_api_registered"):
        websocket_api.async_register_command(hass, handle_observatory)
        data["observatory_api_registered"] = True
