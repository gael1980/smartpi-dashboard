# SmartPI Dashboard

[Documentation française](README.md) · [Changelog (French)](CHANGELOG.md) · [Marketplace preparation (French)](docs/MARKETPLACE.md)

A native Home Assistant sidebar panel for SmartPI diagnostics, learning progress,
Recorder charts and explicit temperature/preset selection. The dashboard UI is
currently in French. Setup translations are provided in English and French.

## Requirements

- Home Assistant **2026.11.0 or newer** and an administrator account.
- SmartPI already installed, with Diagnostics sensors exposing schema version 2,
  `live` and `history`. This dashboard does not replace your thermostat integration.
- Recorder is optional. Session observations remain separate from Recorder data.

## Installation

[![Open the repository in Marketplace](https://my.home-assistant.io/badges/marketplace_repository.svg)](https://my.home-assistant.io/redirect/marketplace_repository/?owner=gael1980&repository=smartpi-dashboard&category=integration)

Add `gael1980/smartpi-dashboard` as a custom **Integration** repository under
**Settings → Marketplace**, then download it. After installation, add
**SmartPI Dashboard** in **Settings → Devices & services → Add integration**.
Open the sidebar panel as an administrator. Updates to a loaded custom integration
require a Home Assistant restart.

Version 0.3.2 sources are published on `main`. This push does not create a tag
or GitHub release. The Marketplace link adds the custom repository; it is not
in the default catalog. Check GitHub Actions results before installing.

For manual installation, build with `npm ci && npm run build` in `frontend/`
(Node.js 22+), copy the complete `custom_components/smartpi_dashboard/` folder into
Home Assistant's `config/custom_components/`, then restart. Keep the backend and
compiled frontend from the same version. Back up Home Assistant before updating.

## Behavior and local data

Selections are previews until **Apply**. Only the linked thermostat's temperature
or preset can be changed. Schedules remain managed by your existing scheduler;
there are no automatic PI adjustments or calibration actions.

The Twin ETA is shown only when available, reliable and recent. It is a published
best-case estimate, not a guarantee of arrival time.

The observatory stores comfort notes, command receipts, descriptive trials and
prospective Twin forecasts locally in Home Assistant's native `.storage` directory,
including while the panel is closed. Data is bounded and can be deleted from the
panel. No external account or API token is required. Observations do not establish
causality or energy savings.

Licensed under [MIT](LICENSE); bundled library notices are included in the component.
