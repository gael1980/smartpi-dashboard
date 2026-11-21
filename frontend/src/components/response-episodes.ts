import {LitElement,html,css} from "lit";
import {customElement,property} from "lit/decorators.js";
import {ResponseEpisodes,type ObservationPoint} from "../utils/evidence";
import {display} from "../adapter";
import {tr, locale} from "../i18n";
@customElement("smartpi-response-episodes")
export class ResponseEpisodesElement extends LitElement{
 @property({attribute:false}) points:ObservationPoint[]=[];
 @property({type:Number}) tolerance=.2;
 render(){const analysis=new ResponseEpisodes(this.points,this.tolerance);
 return html`<section><h3>${tr("Réponses aux consignes normales")}</h3><p>${tr("Observations prospectives locales · maximum 48 h / 1 200 points. Aucun passé Recorder reconstruit.")}</p>
  <label>${tr("Tolérance de lecture (unité de chaque épisode)")} <select .value=${String(this.tolerance)} @change=${(e:Event)=>{this.tolerance=Number((e.target as HTMLSelectElement).value);}}><option value="0">${tr("Exacte")}</option><option value="0.2">± 0,2</option><option value="0.5">± 0,5</option></select></label>
  <p>${tr("Ce seuil de lecture n’est ni la bande morte SmartPI ni une norme de confort.")} ${analysis.excluded} ${tr("point(s) exclu(s) : contexte non confirmé, indisponibilité ou motif de suspension publié.")}</p>
  ${!analysis.episodes.length?html`<p>${tr("En attente d’observations éligibles après cette mise à jour.")}</p>`:html`<ol>${analysis.episodes.slice(-20).reverse().map(e=>html`<li><strong>${display(e.baseline,e.unit)} → ${display(e.target,e.unit)} · ${e.mode==="heat"?tr("Chauffage"):tr("Refroidissement")}</strong>
   <p>${new Date(e.start*1000).toLocaleString(locale())} → ${new Date(e.end*1000).toLocaleString(locale())} · ${e.endReason}</p>
   <dl><div><dt>${tr("Plage mesurée")}</dt><dd>${display(e.minimum)} → ${display(e.maximum,e.unit)}</dd></div>
    <div><dt>${tr("Première présence dans la tolérance")}</dt><dd>${e.firstWithin===null?tr("Non observée"):Math.round(e.firstWithin/60)+tr(" min depuis le premier point")}</dd></div>
    <div><dt>${tr("Dépassement dans le sens du trajet initial")}</dt><dd>${display(e.overshoot,e.unit)}</dd></div>
    <div><dt>${tr("Publications / durée encadrée")}</dt><dd>${e.publications} / ${Math.round(e.bracketedSeconds/60)} ${tr("min")}</dd></div></dl>
   ${!e.contextKnown?html`<p>${tr("Contexte fenêtre, sécurité ou délestage partiellement non archivé. Aucune conclusion causale.")}</p>`:""}
  </li>`)}</ol><p>${tr("20 derniers segments sur")} ${analysis.episodes.length}${tr(". Le début est la première observation disponible, pas nécessairement l’instant du changement. L’atteinte est datée à une publication ; aucune durée de stabilisation continue n’est déduite.")}</p>`}
 </section>`;}
 static styles=css`:host{display:block}h3{font-size:16px}p,label{font-size:12px;line-height:1.6;color:var(--secondary-text-color)}select{display:block;min-height:44px;margin:6px 0;background:var(--card-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color);border-radius:6px;padding:8px}select:focus-visible{outline:3px solid var(--primary-color)}ol{padding:0;list-style:none}li{border-top:1px solid var(--divider-color);padding:14px 0;overflow-wrap:anywhere}strong{font-size:14px}dl{display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:12px}dt{color:var(--secondary-text-color)}dd{margin:5px 0}@media(max-width:600px){dl{grid-template-columns:1fr}}`;
}
