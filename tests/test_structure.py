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

    def test_no_home_assistant_writes(self):
        sources = "\n".join(p.read_text() for p in (ROOT / "frontend" / "src").glob("*.ts"))
        for forbidden in ("callService", "callApi", "callWS", "fetch(", "XMLHttpRequest", "WebSocket(", "set_temperature(", "reset_smartpi_learning("):
            self.assertNotIn(forbidden, sources)
        backend = "\n".join(p.read_text() for p in COMPONENT.glob("*.py"))
        for forbidden in ("services.async_call", "states.async_set", "async_update_entry", "async_register_entity_service"):
            self.assertNotIn(forbidden, backend)



if __name__ == "__main__":
    unittest.main()
