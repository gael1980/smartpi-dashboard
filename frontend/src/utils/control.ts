import {
  at,
  display,
  inBootstrap,
  num,
  reliableValue,
  type SmartPIDiagnostic,
} from "../adapter";
import {tr, N_} from "../i18n";
export interface ControlBlock {
  id: string;
  title: string;
  status: string;
  value: string;
  path: string;
  explanation: string;
  reason: string;
  reasonPath: string;
}
type Signal = readonly [label: string, path: string, unit?: string, digits?: number, reliability?: string];
const signals: Record<string, readonly Signal[]> = {
  setpoint: [
    [N_("Trajectoire active"), "setpoint.trajectory_active"],
    [N_("Boost actif"), "setpoint.boost_active"],
  ],
  temperature: [
    [N_("Température extérieure"), "temperature.outdoor", " °C"],
    [N_("Pente intérieure publiée"), "analysis.control.temperature_slope_h", " °C/h", 3],
  ],
  pi: [
    [N_("Erreur de la voie P"), "analysis.control.error_p", " °C", 4],
    [N_("Erreur brute de la voie I"), "temperature.error", " °C", 4],
    [N_("État de l’intégrale"), "temperature.integral_error", "", 6],
    [N_("Gain proportionnel Kp"), "control.kp", "", 6],
    [N_("Gain intégral Ki"), "control.ki", "", 6],
    [N_("Temps intégral Ti"), "control.ti_min", " min"],
    [N_("Source de Kp"), "analysis.governance.kp_source"],
    [N_("Décision sur les gains"), "analysis.governance.last_decision_gains"],
  ],
  ff: [
    [N_("FF1 · anticipation thermique"), "analysis.feedforward.u_ff1", " (ratio)", 6],
    [N_("FF2 · correction apprise"), "analysis.feedforward.u_ff2", " (ratio)", 6],
    [N_("FF3 · correction prédictive"), "analysis.feedforward.u_ff3", " (ratio)", 6],
    [N_("Candidat avec FF3"), "analysis.feedforward.u_ff_effective", " (ratio)", 6],
    [N_("Bande morte active"), "control.in_deadband"],
    [N_("Anticipation avant FF3"), "analysis.feedforward.u_ff_final", " (ratio)", 6],
    [N_("Motif de gel de FF2"), "analysis.feedforward.ff2_freeze_reason"],
    [N_("Observateur stationnaire"), "feedforward.fftrim.stationary.state"],
    [N_("Dernier rejet stationnaire"), "feedforward.fftrim.stationary.last_reject_reason"],
    [N_("Observateur périodique"), "feedforward.fftrim.periodic.state"],
    [N_("Dernier rejet périodique"), "feedforward.fftrim.periodic.last_reject_reason"],
    [N_("Transfert de correction"), "feedforward.fftrim.transfer.state"],
    [N_("Motif du transfert"), "feedforward.fftrim.transfer.reason"],
  ],
  command: [
    [N_("Sortie PI publiée"), "power.pi_percent", " %"],
    [N_("Anticipation retenue"), "power.ff_percent", " %"],
  ],
  direct: [
    [N_("État de l’hystérésis"), "control.hysteresis_state"],
    [N_("Phase de calibration"), "calibration.state"],
    [N_("Autocalibration"), "autocalib.state"],
  ],
  limits: [
    [N_("Commande demandée"), "power.command_percent", " %"],
    [N_("Commande appliquée"), "power.applied_percent", " %"],
    [N_("Saturation déclarée"), "control.saturation_state"],
    [N_("Temporisation imposée"), "analysis.control.forced_by_timing"],
    [N_("Correction anti-windup Δu"), "analysis.control.aw_du", " (ratio)", 6],
    [N_("Source de protection de l’intégrale"), "temperature.integral_guard_source"],
  ],
  applied: [
    [N_("Cycle engagé"), "power.current_cycle_percent", " %"],
    [N_("Candidat au cycle suivant"), "power.next_cycle_percent", " %"],
    [N_("Linéarisation de vanne"), "power.valve_linearization_enabled"],
    [N_("Cycle engagé · espace linéaire"), "power.linear_current_cycle_percent", " %"],
    [N_("Candidat au cycle suivant · espace linéaire"), "power.linear_next_cycle_percent", " %"],
    [N_("Statut du retour de commande"), "feedforward.fftrim.command_ownership.status"],
  ],
  model: [
    [N_("Pertes B"), "model.b", " min⁻¹", 6],
    [N_("Constante thermique τ"), "model.tau_min", " min", 2, "model.tau_reliable"],
    [N_("Temps mort en chauffe"), "model.deadtime_heat_s", " s", 0, "model.deadtime_heat_reliable"],
    [N_("Temps mort en refroidissement"), "model.deadtime_cool_s", " s", 0, "model.deadtime_cool_reliable"],
    [N_("Étape d’apprentissage"), "learning.stage"],
    [N_("Dernier motif d’apprentissage"), "learning.last_reason"],
    [N_("Gouvernance thermique"), "governance.thermal_update_decision"],
    [N_("Motif de gouvernance"), "governance.thermal_update_reason"],
    [N_("État du jumeau thermique"), "feedforward.twin_status"],
    [N_("Température prédite"), "analysis.twin.twin_T_pred", " °C"],
    [N_("Équilibre prédit"), "analysis.twin.twin_T_steady", " °C", 2, "analysis.twin.twin_T_steady_reliable"],
  ],
};
const overviewSize: Record<string, number> = { pi: 6, ff: 5, limits: 5 };
/** Presentation context only; never reruns the controller or infers missing causes. */
export class ControlPresentation {
  constructor(private diagnostic: SmartPIDiagnostic) {}
  private get live() {
    return this.diagnostic.available ? this.diagnostic.live : {};
  }
  get directMode() {
    if (!this.diagnostic.available) return null;
    if (
      ["CoolDown", "HeatUp", "CoolDownFinal"].includes(
        String(at(this.live, "calibration.state")),
      ) ||
      at(this.live, "control.phase") === "Calibration"
    ) return tr("Calibration");
    if (inBootstrap(this.diagnostic) || at(this.live, "control.phase") === "Hysteresis")
      return tr("Hystérésis");
    return null;
  }
  get bypass() {
    return this.directMode !== null;
  }
  get route() {
    return this.bypass
      ? "direct"
      : at(this.live, "control.mode") === "smartpi"
        ? "pi"
        : "unavailable";
  }
  get timingForced() {
    const value = at(this.live, "analysis.control.forced_by_timing");
    return typeof value === "boolean" ? value : null;
  }
  get saturation() {
    const value = at(this.live, "control.saturation_state");
    if (value === "SAT_HI") return tr("Saturation haute déclarée");
    if (value === "SAT_LO") return tr("Saturation basse déclarée");
    return null;
  }
  private unit(value: string | undefined) {
    return value?.replace("°C",this.diagnostic.temperatureUnit === undefined ? "°C" : this.diagnostic.temperatureUnit ?? tr("unité source"));
  }
  detail(block: ControlBlock, expert: boolean) {
    const id = block.id === "command" && this.bypass ? "direct" : block.id;
    const fields = signals[id] ?? [];
    return (expert ? fields : fields.slice(0, overviewSize[id] ?? 4)).map(
      ([label, path, unit, digits, reliability]) => {
        const value = reliableValue(this.live, path, reliability);
        return { label: tr(label), path, reliability, value: display(unit === undefined ? value : num(value), this.unit(unit), digits) };
      },
    );
  }
  blocks(): ControlBlock[] {
    const v = this.live,
      bypass = this.bypass;
    const viaPI = this.route === "pi" ? tr("Voie SmartPI") : tr("Chemin non vérifié");
    const build = (
      id: string,
      title: string,
      path: string,
      unit: string,
      explanation: string,
      reasonPath: string,
      status?: string,
    ): ControlBlock => ({
      id,
      title,
      path,
      value: display(num(at(v, path)), this.unit(unit), path === "model.a" ? 6 : 2),
      explanation,
      reason: display(at(v, reasonPath)),
      reasonPath,
      status:
        status === "Contourné"
          ? status
          : num(at(v, path)) === null
          ? tr("Indisponible")
          : (status ?? tr("Publié")),
    });
    return [
      build(
        "setpoint",
        tr("Consigne filtrée"),
        "setpoint.filtered_setpoint",
        " °C",
        tr("Le façonnage agit sur la voie proportionnelle en régime Stable. La voie intégrale utilise la consigne brute, absente du contrat historique."),
        "setpoint.trajectory_source",
      ),
      build(
        "temperature",
        tr("Température intérieure"),
        "temperature.indoor",
        " °C",
        tr("Mesure publiée par SmartPI, pas une prédiction du modèle."),
        "control.phase",
      ),
      build(
        "pi",
        tr("Régulateur PI"),
        "power.pi_percent",
        " %",
        tr("P utilise une erreur de consigne filtrée ; I utilise une erreur brute signée par le mode HVAC. Le graphique d’écart filtré ne reconstruit pas cette intégrale."),
        "temperature.integral_mode",
        bypass ? tr("Contourné") : viaPI,
      ),
      build(
        "ff",
        "Feedforward",
        "power.ff_percent",
        " %",
        tr("Entrées du feedforward : consigne brute, extérieur et modèle A/B ; corrections apprises et prédictives selon disponibilité. FF1 et FF2 sont combinés puis bornés ; FF3 modifie cette sortie avec une seconde borne, mais en bande morte le runtime retient FF final sans FF3. Ce n’est pas une somme libre de toutes les contributions."),
        "feedforward.ff3_status",
        bypass ? tr("Contourné") : viaPI,
      ),
      build(
        "command",
        this.directMode ?? tr("Commande demandée"),
        bypass ? "power.applied_percent" : "power.command_percent",
        " %",
        bypass
          ? tr("L’hystérésis ou la calibration utilise un chemin direct. PI + FF ne doit pas être relié à la commande appliquée dans ce régime.")
          : tr("En voie PI : clamp(PI + FF retenu, 0, 1) en espace linéaire. FF retenu est power.ff_percent : en bande morte, SmartPI retient FF final sans FF3. Les valeurs sont publiées, sans recalcul."),
        bypass ? "control.phase" : "control.saturation_state",
        bypass ? tr("Voir sortie appliquée") : tr("Publié"),
      ),
      build(
        "limits",
        tr("Limitations et timing"),
        "power.limited_percent",
        " %",
        tr("La pente et le maximum précèdent les contraintes de timing ; une courbe de vanne peut ensuite changer l’espace de commande. Aucun motif n’est déduit d’un simple écart."),
        "analysis.control.integral_guard_mode",
        bypass ? tr("Contourné") : viaPI,
      ),
      build(
        "applied",
        tr("Commande appliquée"),
        "power.applied_percent",
        " %",
        tr("Sortie publiée après les contraintes de sortie. Elle ne mesure ni énergie ni chaleur livrée ; le cycle en cours est publié séparément."),
        "feedforward.fftrim.command_ownership.reason",
      ),
      build(
        "model",
        tr("Pièce et modèle A/B"),
        "model.a",
        " °C/min/u",
        tr("La pièce est un système physique. A/B ne sont que son modèle appris ; la confiance publiée ne constitue pas une validation physique indépendante."),
        "model.confidence",
      ),
    ];
  }
  chain() {
    const v = this.live;
    return [
      ["PI", "power.pi_percent", false],
      ["FF1", "analysis.feedforward.u_ff1", true],
      ["FF2", "analysis.feedforward.u_ff2", true],
      [tr("FF final"), "analysis.feedforward.u_ff_final", true],
      ["FF3", "analysis.feedforward.u_ff3", true],
      [tr("FF effectif"), "analysis.feedforward.u_ff_effective", true],
      ["Hold", "power.hold_percent", false],
      [tr("Demandée"), "power.command_percent", false],
      [tr("Limitée"), "power.limited_percent", false],
      [tr("Appliquée"), "power.applied_percent", false],
    ].map(([label, path, ratio]) => {
      const n = num(at(v, path as string));
      return {
        label: label as string,
        path: path as string,
        value: n === null ? null : n * (ratio ? 100 : 1),
      };
    });
  }
}
