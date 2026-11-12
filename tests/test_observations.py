"""Synthetic prospective episodes, independent of HA and of the regulator."""
import importlib.util
from pathlib import Path
import unittest

SPEC = importlib.util.spec_from_file_location("observation_book", Path(__file__).resolve().parents[1] / "custom_components/smartpi_dashboard/observations.py")
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)
ObservationBook = MODULE.ObservationBook


def point(time=1000, **changes):
    return {"time": time, "observed_at": time, "revision": str(time), "available": True, "climate_id": "climate.demo", "climate_time": 900, "temperature": 19, "target": 20, "outdoor": 8, "preset": "comfort", "mode": "heat", "unit": "°C", "applied": 42, "twin": {"status": "ok", "model_reliable": True, "warming_up": False, "tau_reliable": True, "eta_s": 1800, "reason": "ok"}, **changes}


class ObservationTests(unittest.TestCase):
    def setUp(self):
        self.book = ObservationBook()
        self.book.observe("sensor.demo", point(), False)

    @property
    def room(self):
        return self.book.room("sensor.demo")

    def action(self, action, payload=None, now=1000):
        return self.book.action("sensor.demo", action, payload or {}, now)

    def test_startup_is_not_a_historical_forecast(self):
        self.assertEqual(self.room["forecasts"], [])
        self.assertEqual(self.room["points"], [])

    def test_one_forecast_per_target_episode_no_retroactive_revisions(self):
        self.book.observe("sensor.demo", point(1001), True)
        self.book.observe("sensor.demo", point(1100), True)
        self.assertEqual(len(self.room["forecasts"]), 1)
        self.assertEqual(self.room["forecasts"][0]["eta_s"], 1800)
        self.book.observe("sensor.demo", point(1200, target=21), False)
        self.assertEqual(self.room["forecasts"][0]["status"], "excluded")
        self.book.observe("sensor.demo", point(1201, target=21), True)
        self.assertEqual(len(self.room["forecasts"]), 2)

    def test_reached_is_first_matching_explicit_publication_not_eta_elapsed(self):
        self.book.observe("sensor.demo", point(1001), True)
        for time in range(1201, 3401, 200):
            self.book.observe("sensor.demo", point(time, temperature=19.5), True)
        p = point(3401, temperature=20)
        p["twin"].update(eta_s=0, reason="already_reached")
        self.book.observe("sensor.demo", p, True)
        forecast = self.room["forecasts"][0]
        self.assertEqual(forecast["status"], "reached")
        self.assertEqual(forecast["observed_s"], 2400)
        self.assertEqual(forecast["eta_s"], 1800)

    def test_forecast_refusals_and_stale_binding(self):
        for change in ({"eta_s": None}, {"eta_s": -1}, {"eta_s": float("inf")}, {"reason": "too_far"}, {"warming_up": True}, {"model_reliable": False}, {"tau_reliable": False}, {"status": None}):
            book = ObservationBook()
            p = point(); p["twin"].update(change)
            book.observe("sensor.demo", p, True)
            self.assertEqual(book.room("sensor.demo")["forecasts"], [])
        self.book.observe("sensor.demo", point(1001, climate_time=1002), True)
        self.assertEqual(self.room["forecasts"], [])

    def test_gaps_and_unavailable_censor_instead_of_proving_arrival(self):
        self.book.observe("sensor.demo", point(1001), True)
        p = point(1800, temperature=20); p["twin"].update(eta_s=0, reason="already_reached")
        self.book.observe("sensor.demo", p, True)
        self.assertEqual(self.room["forecasts"][0]["status"], "excluded")
        self.assertIn("Interruption", self.room["forecasts"][0]["reason"])

    def test_model_loss_excludes_without_fabricating_observed_duration(self):
        self.book.observe("sensor.demo", point(1001), True)
        p = point(1100); p["twin"]["model_reliable"] = False
        self.book.observe("sensor.demo", p, True)
        self.assertEqual(self.room["forecasts"][0]["status"], "excluded")
        self.assertNotIn("observed_s", self.room["forecasts"][0])

    def test_restart_interrupts_in_flight_observations_and_keeps_bookmarks(self):
        self.action("bookmark_save", {"label": "Lecture"})
        self.action("trial_start", {"label": "19 degrés"})
        self.book.observe("sensor.demo", point(1001), True)
        restored = ObservationBook(self.book.data, 1200)
        self.assertEqual(restored.room("sensor.demo")["trials"][0]["status"], "excluded")
        self.assertEqual(restored.room("sensor.demo")["forecasts"][0]["status"], "excluded")
        self.assertEqual(restored.room("sensor.demo")["bookmarks"][0]["label"], "Lecture")

    def test_bookmark_is_context_not_a_command_and_can_be_deleted(self):
        result = self.action("bookmark_save", {"label": "  Canapé  "})
        b = result["bookmarks"][0]
        self.assertEqual((b["label"], b["temperature"], b["target"], b["outdoor"]), ("Canapé", 19, 20, 8))
        result = self.action("bookmark_delete", {"id": b["id"]})
        self.assertEqual(result["bookmarks"], [])
        for label in ("", "x" * 101, "a\nb"):
            with self.assertRaises(ValueError):
                self.action("bookmark_save", {"label": label})

    def test_trial_observations_exclusions_feedback_and_description(self):
        self.action("trial_start", {"label": "Essai"})
        with self.assertRaises(ValueError):
            self.action("trial_start", {"label": "Deuxième"})
        self.book.observe("sensor.demo", point(1001, temperature=19.5), True)
        self.book.observe("sensor.demo", point(1100, temperature=None), True)
        self.book.observe("sensor.demo", point(1200, temperature=20.1), True)
        trial = self.room["trials"][0]
        self.action("trial_stop", {"id": trial["id"]}, 1250)
        self.action("trial_feedback", {"id": trial["id"], "feedback": "good"})
        trial = self.book.export("sensor.demo")["trials"][0]
        self.assertEqual(trial["summary"]["publications"], 2)
        self.assertEqual(trial["summary"]["minimum"], 19.5)
        self.assertEqual(trial["summary"]["maximum"], 20.1)
        self.assertEqual(trial["missing_publications"], 1)
        self.assertEqual(trial["feedback"], "good")

    def test_trial_target_and_units_changes_end_comparability(self):
        self.action("trial_start", {"label": "Essai"})
        self.book.observe("sensor.demo", point(1100, unit="°F"), False)
        self.assertEqual(self.room["trials"][0]["status"], "excluded")

    def test_receipt_stages_require_state_and_new_source_publication(self):
        receipt_id = self.action("receipt_begin", {"choice": {"kind": "temperature", "value": 21}})["id"]
        self.action("receipt_finish", {"id": receipt_id, "success": True}, 1001)
        receipt = self.room["receipts"][0]
        self.assertIsNone(receipt["confirmed_at"])
        self.book.observe("sensor.demo", point(1000, observed_at=1002, target=21, climate_time=1002), False)
        self.assertEqual(receipt["confirmed_at"], 1002)
        self.assertNotIn("applied_at", receipt)
        self.book.observe("sensor.demo", point(1010, target=21, climate_time=1002, temperature=19.2, applied=0), True)
        self.assertEqual(receipt["applied_percent"], 0)
        self.assertEqual(receipt["status"], "observed")
        self.assertEqual(receipt["response_temperature"], 19.2)

    def test_service_failure_is_uncertain_not_proof_of_no_change(self):
        receipt_id = self.action("receipt_begin", {"choice": {"kind": "preset", "value": "eco"}})["id"]
        self.action("receipt_finish", {"id": receipt_id, "success": False}, 1001)
        self.book.observe("sensor.demo", point(1002, preset="eco", target=17), False)
        receipt = self.room["receipts"][0]
        self.assertEqual(receipt["service_result"], "uncertain")
        self.assertEqual(receipt["confirmed_target"], 17)

    def test_removed_or_rebound_climate_never_confirms_the_old_receipt(self):
        self.action("receipt_begin", {"choice": {"kind": "temperature", "value": 21}})
        self.book.observe("sensor.demo", point(1100, target=21, climate_id="climate.other"), False)
        self.assertEqual(self.room["receipts"][0]["status"], "excluded")
        self.assertIsNone(self.room["receipts"][0]["confirmed_at"])

    def test_duplicate_or_late_source_does_not_add_a_measurement(self):
        self.book.observe("sensor.demo", point(1001), True)
        self.book.observe("sensor.demo", point(1001), True)
        self.book.observe("sensor.demo", point(999, temperature=30), True)
        self.assertEqual(len(self.room["points"]), 1)
        self.assertEqual(self.room["current"]["temperature"], 19)

    def test_limits_and_time_expiration_are_bounded(self):
        for i in range(1300):
            self.book.observe("sensor.demo", point(1001 + i), True)
        self.assertEqual(len(self.room["points"]), 1200)
        self.book.expire(10000000)
        self.assertEqual(self.room["points"], [])
        self.assertEqual(self.room["forecasts"], [])

    def test_zero_is_valid_and_booleans_are_not_temperatures(self):
        self.book.observe("sensor.demo", point(1001, target=0, temperature=0), False)
        result = self.action("bookmark_save", {"label": "Zéro"}, 1001)
        self.assertEqual(result["bookmarks"][0]["temperature"], 0)
        self.assertIsNone(ObservationBook.number(True))

    def test_export_does_not_mutate_internal_observations(self):
        self.action("trial_start", {"label": "Essai"})
        result = self.book.export("sensor.demo")
        result["trials"][0]["target"] = 50
        self.assertEqual(self.room["trials"][0]["target"], 20)
        self.assertIn("stats", self.room["trials"][0])

    def test_unknown_actions_and_stale_observations_refuse_metadata_writes(self):
        with self.assertRaises(ValueError):
            self.action("call_service")
        with self.assertRaises(ValueError):
            self.action("bookmark_save", {"label": "Ancien"}, 2000)

    def test_unsupported_storage_version_is_not_silently_replaced(self):
        data = {"version": 2, "rooms": {"sensor.demo": {"private": "kept"}}}
        with self.assertRaises(ValueError):
            ObservationBook(data)
        self.assertEqual(data["rooms"]["sensor.demo"]["private"], "kept")

    def test_trial_aggregate_keeps_early_extremes_after_recent_points_roll_over(self):
        self.action("trial_start", {"label": "Long"})
        self.book.observe("sensor.demo", point(1001, temperature=15), True)
        for i in range(1, 1300):
            self.book.observe("sensor.demo", point(1001 + i, temperature=20), True)
        summary = self.book.export("sensor.demo")["trials"][0]["summary"]
        self.assertEqual(summary["publications"], 1300)
        self.assertEqual(summary["minimum"], 15)
        self.assertEqual(summary["max_abs_error"], 5)
        self.assertEqual(len(self.room["points"]), 1200)

    def test_zero_eta_without_explicit_reached_reason_excludes_forecast(self):
        self.book.observe("sensor.demo", point(1001), True)
        p = point(1100); p["twin"]["eta_s"] = 0
        self.book.observe("sensor.demo", p, True)
        self.assertEqual(self.room["forecasts"][0]["status"], "excluded")
        self.assertNotIn("observed_s", self.room["forecasts"][0])

    def test_receipt_mode_or_unit_change_never_counts_as_response(self):
        for change in ({"mode": "off"}, {"unit": "°F"}):
            book = ObservationBook()
            book.observe("sensor.demo", point(), False)
            book.action("sensor.demo", "receipt_begin", {"choice": {"kind": "temperature", "value": 21}}, 1000)
            book.observe("sensor.demo", point(1100, target=21, **change), True)
            self.assertEqual(book.room("sensor.demo")["receipts"][0]["status"], "excluded")

    def test_malformed_saved_records_fail_before_modifying_the_input(self):
        from copy import deepcopy
        self.action("trial_start", {"label": "À préserver"})
        valid = deepcopy(self.book.data)
        for change in (lambda d: d.update(version=True),
                       lambda d: d["rooms"]["sensor.demo"]["receipts"].append(None),
                       lambda d: d["rooms"]["sensor.demo"]["trials"][0].pop("stats"),
                       lambda d: d["rooms"]["sensor.demo"]["points"].append({"time": "yesterday"})):
            data = deepcopy(valid)
            change(data)
            before = deepcopy(data)
            with self.assertRaises(ValueError):
                ObservationBook(data, 1100)
            self.assertEqual(data, before)

    def test_all_record_kinds_survive_validated_round_trip(self):
        self.action("bookmark_save", {"label": "Confort"})
        self.action("trial_start", {"label": "Essai"})
        self.action("receipt_begin", {"choice": {"kind": "temperature", "value": 21}})
        self.book.observe("sensor.demo", point(1001), True)
        restored = ObservationBook(self.book.data, 1100)
        self.assertEqual(len(restored.export("sensor.demo")["bookmarks"]), 1)


if __name__ == "__main__":
    unittest.main()
