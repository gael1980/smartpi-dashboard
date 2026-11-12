import {LitElement, html, css, nothing} from "lit";
import {customElement, property, state} from "lit/decorators.js";
import {display, num, type HassLike, type Rec, type SmartPIDiagnostic} from "../adapter";
import {ThermalJourney} from "../utils/thermal-journey";
import {ObservatoryClient, type ObservatoryConnection, type ObservatoryAction, type ObservatoryRoom, type Trial} from "../services/observatory";

const date = (value: unknown) => {const n = num(value); return n === null ? "Non observé" : new Date(n * 1000).toLocaleString("fr-FR");};
const duration = (value: unknown) => {const n = num(value); return n === null ? "—" : `${Math.round(n / 60)} min`;};
const status: Record<string, string> = {pending: "Observation en cours", observed: "Évolution observée", excluded: "Interrompu", finished: "Terminé", reached: "Atteinte observée"};
const feedback: Record<string, string> = {unknown: "Non renseigné", good: "J’étais bien", cold: "J’avais froid", hot: "J’avais chaud"};

@customElement("smartpi-observatory")
export class ObservatoryElement extends LitElement {
  @property({attribute: false}) hass?: HassLike & Partial<ObservatoryConnection>;
  @property({attribute: false}) diagnostic?: SmartPIDiagnostic;
  @state() private tab = "receipts";
  @state() private room?: ObservatoryRoom;
  @state() private loading = false;
  @state() private saving = false;
  @state() private error = "";
  @state() private message = "";
  @state() private eraseArmed = false;
  @state() private comparison: string[] = [];
  private entity = "";
  private signature = "";
  private generation = 0;
  private timer?: ReturnType<typeof setTimeout>;

  protected updated() {
    const id = this.diagnostic?.entityId ?? "";
    if (id !== this.entity) {
      ++this.generation; clearTimeout(this.timer); this.entity = id;
      this.room = undefined; this.comparison = []; this.eraseArmed = false; this.error = ""; this.message = ""; this.saving = false;
      void this.refresh();
    }
    const climateTime = this.diagnostic?.climateId ? this.hass?.states[this.diagnostic.climateId]?.last_updated : "";
    const signature = `${id}/${this.diagnostic?.lastUpdated}/${climateTime}`;
    if (signature !== this.signature) {
      this.signature = signature;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {if (!this.saving) void this.refresh();}, 500);
    }
  }
  connectedCallback() {super.connectedCallback(); if (this.hasUpdated) void this.refresh();}
  disconnectedCallback() {
    ++this.generation; clearTimeout(this.timer);
    this.saving = false; this.loading = false; this.message = ""; this.eraseArmed = false;
    super.disconnectedCallback();
  }
  async refresh() {
    if (!this.hass || !this.entity || this.saving) return;
    const generation = ++this.generation, id = this.entity;
    this.loading = !this.room;
    try {
      const data = await new ObservatoryClient(this.hass).request(id, "get");
      if (generation !== this.generation || !this.isConnected) return;
      this.room = ObservatoryClient.room(data); this.error = "";
    } catch (error) {
      if (generation === this.generation) this.error = error instanceof Error ? error.message : "Lecture de l’observatoire refusée. Vérifiez les droits administrateur et le composant.";
    } finally {if (generation === this.generation) this.loading = false;}
  }
  private async mutate(action: ObservatoryAction, payload: Rec = {}) {
    if (!this.hass || !this.entity || this.saving) return;
    const id = this.entity, generation = ++this.generation;
    this.saving = true; this.message = "Enregistrement local…"; this.error = "";
    try {
      const client = new ObservatoryClient(this.hass);
      let result = await client.request(id, action, payload);
      if (action === "clear") result = await client.request(id, "get");
      if (generation !== this.generation || !this.isConnected) return;
      this.room = ObservatoryClient.room(result); this.message = action === "clear" ? "Les données de cette pièce ont été effacées." : "Enregistré localement dans Home Assistant.";
      this.eraseArmed = false;
    } catch (error) {
      if (generation === this.generation) {this.error = error instanceof Error ? error.message : "Enregistrement refusé ou impossible."; this.message = "";}
    } finally {if (generation === this.generation) this.saving = false;}
  }
  private submit(event: Event, action: "bookmark_save" | "trial_start") {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const input = form.elements.namedItem("label") as HTMLInputElement;
    void this.mutate(action, {label: input.value});
  }
  private toggleComparison(id: string) {
    this.comparison = this.comparison.includes(id) ? this.comparison.filter(v => v !== id) : [...this.comparison.slice(-1), id];
  }
  private trialMetrics(trial: Trial) {
    const s = trial.summary;
    return html`<dl class="metrics">
      <div><dt>Consigne</dt><dd>${display(trial.target, trial.unit, 1)}</dd></div>
      <div><dt>Mesure au départ</dt><dd>${display(trial.baseline, trial.unit, 1)}</dd></div>
      <div><dt>Plage observée</dt><dd>${display(s.minimum, "", 1)} → ${display(s.maximum, trial.unit, 1)}</dd></div>
      <div><dt>Dernière mesure</dt><dd>${display(s.last, trial.unit, 1)}</dd></div>
      <div><dt>Écart absolu maximal observé</dt><dd>${display(s.max_abs_error, trial.unit, 2)}</dd></div>
      <div><dt>Publications retenues / manquantes</dt><dd>${s.publications} / ${trial.missing_publications ?? 0}</dd></div>
      <div><dt>Extérieur observé</dt><dd>${display(s.outdoor_min, "", 1)} → ${display(s.outdoor_max, trial.unit, 1)}</dd></div>
      <div><dt>Première / dernière publication</dt><dd>${date(s.first_at)} · ${date(s.last_at)}</dd></div>
    </dl>`;
  }
  protected render() {
    const d = this.diagnostic;
    if (!d) return nothing;
    const model = new ThermalJourney(this.hass, d), room = this.room;
    const disabled = this.saving || !room;
    const selected = room?.trials.filter(t => this.comparison.includes(t.id)) ?? [];
    return html`<section aria-labelledby="observatory-title" aria-busy=${this.loading || this.saving}>
      <div class="heading"><div><h2 id="observatory-title">Mon observatoire</h2><p class="muted">${d.name} · souvenirs et observations conservés dans Home Assistant</p></div>
        <button type="button" class="refresh" ?disabled=${this.loading || this.saving} @click=${this.refresh}>Actualiser</button></div>
      <nav class="tabs" aria-label="Vues de l’observatoire">${[["receipts", "Reçus de chauffe"], ["bookmarks", "Souvenirs"], ["trials", "Mes essais"], ["forecasts", "Carnet du Twin"]].map(([id, label]) => html`<button type="button" data-view=${id} aria-pressed=${this.tab === id} @click=${() => {this.tab = id; this.message = "";}}>${label}</button>`)}</nav>
      <p class="status" role="status" aria-live="polite">${this.loading ? "Lecture du carnet local…" : this.message}</p>
      ${this.error ? html`<p class="error" role="alert">${this.error}</p>` : nothing}
      ${room ? html`
        ${this.tab === "receipts" ? html`<p class="intro">De la demande au retour mesuré, chaque étape garde sa propre preuve.</p>
          ${!room.receipts.length ? html`<p class="empty">Vos prochains changements effectués depuis ce panneau apparaîtront ici.</p>` : html`<ol class="entries">${[...room.receipts].reverse().map(r => html`<li>
            <div class="row"><strong>${r.choice.kind === "temperature" ? html`Demande de ${display(r.choice.value, r.unit ?? "", 1)}` : html`Preset demandé · ${r.choice.value}`}</strong><span class="badge">${status[r.status] ?? r.status}</span></div>
            <p class="muted">${date(r.started_at)}</p>
            <ol class="receipt-stages">
              <li><strong>Service</strong><span>${r.service_result === "accepted" ? "Retour accepté" : r.service_result === "uncertain" ? "Retour incertain" : "En attente du retour"}</span></li>
              <li><strong>Consigne HA</strong><span>${r.confirmed_at === null ? "Non confirmée" : date(r.confirmed_at)}</span></li>
              <li><strong>Commande publiée</strong><span>${r.applied_at === undefined ? "Non observée" : html`${display(r.applied_percent, " %", 1)} · ${date(r.applied_at)}`}</span></li>
              <li><strong>Température</strong><span>${r.response_at === undefined ? "Évolution non observée" : html`${display(r.response_temperature, r.unit ?? "", 1)} · ${date(r.response_at)}`}</span></li>
            </ol>
            ${r.reason ? html`<p class="muted">${r.reason}</p>` : nothing}
            <button type="button" class="quiet" ?disabled=${disabled} @click=${() => this.mutate("receipt_delete", {id: r.id})}>Supprimer ce reçu</button>
          </li>`)}</ol>`}
          <p class="foot">Un retour de service ne prouve pas une chauffe physique. L’évolution de température est une observation ; son attribution au chauffage n’est pas démontrée.</p>` : nothing}
        ${this.tab === "bookmarks" ? html`<p class="intro">Gardez le souvenir d’un moment où vous étiez bien, avec ses conditions.</p>
          <form @submit=${(event: Event) => this.submit(event, "bookmark_save")}><label for="bookmark-name">Nom du souvenir</label><div class="form-row"><input id="bookmark-name" name="label" maxlength="100" required placeholder="Lecture, canapé…" ?disabled=${disabled}><button type="submit" ?disabled=${disabled || !model.available}>Là, je suis bien</button></div></form>
          ${!room.bookmarks.length ? html`<p class="empty">Aucun souvenir dans cette pièce.</p>` : html`<ul class="entries">${[...room.bookmarks].reverse().map(b => html`<li><div class="row"><strong>${b.label}</strong><span class="muted">${date(b.created_at)}</span></div>
            <div class="memory-values"><span>Mesure <strong>${display(b.temperature, b.unit, 1)}</strong></span><span>Consigne <strong>${display(b.target, b.unit, 1)}</strong></span><span>Extérieur <strong>${display(b.outdoor, b.unit, 1)}</strong></span></div>
            <p class="muted">Preset ce jour-là · ${b.preset ?? "Non publié"} · aujourd’hui ${display(model.measured, model.unit ?? "", 1)}, extérieur ${display(d.live.temperature && (d.live.temperature as Rec).outdoor, model.unit ?? "", 1)}</p>
            <div class="actions"><button type="button" ?disabled=${this.saving || b.unit !== model.unit || !model.validate({kind: "temperature", value: b.target})} @click=${() => this.dispatchEvent(new CustomEvent("prepare-temperature", {detail: {entityId: d.entityId, value: b.target}, bubbles: true, composed: true}))}>Préparer ${display(b.target, b.unit, 1)}</button>
              <button type="button" class="quiet" ?disabled=${disabled} @click=${() => this.mutate("bookmark_delete", {id: b.id})}>Supprimer</button></div>
          </li>`)}</ul>`}<p class="foot">Préparer ouvre un aperçu à valider. Une même température ne garantit pas le même ressenti.</p>` : nothing}
        ${this.tab === "trials" ? html`<p class="intro">Observez un réglage déjà actif, puis notez votre ressenti. Démarrer un essai ne change aucune consigne.</p>
          <form @submit=${(event: Event) => this.submit(event, "trial_start")}><label for="trial-name">Nom de l’essai</label><div class="form-row"><input id="trial-name" name="label" maxlength="100" required placeholder="Mon réglage de soirée…" ?disabled=${disabled}><button type="submit" ?disabled=${disabled || !model.available || room.trials.some(t => t.status === "pending")}>Observer ce réglage</button></div></form>
          ${!room.trials.length ? html`<p class="empty">Aucun essai enregistré.</p>` : html`<ul class="entries">${[...room.trials].reverse().map(t => html`<li><div class="row"><strong>${t.label}</strong><span class="badge">${status[t.status] ?? t.status}</span></div>
            <p class="muted">${date(t.started_at)}${t.ended_at ? html` → ${date(t.ended_at)}` : nothing} · ${t.reason ?? "Collecte des prochaines publications"}</p>
            ${this.trialMetrics(t)}
            <div class="actions"><label class="compare"><input type="checkbox" .checked=${this.comparison.includes(t.id)} @change=${() => this.toggleComparison(t.id)}>Comparer</label>
              <label>Ressenti <select aria-label=${`Ressenti pour ${t.label}`} .value=${t.feedback} ?disabled=${disabled} @change=${(event: Event) => this.mutate("trial_feedback", {id: t.id, feedback: (event.currentTarget as HTMLSelectElement).value})}>${Object.entries(feedback).map(([value, label]) => html`<option value=${value}>${label}</option>`)}</select></label>
              ${t.status === "pending" ? html`<button type="button" ?disabled=${disabled} @click=${() => this.mutate("trial_stop", {id: t.id})}>Terminer l’essai</button>` : nothing}
              <button type="button" class="quiet" ?disabled=${disabled} @click=${() => this.mutate("trial_delete", {id: t.id})}>Supprimer</button></div>
          </li>`)}</ul>`}
          ${selected.length === 2 ? html`<section class="comparison"><h3>Deux observations côte à côte</h3>
            ${selected[0].unit !== selected[1].unit ? html`<p>Unités différentes : comparaison numérique désactivée.</p>` : html`<div class="table-wrap"><table><thead><tr><th>Observation</th>${selected.map(t => html`<th>${t.label}</th>`)}</tr></thead><tbody>
              <tr><th>Consigne</th>${selected.map(t => html`<td>${display(t.target, t.unit, 1)}</td>`)}</tr>
              <tr><th>Plage mesurée</th>${selected.map(t => html`<td>${display(t.summary.minimum, "", 1)} → ${display(t.summary.maximum, t.unit, 1)}</td>`)}</tr>
              <tr><th>Extérieur au départ</th>${selected.map(t => html`<td>${display(t.outdoor, t.unit, 1)}</td>`)}</tr>
              <tr><th>Publications</th>${selected.map(t => html`<td>${t.summary.publications}</td>`)}</tr>
              <tr><th>Ressenti déclaré</th>${selected.map(t => html`<td>${feedback[t.feedback] ?? t.feedback}</td>`)}</tr>
            </tbody></table></div>`}
            <p class="foot">Conditions et durées peuvent différer. Ces observations ne prouvent pas qu’un réglage a causé un résultat ni une économie.</p></section>` : nothing}` : nothing}
        ${this.tab === "forecasts" ? html`<p class="intro">Les prévisions sont conservées à leur émission, puis confrontées aux publications suivantes.</p>
          <p class="counts">${room.forecasts.filter(f => f.status === "reached").length} atteinte(s) observée(s) · ${room.forecasts.filter(f => f.status === "excluded").length} épisode(s) interrompu(s) · ${room.forecasts.filter(f => f.status === "pending").length} en cours</p>
          ${!room.forecasts.length ? html`<p class="empty">La collecte commencera avec les prochains ETA éligibles publiés par le Twin. Aucun passé n’est reconstruit.</p>` : html`<ul class="entries">${[...room.forecasts].reverse().map(f => html`<li><div class="row"><strong>${display(f.temperature, "", 1)} → ${display(f.target, f.unit, 1)}</strong><span class="badge">${status[f.status] ?? f.status}</span></div>
            <p class="muted">Prévision publiée le ${date(f.started_at)}</p><div class="memory-values"><span>Meilleur cas annoncé <strong>${duration(f.eta_s)}</strong></span>
              ${f.status === "reached" ? html`<span>Atteinte observée après <strong>${duration(f.observed_s)}</strong></span><span>Écart au meilleur cas <strong>${duration((f.observed_s ?? 0) - f.eta_s)}</strong></span>` : nothing}</div>
            <p class="muted">${f.status === "reached" ? html`Première publication d’atteinte : ${date(f.observed_at)}` : f.reason}</p>
            <button type="button" class="quiet" ?disabled=${disabled} @click=${() => this.mutate("forecast_delete", {id: f.id})}>Supprimer cette observation</button>
          </li>`)}</ul>`}
          <p class="foot">Le meilleur cas n’est pas la trajectoire réelle du PI. L’atteinte est datée à la première publication qui la confirme. Les épisodes interrompus ne comptent pas comme des réussites.</p>` : nothing}
      ` : nothing}
      <details class="storage"><summary>Conservation et suppression</summary><p class="foot">Collecte locale même panneau fermé : 48 h de points récents, 30 jours d’épisodes, au plus 50 reçus, 50 essais et 100 prévisions par pièce. Les 30 souvenirs maximum restent jusqu’à suppression. Les interruptions ne sont pas comblées.</p>
        ${this.eraseArmed ? html`<p>Effacer les souvenirs et tous les épisodes de cette pièce ?</p><div class="actions"><button type="button" ?disabled=${disabled} @click=${() => this.mutate("clear")}>Confirmer l’effacement</button><button type="button" @click=${() => this.eraseArmed = false}>Annuler</button></div>` : html`<button type="button" ?disabled=${disabled} @click=${() => this.eraseArmed = true}>Effacer les données de cette pièce</button>`}</details>
    </section>`;
  }
  static styles = css`
    :host{display:block;margin:20px 0;color:var(--primary-text-color,#192b31)}*{box-sizing:border-box}section{min-width:0}h2{font-size:20px;margin:0}h3{font-size:16px}p{font-size:13px;line-height:1.55}.heading,.row{display:flex;justify-content:space-between;align-items:center;gap:12px}.heading{margin-bottom:12px}.heading p{margin:6px 0 0}.muted,.foot{color:var(--secondary-text-color,#526268)}.muted,.foot,.counts{font-size:12px}.tabs{display:flex;flex-wrap:wrap;gap:7px;border-bottom:1px solid var(--divider-color,#d2dbdd);padding-bottom:12px}.tabs button[aria-pressed=true]{border-color:var(--primary-color,#167883);box-shadow:inset 0 -3px var(--primary-color,#167883)}
    button,input,select{font:inherit;color:inherit;border:1px solid var(--divider-color,#b5c0c4);background:var(--card-background-color,#fff);border-radius:8px;min-height:44px;padding:9px 12px;font-size:13px}button{cursor:pointer}button:disabled{opacity:.5;cursor:default}button:focus-visible,input:focus-visible,select:focus-visible,summary:focus-visible{outline:3px solid var(--primary-color,#167883);outline-offset:3px}.quiet{background:transparent;font-size:12px}.status:empty{display:none}.error{color:var(--error-color,#b31e18)}.entries{list-style:none;padding:0;margin:16px 0}.entries>li{padding:18px 0;border-top:1px solid var(--divider-color,#d2dbdd);overflow-wrap:anywhere}.badge{border:1px solid var(--divider-color,#d2dbdd);padding:5px 8px;border-radius:20px;font-size:11px}.receipt-stages{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;list-style:none;padding:0}.receipt-stages li{border-inline-start:2px solid var(--primary-color,#167883);padding-left:10px;display:flex;flex-direction:column;gap:7px;font-size:12px}.receipt-stages strong{font-size:12px}.receipt-stages span{color:var(--secondary-text-color,#526268)}
    form{margin:18px 0}label{font-size:13px;display:block}.form-row{display:flex;gap:8px;margin-top:7px}.form-row input{flex:1;min-width:0}.actions{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:12px}.compare{display:flex;align-items:center;gap:7px;min-height:44px}.compare input{min-height:24px;width:24px;height:24px;accent-color:var(--primary-color,#167883)}.memory-values{display:flex;flex-wrap:wrap;gap:14px 28px;font-size:12px}.memory-values strong{display:block;font-size:19px;margin-top:5px;font-weight:500}.metrics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;font-size:12px}dt{color:var(--secondary-text-color,#526268)}dd{margin:5px 0 0;font-size:14px}.table-wrap{overflow:auto;max-width:100%}table{border-collapse:collapse;min-width:100%;font-size:13px}th,td{text-align:left;padding:10px;border-bottom:1px solid var(--divider-color,#d2dbdd);overflow-wrap:anywhere}.storage{border-top:1px solid var(--divider-color,#d2dbdd);margin-top:18px;padding-top:4px}.storage summary{cursor:pointer;min-height:44px;padding:14px 0;font-size:12px}.empty{padding:20px 0;color:var(--secondary-text-color,#526268)}
    @media(max-width:600px){.receipt-stages{grid-template-columns:repeat(2,minmax(0,1fr))}.heading{align-items:flex-start}.refresh{font-size:12px}.form-row{flex-direction:column}.row{align-items:flex-start;flex-wrap:wrap}.metrics{grid-template-columns:1fr}.tabs button{flex:1 1 125px}.memory-values{gap:14px}}
  `;
}
