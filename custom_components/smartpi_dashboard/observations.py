"""Bounded, descriptive observations. No controller, services or thermal estimator."""

from copy import deepcopy
from math import isfinite
import re
from uuid import uuid4


class ObservationBook:
    """Own the locally observed episodes and user-authored comfort notes."""

    MAX_ROOMS = 32
    MAX_POINTS = 1200
    MAX_RECEIPTS = 50
    MAX_TRIALS = 50
    MAX_FORECASTS = 100
    MAX_BOOKMARKS = 30
    GAP_S = 600

    @classmethod
    def validate_request(cls, entity_id, action, payload):
        """Validate the entire metadata request before touching a room."""
        fields = {"get": (), "clear": (), "bookmark_save": ("label",),
                  "trial_start": ("label",), "trial_stop": ("id",),
                  "trial_feedback": ("id", "feedback"), "receipt_begin": ("choice",),
                  "receipt_finish": ("id", "success", "not_sent"),
                  **{f"{kind}_delete": ("id",) for kind in ("bookmark", "trial", "receipt", "forecast")}}
        if not isinstance(entity_id, str) or not re.fullmatch(r"sensor\.[a-z0-9_]{1,248}", entity_id):
            raise ValueError("Identifiant de diagnostic invalide.")
        if not isinstance(action, str) or action not in fields or not isinstance(payload, dict) or payload.keys() - set(fields[action]):
            raise ValueError("Requête de métadonnées invalide.")
        required = set(fields[action]) - {"not_sent"}
        if required - payload.keys():
            raise ValueError("Requête de métadonnées incomplète.")
        for key in ("id", "label"):
            if key in payload:
                cls.label(payload[key])
        if action == "trial_feedback" and payload["feedback"] not in ("good", "cold", "hot", "unknown"):
            raise ValueError("Ressenti invalide.")
        if action == "receipt_finish" and (type(payload["success"]) is not bool or ("not_sent" in payload and type(payload["not_sent"]) is not bool)):
            raise ValueError("Résultat de commande invalide.")
        if action == "receipt_begin":
            choice = payload["choice"]
            if not isinstance(choice, dict) or set(choice) != {"kind", "value"} or choice["kind"] not in ("temperature", "preset"):
                raise ValueError("Choix invalide.")
            if choice["kind"] == "temperature":
                if cls.number(choice["value"]) is None:
                    raise ValueError("Température invalide.")
            else:
                cls.label(choice["value"])

    def __init__(self, data=None, now=0):
        if data is not None:
            self.validate_saved(data)
        self.data = deepcopy(data) if data is not None else {"version": 1, "rooms": {}}
        for room in self.data["rooms"].values():
            for group in ("forecasts", "trials", "receipts"):
                for item in room.get(group, []):
                    if item.get("status") == "pending":
                        self._end(item, now, "Redémarrage de l’observation")
            room["forecast_context"] = None
            room["revision"] = None

    @classmethod
    def validate_saved(cls, data):
        """Fail before mutating or replacing an incompatible local book."""
        def require(condition):
            if not condition:
                raise ValueError("Carnet local invalide ; données conservées.")

        def text(value):
            return isinstance(value, str) and 0 < len(value) <= 100

        def timestamp(value):
            return cls.number(value) is not None and 0 <= value <= 8.64e12

        def nullable(value):
            return value is None or cls.number(value) is not None

        if not isinstance(data, dict) or type(data.get("version")) is not int or data["version"] != 1:
            raise ValueError("Version du carnet local non prise en charge ; données conservées.")
        require(isinstance(data.get("rooms"), dict) and len(data["rooms"]) <= cls.MAX_ROOMS)
        for entity_id, room in data["rooms"].items():
            cls.validate_request(entity_id, "get", {})
            require(isinstance(room, dict))
            current = room.get("current")
            require(current is None or (isinstance(current, dict) and timestamp(current.get("time"))))
            limits = {"points": cls.MAX_POINTS, "bookmarks": cls.MAX_BOOKMARKS,
                      "receipts": cls.MAX_RECEIPTS, "trials": cls.MAX_TRIALS, "forecasts": cls.MAX_FORECASTS}
            for group, limit in limits.items():
                items = room.get(group)
                require(isinstance(items, list) and len(items) <= limit)
                for item in items:
                    require(isinstance(item, dict))
                    if group == "points":
                        require(timestamp(item.get("time")))
                        require(all(nullable(item.get(k)) for k in ("temperature", "target", "outdoor", "applied")))
                        continue
                    require(text(item.get("id")))
                    require(timestamp(item.get("created_at" if group == "bookmarks" else "started_at")))
                    require(all(k not in item or timestamp(item[k]) for k in ("ended_at", "applied_at", "response_at", "observed_at")))
                    if group == "bookmarks":
                        require(text(item.get("label")) and item.get("unit") in ("°C", "°F"))
                        require(all(cls.number(item.get(k)) is not None for k in ("target", "temperature")))
                        require(nullable(item.get("outdoor")) and (item.get("preset") is None or text(item["preset"])))
                        continue
                    allowed = ("pending", "observed", "excluded") if group == "receipts" else ("pending", "finished", "excluded") if group == "trials" else ("pending", "reached", "excluded")
                    require(item.get("status") in allowed)
                    if group == "receipts":
                        cls.validate_request(entity_id, "receipt_begin", {"choice": item.get("choice")})
                        require(text(item.get("climate_id")) and item.get("unit") in (None, "°C", "°F"))
                        require(item.get("service_result") in ("pending", "accepted", "uncertain"))
                        require(item.get("confirmed_at") is None or timestamp(item["confirmed_at"]))
                        continue
                    require(isinstance(item.get("context"), list) and len(item["context"]) == 4)
                    require(cls.number(item.get("target")) is not None and item.get("unit") in ("°C", "°F"))
                    if group == "trials":
                        require(text(item.get("label")) and item.get("feedback") in ("unknown", "good", "cold", "hot"))
                        stats = item.get("stats")
                        require(isinstance(stats, dict) and type(stats.get("publications")) is int and stats["publications"] >= 0)
                        require(all(k in stats and nullable(stats[k]) for k in ("minimum", "maximum", "last", "max_abs_error", "outdoor_min", "outdoor_max")))
                        require(all(k in stats and (stats[k] is None or timestamp(stats[k])) for k in ("first_at", "last_at")))
                    else:
                        require(cls.number(item.get("eta_s")) is not None and 0 < item["eta_s"] <= 48 * 3600)
                        require(cls.number(item.get("temperature")) is not None)
                        require(item["status"] != "reached" or (timestamp(item.get("observed_at")) and cls.number(item.get("observed_s")) is not None and item["observed_s"] >= 0))

    @staticmethod
    def number(value):
        if type(value) not in (int, float):
            return None
        try:
            return value if isfinite(value) else None
        except OverflowError:
            return None

    @staticmethod
    def label(value):
        if not isinstance(value, str) or not value.strip() or len(value) > 100 or any(ord(c) < 32 for c in value):
            raise ValueError("Utilisez un nom de 1 à 100 caractères.")
        return value.strip()

    @staticmethod
    def _end(item, now, reason):
        item.update(status="excluded", ended_at=now, reason=reason)

    def room(self, entity_id):
        rooms = self.data["rooms"]
        if entity_id not in rooms:
            if len(rooms) >= self.MAX_ROOMS:
                raise ValueError("Limite de 32 pièces observées atteinte.")
            rooms[entity_id] = {"current": None, "revision": None, "points": [], "receipts": [], "bookmarks": [], "trials": [], "forecasts": [], "forecast_context": None}
        return rooms[entity_id]

    def expire(self, now):
        for room in self.data["rooms"].values():
            current = room.get("current") or {}
            if now - current.get("time", 0) > self.GAP_S:
                for group in ("forecasts", "trials", "receipts"):
                    for item in room[group]:
                        if item.get("status") == "pending":
                            self._end(item, now, "Interruption de données supérieure à 10 min")
            room["points"] = [p for p in room["points"] if p["time"] >= now - 48 * 3600][-self.MAX_POINTS:]
            for group, limit in (("forecasts", self.MAX_FORECASTS), ("trials", self.MAX_TRIALS), ("receipts", self.MAX_RECEIPTS)):
                room[group] = [r for r in room[group] if r["started_at"] >= now - 30 * 86400][-limit:]

    def observe(self, entity_id, point, published=False):
        """Record only new source publications; climate updates only confirm intent."""
        room = self.room(entity_id)
        previous = room.get("current")
        if published and previous and point["time"] < previous["time"]:
            return
        room["current"] = deepcopy(point)
        context = [point.get(k) for k in ("climate_id", "mode", "target", "unit")]
        if previous and context != [previous.get(k) for k in ("climate_id", "mode", "target", "unit")]:
            room["forecast_context"] = None
        for group in ("trials", "forecasts"):
            for item in room[group]:
                if item["status"] == "pending" and item["context"] != context:
                    self._end(item, point["observed_at"], "Consigne, mode, unité ou thermostat modifié")
        if previous and point["time"] > previous["time"] + self.GAP_S:
            for group in ("trials", "forecasts", "receipts"):
                for item in room[group]:
                    if item["status"] == "pending":
                        self._end(item, point["observed_at"], "Interruption de données supérieure à 10 min")
        for receipt in room["receipts"]:
            if receipt["status"] != "pending":
                continue
            if point.get("climate_id") != receipt["climate_id"] or point.get("mode") != receipt.get("mode") or point.get("unit") != receipt.get("unit") or not point["available"]:
                self._end(receipt, point["observed_at"], "Thermostat indisponible ou liaison modifiée")
                continue
            choice = receipt["choice"]
            matches = (point.get("target") == choice["value"] if choice["kind"] == "temperature" else point.get("preset") == choice["value"])
            if matches and receipt.get("confirmed_at") is None:
                receipt.update(confirmed_at=point["observed_at"], confirmed_target=point.get("target"))
            elif receipt.get("confirmed_at") is not None and point.get("target") != receipt.get("confirmed_target"):
                self._end(receipt, point["observed_at"], "Une autre consigne a remplacé la demande")
        if not published or room.get("revision") == point.get("revision"):
            return
        room["revision"] = point.get("revision")
        if not point["available"]:
            for group in ("trials", "forecasts"):
                for item in room[group]:
                    if item["status"] == "pending":
                        self._end(item, point["observed_at"], "Publication indisponible")
            return
        if point["observed_at"] - point["time"] > self.GAP_S or point["time"] > point["observed_at"] + 60:
            return
        # A publication older than an episode start is never retrospective evidence.
        room["points"].append({k: point.get(k) for k in ("time", "temperature", "target", "outdoor", "applied", "mode", "unit")})
        room["points"] = room["points"][-self.MAX_POINTS:]
        for receipt in room["receipts"]:
            if receipt["status"] != "pending" or receipt.get("confirmed_at") is None or point["time"] < receipt["confirmed_at"]:
                continue
            if receipt.get("applied_at") is None and self.number(point.get("applied")) is not None:
                receipt.update(applied_at=point["time"], applied_percent=point["applied"])
            baseline, temp, goal = (self.number(v) for v in (receipt.get("baseline"), point.get("temperature"), receipt.get("confirmed_target")))
            if baseline is not None and temp is not None and goal is not None and (temp - baseline) * (goal - baseline) > 0:
                receipt.update(status="observed", response_at=point["time"], response_temperature=temp, ended_at=point["time"])
        for trial in room["trials"]:
            if trial["status"] == "pending" and point["time"] >= trial["started_at"]:
                temp = self.number(point.get("temperature"))
                if temp is not None:
                    stats = trial["stats"]
                    stats["publications"] += 1
                    stats["first_at"] = stats["first_at"] if stats["first_at"] is not None else point["time"]
                    stats["last_at"] = point["time"]
                    stats["minimum"] = min(temp, stats["minimum"]) if stats["minimum"] is not None else temp
                    stats["maximum"] = max(temp, stats["maximum"]) if stats["maximum"] is not None else temp
                    stats["last"] = temp
                    error = abs(temp - trial["target"])
                    stats["max_abs_error"] = max(error, stats["max_abs_error"] or 0)
                    outdoor = self.number(point.get("outdoor"))
                    if outdoor is not None:
                        stats["outdoor_min"] = min(outdoor, stats["outdoor_min"]) if stats["outdoor_min"] is not None else outdoor
                        stats["outdoor_max"] = max(outdoor, stats["outdoor_max"]) if stats["outdoor_max"] is not None else outdoor
                else:
                    trial["missing_publications"] = trial.get("missing_publications", 0) + 1
        twin = point.get("twin") or {}
        reliable = twin.get("status") == "ok" and twin.get("model_reliable") is True and twin.get("warming_up") is False and twin.get("tau_reliable") is True
        seconds = self.number(twin.get("eta_s"))
        bound = point.get("climate_time") is not None and point["time"] >= point["climate_time"]
        for forecast in room["forecasts"]:
            if forecast["status"] != "pending" or point["time"] <= forecast["started_at"]:
                continue
            valid_eta = seconds is not None and ((twin.get("reason") == "ok" and 0 < seconds <= 48 * 3600) or (twin.get("reason") == "already_reached" and seconds == 0))
            if not reliable or self.number(point.get("temperature")) is None or not valid_eta:
                self._end(forecast, point["time"], "Le Twin ne publie plus une prévision fiable")
            elif bound and seconds == 0 and twin.get("reason") == "already_reached":
                forecast.update(status="reached", observed_at=point["time"], ended_at=point["time"], observed_s=point["time"] - forecast["started_at"])
            elif point["time"] - forecast["started_at"] > 48 * 3600:
                self._end(forecast, point["time"], "Horizon d’observation de 48 h dépassé")
        if context != room.get("forecast_context") and reliable and bound and point.get("mode") in ("heat", "cool") and point.get("unit") in ("°C", "°F") and self.number(point.get("target")) is not None and self.number(point.get("temperature")) is not None and twin.get("reason") == "ok" and seconds is not None and 0 < seconds <= 48 * 3600:
            room["forecasts"].append({"id": uuid4().hex, "started_at": point["time"], "target": point["target"], "unit": point["unit"], "temperature": point["temperature"], "outdoor": point.get("outdoor"), "eta_s": seconds, "status": "pending", "context": context, "reason": "Meilleur cas publié par SmartPI"})
            room["forecast_context"] = context
            room["forecasts"] = room["forecasts"][-self.MAX_FORECASTS:]

    def action(self, entity_id, action, payload, now):
        self.validate_request(entity_id, action, payload)
        room = self.room(entity_id)
        current = room.get("current") or {}
        if action == "get":
            self.expire(now)
            return self.export(entity_id)
        if action == "clear":
            self.data["rooms"].pop(entity_id, None)
            return {"cleared": True}
        if action.endswith("_delete"):
            group = {"bookmark_delete": "bookmarks", "trial_delete": "trials", "forecast_delete": "forecasts", "receipt_delete": "receipts"}.get(action)
            if group is None:
                raise ValueError("Action inconnue.")
            room[group] = [item for item in room[group] if item["id"] != payload.get("id")]
            return self.export(entity_id)
        if action == "trial_feedback":
            if payload.get("feedback") not in ("good", "cold", "hot", "unknown"):
                raise ValueError("Ressenti invalide.")
            trial = next((t for t in room["trials"] if t["id"] == payload.get("id")), None)
            if trial is None:
                raise ValueError("Essai introuvable.")
            trial["feedback"] = payload["feedback"]
            return self.export(entity_id)
        if action == "trial_stop":
            trial = next((t for t in room["trials"] if t["id"] == payload.get("id") and t["status"] == "pending"), None)
            if trial is None:
                raise ValueError("Aucun essai actif correspondant.")
            trial.update(status="finished", ended_at=now, reason="Arrêt demandé par l’utilisateur")
            return self.export(entity_id)
        if action == "receipt_finish":
            receipt = next((t for t in room["receipts"] if t["id"] == payload.get("id")), None)
            if receipt is None:
                raise ValueError("Reçu introuvable.")
            receipt["service_result"] = "accepted" if payload.get("success") is True else "uncertain"
            receipt["service_returned_at"] = now
            if payload.get("not_sent") is True:
                self._end(receipt, now, "Choix devenu obsolète avant l’envoi")
            return {"id": receipt["id"]}
        if not current.get("available") or now - current.get("time", 0) > self.GAP_S:
            raise ValueError("Attendez des données récentes du thermostat.")
        if action == "receipt_begin":
            choice = payload.get("choice")
            if not isinstance(choice, dict) or choice.get("kind") not in ("temperature", "preset"):
                raise ValueError("Choix invalide.")
            if choice["kind"] == "temperature" and self.number(choice.get("value")) is None:
                raise ValueError("Température invalide.")
            if choice["kind"] == "preset":
                self.label(choice.get("value"))
            receipt = {"id": uuid4().hex, "started_at": now, "status": "pending", "climate_id": current["climate_id"], "mode": current.get("mode"), "choice": {"kind": choice["kind"], "value": choice["value"]}, "baseline": current.get("temperature"), "unit": current.get("unit"), "confirmed_at": None, "service_result": "pending"}
            room["receipts"] = (room["receipts"] + [receipt])[-self.MAX_RECEIPTS:]
            return {"id": receipt["id"]}
        if action == "bookmark_save":
            if self.number(current.get("target")) is None or self.number(current.get("temperature")) is None or current.get("unit") not in ("°C", "°F"):
                raise ValueError("Mesure, consigne ou unité indisponible.")
            if len(room["bookmarks"]) >= self.MAX_BOOKMARKS:
                raise ValueError("Supprimez un souvenir avant d’en ajouter un (maximum 30).")
            room["bookmarks"].append({"id": uuid4().hex, "label": self.label(payload.get("label")), "created_at": now, **{k: current.get(k) for k in ("temperature", "target", "preset", "outdoor", "unit", "climate_id")}})
            return self.export(entity_id)
        if action == "trial_start":
            if any(t["status"] == "pending" for t in room["trials"]):
                raise ValueError("Terminez d’abord l’essai en cours.")
            if self.number(current.get("target")) is None or current.get("unit") not in ("°C", "°F") or current.get("mode") not in ("heat", "cool"):
                raise ValueError("Aucune consigne active exploitable pour cet essai.")
            stats = dict.fromkeys(("first_at", "last_at", "minimum", "maximum", "last", "max_abs_error", "outdoor_min", "outdoor_max"))
            stats["publications"] = 0
            room["trials"] = (room["trials"] + [{"id": uuid4().hex, "label": self.label(payload.get("label")), "started_at": now, "status": "pending", "target": current["target"], "unit": current["unit"], "baseline": current.get("temperature"), "outdoor": current.get("outdoor"), "context": [current.get(k) for k in ("climate_id", "mode", "target", "unit")], "feedback": "unknown", "stats": stats, "missing_publications": 0}])[-self.MAX_TRIALS:]
            return self.export(entity_id)
        raise ValueError("Action inconnue.")

    def export(self, entity_id):
        room = deepcopy(self.room(entity_id))
        room.pop("points", None)
        room.pop("revision", None)
        room.pop("forecast_context", None)
        for trial in room["trials"]:
            trial["summary"] = trial.pop("stats")
        return room
