import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import uPlot from "uplot";
import plotCSS from "uplot/dist/uPlot.min.css";
import { valueAt, type Sample } from "../utils/timeseries";
export interface Curve {
  label: string;
  path: string;
  color: string;
  unit: string;
  step?: boolean;
}
@customElement("smartpi-time-chart")
export class TimeChart extends LitElement {
  @property({ attribute: false }) samples: Sample[] = [];
  @property({ attribute: false }) curves: Curve[] = [];
  @property({ attribute: false }) range: [number, number] = [0, 1];
  @property() heading = "";
  @property() syncKey = "smartpi";
  @property({ type: Boolean }) percent = false;
  private plot?: uPlot;
  private observer?: ResizeObserver;
  private applying = false;
  private themeMedia = matchMedia("(prefers-color-scheme: dark)");
  private themeChange = () => this.draw();
  private hiddenCurves = new Set<string>();
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
    this.observer?.disconnect();
    this.observer = undefined;
    this.plot?.destroy();
    this.plot = undefined;
  }
  protected updated() {
    this.draw();
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
        this.curves.some((c) => valueAt(s, c.path) !== null),
      )
    )
      return;
    const style = getComputedStyle(this),
      text = style.getPropertyValue("--primary-text-color").trim() || "#555";
    const data: uPlot.AlignedData = [
      this.samples.map((s) => s.time),
      ...this.curves.map((c) => this.samples.map((s) => valueAt(s, c.path))),
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
        cursor: { sync: { key: this.syncKey }, drag: { x: true, y: false } },
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
            label: "Date",
            value: (_u, v) =>
              v == null ? "—" : new Date(v * 1000).toLocaleString(),
          },
          ...this.curves.map((c) => ({
            label: c.label,
            stroke: c.color,
            width: 2,
            spanGaps: false,
            show: !this.hiddenCurves.has(c.label),
            paths: c.step ? uPlot.paths.stepped!({ align: 1 }) : undefined,
            points: { show: this.samples.length < 3 },
            value: (_u: uPlot, v: number) =>
              v == null
                ? "Indisponible"
                : `${v.toLocaleString(undefined, { maximumFractionDigits: c.unit.includes("min") ? 6 : 3 })} ${c.unit}`,
          })),
        ],
        hooks: {
          setScale: [
            (u, key) => {
              if (
                key === "x" &&
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
    this.observer = new ResizeObserver(() => {
      if (this.plot && this.plot.width !== Math.max(240, target.clientWidth)) {
        this.applying = true;
        this.plot.setSize({
          width: Math.max(240, target.clientWidth),
          height: 245,
        });
        this.applying = false;
      }
    });
    this.observer.observe(target);
  }
  render() {
    const count = this.samples.filter((s) =>
      this.curves.some((c) => valueAt(s, c.path) !== null),
    ).length;
    return html`<h3>${this.heading}</h3>
      <div class="plot" aria-label=${this.heading}></div>
      ${!count
        ? html`<p>Aucune valeur disponible pour cette fenêtre.</p>`
        : html`<details>
            <summary>
              Table de données accessible · ${count} publications
            </summary>
            <div class="table">
              <table>
                <thead>
                  <tr>
                    <th>Date locale</th>
                    ${this.curves.map(
                      (c) => html`<th>${c.label} (${c.unit})</th>`,
                    )}
                  </tr>
                </thead>
                <tbody>
                  ${this.samples.slice(-200).map(
                    (s) =>
                      html`<tr>
                        <td>${new Date(s.time * 1000).toLocaleString()}</td>
                        ${this.curves.map(
                          (c) =>
                            html`<td>
                              ${valueAt(s, c.path) ?? "Indisponible"}
                            </td>`,
                        )}
                      </tr>`,
                  )}
                </tbody>
              </table>
            </div>
            <p>
              200 dernières publications maximum dans la table ; courbe
              complète.
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
      h3 {
        font-size: 15px;
        margin: 0 0 12px;
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
