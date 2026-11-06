"""Register the read-only Home Assistant sidebar panel."""

from pathlib import Path
from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant
from .const import DOMAIN, PANEL_URL_PATH, PANEL_ELEMENT, PANEL_JS, STATIC_URL

FRONTEND_DIR = Path(__file__).parent / "frontend"


async def async_register_panel(hass: HomeAssistant, version: str) -> None:
    data = hass.data.setdefault(DOMAIN, {})
    if not data.get("static_registered"):
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL, str(FRONTEND_DIR), cache_headers=False)]
        )
        data["static_registered"] = True
    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_URL_PATH,
        webcomponent_name=PANEL_ELEMENT,
        module_url=f"{STATIC_URL}/{PANEL_JS}?v={version}",
        sidebar_title="SmartPI Dashboard",
        sidebar_icon="mdi:chart-timeline-variant",
        require_admin=True,
        config={},
        config_panel_domain=DOMAIN,
    )


def async_unregister_panel(hass: HomeAssistant) -> None:
    frontend.async_remove_panel(hass, PANEL_URL_PATH)
