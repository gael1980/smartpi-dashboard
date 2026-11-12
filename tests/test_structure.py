"""Packaging and read-only static checks (Home Assistant not required)."""
from pathlib import Path
import json
import unittest

ROOT = Path(__file__).resolve().parents[1]
COMPONENT = ROOT / "custom_components" / "smartpi_dashboard"


class IntegrationTests(unittest.TestCase):
    def test_manifest(self):
        manifest = json.loads((COMPONENT / "manifest.json").read_text())
        self.assertEqual(manifest["domain"], "smartpi_dashboard")
        self.assertTrue(manifest["config_flow"])
        self.assertEqual(manifest["requirements"], [])

    def test_frontend_bundle(self):
        file = COMPONENT / "frontend" / "smartpi-dashboard.js"
        self.assertTrue(file.is_file(), "Compile frontend first: npm run build")
        self.assertGreater(file.stat().st_size, 1000)

    def test_home_assistant_capabilities_are_isolated(self):
        sources = "\n".join(p.read_text() for p in (ROOT / "frontend" / "src").rglob("*.ts"))
        for forbidden in ("callApi", "fetch(", "XMLHttpRequest", "WebSocket(", "set_temperature(", "reset_smartpi_learning("):
            self.assertNotIn(forbidden, sources)
        history = (ROOT / "frontend/src/services/history.ts").read_text()
        self.assertRegex(history, r"type:\s*[\"']history/history_during_period[\"']")
        self.assertEqual(sources.count("await hass.callWS<unknown>"), 1)
        metadata = (ROOT / "frontend/src/services/observatory.ts").read_text()
        self.assertIn('type: "smartpi_dashboard/observatory"', metadata)
        for source in (ROOT / "frontend/src").rglob("*.ts"):
            if source.as_posix().endswith("services/climate.ts"):
                self.assertEqual(source.read_text().count("await hass.callService("), 2)
                self.assertIn('"climate", "set_temperature"', source.read_text())
                self.assertIn('"climate", "set_preset_mode"', source.read_text())
            else:
                self.assertNotIn(".callService(", source.read_text())
            if source.name not in ("history.ts", "observatory.ts"):
                self.assertNotIn(".callWS(", source.read_text())
                self.assertNotIn(".callWS<", source.read_text())
        backend = "\n".join(p.read_text() for p in COMPONENT.glob("*.py"))
        for forbidden in ("services.async_call", "states.async_set", "async_update_entry", "async_register_entity_service"):
            self.assertNotIn(forbidden, backend)



if __name__ == "__main__":
    unittest.main()
