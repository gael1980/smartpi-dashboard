import {at, num, type HassLike, type HAState, type SmartPIDiagnostic} from "../adapter";
import {tr, N_, translatedTable} from "../i18n";

export type Choice = {kind: "temperature"; value: number} | {kind: "preset"; value: string};
export type Preset = {id: string; label: string; temperature: number | null};
const labels: Record<string, string> = translatedTable({none: N_("Manuel"), frost: N_("Hors gel"), eco: N_("Éco"), comfort: N_("Confort"), boost: "Boost", activity: N_("Activité")});

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
    // Attribute updates (hvac_action, sensors, reasons, etc.) are not mode changes.
    // The command belongs to the diagnostic publication; only a newer HVAC mode
    // makes its direction ambiguous. Keep a conservative fallback for old clients.
    const published = Date.parse(this.diagnostic.lastUpdated ?? "");
    const modeTime = Date.parse(this.climate!.last_changed ?? this.climate!.last_updated ?? "");
    return Number.isFinite(now) && Number.isFinite(published) && Number.isFinite(modeTime) &&
      published >= modeTime && now - published <= 600_000 && published <= now + 60_000;
  }
  appliedEffort(now = Date.now()) {
    if (!this.currentPublication(now)) return null;
    const percent = num(at(this.diagnostic.live, "power.applied_percent"));
    if (percent === null || percent < 0 || percent > 100) return null;
    const mode = this.climate!.state;
    return {percent, direction: mode === "heat" ? 1 : mode === "cool" ? -1 : 0,
      label: mode === "heat" ? tr("Commande de chauffe") : mode === "cool" ? tr("Commande de refroidissement") : tr("Commande appliquée")};
  }
  maintenanceEffort(now = Date.now()) {
    const effort = this.appliedEffort(now), live = this.diagnostic.live;
    // Describe only an explicit stable PI/FF path, without inferring a trend.
    if (!effort || effort.direction !== 1 || effort.percent <= 0 || this.unit === null ||
      this.measured === null || this.target === null || this.filtered !== this.target || this.measured < this.target ||
      at(live, "control.mode") !== "smartpi" || at(live, "control.phase") !== "Stable" ||
      at(live, "control.in_deadband") !== false || at(live, "calibration.state") !== "Idle" ||
      at(live, "setpoint.trajectory_active") !== false || at(live, "setpoint.boost_active") !== false ||
      num(at(live, "power.hold_percent")) !== 0) return null;
    const ff = num(at(live, "power.ff_percent")), pi = num(at(live, "power.pi_percent"));
    const command = num(at(live, "power.command_percent"));
    if (ff === null || ff <= 0 || ff > 100 || pi === null || pi > 0 || command === null ||
      command <= 0 || command > 100 || Math.abs(ff + pi - command) > .2) return null;
    return {ff, pi};
  }
  setpointPosition(now = Date.now()) {
    // A descriptive gap to the current raw target, not the diagnostic's old ETA.
    if (!this.currentPublication(now) || this.unit === null || this.measured === null || this.target === null || !["heat", "cool"].includes(this.climate!.state)) return null;
    // Compare the same tenth shown on the ruler, without claiming a Twin tolerance.
    const delta = Math.round(this.measured * 10) - Math.round(this.target * 10);
    if (!Number.isFinite(delta)) return null;
    const kind = delta === 0 ? "aligned" : delta > 0 ? "above" : "below";
    return {kind, overshoot: this.climate!.state === "heat" ? delta > 0 : delta < 0,
      direction: delta === 0 ? 0 : delta > 0 ? -1 : 1, gap: Math.abs(delta) / 10, target: this.target};
  }
  twinPresentation(preview = false, waiting = false, now = Date.now()) {
    const absent = (detail: string) => ({estimated: null, predicted: null, eta: null, detail});
    if (preview) return absent(tr("Aperçu du réglage · la projection de la consigne active est masquée."));
    if (waiting) return absent(tr("En attente d’une nouvelle publication après le changement de consigne."));
    if (!this.available || this.unit === null || !["heat", "cool"].includes(this.climate!.state))
      return absent(tr("Projection indisponible dans cet état du thermostat."));
    if (!this.currentPublication(now)) return absent(tr("Données Twin récentes indisponibles."));
    const twin = (path: string) => at(this.diagnostic.live, "analysis.twin." + path);
    if (twin("twin_warming_up") === true) return absent(tr("Le Twin est en cours d’initialisation."));
    if (twin("twin_status") !== "ok" || twin("twin_model_reliable") !== true || twin("twin_warming_up") !== false)
      return absent(tr("Le Twin ne publie pas de modèle fiable disponible."));
    const estimated = num(twin("twin_T_hat")), predicted = num(twin("twin_T_pred"));
    const eta = this.eta(false, now);
    let detail = eta?.detail ?? tr("Aucun délai calculable publié par le Twin.");
    if (!eta) {
      const reason = twin("eta_reason");
      if (at(this.diagnostic.live, "model.tau_reliable") !== true) detail = tr("ETA indisponible · constante de temps non fiable.");
      else if (reason === "unreachable") detail = this.climate!.state === "heat" && this.measured !== null && this.target !== null && this.measured > this.target
        ? tr("Pas de délai de retour : l’ETA simule une chauffe maximale alors que la mesure dépasse la consigne.")
        : tr("La consigne n’est pas atteinte dans le scénario ETA du Twin ; ce résultat ne décrit pas toutes les actions du régulateur.");
      else if (reason === "too_far") detail = tr("Le délai publié dépasse l’horizon de 48 h affichable.");
      else if (reason === "missing_text") detail = tr("ETA indisponible · température extérieure manquante.");
      else if (reason === "not_reliable") detail = tr("ETA indisponible · modèle déclaré non fiable pour ce calcul.");
      else if (reason === "ok" || reason === "already_reached") detail = tr("ETA en attente de données cohérentes et récentes pour la consigne active.");
    }
    return {estimated, predicted, eta, detail};
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
    if (reason === "already_reached" && seconds === 0) return {label: tr("À la consigne"), detail: tr("Selon la tolérance du Twin SmartPI."), seconds: 0};
    if (reason !== "ok" || seconds === null || seconds <= 0 || seconds > 48 * 3600) return null;
    const minutes = Math.ceil(seconds / 60);
    return {label: minutes < 60 ? tr("≈ {0} min", minutes) : `≈ ${Math.floor(minutes / 60)} h ${String(minutes % 60).padStart(2, "0")}`,
      detail: tr("Meilleur cas du Twin · conditions constantes, commande maximale en chauffe. Pas une heure d’arrivée garantie."), seconds};
  }
}
