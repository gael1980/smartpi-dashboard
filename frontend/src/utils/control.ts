import {
  at,
  display,
  inBootstrap,
  num,
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
}
/** Presentation context only; never reruns the controller or infers missing causes. */
export class ControlPresentation {
  constructor(private diagnostic: SmartPIDiagnostic) {}
  get bypass() {
    return (
      inBootstrap(this.diagnostic) ||
      ["CoolDown", "HeatUp", "CoolDownFinal"].includes(
        String(at(this.diagnostic.live, "calibration.state")),
      ) ||
      at(this.diagnostic.live, "control.phase") === "Calibration"
    );
  }
  get route() {
    return this.bypass
      ? "direct"
      : at(this.diagnostic.live, "control.mode") === "smartpi"
        ? "pi"
        : "unavailable";
  }
  blocks(): ControlBlock[] {
    const d = this.diagnostic,
      v = d.live,
      bypass = this.bypass;
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
      value: display(at(v, path), unit, path === "model.a" ? 6 : 2),
      explanation,
      reason: display(at(v, reasonPath)),
      status:
        !d.available || at(v, path) == null
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
        bypass ? "Contourné" : "Voie SmartPI",
      ),
      build(
        "ff",
        "Feedforward",
        "power.ff_percent",
        " %",
        "Entrées du feedforward : consigne brute, extérieur et modèle A/B ; corrections apprises et prédictives selon disponibilité. FF1 et FF2 sont combinés puis bornés ; FF3 modifie cette sortie avec une seconde borne, mais en bande morte le runtime retient FF final sans FF3. Ce n’est pas une somme libre de toutes les contributions.",
        "feedforward.ff3_status",
        bypass ? "Contourné" : "Voie SmartPI",
      ),
      build(
        "command",
        bypass ? "Hystérésis / calibration" : "Commande demandée",
        bypass ? "power.applied_percent" : "power.command_percent",
        " %",
        bypass
          ? "L’hystérésis ou la calibration utilise un chemin direct. PI + FF ne doit pas être relié à la commande appliquée dans ce régime."
          : "En voie PI : clamp(PI + FF retenu, 0, 1) en espace linéaire. FF retenu est power.ff_percent : en bande morte, SmartPI retient FF final sans FF3. Les valeurs sont publiées, sans recalcul.",
        "control.saturation_state",
        bypass ? "Voir sortie appliquée" : "Publié",
      ),
      build(
        "limits",
        "Limitations et timing",
        "power.limited_percent",
        " %",
        "La pente et le maximum précèdent les contraintes de timing ; une courbe de vanne peut ensuite changer l’espace de commande. Aucun motif n’est déduit d’un simple écart.",
        "analysis.control.integral_guard_mode",
        bypass ? "Contourné (voie directe)" : "Publié",
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
        "Système thermique / modèle",
        "model.a",
        " °C/min/u",
        "La pièce est un système physique. A/B ne sont que son modèle appris ; la confiance publiée ne constitue pas une validation physique indépendante.",
        "model.confidence",
      ),
    ];
  }
  chain() {
    const v = this.diagnostic.live;
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
