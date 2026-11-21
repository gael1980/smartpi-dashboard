import {tr, locale} from "./i18n";
/** Strict read-only data adapter; explicit climate actions live in services/climate.ts. */
export type Rec = Record<string, unknown>;
export interface HAState {
  entity_id: string;
  state: string;
  attributes: Rec;
  last_updated?: string;
  last_changed?: string;
}
export interface HassLike { states: Record<string, HAState>; language?: string; locale?: {language?: string}; config?: {unit_system?: {temperature?: string}} }
export interface SmartPIDiagnostic {
  entityId: string;
  climateId: string | null;
  name: string;
  state: string;
  lastUpdated: string | null;
  available: boolean;
  live: Rec;
  history: Rec;
  temperatureUnit?: string | null;
}

export function record(value: unknown): value is Rec {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
export function at(root: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((obj, key) => record(obj) ? obj[key] : undefined, root);
}
export function num(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}
export function display(value: unknown, unit = "", digits = 2): string {
  const n = num(value);
  if (n !== null) return n.toLocaleString(locale(), {maximumFractionDigits: digits}) + unit;
  if (typeof value === "boolean") return value ? tr("Oui") : tr("Non");
  if (typeof value === "string" && value.trim() !== "") return value;
  return tr("Indisponible");
}
export function inBootstrap(d: SmartPIDiagnostic): boolean {
  return at(d.live, "control.mode") === "hysteresis" || at(d.live, "learning.stage") === "bootstrap";
}
export function reliableValue(live: Rec, path: string, reliability?: string): unknown {
  if (reliability && at(live, reliability) !== true) return undefined;
  if (path.startsWith("analysis.twin.") && !path.endsWith("reliable")) {
    if (at(live, "analysis.twin.twin_model_reliable") !== true ||
        at(live, "analysis.twin.twin_warming_up") !== false) return undefined;
  }
  return at(live, path);
}
function matchingClimate(hass: HassLike, entityId: string): HAState | null {
  const explicit = Object.values(hass.states).find(s =>
    s.entity_id.startsWith("climate.") &&
    at(s.attributes, "specific_states.regulation_diagnostics") === entityId
  );
  return explicit ?? null;
}
export function discover(hass: HassLike | null | undefined): SmartPIDiagnostic[] {
  if (!hass || !record(hass.states)) return [];
  const result: SmartPIDiagnostic[] = [];
  for (const sensor of Object.values(hass.states)) {
    if (!sensor?.entity_id?.startsWith("sensor.") || !record(sensor.attributes)) continue;
    const a = sensor.attributes;
    if (a.schema_version !== 2 || !record(a.live) || !record(a.history)) continue;
    const climate = matchingClimate(hass, sensor.entity_id);
    const fname = typeof a.friendly_name === "string" ? a.friendly_name : sensor.entity_id;
    const fallback = fname.replace(/ SmartPI Diagnostics$/i, "");
    result.push({
      entityId: sensor.entity_id, climateId: climate?.entity_id ?? null,
      name: typeof climate?.attributes.friendly_name === "string" ? climate.attributes.friendly_name : fallback,
      state: sensor.state, lastUpdated: sensor.last_updated ?? null,
      available: sensor.state !== "unknown" && sensor.state !== "unavailable",
      temperatureUnit: (() => {const u=at(climate?.attributes,"configuration.temperature_unit") ?? climate?.attributes.temperature_unit ?? hass.config?.unit_system?.temperature;return u==="°C" || u==="°F" ? u : null;})(),
      live: sensor.state === "unknown" || sensor.state === "unavailable" ? {} : a.live, history: a.history,
    });
  }
  return result.sort((a, b) => a.name.localeCompare(b.name, locale()));
}
export function explanations(d: SmartPIDiagnostic): string[] {
  const result: string[] = [];
  if (!d.available) return [tr("Capteur indisponible : ses anciens attributs ne représentent pas des valeurs actuelles.")];
  result.push(tr("Le modèle A/B reste une estimation apprise ; consulter son état de confiance avant toute interprétation physique."));
  if (inBootstrap(d)) result.push(
    tr("Apprentissage initial par hystérésis : la commande appliquée ne provient pas nécessairement de la somme PI + FF. Ce décalage ne prouve pas une anomalie.")
  );
  if (at(d.live, "control.in_deadtime_window") === true) result.push(
    tr("Fenêtre de temps mort en cours. Des observations d’apprentissage peuvent être rejetées pendant cette fenêtre.")
  );
  if (at(d.live, "model.tau_reliable") === false) result.push(
    tr("Constante de temps τ déclarée non fiable : ne pas interpréter sa valeur brute comme une durée physique validée.")
  );
  if (at(d.live, "analysis.twin.twin_T_steady_reliable") === false) result.push(
    tr("Température d’équilibre prédite non fiable : elle n’est pas utilisée comme indication de confort ou d’atteignabilité.")
  );
  const ff3 = at(d.live, "feedforward.ff3_status");
  if (typeof ff3 === "string" && ff3.startsWith("disabled:")) result.push(
    tr("FF3 non actif ; motif publié par SmartPI : ") + ff3 + "."
  );
  return result;
}
