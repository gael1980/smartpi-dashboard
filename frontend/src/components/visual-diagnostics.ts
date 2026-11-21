import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  display,
  at,
  reliableValue,
  type HassLike,
  type SmartPIDiagnostic,
} from "../adapter";
import { readHistory, type HistoryConnection } from "../services/history";
import { usable, learningMarks, observedEvents, observedTracking, timestamp, valueAt, archivedUnit, compatibleSampleUnits, type LearningMark, type Sample } from "../utils/timeseries";
import { ControlPresentation } from "../utils/control";
import "./time-chart";
import "./suspension-ribbon";
import type {SuspensionRibbon} from "./suspension-ribbon";
import type {ObservationPoint} from "../utils/evidence";
import {archivedDiagnostic} from "../utils/archived-diagnostic";
import "./control-diagram";
import "./command-chain";
import "./diagnostic-projection";
import type { Curve, TimeChart } from "./time-chart";
import {tr, numberFormat, perLanguage, locale} from "../i18n";
// Curve labels are translated once per language; identities stay stable for comparisons.
const curveSets = perLanguage(() => {
  const temp: Curve[] = [
    {
      label: tr("Intérieure mesurée"),
      path: "temperature.indoor",
      color: "#2689ca",
      unit: "°C",
    },
    {
      label: tr("Consigne filtrée"),
      path: "setpoint.filtered_setpoint",
      color: "#d6892e",
      unit: "°C",
      step: true,
    },
  ];
  const learningTemp = temp.map((curve) => curve.step ? { ...curve, dash: [6, 4] } : curve);
  const power: Curve[] = [
    {
      label: tr("Appliquée"),
      path: "power.applied_percent",
      color: "#2689ca",
      unit: "%",
      step: true,
    },
    {
      label: tr("Demandée"),
      path: "power.command_percent",
      color: "#d6892e",
      unit: "%",
      step: true,
    },
    {
      label: "PI",
      path: "power.pi_percent",
      color: "#9d78bd",
      unit: "%",
      step: true,
    },
    {
      label: "FF",
      path: "power.ff_percent",
      color: "#39a38a",
      unit: "%",
      step: true,
    },
  ];
  return {temp, learningTemp, power};
});
const learningKinds = ["A", "B", "Chauffe", "Refroidissement"] as const;

const signedDegrees = () => numberFormat({
  maximumFractionDigits: 2,
  signDisplay: "exceptZero",
});

@customElement("smartpi-visual-diagnostics")
export class VisualDiagnostics extends LitElement {
  @property({ attribute: false }) hass?: HassLike & Partial<HistoryConnection>;
  @property({ attribute: false }) diagnostic?: SmartPIDiagnostic;
  @property({ attribute: false }) session: Sample[] = [];
  @property({attribute:false}) observations: ObservationPoint[] = [];
  @property() observationError = "";
  @state() private tab = "evolution";
  @state() private hiddenLearning: LearningMark["kind"][] = [];
  @state() private expert = false;
  @state() private hours = 24;
  @state() private end = Date.now() / 1000;
  @state() private range: [number, number] = [this.end - 86400, this.end];
  @state() private recorder: Sample[] = [];
  @state() private loading = false;
  @state() private error = "";
  @state() private preferSession = false;
  @state() private followNow = true;
  @state() private inspection?: { entityId: string; recorder: boolean; time: number };
  @state() private replay = false;
  @state() private livePublicationMissing = false;
  @state() private piMemoryOpen = false;
  @state() private block?: "pi" | "ff" | "model";

  private async inspectBlock(block: "pi" | "ff" | "model") {
    this.block = block;
    if (block !== "model")
      this.renderRoot.querySelector<TimeChart>(".command-chart smartpi-time-chart")
        ?.showCurve(`power.${block}_percent`);
    await this.updateComplete;
    this.renderRoot.querySelector<HTMLElement>("#block-title")?.focus();
  }

  private inspect(time: number) {
    if (!this.diagnostic) return;
    this.livePublicationMissing = false;
    this.followNow = false;
    this.inspection = { entityId: this.diagnostic.entityId, recorder: this.usingRecorder, time };
  }
  private async inspectEvent(time: number) {
    this.inspect(time);
    await this.updateComplete;
    this.renderRoot.querySelector<HTMLElement>("#inspection-title")?.focus();
  }
  private async openLivePublication() {
    const time = timestamp(this.diagnostic?.lastUpdated);
    const source = this.usingRecorder ? this.recorder : this.session;
    const match = this.diagnostic?.available && time !== null
      ? this.windowData(source).samples.find((sample) => !sample.observedAt && sample.time === time)
      : undefined;
    this.tab = "evolution";
    this.inspection = undefined;
    this.livePublicationMissing = !match;
    if (match) this.inspect(match.time);
    await this.updateComplete;
    this.renderRoot.querySelector<HTMLElement>("#inspection-title")?.focus();
  }
  private filteredCache?: {
    all: Sample[];
    start: number;
    end: number;
    samples: Sample[];
    events: ReturnType<typeof observedEvents>;
    tracking: ReturnType<typeof observedTracking>;
  };
  private get usingRecorder() {
    return (
      this.recorderEntity === this.diagnostic?.entityId &&
      !this.preferSession &&
      usable(this.recorder)
    );
  }
  protected willUpdate(changed: Map<string, unknown>) {
    if (
      this.followNow &&
      !this.usingRecorder &&
      (changed.has("session") ||
        changed.has("preferSession") ||
        changed.has("recorder"))
    ) {
      const latest = this.session.at(-1)?.time;
      if (latest !== undefined && latest > this.range[1]) {
        this.end = latest;
        this.range = [latest - this.hours * 3600, latest];
      }
    }
  }
  private windowData(all: Sample[]) {
    if (
      this.filteredCache?.all === all &&
      this.filteredCache.start === this.range[0] &&
      this.filteredCache.end === this.range[1]
    )
      return this.filteredCache;
    const samples = all.filter(
      (s) => s.time >= this.range[0] && s.time <= this.range[1],
    );
    return (this.filteredCache = {
      all,
      start: this.range[0],
      end: this.range[1],
      samples,
      tracking: observedTracking(samples),
      events: observedEvents(all).filter(
        (e) => e.time >= this.range[0] && e.time <= this.range[1],
      ),
    });
  }
  private generation = 0;
  private recorderEntity = "";
  protected updated(changed: Map<string, unknown>) {
    const old = changed.get("diagnostic") as SmartPIDiagnostic | undefined;
    if (
      changed.has("diagnostic") &&
      old?.entityId !== this.diagnostic?.entityId
    ) {
      this.recorder = [];
      this.preferSession = false;
      this.livePublicationMissing = false;
      this.reset();
      void this.load();
    }
  }
  disconnectedCallback() {
    ++this.generation;
    this.filteredCache = undefined;
    this.recorder = [];
    this.session = [];
    this.loading = false;
    super.disconnectedCallback();
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.hasUpdated) void this.load();
  }
  private reset() {
    this.followNow = true;
    this.end = Date.now() / 1000;
    this.range = [this.end - this.hours * 3600, this.end];
  }
  private shift(direction: number) {
    this.followNow = false;
    const width = this.range[1] - this.range[0],
      now = Date.now() / 1000,
      min = this.end - 48 * 3600;
    const end = Math.min(
      now,
      Math.max(min + width, this.range[1] + (direction * width) / 2),
    );
    this.range = [end - width, end];
  }
  private zoom(factor: number) {
    this.followNow = false;
    const [a, b] = this.range,
      width = Math.max(60, Math.min(48 * 3600, (b - a) * factor));
    this.range = [b - width, b];
  }
  private async load() {
    this.inspection = undefined;
    this.livePublicationMissing = false;
    const generation = ++this.generation,
      d = this.diagnostic;
    this.loading = true;
    this.error = "";
    this.recorder = [];
    if (!d || !this.hass?.callWS) {
      this.error =
        tr("Lecture Recorder non disponible dans cette connexion. Historique de session utilisé.");
      this.loading = false;
      return;
    }
    try {
      const end = Date.now() / 1000;
      const samples = await readHistory(
        this.hass as HistoryConnection,
        d.entityId,
        end - 48 * 3600,
        end,
        () => generation !== this.generation,
      );
      if (generation !== this.generation) return;
      this.recorderEntity = d.entityId;
      this.recorder = samples;
      if (!usable(samples))
        this.error =
          tr("Recorder ne fournit aucune série v2 exploitable. Historique de session utilisé.");
    } catch (error) {
      if (generation !== this.generation) return;
      this.error =
        error instanceof Error && error.message.startsWith("Format")
          ? error.message
          : tr("Lecture Recorder refusée ou impossible. Historique de session utilisé ; vérifier les droits et Recorder.");
    } finally {
      if (generation === this.generation) this.loading = false;
    }
  }
  private trackingPanel(tracking: ReturnType<typeof observedTracking>, total: number, unit: string) {
    const { pairs, signedMedian, absoluteMedian, largestInterval } = tracking;
    return html`<section class="pane tracking" aria-labelledby="tracking-heading">
      <div class="tracking-title">
        <h3 id="tracking-heading">${tr("Écart à la consigne filtrée")}</h3>
        <span>${tr("Consigne filtrée − température intérieure")}</span>
      </div>
      <dl class="metrics">
        <div><dt>${tr("Couples valides")}</dt><dd>${pairs} / ${total}</dd></div>
        <div><dt>${tr("Médiane signée")}</dt><dd>${signedMedian === null ? tr("Indisponible") : `${signedDegrees().format(signedMedian)} ${unit}`}</dd></div>
        <div><dt>${tr("Médiane absolue")}</dt><dd>${display(absoluteMedian, " " + unit)}</dd></div>
        <div><dt>${tr("Plus long intervalle entre couples")}</dt><dd>${display(largestInterval === null ? null : largestInterval / 60, " min", 1)}</dd></div>
      </dl>
      ${pairs >= 2 && signedMedian === null ? html`<p>${tr("Résumé indisponible : les couples traversent des unités ou des contextes enregistrés différents. Réduisez la période.")}</p>` : nothing}
      <p>${pairs < 2
        ? tr("Deux couples valides dans la fenêtre sont nécessaires pour résumer l’écart.")
        : tr("Un écart positif indique une température sous la consigne filtrée. La médiane absolue indique la taille typique de l’écart observé.")}</p>
      <details>
        <summary>${tr("Méthode et limites")}</summary>
        <p>${tr("Chaque couple provient d’une même publication et compte une fois, indépendamment de l’intervalle entre les points. Les publications incomplètes sont exclues des médianes. Le plus long intervalle décrit l’espacement des couples valides.")}</p>
        <p>${tr("Ces valeurs décrivent les publications de la source et de la fenêtre affichées. L’évaluation d’une durée de confort ou d’une réponse à un changement de consigne demande des données et un protocole adaptés.")}</p>
      </details>
    </section>`;
  }
  private inspectionPanel(d: SmartPIDiagnostic, sample: Sample | undefined, fromRecorder: boolean) {
    const snapshot = sample ? {
      ...d,
      state: sample.state,
      available: sample.state !== "unknown" && sample.state !== "unavailable",
      live: sample.live,
      history: sample.history,
      lastUpdated: new Date(sample.time*1000).toISOString(),
      climateId: null,
      temperatureUnit: sample.unit ?? null,
    } : d;
    const route = new ControlPresentation(snapshot).route;
    const source = sample ? (fromRecorder ? "Recorder" : "Session") : tr("Instantané SmartPI");
    const time = sample ? new Date(sample.time * 1000) : d.lastUpdated ? new Date(d.lastUpdated) : null;
    const format = (value: unknown, unit = "") =>
      value == null && sample && snapshot.available ? tr("Non archivé") : display(value, unit.replace("°C",sample ? sample.unit ?? tr("unité source") : d.temperatureUnit ?? tr("unité source")));
    const fields = [
      [tr("Température intérieure mesurée"), "temperature.indoor", " °C"],
      [tr("Consigne filtrée"), "setpoint.filtered_setpoint", " °C"],
      [tr("Commande demandée"), "power.command_percent", " %"],
      [tr("Commande appliquée"), "power.applied_percent", " %"],
    ];
    const block = this.block;
    const blockButton = (id: "pi" | "ff" | "model", label: string) =>
      html`<button type="button" aria-pressed=${block === id} aria-controls="block-detail"
        @click=${() => void this.inspectBlock(id)}>${label}</button>`;
    const path = route === "direct"
      ? [tr("Consigne et mesure"), tr("Hystérésis ou calibration"), tr("Commande publiée"), tr("Pièce")]
      : [tr("Consigne et mesure"), html`<span>${tr("Voies P et I")}</span> → ${blockButton("pi", "PI")}`,
          html`+ ${blockButton("ff", tr("Anticipation"))}`, tr("Limites et temporisation"), tr("Commande publiée"), tr("Pièce")];
    const blockFields = {
      pi: [[tr("Contribution PI"), "power.pi_percent", " %"]],
      ff: [[tr("Anticipation retenue"), "power.ff_percent", " %"]],
      model: [[tr("Gain thermique estimé A"), "model.a", " °C/min/u"], [tr("Pertes estimées B"), "model.b", tr(" min⁻¹")]],
    } as const;
    const twinPath = "analysis.twin.twin_T_steady";
    const twin = at(snapshot.live, twinPath) == null
      ? format(undefined)
      : format(reliableValue(snapshot.live, twinPath, "analysis.twin.twin_T_steady_reliable"), " °C");
    const historyDiagnostic = sample ? archivedDiagnostic(d,sample) : null;
    return html`${sample ? html`<section class="replay-bar">
      <strong>${tr("Historique")} · ${source} · ${time?.toLocaleString(locale())}</strong>
      <label>${tr("Parcourir les publications")} <input aria-label="${tr("Publication historique")}" type="range" min="0" max=${Math.max(0,this.windowData(fromRecorder?this.recorder:this.session).samples.length-1)}
        .value=${String(this.windowData(fromRecorder?this.recorder:this.session).samples.findIndex(s=>s.time===sample.time))}
        @input=${(e:Event)=>{const sample=this.windowData(fromRecorder?this.recorder:this.session).samples[Number((e.target as HTMLInputElement).value)];if(sample)this.inspect(sample.time);}}></label>
      <button type="button" aria-pressed=${this.replay} @click=${()=>{this.replay=!this.replay;}}>${tr("Schéma de cette publication")}</button>
      <p>${tr("Uniquement les champs archivés. Consigne normale, fenêtre et mode HVAC non déduits de l’état actuel.")}</p>
      ${this.replay && historyDiagnostic ? html`<smartpi-control-diagram .historical=${true} .diagnostic=${historyDiagnostic} .expert=${this.expert}></smartpi-control-diagram>`:nothing}
    </section>`:nothing}<section class="synoptic" aria-labelledby="synoptic-title">
        <h3 id="synoptic-title">${tr("Synoptique de régulation")}</h3>
        <ol class="signal-path" aria-label=${route === "unavailable" ? tr("Schéma de référence") : tr("Voie déclarée")}>
          ${path.map((label, i) => html`<li class=${route === "unavailable" ? "" : "active-path"}>
            ${i ? html`<span aria-hidden="true">${i === 2 && route !== "direct" ? "" : "→"}</span>` : nothing}
            ${label}</li>`)}
        </ol>
        <p>${route === "pi" ? tr("Voie PI active") : route === "direct" ? tr("Voie directe déclarée") : tr("Chemin actif non vérifié")}</p>
        <p>${tr("↶ Retour de la mesure")} · ${blockButton("model", tr("Modèle thermique"))}</p>
      </section>
      <aside class="publication" aria-labelledby="inspection-title">
        <h3 id="inspection-title" tabindex="-1">${sample ? tr("Publication sélectionnée") : tr("En direct")}</h3>
        <p role="status" class="inspection-status">
          ${source} · ${sample?.observedAt ? tr("Observation de session") : tr("Publication")} ·
          ${time && Number.isFinite(time.valueOf())
            ? html`<time datetime=${time.toISOString()}>${time.toLocaleString(locale())}</time>`
            : tr("Horodatage indisponible")}
        </p>
        <dl>
          <dt>${tr("État publié")}</dt><dd>${snapshot.state}</dd>
          ${fields.map(([label, path, unit]) => html`<dt>${label}</dt>
            <dd>${format(sample ? valueAt(sample, path) : at(d.live, path), unit)}</dd>`)}
          ${sample ? html`<dt>${tr("Écart à la consigne filtrée")}</dt><dd>${format(valueAt(sample, "error"), " °C")}</dd>` : nothing}
          <dt>${tr("État de l’intégrale")}</dt><dd>${format(at(snapshot.live, "temperature.integral_mode"))}</dd>
          <dt>${tr("Saturation déclarée")}</dt><dd>${format(at(snapshot.live, "control.saturation_state"))}</dd>
          <dt>${tr("Limitation par temporisation")}</dt><dd>${format(at(snapshot.live, "analysis.control.forced_by_timing"))}</dd>
        </dl>
        <div id="block-detail">
          ${block ? html`<h4 id="block-title" tabindex="-1">
              ${{ pi: tr("Détails PI"), ff: tr("Détails anticipation"), model: tr("Détails du modèle") }[block]}
            </h4>
            <dl>${blockFields[block].map(([label, path, unit]) => html`<dt>${label}</dt>
              <dd>${format(sample ? valueAt(sample, path) : at(d.live, path), unit)}</dd>`)}
              ${block === "pi" ? html`<dt>${tr("Erreur de la voie P")}</dt>
                <dd>${format(at(snapshot.live, "analysis.control.error_p"), " °C")}</dd>
                <dt>${tr("Erreur brute de la voie I")}</dt>
                <dd>${format(at(snapshot.live, "temperature.error"), " °C")}</dd>` : nothing}
              ${block === "ff" ? html`<dt>${tr("État FF3")}</dt>
                <dd>${format(at(snapshot.live, "feedforward.ff3_status"))}</dd>` : nothing}
              ${block === "model" ? html`<dt>${tr("Équilibre estimé par le Twin")}</dt><dd>${twin}</dd>` : nothing}
            </dl>` : nothing}
        </div>
        <button type="button" aria-disabled=${!sample} @click=${() => { this.inspection = undefined; }}>
          ${tr("Revenir au direct")}
        </button>
        <button type="button" @click=${() => this.renderRoot.querySelector<HTMLElement>("#journal-title")?.focus()}>
          ${tr("Voir le journal")}
        </button>
      </aside>`;
  }
  render() {
    const {temp, learningTemp, power} = curveSets();
    const d = this.diagnostic;
    if (!d) return nothing;
    const fromRecorder = this.usingRecorder,
      all = fromRecorder ? this.recorder : this.session;
    const { samples, events, tracking } = this.windowData(all);
    const learning = this.tab === "learning";
    const marks = learning ? learningMarks(all).filter((mark) =>
      mark.time >= this.range[0] && mark.time <= this.range[1]
      && !this.hiddenLearning.includes(mark.kind)) : [];
    const liveView = this.tab === "regulation";
    const supervision = this.tab === "evolution";
    const point = this.inspection;
    const selected = supervision && point?.entityId === d.entityId && point.recorder === fromRecorder
      ? samples.find((sample) => sample.time === point.time)
      : undefined;
    const chartUnit = archivedUnit(samples);
    const chart = (heading: string, curves: Curve[], percent = false, unitSensitive = curves.some(c=>c.unit.includes("°C"))) =>
      html`<section class=${percent ? "chart command-chart" : "chart"}>
        ${unitSensitive && !compatibleSampleUnits(samples) ? html`<p role="status">${tr("Unités archivées différentes dans cette fenêtre. Réduisez la période pour comparer des valeurs de même unité.")}</p>` : nothing}
        <smartpi-time-chart
          .heading=${heading}
          .marks=${learning && curves === learningTemp ? marks : []}
          .thermalPhases=${learning && curves === learningTemp}
          .samples=${!unitSensitive || compatibleSampleUnits(samples) ? samples : []}
          .curves=${curves.map(c=>({...c,unit:c.unit.replace("°C",chartUnit)}))}
          .range=${this.range}
          .percent=${percent}
          .syncKey=${d.entityId}
          .inspectable=${supervision}
          .selectedTime=${selected?.time ?? null}
          @plot-layout=${(e: CustomEvent<{left:number;right:number}>) => {const ribbon=(e.currentTarget as HTMLElement).querySelector<SuspensionRibbon>("smartpi-suspension-ribbon");if(ribbon)ribbon.inset=e.detail;}}
          @inspect-publication=${(e: CustomEvent<number>) => this.inspect(e.detail)}
          @time-range=${(e: CustomEvent<[number, number]>) => {
            if (e.detail[1] > e.detail[0]) {
              this.followNow = false;
              this.range = e.detail;
            }
          }}
        >${curves === temp || curves === learningTemp ? html`<smartpi-suspension-ribbon slot="context-bars" .points=${this.observations} .range=${this.range} .error=${this.observationError}></smartpi-suspension-ribbon>` : nothing}</smartpi-time-chart>
      </section>`;
    return html`<div class="workspace">
      <div class="top">
        <div>
          <h2>${tr("Observatoire de la régulation")}</h2>
          <span class="subtitle">${d.name}</span>
        </div>
        <label class="expert"
          ><input
            type="checkbox"
            .checked=${this.expert}
            @change=${(e: Event) =>
              (this.expert = (e.target as HTMLInputElement).checked)}
          />
          ${tr("Mode expert")}</label
        >
      </div>
      <nav aria-label="${tr("Vues de diagnostic")}">
        ${[
          ["evolution", tr("Supervision")],
          ["regulation", tr("Régulation en direct")],
          ["model", tr("Santé du modèle")],
          ["learning", tr("Apprentissage")],
        ].map(
          ([id, label]) =>
            html`<button
              class=${this.tab === id ? "active" : ""}
              aria-pressed=${this.tab === id}
              @click=${() => { this.livePublicationMissing = false; this.tab = id; }}
            >
              ${label}
            </button>`,
        )}
      </nav>
      ${liveView ? html`<p class="foot">${tr("La période et la source ci-dessous concernent le graphe historique. Le schéma reste l’instantané actuel.")}</p>` : nothing}
      <div class="toolbar">
        <div class="periods" role="group" aria-label="${tr("Plage temporelle")}">
          ${[1, 3, 6, 12, 24, 48].map(
            (h) =>
              html`<button
                aria-pressed=${h === this.hours}
                class=${h === this.hours ? "chosen" : ""}
                @click=${() => {
                  this.hours = h;
                  this.reset();
                }}
              >
                ${h} h
              </button>`,
          )}
        </div>
        <div class="tools">
          <button
            aria-label="${tr("Période précédente")}"
            @click=${() => this.shift(-1)}
          >
            ←</button
          ><button aria-label="${tr("Période suivante")}" @click=${() => this.shift(1)}>
            →</button
          ><button aria-label="${tr("Zoom avant")}" @click=${() => this.zoom(0.5)}>
            +</button
          ><button aria-label="${tr("Zoom arrière")}" @click=${() => this.zoom(2)}>
            −</button
          ><button @click=${() => this.reset()}>${tr("Réinitialiser")}</button
          ><button
            ?disabled=${this.loading}
            @click=${() => {
              this.reset();
              void this.load();
            }}
          >
            ${tr("Actualiser Recorder")}
          </button>
        </div>
      </div>
      <div class="source">
        <strong
          >${fromRecorder
            ? tr("Recorder · historique persistant")
            : tr("Historique de session · mémoire temporaire")}</strong
        ><span
          >${samples.length} ${tr("publications")} ·
          ${new Date(this.range[0] * 1000).toLocaleString(locale())} →
          ${new Date(this.range[1] * 1000).toLocaleString(locale())}</span
        ><label
          ><input
            type="checkbox"
            .checked=${this.preferSession}
            @change=${(e: Event) => {
              this.inspection = undefined;
      this.replay = false;
              this.livePublicationMissing = false;
              this.preferSession = (e.target as HTMLInputElement).checked;
            }}
          />
          ${tr("Session uniquement")}</label
        >
      </div>
      ${!fromRecorder
        ? html`<label class="follow"
            ><input
              type="checkbox"
              .checked=${this.followNow}
              @change=${(e: Event) => {
                this.followNow = (e.target as HTMLInputElement).checked;
                if (this.followNow) this.reset();
              }}
            />
            ${tr("Suivre les nouvelles publications de session")}</label
          >`
        : nothing}
      ${this.loading
        ? html`<p role="status" class="notice">
            ${tr("Lecture de l’historique… La collecte de session continue.")}
          </p>`
        : nothing}
      ${this.error
        ? html`<p role="status" class="notice">${this.error}</p>`
        : nothing}
      ${!samples.length
        ? html`<p class="notice">
            ${tr("Aucune publication dans cette fenêtre. Sélectionner une plage plus large ou attendre une mise à jour normale de Home Assistant.")}
          </p>`
        : nothing}
      <details class="pane quality-panel"><summary>${tr("Qualité des données de la fenêtre")}</summary>
        <p>${fromRecorder?"Recorder":"Session"} · ${samples.length} ${tr("publications")} · ${samples.filter(s=>valueAt(s,"temperature.indoor")!==null&&valueAt(s,"setpoint.filtered_setpoint")!==null&&valueAt(s,"power.applied_percent")!==null).length} ${tr("avec mesure, consigne filtrée et commande.")}
        ${samples.filter((s,i)=>i>0&&s.time-samples[i-1].time>600).length} ${tr("interruption(s) entre publications > 10 min.")}</p>
        <p>${tr("Unité historique :")} ${chartUnit}${tr(". Une unité absente des archives n’est pas remplacée par celle du thermostat actuel.")}</p>
        <p>${tr("Les publications sont irrégulières. Ces nombres ne constituent pas un pourcentage de couverture temporelle. Aucun trou n’est rempli et aucune confiance actuelle n’est appliquée au passé.")}</p>
      </details>
      ${supervision && this.livePublicationMissing
        ? html`<p class="notice" role="status">${tr("La publication du direct est introuvable dans la source et la fenêtre affichées. L’inspecteur affiche l’instantané actuel.")}</p>`
        : nothing}
      ${this.tab === "evolution"
        ? html`<div class="supervision">
            ${this.inspectionPanel(d, selected, fromRecorder)}
            <div class="trends">
            ${chart(tr("Température et consigne filtrée"), temp)}
            ${chart(tr("Commande du régulateur · pas des watts"), power, true)}
            ${chart(tr("Écart consigne filtrée − température intérieure"), [
              {
                label: tr("Écart filtré"),
                path: "error",
                color: "#bc7254",
                unit: "°C",
              },
            ])}
            <p class="foot">
              ${tr("Écart calculé uniquement avec deux valeurs du même état. Ce n’est pas l’erreur de l’intégrateur ni une mesure de confort. Aucune zone de bande morte n’est extrapolée. Les points sont des publications irrégulières ; une ligne ne constitue pas une mesure intermédiaire.")}
            </p>
            ${this.trackingPanel(tracking, samples.length, archivedUnit(samples))}
            <details class="pane pi-memory" ?open=${this.piMemoryOpen}
              @toggle=${(event: Event) => {this.piMemoryOpen = (event.currentTarget as HTMLDetailsElement).open;}}><summary>${tr("Gains et mémoire du PI")}</summary>
              <p class="foot">${tr("Valeurs internes natives publiées par SmartPI, sur trois échelles séparées et sans conversion d’unité. L’état de l’intégrale décrit sa mémoire interne, pas sa contribution à la commande ni un pourcentage de chauffe. Seuls les champs archivés dans la source et la fenêtre sélectionnées sont tracés ; une valeur absente reste un trou.")}</p>
              ${this.piMemoryOpen ? html`${chart(tr("Gain proportionnel Kp"), [{label:tr("Kp publié"),path:"control.kp",color:"#2689ca",unit:"",step:true}], false, true)}
              ${chart(tr("Gain intégral Ki"), [{label:tr("Ki publié"),path:"control.ki",color:"#9d78bd",unit:"",step:true}], false, true)}
              ${chart(tr("État de l’intégrale"), [{label:tr("Mémoire intégrale publiée"),path:"temperature.integral_error",color:"#bc7254",unit:""}], false, true)}` : nothing}
            </details>
            <section class="chart"><smartpi-diagnostic-projection .samples=${samples} kind="scatter"
              .source=${fromRecorder ? "Recorder" : "Session"} .contextId=${`${d.entityId}/${fromRecorder}/${this.range.join('/')}`}
              .inspectable=${true} @inspect-publication=${(e: CustomEvent<number>) => this.inspect(e.detail)}></smartpi-diagnostic-projection></section>
            </div></div>`
        : this.tab === "regulation"
          ? html`<section class="pane">
                <smartpi-control-diagram
                  .diagnostic=${d}
                  .expert=${this.expert}
                ></smartpi-control-diagram>
                <button class="open-supervision" type="button"
                  @click=${() => void this.openLivePublication()}>${tr("Voir dans Supervision")}</button>
              </section>
              <details class="pane chain-details">
                <summary>${tr("Chaîne de commande détaillée")}</summary>
                <smartpi-command-chain .diagnostic=${d}></smartpi-command-chain>
              </details>
              <section class="pane command-comparison">
                <p class="foot">${fromRecorder ? "Recorder" : "Session"} · ${new Date(this.range[0] * 1000).toLocaleString(locale())} → ${new Date(this.range[1] * 1000).toLocaleString(locale())}</p>
                <smartpi-time-chart heading="Demande et sortie · écart de commande"
                  .samples=${samples} .range=${this.range} .percent=${true} .commandComparison=${true} .syncKey=${d.entityId}
                  .curves=${[power[1], power[0]]}
                  @time-range=${(e: CustomEvent<[number, number]>) => {if (e.detail[1] > e.detail[0]) {this.followNow = false; this.range = e.detail;}}}></smartpi-time-chart>
                <p class="foot">${tr("La zone relie la demande publiée et la sortie appliquée de la même publication. Ce n’est ni une énergie perdue ni un diagnostic de cause. Les motifs historiques ne sont disponibles que si cette source les a conservés. Les données manquantes et interruptions supérieures à 10 min coupent le tracé. Les courbes en escalier ne sont pas des mesures intermédiaires.")}</p>
              </section>`
          : learning ? html`
              <section class="pane">
                <div class="periods" role="group" aria-label="${tr("Repères d’apprentissage")}">
                  ${learningKinds.map((kind, i) => html`
                    <button type="button" aria-pressed=${!this.hiddenLearning.includes(kind)}
                      @click=${() => {
                        this.hiddenLearning = this.hiddenLearning.includes(kind)
                          ? this.hiddenLearning.filter((item) => item !== kind)
                          : [...this.hiddenLearning, kind];
                      }}>${["●", "◆", "↑", "↓"][i]} ${tr(kind)}</button>`)}
                </div>
                <p class="foot">${tr("Les repères sont datés à la publication ou à l’observation. Les lettres A et B indiquent une hausse du compteur de mises à jour acceptées ou de mesures collectées entre deux publications. Le détail distingue les deux. Deux lettres à la même date peuvent regrouper des apprentissages survenus à des instants différents.")}
                  ${samples.some((sample) => at(sample.live, "learning") !== undefined)
                    ? tr("Consultez le détail pour connaître l’intervalle observé.")
                    : tr("Cette source ne contient pas les compteurs historiques. Les repères A/B sont indisponibles ici. La session conserve les diagnostics reçus pendant l’ouverture du panneau.")}
                  ${tr("Zoomez pour séparer les repères rapprochés.")}</p>
                <p class="foot">${tr("Fond orange · température en hausse. Fond bleu · température en baisse. Fond neutre · valeur stable ou absente. Ces intervalles comparent les mesures successives.")}</p>
                ${fromRecorder && !samples.some((sample) => at(sample.live, "learning") !== undefined)
                  ? html`<p class="notice">${tr("Le Recorder sélectionné contient les courbes, mais pas les compteurs d’apprentissage. Les événements passés ne peuvent pas être datés.")}
                    <button type="button" @click=${() => { this.preferSession = true; this.inspection = undefined; }}>
                      ${tr("Observer les prochains apprentissages en session")}</button></p>` : nothing}
                ${chart(tr("Température et consigne filtrée"), learningTemp)}
                ${chart(tr("Activité du régulateur · commande appliquée"), [power[0]], true)}
                <p class="foot">${tr("En mode chauffage, une commande positive correspond à une chauffe commandée, zéro à un arrêt de commande. La température peut encore monter après l’arrêt. La commande est exprimée en pourcentage.")}</p>
                ${samples.some((sample) => at(sample.live, "learning.emea_samples_a") !== undefined || at(sample.live, "learning.emea_samples_b") !== undefined)
                  ? chart(tr("Collecte du modèle · nombre de mesures conservées"), [
                    {label:tr("Mesures A"), path:"live.learning.emea_samples_a", color:"#17638d", unit:"mesures", step:true},
                    {label:tr("Mesures B"), path:"live.learning.emea_samples_b", color:"#6f448a", unit:"mesures", step:true},
                  ]) : nothing}
                <p>${tr("Temps morts actuels · chauffe")}
                  ${display(reliableValue(d.live, "model.deadtime_heat_s", "model.deadtime_heat_reliable"), " s")}
                  · ${tr("refroidissement")}
                  ${display(reliableValue(d.live, "model.deadtime_cool_s", "model.deadtime_cool_reliable"), " s")}</p>
                <p class="foot">${tr("↑ Chauffe et ↓ Refroidissement repèrent des publications. Les durées sont des médianes. Les bornes des épisodes ne sont pas publiées.")}
                  ${samples.some((sample) => at(sample.live, "analysis.deadtime") || at(sample.live, "model.deadtime_heat_reliable") !== undefined || at(sample.live, "model.deadtime_cool_reliable") !== undefined)
                    ? tr("La couverture dépend des données présentes dans chaque publication.")
                    : tr("Cette fenêtre ne contient pas de diagnostics historiques de temps mort.")}</p>
                <details>
                  <summary>${tr("Détail des repères (")}${marks.length})</summary>
                  ${marks.length ? html`<ol>
                    ${marks.slice(-60).reverse().map((mark) => html`<li>
                      <time datetime=${new Date(mark.time * 1000).toISOString()}>${new Date(mark.time * 1000).toLocaleString(locale())}</time>
                      ${mark.observedAt ? tr(" (observation)") : ""} · ${mark.label}
                    </li>`)}
                  </ol>
                  ${marks.length > 60 ? html`<p class="foot">${tr("60 derniers repères. Zoomez pour consulter une plage plus courte.")}</p>` : nothing}`
                  : html`<p>${tr("Aucun repère observable avec les filtres et les données de cette fenêtre.")}</p>`}
                </details>
              </section>`
          : html`
              <div class="model-heading">
                <h3>${tr("Modèle appris")}</h3>
                <span
                  >${tr("Confiance actuelle :")}
                  ${display(at(d.live, "model.confidence"))}</span
                >
              </div>
              ${chart(tr("A · gain de chauffe estimé"), [
                {
                  label: tr("A appris"),
                  path: "model.a",
                  color: "#2689ca",
                  unit: "°C/min/u",
                  step: true,
                },
              ])}
              ${chart(tr("B · pertes thermiques estimées"), [
                {
                  label: tr("B appris"),
                  path: "model.b",
                  color: "#39a38a",
                  unit: "min⁻¹",
                  step: true,
                },
              ])}
              <p class="foot">
                ${tr("La confiance actuelle ne valide pas rétroactivement ces séries. Le contrat history ne contient pas de confiance historique ni de mesures de référence A/B.")}
              </p>
              <section class="pane"><smartpi-diagnostic-projection .samples=${samples} kind="model"
                .source=${fromRecorder ? "Recorder" : "Session"} .contextId=${`${d.entityId}/${fromRecorder}/${this.range.join('/')}`}>
              </smartpi-diagnostic-projection></section>
              <section class="pane">
                <h3>${tr("Temps morts · instantané")}</h3>
                <div class="metrics">
                  ${[
                    [
                      "Chauffe",
                      "model.deadtime_heat_s",
                      "model.deadtime_heat_reliable",
                    ],
                    [
                      "Refroidissement",
                      "model.deadtime_cool_s",
                      "model.deadtime_cool_reliable",
                    ],
                    [tr("Constante τ"), "model.tau_min", "model.tau_reliable"],
                  ].map(
                    ([label, path, reliable]) =>
                      html`<div>
                        <span>${label}</span
                        ><strong
                          >${display(
                            reliableValue(d.live, path, reliable),
                            path === "model.tau_min" ? " min" : " s",
                          )}</strong
                        ><small
                          >${tr("Fiable :")} ${display(at(d.live, reliable))}</small
                        >
                      </div>`,
                  )}
                </div>
                <p>
                  ${tr("Détection :")} ${display(at(d.live, "analysis.deadtime.state"))}
                </p>
              </section>
              <section class="pane">
                <h3>${tr("Thermal Twin · instantané")}</h3>
                <p>
                  ${tr("Modèle fiable :")}
                  ${display(at(d.live, "analysis.twin.twin_model_reliable"))} ·
                  ${tr("Initialisation du Twin :")}
                  ${display(at(d.live, "analysis.twin.twin_warming_up"))}
                </p>
                <div class="metrics">
                  ${[
                    [tr("Température estimée"), "twin_T_hat", " °C"],
                    [tr("Température prédite"), "twin_T_pred", " °C"],
                    [tr("Innovation"), "twin_innovation", " °C"],
                    [tr("RMSE innovation · EMA"), "twin_rmse_30", " °C"],
                    [
                      tr("Perturbation estimée"),
                      "twin_perturbation_dTdt",
                      " °C/min",
                    ],
                  ].map(
                    ([label, path, unit]) =>
                      html`<div>
                        <span>${label}</span
                        ><strong
                          >${display(
                            reliableValue(d.live, "analysis.twin." + path),
                            unit,
                            4,
                          )}</strong
                        >
                      </div>`,
                  )}
                </div>
                <p>
                  ${tr("Équilibre :")}
                  ${display(
                    reliableValue(
                      d.live,
                      "analysis.twin.twin_T_steady",
                      "analysis.twin.twin_T_steady_reliable",
                    ),
                    " °C",
                  )}
                  · ${tr("Consigne atteignable (prédiction) :")}
                  ${display(
                    reliableValue(
                      d.live,
                      "analysis.twin.twin_setpoint_reachable",
                      "analysis.twin.twin_T_steady_reliable",
                    ),
                  )}
                </p>
                <p class="foot">
                  ${tr("Aucune courbe Twin : ces valeurs ne font pas partie des huit séries Recorder standard. Fiabilité déclarée ≠ exactitude physique démontrée.")}
                </p>
              </section>
            `}
      ${liveView || learning ? nothing : html`<section class="timeline">
        <h3 id="journal-title" tabindex="-1">
          ${tr("Journal des publications")}
          <span>${events.length} ${tr("variations observées")}</span>
        </h3>
        <p class="foot">
          ${tr("Annotations issues d’une comparaison d’états, pas d’événements internes explicitement horodatés. Les motifs absents de Recorder ne sont pas reconstruits.")}
        </p>
        <ol>
          ${events
            .slice(-60)
            .reverse()
            .map(
              (e) =>
                html`<li>
                  <time>${new Date(e.time * 1000).toLocaleString(locale())}</time>
                  <div>
                    ${supervision
                      ? html`<button type="button" aria-pressed=${selected?.time === e.time}
                          @click=${() => void this.inspectEvent(e.time)}>${e.label}</button>`
                      : html`<strong>${e.label}</strong>`}${this.expert
                      ? html`<p>${e.provenance}</p>`
                      : nothing}
                  </div>
                </li>`,
            )}
        </ol>
        ${events.length === 0
          ? html`<p>${tr("Aucune transition observable sur cette fenêtre.")}</p>`
          : html`<p class="foot">
              ${tr("60 dernières variations affichées au maximum.")}
            </p>`}
      </section>`}
      ${this.expert
        ? html`<details class="provenance">
            <summary>${tr("Provenance et interactions")}</summary>
            <p>
              ${tr("attributes.history pour les huit séries ; attributes.live pour le schéma actuel. Glisser horizontalement pour zoomer, légende cliquable, curseurs synchronisés ; boutons de zoom/déplacement accessibles au clavier et au tactile. Dates affichées dans le fuseau du navigateur, avec détails dans les tables.")}
            </p>
            <p>
              ${tr("Requête officielle history/history_during_period, attributs complets. Aucun service ni changement d’état. La source choisie reste distincte : aucune fusion silencieuse entre Recorder et session.")}
            </p>
          </details>`
        : nothing}
    </div>`;
  }
  static styles = css`
    .replay-bar{grid-column:1/-1;border:2px solid var(--primary-color);border-radius:8px;padding:14px;margin:10px;color:var(--primary-text-color)}
    .replay-bar label{display:block;font-size:13px;margin:12px 0}.replay-bar input{display:block;width:100%;min-height:44px;accent-color:var(--primary-color)}
    .replay-bar button{min-height:44px}.replay-bar p,.quality-panel p{font-size:12px;line-height:1.5}.quality-panel summary{cursor:pointer;min-height:44px;padding-top:12px}

    :host {
      display: block;
      margin-top: 22px;
    }
    .workspace {
      background: var(--card-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      overflow: hidden;
    }
    .top {
      padding: 22px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .subtitle {
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    h2 {
      font-size: 21px;
      margin: 6px 0;
    }
    h3 {
      font-size: 16px;
    }
    nav {
      display: flex;
      padding: 0 24px;
      border-bottom: 1px solid var(--divider-color);
      gap: 18px;
    }
    button {
      font: inherit;
      color: inherit;
      background: transparent;
      border: 1px solid var(--divider-color);
      padding: 9px 12px;
      border-radius: 6px;
      cursor: pointer;
      min-height: 40px;
    }
    button:disabled {
      opacity: 0.5;
      cursor: wait;
    }
    nav button {
      border: 0;
      border-radius: 0;
      border-bottom: 3px solid transparent;
      padding: 12px 2px;
    }
    nav button.active {
      border-bottom-color: var(--primary-color);
      font-weight: 650;
    }
    button.chosen {
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
    }
    .toolbar {
      padding: 18px 24px 12px;
      display: flex;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .periods,
    .tools {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
    }
    .source {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 10px;
      padding: 0 24px 16px;
      font-size: 11px;
      color: var(--secondary-text-color);
      border-bottom: 1px solid var(--divider-color);
    }
    .source strong {
      color: var(--primary-text-color);
    }
    .expert {
      font-size: 12px;
      white-space: nowrap;
    }
    label {
      display: flex;
      align-items: center;
      gap: 5px;
      min-height: 32px;
    }
    input {
      accent-color: var(--primary-color);
    }
    .notice {
      padding: 12px 24px;
      background: var(--secondary-background-color);
      font-size: 13px;
    }
    .open-supervision, .chain-details summary { min-height: 44px; }
    .chain-details summary { cursor: pointer; }
    .chart,
    .pane {
      padding: 22px 24px;
      border-bottom: 1px solid var(--divider-color);
      min-width: 0;
    }
    .foot {
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 1.6;
      margin: 14px 24px;
    }
    .supervision {
      display: grid;
      grid-template-columns: minmax(0, 3fr) minmax(220px, 1fr);
      grid-template-areas: "synoptic synoptic" "trends publication";
    }
    .synoptic { grid-area: synoptic; padding: 12px 24px; border-bottom: 1px solid var(--divider-color); }
    .trends { grid-area: trends; min-width: 0; }
    .publication { grid-area: publication; padding: 12px 18px; border-inline-start: 1px solid var(--divider-color); }
    .publication dt, .inspection-status, .synoptic p { color: var(--secondary-text-color); font-size: 13px; }
    .publication dd { margin: 4px 0 12px; overflow-wrap: anywhere; }
    .signal-path { display: flex; flex-wrap: wrap; gap: 8px; }
    .signal-path li { border: 1px solid var(--divider-color); border-radius: 6px; padding: 8px; }
    .signal-path .active-path, .timeline button[aria-pressed="true"] { border-color: var(--primary-color); }
    @media (max-width: 760px) {
      .supervision { grid-template-columns: minmax(0, 1fr); grid-template-areas: "trends" "publication" "synoptic"; }
      .publication { border-inline-start: 0; }
    }
    .model-heading {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 24px;
      gap: 12px;
    }
    .model-heading span {
      font-size: 12px;
    }
    .metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 18px;
    }
    .metrics span,
    .metrics small {
      display: block;
      font-size: 12px;
      color: var(--secondary-text-color);
      margin: 7px 0;
    }
    .metrics strong {
      font-size: 20px;
      font-variant-numeric: tabular-nums;
    }
    .tracking {
      background: var(--secondary-background-color, var(--card-background-color));
      border-inline-start: 3px solid var(--primary-color);
    }
    .tracking-title h3 { margin: 0 0 5px; }
    .tracking-title span, .tracking dt {
      color: var(--secondary-text-color);
      font-size: 12px;
    }
    .tracking dl { margin: 16px 0 12px; }
    .tracking dd {
      margin: 4px 0 0;
      font-size: 19px;
      font-weight: 650;
      font-variant-numeric: tabular-nums;
    }
    .tracking p { margin: 10px 0; }
    .tracking summary { font-size: 13px; font-weight: 600; cursor: pointer; }
    .pane p {
      font-size: 13px;
      line-height: 1.6;
    }
    .timeline {
      padding: 16px 24px;
    }
    .timeline h3 {
      display: flex;
      justify-content: space-between;
      gap: 10px;
    }
    .timeline h3 span {
      font-size: 11px;
      font-weight: 400;
      color: var(--secondary-text-color);
    }
    .timeline .foot {
      margin: 10px 0;
    }
    ol {
      list-style: none;
      max-height: 350px;
      overflow: auto;
      padding: 0;
    }
    li {
      display: flex;
      gap: 20px;
      border-top: 1px solid var(--divider-color);
      padding: 12px 0;
      font-size: 12px;
    }
    li time {
      color: var(--secondary-text-color);
      white-space: nowrap;
    }
    li strong {
      font-weight: 500;
    }
    li p {
      color: var(--secondary-text-color);
      line-height: 1.5;
    }
    .provenance {
      padding: 18px 24px;
      font-size: 12px;
      line-height: 1.6;
    }
    :focus-visible {
      outline: 3px solid var(--primary-color);
      outline-offset: 2px;
    }
    @media (max-width: 600px) {
      .top {
        align-items: flex-start;
        flex-direction: column;
      }
      h2 {
        font-size: 18px;
      }
      nav {
        gap: 14px;
        font-size: 13px;
      }
      nav button { min-height: 44px; text-align: start; }
      .chart,
      .pane {
        padding: 18px 10px;
      }
      .toolbar,
      .top,
      .source,
      .timeline {
        padding-left: 14px;
        padding-right: 14px;
      }
      .tools button {
        font-size: 12px;
        padding: 8px;
      }
      li {
        flex-direction: column;
        gap: 6px;
      }
      .metrics strong {
        font-size: 17px;
      }
      .model-heading {
        flex-direction: column;
        align-items: flex-start;
      }
      .timeline h3 {
        flex-direction: column;
      }
      .foot {
        margin: 12px 14px;
      }
    }
  `;
}
