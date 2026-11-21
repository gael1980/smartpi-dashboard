import { LitElement, html, svg, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { type SmartPIDiagnostic } from "../adapter";
import { ControlPresentation, type ControlBlock } from "../utils/control";
import {tr, locale, dateTimeFormat} from "../i18n";
@customElement("smartpi-control-diagram")
export class ControlDiagram extends LitElement {
  @property({ attribute: false }) diagnostic?: SmartPIDiagnostic;
  @property({ type: Boolean }) expert = false;
  @property({ type: Boolean }) historical = false;
  @state() private selected?: { context: string; id: string };
  render() {
    if (!this.diagnostic) return nothing;
    const view = new ControlPresentation(this.diagnostic);
    const blocks = view.blocks();
    const [setpoint, temperature, pi, ff, command, limits, applied, model] = blocks;
    const route = view.route;
    const directMode = view.directMode;
    const timing = view.timingForced;
    const saturation = view.saturation;
    const context = `${this.diagnostic.entityId}/${directMode ?? route}`;
    const select = (id: string) => { this.selected = { context, id }; };
    const defaultBlock = route === "direct" ? command :
      route === "pi" && (timing === true || saturation) ? limits : applied;
    const chosen = (this.selected?.context === context
      ? blocks.find((block) => block.id === this.selected?.id)
      : undefined) ?? defaultBlock;
    const routeLabel = directMode ? tr("Voie directe · {0}", directMode) :
      route === "pi" ? tr("Voie PI + anticipation") : tr("Chemin non vérifié");
    const note = directMode
      ? [tr("PI/FF contournés"), tr("SmartPI déclare une voie directe en {0}.", directMode.toLocaleLowerCase(locale()))]
      : route !== "pi"
        ? [tr("Motif indisponible"), tr("Cette publication ne permet pas de vérifier le chemin de commande.")]
        : timing === true
          ? [tr("Temporisation imposée"), tr("SmartPI signale une contrainte de durée minimale.")]
          : saturation
            ? [saturation, tr("SmartPI publie l’état de saturation de la voie PI.")]
            : timing === false
              ? [tr("Temporisation non imposée"), tr("Le drapeau de temporisation imposée est inactif.")]
              : [tr("Motif indisponible"), tr("Cette publication ne renseigne pas la temporisation.")];
    const warning = route === "pi" && (timing === true || saturation !== null);
    const steps: readonly (readonly [ControlBlock, string, string | null, string])[] = route === "direct"
      ? [[command, tr("Décision"), directMode, tr("Voie directe")], [applied, tr("Sortie"), tr("Appliquée"), applied.value]]
      : [[command, tr("Demande"), route === "pi" ? tr("PI + anticipation") : tr("Demandée"), command.value],
          [limits, tr("Contraintes"), tr("Limites et timing"), route === "pi" ? limits.value : tr("Chemin non vérifié")],
          [applied, tr("Sortie"), tr("Appliquée"), applied.value]];
    const quickBlocks = route === "pi" ? [temperature, setpoint, pi, ff, model] : [temperature, setpoint, model];
    const updated = this.diagnostic.lastUpdated;
    const time = updated ? new Date(updated) : null;
    const timestamp = this.diagnostic.available && time && Number.isFinite(time.valueOf())
      ? html`${this.historical ? tr("Publication archivée") : tr("Dernière mise à jour du capteur")} : <time datetime=${time.toISOString()}>${dateTimeFormat({dateStyle: "short", timeStyle: "medium"}).format(time)}</time>`
      : tr("Horodatage des données actuelles indisponible");
    const positions = [
      [20, 20],
      [20, 155],
      [235, 20],
      [235, 155],
      [450, 80],
      [660, 80],
      [660, 265],
      [235, 300],
    ];
    return html`<div class="intro">
        <div>
          <span class="eyebrow">${tr("COMPRENDRE LA COMMANDE")}</span>
          <h3>${this.historical ? tr("Le régulateur, à cette publication") : tr("Le régulateur, en direct")}</h3>
        </div>
        <span class="badge route-badge">${routeLabel}</span>
      </div>
      <p class="muted stamp">${timestamp}</p>
      <dl class="snapshot">
        <div><dt>${tr("Température intérieure")}</dt><dd>${temperature.value}</dd><small>${tr("Mesure publiée")}</small></div>
        <div><dt>${tr("Consigne filtrée")}</dt><dd>${setpoint.value}</dd><small>${view.bypass ? tr("Voie P contournée") : tr("Voie proportionnelle")}</small></div>
        <div><dt>${tr("Commande demandée")}</dt><dd>${view.bypass ? "—" : command.value}</dd>
          <small>${view.bypass ? tr("Voie PI contournée") : tr("Demande publiée")}</small></div>
        <div><dt>${tr("Commande appliquée")}</dt><dd>${applied.value}</dd><small>${tr("Signal de commande")}</small></div>
      </dl>
      <div class="work">
      <section class="route" aria-labelledby="route-title">
        <h4 id="route-title">${tr("Chemin de commande")}</h4>
        <div class="note ${warning ? "warning" : ""}">
          <strong>${note[0]}</strong><p>${note[1]}</p>
        </div>
        <ol class="steps">
          ${steps.map(([block, label, title, value], index) => html`<li>
            ${index > 0 && route !== "unavailable" ? html`<span class="arrow" aria-hidden="true">→</span>` : nothing}
            <button type="button" class="step" data-block=${block.id} aria-pressed=${block.id === chosen.id}
              aria-controls="signal-inspector" @click=${() => select(block.id)}>
              <small>${label}</small><strong>${title}</strong><span>${value}</span>
            </button></li>`)}
        </ol>
        <div class="quick-blocks" role="group" aria-label="${tr("Signaux associés")}">
          ${quickBlocks.map((block) => html`<button type="button" aria-pressed=${block.id === chosen.id}
            aria-controls="signal-inspector" @click=${() => select(block.id)}>${block.id === "ff" ? tr("Anticipation") : block.title}</button>`)}
        </div>
      </section>
      <aside id="signal-inspector" aria-labelledby="signal-title">
        <span class="eyebrow">${tr("INSPECTION DU SIGNAL")}</span>
        <h4 id="signal-title" aria-live="polite">${chosen.title} <span class="badge">${chosen.status}</span></h4>
        <p>${chosen.explanation}</p>
        <dl>
          <div><dt>${tr("Valeur du bloc")}</dt><dd>${chosen.value}</dd>
            ${this.expert ? html`<code>${tr("attributes.live.")}${chosen.path}</code>` : null}</div>
          <div><dt>${tr("Motif ou contexte publié")}</dt><dd>${chosen.reason}</dd>
            ${this.expert ? html`<code>${tr("attributes.live.")}${chosen.reasonPath}</code>` : null}</div>
          ${view.detail(chosen, this.expert).map((row) => html`<div>
            <dt>${row.label}</dt><dd>${row.value}</dd>
            ${this.expert ? html`<code>${tr("attributes.live.")}${row.path}</code>${row.reliability ? html`<code>${tr("Fiabilité")} · ${row.reliability}</code>` : null}` : null}
          </div>`)}
        </dl>
        ${chosen.status === tr("Contourné") ? html`<p class="muted">${tr("Ces valeurs décrivent un bloc hors du chemin actif.")}</p>` : nothing}
      </aside>
      </div>
      <details class="full">
        <summary>${tr("Schéma complet de la boucle")}</summary>
        <p class="muted">${tr("Les flèches pleines montrent le chemin déclaré. Les pointillés représentent le retour de la mesure.")}</p>
      <div class="diagram">
        <svg
          viewBox="0 0 880 415"
          aria-label="${tr("Schéma logique de SmartPI")}"
          role="group"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
            </marker>
          </defs>
          ${view.route === "pi"
            ? svg`<path class="flow" d="M205 65 H235"/><path class="flow" d="M205 195 H220 V95 H235"/><path class="flow" d="M420 65 H435 V115 H450"/><path class="flow" d="M420 195 H435 V145 H450"/>`
            : view.bypass
              ? svg`<path class="flow bypass" d="M635 125 H647 V310 H660"/>`
              : null}
          ${view.route === "pi"
            ? svg`<path class="flow" d="M635 125 H660"/><path class="flow" d="M752 170 V265"/>`
            : null}
          ${route !== "unavailable" ? svg`<path class="flow feedback" d="M660 315 H420" />
            <path class="flow feedback" d="M235 345 H110 V245" />` : nothing}
          ${blocks.map(
            (
              b,
              i,
            ) => svg`<g role="button" tabindex="0" aria-pressed=${b.id === chosen.id} aria-label=${`${b.title} : ${b.value}. ${b.status}`} class=${"block " + (b.id === chosen.id ? "selected" : "") + (b.status === "Contourné" ? " inactive" : "")} transform=${`translate(${positions[i][0]},${positions[i][1]})`} @click=${() => select(b.id)} @keydown=${(
              e: KeyboardEvent,
            ) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                select(b.id);
              }
            }}>
          <title>${b.explanation}</title><rect width="185" height="90" rx="10"/><text x="13" y="23" class="title">${b.title}</text><text x="13" y="50" class="value">${b.value}</text><text x="13" y="73" class="status">${b.status}</text>
        </g>`,
          )}
        </svg>
      </div>
      <div class="mobile">
        ${blocks.map(
          (b) =>
            html`<button
              type="button"
              aria-pressed=${b.id === chosen.id}
              @click=${() => select(b.id)}
            >
              ${b.title}<strong>${b.value}</strong><small>${b.status}</small>
            </button>`,
        )}
      </div>
      </details>`;
  }
  static styles = css`
    :host {
      display: block;
    }
    h3 {
      font-size: 20px;
      margin: 5px 0;
    }
    h4 {
      margin: 0;
    }
    p {
      line-height: 1.6;
      font-size: 13px;
    }
    .intro {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }
    .eyebrow {
      font-size: 10px;
      letter-spacing: 0.12em;
      color: var(--secondary-text-color);
    }
    .badge {
      display: inline-block;
      font-size: 11px;
      border: 1px solid var(--divider-color);
      padding: 5px 9px;
      border-radius: 20px;
    }
    .muted {
      color: var(--secondary-text-color);
    }
    .route-badge {
      font-weight: 650;
      background: var(--secondary-background-color);
    }
    .stamp { margin: 6px 0 16px; }
    .snapshot {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 0;
      border-block: 1px solid var(--divider-color);
      background: var(--secondary-background-color);
      margin: 0;
    }
    .snapshot > div { padding: 12px 14px; border: 0; }
    .snapshot > div + div { border-left: 1px solid var(--divider-color); }
    .snapshot dd {
      font-size: clamp(16px, 2vw, 24px);
      font-variant-numeric: tabular-nums;
    }
    .snapshot small, .step small, .step > span { color: var(--secondary-text-color); }
    .work { display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); }
    .route, aside { min-width: 0; padding: 16px; }
    .note {
      border-inline-start: 3px solid var(--primary-color);
      background: var(--secondary-background-color);
      padding: 8px 12px;
      margin: 12px 0;
    }
    .note.warning { border-inline-start-color: var(--warning-color, #ce8d2c); }
    .note strong, .note p { margin: 0; }
    .steps {
      display: flex;
      gap: 6px;
      list-style: none;
      padding: 0;
      margin: 12px 0;
    }
    .steps li {
      display: flex;
      align-items: center;
      gap: 6px;
      flex: 1 1 0;
      min-width: 0;
    }
    .arrow { color: var(--primary-text-color); }
    .step { flex: 1; align-self: stretch; min-width: 0; overflow-wrap: anywhere; }
    .step small { margin-top: 0; }
    .step > span { display: block; margin-top: 3px; font-size: 12px; }
    .quick-blocks { display: flex; flex-wrap: wrap; gap: 6px; }
    .quick-blocks button { min-height: 44px; padding: 7px 10px; font-size: 12px; }
    .full { border-top: 1px solid var(--divider-color); }
    summary { cursor: pointer; min-height: 44px; box-sizing: border-box; padding: 12px 0; }
    svg {
      width: 100%;
      display: block;
    }
    .flow {
      fill: none;
      stroke: var(--primary-color);
      stroke-width: 2;
      marker-end: url(#arrow);
    }
    .bypass {
      stroke: var(--warning-color, #ce8d2c);
    }
    .feedback {
      stroke: var(--secondary-text-color);
      stroke-dasharray: 4 4;
    }
    .block {
      cursor: pointer;
      color: var(--primary-text-color);
    }
    .block rect {
      fill: var(--card-background-color);
      stroke: var(--divider-color);
      stroke-width: 1.5;
    }
    .block.selected rect {
      stroke: var(--primary-color);
      stroke-width: 3;
    }
    .block:focus rect {
      stroke: var(--primary-color);
      stroke-width: 3;
    }
    .block.inactive {
      opacity: 0.5;
    }
    text {
      fill: var(--primary-text-color);
      font-family: inherit;
    }
    .title {
      font-size: 12px;
    }
    .value {
      font-size: 19px;
      font-weight: 600;
    }
    .status {
      font-size: 10px;
      fill: var(--secondary-text-color);
    }
    aside {
      background: var(--secondary-background-color);
      border-left: 1px solid var(--divider-color);
      min-height: 120px;
    }
    code {
      display: block;
      font-size: 11px;
      overflow-wrap: anywhere;
    }
    dl {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 13rem), 1fr));
      gap: 12px 18px;
      margin: 14px 0 0;
    }
    dl > div {
      border-top: 1px solid var(--divider-color);
      padding-top: 7px;
      overflow-wrap: anywhere;
    }
    dt { color: var(--secondary-text-color); font-size: 12px; }
    dd { margin: 3px 0; font-weight: 600; }
    .mobile {
      display: none;
    }
    button {
      font: inherit;
      background: var(--card-background-color);
      color: inherit;
      border: 1px solid var(--divider-color);
      padding: 12px;
      border-radius: 8px;
      text-align: left;
      min-height: 80px;
      cursor: pointer;
    }
    button[aria-pressed="true"] {
      border-color: var(--primary-color);
      box-shadow: inset 0 0 0 1px var(--primary-color);
    }
    strong,
    small {
      display: block;
      margin-top: 6px;
    }
    :focus-visible {
      outline: 3px solid var(--primary-color);
      outline-offset: 2px;
    }
    @media (max-width: 920px) {
      .work { grid-template-columns: 1fr; }
      aside { border-left: 0; border-top: 1px solid var(--divider-color); }
    }
    @media (max-width: 600px) {
      .diagram {
        display: none;
      }
      .mobile {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin: 16px 0;
      }
      .intro {
        align-items: flex-start;
      }
      .snapshot { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .snapshot > div:nth-child(3) { border-left: 0; }
      .snapshot > div:nth-child(n + 3) { border-top: 1px solid var(--divider-color); }
      .route, aside { padding: 14px 0; }
      aside { padding-inline: 12px; }
      .step { padding: 7px 5px; font-size: 12px; }
    }
  `;
}
