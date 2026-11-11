import {
  at,
  num,
  record,
  reliableValue,
  type HAState,
  type Rec,
  type SmartPIDiagnostic,
} from "../adapter";

export const HISTORY_PATHS = [
  "temperature.indoor",
  "setpoint.filtered_setpoint",
  "power.applied_percent",
  "power.command_percent",
  "power.pi_percent",
  "power.ff_percent",
  "model.a",
  "model.b",
] as const;
export interface Sample {
  time: number;
  observedAt?: boolean;
  state: string;
  history: Rec;
  live: Rec;
}
export interface DiagnosticEvent {
  time: number;
  label: string;
  provenance: string;
}
export function timestamp(value: unknown): number | null {
  if (typeof value === "number")
    return Number.isFinite(value) && value > 0 ? value : null;
  if (typeof value !== "string" || !/(Z|[+-]\d\d:\d\d)$/.test(value))
    return null;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms / 1000 : null;
}
export function decodeRows(rows: unknown): Sample[] {
  if (!Array.isArray(rows))
    throw new Error("Réponse Recorder invalide (liste attendue).");
  const samples: Sample[] = [];
  for (const row of rows) {
    if (!record(row)) continue;
    const time = timestamp(row.lu ?? row.last_updated);
    if (time === null) continue;
    const attrs = record(row.a)
      ? row.a
      : record(row.attributes)
        ? row.attributes
        : {};
    const state =
      typeof row.s === "string"
        ? row.s
        : typeof row.state === "string"
          ? row.state
          : "unknown";
    const valid =
      attrs.schema_version === 2 &&
      state !== "unavailable" &&
      state !== "unknown";
    samples.push({
      time,
      state,
      history: valid && record(attrs.history) ? attrs.history : {},
      live: valid && record(attrs.live) ? attrs.live : {},
    });
  }
  return normalize(samples);
}
export function normalize(samples: Sample[]): Sample[] {
  return [...new Map(samples.map((s) => [s.time, s])).values()].sort(
    (a, b) => a.time - b.time,
  );
}
export function valueAt(s: Sample, path: string): number | null {
  if (path === "error") {
    const temp = num(at(s.history, "temperature.indoor")),
      target = num(at(s.history, "setpoint.filtered_setpoint"));
    return temp === null || target === null ? null : num(target - temp);
  }
  if (path.startsWith("live."))
    return num(reliableValue(s.live, path.slice(5)));
  return num(at(s.history, path));
}
function median(values: number[]): number | null {
  if (values.length < 2) return null;
  values.sort((a, b) => a - b);
  const middle = Math.floor(values.length / 2);
  return values.length % 2
    ? values[middle]
    : values[middle - 1] / 2 + values[middle] / 2;
}

/** Describes complete publications in chronological order, with equal point weights. */
export function observedTracking(samples: readonly Sample[]) {
  const errors: number[] = [];
  let previous: number | null = null;
  let largestInterval: number | null = null;
  for (const sample of samples) {
    const error = valueAt(sample, "error");
    if (error === null) continue;
    errors.push(error);
    if (previous !== null) {
      largestInterval = Math.max(largestInterval ?? 0, sample.time - previous);
    }
    previous = sample.time;
  }
  const absolute = errors.map(Math.abs);
  return {
    pairs: errors.length,
    signedMedian: median(errors),
    absoluteMedian: median(absolute),
    largestInterval,
  };
}
export function usable(samples: Sample[]): boolean {
  return samples.some((s) => HISTORY_PATHS.some((p) => valueAt(s, p) !== null));
}
export function observedEvents(samples: Sample[]): DiagnosticEvent[] {
  const events: DiagnosticEvent[] = [];
  for (let i = 1; i < samples.length; i++) {
    const a = samples[i - 1],
      b = samples[i];
    const from = num(at(a.history, "setpoint.filtered_setpoint")),
      to = num(at(b.history, "setpoint.filtered_setpoint"));
    if (from !== null && to !== null && from !== to)
      events.push({
        time: b.time,
        label: `Consigne filtrée ${from} → ${to} °C`,
        provenance:
          "Variation observée entre publications ; ce n’est pas nécessairement une modification utilisateur.",
      });
    if (a.state !== b.state)
      events.push({
        time: b.time,
        label: `Phase / état : ${a.state} → ${b.state}`,
        provenance:
          "Transition observée entre deux états du capteur ; instant exact interne non disponible.",
      });
    for (const [path, label] of [
      ["control.saturation_state", "Saturation"],
      ["feedforward.ff3_status", "FF3"],
      ["control.in_deadtime_window", "Temps mort"],
      ["learning.last_reason", "Apprentissage"],
      ["governance.thermal_update_reason", "Gouvernance"],
      ["autocalib.state", "Autocalibration"],
    ]) {
      const prev = at(a.live, path),
        next = at(b.live, path);
      if (
        prev !== undefined &&
        prev !== null &&
        next !== undefined &&
        next !== null &&
        prev !== next
      )
        events.push({
          time: b.time,
          label: `${label} : ${String(next)}`,
          provenance: `Comparaison des publications live enregistrées ou de session : ${path}.`,
        });
    }
  }
  return events;
}
/** Session only: publications received through normal HA updates; no polling or storage. */
export class SessionHistory {
  private buffers = new Map<string, Sample[]>();
  private revisions = new Map<string, string>();
  collect(
    diagnostics: SmartPIDiagnostic[],
    states: Record<string, HAState>,
    now = Date.now() / 1000,
  ) {
    const present = new Set(diagnostics.map((d) => d.entityId));
    for (const id of this.buffers.keys())
      if (!present.has(id)) {
        this.buffers.delete(id);
        this.revisions.delete(id);
      }
    for (const d of diagnostics) {
      const revision = states[d.entityId]?.last_updated;
      const time = timestamp(revision);
      if (
        !revision ||
        time === null ||
        this.revisions.get(d.entityId) === revision
      )
        continue;
      this.revisions.set(d.entityId, revision);
      const samples = this.buffers.get(d.entityId) ?? [];
      // An entity may predate this session: first point is its time of observation.
      if (samples.length && time <= samples[samples.length - 1].time) continue;
      const seenTime = samples.length === 0 ? now : time;
      const next = {
        time: seenTime,
        observedAt: samples.length === 0,
        state: d.state,
        history: d.available ? d.history : {},
        live: d.live,
      };
      this.buffers.set(
        d.entityId,
        normalize([...samples, next])
          .filter((s) => s.time >= now - 48 * 3600)
          .slice(-12000),
      );
    }
  }
  get(entityId: string): Sample[] {
    return this.buffers.get(entityId) ?? [];
  }
  clear() {
    this.buffers.clear();
    this.revisions.clear();
  }
}

export interface LearningMark {
  time: number;
  kind: "A" | "B" | "Chauffe" | "Refroidissement";
  temperature: number | null;
  label: string;
  observedAt?: boolean;
}

export function learningMarks(samples: readonly Sample[]): LearningMark[] {
  const marks: LearningMark[] = [];
  const count = (sample: Sample, key: string) => {
    const value = num(at(sample.live, `learning.accepted_updates_${key}`));
    return value !== null && Number.isSafeInteger(value) && value >= 0 ? value : null;
  };
  for (let i = 1; i < samples.length; i++) {
    const [previous, current] = [samples[i - 1], samples[i]];
    if ([previous, current].some((s) => ["unknown", "unavailable", "inactive"].includes(s.state))) continue;
    const point = {
      time: current.time,
      observedAt: current.observedAt,
      temperature: valueAt(current, "temperature.indoor"),
    };
    for (const kind of ["A", "B"] as const) {
      const key = kind.toLowerCase();
      const before = count(previous, key), after = count(current, key);
      const value = valueAt(current, `model.${key}`);
      const unit = kind === "A" ? "°C/min/u" : "min⁻¹";
      const published = value === null ? "valeur indisponible" : `${value} ${unit}`;
      if (before !== null && after !== null && after > before)
        marks.push({ ...point, kind, label: `${kind} · +${after - before} accepté(s) entre ${new Date(previous.time * 1000).toLocaleString()} et cette publication · ${published}` });
      const oldSamples = num(at(previous.live, `learning.emea_samples_${key}`));
      const newSamples = num(at(current.live, `learning.emea_samples_${key}`));
      if (!(before !== null && after !== null && after > before)
          && oldSamples !== null && newSamples !== null && oldSamples >= 0 && newSamples > oldSamples)
        marks.push({ ...point, kind, label: `${kind} · +${newSamples - oldSamples} mesure(s) collectée(s) entre ${new Date(previous.time * 1000).toLocaleString()} et cette publication · ${published}` });
    }
    for (const [direction, kind] of [["heat", "Chauffe"], ["cool", "Refroidissement"]] as const) {
      const estimate = (sample: Sample) => num(reliableValue(
        sample.live, `model.deadtime_${direction}_s`, `model.deadtime_${direction}_reliable`,
      ));
      const value = estimate(current);
      const path = `analysis.deadtime.${direction}_last_outcome`;
      const previousOutcome = at(previous.live, path);
      const detected = typeof previousOutcome === "string" && previousOutcome !== "detected"
        && at(current.live, path) === "detected";
      if (detected || (value !== null && value >= 0 && value !== estimate(previous))) {
        const duration = value !== null && value >= 0 ? `médiane ${value} s` : "médiane indisponible";
        marks.push({ ...point, kind, label: `${kind} · ${detected ? "détection observée · " : ""}${duration}` });
      }
    }
  }
  return marks;
}
