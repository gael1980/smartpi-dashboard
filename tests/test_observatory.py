"""Observer, persistence and admin-only API against actual HA APIs, synthetic states."""
import importlib.util
import asyncio
from copy import deepcopy
import tempfile
import unittest
from types import SimpleNamespace
from unittest.mock import AsyncMock, Mock, patch

HA_AVAILABLE = importlib.util.find_spec("homeassistant") is not None


@unittest.skipUnless(HA_AVAILABLE, "Requires Home Assistant")
class ObservatoryTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        from homeassistant.core import HomeAssistant
        from custom_components.smartpi_dashboard.observatory import Observatory
        self.temp = tempfile.TemporaryDirectory()
        self.hass = HomeAssistant(self.temp.name)
        self.climate_attrs = {"temperature": 20, "preset_mode": "comfort", "specific_states": {"regulation_diagnostics": "sensor.demo"}, "configuration": {"temperature_unit": "°C"}}
        self.sensor_attrs = {"schema_version": 2, "history": {}, "live": {"temperature": {"indoor": 19, "outdoor": 8}, "model": {"tau_reliable": True}, "analysis": {"twin": {"twin_status": "ok", "twin_model_reliable": True, "twin_warming_up": False, "eta_s": 1800, "eta_reason": "ok"}}}}
        self.hass.states.async_set("climate.demo", "heat", self.climate_attrs)
        self.hass.states.async_set("sensor.demo", "stable", self.sensor_attrs)
        self.observer = Observatory(self.hass)
        await self.observer.start()

    async def asyncTearDown(self):
        await self.observer.stop()
        await self.hass.async_stop()
        self.temp.cleanup()

    async def test_snapshot_uses_explicit_unique_link_and_native_temperatures(self):
        p = self.observer.snapshot("sensor.demo")
        self.assertEqual((p["target"], p["temperature"], p["unit"], p["climate_id"]), (20, 19, "°C", "climate.demo"))
        self.hass.states.async_set("climate.other", "heat", self.climate_attrs)
        self.assertFalse(self.observer.snapshot("sensor.demo")["available"])

    async def test_bookmark_round_trip_via_native_store(self):
        from homeassistant.helpers.storage import Store
        result = await self.observer.request("sensor.demo", "bookmark_save", {"label": "Lecture"})
        saved = await Store(self.hass, 1, "smartpi_dashboard.observatory").async_load()
        self.assertEqual(saved["rooms"]["sensor.demo"]["bookmarks"][0]["label"], "Lecture")
        self.assertEqual(len(result["bookmarks"]), 1)
        await self.observer.request("sensor.demo", "bookmark_delete", {"id": result["bookmarks"][0]["id"]})
        self.assertEqual((await self.observer.request("sensor.demo", "get", {}))["bookmarks"], [])

    async def test_state_changes_collect_without_a_panel_or_service_call(self):
        self.sensor_attrs = deepcopy(self.sensor_attrs)
        self.sensor_attrs["live"]["temperature"]["indoor"] = 19.1
        self.hass.states.async_set("sensor.demo", "stable", self.sensor_attrs)
        await self.hass.async_block_till_done()
        room = self.observer.book.export("sensor.demo")
        self.assertEqual(len(room["forecasts"]), 1)
        self.assertEqual(room["forecasts"][0]["temperature"], 19.1)
        self.assertEqual(self.hass.states.get("climate.demo").attributes["temperature"], 20)

    async def test_stop_detaches_the_state_listener(self):
        await self.observer.stop()
        self.sensor_attrs = deepcopy(self.sensor_attrs)
        self.sensor_attrs["live"]["temperature"]["indoor"] = 19.3
        self.hass.states.async_set("sensor.demo", "stable", self.sensor_attrs)
        await self.hass.async_block_till_done()
        self.assertEqual(self.observer.book.export("sensor.demo")["forecasts"], [])

    async def test_removal_of_source_interrupts_the_trial_immediately(self):
        await self.observer.request("sensor.demo", "trial_start", {"label": "Avant retrait"})
        self.hass.states.async_remove("sensor.demo")
        await self.hass.async_block_till_done()
        room = self.observer.book.export("sensor.demo")
        self.assertFalse(room["current"]["available"])
        self.assertEqual(room["trials"][0]["status"], "excluded")

    async def test_ws_requires_admin_and_has_strict_action_schema(self):
        from homeassistant.exceptions import Unauthorized
        from custom_components.smartpi_dashboard.observatory import handle_observatory
        conn = SimpleNamespace(user=SimpleNamespace(is_admin=False), send_result=Mock(), send_error=Mock())
        msg = {"id": 1, "type": "smartpi_dashboard/observatory", "entity_id": "sensor.demo", "action": "get", "payload": {}}
        with self.assertRaises(Unauthorized):
            handle_observatory(self.hass, conn, msg)
        conn.send_result.assert_not_called()
        schema = handle_observatory._ws_schema
        self.assertEqual(schema(msg)["action"], "get")
        with self.assertRaises(Exception):
            schema({**msg, "action": "call_service"})

    async def test_unloaded_api_returns_error_without_creating_observations(self):
        from custom_components.smartpi_dashboard.observatory import handle_observatory
        conn = SimpleNamespace(user=SimpleNamespace(is_admin=True), send_result=Mock(), send_error=Mock(), async_handle_exception=Mock())
        msg = {"id": 1, "type": "smartpi_dashboard/observatory", "entity_id": "sensor.demo", "action": "get", "payload": {}}
        handle_observatory(self.hass, conn, msg)
        await self.hass.async_block_till_done()
        conn.send_error.assert_called_once_with(1, "not_loaded", "L’observatoire n’est pas chargé.")
        conn.send_result.assert_not_called()

    async def test_missing_diagnostic_and_unavailable_state_refuse_bookmarks(self):
        with self.assertRaises(ValueError):
            await self.observer.request("sensor.missing", "bookmark_save", {"label": "Absent"})
        self.hass.states.async_set("sensor.demo", "unavailable", self.sensor_attrs)
        with self.assertRaises(ValueError):
            await self.observer.request("sensor.demo", "bookmark_save", {"label": "Absent"})

    async def test_write_failure_is_not_acknowledged_as_saved(self):
        from homeassistant.util.file import WriteError
        await self.observer.request("sensor.demo", "bookmark_save", {"label": "Avant panne"})
        with patch("homeassistant.helpers.storage._FileStoreIO.async_write", AsyncMock(side_effect=WriteError("disk full"))):
            with self.assertRaises(OSError):
                await self.observer.request("sensor.demo", "bookmark_save", {"label": "Non confirmé"})

    async def test_store_is_private_on_disk(self):
        import os
        from pathlib import Path
        await self.observer.request("sensor.demo", "bookmark_save", {"label": "Privé"})
        mode = os.stat(Path(self.temp.name) / ".storage/smartpi_dashboard.observatory").st_mode & 0o777
        self.assertEqual(mode, 0o600)

    async def test_continuous_publications_do_not_postpone_the_pending_save(self):
        from custom_components.smartpi_dashboard.observatory import Observatory
        observer = Observatory(self.hass)
        with patch.object(observer.store, "async_delay_save") as delayed:
            for _ in range(100):
                observer.schedule_save()
            self.assertEqual(delayed.call_count, 1)
            # The first scheduled write consumes its current snapshot.
            delayed.call_args.args[0]()
            observer.schedule_save()
            self.assertEqual(delayed.call_count, 2)

    async def test_unloaded_observer_refuses_previously_queued_requests(self):
        await self.observer.stop()
        with self.assertRaises(ValueError):
            await self.observer.request("sensor.demo", "bookmark_save", {"label": "Trop tard"})

    async def test_malformed_payload_is_rejected_before_mutation(self):
        for action, payload in (("bookmark_save", {"label": "A", "extra": "unexpected"}),
                                ("trial_feedback", {"id": {}, "feedback": "good"}),
                                ("receipt_finish", {"id": "x", "success": "yes"}),
                                ("clear", {"unexpected": True})):
            with self.subTest(action=action), self.assertRaises(ValueError):
                await self.observer.request("sensor.demo", action, payload)

    async def test_requests_are_serialized_and_stop_waits_for_the_active_save(self):
        entered, release = asyncio.Event(), asyncio.Event()
        original = self.observer.save_confirmed

        async def slow_save():
            entered.set()
            await release.wait()
            await original()

        with patch.object(self.observer, "save_confirmed", slow_save):
            first = asyncio.create_task(self.observer.request("sensor.demo", "bookmark_save", {"label": "Premier"}))
            await entered.wait()
            second = asyncio.create_task(self.observer.request("sensor.demo", "bookmark_save", {"label": "Deuxième"}))
            await asyncio.sleep(0)
            self.assertEqual(len(self.observer.book.room("sensor.demo")["bookmarks"]), 1)
            stopping = asyncio.create_task(self.observer.stop())
            await asyncio.sleep(0)
            self.assertFalse(stopping.done())
            release.set()
            await first
            with self.assertRaises(ValueError):
                await second
            await stopping

    async def test_metadata_write_rate_is_bounded_without_blocking_reads(self):
        for _ in range(30):
            self.observer.admit("bookmark_save")
        with self.assertRaises(ValueError):
            await self.observer.request("sensor.demo", "bookmark_save", {"label": "Trop"})
        self.assertEqual((await self.observer.request("sensor.demo", "get", {}))["bookmarks"], [])

    async def test_observations_received_during_save_are_not_discarded(self):
        entered, release = asyncio.Event(), asyncio.Event()
        original = self.observer.store.async_save

        async def slow_save(data):
            entered.set()
            await release.wait()
            await original(data)

        with patch.object(self.observer.store, "async_save", slow_save):
            task = asyncio.create_task(self.observer.request("sensor.demo", "bookmark_save", {"label": "Pendant"}))
            await entered.wait()
            attrs = deepcopy(self.sensor_attrs)
            attrs["live"]["temperature"]["indoor"] = 19.4
            self.hass.states.async_set("sensor.demo", "stable", attrs)
            await asyncio.sleep(0)
            release.set()
            await task
            self.assertEqual(self.observer.book.export("sensor.demo")["current"]["temperature"], 19.4)


if __name__ == "__main__":
    unittest.main()
