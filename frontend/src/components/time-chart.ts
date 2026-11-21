import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import uPlot from "uplot";
import plotCSS from "uplot/dist/uPlot.min.css";
import { sameSampleContext, valueAt, type LearningMark, type Sample } from "../utils/timeseries";
import {commandPair, DiagnosticProjection} from "../utils/diagnostic-projection";
import {tr, locale} from "../i18n";
export interface Curve {
  label: string;
  path: string;
  color: string;
  unit: string;
  step?: boolean;
  dash?: number[];
}
@customElement("smartpi-time-chart")
export class TimeChart extends LitElement {
  @property({ attribute: false }) samples: Sample[] = [];
  @property({ attribute: false }) curves: Curve[] = [];
  @property({ attribute: false }) range: [number, number] = [0, 1];
  @property() heading = "";
  @property() syncKey = "smartpi";
  @property({ type: Boolean }) percent = false;
  @property({ type: Boolean }) inspectable = false;
  @property({ attribute: false }) selectedTime: number | null = null;
  @property({ attribute: false }) marks: LearningMark[] = [];
  @property({ type: Boolean }) thermalPhases = false;
  @property({ type: Boolean }) commandComparison = false;
  @state() private legendTime: number | null = null;
  private lastSamples?: Sample[];
  private lastSignature = "";
  private plot?: uPlot;
  private observer?: ResizeObserver;
  private layoutFrame?: number;
  private applying = false;
  private themeMedia = matchMedia("(prefers-color-scheme: dark)");
  private themeChange = () => this.draw();
  private hiddenCurves = new Set<string>();
  private pointerStart?: number;
  connectedCallback() {
    super.connectedCallback();
    this.themeMedia.addEventListener("change", this.themeChange);
    if (this.hasUpdated) this.updateComplete.then(() => this.draw());
  }
  disconnectedCallback() {
    this.themeMedia.removeEventListener("change", this.themeChange);
    this.dispose();
    super.disconnectedCallback();
  }
  private dispose() {
    cancelAnimationFrame(this.layoutFrame ?? 0);
    this.layoutFrame = undefined;
    this.observer?.disconnect();
    this.observer = undefined;
    this.plot?.destroy();
    this.plot = undefined;
  }
  protected willUpdate(changed: Map<string, unknown>) {
    if (changed.has("syncKey")) this.legendTime = null;
    if (changed.has("selectedTime")) this.legendTime = this.selectedTime;
  }
  protected updated(changed: Map<string, unknown>) {
    const signature = JSON.stringify([
      this.curves,
      this.heading,
      this.syncKey,
      this.percent,
      this.thermalPhases,
      this.commandComparison,
      this.range,
    ]);
    if (this.lastSamples === this.samples && this.lastSignature === signature) {
      if (changed.has("selectedTime") || changed.has("marks")) this.plot?.redraw(false, false);
      return;
    }
    this.lastSamples = this.samples;
    this.lastSignature = signature;
    this.draw();
  }
  private inspect(time: number) {
    this.legendTime = time;
    if (this.inspectable)
      this.dispatchEvent(new CustomEvent("inspect-publication", {
        detail: time, bubbles: true, composed: true,
      }));
  }
  private toggleSeries(index: number) {
    const label = this.curves[index].label;
    const show = this.hiddenCurves.has(label);
    if (this.plot) this.plot.setSeries(index + 1, { show });
    if (show) this.hiddenCurves.delete(label);
    else this.hiddenCurves.add(label);
    this.requestUpdate();
  }
  showCurve(path: string) {
    const index = this.curves.findIndex((curve) => curve.path === path);
    if (index >= 0 && this.hiddenCurves.has(this.curves[index].label))
      this.toggleSeries(index);
  }
  private continuous(previous: Sample, current: Sample) {
    const elapsed = current.time - previous.time;
    return elapsed > 0 && elapsed <= DiagnosticProjection.GAP_SECONDS &&
      sameSampleContext(previous, current);
  }
  private drawThermalPhases(u: uPlot) {
    if (!this.thermalPhases) return;
    const { left, top, width, height } = u.bbox;
    const ctx = u.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.rect(left, top, width, height);
    ctx.clip();
    ctx.globalAlpha = 1;
    let start = 0;
    let end = 0;
    let direction = 0;
    const flush = () => {
      if (!direction) return;
      const x = u.valToPos(start, "x", true);
      const span = u.valToPos(end, "x", true) - x;
      ctx.fillStyle = direction > 0 ? "rgba(216,137,46,.14)" : "rgba(38,137,202,.14)";
      ctx.fillRect(x, top, span, height);
      ctx.fillStyle = direction > 0 ? "#d8892e" : "#2689ca";
      ctx.fillRect(x, top + height - 6 * devicePixelRatio, span, 6 * devicePixelRatio);
    };
    for (let i = 1; i < this.samples.length; i++) {
      const previous = this.samples[i - 1], current = this.samples[i];
      const before = valueAt(previous, "temperature.indoor");
      const after = valueAt(current, "temperature.indoor");
      const next = before === null || after === null || !this.continuous(previous, current)
        ? 0 : Math.sign(after - before);
      if (next !== direction) {
        flush();
        start = previous.time;
        direction = next;
      }
      end = current.time;
    }
    flush();
    ctx.restore();
  }
  private drawMarks(u: uPlot, text: string) {
    if (!this.marks.length) return;
    const { left, top, width, height } = u.bbox;
    const ctx = u.ctx;
    const size = 8 * devicePixelRatio;
    ctx.save();
    ctx.font = `bold ${size}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const lastX = new Map<LearningMark["kind"], number>();
    for (const mark of this.marks) {
      const x = u.valToPos(mark.time, "x", true);
      if (x < left || x > left + width || x - (lastX.get(mark.kind) ?? -Infinity) < size * 3) continue;
      lastX.set(mark.kind, x);
      const model = mark.kind === "A" || mark.kind === "B";
      const upper = mark.kind === "A" || mark.kind === "Chauffe";
      const y = model
        ? mark.temperature === null || this.hiddenCurves.has("Intérieure mesurée")
          ? top + size * (upper ? 1 : 3)
          : Math.max(top + size * 2, Math.min(top + height - size * 6,
              u.valToPos(mark.temperature, "y", true))) + size * (upper ? -1.1 : 1.1)
        : top + height - size * (upper ? 3 : 1);
      ctx.fillStyle = upper ? "#17638d" : "#6f448a";
      ctx.strokeStyle = text;
      ctx.beginPath();
      if (mark.kind === "B") {
        ctx.moveTo(x, y - size);
        ctx.lineTo(x + size, y);
        ctx.lineTo(x, y + size);
        ctx.lineTo(x - size, y);
        ctx.closePath();
      } else {
        ctx.arc(x, y, size * .8, 0, 2 * Math.PI);
      }
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#fff";
      ctx.fillText(mark.kind === "Chauffe" ? "↑" : mark.kind === "Refroidissement" ? "↓" : mark.kind, x, y);
    }
    ctx.restore();
  }
  private publishLayout(target: HTMLElement) {
    cancelAnimationFrame(this.layoutFrame ?? 0);
    this.layoutFrame = requestAnimationFrame(() => {
      this.layoutFrame = undefined;
      if (!this.plot || !this.isConnected) return;
      const container = target.getBoundingClientRect(), area = this.plot.over.getBoundingClientRect();
      this.dispatchEvent(new CustomEvent("plot-layout", {
        detail: {left: area.left - container.left, right: container.right - area.right},
        bubbles: true, composed: true,
      }));
    });
  }
  private draw() {
    if (!this.isConnected) return;
    const target = this.renderRoot.querySelector<HTMLElement>(".plot");
    if (!target) return;
    const previous = this.plot;
    if (previous)
      previous.series.forEach((s, i) => {
        if (i && typeof s.label === "string") {
          if (s.show === false) this.hiddenCurves.add(s.label);
          else this.hiddenCurves.delete(s.label);
        }
      });
    this.dispose();
    if (
      !this.samples.length ||
      !this.samples.some((s) =>
        this.curves.some((c) => this.seriesValue(s, c) !== null),
      )
    )
      return;
    const style = getComputedStyle(this),
      text = style.getPropertyValue("--primary-text-color").trim() || "#555";
    const data: uPlot.AlignedData = [
      this.samples.map((s) => s.time),
      ...this.curves.map((c) => this.samples.map((s) => this.seriesValue(s, c))),
    ];
    this.applying = true;
    this.plot = new uPlot(
      {
        width: Math.max(240, target.clientWidth),
        height: 245,
        scales: {
          x: { time: true, min: this.range[0], max: this.range[1] },
          y: this.percent
            ? {
                range: (_u, min, max) => [
                  Math.min(0, min ?? 0),
                  Math.max(100, max ?? 100),
                ],
              }
            : {},
        },
        legend: { show: false },
        cursor: { sync: { key: this.syncKey }, drag: { x: true, y: false } },
        bands: this.commandComparison ? [
          {series: [1, 2], fill: "rgba(180,105,30,.22)"},
          {series: [2, 1], fill: "rgba(30,120,155,.22)"},
        ] : [],
        axes: [
          {
            stroke: text,
            space: 100,
            grid: { show: false },
            values: (_u, ticks) =>
              ticks.map(
                (t) =>
                  new Date(t * 1000).toLocaleDateString(undefined, {
                    month: "2-digit",
                    day: "2-digit",
                  }) +
                  "\n" +
                  new Date(t * 1000).toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
              ),
            size: 55,
          },
          {
            stroke: text,
            values: (_u, ticks) =>
              ticks.map((v) =>
                v.toLocaleString(undefined, { maximumFractionDigits: 6 }),
              ),
            grid: { stroke: "rgba(128,128,128,.15)" },
            size: 65,
          },
        ],
        series: [
          {
            label: tr("Date"),
            value: (_u, v) =>
              v == null ? "—" : new Date(v * 1000).toLocaleString(locale()),
          },
          ...this.curves.map((c) => ({
            label: c.label,
            stroke: c.color,
            width: 2,
            dash: c.dash,
            spanGaps: false,
            gaps: (u: uPlot, _series: number, start: number, end: number, gaps: uPlot.Series.Gaps) => {
              const extra: uPlot.Series.Gaps = [...gaps];
              for (let i = start + 1; i <= end; i++) {
                if (!this.continuous(this.samples[i - 1], this.samples[i])) {
                  extra.push([Math.round(u.valToPos(this.samples[i - 1].time, "x", true)), Math.round(u.valToPos(this.samples[i].time, "x", true))]);
                }
              }
              const merged: uPlot.Series.Gaps = [];
              for (const gap of extra.sort((a, b) => a[0] - b[0])) {
                const previous = merged.at(-1);
                if (previous && gap[0] <= previous[1]) previous[1] = Math.max(previous[1], gap[1]);
                else merged.push([...gap]);
              }
              return merged;
            },
            show: !this.hiddenCurves.has(c.label),
            paths: c.step ? uPlot.paths.stepped!({ align: 1 }) : undefined,
            points: { show: this.samples.length < 3 },
            value: (_u: uPlot, v: number) =>
              v == null
                ? tr("Indisponible")
                : `${v.toLocaleString(undefined, { maximumFractionDigits: c.unit.includes("min") ? 6 : 3 })} ${c.unit}`,
          })),
        ],
        hooks: {
          setCursor: [(u) => {
            // Keep the inspected publication on touch/mouse leave. Null values
            // belong to this exact timestamp; never snap each series separately.
            const idx = u.cursor.idx;
            if (!this.applying && idx != null && u.cursor.left! >= 0) {
              const time = u.data[0][idx];
              if (time !== undefined) this.legendTime = time;
            }
          }],
          draw: [(u) => {
            this.drawThermalPhases(u);
            this.drawMarks(u, text);
            if (this.selectedTime === null) return;
            const { left, top, width, height } = u.bbox;
            const x = u.valToPos(this.selectedTime, "x", true);
            if (x < left || x > left + width) return;
            const ctx = u.ctx;
            ctx.save();
            ctx.strokeStyle = text;
            ctx.setLineDash([5, 4]);
            ctx.beginPath();
            ctx.moveTo(x, top);
            ctx.lineTo(x, top + height);
            ctx.stroke();
            ctx.restore();
          }],
          setSeries: [
            (u) => {
              if (u.status !== 1 || u !== this.plot) return;
              u.series.forEach((series, i) => {
                if (i && typeof series.label === "string") {
                  if (series.show === false)
                    this.hiddenCurves.add(series.label);
                  else this.hiddenCurves.delete(series.label);
                }
              });
              this.requestUpdate();
            },
          ],
          setScale: [
            (u, key) => {
              if (
                key === "x" &&
                u.status === 1 &&
                u === this.plot &&
                !this.applying &&
                u.scales.x.min != null &&
                u.scales.x.max != null &&
                (Math.abs(u.scales.x.min - this.range[0]) > 0.01 ||
                  Math.abs(u.scales.x.max - this.range[1]) > 0.01)
              )
                this.dispatchEvent(
                  new CustomEvent("time-range", {
                    detail: [u.scales.x.min, u.scales.x.max],
                    bubbles: true,
                    composed: true,
                  }),
                );
            },
          ],
        },
      },
      data,
      target,
    );
    this.applying = false;
    this.publishLayout(target);
    this.observer = new ResizeObserver(() => {
      if (this.plot && this.plot.width !== Math.max(240, target.clientWidth)) {
        this.applying = true;
        this.plot.setSize({
          width: Math.max(240, target.clientWidth),
          height: 245,
        });
        this.applying = false;
        this.publishLayout(target);
      }
    });
    this.observer.observe(target);
  }
  private seriesValue(sample: Sample, curve: Curve) {
    if (!this.commandComparison) return valueAt(sample, curve.path);
    const pair = commandPair(sample);
    return pair === null ? null : curve.path === "power.command_percent" ? pair[0] : curve.path === "power.applied_percent" ? pair[1] : null;
  }
  render() {
    const count = this.samples.filter((s) =>
      this.curves.some((c) => this.seriesValue(s, c) !== null),
    ).length;
    const visible = this.samples.filter(s => s.time >= this.range[0] && s.time <= this.range[1]);
    const selected = visible.find(s => s.time === this.legendTime);
    const publication = selected ?? visible.at(-1);
    const showLatest = !selected;
    return html`<h3>${this.heading}</h3>
      <div class="series-controls" role="group" aria-label="${tr("Séries affichées")}">
        ${this.curves.map(
          (c, i) =>
            html`<button
              aria-pressed=${!this.hiddenCurves.has(c.label)}
              @click=${() => this.toggleSeries(i)}
            >
              <span style=${"background:" + c.color} aria-hidden="true"></span
              >${c.label}
            </button>`,
        )}
      </div>
      <div class="plot" aria-label=${this.heading}
        @pointerdown=${(event: PointerEvent) => {
          this.pointerStart = event.button === 0 ? event.clientX : undefined;
        }}
        @click=${{ capture: true, handleEvent: (event: MouseEvent) => {
          const plot = this.plot;
          if (!plot || !event.composedPath().includes(plot.over) ||
              this.pointerStart === undefined || Math.abs(event.clientX - this.pointerStart) > 4)
            return;
          const time = plot.data[0][plot.posToIdx(event.clientX - plot.over.getBoundingClientRect().left)];
          if (time !== undefined) this.inspect(time);
        } }}></div>
      <slot name="context-bars"></slot>
      ${publication ? html`<div class="publication-values" aria-label="${tr("Valeurs de la publication")}">
        <div class="publication-date">${showLatest ? tr("Dernière publication de la fenêtre") : tr("Publication sélectionnée")}
          · <time datetime=${new Date(publication.time * 1000).toISOString()}>${new Date(publication.time * 1000).toLocaleString(locale())}</time>
          ${!showLatest ? html`<button type="button" @click=${() => {if (this.inspectable) this.inspect(visible.at(-1)!.time); else this.legendTime = null;}}>${tr("Dernière publication")}</button>` : ""}</div>
        <dl>${this.curves.map(c => {
          const value = this.seriesValue(publication, c);
          return html`<div class=${this.hiddenCurves.has(c.label) ? "series-muted" : ""}>
            <dt><span style=${"background:" + c.color} aria-hidden="true"></span>${c.label}</dt>
            <dd>${value === null ? tr("Absente à cet instant") : value.toLocaleString(undefined, {maximumFractionDigits: 3}) + " " + c.unit}</dd>
          </div>`;
        })}</dl>
      </div>` : html`<p>${tr("Aucune publication dans cette fenêtre.")}</p>`}
      ${!count
        ? html`<p>${tr("Aucune valeur disponible pour cette fenêtre.")}</p>`
        : html`<details>
            <summary>
              ${tr("Table de données accessible")} · ${count} ${tr("publications")}
            </summary>
            <div class="table">
              <table>
                <thead>
                  <tr>
                    <th>${tr("Date locale")}</th>
                    ${this.curves.map(
                      (c) => html`<th>${c.label} (${c.unit})</th>`,
                    )}
                  </tr>
                </thead>
                <tbody>
                  ${this.samples.slice(-200).map(
                    (s) =>
                      html`<tr>
                        <td>${this.inspectable
                          ? html`<button type="button" aria-pressed=${s.time === this.selectedTime}
                              @click=${() => this.inspect(s.time)}>${new Date(s.time * 1000).toLocaleString(locale())}</button>`
                          : new Date(s.time * 1000).toLocaleString(locale())}</td>
                        ${this.curves.map(
                          (c) =>
                            html`<td>
                              ${this.seriesValue(s, c) ?? tr("Indisponible")}
                            </td>`,
                        )}
                      </tr>`,
                  )}
                </tbody>
              </table>
            </div>
            <p>
              ${tr("200 dernières publications maximum dans la table ; courbe complète.")}
            </p>
          </details>`}`;
  }
  static styles = [
    unsafeCSS(plotCSS),
    css`
      :host {
        display: block;
        min-width: 0;
      }
      .publication-values{font-size:12px;margin:8px 0 14px}
      .publication-date{color:var(--secondary-text-color);line-height:1.6}
      .publication-date button{font:inherit;color:var(--primary-text-color);background:transparent;border:1px solid var(--divider-color);border-radius:6px;padding:5px 8px;margin-left:6px;cursor:pointer;min-height:32px}
      dl{display:flex;flex-wrap:wrap;gap:8px 16px;margin:8px 0}
      dl div{display:flex;flex-wrap:wrap;gap:5px;border-bottom:1px solid var(--divider-color);padding:5px 0}
      dt{display:flex;align-items:center;gap:6px;font-weight:600}dd{margin:0;font-variant-numeric:tabular-nums}
      dt span{width:9px;height:9px;display:inline-block;border-radius:50%}.series-muted{opacity:.6}
      h3 {
        font-size: 15px;
        margin: 0 0 12px;
      }
      .series-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 10px;
      }
      .series-controls button {
        font: inherit;
        font-size: 12px;
        color: inherit;
        background: transparent;
        border: 1px solid var(--divider-color);
        border-radius: 5px;
        min-height: 32px;
        padding: 6px 9px;
        cursor: pointer;
      }
      .series-controls button[aria-pressed="false"] {
        text-decoration: line-through;
      }
      .series-controls span {
        display: inline-block;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        margin-right: 6px;
      }
      .plot {
        width: 100%;
        min-width: 0;
      }
      .uplot {
        font-family: inherit;
        color: var(--primary-text-color);
      }
      .u-legend {
        font-size: 12px;
        max-width: 100%;
        white-space: normal;
      }
      .u-value {
        font-variant-numeric: tabular-nums;
      }
      .table {
        max-height: 280px;
        overflow: auto;
      }
      table {
        border-collapse: collapse;
        font-size: 12px;
      }
      td,
      th {
        padding: 8px;
        border-bottom: 1px solid var(--divider-color);
        white-space: nowrap;
      }
      details,
      p {
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      summary {
        cursor: pointer;
        padding: 10px 0;
      }
      :focus-visible {
        outline: 2px solid var(--primary-color);
      }
    `,
  ];
}
