# SmartPI Dashboard

[Documentation française](README.md) · [Changelog (French)](CHANGELOG.md) · [Marketplace preparation (French)](docs/MARKETPLACE.md)

A native Home Assistant sidebar panel for SmartPI diagnostics, learning progress,
Recorder charts and explicit temperature/preset selection. The dashboard UI is
available in French and English. It follows the Home Assistant user language:
French for French, English for every other language. Setup translations are
provided in English and French.

## Preview

All screenshots use synthetic demonstration data. The following overview shows version 0.4.0.
Named presets, raw and filtered targets, and a proportional applied-command fill
remain distinct. The fill represents a control percentage, not measured watts.

![Thermostat presets, targets and applied commands](docs/images/thermostats.png)

[Dark mobile overview](docs/images/thermostats-mobile.png) · [Supervision and dated chart values](docs/images/supervision.png)

The published monitoring stage uses a compact summary with expandable details.
Active collection and degraded states keep their progress bars visible.

![Compact model monitoring](docs/images/surveillance-modele.png)

Version 0.4 adds timestamped historical replay, session room comparisons grouped
by recorded unit, and prospective response summaries using the thermostat's raw
target. Missing archived units stay unknown. The Twin notebook separates the
published best-case ETA from observed arrival; no accuracy score or predictive
interval is invented. [Methods and exclusions (French)](docs/MEASUREMENT_METHODS.md).

[Historical replay](docs/images/relecture-historique.png) · [Room comparison and response episodes](docs/images/comparaison-episodes.png)

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

Version 0.5.0 is distributed as a [GitHub release](https://github.com/gael1980/smartpi-dashboard/releases).
Marketplace can discover published updates for users who have installed this custom
repository. Discovery is periodic, not immediate. The repository is not included
in the default catalog. Home Assistant 2026.11.0 or newer is required.

For manual installation, build with `npm ci && npm run build` in `frontend/`
(Node.js 22+), copy the complete `custom_components/smartpi_dashboard/` folder into
Home Assistant's `config/custom_components/`, then restart. Keep the backend and
compiled frontend from the same version. Back up Home Assistant before updating.

## Behavior and local data

Selections are previews until **Apply**. Only the linked thermostat's temperature
or preset can be changed. Schedules remain managed by your existing scheduler;
there are no automatic PI adjustments or calibration actions.

The thermal journey explains FF-led maintenance heating when supported by the
published signals. Recent, reliable Twin step outputs appear beside the command
with a dotted marker; unavailable ETA values have a brief explanation.

The Twin ETA is shown only when available, reliable and recent. It is a published
best-case estimate, not a guarantee of arrival time.

The observatory stores comfort notes, command receipts, descriptive trials and
prospective Twin forecasts locally in Home Assistant's native `.storage` directory,
including while the panel is closed. Data is bounded and can be deleted from the
panel. No external account or API token is required. Observations do not establish
causality or energy savings.

Licensed under [MIT](LICENSE); bundled library notices are included in the component.
