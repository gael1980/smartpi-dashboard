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
import { usable, observedEvents, type Sample } from "../utils/timeseries";
import "./time-chart";
import "./control-diagram";
import "./command-chain";
import type { Curve } from "./time-chart";
const temp: Curve[] = [
  {
    label: "Intérieure mesurée",
    path: "temperature.indoor",
    color: "#2689ca",
    unit: "°C",
  },
  {
    label: "Consigne filtrée",
    path: "setpoint.filtered_setpoint",
    color: "#d6892e",
    unit: "°C",
    step: true,
  },
];
const power: Curve[] = [
  {
    label: "Appliquée",
    path: "power.applied_percent",
    color: "#2689ca",
    unit: "%",
    step: true,
  },
  {
    label: "Demandée",
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
@customElement("smartpi-visual-diagnostics")
export class VisualDiagnostics extends LitElement {
  @property({ attribute: false }) hass?: HassLike & Partial<HistoryConnection>;
  @property({ attribute: false }) diagnostic?: SmartPIDiagnostic;
  @property({ attribute: false }) session: Sample[] = [];
  @state() private tab = "evolution";
  @state() private expert = false;
  @state() private hours = 24;
  @state() private end = Date.now() / 1000;
  @state() private range: [number, number] = [this.end - 86400, this.end];
  @state() private recorder: Sample[] = [];
  @state() private loading = false;
  @state() private error = "";
  @state() private preferSession = false;
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
      this.reset();
      void this.load();
    }
  }
  disconnectedCallback() {
    ++this.generation;
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
    this.end = Date.now() / 1000;
    this.range = [this.end - this.hours * 3600, this.end];
  }
  private shift(direction: number) {
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
    const [a, b] = this.range,
      width = Math.max(60, Math.min(48 * 3600, (b - a) * factor));
    this.range = [b - width, b];
  }
  private async load() {
    const generation = ++this.generation,
      d = this.diagnostic;
    this.loading = true;
    this.error = "";
    this.recorder = [];
    if (!d || !this.hass?.callWS) {
      this.error =
        "Lecture Recorder non disponible dans cette connexion. Historique de session utilisé.";
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
          "Recorder ne fournit aucune série v2 exploitable. Historique de session utilisé.";
    } catch (error) {
      if (generation !== this.generation) return;
      this.error =
        error instanceof Error && error.message.startsWith("Format")
          ? error.message
          : "Lecture Recorder refusée ou impossible. Historique de session utilisé ; vérifier les droits et Recorder.";
    } finally {
      if (generation === this.generation) this.loading = false;
    }
  }
  render() {
    const d = this.diagnostic;
    if (!d) return nothing;
    const fromRecorder =
        this.recorderEntity === d.entityId &&
        !this.preferSession &&
        usable(this.recorder),
      all = fromRecorder ? this.recorder : this.session;
    const samples = all.filter(
      (s) => s.time >= this.range[0] && s.time <= this.range[1],
    );
    const events = observedEvents(all).filter(
      (e) => e.time >= this.range[0] && e.time <= this.range[1],
    );
    const chart = (heading: string, curves: Curve[], percent = false) =>
      html`<section class="chart">
        <smartpi-time-chart
          .heading=${heading}
          .samples=${samples}
          .curves=${curves}
          .range=${this.range}
          .percent=${percent}
          .syncKey=${d.entityId}
          @time-range=${(e: CustomEvent<[number, number]>) => {
            if (e.detail[1] > e.detail[0]) this.range = e.detail;
          }}
        ></smartpi-time-chart>
      </section>`;
    return html`<div class="workspace">
      <div class="top">
        <div>
          <span class="eyebrow">OBSERVATOIRE SMARTPI</span>
          <h2>Une commande, une réponse thermique</h2>
        </div>
        <label class="expert"
          ><input
            type="checkbox"
            .checked=${this.expert}
            @change=${(e: Event) =>
              (this.expert = (e.target as HTMLInputElement).checked)}
          />
          Mode expert</label
        >
      </div>
      <nav aria-label="Vues de diagnostic">
        ${[
          ["evolution", "Évolution"],
          ["regulation", "Régulation"],
          ["model", "Santé du modèle"],
        ].map(
          ([id, label]) =>
            html`<button
              class=${this.tab === id ? "active" : ""}
              aria-pressed=${this.tab === id}
              @click=${() => (this.tab = id)}
            >
              ${label}
            </button>`,
        )}
      </nav>
      <div class="toolbar">
        <div class="periods" role="group" aria-label="Plage temporelle">
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
            aria-label="Période précédente"
            @click=${() => this.shift(-1)}
          >
            ←</button
          ><button aria-label="Période suivante" @click=${() => this.shift(1)}>
            →</button
          ><button aria-label="Zoom avant" @click=${() => this.zoom(0.5)}>
            +</button
          ><button aria-label="Zoom arrière" @click=${() => this.zoom(2)}>
            −</button
          ><button @click=${() => this.reset()}>Réinitialiser</button
          ><button
            ?disabled=${this.loading}
            @click=${() => {
              this.reset();
              void this.load();
            }}
          >
            Actualiser Recorder
          </button>
        </div>
      </div>
      <div class="source">
        <strong
          >${fromRecorder
            ? "Recorder · historique persistant"
            : "Historique de session · mémoire temporaire"}</strong
        ><span
          >${samples.length} publications ·
          ${new Date(this.range[0] * 1000).toLocaleString()} →
          ${new Date(this.range[1] * 1000).toLocaleString()}</span
        ><label
          ><input
            type="checkbox"
            .checked=${this.preferSession}
            @change=${(e: Event) =>
              (this.preferSession = (e.target as HTMLInputElement).checked)}
          />
          Session uniquement</label
        >
      </div>
      ${this.loading
        ? html`<p role="status" class="notice">
            Lecture de l’historique… La collecte de session continue.
          </p>`
        : nothing}
      ${this.error
        ? html`<p role="status" class="notice">${this.error}</p>`
        : nothing}
      ${!samples.length
        ? html`<p class="notice">
            Aucune publication dans cette fenêtre. Sélectionner une plage plus
            large ou attendre une mise à jour normale de Home Assistant.
          </p>`
        : nothing}
      ${this.tab === "evolution"
        ? html`
            ${chart("Température et consigne filtrée", temp)}
            ${chart("Commande du régulateur · pas des watts", power, true)}
            ${chart("Écart consigne filtrée − température intérieure", [
              {
                label: "Écart filtré",
                path: "error",
                color: "#bc7254",
                unit: "°C",
              },
            ])}
            <p class="foot">
              Écart calculé uniquement avec deux valeurs du même état. Ce n’est
              pas l’erreur de l’intégrateur ni une mesure de confort. Aucune
              zone de bande morte n’est extrapolée. Les points sont des
              publications irrégulières ; une ligne ne constitue pas une mesure
              intermédiaire.
            </p>
          `
        : this.tab === "regulation"
          ? html`<section class="pane">
                <smartpi-control-diagram
                  .diagnostic=${d}
                  .expert=${this.expert}
                ></smartpi-control-diagram>
              </section>
              <section class="pane">
                <smartpi-command-chain .diagnostic=${d}></smartpi-command-chain>
              </section>`
          : html`
              <div class="model-heading">
                <h3>Modèle appris</h3>
                <span
                  >Confiance actuelle :
                  ${display(at(d.live, "model.confidence"))}</span
                >
              </div>
              ${chart("A · gain de chauffe estimé", [
                {
                  label: "A appris",
                  path: "model.a",
                  color: "#2689ca",
                  unit: "°C/min/u",
                  step: true,
                },
              ])}
              ${chart("B · pertes thermiques estimées", [
                {
                  label: "B appris",
                  path: "model.b",
                  color: "#39a38a",
                  unit: "min⁻¹",
                  step: true,
                },
              ])}
              <p class="foot">
                La confiance actuelle ne valide pas rétroactivement ces séries.
                Le contrat history ne contient pas de confiance historique ni de
                mesures de référence A/B.
              </p>
              <section class="pane">
                <h3>Temps morts · instantané</h3>
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
                    ["Constante τ", "model.tau_min", "model.tau_reliable"],
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
                          >Fiable : ${display(at(d.live, reliable))}</small
                        >
                      </div>`,
                  )}
                </div>
                <p>
                  Détection : ${display(at(d.live, "analysis.deadtime.state"))}
                </p>
              </section>
              <section class="pane">
                <h3>Thermal Twin · instantané</h3>
                <p>
                  Modèle fiable :
                  ${display(at(d.live, "analysis.twin.twin_model_reliable"))} ·
                  Échauffement :
                  ${display(at(d.live, "analysis.twin.twin_warming_up"))}
                </p>
                <div class="metrics">
                  ${[
                    ["Température estimée", "twin_T_hat", " °C"],
                    ["Température prédite", "twin_T_pred", " °C"],
                    ["Innovation", "twin_innovation", " °C"],
                    ["RMSE 30", "twin_rmse_30", " °C"],
                    [
                      "Perturbation estimée",
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
                  Équilibre :
                  ${display(
                    reliableValue(
                      d.live,
                      "analysis.twin.twin_T_steady",
                      "analysis.twin.twin_T_steady_reliable",
                    ),
                    " °C",
                  )}
                  · Consigne atteignable (prédiction) :
                  ${display(
                    reliableValue(
                      d.live,
                      "analysis.twin.twin_setpoint_reachable",
                      "analysis.twin.twin_T_steady_reliable",
                    ),
                  )}
                </p>
                <p class="foot">
                  Aucune courbe Twin : ces valeurs ne font pas partie des huit
                  séries Recorder standard. Fiabilité déclarée ≠ exactitude
                  physique démontrée.
                </p>
              </section>
            `}
      <section class="timeline">
        <h3>
          Journal des publications
          <span>${events.length} variations observées</span>
        </h3>
        <p class="foot">
          Annotations issues d’une comparaison d’états, pas d’événements
          internes explicitement horodatés. Les motifs absents de Recorder ne
          sont pas reconstruits.
        </p>
        <ol>
          ${events
            .slice(-60)
            .reverse()
            .map(
              (e) =>
                html`<li>
                  <time>${new Date(e.time * 1000).toLocaleString()}</time>
                  <div>
                    <strong>${e.label}</strong>${this.expert
                      ? html`<p>${e.provenance}</p>`
                      : nothing}
                  </div>
                </li>`,
            )}
        </ol>
        ${events.length === 0
          ? html`<p>Aucune transition observable sur cette fenêtre.</p>`
          : html`<p class="foot">
              60 dernières variations affichées au maximum.
            </p>`}
      </section>
      ${this.expert
        ? html`<details class="provenance">
            <summary>Provenance et interactions</summary>
            <p>
              attributes.history pour les huit séries ; attributes.live pour le
              schéma actuel. Glisser horizontalement pour zoomer, légende
              cliquable, curseurs synchronisés ; boutons de zoom/déplacement
              accessibles au clavier et au tactile. Dates affichées dans le
              fuseau du navigateur, avec détails dans les tables.
            </p>
            <p>
              Requête officielle history/history_during_period, attributs
              complets. Aucun service ni changement d’état. La source choisie
              reste distincte : aucune fusion silencieuse entre Recorder et
              session.
            </p>
          </details>`
        : nothing}
    </div>`;
  }
  static styles = css`
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
    .eyebrow {
      font-size: 10px;
      letter-spacing: 0.16em;
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
      color: var(--primary-color);
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
