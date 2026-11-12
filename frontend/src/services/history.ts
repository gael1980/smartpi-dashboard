import { decodeRows, normalize, type Sample } from "../utils/timeseries";
import { record } from "../adapter";
export interface HistoryConnection {
  callWS<T>(message: {
    type: "history/history_during_period";
    start_time: string;
    end_time: string;
    entity_ids: string[];
    include_start_time_state: boolean;
    significant_changes_only: boolean;
    minimal_response: boolean;
    no_attributes: boolean;
  }): Promise<T>;
}
/** Official authenticated history read, one entity, bounded 48 h; no write capability. */
export async function readHistory(
  hass: HistoryConnection,
  entityId: string,
  start: number,
  end: number,
  cancelled: () => boolean = () => false,
): Promise<Sample[]> {
  if (
    !entityId.startsWith("sensor.") ||
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    end <= start ||
    end - start > 48 * 3600
  )
    throw new Error("Fenêtre historique invalide.");
  const all: Sample[] = [];
  for (let from = start; from < end; from += 12 * 3600) {
    if (cancelled()) throw new Error("Lecture annulée.");
    const to = Math.min(end, from + 12 * 3600);
    const response = await hass.callWS<unknown>({
      type: "history/history_during_period",
      start_time: new Date(from * 1000).toISOString(),
      end_time: new Date(to * 1000).toISOString(),
      entity_ids: [entityId],
      include_start_time_state: false,
      significant_changes_only: false,
      minimal_response: false,
      no_attributes: false,
    });
    if (!record(response))
      throw new Error("Format de réponse Recorder non reconnu.");
    const rows = decodeRows(response[entityId] ?? []);
    all.push(...rows.filter((s) => s.time >= from && s.time <= to));
    if (all.length > 100000)
      throw new Error(
        "Volume historique trop important ; utiliser l’historique de session.",
      );
  }
  return normalize(all);
}
