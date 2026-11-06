"""One-entry confirmation flow. No credentials or thermostat changes."""

from typing import Any
from homeassistant.config_entries import ConfigFlow
from .const import DOMAIN


class SmartPIDashboardConfigFlow(ConfigFlow, domain=DOMAIN):
    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None):
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        if user_input is None:
            return self.async_show_form(step_id="user")
        return self.async_create_entry(title="SmartPI Dashboard", data={})
