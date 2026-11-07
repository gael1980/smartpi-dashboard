import { LitElement, html, svg, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { type SmartPIDiagnostic } from "../adapter";
import { ControlPresentation } from "../utils/control";
@customElement("smartpi-control-diagram")
export class ControlDiagram extends LitElement {
  @property({ attribute: false }) diagnostic?: SmartPIDiagnostic;
  @property({ type: Boolean }) expert = false;
  @state() private selected = "pi";
  render() {
    if (!this.diagnostic) return html``;
    const view = new ControlPresentation(this.diagnostic),
      blocks = view.blocks(),
      chosen = blocks.find((b) => b.id === this.selected) ?? blocks[0];
    const updated = this.diagnostic.lastUpdated;
    const time = updated ? new Date(updated) : null;
    const timestamp = this.diagnostic.available && time && Number.isFinite(time.valueOf())
      ? html`Dernière mise à jour du capteur : <time datetime=${time.toISOString()}>${new Intl.DateTimeFormat("fr-FR", {dateStyle: "short", timeStyle: "medium"}).format(time)}</time>`
      : "Horodatage des données actuelles indisponible";
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
          <span class="eyebrow">COMPRENDRE LA COMMANDE</span>
          <h3>Le régulateur, en direct</h3>
        </div>
        <span class="badge"
          >${view.bypass
            ? "Chemin direct · PI/FF contournés"
            : view.route === "pi"
              ? "Voie PI + feedforward"
              : "Chemin de commande non vérifié"}</span
        >
      </div>
      <p class="muted">
        ${timestamp}. Les flèches pleines montrent le chemin logique déclaré.
        Les pointillés représentent le retour de la pièce par la mesure.
      </p>
      <div class="diagram">
        <svg
          viewBox="0 0 880 415"
          aria-label="Schéma logique de SmartPI"
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
              ? svg`<path class="flow bypass" d="M205 65 H220 V10 H440 V100 H450"/><path class="flow bypass" d="M205 195 H220 V132 H450"/><path class="flow bypass" d="M635 125 H647 V310 H660"/>`
              : null}
          ${view.route === "pi"
            ? svg`<path class="flow" d="M635 125 H660"/><path class="flow" d="M752 170 V265"/>`
            : null}
          <path class="flow feedback" d="M660 315 H420" />
          <path class="flow feedback" d="M235 345 H110 V245" />
          ${blocks.map(
            (
              b,
              i,
            ) => svg`<g role="button" tabindex="0" aria-pressed=${b.id === chosen.id} aria-label=${`${b.title} : ${b.value}. ${b.status}`} class=${"block " + (b.id === chosen.id ? "selected" : "") + (b.status === "Contourné" ? " inactive" : "")} transform=${`translate(${positions[i][0]},${positions[i][1]})`} @click=${() => (this.selected = b.id)} @keydown=${(
              e: KeyboardEvent,
            ) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                this.selected = b.id;
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
              aria-pressed=${b.id === chosen.id}
              @click=${() => (this.selected = b.id)}
            >
              ${b.title}<strong>${b.value}</strong><small>${b.status}</small>
            </button>`,
        )}
      </div>
      <aside aria-live="polite">
        <h4>${chosen.title} <span class="badge">${chosen.status}</span></h4>
        <p><b>Principe.</b> ${chosen.explanation}</p>
        <dl>
          <div><dt>Valeur du bloc</dt><dd>${chosen.value}</dd>
            ${this.expert ? html`<code>attributes.live.${chosen.path}</code>` : null}</div>
          <div><dt>Motif ou contexte publié</dt><dd>${chosen.reason}</dd>
            ${this.expert ? html`<code>attributes.live.${chosen.reasonPath}</code>` : null}</div>
          ${view.detail(chosen, this.expert).map((row) => html`<div>
            <dt>${row.label}</dt><dd>${row.value}</dd>
            ${this.expert ? html`<code>attributes.live.${row.path}</code>${row.reliability ? html`<code>Fiabilité : ${row.reliability}</code>` : null}` : null}
          </div>`)}
        </dl>
        ${chosen.status === "Contourné" ? html`<p class="muted">Ce bloc est hors du chemin actif. Ses valeurs publiées ne décrivent pas la commande directe.</p>` : null}
      </aside>`;
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
      font-size: 11px;
      border: 1px solid var(--divider-color);
      padding: 5px 9px;
      border-radius: 20px;
    }
    .muted {
      color: var(--secondary-text-color);
    }
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
      border-left: 3px solid var(--primary-color);
      padding: 16px;
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
    }
    button[aria-pressed="true"] {
      border-color: var(--primary-color);
    }
    strong,
    small {
      display: block;
      margin-top: 6px;
    }
    :focus-visible {
      outline: 3px solid var(--primary-color);
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
        flex-direction: column;
      }
    }
  `;
}
