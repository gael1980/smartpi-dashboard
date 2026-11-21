import {at, num, record, type Rec} from "../adapter";
import {tr, N_, numberFormat, translatedTable} from "../i18n";

export interface ExplanationRow {key: string; label: string; value: string}
const codes: Record<string, string> = translatedTable({
  none: N_("Aucun motif indiqué"), init: N_("Initialisation"), reset: N_("Réinitialisation"),
  deadband_hysteresis_shell: N_("Intégrale conservée dans la couronne d’hystérésis de la bande morte"),
  pi_deadband_shell_hold: N_("PI admissible pour l’observation FF dans la bordure de bande morte"),
  setpoint_change: N_("Protection après changement de consigne"), off_resume: N_("Protection après reprise depuis l’arrêt"),
  window_resume: N_("Protection après fermeture de fenêtre"), power_shedding_resume: N_("Protection après délestage"),
  disturbance_recovery: N_("Protection pendant la récupération d’une perturbation"),
  warming_up: N_("Initialisation de l’observation"), collecting: N_("Collecte en cours"), waiting_deadtime: N_("Attente d’un temps mort exploitable"),
  ready: N_("Fenêtre admissible"), rejected: N_("Observation refusée"), observer_rejected: N_("Observation refusée"),
  stationary: N_("Observation stationnaire"), periodic: N_("Observation périodique"),
  applied: N_("Transfert appliqué"), awaiting_cycle_boundary: N_("Attente d’une frontière de cycle"),
  awaiting_post_aw_boundary: N_("Attente de la frontière après anti-windup"), updated_bumpless: N_("Mise à jour avec transfert de l’intégrale"),
  causal_update_without_transfer: N_("Correction FF sans transfert de l’intégrale"), skipped: N_("Mise à jour non appliquée"),
  deadtime_unreliable: N_("Temps mort non fiable"), causal_power_not_covered: N_("Commande causale insuffisamment couverte"),
  washout: N_("Attente après interruption de l’observation"), not_enough_measurements: N_("Mesures distinctes insuffisantes"),
  window_too_short: N_("Fenêtre d’observation trop courte"), incomplete_observer_result: N_("Résultat d’observation incomplet"),
  "skip: no external temp": N_("Observation non retenue : température extérieure absente"),
  "skip: ff3_active": N_("Observation non retenue : FF3 actif"),
  "skip: bootstrap - active deadtime not yet learned": N_("Observation non retenue : temps mort actif encore inconnu"),
  "skip: bootstrap - passive deadtime not yet learned": N_("Observation non retenue : temps mort passif encore inconnu"),
  "skip: resume cool-down": N_("Observation non retenue : attente après reprise"),
  "skip: deadtime window": N_("Observation non retenue : fenêtre de temps mort actif"),
  "skip: deadtime window (cool)": N_("Observation non retenue : fenêtre de temps mort passif"),
  "skip: setpoint transient": N_("Observation non retenue : transition de consigne"),
  "skip: delta too small": N_("Observation non retenue : variation thermique trop faible"),
  "skip: slope outlier": N_("Observation non retenue : pente atypique"),
  "skip: low excitation (u mid)": N_("Observation non retenue : excitation insuffisante"),
  "power not constant": N_("Commande non constante"), "passive baseline not settled": N_("Référence passive non stabilisée"),
  "no outdoor temperature": N_("Température extérieure absente"), "late crossings insufficient": N_("Changements de niveau tardifs insuffisants"),
  "no baseline crossing": N_("Aucun changement de niveau dans la référence"), "passive slope unknown": N_("Pente passive inconnue"),
  "no active response": N_("Aucune réponse active exploitable"), "intercept not resolvable": N_("Délai non identifiable"),
  estimated: N_("Estimation obtenue"), "episode interrupted by restart": N_("Épisode interrompu par un redémarrage"),
});

/** Only exact, source-verified codes are interpreted. Future codes stay visible. */
export function publishedCode(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) return tr("Indisponible");
  return Object.hasOwn(codes, value) ? `${codes[value]} (${value})` : tr("Code publié · {0}", value.length > 300 ? value.slice(0, 300) + "…" : value);
}
const format = () => numberFormat({maximumFractionDigits: 6});
const numeric = (value: unknown, unit = "") => {const n = num(value); return n === null ? tr("Indisponible") : `${format().format(n).replace("-", "−")}${unit}`;};
const commandPoints = (value: unknown) => {const n = num(value); return n === null || !Number.isFinite(n * 100) ? tr("Indisponible") : numeric(n * 100, tr(" points de commande"));};
function transactionDate(value: unknown, now: number): string | null {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) || !Number.isFinite(Date.parse(value)) || !Number.isFinite(now) || Date.parse(value) > now + 60_000) return null;
  const year = Number(value.slice(0, 4)), month = Number(value.slice(5, 7)), day = Number(value.slice(8, 10));
  const days = [31, year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month < 1 || month > 12 || day < 1 || day > days[month - 1] || Number(value.slice(11, 13)) > 23) return null;
  return value;
}

/** Descriptive publication view: no integral contribution or controller decision is inferred. */
export class SmartPIExplanations {
  readonly maintenance: ExplanationRow[];
  readonly learning: ExplanationRow[];
  readonly transaction: {date: string | null; rows: ExplanationRow[]} | null;
  constructor(live: Rec, available = true, now = Date.now()) {
    if (!available) live = {};
    const code = (key: string, label: string, path: string): ExplanationRow => ({key, label, value: publishedCode(at(live, path))});
    const number = (key: string, label: string, path: string, unit = ""): ExplanationRow => ({key, label, value: numeric(at(live, path), unit)});
    this.maintenance = [
      code("hold-source", tr("Origine du maintien de l’intégrale"), "temperature.integral_hold_source"),
      code("hold-mode", tr("Mode de maintien de l’intégrale"), "temperature.integral_hold_mode"),
      code("guard-source", tr("Origine de la protection de l’intégrale"), "temperature.integral_guard_source"),
      ...(record(at(live, "feedforward.fftrim")) ? [
      code("observation-mode", tr("Observation FF2"), "feedforward.fftrim.observation_mode"),
      code("stationary-state", tr("Fenêtre stationnaire"), "feedforward.fftrim.stationary.state"),
      code("periodic-state", tr("Fenêtre périodique"), "feedforward.fftrim.periodic.state"),
      code("trim-reject", tr("Dernier motif d’observation FF2"), "feedforward.fftrim.last_reject_reason"),
      code("trim-update", tr("Dernière issue FF2"), "feedforward.fftrim.last_update_reason"),
      code("transfer-state", tr("Transfert courant"), "feedforward.fftrim.transfer.state"),
      code("transfer-reason", tr("Motif du transfert courant"), "feedforward.fftrim.transfer.reason"),
      ] : []),
    ];
    const transaction = at(live, "feedforward.fftrim.last_transaction");
    this.transaction = record(transaction) ? {date: transactionDate(transaction.timestamp_utc, now), rows: [
      {key: "transaction-mode", label: tr("Observation"), value: publishedCode(transaction.observation_mode)},
      {key: "transaction-state", label: tr("État publié"), value: publishedCode(transaction.state)},
      {key: "transaction-reason", label: tr("Motif publié"), value: publishedCode(transaction.reason)},
      {key: "transaction-quality", label: tr("Qualité publiée"), value: publishedCode(transaction.quality)},
      {key: "requested-trim", label: tr("Variation FF2 demandée"), value: commandPoints(transaction.requested_trim_delta)},
      {key: "stored-trim", label: tr("Variation FF2 mémorisée"), value: commandPoints(transaction.stored_trim_delta)},
      {key: "transferable-i", label: tr("Part d’intégrale transférable publiée"), value: commandPoints(transaction.transferable_i_power)},
      {key: "requested-i", label: tr("Transfert de l’intégrale demandé"), value: commandPoints(transaction.requested_i_transfer)},
      {key: "i-transfer", label: tr("Transfert de l’intégrale appliqué"), value: commandPoints(transaction.applied_i_transfer)},
      {key: "trim-delta", label: tr("Variation FF2 appliquée"), value: commandPoints(transaction.applied_trim_delta)},
      {key: "net-delta", label: tr("Variation nette de commande publiée"), value: commandPoints(transaction.net_command_delta)},
    ]} : null;
    this.learning = [
      code("learning-reason", tr("Dernier motif d’apprentissage"), "learning.last_reason"),
      number("warmup-count", tr("Mise en régime de l’anticipation · compteur accepté"), "analysis.learning.ff_warmup_ok_count"),
      number("warmup-cycles", tr("Mise en régime de l’anticipation · cycles publiés"), "analysis.learning.ff_warmup_cycles"),
      number("response-lag", tr("Délai de réponse publié"), "analysis.learning.response_lag.lag_s", " s"),
      number("lag-estimates", tr("Estimations du délai"), "analysis.learning.response_lag.estimates"),
      number("lag-episodes", tr("Épisodes observés pour le délai"), "analysis.learning.response_lag.episodes"),
      number("lag-target", tr("Seuil d’épisodes publié"), "analysis.learning.response_lag.episodes_target"),
      code("lag-reason", tr("Motif du délai de réponse"), "analysis.learning.response_lag.last_reason"),
      {key: "tau", label: tr("Constante de temps τ"), value: at(live, "model.tau_reliable") === true ? numeric(at(live, "model.tau_min"), " min") : tr("Non interprétable · fiabilité non établie")},
    ];
  }
}
