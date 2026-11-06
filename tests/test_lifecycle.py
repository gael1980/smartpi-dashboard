"""Lifecycle against real HA APIs; HTTP filesystem registration is mocked."""
import importlib.util
import tempfile
import sys
import types
from pathlib import Path
import unittest
from types import SimpleNamespace
from unittest.mock import AsyncMock, patch

HA_AVAILABLE = importlib.util.find_spec("homeassistant") is not None


@unittest.skipUnless(HA_AVAILABLE, "Requires Home Assistant; see AUDIT.md")
class LifecycleTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self):
        package = types.ModuleType("custom_components")
        package.__path__ = [str(Path(__file__).resolve().parents[1] / "custom_components")]
        sys.modules["custom_components"] = package
        from homeassistant.core import HomeAssistant
        self.temp = tempfile.TemporaryDirectory()
        self.hass = HomeAssistant(self.temp.name)
        self.http = SimpleNamespace(async_register_static_paths=AsyncMock())
        self.hass.http = self.http

    async def asyncTearDown(self):
        await self.hass.async_block_till_done()
        await self.hass.async_stop()
        self.temp.cleanup()

    async def test_setup_unload_reload_remove(self):
        from homeassistant.components.frontend import DATA_PANELS
        from custom_components.smartpi_dashboard import async_setup_entry, async_unload_entry
        from custom_components.smartpi_dashboard.const import PANEL_URL_PATH
        with patch('custom_components.smartpi_dashboard.async_get_integration', AsyncMock(return_value=SimpleNamespace(version='0.1.0'))):
            for _ in range(2):
                self.assertTrue(await async_setup_entry(self.hass, None))
                panel = self.hass.data[DATA_PANELS][PANEL_URL_PATH]
                self.assertTrue(panel.require_admin)
                self.assertIn('smartpi-dashboard.js?v=0.1.0', panel.config['_panel_custom']['module_url'])
                self.assertTrue(await async_unload_entry(self.hass, None))
                self.assertNotIn(PANEL_URL_PATH, self.hass.data[DATA_PANELS])
        self.http.async_register_static_paths.assert_awaited_once()
        self.assertEqual(len(self.hass.states.async_all()), 0)

    async def test_registration_failure_can_retry(self):
        from custom_components.smartpi_dashboard.panel import async_register_panel, async_unregister_panel
        self.http.async_register_static_paths.side_effect = RuntimeError('IO failure')
        with self.assertRaises(RuntimeError):
            await async_register_panel(self.hass, 'test')
        self.http.async_register_static_paths.side_effect = None
        await async_register_panel(self.hass, 'test')
        async_unregister_panel(self.hass)
        self.assertEqual(self.http.async_register_static_paths.await_count, 2)

    async def test_config_flow_single_instance(self):
        from custom_components.smartpi_dashboard.config_flow import SmartPIDashboardConfigFlow
        flow = SmartPIDashboardConfigFlow()
        flow.hass = self.hass
        with patch.object(flow, '_async_current_entries', return_value=[]):
            self.assertEqual((await flow.async_step_user())['type'], 'form')
            result = await flow.async_step_user({})
            self.assertEqual(result['type'], 'create_entry')
            self.assertEqual(result['data'], {})
        with patch.object(flow, '_async_current_entries', return_value=[object()]):
            self.assertEqual((await flow.async_step_user({}))['reason'], 'single_instance_allowed')
