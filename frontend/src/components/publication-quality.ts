import {LitElement,html,css} from "lit";
import {customElement,property} from "lit/decorators.js";
import {timestamp} from "../utils/timeseries";
import {PublicationQuality} from "../utils/evidence";
import {tr, locale} from "../i18n";
@customElement("smartpi-publication-quality")
export class PublicationQualityElement extends LitElement {
  @property({attribute:false}) value: unknown;
  @property() date="";
  @property() source="SmartPI";
  @property({type:Boolean}) available=true;
  @property({type:Number}) now=Date.now()/1000;
  render(){const status=PublicationQuality.describe(this.value,this.date,this.available,this.now);
    return html`<span title=${`${this.source} · ${this.date || tr("Date absente")}`}><span aria-hidden="true">${status===tr("Publication récente")?"●":"○"}</span> ${status} · ${this.source}
      ${timestamp(this.date)!==null?html`<time datetime=${this.date}>${new Date(this.date).toLocaleString(locale())}</time>`:""}</span>`;}
  static styles=css`:host{display:block;font-size:11px;font-weight:400;line-height:1.5;color:var(--secondary-text-color)}time{display:block;font-variant-numeric:tabular-nums}`;
}
