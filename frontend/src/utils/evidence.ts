import {num} from "../adapter";
import {normalize, sameSampleContext, timestamp, valueAt, type Sample} from "./timeseries";
import {tr} from "../i18n";

export class PublicationQuality {
  static describe(value: unknown, date: unknown, available = true, now = Date.now()/1000) {
    const time = timestamp(date);
    if (!available) return tr("Source indisponible");
    if (value === null || value === undefined || (typeof value === "number" && !Number.isFinite(value))) return tr("Valeur absente");
    if (time === null || time > now + 60) return tr("Horodatage non vérifiable");
    return now - time > 600 ? tr("Publication ancienne") : tr("Publication récente");
  }
}

export interface ObservationPoint {
  suspensions_observed_at?: number | null;
  time: number; temperature: number | null; target: number | null; outdoor: number | null;
  applied: number | null; mode?: string | null; unit?: string | null; climate_id?: string | null;
  preset?: string | null; bound?: boolean; window?: string | null; safety?: boolean | null; overpowering?: boolean | null;
}
export interface ResponseEpisode {
  start: number; end: number; target: number; baseline: number; unit: string; mode: string;
  minimum: number; maximum: number; last: number; publications: number; bracketedSeconds: number;
  firstWithin: number | null; overshoot: number; endReason: string; contextKnown: boolean;
}
/** Observation summaries only. No interpolation, inferred event time or controller evaluation. */
export class ResponseEpisodes {
  static readonly GAP = 600;
  readonly episodes: ResponseEpisode[] = [];
  excluded = 0;
  constructor(points: ObservationPoint[], readonly tolerance: number) {
    if (!Number.isFinite(tolerance) || tolerance < 0) throw new Error(tr("Tolérance invalide"));
    const ordered = [...new Map(points.map(p => [p.time,p])).values()].filter(p=>Number.isFinite(p.time)).sort((a,b)=>a.time-b.time);
    let current: ResponseEpisode | undefined, context = "", previous: ObservationPoint | undefined;
    for (const p of ordered) {
      const nextContext = JSON.stringify([p.climate_id,p.mode,p.target,p.unit]);
      const valid = num(p.temperature)!==null && num(p.target)!==null && ["°C","°F"].includes(p.unit ?? "") &&
        ["heat","cool"].includes(p.mode ?? "") && typeof p.climate_id==="string" && p.bound===true &&
        p.window!=="on" && p.safety!==true && p.overpowering!==true;
      const gap = !!previous && p.time-previous.time>ResponseEpisodes.GAP;
      if (!valid || gap || context!==nextContext) {
        if(current) current.endReason = !valid ? tr("Donnée ou contexte exclu") : gap ? tr("Interruption > 10 min") : tr("Consigne, mode, unité ou liaison modifié");
        current=undefined;
      }
      if (!valid) {this.excluded++;previous=p;context=nextContext;continue;}
      const t=p.temperature!,target=p.target!;
      if(!current){
        current={start:p.time,end:p.time,target,baseline:t,unit:p.unit!,mode:p.mode!,minimum:t,maximum:t,last:t,publications:0,
          bracketedSeconds:0,firstWithin:null,overshoot:0,endReason:tr("Fin des observations disponibles"),contextKnown:true};
        this.episodes.push(current);
      } else current.bracketedSeconds+=p.time-current.end;
      current.end=p.time;current.minimum=Math.min(current.minimum,t);current.maximum=Math.max(current.maximum,t);current.last=t;current.publications++;
      current.contextKnown &&= ["on","off"].includes(p.window ?? "") && typeof p.safety==="boolean" && typeof p.overpowering==="boolean";
      if (current.firstWithin===null && Math.abs(target-t)<=tolerance) current.firstWithin=p.time-current.start;
      const direction=Math.sign(target-current.baseline);
      if(direction) current.overshoot=Math.max(current.overshoot,direction*(t-target));
      previous=p;context=nextContext;
    }
  }
}

/** Same-recorded-unit, same-time-axis comparison of the session's published samples. */
export class ComparisonTrace {
  readonly segments: {time:number; error:number; applied:number}[][]=[];
  readonly valid: number;
  constructor(samples: Sample[], unit: string, start: number, end: number) {
    let segment: {time:number;error:number;applied:number}[]=[];
    let previous: Sample | undefined, count=0;
    for(const s of normalize(samples).filter(s=>s.time>=start&&s.time<=end)){
      const error=valueAt(s,"error"),applied=valueAt(s,"power.applied_percent");
      const valid=!s.observedAt && s.unit===unit && !["unknown","unavailable"].includes(s.state) && error!==null && applied!==null && applied>=0 && applied<=100;
      if(!valid || (previous && (s.time-previous.time>600 || !sameSampleContext(s,previous)))){if(segment.length)this.segments.push(segment);segment=[];}
      if(valid){segment.push({time:s.time,error:error!,applied:applied!});count++;}
      previous=s;
    }
    if(segment.length)this.segments.push(segment);
    this.valid=count;
  }
}
