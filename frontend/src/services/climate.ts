import {discover, type HassLike, type SmartPIDiagnostic} from "../adapter";
import {ThermalJourney, type Choice} from "../utils/thermal-journey";
import {ObservatoryClient, type ObservatoryConnection} from "./observatory";
import {record} from "../adapter";

export interface ClimateConnection {
  callService(domain: string, service: string, data: Record<string, unknown>): Promise<unknown>;
}

/** The only write capability: one explicit user choice, one bound climate entity. */
export async function applyClimateChoice(hass: HassLike & Partial<ClimateConnection> & Partial<ObservatoryConnection>, diagnostic: SmartPIDiagnostic, choice: Choice, context: string, isCurrent: () => boolean = () => true) {
  // Keep the validated choice immutable across the metadata await.
  choice = {...choice};
  const latest = discover(hass).find(d => d.entityId === diagnostic.entityId && d.climateId === diagnostic.climateId);
  if (!latest || typeof hass.callService !== "function") throw new Error("Commande indisponible dans cette connexion.");
  const model = new ThermalJourney(hass, latest);
  if (model.context !== context) throw new Error("Le thermostat a changé. Sélectionnez à nouveau votre choix.");
  if (!model.validate(choice)) throw new Error("Ce réglage n’est plus disponible ou ne respecte pas les limites du thermostat.");
  const client = new ObservatoryClient(hass);
  let receipt: string | null = null, started = false;
  try {
    const result = await client.request(latest.entityId, "receipt_begin", {choice});
    if (record(result) && typeof result.id === "string") receipt = result.id;
  } catch { /* Metadata failure must not introduce another climate action. */ }
  try {
    const current = discover(hass).find(d => d.entityId === diagnostic.entityId && d.climateId === diagnostic.climateId);
    const currentModel = current ? new ThermalJourney(hass, current) : undefined;
    if (!isCurrent() || !currentModel || currentModel.context !== context || !currentModel.validate(choice)) throw new Error("Le thermostat a changé avant l’envoi. Sélectionnez à nouveau votre choix.");
    started = true;
    if (choice.kind === "temperature") {
      await hass.callService("climate", "set_temperature", {entity_id: latest.climateId, temperature: choice.value});
    } else {
      await hass.callService("climate", "set_preset_mode", {entity_id: latest.climateId, preset_mode: choice.value});
    }
  } catch (error) {
    if (receipt) await client.request(latest.entityId, "receipt_finish", {id: receipt, success: false, not_sent: !started}).catch(() => {});
    throw error;
  }
  if (receipt) await client.request(latest.entityId, "receipt_finish", {id: receipt, success: true}).catch(() => {});
  return {receipt};
}
