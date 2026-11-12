import test from 'node:test';
import assert from 'node:assert/strict';
import {DiagnosticProjection,commandPair} from '../.build-tests/utils/diagnostic-projection.mjs';

const sample=(time,changes={})=>({time,state:'stable',history:{temperature:{indoor:19},setpoint:{filtered_setpoint:20},power:{command_percent:85,applied_percent:60},model:{a:.02,b:.001}},live:{},...changes});
test('scatter pairs filtered error and applied output from the same publication, preserving zero',()=>{
 const one=sample(1),zero=sample(2);zero.history.power.applied_percent=0;
 const data=new DiagnosticProjection([one,zero],'scatter');assert.equal(data.valid,2);assert.deepEqual(data.points.map(p=>[p.x,p.y]),[[1,60],[1,0]]);
 one.history.power.applied_percent=null;assert.equal(new DiagnosticProjection([one],'scatter').valid,0);
});
test('invalid, unavailable, missing and large-gap samples break the A/B path',()=>{
 const values=[sample(1),sample(2,{state:'unavailable'}),sample(3),sample(1000)];
 const d=new DiagnosticProjection(values,'model');assert.equal(d.valid,3);assert.notEqual(d.points[0].segment,d.points[1].segment);assert.notEqual(d.points[1].segment,d.points[2].segment);
 const missing=sample(1001);missing.history.model.b=null;assert.equal(new DiagnosticProjection([missing],'model').valid,0);
});
test('unchanged published A/B values are grouped without inventing accepted learning',()=>{
 const d=new DiagnosticProjection([sample(1),sample(2),sample(3)],'model');assert.equal(d.valid,3);assert.equal(d.points.length,1);
 assert.equal(d.points[0].time,1);assert.equal(d.points[0].lastTime,3);assert.equal(d.points[0].publications,3);assert.equal(d.points[0].x,.02);
});
test('point budgets are explicit and do not mutate input or interpolate missing publications',()=>{
 const input=Array.from({length:1500},(_,i)=>sample(i));const before=JSON.stringify(input);
 const scatter=new DiagnosticProjection(input,'scatter');assert.equal(scatter.points.length,600);assert.equal(scatter.valid,1500);assert.equal(scatter.points[0].time,0);assert.equal(scatter.points.at(-1).time,1499);assert.equal(scatter.reduced,true);assert.equal(JSON.stringify(input),before);
 input.forEach((s,i)=>s.history.model.a=i);const model=new DiagnosticProjection(input,'model');assert.equal(model.points.length,600);assert.equal(model.points[0].time,900);assert.equal(model.points.at(-1).time,1499);assert.equal(model.distinct,1500);
});
test('command comparison retains an unclipped demand and requires a valid applied pair',()=>{
 const s=sample(1);s.history.power.command_percent=120;assert.deepEqual(commandPair(s),[120,60]);
 s.history.power.applied_percent=101;assert.equal(commandPair(s),null);s.history.power.applied_percent=0;assert.deepEqual(commandPair(s),[120,0]);
 s.state='unknown';assert.equal(commandPair(s),null);
});
test('historical model points do not receive the current confidence retroactively',()=>{
 const s=sample(1);s.live={model:{confidence:'unreliable'}};const d=new DiagnosticProjection([s],'model');assert.equal(d.points.length,1);assert.equal('confidence' in d.points[0],false);
});
test('projection selection data stays chronological and does not merge an observation timestamp into a publication plateau',()=>{
 const d=new DiagnosticProjection([sample(2),sample(1,{observedAt:true})],'model');assert.deepEqual(d.points.map(p=>p.time),[1,2]);assert.equal(d.points[0].observedAt,true);
});
