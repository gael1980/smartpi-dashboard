import {
  at,
  num,
  record,
  reliableValue,
  type HAState,
  type Rec,
  type SmartPIDiagnostic,
} from "../adapter";
import {tr, locale} from "../i18n";

export const HISTORY_PATHS = [
  "temperature.indoor",
  "setpoint.filtered_setpoint",
  "power.applied_percent",
  "power.command_percent",
  "power.pi_percent",
  "power.ff_percent",
  "model.a",
  "model.b",
  "control.kp",
  "control.ki",
  "temperature.integral_error",
] as const;
export interface Sample {
  time: number;
  observedAt?: boolean;
  unit?: string | null;
  context?: string;
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
    throw new Error(tr("Réponse Recorder invalide (liste attendue)."));
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
function sampleUnit(sample: Pick<Sample, "unit">): "°C" | "°F" | null {
  return sample.unit === "°C" || sample.unit === "°F" ? sample.unit : null;
}
/** Only recorded metadata can label archived values; unknown stays unknown. */
export function archivedUnit(samples: readonly Pick<Sample, "unit">[]): string {
  const units = new Set(samples.map(sampleUnit));
  return units.size === 1 ? sampleUnit(samples[0]) ?? tr("unité source") : tr("unité source");
}
export function compatibleSampleUnits(samples: readonly Pick<Sample, "unit">[]): boolean {
  return new Set(samples.map(sampleUnit)).size <= 1;
}
/** Missing historical context may match missing context, never an explicit one. */
export function sameSampleContext(a: Sample, b: Sample): boolean {
  return sampleUnit(a) === sampleUnit(b) && (a.context ?? null) === (b.context ?? null);
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
  let first: Sample | undefined, compatible = true;
  let previous: number | null = null;
  let largestInterval: number | null = null;
  for (const sample of samples) {
    const error = valueAt(sample, "error");
    if (error === null) continue;
    if (first && !sameSampleContext(first, sample)) compatible = false;
    first ??= sample;
    errors.push(error);
    if (previous !== null) {
      largestInterval = Math.max(largestInterval ?? 0, sample.time - previous);
    }
    previous = sample.time;
  }
  const absolute = errors.map(Math.abs);
  return {
    pairs: errors.length,
    signedMedian: compatible ? median(errors) : null,
    absoluteMedian: compatible ? median(absolute) : null,
    largestInterval: compatible ? largestInterval : null,
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
    if (sameSampleContext(a, b) && from !== null && to !== null && from !== to)
      events.push({
        time: b.time,
        label: tr("Consigne filtrée {0} → {1} {2}", from, to, archivedUnit([a,b])),
        provenance:
          tr("Variation observée entre publications ; ce n’est pas nécessairement une modification utilisateur."),
      });
    if (a.state !== b.state)
      events.push({
        time: b.time,
        label: tr("Phase / état : {0} → {1}", a.state, b.state),
        provenance:
          tr("Transition observée entre deux états du capteur ; instant exact interne non disponible."),
      });
    for (const [path, label] of [
      ["control.saturation_state", tr("Saturation")],
      ["feedforward.ff3_status", "FF3"],
      ["control.in_deadtime_window", tr("Temps mort")],
      ["learning.last_reason", tr("Apprentissage")],
      ["governance.thermal_update_reason", tr("Gouvernance")],
      ["autocalib.state", tr("Autocalibration")],
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
          provenance: tr("Comparaison des publications live enregistrées ou de session : {0}.", path),
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
    unitFallback?: string,
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
      const climate = d.climateId ? states[d.climateId] : undefined;
      const configured = at(climate?.attributes, "configuration.temperature_unit") ?? climate?.attributes.temperature_unit;
      const unit = configured ?? unitFallback;
      const next = {
        time: seenTime,
        observedAt: samples.length === 0,
        unit: unit === "°C" || unit === "°F" ? unit : null,
        context: JSON.stringify([d.climateId,climate?.state,unit]),
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
    if (!sameSampleContext(previous, current)) continue;
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
      const unit = kind === "A" ? `${archivedUnit([current])}/min/u` : "min⁻¹";
      const published = value === null ? tr("valeur indisponible") : `${value} ${unit}`;
      if (before !== null && after !== null && after > before)
        marks.push({ ...point, kind, label: tr("{0} · +{1} accepté(s) entre {2} et cette publication · {3}", kind, after - before, new Date(previous.time * 1000).toLocaleString(locale()), published) });
      const oldSamples = num(at(previous.live, `learning.emea_samples_${key}`));
      const newSamples = num(at(current.live, `learning.emea_samples_${key}`));
      if (!(before !== null && after !== null && after > before)
          && oldSamples !== null && newSamples !== null && oldSamples >= 0 && newSamples > oldSamples)
        marks.push({ ...point, kind, label: tr("{0} · +{1} mesure(s) collectée(s) entre {2} et cette publication · {3}", kind, newSamples - oldSamples, new Date(previous.time * 1000).toLocaleString(locale()), published) });
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
        const duration = value !== null && value >= 0 ? tr("médiane {0} s", value) : tr("médiane indisponible");
        marks.push({ ...point, kind, label: `${kind} · ${detected ? tr("détection observée · ") : ""}${duration}` });
      }
    }
  }
  return marks;
}
