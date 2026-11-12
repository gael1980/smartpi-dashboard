import {LitElement, html, svg, css, nothing} from "lit";
import {customElement, property, state} from "lit/decorators.js";
import {live} from "lit/directives/live.js";
import {display, type HassLike, type SmartPIDiagnostic} from "../adapter";
import {ThermalJourney, type Choice} from "../utils/thermal-journey";
import {applyClimateChoice, type ClimateConnection} from "../services/climate";
import type {ObservatoryConnection} from "../services/observatory";
import {DecisionPresentation} from "../utils/decision";

@customElement("smartpi-thermal-journey")
export class ThermalJourneyElement extends LitElement {
  @property({attribute: false}) hass?: HassLike & Partial<ClimateConnection> & Partial<ObservatoryConnection>;
  @property({attribute: false}) diagnostic?: SmartPIDiagnostic;
  @state() private choice?: Choice;
  @state() private sending = false;
  @state() private message = "";
  @state() private failed = false;
  @state() private awaitingPublication?: string | null;
  private context = "";
  private generation = 0;
  private activeRequest?: symbol;
  private etaTimer?: ReturnType<typeof setTimeout>;

  protected willUpdate() {
    if (!this.diagnostic) return;
    const next = new ThermalJourney(this.hass, this.diagnostic).context;
    if (next !== this.context) {
      const initial = !this.context;
      this.context = next;
      this.choice = undefined;
      this.message = initial ? "" : this.sending ? "Le thermostat a changé. Vérifiez les valeurs reçues." : "";
      this.failed = false;
      this.awaitingPublication = initial ? undefined : this.diagnostic.lastUpdated;
      ++this.generation;
    }
  }
  protected updated() {
    clearTimeout(this.etaTimer);
    const expires = Date.parse(this.diagnostic?.lastUpdated ?? "") + 600_001 - Date.now();
    if (Number.isFinite(expires) && expires > 0) this.etaTimer = setTimeout(() => this.requestUpdate(), expires);
  }
  disconnectedCallback() { ++this.generation; clearTimeout(this.etaTimer); super.disconnectedCallback(); }
  private choose(choice: Choice) { if (!this.sending) { this.choice = choice; this.message = ""; this.failed = false; } }
  private cancel() { this.choice = undefined; this.message = ""; }
  async previewTemperature(value: number) {
    if (!this.diagnostic || this.sending) return false;
    const choice: Choice = {kind: "temperature", value};
    if (!new ThermalJourney(this.hass, this.diagnostic).validate(choice)) return false;
    this.choose(choice);
    await this.updateComplete;
    this.renderRoot.querySelector<HTMLButtonElement>(".apply")?.focus();
    return true;
  }
  private async apply() {
    if (!this.hass || !this.diagnostic || !this.choice || this.sending) return;
    const generation = ++this.generation, choice = this.choice, context = this.context;
    const request = Symbol(); this.activeRequest = request;
    this.sending = true; this.message = "Envoi en cours…"; this.failed = false;
    try {
      const result = await applyClimateChoice(this.hass, this.diagnostic, choice, context,
        () => this.isConnected && generation === this.generation && !!this.diagnostic && new ThermalJourney(this.hass, this.diagnostic).context === context);
      if (generation !== this.generation || !this.isConnected) return;
      this.awaitingPublication = this.diagnostic.lastUpdated;
      this.choice = undefined;
      this.message = "Demande envoyée. Les valeurs affichées restent celles reçues de Home Assistant." + (result.receipt ? "" : " Reçu non disponible.");
    } catch (error) {
      if (generation !== this.generation || !this.isConnected) return;
      this.failed = true;
      this.message = error instanceof Error ? error.message : "Envoi impossible. Vérifiez le thermostat avant de réessayer.";
    } finally {
      if (this.activeRequest === request) { this.activeRequest = undefined; this.sending = false; }
      this.dispatchEvent(new CustomEvent("observatory-refresh", {detail: {entityId: this.diagnostic?.entityId}, bubbles: true, composed: true}));
    }
  }
  protected render() {
    if (!this.diagnostic) return nothing;
    const model = new ThermalJourney(this.hass, this.diagnostic);
    const decision = new DecisionPresentation(model), advice = decision.advice(this.choice);
    const unit = model.unit ?? "", candidate = model.choiceTemperature(this.choice);
    const [baseLow, baseHigh] = model.scale;
    const low = Math.min(baseLow, candidate ?? baseLow), high = Math.max(baseHigh, candidate ?? baseHigh);
    const x = (n: number) => 60 + (n - low) / (high - low) * 880;
    const current = model.measured, target = model.target;
    const effort = model.appliedEffort(), position = model.setpointPosition();
    const eta = this.awaitingPublication !== undefined && this.awaitingPublication === this.diagnostic.lastUpdated
      ? null : model.eta(!!this.choice);
    const service = typeof this.hass?.callService === "function";
    const selectedPreset = model.presets.find(p => p.id === (this.choice?.kind === "preset" ? this.choice.value : model.attributes.preset_mode));
    const choiceLabel = this.choice?.kind === "preset" ? selectedPreset?.label ?? this.choice.value : "Température manuelle";
    const ticks = Array.from({length: 5}, (_, i) => low + (high - low) * i / 4);
    return html`<section aria-labelledby="journey-title">
      <div class="heading"><h3 id="journey-title">Trajet thermique</h3>
        <span class="mode">${model.available ? model.climate?.state === "off" ? "Thermostat arrêté" : model.attributes.hvac_action === "heating" ? "En chauffe" : model.attributes.hvac_action === "cooling" ? "En refroidissement" : "En direct" : "Thermostat indisponible"}</span></div>
      <div class="readings">
        <div><span class="caption"><i class="dot"></i>Actuellement</span><strong class="measured" aria-label=${current === null ? "Température indisponible" : nothing}>${current === null ? "—" : display(current, "", 1)}<small> ${unit}</small></strong></div>
        <div class="destination"><span class="caption"><i class="diamond"></i>Consigne active</span><strong aria-label=${target === null ? "Consigne indisponible" : nothing}>${target === null ? "—" : display(target, "", 1)}<small> ${model.unit ?? ""}</small></strong>
          <span class="preset-name">${model.presets.find(p => p.id === model.attributes.preset_mode)?.label ?? ""}</span></div>
      </div>
      <div class="effort-band" aria-label="Commande et écart à la consigne active">
        ${effort ? html`
          <div class="effort-heading"><span>${effort.label}</span><strong>${effort.percent > 0 && effort.percent < .01 ? "< 0,01 %" : display(effort.percent, " %", 2)}</strong></div>
          <div class=${"effort-track " + (effort.direction < 0 ? "cool" : effort.direction === 0 ? "neutral" : "heat")}
            role="meter" aria-label=${effort.label + " appliquée"} aria-valuemin="0" aria-valuemax="100" aria-valuenow=${effort.percent} aria-valuetext=${display(effort.percent, " % appliqués", 4)}>
            ${effort.percent > 0 ? html`<span class=${"effort-arrow " + (effort.direction < 0 ? "reverse" : effort.direction === 0 ? "neutral" : "")} style=${`width:${effort.percent}%`} aria-hidden="true"></span>` : nothing}
          </div>` : html`<p class="effort-missing">Commande appliquée · données récentes indisponibles</p>`}
        <div class=${"setpoint-position " + (position?.overshoot ? "overshoot" : "")}>
          ${position?.overshoot ? html`<span class="return-chevron" data-direction=${position.direction < 0 ? "left" : "right"} aria-hidden="true">${position.direction < 0 ? "‹" : "›"}</span>
            <span>${position.kind === "above" ? "Au-dessus de +" : "Au-dessous de −"}${display(position.gap, unit, 1)} · retour visé vers ${display(position.target, unit, 1)}</span>`
            : position?.kind === "aligned" ? html`<span class="aligned-mark" aria-hidden="true">◇</span><span>À la consigne affichée</span>`
            : position ? html`<span>Encore ${display(position.gap, unit, 1)} vers la consigne active</span>`
            : html`<span>Écart à la consigne indisponible</span>`}
        </div>
      </div>
      ${model.unit !== null ? html`<svg class="rail" viewBox="0 0 1000 210" role="img" aria-label=${`Échelle de température. Mesure ${display(current, unit, 1)}. Consigne active ${display(target, unit, 1)}.${this.choice ? ` Aperçu ${display(candidate, unit, 1)}.` : ""}`}>
        <line x1="60" x2="940" y1="95" y2="95" class="axis"/>
        ${model.presets.filter(p => p.temperature !== null).map(p => svg`<line x1=${x(p.temperature!)} x2=${x(p.temperature!)} y1="84" y2="108" class="preset-tick"><title>${p.label} ${display(p.temperature, unit, 1)}</title></line>`)}
        ${current !== null && target !== null ? svg`<line x1=${x(current)} x2=${x(target)} y1="95" y2="95" class="distance"/>` : nothing}
        ${ticks.map(t => svg`<line x1=${x(t)} x2=${x(t)} y1="135" y2="142" class="tick"/><text x=${x(t)} y="171" text-anchor="middle">${display(t, "°", 1)}</text>`)}
        ${current !== null ? svg`<line x1=${x(current)} x2=${x(current)} y1="44" y2="95" class="measured-line"/><circle cx=${x(current)} cy="95" r="11" class="current-point"/><text x=${x(current)} y="30" text-anchor="middle" class="current-label">${display(current, "°", 1)}</text>` : nothing}
        ${target !== null ? svg`<path d=${`M ${x(target)} 83 l 12 12 -12 12 -12 -12 Z`} class="target-point"/>` : nothing}
        ${this.choice && candidate !== null ? svg`<line x1=${x(candidate)} x2=${x(candidate)} y1="56" y2="124" class="preview-line"/><path d=${`M ${x(candidate)} 83 l 12 12 -12 12 -12 -12 Z`} class="preview-point"/>` : nothing}
      </svg>` : nothing}
      ${eta ? html`<div class="eta"><span>ETA · consigne active</span><strong>${eta.label}</strong><span class="eta-detail">${eta.detail}</span></div>` : nothing}
      <details class="authority"><summary>Qui a la main ? <span>${decision.reasons[0]?.label ?? "Origine du réglage non publiée"}</span></summary>
        <p class="note">Demande conservée · ${display(decision.requestedTemperature, unit, 1)}
          · consigne retenue · ${display(target, unit, 1)}</p>
        ${decision.reasons.length ? html`<ul>${decision.reasons.map(reason => html`<li>${reason.label} <small>(${reason.code})</small></li>`)}</ul>`
          : html`<p class="note">Aucun motif de priorité publié dans cet instantané.</p>`}
        <p class="note">Ces motifs décrivent les priorités du thermostat. Ils n’identifient pas la personne ou l’automatisation à l’origine du changement.</p>
      </details>
      <div class="presets" role="group" aria-label="Choisir un preset">
        ${model.presets.map(p => html`<button type="button" class=${"preset " + (model.attributes.preset_mode === p.id ? "active" : "")}
          aria-pressed=${this.choice?.kind === "preset" && this.choice.value === p.id}
          ?disabled=${!service || !model.canSetPreset || this.sending} @click=${() => this.choose({kind: "preset", value: p.id})}>
          <span>${p.label}${model.attributes.preset_mode === p.id ? html`<span class="active-label"> · actif</span>` : nothing}</span>
          <strong>${p.temperature === null ? "—" : display(p.temperature, unit, 1)}</strong></button>`)}
      </div>
      ${model.canSetTemperature ? html`<div class="temperature-control">
        <label for="temperature">Choisir une température <span>${display(candidate ?? target, unit, 1)}</span></label>
        <div class="adjust"><button type="button" aria-label="Diminuer la température" ?disabled=${!service || this.sending || (candidate ?? target!) <= model.minimum!}
          @click=${() => this.choose({kind: "temperature", value: model.shift(candidate ?? target!, -1)})}>−</button>
          <input id="temperature" type="range" min=${model.minimum!} max=${model.maximum!} step=${model.step!}
            .value=${live(String(candidate ?? target))} aria-valuetext=${display(candidate ?? target, unit, 1)} ?disabled=${!service || this.sending}
            @input=${(event: Event) => this.choose({kind: "temperature", value: Number((event.currentTarget as HTMLInputElement).value)})}/>
          <button type="button" aria-label="Augmenter la température" ?disabled=${!service || this.sending || (candidate ?? target!) >= model.maximum!}
            @click=${() => this.choose({kind: "temperature", value: model.shift(candidate ?? target!, 1)})}>+</button></div>
      </div>` : nothing}
      ${this.choice ? html`<div class="preview" aria-label="Aperçu du réglage"><div><span class="caption">Aperçu · ${choiceLabel}</span>
        <strong>${candidate !== null ? display(candidate, unit, 1) : "Température déterminée par le thermostat"}</strong></div>
        <div class="actions"><button type="button" ?disabled=${this.sending} @click=${this.cancel}>Annuler</button>
          <button type="button" class="apply" ?disabled=${this.sending || !model.validate(this.choice)} @click=${this.apply}>${this.sending ? "Envoi…" : "Appliquer"}</button></div></div>` : nothing}
      ${advice.length ? html`<ul class="advice" aria-label="Avant d’appliquer">${advice.map(text => html`<li>${text}</li>`)}</ul>` : nothing}
      <p class=${"status " + (this.failed ? "error" : "")} role="status" aria-live="polite">${this.message}</p>
      ${model.locked ? html`<p class="note">Thermostat verrouillé.</p>` : nothing}
      ${!model.climate ? html`<p class="note">Aucun thermostat explicitement lié à ce diagnostic.</p>` : nothing}
      ${model.filtered !== null && target !== null && Math.abs(model.filtered - target) > 0.01 ? html`<p class="note">Consigne filtrée de la régulation : ${display(model.filtered, unit, 1)}</p>` : nothing}
      <p class="note scheduling">Les plannings restent gérés par ha-chauffage ou Scheduler.</p>
    </section>`;
  }
  static styles = css`
    :host{display:block;margin-top:22px;--measured:#167883;--target:#a75b19;--effort:#955016;--return:#245e8b;color:var(--primary-text-color,#192b31)}
    *{box-sizing:border-box}section{border-top:1px solid var(--divider-color,#ddd);padding-top:20px}
    .heading{display:flex;justify-content:space-between;align-items:center;gap:12px}h3{margin:0;font-size:16px}.mode,.caption,.note{font-size:12px;color:var(--secondary-text-color,#526268)}
    .readings{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:22px}.readings>div{display:flex;flex-direction:column;gap:5px}.destination{text-align:right;align-items:flex-end}
    .caption{display:flex;gap:7px;align-items:center}.readings strong{font-size:36px;font-weight:500;font-variant-numeric:tabular-nums;line-height:1.2}.readings .measured{font-size:46px;color:var(--measured)}small{font-size:16px;font-weight:400}.preset-name{font-size:13px;color:var(--target);min-height:16px}
    .dot,.diamond{display:inline-block;width:8px;height:8px;flex:none}.dot{border-radius:50%;background:var(--measured)}.diamond{border:2px solid var(--target);transform:rotate(45deg)}
    .effort-band{margin:20px 0 0;min-width:0}.effort-heading{display:flex;justify-content:space-between;gap:12px;font-size:12px;line-height:1.5}.effort-heading strong{font-size:14px;font-weight:600;font-variant-numeric:tabular-nums;white-space:nowrap}.effort-track{height:16px;margin-top:5px;position:relative;color:var(--effort)}.effort-track:before{content:"";position:absolute;left:0;right:0;top:7px;height:2px;background:var(--divider-color,#c8d1d3)}.effort-track.cool{color:var(--return)}.effort-track.neutral{color:var(--secondary-text-color,#526268)}.effort-arrow{position:relative;display:block;height:16px;background:currentColor;clip-path:polygon(0 30%,calc(100% - min(10px,50%)) 30%,calc(100% - min(10px,50%)) 0,100% 50%,calc(100% - min(10px,50%)) 100%,calc(100% - min(10px,50%)) 70%,0 70%)}.effort-arrow.reverse{margin-left:auto;transform:scaleX(-1)}.effort-arrow.neutral{clip-path:none;height:6px;top:5px}.effort-missing{margin:0;min-height:42px;font-size:12px;color:var(--secondary-text-color,#526268)}.setpoint-position{display:flex;align-items:center;gap:8px;min-height:30px;font-size:12px;line-height:1.5;color:var(--secondary-text-color,#526268);overflow-wrap:anywhere}.setpoint-position.overshoot{color:var(--return)}.return-chevron{font-size:32px;line-height:24px;font-weight:600;flex:none}.aligned-mark{font-size:20px;line-height:24px;flex:none}
    .rail{display:block;width:100%;height:auto;max-height:180px;overflow:visible;margin:12px 0 0}.axis{stroke:var(--divider-color,#c8d1d3);stroke-width:5;stroke-linecap:round}.distance{stroke:var(--measured);stroke-width:6;stroke-linecap:round}.tick{stroke:var(--secondary-text-color,#526268);stroke-width:1}.preset-tick{stroke:var(--secondary-text-color,#526268);stroke-width:2}
    svg text{font-family:inherit;font-size:22px;fill:var(--secondary-text-color,#526268)}svg .current-label{fill:var(--measured);font-weight:600}.measured-line{stroke:var(--measured);stroke-width:2}.current-point{fill:var(--measured);stroke:var(--card-background-color,#fff);stroke-width:3}.target-point{fill:var(--card-background-color,#fff);stroke:var(--target);stroke-width:4}.preview-line{stroke:var(--target);stroke-width:2;stroke-dasharray:5 5}.preview-point{fill:var(--target);stroke:var(--card-background-color,#fff);stroke-width:3}
    .eta{display:flex;align-items:baseline;flex-wrap:wrap;gap:6px 12px;border-inline-start:3px solid var(--measured);padding:4px 12px;margin:0 0 18px;font-size:12px}.eta strong{font-size:22px;font-weight:500}.eta-detail{flex-basis:100%;color:var(--secondary-text-color,#526268);line-height:1.5}
    .presets{display:flex;flex-wrap:wrap;gap:8px}button{font:inherit;color:inherit;cursor:pointer;background:var(--card-background-color,#fff);border:1px solid var(--divider-color,#b5c0c4);border-radius:9px;min-height:44px;padding:9px 13px}button:focus-visible,input:focus-visible{outline:3px solid var(--primary-color,#167883);outline-offset:3px}button:disabled{opacity:.5;cursor:default}button:not(:disabled):hover{border-color:var(--measured)}
    .preset{display:flex;flex:1 1 100px;min-width:0;flex-direction:column;gap:5px;text-align:left;font-size:13px;overflow-wrap:anywhere}.preset strong{font-weight:500;font-size:17px}.preset.active{border-bottom:3px solid var(--target)}.active-label{font-size:11px;color:var(--secondary-text-color,#526268)}.preset[aria-pressed=true]{outline:2px dashed var(--target);outline-offset:2px}
    .temperature-control{margin-top:22px}label{font-size:13px;display:flex;justify-content:space-between;gap:12px}label span{font-weight:600}.adjust{display:flex;gap:14px;align-items:center;margin-top:10px}.adjust button{width:44px;flex:none;font-size:22px;padding:0}input{width:100%;min-width:0;min-height:44px;accent-color:var(--measured);cursor:pointer}
    .authority{margin:0 0 18px;font-size:13px}.authority summary{cursor:pointer;min-height:44px;padding:12px 0}.authority summary span{color:var(--secondary-text-color,#526268);margin-left:8px}.authority ul,.advice{line-height:1.6;padding-left:20px;font-size:13px;overflow-wrap:anywhere}.authority small{font-size:11px}.advice{border-inline-start:3px solid var(--target);list-style:none;padding:4px 12px}
    .preview{display:flex;gap:16px;justify-content:space-between;align-items:center;margin-top:16px;padding:14px 0;border-top:1px dashed var(--target)}.preview strong{display:block;font-size:22px;margin-top:4px}.actions{display:flex;gap:8px}.apply{background:var(--measured);color:#fff;border-color:var(--measured)}.status{font-size:13px;line-height:1.5}.status:empty{display:none}.error{color:var(--error-color,#b31e18)}.note{line-height:1.5;margin:10px 0 0}.scheduling{margin-top:16px}
    @media(max-width:520px){.readings .measured{font-size:38px}.readings strong{font-size:30px}.rail{margin-top:18px}.preview{align-items:stretch;flex-direction:column}.actions button{flex:1}.preset{flex-basis:90px}svg text{font-size:40px}}
    @media(prefers-color-scheme:dark){:host{--measured:#6dcbd2;--target:#efaf6e;--effort:#efaf6e;--return:#9fc9ef}.apply{background:#23666d;border-color:#6dcbd2}}
  `;
}
