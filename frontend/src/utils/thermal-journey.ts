import {at, num, type HassLike, type HAState, type SmartPIDiagnostic} from "../adapter";

export type Choice = {kind: "temperature"; value: number} | {kind: "preset"; value: string};
export type Preset = {id: string; label: string; temperature: number | null};
const labels: Record<string, string> = {none: "Manuel", frost: "Hors gel", eco: "Éco", comfort: "Confort", boost: "Boost", activity: "Activité"};

/** Presentation of published values only: no thermal forecast is computed here. */
export class ThermalJourney {
  readonly climate: HAState | undefined;
  constructor(readonly hass: HassLike | undefined, readonly diagnostic: SmartPIDiagnostic) {
    const candidate = diagnostic.climateId ? hass?.states[diagnostic.climateId] : undefined;
    const matches = Object.values(hass?.states ?? {}).filter(s => s.entity_id.startsWith("climate.") &&
      at(s.attributes, "specific_states.regulation_diagnostics") === diagnostic.entityId);
    this.climate = matches.length === 1 && candidate?.entity_id.startsWith("climate.") &&
      at(candidate.attributes, "specific_states.regulation_diagnostics") === diagnostic.entityId ? candidate : undefined;
  }
  get attributes() { return this.climate?.attributes ?? {}; }
  get available() { return this.diagnostic.available && !!this.climate && !["unknown", "unavailable"].includes(this.climate.state); }
  get unit() {
    const unit = at(this.attributes, "configuration.temperature_unit") ?? this.attributes.temperature_unit ??
      (this.hass as HassLike & {config?: {unit_system?: {temperature?: string}}})?.config?.unit_system?.temperature;
    return unit === "°C" || unit === "°F" ? unit : null;
  }
  get measured() {
    // handler.py passes the thermostat's native temperatures directly to SmartPI.
    return this.diagnostic.available ? num(at(this.diagnostic.live, "temperature.indoor")) : null;
  }
  get target() { return this.available ? num(this.attributes.temperature) : null; }
  get filtered() {
    return this.diagnostic.available ? num(at(this.diagnostic.live, "setpoint.filtered_setpoint")) : null;
  }
  get minimum() { return num(this.attributes.min_temp); }
  get maximum() { return num(this.attributes.max_temp); }
  get step() { const n = num(this.attributes.target_temp_step) ?? num(at(this.attributes, "configuration.target_temperature_step")); return n !== null && n > 0 ? n : null; }
  get locked() { return at(this.attributes, "specific_states.is_locked") === true; }
  get canSetTemperature() {
    const features = num(this.attributes.supported_features);
    return this.available && !this.locked && this.unit !== null && this.target !== null &&
      this.minimum !== null && this.maximum !== null && this.maximum > this.minimum && this.step !== null &&
      features !== null && (features & 1) !== 0 && !["heat_cool", "auto"].includes(this.climate!.state);
  }
  get presets(): Preset[] {
    const modes = this.attributes.preset_modes;
    if (!this.available || !Array.isArray(modes)) return [];
    const away = ["off", "not_home"].includes(String(at(this.attributes, "presence_manager.presence_state")));
    const suffix = this.climate?.state === "cool" ? "_cool" : "";
    const knownMode = this.climate?.state === "heat" || this.climate?.state === "cool";
    return [...new Set(modes.filter((p): p is string => typeof p === "string" && p.length > 0))].map(id => ({
      id, label: Object.hasOwn(labels, id) ? labels[id] : id,
      // Dynamic/activity/manual presets have no fixed position. Never guess one.
      temperature: knownMode && this.unit !== null && !["none", "activity"].includes(id)
        ? num(at(this.attributes, `preset_temperatures.${id}${suffix}${away ? "_away" : ""}_temp`)) : null,
    }));
  }
  get canSetPreset() {
    const features = num(this.attributes.supported_features);
    return this.available && !this.locked && features !== null && (features & 16) !== 0 && this.presets.length > 0;
  }
  get context() {
    return JSON.stringify([this.diagnostic.entityId, this.climate?.entity_id, this.available, this.climate?.state,
      this.attributes.temperature, this.attributes.preset_mode, this.minimum, this.maximum, this.step,
      this.unit, this.locked, this.attributes.supported_features, this.presets]);
  }
  choiceTemperature(choice?: Choice) {
    return choice?.kind === "temperature" ? choice.value : choice?.kind === "preset"
      ? this.presets.find(p => p.id === choice.value)?.temperature ?? null : this.target;
  }
  validate(choice: Choice) {
    if (!choice || (choice.kind !== "temperature" && choice.kind !== "preset")) return false;
    if (choice.kind === "preset") return this.canSetPreset && this.presets.some(p => p.id === choice.value);
    if (!this.canSetTemperature || !Number.isFinite(choice.value)) return false;
    const {minimum: min, maximum: max, step} = this;
    if (choice.value < min! || choice.value > max!) return false;
    const steps = (choice.value - min!) / step!;
    return Math.abs(steps - Math.round(steps)) < 1e-6;
  }
  shift(value: number, direction: -1 | 1) {
    const min = this.minimum!, max = this.maximum!, step = this.step!;
    const position = (value - min) / step;
    const tick = direction > 0 ? Math.floor(position + 1e-6) + 1 : Math.ceil(position - 1e-6) - 1;
    return Number(Math.min(max, Math.max(min, min + tick * step)).toFixed(6));
  }
  get scale(): [number, number] {
    const values = [this.measured, this.target, ...this.presets.map(p => p.temperature)].filter((n): n is number => n !== null);
    const low = values.length ? Math.min(...values) : 16, high = values.length ? Math.max(...values) : 22;
    return [Math.floor(low - 1), Math.ceil(Math.max(high + 1, low + 4))];
  }
  private currentPublication(now: number) {
    if (!this.available) return false;
    const published = Date.parse(this.diagnostic.lastUpdated ?? ""), climateTime = Date.parse(this.climate!.last_updated ?? "");
    return Number.isFinite(now) && Number.isFinite(published) && Number.isFinite(climateTime) &&
      published >= climateTime && now - published <= 600_000 && published <= now + 60_000;
  }
  appliedEffort(now = Date.now()) {
    if (!this.currentPublication(now)) return null;
    const percent = num(at(this.diagnostic.live, "power.applied_percent"));
    if (percent === null || percent < 0 || percent > 100) return null;
    const mode = this.climate!.state;
    return {percent, direction: mode === "heat" ? 1 : mode === "cool" ? -1 : 0,
      label: mode === "heat" ? "Commande de chauffe" : mode === "cool" ? "Commande de refroidissement" : "Commande appliquée"};
  }
  setpointPosition(now = Date.now()) {
    if (!this.currentPublication(now) || this.unit === null || this.measured === null || this.target === null || !["heat", "cool"].includes(this.climate!.state)) return null;
    // Compare the same tenth shown on the ruler, without claiming a Twin tolerance.
    const delta = Math.round(this.measured * 10) - Math.round(this.target * 10);
    if (!Number.isFinite(delta)) return null;
    const kind = delta === 0 ? "aligned" : delta > 0 ? "above" : "below";
    return {kind, overshoot: this.climate!.state === "heat" ? delta > 0 : delta < 0,
      direction: delta === 0 ? 0 : delta > 0 ? -1 : 1, gap: Math.abs(delta) / 10, target: this.target};
  }
  eta(preview = false, now = Date.now()) {
    if (preview || !this.available || this.target === null || this.measured === null || this.unit === null) return null;
    if (!["heat", "cool"].includes(this.climate!.state)) return null;
    const published = Date.parse(this.diagnostic.lastUpdated ?? ""), climateTime = Date.parse(this.climate!.last_updated ?? "");
    if (!Number.isFinite(published) || !Number.isFinite(climateTime) || published < climateTime || now - published > 10 * 60_000 || published > now + 60_000)
      return null;
    const live = this.diagnostic.live, twin = (path: string) => at(live, "analysis.twin." + path);
    if (twin("twin_status") !== "ok" || twin("twin_model_reliable") !== true || twin("twin_warming_up") !== false || at(live, "model.tau_reliable") !== true)
      return null;
    const seconds = num(twin("eta_s")), reason = twin("eta_reason");
    if (reason === "already_reached" && seconds === 0) return {label: "À la consigne", detail: "Selon la tolérance du Twin SmartPI.", seconds: 0};
    if (reason !== "ok" || seconds === null || seconds <= 0 || seconds > 48 * 3600) return null;
    const minutes = Math.ceil(seconds / 60);
    return {label: minutes < 60 ? `≈ ${minutes} min` : `≈ ${Math.floor(minutes / 60)} h ${String(minutes % 60).padStart(2, "0")}`,
      detail: "Meilleur cas du Twin · conditions constantes, commande maximale en chauffe. Pas une heure d’arrivée garantie.", seconds};
  }
}
