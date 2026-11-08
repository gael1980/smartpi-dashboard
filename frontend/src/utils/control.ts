import {
  at,
  display,
  inBootstrap,
  num,
  reliableValue,
  type SmartPIDiagnostic,
} from "../adapter";
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
    ["Trajectoire active", "setpoint.trajectory_active"],
    ["Boost actif", "setpoint.boost_active"],
  ],
  temperature: [
    ["Température extérieure", "temperature.outdoor", " °C"],
    ["Pente intérieure publiée", "analysis.control.temperature_slope_h", " °C/h", 3],
  ],
  pi: [
    ["Erreur de la voie P", "analysis.control.error_p", " °C", 4],
    ["Erreur brute de la voie I", "temperature.error", " °C", 4],
    ["État de l’intégrale", "temperature.integral_error", "", 6],
    ["Gain proportionnel Kp", "control.kp", "", 6],
    ["Gain intégral Ki", "control.ki", "", 6],
    ["Temps intégral Ti", "control.ti_min", " min"],
    ["Source de Kp", "analysis.governance.kp_source"],
    ["Décision sur les gains", "analysis.governance.last_decision_gains"],
  ],
  ff: [
    ["FF1 · anticipation thermique", "analysis.feedforward.u_ff1", " (ratio)", 6],
    ["FF2 · correction apprise", "analysis.feedforward.u_ff2", " (ratio)", 6],
    ["FF3 · correction prédictive", "analysis.feedforward.u_ff3", " (ratio)", 6],
    ["Candidat avec FF3", "analysis.feedforward.u_ff_effective", " (ratio)", 6],
    ["Bande morte active", "control.in_deadband"],
    ["Anticipation avant FF3", "analysis.feedforward.u_ff_final", " (ratio)", 6],
    ["Motif de gel de FF2", "analysis.feedforward.ff2_freeze_reason"],
    ["Observateur stationnaire", "feedforward.fftrim.stationary.state"],
    ["Dernier rejet stationnaire", "feedforward.fftrim.stationary.last_reject_reason"],
    ["Observateur périodique", "feedforward.fftrim.periodic.state"],
    ["Dernier rejet périodique", "feedforward.fftrim.periodic.last_reject_reason"],
    ["Transfert de correction", "feedforward.fftrim.transfer.state"],
    ["Motif du transfert", "feedforward.fftrim.transfer.reason"],
  ],
  command: [
    ["Sortie PI publiée", "power.pi_percent", " %"],
    ["Anticipation retenue", "power.ff_percent", " %"],
  ],
  direct: [
    ["État de l’hystérésis", "control.hysteresis_state"],
    ["Phase de calibration", "calibration.state"],
    ["Autocalibration", "autocalib.state"],
  ],
  limits: [
    ["Commande demandée", "power.command_percent", " %"],
    ["Commande appliquée", "power.applied_percent", " %"],
    ["Saturation déclarée", "control.saturation_state"],
    ["Temporisation imposée", "analysis.control.forced_by_timing"],
    ["Correction anti-windup Δu", "analysis.control.aw_du", " (ratio)", 6],
    ["Source de protection de l’intégrale", "temperature.integral_guard_source"],
  ],
  applied: [
    ["Cycle engagé", "power.current_cycle_percent", " %"],
    ["Candidat au cycle suivant", "power.next_cycle_percent", " %"],
    ["Linéarisation de vanne", "power.valve_linearization_enabled"],
    ["Cycle engagé · espace linéaire", "power.linear_current_cycle_percent", " %"],
    ["Candidat au cycle suivant · espace linéaire", "power.linear_next_cycle_percent", " %"],
    ["Statut du retour de commande", "feedforward.fftrim.command_ownership.status"],
  ],
  model: [
    ["Pertes B", "model.b", " min⁻¹", 6],
    ["Constante thermique τ", "model.tau_min", " min", 2, "model.tau_reliable"],
    ["Temps mort en chauffe", "model.deadtime_heat_s", " s", 0, "model.deadtime_heat_reliable"],
    ["Temps mort en refroidissement", "model.deadtime_cool_s", " s", 0, "model.deadtime_cool_reliable"],
    ["Étape d’apprentissage", "learning.stage"],
    ["Dernier motif d’apprentissage", "learning.last_reason"],
    ["Gouvernance thermique", "governance.thermal_update_decision"],
    ["Motif de gouvernance", "governance.thermal_update_reason"],
    ["État du jumeau thermique", "feedforward.twin_status"],
    ["Température prédite", "analysis.twin.twin_T_pred", " °C"],
    ["Équilibre prédit", "analysis.twin.twin_T_steady", " °C", 2, "analysis.twin.twin_T_steady_reliable"],
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
    ) return "Calibration";
    if (inBootstrap(this.diagnostic) || at(this.live, "control.phase") === "Hysteresis")
      return "Hystérésis";
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
    if (value === "SAT_HI") return "Saturation haute déclarée";
    if (value === "SAT_LO") return "Saturation basse déclarée";
    return null;
  }
  detail(block: ControlBlock, expert: boolean) {
    const id = block.id === "command" && this.bypass ? "direct" : block.id;
    const fields = signals[id] ?? [];
    return (expert ? fields : fields.slice(0, overviewSize[id] ?? 4)).map(
      ([label, path, unit, digits, reliability]) => {
        const value = reliableValue(this.live, path, reliability);
        return { label, path, reliability, value: display(unit === undefined ? value : num(value), unit, digits) };
      },
    );
  }
  blocks(): ControlBlock[] {
    const v = this.live,
      bypass = this.bypass;
    const viaPI = this.route === "pi" ? "Voie SmartPI" : "Chemin non vérifié";
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
      value: display(num(at(v, path)), unit, path === "model.a" ? 6 : 2),
      explanation,
      reason: display(at(v, reasonPath)),
      reasonPath,
      status:
        status === "Contourné"
          ? status
          : num(at(v, path)) === null
          ? "Indisponible"
          : (status ?? "Publié"),
    });
    return [
      build(
        "setpoint",
        "Consigne filtrée",
        "setpoint.filtered_setpoint",
        " °C",
        "Le façonnage agit sur la voie proportionnelle en régime Stable. La voie intégrale utilise la consigne brute, absente du contrat historique.",
        "setpoint.trajectory_source",
      ),
      build(
        "temperature",
        "Température intérieure",
        "temperature.indoor",
        " °C",
        "Mesure publiée par SmartPI, pas une prédiction du modèle.",
        "control.phase",
      ),
      build(
        "pi",
        "Régulateur PI",
        "power.pi_percent",
        " %",
        "P utilise une erreur de consigne filtrée ; I utilise une erreur brute signée par le mode HVAC. Le graphique d’écart filtré ne reconstruit pas cette intégrale.",
        "temperature.integral_mode",
        bypass ? "Contourné" : viaPI,
      ),
      build(
        "ff",
        "Feedforward",
        "power.ff_percent",
        " %",
        "Entrées du feedforward : consigne brute, extérieur et modèle A/B ; corrections apprises et prédictives selon disponibilité. FF1 et FF2 sont combinés puis bornés ; FF3 modifie cette sortie avec une seconde borne, mais en bande morte le runtime retient FF final sans FF3. Ce n’est pas une somme libre de toutes les contributions.",
        "feedforward.ff3_status",
        bypass ? "Contourné" : viaPI,
      ),
      build(
        "command",
        this.directMode ?? "Commande demandée",
        bypass ? "power.applied_percent" : "power.command_percent",
        " %",
        bypass
          ? "L’hystérésis ou la calibration utilise un chemin direct. PI + FF ne doit pas être relié à la commande appliquée dans ce régime."
          : "En voie PI : clamp(PI + FF retenu, 0, 1) en espace linéaire. FF retenu est power.ff_percent : en bande morte, SmartPI retient FF final sans FF3. Les valeurs sont publiées, sans recalcul.",
        bypass ? "control.phase" : "control.saturation_state",
        bypass ? "Voir sortie appliquée" : "Publié",
      ),
      build(
        "limits",
        "Limitations et timing",
        "power.limited_percent",
        " %",
        "La pente et le maximum précèdent les contraintes de timing ; une courbe de vanne peut ensuite changer l’espace de commande. Aucun motif n’est déduit d’un simple écart.",
        "analysis.control.integral_guard_mode",
        bypass ? "Contourné" : viaPI,
      ),
      build(
        "applied",
        "Commande appliquée",
        "power.applied_percent",
        " %",
        "Sortie publiée après les contraintes de sortie. Elle ne mesure ni énergie ni chaleur livrée ; le cycle en cours est publié séparément.",
        "feedforward.fftrim.command_ownership.reason",
      ),
      build(
        "model",
        "Pièce et modèle A/B",
        "model.a",
        " °C/min/u",
        "La pièce est un système physique. A/B ne sont que son modèle appris ; la confiance publiée ne constitue pas une validation physique indépendante.",
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
      ["FF final", "analysis.feedforward.u_ff_final", true],
      ["FF3", "analysis.feedforward.u_ff3", true],
      ["FF effectif", "analysis.feedforward.u_ff_effective", true],
      ["Hold", "power.hold_percent", false],
      ["Demandée", "power.command_percent", false],
      ["Limitée", "power.limited_percent", false],
      ["Appliquée", "power.applied_percent", false],
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
