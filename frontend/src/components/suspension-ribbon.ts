import {LitElement,html,css} from "lit";
import {customElement,property} from "lit/decorators.js";
import type {ObservationPoint} from "../utils/evidence";
import {suspensionIntervals,suspensionRows} from "../utils/suspensions";
import {tr, locale} from "../i18n";

@customElement("smartpi-suspension-ribbon")
export class SuspensionRibbon extends LitElement {
  @property({attribute:false}) points: ObservationPoint[]=[];
  @property({attribute:false}) range: [number,number]=[0,1];
  @property({attribute:false}) inset={left:65,right:0};
  @property() error="";
  render(){
    const [start,end]=this.range,span=end-start;
    const date=(time:number)=>new Date(time*1000).toLocaleString(locale());
    return html`<section aria-label="${tr("Suspensions observées dans le carnet local")}">
      <div class="heading"><strong>${tr("Suspensions observées")}</strong><span>${tr("Carnet local · mêmes heures que le graphique")}</span></div>
      <div class="aligned" style=${`margin-left:${this.inset.left}px;margin-right:${this.inset.right}px`}>
      ${suspensionRows.map(row=>{
        const intervals=suspensionIntervals(this.points,row.key,start,end);
        const active=intervals.filter(s=>s.state==="active");
        const known=intervals.some(s=>s.state!=="unknown");
        return html`<div class="row"><div class="label"><span class="dot" style=${`background:var(--${row.key},${row.color})`} aria-hidden="true"></span>${tr(row.label)}<small>${active.length?tr("Activité observée"):known?tr("Aucune activité observée"):tr("Non archivé")}</small></div>
          <div class="track" role="img" aria-label=${tr("{0} : {1} plage(s) active(s) ; hachures : inconnu", tr(row.label), active.length)}>
          ${span>0?intervals.map(s=>html`<span class=${s.state} title=${`${tr(row.label)} · ${s.state==="active"?tr("Actif"):s.state==="inactive"?tr("Inactif"):tr("Inconnu")} · ${date(s.start)} → ${date(s.end)}`} style=${`left:${100*(s.start-start)/span}%;width:${100*(s.end-s.start)/span}%;--active:var(--${row.key},${row.color})`}></span>`):""}</div>
        </div>`;})}
      </div>
      <p class="legend"><span class="key active-key"></span>${tr("Actif")} <span class="key inactive-key"></span>${tr("Inactif")} <span class="key unknown"></span>${tr("Inconnu / non archivé")}</p>
      <p class="scope">${tr("États VTherm du carnet local, séparés des courbes Recorder ou de session.")}</p>
      ${this.error?html`<p role="status">${this.error}</p>`:""}
      <details><summary>${tr("Lire les plages de suspension")}</summary><div class="table"><table><caption>${tr("Plages actives observées")} · ${date(start)} → ${date(end)}</caption><thead><tr><th>${tr("Motif")}</th><th>${tr("Début observé")}</th><th>${tr("Fin encadrée")}</th></tr></thead><tbody>
      ${suspensionRows.flatMap(row=>suspensionIntervals(this.points,row.key,start,end).filter(s=>s.state==="active").map(s=>html`<tr><th>${tr(row.label)}</th><td>${date(s.start)}</td><td>${date(s.end)}</td></tr>`))}
      </tbody></table></div><p>${tr("Pas de reconstruction avant la collecte, après la dernière observation ni au travers d’une interruption supérieure à 10 min. Une absence de plage active ne prouve pas l’absence de suspension dans les périodes inconnues. Les barres décrivent les états publiés ; elles n’attribuent pas les variations de température à une cause.")}</p></details>
    </section>`;
  }
  static styles=css`:host{display:block;min-width:0;color:var(--primary-text-color)}section{border-top:1px solid var(--divider-color);padding-top:14px;margin:12px 0 8px}.heading{display:flex;gap:8px 18px;align-items:baseline;flex-wrap:wrap;font-size:12px}.heading span,.scope,p,small{color:var(--secondary-text-color);font-size:11px;line-height:1.5}.aligned{margin-top:12px}.row{margin-bottom:10px}.label{font-size:12px;display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-bottom:4px}.label small{margin-left:auto}.dot{width:7px;height:7px;border-radius:50%;display:inline-block}.track{height:8px;position:relative;border-radius:3px;overflow:hidden;background:var(--divider-color,#e0e4e7)}.track>span{position:absolute;top:0;height:100%}.active{background:var(--active)}.inactive{background:var(--divider-color,#e0e4e7)}.unknown{background:repeating-linear-gradient(135deg,transparent 0 3px,var(--secondary-text-color,#64727a) 3px 4px);opacity:.4}.legend{display:flex;align-items:center;gap:7px;flex-wrap:wrap}.key{width:18px;height:7px;display:inline-block}.active-key{background:#6e6670}.inactive-key{background:var(--divider-color,#e0e4e7)}summary{font-size:12px;min-height:44px;display:flex;align-items:center;cursor:pointer}summary:focus-visible{outline:3px solid var(--primary-color);outline-offset:3px}.table{overflow:auto}table{font-size:12px;border-collapse:collapse;width:100%}caption{text-align:left;padding:8px 0}td,th{text-align:left;padding:7px;border-bottom:1px solid var(--divider-color)}@media(prefers-color-scheme:dark){:host{--window:#64bfe3;--safety:#f08b82;--overpowering:#e9b364}}`;
}
