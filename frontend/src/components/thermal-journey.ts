import {LitElement, html, svg, css, nothing} from "lit";
import {customElement, property, state} from "lit/decorators.js";
import {live} from "lit/directives/live.js";
import {display, type HassLike, type SmartPIDiagnostic} from "../adapter";
import {ThermalJourney, type Choice} from "../utils/thermal-journey";
import {applyClimateChoice, type ClimateConnection} from "../services/climate";
import type {ObservatoryConnection} from "../services/observatory";
import {DecisionPresentation} from "../utils/decision";
import {tr} from "../i18n";

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
  private diagnosticId = "";
  private generation = 0;
  private activeRequest?: symbol;
  private etaTimer?: ReturnType<typeof setTimeout>;

  protected willUpdate() {
    if (!this.diagnostic) return;
    const next = new ThermalJourney(this.hass, this.diagnostic).context;
    if (next !== this.context) {
      const initial = !this.context || this.diagnosticId !== this.diagnostic.entityId;
      this.diagnosticId = this.diagnostic.entityId;
      this.context = next;
      this.choice = undefined;
      this.message = initial ? "" : this.sending ? tr("Le thermostat a changé. Vérifiez les valeurs reçues.") : "";
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
  disconnectedCallback() {
    ++this.generation;
    clearTimeout(this.etaTimer);
    this.choice = undefined;
    if (this.sending) {
      this.sending = false;
      this.activeRequest = undefined;
      this.failed = true;
      this.message = tr("Résultat non confirmé après la fermeture du panneau. Vérifiez les valeurs reçues avant un nouveau choix.");
      this.awaitingPublication = this.diagnostic?.lastUpdated;
    }
    super.disconnectedCallback();
  }
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
    this.sending = true; this.message = tr("Envoi en cours…"); this.failed = false;
    try {
      const result = await applyClimateChoice(this.hass, this.diagnostic, choice, context,
        () => this.isConnected && generation === this.generation && !!this.diagnostic && new ThermalJourney(this.hass, this.diagnostic).context === context);
      if (generation !== this.generation || !this.isConnected) return;
      this.awaitingPublication = this.diagnostic.lastUpdated;
      this.choice = undefined;
      this.message = tr("Demande envoyée. Les valeurs affichées restent celles reçues de Home Assistant.") + (result.receipt ? "" : tr(" Reçu non disponible."));
    } catch (error) {
      if (generation !== this.generation || !this.isConnected) return;
      this.failed = true;
      this.message = error instanceof Error ? tr(error.message) : tr("Envoi impossible. Vérifiez le thermostat avant de réessayer.");
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
    const effort = model.appliedEffort(), position = model.setpointPosition(), maintenance = model.maintenanceEffort();
    const twin = model.twinPresentation(!!this.choice, this.awaitingPublication !== undefined && this.awaitingPublication === this.diagnostic.lastUpdated);
    const eta = twin.eta;
    const service = typeof this.hass?.callService === "function";
    const selectedPreset = model.presets.find(p => p.id === (this.choice?.kind === "preset" ? this.choice.value : model.attributes.preset_mode));
    const choiceLabel = this.choice?.kind === "preset" ? selectedPreset?.label ?? this.choice.value : tr("Température manuelle");
    const ticks = Array.from({length: 5}, (_, i) => low + (high - low) * i / 4);
    return html`<section aria-labelledby="journey-title">
      <div class="heading"><h3 id="journey-title">${tr("Trajet thermique")}</h3>
        <span class="mode">${model.available ? model.climate?.state === "off" ? tr("Thermostat arrêté") : model.attributes.hvac_action === "heating" ? tr("En chauffe") : model.attributes.hvac_action === "cooling" ? tr("En refroidissement") : tr("En direct") : tr("Thermostat indisponible")}</span></div>
      <div class="readings">
        <div><span class="caption"><i class="dot"></i>${tr("Actuellement")}</span><strong class="measured" aria-label=${current === null ? tr("Température indisponible") : nothing}>${current === null ? "—" : display(current, "", 1)}<small> ${unit}</small></strong></div>
        <div class="destination"><span class="caption"><i class="diamond"></i>${tr("Consigne active")}</span><strong aria-label=${target === null ? tr("Consigne indisponible") : nothing}>${target === null ? "—" : display(target, "", 1)}<small> ${model.unit ?? ""}</small></strong>
          <span class="preset-name">${model.presets.find(p => p.id === model.attributes.preset_mode)?.label ?? ""}</span></div>
      </div>
      <div class="journey-signals">
      <div class="effort-band" aria-label="${tr("Commande et écart à la consigne active")}">
        <span class="signal-caption">${tr("RÉGULATION · COMMANDE")}</span>
        ${effort ? html`
          <div class="effort-heading"><span>${effort.label}</span><strong>${effort.percent > 0 && effort.percent < .01 ? "< 0,01 %" : display(effort.percent, " %", 2)}</strong></div>
          <div class=${"effort-track " + (effort.direction < 0 ? "cool" : effort.direction === 0 ? "neutral" : "heat")}
            role="meter" aria-label=${effort.label + tr(" appliquée")} aria-valuemin="0" aria-valuemax="100" aria-valuenow=${effort.percent} aria-valuetext=${display(effort.percent, tr(" % appliqués"), 4)}>
            ${effort.percent > 0 ? html`<span class=${"effort-arrow " + (effort.direction < 0 ? "reverse" : effort.direction === 0 ? "neutral" : "")} style=${`width:${effort.percent}%`} aria-hidden="true"></span>` : nothing}
          </div>` : html`<p class="effort-missing">${tr("Commande appliquée · données récentes indisponibles")}</p>`}
        ${maintenance ? html`<div class="maintenance"><strong>${tr("Chauffe de maintien")}</strong><span class="maintenance-caption">${tr("Le FF compense les pertes · le PI ajuste")}</span>
          <div class="contributions"><span>FF <b>+${display(maintenance.ff, " %", 1)}</b></span><span>PI <b>${display(maintenance.pi, " %", 1)}</b></span></div>
          <p>${tr("La commande entretient la chaleur pour maintenir la consigne. Elle n’indique pas une montée en température mesurée.")}</p></div>` : nothing}
        <div class=${"setpoint-position " + (position?.overshoot ? "overshoot" : "")}>
          ${position?.overshoot ? html`<span class="return-chevron" data-direction=${position.direction < 0 ? "left" : "right"} aria-hidden="true">${position.direction < 0 ? "‹" : "›"}</span>
            <span>${position.kind === "above" ? tr("Au-dessus de +") : tr("Au-dessous de −")}${display(position.gap, unit, 1)} · ${tr("retour visé vers")} ${display(position.target, unit, 1)}</span>`
            : position?.kind === "aligned" ? html`<span class="aligned-mark" aria-hidden="true">◇</span><span>${tr("À la consigne affichée")}</span>`
            : position ? html`<span>${tr("Encore")} ${display(position.gap, unit, 1)} ${tr("vers la consigne active")}</span>`
            : html`<span>${tr("Écart à la consigne indisponible")}</span>`}
        </div>
      </div>
      <div class="twin-signal" aria-label="${tr("Projection du Thermal Twin")}">
        <div class="twin-heading"><span class="signal-caption">${tr("THERMAL TWIN · MODÈLE")}</span><span class="twin-badge">${twin.predicted !== null ? tr("Projection disponible") : tr("En attente")}</span></div>
        ${twin.predicted !== null ? html`<div class="twin-values">
          <div><span>${tr("État estimé")}</span><strong>${display(twin.estimated, unit, 2)}</strong></div>
          ${twin.estimated !== null ? html`<svg class="twin-arrow" viewBox="0 0 100 24" aria-hidden="true"><path d="M2 12 H94 M86 5 L94 12 L86 19"/></svg>` : nothing}
          <div><span>${tr("Prédiction publiée")}</span><strong>${display(twin.predicted, unit, 2)}</strong></div>
        </div><p class="twin-footnote">${tr("Sorties du même pas de calcul · horizon non publié")}</p>` : nothing}
        <div class=${"twin-eta " + (eta ? "eta available" : "")}><span>${tr("ETA · consigne active")}</span><strong>${eta?.label ?? tr("Non calculable")}</strong></div>
        <p class="eta-detail">${twin.detail}</p>
      </div>
      </div>
      ${model.unit !== null ? html`<svg class="rail" viewBox="0 0 1000 210" role="img" aria-label=${tr("Échelle de température. Mesure {0}. Consigne active {1}.{2}", display(current, unit, 1), display(target, unit, 1), this.choice ? tr(" Aperçu {0}.", display(candidate, unit, 1)) : "")}>
        <line x1="60" x2="940" y1="95" y2="95" class="axis"/>
        ${model.presets.filter(p => p.temperature !== null).map(p => svg`<line x1=${x(p.temperature!)} x2=${x(p.temperature!)} y1="84" y2="108" class="preset-tick"><title>${p.label} ${display(p.temperature, unit, 1)}</title></line>`)}
        ${current !== null && target !== null ? svg`<line x1=${x(current)} x2=${x(target)} y1="95" y2="95" class="distance"/>` : nothing}
        ${ticks.map(t => svg`<line x1=${x(t)} x2=${x(t)} y1="135" y2="142" class="tick"/><text x=${x(t)} y="171" text-anchor="middle">${display(t, "°", 1)}</text>`)}
        ${current !== null ? svg`<line x1=${x(current)} x2=${x(current)} y1="44" y2="95" class="measured-line"/><circle cx=${x(current)} cy="95" r="11" class="current-point"/><text x=${x(current)} y="30" text-anchor="middle" class="current-label">${display(current, "°", 1)}</text>` : nothing}
        ${target !== null ? svg`<path d=${`M ${x(target)} 83 l 12 12 -12 12 -12 -12 Z`} class="target-point"/>` : nothing}
        ${this.choice && candidate !== null ? svg`<line x1=${x(candidate)} x2=${x(candidate)} y1="56" y2="124" class="preview-line"/><path d=${`M ${x(candidate)} 83 l 12 12 -12 12 -12 -12 Z`} class="preview-point"/>` : nothing}
      </svg>` : nothing}
      <details class="authority"><summary>${tr("Qui a la main ?")} <span>${decision.reasons[0]?.label ?? tr("Origine du réglage non publiée")}</span></summary>
        <p class="note">${tr("Demande conservée")} · ${display(decision.requestedTemperature, unit, 1)}
          · ${tr("consigne retenue")} · ${display(target, unit, 1)}</p>
        ${decision.reasons.length ? html`<ul>${decision.reasons.map(reason => html`<li>${reason.label} <small>(${reason.code})</small></li>`)}</ul>`
          : html`<p class="note">${tr("Aucun motif de priorité publié dans cet instantané.")}</p>`}
        <p class="note">${tr("Ces motifs décrivent les priorités du thermostat. Ils n’identifient pas la personne ou l’automatisation à l’origine du changement.")}</p>
      </details>
      <div class="presets" role="group" aria-label="${tr("Choisir un preset")}">
        ${model.presets.map(p => html`<button type="button" class=${"preset " + (model.attributes.preset_mode === p.id ? "active" : "")}
          aria-pressed=${this.choice?.kind === "preset" && this.choice.value === p.id}
          ?disabled=${!service || !model.canSetPreset || this.sending} @click=${() => this.choose({kind: "preset", value: p.id})}>
          <span>${p.label}${model.attributes.preset_mode === p.id ? html`<span class="active-label"> · ${tr("actif")}</span>` : nothing}</span>
          <strong>${p.temperature === null ? "—" : display(p.temperature, unit, 1)}</strong></button>`)}
      </div>
      ${model.canSetTemperature ? html`<div class="temperature-control">
        <label for="temperature">${tr("Choisir une température")} <span>${display(candidate ?? target, unit, 1)}</span></label>
        <div class="adjust"><button type="button" aria-label="${tr("Diminuer la température")}" ?disabled=${!service || this.sending || (candidate ?? target!) <= model.minimum!}
          @click=${() => this.choose({kind: "temperature", value: model.shift(candidate ?? target!, -1)})}>−</button>
          <input id="temperature" type="range" min=${model.minimum!} max=${model.maximum!} step=${model.step!}
            .value=${live(String(candidate ?? target))} aria-valuetext=${display(candidate ?? target, unit, 1)} ?disabled=${!service || this.sending}
            @input=${(event: Event) => this.choose({kind: "temperature", value: Number((event.currentTarget as HTMLInputElement).value)})}/>
          <button type="button" aria-label="${tr("Augmenter la température")}" ?disabled=${!service || this.sending || (candidate ?? target!) >= model.maximum!}
            @click=${() => this.choose({kind: "temperature", value: model.shift(candidate ?? target!, 1)})}>+</button></div>
      </div>` : nothing}
      ${this.choice ? html`<div class="preview" aria-label="${tr("Aperçu du réglage")}"><div><span class="caption">${tr("Aperçu")} · ${choiceLabel}</span>
        <strong>${candidate !== null ? display(candidate, unit, 1) : tr("Température déterminée par le thermostat")}</strong></div>
        <div class="actions"><button type="button" ?disabled=${this.sending} @click=${this.cancel}>${tr("Annuler")}</button>
          <button type="button" class="apply" ?disabled=${this.sending || !model.validate(this.choice)} @click=${this.apply}>${this.sending ? tr("Envoi…") : tr("Appliquer")}</button></div></div>` : nothing}
      ${advice.length ? html`<ul class="advice" aria-label="${tr("Avant d’appliquer")}">${advice.map(text => html`<li>${text}</li>`)}</ul>` : nothing}
      <p class=${"status " + (this.failed ? "error" : "")} role="status" aria-live="polite">${this.message}</p>
      ${model.locked ? html`<p class="note">${tr("Thermostat verrouillé.")}</p>` : nothing}
      ${!model.climate ? html`<p class="note">${tr("Aucun thermostat explicitement lié à ce diagnostic.")}</p>` : nothing}
      ${model.filtered !== null && target !== null && Math.abs(model.filtered - target) > 0.01 ? html`<p class="note">${tr("Consigne filtrée de la régulation :")} ${display(model.filtered, unit, 1)}</p>` : nothing}
      <p class="note scheduling">${tr("Les plannings restent gérés par ha-chauffage ou Scheduler.")}</p>
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
    .journey-signals{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:28px;margin-top:26px;border-top:1px solid var(--divider-color,#ddd);border-bottom:1px solid var(--divider-color,#ddd);padding:20px 0}
    .journey-signals .effort-band{margin:0}.signal-caption{display:block;font-size:10px;font-weight:700;letter-spacing:.1em;color:var(--secondary-text-color,#526268);margin-bottom:14px}
    .twin-signal{min-width:0;padding-left:28px;border-left:1px solid var(--divider-color,#ddd);--twin:#536a93}.twin-heading{display:flex;flex-wrap:wrap;gap:4px 12px;align-items:baseline;justify-content:space-between}.twin-badge{font-size:10px;color:var(--twin)}
    .twin-values{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:4px 0 8px}.twin-values>div{min-width:0;display:flex;flex-direction:column;gap:6px}.twin-values>div:last-child{text-align:right}.twin-values span{font-size:11px;color:var(--secondary-text-color,#526268)}.twin-values strong{font-size:24px;line-height:1.2;font-weight:500;white-space:nowrap;font-variant-numeric:tabular-nums;color:var(--twin)}
    .twin-arrow{width:70px;min-width:24px;flex:1;max-width:100px;height:24px;color:var(--twin)}.twin-arrow path{fill:none;stroke:currentColor;stroke-width:1.6;stroke-dasharray:3 4;stroke-linecap:round}.twin-footnote{margin:8px 0 18px;font-size:10px;color:var(--secondary-text-color,#526268);line-height:1.5}
    .twin-eta{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:baseline;gap:6px 12px;border-top:1px dashed var(--divider-color,#ddd);padding:12px 0 0;margin-top:12px;font-size:11px;color:var(--secondary-text-color,#526268)}.twin-eta strong{font-size:16px;font-weight:500}.twin-eta.available strong{font-size:22px;color:var(--twin)}.twin-signal .eta-detail{color:var(--secondary-text-color,#526268);font-size:11px;line-height:1.6;margin:8px 0 0}
    .maintenance{margin:14px 0 8px;padding-left:12px;border-left:2px solid var(--effort);font-size:12px;line-height:1.5}.maintenance>strong{font-size:15px;font-weight:500}.maintenance-caption{display:block;font-size:11px;color:var(--secondary-text-color,#526268);margin-top:3px}.maintenance p{font-size:11px;color:var(--secondary-text-color,#526268);margin:6px 0}.contributions{display:flex;flex-wrap:wrap;gap:6px 24px;font-size:11px;margin-top:10px}.contributions b{font-weight:600;font-variant-numeric:tabular-nums;margin-left:5px}
    @media(max-width:700px){.journey-signals{grid-template-columns:1fr;gap:18px}.twin-signal{padding:18px 0 0;border-left:0;border-top:1px solid var(--divider-color,#ddd)}.twin-values strong{font-size:22px}.twin-heading .signal-caption{margin-bottom:12px}}
    @media(prefers-color-scheme:dark){.twin-signal{--twin:#b0c6ee}}
    .presets{display:flex;flex-wrap:wrap;gap:8px}button{font:inherit;color:inherit;cursor:pointer;background:var(--card-background-color,#fff);border:1px solid var(--divider-color,#b5c0c4);border-radius:9px;min-height:44px;padding:9px 13px}button:focus-visible,input:focus-visible{outline:3px solid var(--primary-color,#167883);outline-offset:3px}button:disabled{opacity:.5;cursor:default}button:not(:disabled):hover{border-color:var(--measured)}
    .preset{display:flex;flex:1 1 100px;min-width:0;flex-direction:column;gap:5px;text-align:left;font-size:13px;overflow-wrap:anywhere}.preset strong{font-weight:500;font-size:17px}.preset.active{border-bottom:3px solid var(--target)}.active-label{font-size:11px;color:var(--secondary-text-color,#526268)}.preset[aria-pressed=true]{outline:2px dashed var(--target);outline-offset:2px}
    .temperature-control{margin-top:22px}label{font-size:13px;display:flex;justify-content:space-between;gap:12px}label span{font-weight:600}.adjust{display:flex;gap:14px;align-items:center;margin-top:10px}.adjust button{width:44px;flex:none;font-size:22px;padding:0}input{width:100%;min-width:0;min-height:44px;accent-color:var(--measured);cursor:pointer}
    .authority{margin:0 0 18px;font-size:13px}.authority summary{cursor:pointer;min-height:44px;padding:12px 0}.authority summary span{color:var(--secondary-text-color,#526268);margin-left:8px}.authority ul,.advice{line-height:1.6;padding-left:20px;font-size:13px;overflow-wrap:anywhere}.authority small{font-size:11px}.advice{border-inline-start:3px solid var(--target);list-style:none;padding:4px 12px}
    .preview{display:flex;gap:16px;justify-content:space-between;align-items:center;margin-top:16px;padding:14px 0;border-top:1px dashed var(--target)}.preview strong{display:block;font-size:22px;margin-top:4px}.actions{display:flex;gap:8px}.apply{background:var(--measured);color:#fff;border-color:var(--measured)}.status{font-size:13px;line-height:1.5}.status:empty{display:none}.error{color:var(--error-color,#b31e18)}.note{line-height:1.5;margin:10px 0 0}.scheduling{margin-top:16px}
    @media(max-width:520px){.readings .measured{font-size:38px}.readings strong{font-size:30px}.rail{margin-top:18px}.preview{align-items:stretch;flex-direction:column}.actions button{flex:1}.preset{flex-basis:90px}svg text{font-size:40px}}
    @media(prefers-color-scheme:dark){:host{--measured:#6dcbd2;--target:#efaf6e;--effort:#efaf6e;--return:#9fc9ef}.apply{background:#23666d;border-color:#6dcbd2}}
  `;
}
