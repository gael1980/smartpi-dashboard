import {LitElement, html, css, nothing} from "lit";
import {customElement, property} from "lit/decorators.js";
import type {SmartPIDiagnostic} from "../adapter";
import {SmartPIExplanations, type ExplanationRow} from "../utils/smartpi-explanations";
import "./publication-quality";
import {tr, locale} from "../i18n";

@customElement("smartpi-explanations")
export class SmartPIExplanationsElement extends LitElement {
  @property({attribute:false}) diagnostic?: SmartPIDiagnostic;
  @property() mode: "learning" | "maintenance" = "maintenance";
  @property({type:Number}) now = Date.now()/1000;
  private rows(rows: ExplanationRow[]) {return html`<dl>${rows.map(row => html`<div data-field=${row.key}><dt>${row.label}</dt><dd>${row.value}</dd></div>`)}</dl>`;}
  render() {
    const d = this.diagnostic;
    if (!d) return nothing;
    const model = new SmartPIExplanations(d.live, d.available, this.now * 1000), learning = this.mode === "learning";
    return html`<details class="explanation"><summary>${learning ? tr("Comprendre l’apprentissage") : tr("Pourquoi ce maintien ?")}</summary>
      <smartpi-publication-quality .now=${this.now} .value=${d.live} .date=${d.lastUpdated ?? ""} .available=${d.available}></smartpi-publication-quality>
      <p>${learning ? tr("Les compteurs et motifs décrivent la dernière situation publiée. Ils ne prédisent pas la date de fin de l’apprentissage.") : tr("Le maintien de l’intégrale conserve sa mémoire. Il ne signifie pas à lui seul un arrêt de la chauffe ; les commandes FF et PI gardent leur rôle.")}</p>
      ${this.rows(learning ? model.learning : model.maintenance)}
      ${!learning ? html`<section data-transaction><h4>${tr("Dernier transfert FF2 conservé")}</h4>
        ${model.transaction ? html`<p>${model.transaction.date ? html`<time datetime=${model.transaction.date}>${new Date(model.transaction.date).toLocaleString(locale())}</time>` : tr("Horodatage du transfert non vérifiable")}</p>
          <smartpi-publication-quality source="Transfert SmartPI" .now=${this.now} .value=${model.transaction.rows} .date=${model.transaction.date ?? ""} .available=${d.available}></smartpi-publication-quality>
          ${this.rows(model.transaction.rows)}
          <p>${tr("Chaque variation est exprimée en points de commande, sans mesure de puissance thermique. Ce transfert conservé peut être antérieur à la publication actuelle ; un champ absent ne permet pas de conclure à une commande inchangée.")}</p>` : html`<p>${tr("Aucun transfert daté publié. Les champs manquants ne sont pas reconstruits.")}</p>`}
      </section>` : nothing}
    </details>`;
  }
  static styles = css`:host{display:block;margin-block:12px;color:var(--primary-text-color)}details{border:1px solid var(--divider-color);border-radius:12px;padding:0 14px}summary{min-height:44px;display:list-item;align-content:center;cursor:pointer;font-weight:600}summary:focus-visible{outline:3px solid var(--primary-color);outline-offset:3px}p{font-size:12px;line-height:1.6;color:var(--secondary-text-color)}dl{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:12px;margin:16px 0}dt{font-size:11px;color:var(--secondary-text-color)}dd{font-size:12px;line-height:1.6;margin:3px 0 0;overflow-wrap:anywhere}section{border-top:1px solid var(--divider-color)}h4{font-size:13px}time{font-variant-numeric:tabular-nums}`;
}
