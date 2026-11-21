import {LitElement,html,svg,css} from "lit";
import {customElement,property} from "lit/decorators.js";
import {ComparisonTrace} from "../utils/evidence";
import type {Sample} from "../utils/timeseries";
import {tr, locale} from "../i18n";
export interface ComparisonRoom {id:string;name:string;unit:string|null;samples:Sample[]}
@customElement("smartpi-room-comparison")
export class RoomComparison extends LitElement {
 @property({attribute:false}) rooms:ComparisonRoom[]=[];
 @property({type:Number}) end=Date.now()/1000;
 render(){const start=this.end-3600;
  return html`<details><summary>${tr("Comparer les pièces · dernière heure de session")}</summary>
   <p>${tr("Mêmes axes de temps, d’écart filtré et de commande dans chaque groupe d’unité. Aucune hiérarchie de performance entre pièces.")}</p>
   ${["°C","°F"].map(unit=>{
    const group=this.rooms.filter(r=>r.unit===unit).map(r=>({...r,trace:new ComparisonTrace(r.samples,unit,start,this.end)}));
    if(!group.length)return "";
    let max=1;
    for(const r of group)for(const segment of r.trace.segments)for(const point of segment)max=Math.max(max,Math.abs(point.error));
    return html`<h3>${unit} · ${tr("écart")} ${(-max).toLocaleString(locale())} à ${max.toLocaleString(locale())} · ${tr("commande 0–100 %")}</h3>
     <div class="rooms">${group.map(r=>html`<section><h4>${r.name}</h4>
      ${r.trace.valid ? html`<svg preserveAspectRatio="none" viewBox="0 0 300 130" role="img" aria-label=${tr("{0} : écart filtré en haut, commande en bas ; {1} publications", r.name, r.trace.valid)}>
       <path d="M0 35H300 M0 120H300" stroke="var(--divider-color)"/>
       ${r.trace.segments.map(s=>s.filter((_,i)=>i>=s.length-600)).map(s=>svg`<polyline vector-effect="non-scaling-stroke" points=${s.map(p=>`${300*(p.time-start)/3600},${35-28*p.error/max}`).join(" ")} fill="none" stroke="#3288c5" stroke-width="2"/>
        <polyline vector-effect="non-scaling-stroke" points=${s.map(p=>`${300*(p.time-start)/3600},${120-.45*p.applied}`).join(" ")} fill="none" stroke="#c07339" stroke-width="2"/>
        ${s.length===1?svg`<circle cx=${300*(s[0].time-start)/3600} cy=${35-28*s[0].error/max} r="2" fill="#3288c5"/><circle cx=${300*(s[0].time-start)/3600} cy=${120-.45*s[0].applied} r="2" fill="#c07339"/>`:""}`)}
      </svg>`:html`<p>${tr("En attente de publications datées avec unité enregistrée.")}</p>`}
      <p>${r.trace.valid} ${tr("publications couplées · bleu : consigne filtrée − mesure · orange : commande · 600 derniers points maximum par segment.")}</p>
      <details><summary>${tr("Valeurs accessibles")}</summary><div class="table"><table><thead><tr><th>${tr("Date")}</th><th>${tr("Écart")} ${unit}</th><th>${tr("Commande %")}</th></tr></thead><tbody>${r.trace.segments.flat().slice(-60).map(p=>html`<tr><td>${new Date(p.time*1000).toLocaleTimeString(locale())}</td><td>${p.error.toLocaleString(locale())}</td><td>${p.applied.toLocaleString(locale())}</td></tr>`)}</tbody></table></div><p>${tr("60 dernières publications maximum ; tracé de toute l’heure.")}</p></details>
     </section>`)}</div>`;})}
   ${this.rooms.some(r=>!r.unit)?html`<p>${tr("Unité non vérifiable : certaines pièces sont exclues de la comparaison.")}</p>`:""}
   <p>${new Date(start*1000).toLocaleTimeString(locale())} → ${new Date(this.end*1000).toLocaleTimeString(locale())} · ${tr("Session seulement, sans fusion Recorder. Pas de raccord entre données absentes, changement de contexte ou interruption > 10 min. Les segments relient des publications ; ce ne sont pas des mesures intermédiaires.")}</p>
  </details>`;}
 static styles=css`:host{display:block;margin:18px 0;color:var(--primary-text-color)}details{border-top:1px solid var(--divider-color);padding:10px 0}summary{cursor:pointer;min-height:44px;padding:12px 0;font-size:14px;font-weight:600}summary:focus-visible{outline:3px solid var(--primary-color);outline-offset:2px}p{font-size:12px;line-height:1.5;color:var(--secondary-text-color)}h3{font-size:13px}h4{font-size:14px;margin:8px 0}svg{width:100%;height:145px;display:block}.rooms{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:16px}section{min-width:0;overflow-wrap:anywhere}.table{overflow:auto}table{width:100%;font-size:12px;border-collapse:collapse}td,th{text-align:left;padding:6px;border-bottom:1px solid var(--divider-color)}@media(max-width:500px){.rooms{grid-template-columns:1fr}}`;
}
