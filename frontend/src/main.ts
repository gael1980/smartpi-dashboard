import {LitElement, html, css, nothing} from "lit";
import {customElement, property, state} from "lit/decorators.js";
import {discover, reliableValue, display, at, num, inBootstrap, explanations, type HassLike, type SmartPIDiagnostic} from "./adapter";

import "./components/visual-diagnostics";
import {SessionHistory, timestamp} from "./utils/timeseries";
import type {HistoryConnection} from "./services/history";

type Field = {label: string, path: string, unit?: string, digits?: number, reliable?: string};
type Section = {title: string, note: string, fields: Field[]};

const publicationFormat = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
  timeStyle: "short",
});

const sections: Section[] = [
  {title: "Régulation PI et chaîne U", note: "Séparer commande calculée, limitation et commande appliquée.", fields: [
    {label:"Phase",path:"control.phase"}, {label:"Mode",path:"control.mode"},
    {label:"Kp",path:"control.kp",digits:6}, {label:"Ki",path:"control.ki",digits:6},
    {label:"Ti",path:"control.ti_min",unit:" min"},
    {label:"Part PI",path:"power.pi_percent",unit:" %"},
    {label:"Part FF",path:"power.ff_percent",unit:" %"},
    {label:"Commande demandée",path:"power.command_percent",unit:" %"},
    {label:"Commande limitée",path:"power.limited_percent",unit:" %"},
    {label:"Commande appliquée",path:"power.applied_percent",unit:" %"},
    {label:"Cycle en cours",path:"power.current_cycle_percent",unit:" %"},
    {label:"Cycle suivant",path:"power.next_cycle_percent",unit:" %"},
    {label:"État saturation",path:"control.saturation_state"},
    {label:"Intégrale",path:"temperature.integral_error",digits:6},
    {label:"Gestion intégrale",path:"temperature.integral_mode"},
    {label:"Anti-windup Δu",path:"analysis.control.aw_du",digits:6},
    {label:"Bande morte",path:"control.in_deadband"},
    {label:"Proche consigne",path:"control.in_near_band"},
  ]},
  {title: "Modèle thermique A / B", note: "Le modèle 1R1C est appris (A : °C/min à commande unitaire ; B : min⁻¹) ; sa fiabilité est distincte de la valeur affichée.", fields: [
    {label:"Gain de chauffe A",path:"model.a",digits:6},
    {label:"Pertes B",path:"model.b",digits:6},
    {label:"Confiance A/B",path:"model.confidence"},
    {label:"Constante τ",path:"model.tau_min",unit:" min",reliable:"model.tau_reliable"},
    {label:"Fiabilité τ",path:"model.tau_reliable"},
    {label:"Temps mort de chauffe",path:"model.deadtime_heat_s",unit:" s",digits:0,reliable:"model.deadtime_heat_reliable"},
    {label:"Fiabilité chauffe",path:"model.deadtime_heat_reliable"},
    {label:"Temps mort de refroidissement",path:"model.deadtime_cool_s",unit:" s",digits:0,reliable:"model.deadtime_cool_reliable"},
    {label:"Fiabilité refroidissement",path:"model.deadtime_cool_reliable"},
    {label:"Stabilité A",path:"model.a_stability_ratio",digits:3},
    {label:"Stabilité B",path:"model.b_stability_ratio",digits:3},
    {label:"Détection du temps mort",path:"analysis.deadtime.state"},
    {label:"Dernière issue chauffe",path:"analysis.deadtime.heat_last_outcome"},
    {label:"Dernière issue refroidissement",path:"analysis.deadtime.cool_last_outcome"},
  ]},
  {title: "Apprentissage et gouvernance", note: "Voir les fenêtres, le bootstrap, les rejets et les décisions de gouvernance.", fields: [
    {label:"Apprentissage autorisé",path:"learning.enabled"},
    {label:"Étape",path:"learning.stage"},
    {label:"État du bootstrap",path:"learning.bootstrap_status"},
    {label:"Mesures A",path:"learning.emea_samples_a",digits:0},
    {label:"Mesures B",path:"learning.emea_samples_b",digits:0},
    {label:"Mises à jour A acceptées",path:"learning.accepted_updates_a",digits:0},
    {label:"Mises à jour B acceptées",path:"learning.accepted_updates_b",digits:0},
    {label:"Dernier motif",path:"learning.last_reason"},
    {label:"Dérive A",path:"learning.a_drift_state"},
    {label:"Dérive B",path:"learning.b_drift_state"},
    {label:"Régime thermique",path:"governance.regime"},
    {label:"Décision thermique",path:"governance.thermal_update_decision"},
    {label:"Raison décision",path:"governance.thermal_update_reason"},
    {label:"Décision gains",path:"analysis.governance.last_decision_gains"},
    {label:"Source Kp",path:"analysis.governance.kp_source"},
    {label:"Délai de réponse",path:"analysis.learning.response_lag.lag_s",unit:" s",digits:0},
    {label:"Motif délai",path:"analysis.learning.response_lag.last_reason"},
  ]},
  {title: "Feedforward FF1 / FF2 / FF3", note: "Les contributions u_ff sont des ratios (1 = 100 % de commande), pas des watts. Comprendre le refus éventuel d’une correction.", fields: [
    {label:"État FF3",path:"feedforward.ff3_status"},
    {label:"Raison FF",path:"analysis.feedforward.reason"},
    {label:"FF1",path:"analysis.feedforward.u_ff1",digits:6},
    {label:"FF2",path:"analysis.feedforward.u_ff2",digits:6},
    {label:"FF3",path:"analysis.feedforward.u_ff3",digits:6},
    {label:"FF effectif",path:"analysis.feedforward.u_ff_effective",digits:6},
    {label:"FF2 gelé",path:"analysis.feedforward.ff2_frozen"},
    {label:"Raison gel FF2",path:"analysis.feedforward.ff2_freeze_reason"},
    {label:"Observateur stationnaire",path:"feedforward.fftrim.stationary.state"},
    {label:"Rejet stationnaire",path:"feedforward.fftrim.stationary.last_reject_reason"},
    {label:"Observateur périodique",path:"feedforward.fftrim.periodic.state"},
    {label:"Rejet périodique",path:"feedforward.fftrim.periodic.last_reject_reason"},
    {label:"Transfert FFTrim",path:"feedforward.fftrim.transfer.state"},
    {label:"Motif transfert",path:"feedforward.fftrim.transfer.reason"},
  ]},
  {title: "Thermal Twin", note: "Une prédiction doit avoir son propre drapeau de fiabilité.", fields: [
    {label:"État Twin",path:"feedforward.twin_status"},
    {label:"Modèle Twin fiable",path:"analysis.twin.twin_model_reliable"},
    {label:"Température estimée",path:"analysis.twin.twin_T_hat",unit:" °C"},
    {label:"Température prédite",path:"analysis.twin.twin_T_pred",unit:" °C"},
    {label:"Innovation",path:"analysis.twin.twin_innovation",unit:" °C",digits:4},
    {label:"RMSE 30",path:"analysis.twin.twin_rmse_30",unit:" °C",digits:4},
    {label:"Équilibre estimé",path:"analysis.twin.twin_T_steady",unit:" °C",reliable:"analysis.twin.twin_T_steady_reliable"},
    {label:"Fiabilité équilibre",path:"analysis.twin.twin_T_steady_reliable"},
    {label:"Consigne atteignable (prédiction)",path:"analysis.twin.twin_setpoint_reachable",reliable:"analysis.twin.twin_T_steady_reliable"},
    {label:"ETA",path:"analysis.twin.eta_s",unit:" s",digits:0},
    {label:"Motif ETA",path:"analysis.twin.eta_reason"},
  ]},
  {title: "Consigne, trajectoire, calibration", note: "Les états internes restent affichés sans action de pilotage.", fields: [
    {label:"Consigne filtrée",path:"setpoint.filtered_setpoint",unit:" °C"},
    {label:"Trajectoire active",path:"setpoint.trajectory_active"},
    {label:"Source de trajectoire",path:"setpoint.trajectory_source"},
    {label:"Boost",path:"setpoint.boost_active"},
    {label:"Phase trajectoire",path:"analysis.trajectory.phase"},
    {label:"Freinage nécessaire",path:"analysis.trajectory.braking_needed"},
    {label:"Autocalibration",path:"autocalib.state"},
    {label:"Modèle dégradé",path:"autocalib.model_degraded"},
    {label:"État de calibration",path:"calibration.state"},
    {label:"Tentatives",path:"calibration.retry_count",digits:0},
  ]},
];

@customElement("smartpi-dashboard-panel")
export class SmartPIDashboardPanel extends LitElement {
  @property({attribute:false}) hass?: HassLike & Partial<HistoryConnection>;
  @property({attribute:false}) panel?: unknown;
  @property({type:Boolean}) narrow = false;
  @state() private selectedId = "";

  private sessionHistory = new SessionHistory();
  protected willUpdate(changed: Map<string, unknown>) {
    if(changed.has("hass") && this.hass) this.sessionHistory.collect(discover(this.hass), this.hass.states);
  }
  disconnectedCallback(){this.sessionHistory.clear();super.disconnectedCallback();}

  private metric(label: string, value: unknown, unit = "", digits = 2) {
    return html`<div class="metric"><span>${label}</span><strong>${display(value,unit,digits)}</strong></div>`;
  }

  private power(label: string, value: unknown, cssName: string) {
    const v = num(value);
    const width = v === null ? 0 : Math.min(100, Math.max(0, v));
    return html`<div class="power"><div class="power-label"><span>${label}</span><strong>${display(value," %",1)}</strong></div>
      <div class="track" aria-label=${label+" "+display(value," %",1)}>
        <div class=${"fill "+cssName} style=${"width:"+width+"%"}></div>
      </div></div>`;
  }

  private field(f: Field, live: Record<string, unknown>) {
    const value = display(reliableValue(live, f.path, f.reliable), f.unit ?? "", f.digits ?? 2);
    return html`<div class="detail" title=${f.path}><span>${f.label}</span><strong>${value}</strong></div>`;
  }

  private showDiagnostic(d: SmartPIDiagnostic) {
    const v = d.live;
    const notes = explanations(d);
    const bootstrap = inBootstrap(d);

    const publication = timestamp(d.lastUpdated);
    return html`
      <section class="hero">
        <div class="flex spread">
          <div><div class="eyebrow">THERMOSTAT SÉLECTIONNÉ</div><h2>${d.name}</h2>
            <div class="muted small">${d.climateId ?? d.entityId}</div></div>
          <span class="tag">${bootstrap?"Apprentissage / hystérésis":display(at(v,"control.phase"))}</span>
        </div>
        <p class="muted small">Dernière publication ${publication === null ? "indisponible" : html`<time datetime=${d.lastUpdated ?? ""}>${publicationFormat.format(publication * 1000)}</time>`}</p>
        <div class="metrics">
          ${this.metric("Température intérieure",at(v,"temperature.indoor")," °C")}
          ${this.metric("Consigne filtrée",at(v,"setpoint.filtered_setpoint")," °C")}
          ${this.metric("Commande appliquée",at(v,"power.applied_percent")," %",1)}
          ${this.metric("Température extérieure",at(v,"temperature.outdoor")," °C")}
        </div>
        <section class="learn" aria-label="Avancement de l’apprentissage">
          <div class="flex spread"><h3>Apprentissage du modèle</h3>
            <strong>${display(({bootstrap:"Initialisation", learning:"Collecte du modèle", monitoring:"Surveillance", degraded:"Modèle à consolider"} as Record<string,string>)[String(at(v, "learning.stage"))] ?? at(v, "learning.stage"))}</strong></div>
          <div class="columns">
            ${(["a", "b"] as const).map((key) => {
              const count = num(at(v, `learning.emea_samples_${key}`));
              const initial = num(at(v, `learning.bootstrap_target_${key}`));
              const target = num(at(v, "learning.history_target"));
              const valid = count !== null && count >= 0 && target !== null && target > 0;
              const percent = valid ? Math.min(100, 100 * count / target) : null;
              return html`<div>
                <div class="flex spread"><strong>${key.toUpperCase()} · ${key === "a" ? "chauffe" : "pertes thermiques"}</strong>
                  <span>${display(percent, " %", 0)}</span></div>
                <progress aria-label=${`Historique de ${key.toUpperCase()}`}
                  max=${target ?? 1} value=${valid ? Math.min(count, target) : nothing}></progress>
                <p class="muted small">${display(count, "", 0)} / ${display(target, "", 0)} mesures conservées
                  · premier palier ${display(initial, "", 0)}
                  ${count !== null && initial !== null ? (count >= initial ? "atteint" : "en cours") : ""}</p>
                <p class="muted small">Mises à jour acceptées · ${display(at(v, `learning.accepted_updates_${key}`), "", 0)}</p>
              </div>`;
            })}
          </div>
          <p class="muted small">Les pourcentages décrivent le remplissage de l’historique.
            Confiance publiée · ${display(at(v, "model.confidence"))}
            · τ fiable · ${display(at(v, "model.tau_reliable"))}</p>
          <div class="columns">
            ${(["heat", "cool"] as const).map((direction) => {
              const reliable = at(v, `model.deadtime_${direction}_reliable`);
              return html`<div><strong>Temps mort · ${direction === "heat" ? "chauffe" : "refroidissement"}</strong>
                <p>${reliable === true
                  ? display(at(v, `model.deadtime_${direction}_s`), " s", 0)
                  : reliable === false ? "En attente d’une mesure fiable" : "Indisponible"}</p>
                <p class="muted small">Dernière issue · ${display(at(v, `analysis.deadtime.${direction}_last_outcome`))}</p></div>`;
            })}
          </div>
          ${bootstrap ? html`<p><strong>Prochaine étape</strong> ·
            ${String(at(v, "learning.bootstrap_status")).includes("waiting response lag")
              ? "Les premières mesures sont collectées. SmartPI attend de résoudre le délai de réponse."
              : at(v, "model.deadtime_heat_reliable") === false || at(v, "model.deadtime_cool_reliable") === false
                ? "Acquérir les temps morts encore en attente pour débloquer les observations correspondantes."
                : "Collecter les premières mesures A et B acceptables par SmartPI."}</p>` : nothing}
          ${bootstrap ? html`<p><strong>Étape initiale</strong> · ${display(at(v, "learning.bootstrap_status"))}</p>` : nothing}
          ${at(v, "learning.enabled") === false ? html`<p>Apprentissage désactivé selon SmartPI.</p>` : nothing}
          <p>Détection en cours · ${display(at(v, "analysis.deadtime.state"))}
            · attente écoulée ${display(at(v, "analysis.deadtime.waiting_elapsed_s"), " s", 0)}</p>
          <p>Délai de réponse · ${display(at(v, "analysis.learning.response_lag.lag_s"), " s", 0)}
            · épisodes ${display(at(v, "analysis.learning.response_lag.episodes"), "", 0)}</p>
          <p class="muted small">Motif d’apprentissage · ${display(at(v, "learning.last_reason"))}
            · motif du délai · ${display(at(v, "analysis.learning.response_lag.last_reason"))}</p>
          <p class="muted small">Si les compteurs restent à zéro, les états et motifs ci-dessus
            décrivent la dernière situation publiée. Une nouvelle mesure dépend d’une
            observation exploitable acceptée par SmartPI.</p>
        </section>
      </section>
      <smartpi-visual-diagnostics .hass=${this.hass} .diagnostic=${d} .session=${this.sessionHistory.get(d.entityId)}></smartpi-visual-diagnostics>
      <details class="surface technical"><summary>Diagnostics techniques complets</summary>
      <section><h3>Comprendre la situation</h3><ul>${notes.map(s=>html`<li>${s}</li>`)}</ul></section>
      <div class="subhead"><h2>Diagnostics techniques</h2><span class="muted small">Déplier pour comprendre les détails</span></div>
      <div class="details-list">
        ${sections.map(s=>html`<details class="surface">
          <summary>${s.title}<span class="chevron">⌄</span></summary>
          <p class="muted small">${s.note}</p>
          <div class="detail-grid">${s.fields.map(f=>this.field(f,v))}</div>
        </details>`)}
      </div>
      <details class="surface raw"><summary>Diagnostic brut JSON <span class="chevron">⌄</span></summary>
        <pre>${JSON.stringify({schema_version:2,state:d.state,live:d.live,history:d.history},null,2)}</pre>
      </details>
      </details>
    `;
  }

  render() {
    const list=discover(this.hass);
    const selected=list.find(d=>d.entityId===this.selectedId)??list[0];
    return html`<div class="header"><ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
       <div class="head-text"><h1>SmartPI Dashboard</h1><span>Comprendre la régulation thermique</span></div>
       <span class="tag readonly">Lecture seule</span></div>
      <main>
        <div class="flex spread intro"><h2>Mes thermostats</h2>
          <span class="muted small">${list.length} diagnostic${list.length>1?"s":""} SmartPI v2</span></div>
        ${list.length===0 ? html`<section class="surface empty"><h3>Aucun diagnostic SmartPI v2 détecté</h3>
          <p>Rechercher les capteurs sensor.* dotés de schema_version=2 et des objets live/history dans les outils de développement de Home Assistant.</p></section>`:
          html`<div class="tiles">${list.map(d=>html`<button type="button" class=${"tile "+(selected?.entityId===d.entityId?"selected":"")}
           @click=${()=>{this.selectedId=d.entityId;}} aria-pressed=${selected?.entityId===d.entityId}>
            <strong>${d.name}</strong>
            <span class="big">${display(at(d.live,"temperature.indoor")," °C")}</span>
            <span class="tile-bottom">Consigne filtrée ${display(at(d.live,"setpoint.filtered_setpoint")," °C")}</span>
          </button>`)}</div>
          ${selected?this.showDiagnostic(selected):nothing}`}
        <footer>Source : capteurs SmartPI Diagnostics v2 · Lecture seule · Aucune commande Home Assistant</footer>
      </main>`;
  }

  static styles=css`
    :host{display:block;min-height:100vh;background:var(--primary-background-color);color:var(--primary-text-color);
      font-family:var(--primary-font-family,Roboto,Arial,sans-serif)}
    *{box-sizing:border-box}
    .header{display:flex;align-items:center;gap:12px;background:var(--app-header-background-color,var(--card-background-color));
      color:var(--app-header-text-color,var(--primary-text-color));padding:10px 18px;border-bottom:1px solid var(--divider-color);min-height:66px}
    .head-text{flex:1}.head-text h1{font-size:20px;margin:0}.head-text span{font-size:12px;opacity:.75}
    .eyebrow{font-size:11px;font-weight:700;letter-spacing:.12em;color:var(--secondary-text-color)}
    .tag{border:1px solid var(--divider-color);border-radius:30px;padding:7px 11px;font-size:12px;white-space:nowrap}
    main{max-width:1260px;margin:auto;padding:23px 18px}
    .flex{display:flex;gap:10px;align-items:center}.spread{justify-content:space-between}.intro{margin-bottom:14px}
    .intro h2,.subhead h2{font-size:22px;margin:5px 0}.small{font-size:12px}.muted{color:var(--secondary-text-color)}
    .tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:10px;margin-bottom:15px}
    .tile{background:var(--card-background-color);color:inherit;border:1px solid var(--divider-color);border-radius:14px;
      min-height:105px;padding:12px 14px;text-align:left;cursor:pointer;display:flex;flex-direction:column;gap:5px}
    button:focus-visible,summary:focus-visible{outline:3px solid var(--primary-color);outline-offset:3px}
    .tile{overflow-wrap:anywhere;min-width:0}
    .tile:hover{border-color:var(--primary-color)}.tile.selected{box-shadow:inset 0 -3px var(--primary-color);border-color:var(--primary-color)}
    .big{font-size:24px;font-weight:700;font-variant-numeric:tabular-nums}.tile-bottom{font-size:12px;margin-top:auto;color:var(--secondary-text-color)}
    .hero,.surface{background:var(--card-background-color);border:1px solid var(--divider-color);border-radius:14px}
    .hero{padding:20px;border-inline-start:3px solid var(--primary-color)}.hero h2{margin:4px 0;font-size:25px;overflow-wrap:anywhere}
    .metrics{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:11px;margin-top:14px}
    .metric{background:var(--secondary-background-color,var(--primary-background-color));border-radius:10px;
      padding:14px;display:flex;flex-direction:column;gap:8px;min-width:0}
    .metric span{font-size:12px;color:var(--secondary-text-color)}.metric strong{font-size:21px;overflow-wrap:anywhere}
    .track{height:9px;background:var(--divider-color);border-radius:20px;overflow:hidden;margin-top:8px}
    .fill{height:100%;border-radius:20px}.applied{background:var(--primary-color)}.pi{background:#529ad8}.ff{background:#ab82c6}.cmd{background:#999}
    progress{width:100%;height:16px;accent-color:var(--primary-color)}
    .learn{margin-top:20px;font-size:13px}.columns{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:16px}
    .surface{padding:20px}.surface h3{margin:0 0 13px;font-size:17px}
    .surface p,.surface li{font-size:14px;line-height:1.55}.surface ul{margin:0;padding-left:18px}.surface li{margin-bottom:8px}
    .power{margin:14px 0}.power-label{display:flex;justify-content:space-between;gap:8px;font-size:13px}
    .foot{font-size:12px!important;color:var(--secondary-text-color)}
    .subhead{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:28px 0 12px}
    .details-list{display:grid;gap:10px;margin-bottom:10px}
    summary{display:flex;justify-content:space-between;cursor:pointer;list-style:none;font-weight:600;font-size:15px}
    summary::-webkit-details-marker{display:none}details[open] .chevron{transform:rotate(180deg)}
    .detail-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 18px;margin-top:12px}
    .detail{border-bottom:1px solid var(--divider-color);padding:11px 0;display:flex;justify-content:space-between;gap:12px;font-size:13px}
    .detail span{color:var(--secondary-text-color)}.detail strong{text-align:right;overflow-wrap:anywhere}
    .raw pre{overflow:auto;max-height:340px;background:var(--primary-background-color);padding:12px;border-radius:8px;font-size:11px}
    .soon{margin-top:10px}.empty{margin-bottom:18px}footer{padding:21px 0;color:var(--secondary-text-color);font-size:12px}
    @media(max-width:850px){.metrics{grid-template-columns:repeat(2,1fr)}.columns,.detail-grid{grid-template-columns:1fr}}
    @media(max-width:520px){main{padding:14px 11px}.hero,.surface{padding:15px}.tiles{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
      .tile{padding:10px;min-height:93px}.big{font-size:21px}
      .metric strong{font-size:18px}.hero h2{font-size:23px}.hero .spread{align-items:flex-start;flex-direction:column}
      .subhead{display:block}.readonly{font-size:10px}.head-text h1{font-size:17px}}
  `;
}
