import {LitElement, html, svg, css, nothing} from "lit";
import {customElement, property, state} from "lit/decorators.js";
import {DiagnosticProjection, type ProjectionKind, type ProjectionPoint} from "../utils/diagnostic-projection";
import type {Sample} from "../utils/timeseries";

const format = (value: number) => Math.abs(value) >= 10000 || (value !== 0 && Math.abs(value) < .0001)
  ? value.toExponential(2) : value.toLocaleString("fr-FR", {maximumFractionDigits: 6});
const axisFormat = (value: number, step: number) => {
  const precision = Math.max(3, Math.min(10, Math.ceil(Math.log10(Math.abs(value / step) || 1)) + 1));
  return Math.abs(value) >= 10000 || (value !== 0 && Math.abs(value) < .001)
    ? value.toExponential(precision - 1) : value.toLocaleString("fr-FR", {maximumSignificantDigits: precision});
};
const date = (value: number) => new Date(value * 1000).toLocaleString("fr-FR");

@customElement("smartpi-diagnostic-projection")
export class DiagnosticProjectionElement extends LitElement {
  @property({attribute: false}) samples: Sample[] = [];
  @property() kind: ProjectionKind = "scatter";
  @property() source = "";
  @property() contextId = "";
  @property({type: Boolean}) inspectable = false;
  @state() private selected = -1;
  @state() private page = 0;
  @state() private plotWidth = 720;
  private observer?: ResizeObserver;
  private projection = new DiagnosticProjection([], "scatter");
  connectedCallback() {
    super.connectedCallback();
    this.observer = new ResizeObserver(entries => {
      const width = Math.max(240, Math.round(entries[0].contentRect.width));
      if (width !== this.plotWidth) this.plotWidth = width;
    });
    this.observer.observe(this);
  }
  disconnectedCallback() {this.observer?.disconnect(); this.observer = undefined; super.disconnectedCallback();}
  protected willUpdate(changed: Map<string, unknown>) {
    if (changed.has("samples") || changed.has("kind")) {
      const time = this.projection.points[this.selected]?.time;
      this.projection = new DiagnosticProjection(this.samples, this.kind);
      this.selected = this.projection.points.findIndex(p => p.time === time);
      this.page = Math.min(this.page, Math.max(0, Math.ceil(this.projection.points.length / 25) - 1));
    }
    if (changed.has("contextId")) {this.selected = -1; this.page = 0;}
  }
  private select(index: number) {
    const points = this.projection.points;
    this.selected = Math.max(0, Math.min(points.length - 1, index));
    const point = points[this.selected];
    if (point && this.inspectable) this.dispatchEvent(new CustomEvent("inspect-publication", {detail: point.time, bubbles: true, composed: true}));
  }
  private bounds(values: number[], zero = false): [number, number] {
    let low = Math.min(...values), high = Math.max(...values);
    if (zero) {low = Math.min(0, low); high = Math.max(0, high);}
    const span = high - low, padding = span ? span * .08 : Math.abs(low) > 0 ? Math.abs(low) * .05 : .001;
    return [Number.isFinite(low - padding) ? low - padding : low, Number.isFinite(high + padding) ? high + padding : high];
  }
  private coordinates() {
    const points = this.projection.points;
    const xr = this.bounds(points.map(p => p.x), this.kind === "scatter");
    const yr: [number, number] = this.kind === "scatter" ? [0, 100] : this.bounds(points.map(p => p.y));
    const scale = (value: number, range: [number, number]) => {
      const magnitude = Math.max(Math.abs(range[0]), Math.abs(range[1]), Number.MIN_VALUE);
      const lo = range[0] / magnitude, hi = range[1] / magnitude;
      return hi === lo ? .5 : (value / magnitude - lo) / (hi - lo);
    };
    return {xr, yr, x: (v: number) => 78 + scale(v, xr) * (this.plotWidth - 102), y: (v: number) => 240 - scale(v, yr) * 202};
  }
  private clickPlot(event: MouseEvent) {
    const plot = event.currentTarget as SVGSVGElement, matrix = plot.getScreenCTM();
    if (!matrix) return;
    const {x: px, y: py} = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
    const {x, y} = this.coordinates();
    let best = 0, distance = Infinity;
    this.projection.points.forEach((p, i) => {const d = (x(p.x) - px) ** 2 + (y(p.y) - py) ** 2; if (d < distance) {distance = d; best = i;}});
    this.select(best);
  }
  protected render() {
    const model = this.kind === "model", data = this.projection, points = data.points;
    const title = model ? "Parcours des coefficients A/B" : "Écart filtré et commande appliquée";
    const xlabel = model ? "A publié (°C/min/u)" : "Consigne filtrée − mesure (°C)";
    const ylabel = model ? "B publié (min⁻¹)" : "Commande appliquée (%)";
    const index = this.selected < 0 ? points.length - 1 : Math.min(this.selected, points.length - 1), point = points[index];
    const {x, y, xr, yr} = points.length ? this.coordinates() : {x: (_: number) => 0, y: (_: number) => 0, xr: [0, 1], yr: [0, 1]};
    const paths: string[] = [];
    if (model) {
      let segment = -1;
      for (const p of points) {
        if (segment !== p.segment) {paths.push(`M ${x(p.x)} ${y(p.y)}`); segment = p.segment;}
        else paths[paths.length - 1] += ` L ${x(p.x)} ${y(p.y)}`;
      }
    }
    const ticks = this.plotWidth < 500 ? [0, .5, 1] : [0, .25, .5, .75, 1];
    return html`<section aria-labelledby="projection-title">
      <h3 id="projection-title">${title}</h3>
      <p class="source">${this.source} · ${data.valid} / ${data.total} publications couplées</p>
      ${points.length ? html`
        <p class="axis-label">${ylabel}</p>
        <svg viewBox=${`0 0 ${this.plotWidth} 292`} role="img" aria-label=${`${title}. ${points.length} points affichés. ${xlabel} ; ${ylabel}. La sélection est accessible avec les contrôles Publication.`} @click=${this.clickPlot}>
          ${ticks.map(t => {const yy = 240 - t * 202; return svg`<line x1="78" x2=${this.plotWidth - 24} y1=${yy} y2=${yy} class="grid"/><text x="65" y=${yy + 5} text-anchor="end">${axisFormat(yr[0] * (1 - t) + yr[1] * t, (yr[1] - yr[0]) / (ticks.length - 1))}</text>`;})}
          <line x1="78" x2=${this.plotWidth - 24} y1="240" y2="240" class="axis"/><line x1="78" x2="78" y1="38" y2="240" class="axis"/>
          ${ticks.map(t => svg`<text x=${78 + t * (this.plotWidth - 102)} y="267" text-anchor="middle">${axisFormat(xr[0] * (1 - t) + xr[1] * t, (xr[1] - xr[0]) / (ticks.length - 1))}</text>`)}
          ${!model ? svg`<line x1=${x(0)} x2=${x(0)} y1="38" y2="240" class="zero"/>` : nothing}
          ${paths.map(path => svg`<path class="trajectory" d=${path}/>`)}
          ${points.map((p, i) => svg`<circle cx=${x(p.x)} cy=${y(p.y)} r=${i === index ? 6 : 3} class=${i === index ? "selected-point" : model && i === 0 ? "first-point" : "point"}/>`)}
          ${model ? svg`<text x=${x(points.at(-1)!.x) + 8} y=${y(points.at(-1)!.y) - 10}>${points.length === 1 ? "Unique" : points[0].x === points.at(-1)!.x && points[0].y === points.at(-1)!.y ? "Début / fin" : "Fin"}</text>` : nothing}
        </svg>
        <p class="axis-label x-label">${xlabel}</p>
        ${model ? html`<p class="legend"><span>○ Premier couple affiché · ${date(points[0].time)}</span><span>Dernier couple · ${date(points.at(-1)!.lastTime)}</span></p>` : nothing}
        <div class="selection-controls"><button type="button" aria-label=${`Publication précédente · ${title}`} ?disabled=${index <= 0} @click=${() => this.select(index - 1)}>←</button>
          <label>Publication <input type="range" min="0" max=${points.length - 1} step="1" .value=${String(index)} aria-label=${`Publication · ${title}`} aria-valuetext=${point ? `${date(point.time)} ; ${format(point.x)}, ${format(point.y)}` : ""} @input=${(e: Event) => this.select(Number((e.currentTarget as HTMLInputElement).value))}></label>
          <button type="button" aria-label=${`Publication suivante · ${title}`} ?disabled=${index >= points.length - 1} @click=${() => this.select(index + 1)}>→</button></div>
        <p class="selection" role="status">${point ? html`${date(point.time)}${point.observedAt ? " (heure d’observation)" : ""} · ${model ? "A" : "Écart"} ${format(point.x)} · ${model ? "B" : "Appliquée"} ${format(point.y)}${model ? html` · ${point.publications} publication(s)${point.lastTime !== point.time ? html` jusqu’au ${date(point.lastTime)}` : nothing}` : " %"}` : nothing}</p>
        <details><summary>Table des points affichés (${points.length})</summary>
          <div class="table-wrap"><table><caption>${title} · points affichés</caption><thead><tr><th>Date</th><th>${xlabel}</th><th>${ylabel}</th>${model ? html`<th>Publications regroupées</th>` : nothing}</tr></thead><tbody>
            ${points.slice(this.page * 25, (this.page + 1) * 25).map(p => html`<tr><td><button type="button" @click=${() => this.select(points.indexOf(p))}>${date(p.time)}${p.observedAt ? " (observation)" : ""}</button>${p.lastTime !== p.time ? html` → ${date(p.lastTime)}` : nothing}</td><td>${format(p.x)}</td><td>${format(p.y)}</td>${model ? html`<td>${p.publications}</td>` : nothing}</tr>`)}
          </tbody></table></div>
          <div class="pages"><button type="button" ?disabled=${this.page === 0} @click=${() => --this.page}>Page précédente</button><span>${this.page + 1} / ${Math.ceil(points.length / 25)}</span><button type="button" ?disabled=${(this.page + 1) * 25 >= points.length} @click=${() => ++this.page}>Page suivante</button></div>
        </details>` : html`<p class="empty">Aucun couple ${model ? "A/B" : "écart / commande"} exploitable dans cette source et cette fenêtre.</p>`}
      ${data.reduced ? html`<p class="notice">${model ? "600 derniers couples distincts affichés" : "600 publications réparties dans la fenêtre pour le dessin"} sur ${data.distinct}. Zoomez pour examiner une période plus courte. La sélection et la table portent sur ces points affichés.</p>` : nothing}
      <p class="foot">${model ? "Les couples identiques successifs sont regroupés. Les traits suivent les publications, coupés aux données manquantes et interruptions supérieures à 10 min. Une variation ne prouve pas un apprentissage accepté ; la confiance actuelle ne valide pas le passé." : "Chaque point associe deux valeurs de la même publication. Le nombre de points ne représente pas une durée ; cet écart filtré n’est ni l’erreur de l’intégrateur ni une mesure de confort. Aucun ajustement de courbe n’est calculé."}</p>
    </section>`;
  }
  static styles = css`
    :host{display:block;color:var(--primary-text-color,#192b31);min-width:0;--plot:#176b8c;--selected:#984d14}*{box-sizing:border-box}h3{margin:0 0 8px;font-size:16px}.source,.axis-label,.foot,.legend{font-size:12px;color:var(--secondary-text-color,#526268);line-height:1.6}.axis-label{margin:10px 0 0}.x-label{text-align:center;margin:0}.legend{display:flex;flex-wrap:wrap;gap:8px 18px}svg{display:block;width:100%;height:auto;max-height:340px;cursor:crosshair;overflow:visible}svg text{font:14px sans-serif;fill:var(--secondary-text-color,#526268)}.grid,.axis{stroke:var(--divider-color,#c6d0d4);stroke-width:1}.zero{stroke:var(--secondary-text-color,#526268);stroke-dasharray:4 5;opacity:.6}.point{fill:var(--plot);opacity:.55}.first-point{fill:none;stroke:var(--plot);stroke-width:2}.trajectory{fill:none;stroke:var(--plot);stroke-width:1.5;opacity:.55}.selected-point{fill:var(--selected);stroke:var(--card-background-color,#fff);stroke-width:2}.selection-controls{display:flex;align-items:center;gap:12px;margin-top:14px}.selection-controls label{flex:1;font-size:12px}.selection-controls input{display:block;width:100%;min-height:44px;accent-color:var(--plot)}button{font:inherit;color:inherit;background:var(--card-background-color,#fff);border:1px solid var(--divider-color,#b5c0c4);border-radius:7px;min-width:44px;min-height:44px;padding:8px 12px;cursor:pointer}button:disabled{opacity:.5;cursor:default}button:focus-visible,input:focus-visible,summary:focus-visible{outline:3px solid var(--primary-color,#167883);outline-offset:3px}.selection,.notice,.empty{font-size:13px;line-height:1.6;overflow-wrap:anywhere}.selection{font-variant-numeric:tabular-nums}.pages{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12px;flex-wrap:wrap}.table-wrap{overflow:auto;max-width:100%}table{border-collapse:collapse;width:100%;font-size:12px}th,td{text-align:left;padding:8px;border-bottom:1px solid var(--divider-color,#d2dbdd)}caption{text-align:left;padding:10px 0}summary{min-height:44px;padding:12px 0;font-size:13px;cursor:pointer}@media(max-width:520px){svg text{font-size:11px}.selection-controls{gap:7px}}@media(prefers-color-scheme:dark){:host{--plot:#80c8e6;--selected:#efb278}}
  `;
}
