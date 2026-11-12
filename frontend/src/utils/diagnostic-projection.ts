import {normalize, valueAt, type Sample} from "./timeseries";

export type ProjectionKind = "scatter" | "model";
export interface ProjectionPoint {
  time: number;
  lastTime: number;
  x: number;
  y: number;
  segment: number;
  publications: number;
  observedAt: boolean;
}

/** Same-publication command pair; absence and invalid output are never zero. */
export function commandPair(sample: Sample): [number, number] | null {
  if (["unknown", "unavailable"].includes(sample.state)) return null;
  const requested = valueAt(sample, "power.command_percent"), applied = valueAt(sample, "power.applied_percent");
  return requested !== null && applied !== null && applied >= 0 && applied <= 100 ? [requested, applied] : null;
}

/** Descriptive views of published samples, without fitting or confidence inference. */
export class DiagnosticProjection {
  static readonly MAX_POINTS = 600;
  static readonly GAP_SECONDS = 600;
  readonly total: number;
  readonly valid: number;
  readonly points: ProjectionPoint[];
  readonly reduced: boolean;
  readonly distinct: number;

  constructor(samples: Sample[], readonly kind: ProjectionKind) {
    const ordered = normalize(samples);
    this.total = ordered.length;
    const points: ProjectionPoint[] = [];
    let valid = 0, segment = 0, previousTime: number | null = null;
    for (const sample of ordered) {
      if (previousTime !== null && sample.time - previousTime > DiagnosticProjection.GAP_SECONDS) ++segment;
      previousTime = sample.time;
      const x = valueAt(sample, kind === "scatter" ? "error" : "model.a");
      const y = valueAt(sample, kind === "scatter" ? "power.applied_percent" : "model.b");
      if (!Number.isFinite(sample.time) || sample.time < 0 || sample.time > 8.64e12 ||
          ["unknown", "unavailable"].includes(sample.state) || x === null || y === null ||
          (kind === "scatter" && (y < 0 || y > 100))) {
        ++segment;
        continue;
      }
      ++valid;
      const previous = points.at(-1);
      if (kind === "model" && previous?.segment === segment && previous.x === x && previous.y === y && previous.observedAt === !!sample.observedAt) {
        previous.lastTime = sample.time;
        ++previous.publications;
      } else {
        points.push({time: sample.time, lastTime: sample.time, x, y, segment, publications: 1, observedAt: !!sample.observedAt});
      }
    }
    this.valid = valid;
    this.distinct = points.length;
    this.reduced = points.length > DiagnosticProjection.MAX_POINTS;
    this.points = !this.reduced ? points : kind === "model" ? points.slice(-DiagnosticProjection.MAX_POINTS)
      : Array.from({length: DiagnosticProjection.MAX_POINTS}, (_, i) => points[Math.round(i * (points.length - 1) / (DiagnosticProjection.MAX_POINTS - 1))]);
  }
}
