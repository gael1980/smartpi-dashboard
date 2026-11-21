import {LitElement, html, css, nothing} from "lit";
import {customElement, property, state} from "lit/decorators.js";
import {discover, reliableValue, display, at, num, inBootstrap, explanations, type HassLike, type SmartPIDiagnostic} from "./adapter";

import "./components/visual-diagnostics";
import "./components/thermal-journey";
import type {ClimateConnection} from "./services/climate";
import type {ObservatoryConnection} from "./services/observatory";
import "./components/observatory";
import "./components/orphan-notebooks";
import type {ObservationPoint} from "./utils/evidence";
import "./components/publication-quality";
import "./components/smartpi-explanations";
import "./components/room-comparison";
import type {ObservatoryElement} from "./components/observatory";
import type {ThermalJourneyElement} from "./components/thermal-journey";
import {SessionHistory, timestamp} from "./utils/timeseries";
import {ThermalJourney} from "./utils/thermal-journey";
import type {HistoryConnection} from "./services/history";
import {tr, N_, dateTimeFormat, setLanguage} from "./i18n";

type Field = {label: string, path: string, unit?: string, digits?: number, reliable?: string};
type Section = {title: string, note: string, fields: Field[]};

const publicationFormat = () => dateTimeFormat({
  dateStyle: "medium",
  timeStyle: "short",
});

const sections: Section[] = [
  {title: N_("Régulation PI et chaîne U"), note: N_("Séparer commande calculée, limitation et commande appliquée."), fields: [
    {label:N_("Phase"),path:"control.phase"}, {label:N_("Mode"),path:"control.mode"},
    {label:"Kp",path:"control.kp",digits:6}, {label:"Ki",path:"control.ki",digits:6},
    {label:"Ti",path:"control.ti_min",unit:" min"},
    {label:N_("Part PI"),path:"power.pi_percent",unit:" %"},
    {label:N_("Part FF"),path:"power.ff_percent",unit:" %"},
    {label:N_("Commande demandée"),path:"power.command_percent",unit:" %"},
    {label:N_("Commande limitée"),path:"power.limited_percent",unit:" %"},
    {label:N_("Commande appliquée"),path:"power.applied_percent",unit:" %"},
    {label:N_("Cycle en cours"),path:"power.current_cycle_percent",unit:" %"},
    {label:N_("Cycle suivant"),path:"power.next_cycle_percent",unit:" %"},
    {label:N_("État saturation"),path:"control.saturation_state"},
    {label:N_("Intégrale"),path:"temperature.integral_error",digits:6},
    {label:N_("Gestion intégrale"),path:"temperature.integral_mode"},
    {label:N_("Anti-windup Δu"),path:"analysis.control.aw_du",digits:6},
    {label:N_("Bande morte"),path:"control.in_deadband"},
    {label:N_("Proche consigne"),path:"control.in_near_band"},
  ]},
  {title: N_("Modèle thermique A / B"), note: N_("Le modèle 1R1C est appris (A : °C/min à commande unitaire ; B : min⁻¹) ; sa fiabilité est distincte de la valeur affichée."), fields: [
    {label:N_("Gain de chauffe A"),path:"model.a",digits:6},
    {label:N_("Pertes B"),path:"model.b",digits:6},
    {label:N_("Confiance A/B"),path:"model.confidence"},
    {label:N_("Constante τ"),path:"model.tau_min",unit:" min",reliable:"model.tau_reliable"},
    {label:N_("Fiabilité τ"),path:"model.tau_reliable"},
    {label:N_("Temps mort de chauffe"),path:"model.deadtime_heat_s",unit:" s",digits:0,reliable:"model.deadtime_heat_reliable"},
    {label:N_("Fiabilité chauffe"),path:"model.deadtime_heat_reliable"},
    {label:N_("Temps mort de refroidissement"),path:"model.deadtime_cool_s",unit:" s",digits:0,reliable:"model.deadtime_cool_reliable"},
    {label:N_("Fiabilité refroidissement"),path:"model.deadtime_cool_reliable"},
    {label:N_("Stabilité A"),path:"model.a_stability_ratio",digits:3},
    {label:N_("Stabilité B"),path:"model.b_stability_ratio",digits:3},
    {label:N_("Détection du temps mort"),path:"analysis.deadtime.state"},
    {label:N_("Dernière issue chauffe"),path:"analysis.deadtime.heat_last_outcome"},
    {label:N_("Dernière issue refroidissement"),path:"analysis.deadtime.cool_last_outcome"},
  ]},
  {title: N_("Apprentissage et gouvernance"), note: N_("Voir les fenêtres, le bootstrap, les rejets et les décisions de gouvernance."), fields: [
    {label:N_("Apprentissage autorisé"),path:"learning.enabled"},
    {label:N_("Étape"),path:"learning.stage"},
    {label:N_("État du bootstrap"),path:"learning.bootstrap_status"},
    {label:N_("Mesures A"),path:"learning.emea_samples_a",digits:0},
    {label:N_("Mesures B"),path:"learning.emea_samples_b",digits:0},
    {label:N_("Mises à jour A acceptées"),path:"learning.accepted_updates_a",digits:0},
    {label:N_("Mises à jour B acceptées"),path:"learning.accepted_updates_b",digits:0},
    {label:N_("Dernier motif"),path:"learning.last_reason"},
    {label:N_("Dérive A"),path:"learning.a_drift_state"},
    {label:N_("Dérive B"),path:"learning.b_drift_state"},
    {label:N_("Régime thermique"),path:"governance.regime"},
    {label:N_("Décision thermique"),path:"governance.thermal_update_decision"},
    {label:N_("Raison décision"),path:"governance.thermal_update_reason"},
    {label:N_("Décision gains"),path:"analysis.governance.last_decision_gains"},
    {label:N_("Source Kp"),path:"analysis.governance.kp_source"},
    {label:N_("Délai de réponse"),path:"analysis.learning.response_lag.lag_s",unit:" s",digits:0},
    {label:N_("Motif délai"),path:"analysis.learning.response_lag.last_reason"},
  ]},
  {title: N_("Feedforward FF1 / FF2 / FF3"), note: N_("Les contributions u_ff sont des ratios (1 = 100 % de commande), pas des watts. Comprendre le refus éventuel d’une correction."), fields: [
    {label:N_("État FF3"),path:"feedforward.ff3_status"},
    {label:N_("Raison FF"),path:"analysis.feedforward.reason"},
    {label:"FF1",path:"analysis.feedforward.u_ff1",digits:6},
    {label:"FF2",path:"analysis.feedforward.u_ff2",digits:6},
    {label:"FF3",path:"analysis.feedforward.u_ff3",digits:6},
    {label:N_("FF effectif"),path:"analysis.feedforward.u_ff_effective",digits:6},
    {label:N_("FF2 gelé"),path:"analysis.feedforward.ff2_frozen"},
    {label:N_("Raison gel FF2"),path:"analysis.feedforward.ff2_freeze_reason"},
    {label:N_("Observateur stationnaire"),path:"feedforward.fftrim.stationary.state"},
    {label:N_("Rejet stationnaire"),path:"feedforward.fftrim.stationary.last_reject_reason"},
    {label:N_("Observateur périodique"),path:"feedforward.fftrim.periodic.state"},
    {label:N_("Rejet périodique"),path:"feedforward.fftrim.periodic.last_reject_reason"},
    {label:N_("Transfert FFTrim"),path:"feedforward.fftrim.transfer.state"},
    {label:N_("Motif transfert"),path:"feedforward.fftrim.transfer.reason"},
  ]},
  {title: N_("Thermal Twin"), note: N_("Une prédiction doit avoir son propre drapeau de fiabilité."), fields: [
    {label:N_("État Twin"),path:"feedforward.twin_status"},
    {label:N_("Modèle Twin fiable"),path:"analysis.twin.twin_model_reliable"},
    {label:N_("Température estimée"),path:"analysis.twin.twin_T_hat",unit:" °C"},
    {label:N_("Température prédite"),path:"analysis.twin.twin_T_pred",unit:" °C"},
    {label:N_("Innovation"),path:"analysis.twin.twin_innovation",unit:" °C",digits:4},
    {label:N_("RMSE de l’innovation · EMA"),path:"analysis.twin.twin_rmse_30",unit:" °C",digits:4},
    {label:N_("Équilibre estimé"),path:"analysis.twin.twin_T_steady",unit:" °C",reliable:"analysis.twin.twin_T_steady_reliable"},
    {label:N_("Fiabilité équilibre"),path:"analysis.twin.twin_T_steady_reliable"},
    {label:N_("Consigne atteignable (prédiction)"),path:"analysis.twin.twin_setpoint_reachable",reliable:"analysis.twin.twin_T_steady_reliable"},
    {label:"ETA",path:"analysis.twin.eta_s",unit:" s",digits:0},
    {label:N_("Motif ETA"),path:"analysis.twin.eta_reason"},
  ]},
  {title: N_("Consigne, trajectoire, calibration"), note: N_("Les états internes restent affichés sans action de pilotage."), fields: [
    {label:N_("Consigne filtrée"),path:"setpoint.filtered_setpoint",unit:" °C"},
    {label:N_("Trajectoire active"),path:"setpoint.trajectory_active"},
    {label:N_("Source de trajectoire"),path:"setpoint.trajectory_source"},
    {label:"Boost",path:"setpoint.boost_active"},
    {label:N_("Phase trajectoire"),path:"analysis.trajectory.phase"},
    {label:N_("Freinage nécessaire"),path:"analysis.trajectory.braking_needed"},
    {label:N_("Autocalibration"),path:"autocalib.state"},
    {label:N_("Modèle dégradé"),path:"autocalib.model_degraded"},
    {label:N_("État de calibration"),path:"calibration.state"},
    {label:N_("Tentatives"),path:"calibration.retry_count",digits:0},
  ]},
];

@customElement("smartpi-dashboard-panel")
export class SmartPIDashboardPanel extends LitElement {
  @property({attribute:false}) hass?: HassLike & Partial<HistoryConnection> & Partial<ClimateConnection> & Partial<ObservatoryConnection>;
  @property({attribute:false}) panel?: unknown;
  @property({type:Boolean}) narrow = false;
  @state() private selectedId = "";
  @state() private observationData?: {entityId:string;points:ObservationPoint[];error:string};

  private sessionHistory = new SessionHistory();
  private freshnessTimer?: ReturnType<typeof setInterval>;
  connectedCallback(){super.connectedCallback();this.freshnessTimer=setInterval(()=>this.requestUpdate(),30_000);}

  protected willUpdate(changed: Map<string, unknown>) {
    if(changed.has("hass") && this.hass) setLanguage(this.hass.locale?.language ?? this.hass.language);
    if(changed.has("hass") && this.hass) this.sessionHistory.collect(discover(this.hass), this.hass.states,Date.now()/1000,this.hass.config?.unit_system?.temperature);
  }
  disconnectedCallback(){clearInterval(this.freshnessTimer);this.freshnessTimer=undefined;this.sessionHistory.clear();super.disconnectedCallback();}

  private metric(label: string, value: unknown, unit = "", digits = 2, date = "") {
    return html`<div class="metric"><span>${label}</span><strong>${display(value,unit,digits)}</strong><smartpi-publication-quality .now=${Date.now()/1000} .value=${value} .date=${date}></smartpi-publication-quality></div>`;
  }

  private power(label: string, value: unknown, cssName: string) {
    const v = num(value);
    const width = v === null ? 0 : Math.min(100, Math.max(0, v));
    return html`<div class="power"><div class="power-label"><span>${label}</span><strong>${display(value," %",1)}</strong></div>
      <div class="track" aria-label=${label+" "+display(value," %",1)}>
        <div class=${"fill "+cssName} style=${"width:"+width+"%"}></div>
      </div></div>`;
  }

  private field(f: Field, live: Record<string, unknown>, unit: string) {
    const value = display(reliableValue(live, f.path, f.reliable), (f.unit ?? "").replace("°C",unit), f.digits ?? 2);
    return html`<div class="detail" title=${f.path}><span>${tr(f.label)}</span><strong>${value}</strong></div>`;
  }

  private showDiagnostic(d: SmartPIDiagnostic) {
    const v = d.live;
    const notes = explanations(d);
    const bootstrap = inBootstrap(d);

    const monitoring = !bootstrap && at(v, "learning.stage") === "monitoring";
    const learningDetails = html`
          <smartpi-explanations mode="learning" .diagnostic=${d} .now=${Date.now()/1000}></smartpi-explanations>
          <div class="columns">
            ${(["a", "b"] as const).map((key) => {
              const count = num(at(v, `learning.emea_samples_${key}`));
              const initial = num(at(v, `learning.bootstrap_target_${key}`));
              const target = num(at(v, "learning.history_target"));
              const valid = count !== null && count >= 0 && target !== null && target > 0;
              const percent = valid ? Math.min(100, 100 * count / target) : null;
              return html`<div>
                <div class="flex spread"><strong>${key.toUpperCase()} · ${key === "a" ? "chauffe" : tr("pertes thermiques")}</strong>
                  <span>${display(percent, " %", 0)}</span></div>
                ${monitoring ? nothing : html`<progress aria-label=${tr("Historique de {0}", key.toUpperCase())}
                  max=${target ?? 1} value=${valid ? Math.min(count, target) : nothing}></progress>`}
                <p class="muted small">${display(count, "", 0)} / ${display(target, "", 0)} ${tr("mesures conservées · premier palier")} ${display(initial, "", 0)}
                  ${count !== null && initial !== null ? (count >= initial ? "atteint" : tr("en cours")) : ""}</p>
                <p class="muted small">${tr("Mises à jour acceptées")} · ${display(at(v, `learning.accepted_updates_${key}`), "", 0)}</p>
              </div>`;
            })}
          </div>
          <p class="muted small">${tr("Les pourcentages décrivent le remplissage de l’historique. Confiance publiée")} · ${display(at(v, "model.confidence"))}
            · ${tr("τ fiable")} · ${display(at(v, "model.tau_reliable"))}</p>
          <div class="columns">
            ${(["heat", "cool"] as const).map((direction) => {
              const reliable = at(v, `model.deadtime_${direction}_reliable`);
              return html`<div><strong>${tr("Temps mort")} · ${direction === "heat" ? "chauffe" : "refroidissement"}</strong>
                <p>${reliable === true
                  ? display(at(v, `model.deadtime_${direction}_s`), " s", 0)
                  : reliable === false ? tr("En attente d’une mesure fiable") : tr("Indisponible")}</p>
                <p class="muted small">${tr("Dernière issue")} · ${display(at(v, `analysis.deadtime.${direction}_last_outcome`))}</p></div>`;
            })}
          </div>
          ${bootstrap ? html`<p><strong>${tr("Prochaine étape")}</strong> ·
            ${String(at(v, "learning.bootstrap_status")).includes("waiting response lag")
              ? tr("Les premières mesures sont collectées. SmartPI attend de résoudre le délai de réponse.")
              : at(v, "model.deadtime_heat_reliable") === false || at(v, "model.deadtime_cool_reliable") === false
                ? tr("Acquérir les temps morts encore en attente pour débloquer les observations correspondantes.")
                : tr("Collecter les premières mesures A et B acceptables par SmartPI.")}</p>` : nothing}
          ${bootstrap ? html`<p><strong>${tr("Étape initiale")}</strong> · ${display(at(v, "learning.bootstrap_status"))}</p>` : nothing}
          ${at(v, "learning.enabled") === false ? html`<p>${tr("Apprentissage désactivé selon SmartPI.")}</p>` : nothing}
          <p>${tr("Détection en cours")} · ${display(at(v, "analysis.deadtime.state"))}
            · ${tr("attente écoulée")} ${display(at(v, "analysis.deadtime.waiting_elapsed_s"), " s", 0)}</p>
          <p>${tr("Délai de réponse")} · ${display(at(v, "analysis.learning.response_lag.lag_s"), " s", 0)}
            · ${tr("épisodes")} ${display(at(v, "analysis.learning.response_lag.episodes"), "", 0)}</p>
          <p class="muted small">${tr("Motif d’apprentissage")} · ${display(at(v, "learning.last_reason"))}
            · ${tr("motif du délai")} · ${display(at(v, "analysis.learning.response_lag.last_reason"))}</p>
          <p class="muted small">${tr("Si les compteurs restent à zéro, les états et motifs ci-dessus décrivent la dernière situation publiée. Une nouvelle mesure dépend d’une observation exploitable acceptée par SmartPI.")}</p>
`;
    const publication = timestamp(d.lastUpdated);
    return html`
      <section class="hero">
        <div class="flex spread">
          <div><div class="eyebrow">${tr("THERMOSTAT SÉLECTIONNÉ")}</div><h2>${d.name}</h2>
            <div class="muted small">${d.climateId ?? d.entityId}</div></div>
          <span class="tag">${bootstrap?tr("Apprentissage / hystérésis"):display(at(v,"control.phase"))}</span>
        </div>
        <p class="muted small">${tr("Dernière publication")} ${publication === null ? tr("indisponible") : html`<time datetime=${d.lastUpdated ?? ""}>${publicationFormat().format(publication * 1000)}</time>`}</p>
        <smartpi-thermal-journey .hass=${this.hass} .diagnostic=${d}
          @observatory-refresh=${(event: CustomEvent<{entityId: string}>) => {if (event.detail.entityId === d.entityId) void this.renderRoot.querySelector<ObservatoryElement>("smartpi-observatory")?.refresh();}}></smartpi-thermal-journey>
        <smartpi-explanations mode="maintenance" .diagnostic=${d} .now=${Date.now()/1000}></smartpi-explanations>
        <div class="metrics">
          ${this.metric(tr("Commande appliquée"),at(v,"power.applied_percent")," %",1,d.lastUpdated ?? "")}
          ${this.metric(tr("Température extérieure"),at(v,"temperature.outdoor"),new ThermalJourney(this.hass,d).unit ?? "",2,d.lastUpdated ?? "")}
        </div>
        <section class="learn" aria-label="${tr("Avancement de l’apprentissage")}">
          <div class="flex spread"><h3>${monitoring ? tr("Surveillance du modèle") : tr("Apprentissage du modèle")}</h3>
            <strong>${display(({bootstrap:tr("Initialisation"), learning:tr("Collecte du modèle"), monitoring:tr("Surveillance"), degraded:tr("Modèle à consolider")} as Record<string,string>)[String(at(v, "learning.stage"))] ?? at(v, "learning.stage"))}</strong></div>
          ${monitoring ? html`<p class="muted small">${tr("Collecte initiale achevée · le modèle reste sous surveillance.")}</p>
            <details class="learning-details"><summary>${tr("Mesures, fiabilité et motifs")} <span class="chevron" aria-hidden="true">⌄</span></summary>${learningDetails}</details>` : learningDetails}
        </section>
      </section>
      <smartpi-observatory .hass=${this.hass} .diagnostic=${d}
        @observatory-points=${(event: CustomEvent<{entityId:string;points:ObservationPoint[];error:string}>) => {if(event.detail.entityId===d.entityId)this.observationData=event.detail;}}
        @prepare-temperature=${(event: CustomEvent<{entityId: string; value: number}>) => {
          if (event.detail.entityId !== d.entityId) return;
          const journey = this.renderRoot.querySelector<ThermalJourneyElement>("smartpi-thermal-journey");
          if (journey) void journey.previewTemperature(event.detail.value).then(prepared => {if (prepared) journey.scrollIntoView({block: "center"});});
        }}></smartpi-observatory>
      <smartpi-visual-diagnostics .hass=${this.hass} .diagnostic=${d} .session=${this.sessionHistory.get(d.entityId)} .observations=${this.observationData?.entityId===d.entityId ? this.observationData.points : []} .observationError=${this.observationData?.entityId===d.entityId ? this.observationData.error : ""}></smartpi-visual-diagnostics>
      <details class="surface technical"><summary>${tr("Diagnostics techniques complets")}</summary>
      <section><h3>${tr("Comprendre la situation")}</h3><ul>${notes.map(s=>html`<li>${s}</li>`)}</ul></section>
      <div class="subhead"><h2>${tr("Diagnostics techniques")}</h2><span class="muted small">${tr("Déplier pour comprendre les détails")}</span></div>
      <div class="details-list">
        ${sections.map(s=>html`<details class="surface">
          <summary>${tr(s.title)}<span class="chevron">⌄</span></summary>
          <p class="muted small">${tr(s.note)}</p>
          <div class="detail-grid">${s.fields.map(f=>this.field(f,v,d.temperatureUnit ?? tr("unité source")))}</div>
        </details>`)}
      </div>
      <details class="surface raw"><summary>${tr("Diagnostic brut JSON")} <span class="chevron">⌄</span></summary>
        <pre>${JSON.stringify({schema_version:2,state:d.state,live:d.live,history:d.history},null,2)}</pre>
      </details>
      </details>
    `;
  }

  private thermostatTile(d: SmartPIDiagnostic, selected: boolean) {
    const journey = new ThermalJourney(this.hass, d);
    const mode = journey.available ? journey.climate!.state === "off" ? "off" : journey.attributes.preset_mode : undefined;
    const modes: Record<string, string> = {frost:tr("Hors gel"), eco:tr("Éco"), comfort:tr("Confort"), boost:"Boost", off:tr("Arrêt"), none:tr("Manuel"), activity:tr("Activité")};
    const knownMode = typeof mode === "string" && Object.hasOwn(modes, mode);
    const tone = knownMode ? mode : "unknown";
    const label = knownMode ? modes[mode] : typeof mode === "string" && mode.trim() ? mode : tr("Mode indisponible");
    const effort = journey.appliedEffort();
    const published = timestamp(d.lastUpdated);
    const stale = published !== null && Date.now() / 1000 - published > 600;
    return html`<button type="button" class=${"tile mode-" + tone + (selected ? " selected" : "")}
      @click=${() => {this.selectedId = d.entityId;}} aria-pressed=${selected}>
      <span class="tile-level" style=${"height:" + (effort?.percent ?? 0) + "%"} aria-hidden="true"></span>
      <strong class="tile-name">${d.name}</strong>
      <span class="tile-mode">${label}<span class="tile-check" aria-hidden="true">${selected ? "✓" : ""}</span></span>
      <span class="big">${display(journey.measured, journey.unit ? " " + journey.unit : "")}</span>
      <span class="tile-target" title=${tr("Thermostat · ") + (journey.climate?.last_updated ?? tr("Date absente"))}>${tr("Consigne")} <b>${display(journey.target, journey.unit ? " " + journey.unit : "")}</b></span>
      <span class="tile-bottom" title=${tr("SmartPI · ") + (d.lastUpdated ?? tr("Date absente"))}>${tr("Filtrée")} ${display(journey.filtered, journey.unit ? " " + journey.unit : "")}</span>
      <span class="tile-command">${tr("Commande")} <b>${effort ? display(effort.percent, " %", 1) : "—"}</b></span>
      <smartpi-publication-quality .now=${Date.now()/1000} .value=${journey.measured} .date=${d.lastUpdated ?? ""} .available=${d.available}></smartpi-publication-quality>
      ${!effort ? html`<span class="tile-status">${!d.available ? tr("Diagnostic indisponible") : stale ? tr("Publication ancienne") : tr("Commande indisponible")}</span>` : nothing}
    </button>`;
  }

  render() {
    const list=discover(this.hass);
    const selected=list.find(d=>d.entityId===this.selectedId)??list[0];
    return html`<div class="header"><ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
       <div class="head-text"><h1>SmartPI Dashboard</h1><span>${tr("Comprendre la régulation thermique")}</span></div>
       <span class="tag readonly">${tr("Température & supervision")}</span></div>
      <main>
        <div class="flex spread intro"><h2>${tr("Mes thermostats")}</h2>
          <span class="muted small">${list.length} ${tr("diagnostic")}${list.length>1?"s":""} SmartPI v2</span></div>
        ${list.length===0 ? html`<section class="surface empty"><h3>${tr("Aucun diagnostic SmartPI v2 détecté")}</h3>
          <p>${tr("Rechercher les capteurs sensor.* dotés de schema_version=2 et des objets live/history dans les outils de développement de Home Assistant.")}</p></section>`:
          html`<div class="tiles">${list.map(d => this.thermostatTile(d, selected?.entityId === d.entityId))}</div>
          <smartpi-room-comparison .rooms=${list.map(d=>({id:d.entityId,name:d.name,unit:new ThermalJourney(this.hass,d).unit,samples:this.sessionHistory.get(d.entityId)}))} .end=${Date.now()/1000}></smartpi-room-comparison>
          ${selected?this.showDiagnostic(selected):nothing}`}
        <smartpi-orphan-notebooks .hass=${this.hass} @observatory-recovery=${() => void this.renderRoot.querySelector<ObservatoryElement>("smartpi-observatory")?.refresh()}></smartpi-orphan-notebooks>
        <footer>${tr("Source : capteurs SmartPI Diagnostics v2 · Réglage de température et de preset sur sélection explicite")}</footer>
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
    .tile{--mode-color:var(--secondary-text-color);position:relative;isolation:isolate;overflow:hidden;border:2px solid var(--mode-color);gap:7px}
    .tile.mode-frost{--mode-color:#3288c5}.tile.mode-eco{--mode-color:#388653}
    .tile.mode-comfort{--mode-color:#c3524b}.tile.mode-boost{--mode-color:#d22f43}
    .tile:hover{box-shadow:0 2px 8px color-mix(in srgb,var(--mode-color) 30%,transparent)}
    .tile.selected{box-shadow:0 0 0 2px var(--card-background-color),0 0 0 4px var(--primary-text-color)}
    .tile-level{position:absolute;inset:auto 0 0;background:var(--mode-color);opacity:.12;z-index:-1;pointer-events:none}
    .tile-name{line-height:1.3}.tile-mode{display:flex;align-items:center;justify-content:space-between;font-size:12px;font-weight:700}
    .tile-check{min-width:14px}.tile-target,.tile-command{display:flex;flex-wrap:wrap;justify-content:space-between;gap:3px 7px;font-size:12px}
    .tile-command{border-top:1px solid var(--divider-color);padding-top:8px;margin-top:3px}
    .tile-status{font-size:11px;color:var(--secondary-text-color)}
    .learning-details{border-top:1px solid var(--divider-color);padding-top:12px}.learning-details summary{font-size:13px;min-height:30px}
    .big{font-size:24px;font-weight:700;font-variant-numeric:tabular-nums}.tile-bottom{font-size:12px;color:var(--secondary-text-color)}
    .hero,.surface{background:var(--card-background-color);border:1px solid var(--divider-color);border-radius:14px}
    .hero{padding:20px;border-inline-start:3px solid var(--primary-color)}.hero h2{margin:4px 0;font-size:25px;overflow-wrap:anywhere}
    .metrics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px;margin-top:14px}
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
