import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { display, at, type SmartPIDiagnostic } from "../adapter";
import { ControlPresentation } from "../utils/control";
@customElement("smartpi-command-chain")
export class CommandChain extends LitElement {
  @property({ attribute: false }) diagnostic?: SmartPIDiagnostic;
  render() {
    if (!this.diagnostic) return html``;
    const view = new ControlPresentation(this.diagnostic),
      chain = view.chain(),
      max = Math.max(100, ...chain.map((c) => Math.abs(c.value ?? 0)));
    return html`<h3>Chaîne U <span>Instantané · % de commande</span></h3>
      <p>
        ${view.bypass
          ? "Chemin direct actif : ces contributions PI/FF ne construisent pas la commande appliquée."
          : "FF final = clamp(FF1 + FF2), puis FF effectif = clamp(FF final + FF3). En bande morte, FF final est retenu sans FF3 ; ailleurs FF effectif est retenu. PI et FF retenu précèdent les limites ; Hold est un état de maintien, pas une contribution à additionner."}
      </p>
      ${chain.map(
        (c) =>
          html`<div class="row">
            <span title=${"attributes.live." + c.path}>${c.label}</span>
            <div class="track">
              <i></i>${c.value === null
                ? null
                : html`<b
                    style=${`left:${c.value < 0 ? 50 + (c.value / max) * 50 : 50}%;width:${(Math.abs(c.value) / max) * 50}%`}
                    class=${c.value < 0 ? "negative" : ""}
                  ></b>`}
            </div>
            <strong>${display(c.value, " %", 2)}</strong>
          </div>`,
      )}
      <p>
        Ces diagnostics peuvent décrire un candidat et un cycle déjà engagé.
        Leurs différences ne sont pas une preuve de perte ni de limitation.
      </p>
      <p>
        Échelle symétrique ±${display(max, " %")} ; aucune composante hors 0–100
        % n’est tronquée. Ratios FF convertis ×100 pour cette vue.
      </p>
      <p>
        Raison FF2 :
        ${display(
          at(this.diagnostic.live, "analysis.feedforward.ff2_freeze_reason"),
        )}
        · FF3 : ${display(at(this.diagnostic.live, "feedforward.ff3_status"))} ·
        Intégrale :
        ${display(at(this.diagnostic.live, "temperature.integral_mode"))}
      </p>
      ${at(this.diagnostic.live, "power.valve_linearization_enabled") === true
        ? html`<p>
            Courbe de vanne active : les espaces linéaire et actionneur
            diffèrent. Aucun écart causal n’est calculé entre ces étapes.
          </p>`
        : null}`;
  }
  static styles = css`
    :host {
      display: block;
    }
    h3 {
      font-size: 18px;
    }
    h3 span,
    p {
      font-size: 12px;
      color: var(--secondary-text-color);
      line-height: 1.6;
    }
    h3 span {
      font-weight: 400;
      margin-left: 10px;
    }
    .row {
      display: grid;
      grid-template-columns: 100px 1fr 110px;
      gap: 12px;
      align-items: center;
      margin: 13px 0;
      font-size: 13px;
    }
    .track {
      height: 9px;
      position: relative;
      background: var(--divider-color);
      border-radius: 3px;
    }
    .track i {
      position: absolute;
      left: 50%;
      height: 15px;
      top: -3px;
      border-left: 1px solid var(--secondary-text-color);
    }
    b {
      position: absolute;
      top: 0;
      height: 9px;
      background: #3587c4;
      border-radius: 3px;
    }
    b.negative {
      background: #cb7f32;
    }
    strong {
      text-align: right;
      font-variant-numeric: tabular-nums;
    }
    @media (max-width: 500px) {
      .row {
        grid-template-columns: 75px 1fr 90px;
        font-size: 12px;
        gap: 6px;
      }
    }
  `;
}
