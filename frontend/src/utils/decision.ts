import {at, num, type Rec} from "../adapter";
import {ThermalJourney, type Choice} from "./thermal-journey";
import {tr, N_, translatedTable} from "../i18n";

const reasons: Record<string, string> = translatedTable({
  hvac_off_manual: N_("Arrêt manuel publié"), hvac_off_auto_start_stop: N_("Arrêt automatique publié"), hvac_off_window_detection: N_("Fenêtre ouverte : arrêt publié"), hvac_off_sleep_mode: N_("Mode sommeil publié"), hvac_off_safety_detection: N_("Sécurité : arrêt publié"), hvac_off_central_mode: N_("Mode central : arrêt publié"), hvac_off_inhibition: N_("Inhibition : arrêt publié"),
  overpowering_detected: N_("Délestage détecté"), safety_detected: N_("Sécurité détectée"), target_temp_window_eco: N_("Fenêtre ouverte : consigne Éco retenue"), target_temp_window_frost: N_("Fenêtre ouverte : consigne hors gel retenue"), target_temp_power: N_("Consigne de délestage retenue"), target_temp_central_mode: N_("Consigne du mode central retenue"), target_temp_activity_detected: N_("Consigne liée à l’activité"), target_temp_activity_not_detected: N_("Consigne liée à l’absence d’activité"), target_temp_absence_detected: N_("Consigne d’absence retenue"), target_temp_timed_preset: N_("Preset temporisé actif"), not_initialized: N_("Initialisation incomplète"), underlying_unavailable: N_("Équipement sous-jacent indisponible"),
});

/** Read published authority reasons; never infer who changed a temperature. */
export class DecisionPresentation {
  constructor(readonly model: ThermalJourney) {}
  get reasons() {
    if (!this.model.available) return [];
    const a = this.model.attributes, messages = at(a, "specific_states.messages");
    const offReason = ["off", "sleep"].includes(this.model.climate?.state ?? "") ? at(a, "specific_states.hvac_off_reason") : null;
    const raw = [offReason, at(a, "specific_states.hvac_mode_reason"), ...(Array.isArray(messages) ? messages : [])];
    if (at(a, "specific_states.inhibition.inhibited") === true) raw.unshift("hvac_off_inhibition");
    return [...new Set(raw.filter((r): r is string => typeof r === "string" && r.length > 0))].map(code => ({code, label: Object.hasOwn(reasons, code) ? reasons[code] : code}));
  }
  get requested(): Rec {
    const value = this.model.attributes.requested_state;
    return value && typeof value === "object" && !Array.isArray(value) ? value as Rec : {};
  }
  get requestedTemperature() { return num(this.requested.target_temperature); }
  advice(choice?: Choice) {
    if (!choice || !this.model.available) return [];
    const result: string[] = [];
    if (this.model.locked) result.push(tr("Le thermostat est verrouillé."));
    if (this.model.climate?.state === "off") result.push(tr("Le thermostat est arrêté. Changer la consigne ne le remettra pas automatiquement en marche."));
    if (this.reasons.some(r => ["hvac_off_window_detection", "hvac_off_safety_detection", "hvac_off_inhibition", "hvac_off_central_mode", "overpowering_detected", "target_temp_power", "target_temp_window_eco", "target_temp_window_frost"].includes(r.code))) result.push(tr("Une priorité publiée intervient. Ce choix ne supprime pas cette priorité."));
    const candidate = this.model.choiceTemperature(choice), target = this.model.target;
    const applied = num(at(this.model.diagnostic.live, "power.applied_percent"));
    if (this.model.climate?.state === "heat" && candidate !== null && target !== null && candidate > target && applied === 100)
      result.push(tr("La commande appliquée est déjà à 100 %. Monter la consigne n’augmentera pas la commande actuelle."));
    if (choice.kind === "temperature" && this.model.attributes.preset_mode !== "none") result.push(tr("Une température manuelle remplace le preset actif. Vos plannings restent gérés à l’extérieur du panneau."));
    return result;
  }
}
