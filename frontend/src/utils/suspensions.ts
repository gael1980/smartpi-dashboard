import type {ObservationPoint} from "./evidence";
import {N_} from "../i18n";
export type SuspensionState = "active" | "inactive" | "unknown";
export type SuspensionKey = "window" | "safety" | "overpowering";
export interface SuspensionInterval {start: number; end: number; state: SuspensionState}
export const suspensionRows: {key: SuspensionKey; label: string; color: string}[] = [
  {key:"window",label:N_("Fenêtre"),color:"#28799c"},
  {key:"safety",label:N_("Sécurité"),color:"#ae4e48"},
  {key:"overpowering",label:N_("Délestage"),color:"#99651d"},
];
/** Discrete states observed by the local notebook, never reconstructed from Recorder or today's climate. */
export function suspensionIntervals(points: readonly ObservationPoint[], key: SuspensionKey, start: number, end: number): SuspensionInterval[] {
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return [];
  const ordered = [...new Map(points.filter(p => Number.isFinite(p.suspensions_observed_at))
    .map(p => [p.suspensions_observed_at!, p])).values()].sort((a,b)=>a.suspensions_observed_at!-b.suspensions_observed_at!);
  const result: SuspensionInterval[] = [];
  const add = (a: number,b: number,state: SuspensionState) => {
    if (b <= a) return;
    const previous=result.at(-1);
    if (previous && previous.end===a && previous.state===state) previous.end=b;
    else result.push({start:a,end:b,state});
  };
  let cursor=start;
  for (let i=0;i<ordered.length-1;i++) {
    const p=ordered[i], next=ordered[i+1], time=p.suspensions_observed_at!, until=next.suspensions_observed_at!;
    const a=Math.max(start,time),b=Math.min(end,until);
    if (b<=a) continue;
    if (cursor<a) add(cursor,a,"unknown");
    const continuous=until-time<=600 && !!p.climate_id && p.climate_id===next.climate_id;
    const value=p[key];
    const state: SuspensionState=!continuous ? "unknown" : key==="window"
      ? value==="on"?"active":value==="off"?"inactive":"unknown"
      : value===true?"active":value===false?"inactive":"unknown";
    add(a,b,state);cursor=b;
  }
  if(cursor<end)add(cursor,end,"unknown");
  return result;
}
