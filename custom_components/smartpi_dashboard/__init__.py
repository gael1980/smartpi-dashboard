"""SmartPI diagnostics and explicit climate selection panel."""

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.typing import ConfigType
from homeassistant.loader import async_get_integration

from .const import DOMAIN
from .panel import async_register_panel, async_unregister_panel
from .observatory import Observatory, register_api

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    integration = await async_get_integration(hass, DOMAIN)
    await async_register_panel(hass, str(integration.version))
    register_api(hass)
    observer = Observatory(hass)
    try:
        await observer.start()
    except Exception:
        async_unregister_panel(hass)
        raise
    hass.data[DOMAIN]["observatory"] = observer
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    observer = hass.data.get(DOMAIN, {}).pop("observatory", None)
    if observer is not None:
        await observer.stop()
    async_unregister_panel(hass)
    return True
