import {record, type HassLike, type Rec} from "../adapter";

export type ObservatoryAction = "get" | "clear" | "bookmark_save" | "bookmark_delete" | "trial_start" | "trial_stop" | "trial_feedback" | "trial_delete" | "forecast_delete" | "receipt_delete" | "receipt_begin" | "receipt_finish";
export interface ObservatoryConnection {
  callWS<T>(message: {type: "smartpi_dashboard/observatory"; entity_id: string; action: ObservatoryAction; payload: Rec}): Promise<T>;
}
export interface Bookmark {id: string; label: string; created_at: number; temperature: number; target: number; preset: string | null; outdoor: number | null; unit: string}
export interface Receipt {id: string; started_at: number; status: string; choice: {kind: string; value: number | string}; unit: string | null; service_result: string; confirmed_at: number | null; applied_at?: number; applied_percent?: number; response_at?: number; response_temperature?: number; reason?: string}
export interface Trial {id: string; label: string; started_at: number; ended_at?: number; status: string; reason?: string; target: number; unit: string; baseline: number | null; outdoor: number | null; feedback: string; missing_publications?: number; summary: {publications: number; first_at: number | null; last_at: number | null; minimum: number | null; maximum: number | null; last: number | null; max_abs_error: number | null; outdoor_min: number | null; outdoor_max: number | null}}
export interface Forecast {id: string; started_at: number; target: number; temperature: number; outdoor: number | null; unit: string; eta_s: number; status: string; reason?: string; observed_at?: number; observed_s?: number}
export interface ObservatoryRoom {current: Rec | null; bookmarks: Bookmark[]; receipts: Receipt[]; trials: Trial[]; forecasts: Forecast[]}

/** Authenticated, admin-only metadata API. Never issues a climate command. */
export class ObservatoryClient {
  constructor(private hass: HassLike & Partial<ObservatoryConnection>) {}
  async request(entityId: string, action: ObservatoryAction, payload: Rec = {}): Promise<unknown> {
    if (!entityId.startsWith("sensor.") || typeof this.hass.callWS !== "function") throw new Error("L’observatoire local n’est pas disponible dans cette connexion.");
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      return await Promise.race([this.hass.callWS<unknown>({type: "smartpi_dashboard/observatory", entity_id: entityId, action, payload}),
        new Promise<never>((_, reject) => {timer = setTimeout(() => reject(new Error(action === "get" ? "L’observatoire ne répond pas. Réessayez." : "Résultat non confirmé. Actualisez le carnet avant de réessayer.")), 8000);})]);
    } catch (error) {
      if (record(error) && typeof error.message === "string" && !(error instanceof Error)) throw new Error(error.message.slice(0, 300));
      throw error;
    } finally { clearTimeout(timer); }
  }
  static room(value: unknown): ObservatoryRoom {
    const text = (v: unknown) => typeof v === "string" && v.length > 0 && v.length <= 100;
    const finite = (v: unknown) => typeof v === "number" && Number.isFinite(v);
    const nullableNumber = (v: unknown) => v === null || finite(v);
    const time = (v: unknown) => finite(v) && (v as number) >= 0 && (v as number) <= 8.64e12;
    const optional = (r: Rec, k: string, check: (v: unknown) => boolean) => r[k] === undefined || check(r[k]);
    const unit = (v: unknown) => v === "°C" || v === "°F";
    const common = (r: Rec) => text(r.id) && time(r.started_at) && optional(r, "reason", text) && optional(r, "ended_at", time);
    const choice = (v: unknown) => record(v) && (v.kind === "temperature" ? finite(v.value) : v.kind === "preset" && text(v.value));
    const groups: Record<string, [number, (r: Rec) => boolean]> = {
      bookmarks: [30, r => text(r.id) && text(r.label) && time(r.created_at) && finite(r.temperature) && finite(r.target) && unit(r.unit) && nullableNumber(r.outdoor) && (r.preset === null || text(r.preset))],
      receipts: [50, r => common(r) && ["pending", "observed", "excluded"].includes(String(r.status)) && choice(r.choice) && (r.unit === null || unit(r.unit)) && ["pending", "accepted", "uncertain"].includes(String(r.service_result)) && (r.confirmed_at === null || time(r.confirmed_at)) && ["applied_at", "response_at"].every(k => optional(r, k, time)) && ["applied_percent", "response_temperature"].every(k => optional(r, k, finite))],
      trials: [50, r => common(r) && text(r.label) && finite(r.target) && unit(r.unit) && nullableNumber(r.baseline) && nullableNumber(r.outdoor) && ["pending", "finished", "excluded"].includes(String(r.status)) && ["unknown", "good", "cold", "hot"].includes(String(r.feedback)) && optional(r, "missing_publications", v => Number.isSafeInteger(v) && (v as number) >= 0) && record(r.summary) && Number.isSafeInteger(r.summary.publications) && (r.summary.publications as number) >= 0 && ["minimum", "maximum", "last", "max_abs_error", "outdoor_min", "outdoor_max"].every(k => nullableNumber((r.summary as Rec)[k])) && ["first_at", "last_at"].every(k => (r.summary as Rec)[k] === null || time((r.summary as Rec)[k]))],
      forecasts: [100, r => common(r) && finite(r.target) && finite(r.temperature) && unit(r.unit) && finite(r.eta_s) && (r.eta_s as number) > 0 && (r.eta_s as number) <= 172800 && ["pending", "reached", "excluded"].includes(String(r.status)) && optional(r, "outdoor", nullableNumber) && (r.status !== "reached" || (time(r.observed_at) && finite(r.observed_s) && (r.observed_s as number) >= 0))],
    };
    if (!record(value) || (value.current !== null && !record(value.current)) || !Object.entries(groups).every(([k, [limit, check]]) => Array.isArray(value[k]) && value[k].length <= limit && value[k].every(v => record(v) && check(v))))
      throw new Error("Réponse de l’observatoire non reconnue. Rechargez après la mise à jour du composant.");
    return value as unknown as ObservatoryRoom;
  }
}
