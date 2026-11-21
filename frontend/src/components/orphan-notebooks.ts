import {LitElement,html,css,nothing} from "lit";
import {customElement,property,state} from "lit/decorators.js";
import type {HassLike} from "../adapter";
import {ObservatoryClient,type ObservatoryConnection,type OrphanRoom,type ObservatoryRoom} from "../services/observatory";
import {tr, locale} from "../i18n";

@customElement("smartpi-orphan-notebooks")
export class OrphanNotebooks extends LitElement {
  @property({attribute:false}) hass?: HassLike & Partial<ObservatoryConnection>;
  @state() private rooms: OrphanRoom[]=[];
  @state() private busy=false;
  @state() private loaded=false;
  @state() private error="";
  @state() private armed="";
  @state() private inspected?: {id:string;room:ObservatoryRoom};
  private generation=0;
  disconnectedCallback(){++this.generation;this.busy=false;this.loaded=false;super.disconnectedCallback();}
  private async load(){
    if(!this.hass||this.busy)return;
    const generation=++this.generation;this.busy=true;this.error="";
    try{const data=await new ObservatoryClient(this.hass).request(undefined,"get");
      if(generation!==this.generation||!this.isConnected)return;
      this.rooms=ObservatoryClient.orphans(data);this.loaded=true;
    }catch(error){if(generation===this.generation)this.error=error instanceof Error?tr(error.message):tr("Lecture des carnets impossible.");}
    finally{if(generation===this.generation)this.busy=false;}
  }
  private async act(id:string,remove=false){
    if(!this.hass||this.busy)return;
    const generation=++this.generation;this.busy=true;this.error="";
    try{
      const client=new ObservatoryClient(this.hass),result=await client.request(id,remove?"clear":"get");
      if(generation!==this.generation||!this.isConnected)return;
      if(remove){this.inspected=undefined;this.armed="";this.busy=false;await this.load();
        this.dispatchEvent(new CustomEvent("observatory-recovery",{bubbles:true,composed:true}));}
      else this.inspected={id,room:ObservatoryClient.room(result)};
    }catch(error){if(generation===this.generation)this.error=error instanceof Error?tr(error.message):tr("Opération impossible.");}
    finally{if(generation===this.generation)this.busy=false;}
  }
  render(){return html`<details @toggle=${(event:Event)=>{if((event.currentTarget as HTMLDetailsElement).open&&!this.loaded)void this.load();}}>
    <summary>${tr("Carnets sans diagnostic")}</summary>
    <p>${tr("Retrouver les observations de capteurs supprimés ou renommés. Leur suppression libère une place dans le carnet local (32 pièces maximum).")}</p>
    <button type="button" ?disabled=${this.busy} @click=${this.load}>${this.busy?tr("Lecture…"):tr("Actualiser la liste")}</button>
    ${this.error?html`<p role="alert">${this.error}</p>`:nothing}
    ${this.loaded&&!this.rooms.length?html`<p role="status">${tr("Aucun carnet orphelin.")}</p>`:nothing}
    <ul>${this.rooms.map(r=>html`<li><strong>${r.entity_id}</strong><p>${r.bookmarks} ${tr("souvenir(s)")} · ${r.trials} ${tr("essai(s)")} · ${r.forecasts} ${tr("prévision(s)")} · ${r.receipts} ${tr("reçu(s)")}</p>
      <button type="button" ?disabled=${this.busy} @click=${()=>this.act(r.entity_id)}>${tr("Consulter")}</button>
      ${this.armed===r.entity_id?html`<p>${tr("Effacer définitivement les souvenirs et observations de ce carnet ?")}</p><button type="button" ?disabled=${this.busy} @click=${()=>this.act(r.entity_id,true)}>${tr("Confirmer la suppression")}</button><button type="button" ?disabled=${this.busy} @click=${()=>this.armed=""}>${tr("Annuler")}</button>`:html`<button type="button" ?disabled=${this.busy} @click=${()=>this.armed=r.entity_id}>${tr("Supprimer ce carnet")}</button>`}
      ${this.inspected?.id===r.entity_id?html`<div class="inspection"><h4>${tr("Carnet conservé")}</h4>
        ${this.inspected.room.bookmarks.map(b=>html`<p>${b.label} · ${b.target} ${b.unit} · ${new Date(b.created_at*1000).toLocaleString(locale())}</p>`)}
        ${this.inspected.room.trials.map(t=>html`<p>${t.label} · ${t.target} ${t.unit} · ${t.status}</p>`)}
        ${this.inspected.room.receipts.map(receipt=>html`<p>${tr("Reçu")} · ${new Date(receipt.started_at*1000).toLocaleString(locale())} · ${receipt.choice.value} ${receipt.choice.kind==="temperature"?receipt.unit??tr("unité source"):""} · ${receipt.status} · ${receipt.reason??receipt.service_result}</p>`)}
        ${this.inspected.room.forecasts.map(forecast=>html`<p>${tr("Prévision Twin")} · ${new Date(forecast.started_at*1000).toLocaleString(locale())} · ${tr("cible")} ${forecast.target} ${forecast.unit} · ${tr("meilleur cas annoncé")} ${Math.round(forecast.eta_s/60)} ${tr("min")} · ${forecast.status} · ${forecast.reason??""}</p>`)}
        <p>${this.inspected.room.points?.length??0} ${tr("point(s) d’observation conservé(s). Ce carnet n’est plus lié à un diagnostic actif.")}</p></div>`:nothing}
    </li>`)}</ul></details>`;}
  static styles=css`:host{display:block;margin:20px 0;color:var(--primary-text-color)}details{border-top:1px solid var(--divider-color);padding:10px 0}summary{min-height:44px;line-height:44px;font-size:13px;cursor:pointer}p{font-size:12px;line-height:1.6;color:var(--secondary-text-color)}ul{list-style:none;padding:0}li{border-top:1px solid var(--divider-color);padding:14px 0;overflow-wrap:anywhere;font-size:13px}button{font:inherit;font-size:12px;background:var(--card-background-color);color:inherit;border:1px solid var(--divider-color);border-radius:6px;min-height:44px;padding:8px 12px;margin:4px 8px 4px 0;cursor:pointer}button:focus-visible,summary:focus-visible{outline:3px solid var(--primary-color);outline-offset:3px}button:disabled{opacity:.5}.inspection{padding:8px 0}`;
}
