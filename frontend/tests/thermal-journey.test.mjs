import test from 'node:test';
import assert from 'node:assert/strict';
import {discover} from '../.build-tests/adapter.mjs';
import {ThermalJourney} from '../.build-tests/utils/thermal-journey.mjs';
import {applyClimateChoice} from '../.build-tests/services/climate.mjs';

const now = Date.parse('2026-11-11T14:00:00Z');
function fixture() {
  const sensor = {entity_id:'sensor.example',state:'stable',last_updated:new Date(now).toISOString(),attributes:{schema_version:2,history:{},live:{
    temperature:{indoor:19.2},setpoint:{filtered_setpoint:19.7},model:{tau_reliable:true},analysis:{twin:{twin_status:'ok',twin_model_reliable:true,twin_warming_up:false,eta_s:2100,eta_reason:'ok'}}
  }}};
  const climate = {entity_id:'climate.example',state:'heat',last_updated:new Date(now-1000).toISOString(),attributes:{
    temperature:20,min_temp:7,max_temp:30,target_temp_step:0.5,supported_features:17,preset_modes:['none','eco','comfort','boost','activity','custom'],preset_mode:'comfort',
    configuration:{temperature_unit:'°C'},specific_states:{regulation_diagnostics:sensor.entity_id},preset_temperatures:{eco_temp:17,comfort_temp:20,boost_temp:21,eco_away_temp:15,eco_cool_temp:25}
  }};
  const calls=[];
  const hass={states:{[sensor.entity_id]:sensor,[climate.entity_id]:climate},callService:async(...args)=>{calls.push(args)}};
  const model=()=>new ThermalJourney(hass,discover(hass)[0]);
  return {hass,sensor,climate,calls,model};
}
test('journey separates raw target, measured temperature and filtered PI target',()=>{
 const {model}=fixture(),m=model();assert.equal(m.measured,19.2);assert.equal(m.target,20);assert.equal(m.filtered,19.7);
 assert.equal(m.presets.find(p=>p.id==='eco').temperature,17);assert.equal(m.presets.find(p=>p.id==='custom').temperature,null);
 assert.equal(m.presets.find(p=>p.id==='none').temperature,null);assert.equal(m.presets.find(p=>p.id==='activity').temperature,null);
});
test('preset positions respect presence and cooling without guessing dynamic temperatures',()=>{
 const {climate,model}=fixture();climate.attributes.presence_manager={presence_state:'off'};
 assert.equal(model().presets.find(p=>p.id==='eco').temperature,15);
 climate.attributes.presence_manager.presence_state='on';climate.state='cool';assert.equal(model().presets.find(p=>p.id==='eco').temperature,25);
 climate.state='off';assert.ok(model().presets.every(p=>p.temperature===null));
});
test('temperature writes require explicit binding, capabilities, units, bounds and step',()=>{
 const {climate,model}=fixture();assert.equal(model().validate({kind:'temperature',value:20.5}),true);
 for(const value of [NaN,Infinity,6.5,30.5,20.25])assert.equal(model().validate({kind:'temperature',value}),false);
 climate.attributes.specific_states.is_locked=true;assert.equal(model().canSetTemperature,false);assert.equal(model().canSetPreset,false);
 delete climate.attributes.specific_states.is_locked;climate.attributes.supported_features=16;assert.equal(model().canSetTemperature,false);
 climate.attributes.supported_features=17;delete climate.attributes.configuration.temperature_unit;assert.equal(model().canSetTemperature,false);
});
test('explicit climate association cannot be inferred from entity names',()=>{
 const {climate,model}=fixture();delete climate.attributes.specific_states.regulation_diagnostics;
 assert.equal(model().climate,undefined);assert.equal(model().canSetPreset,false);assert.equal(model().target,null);
});
test('ambiguous diagnostic association never enables a climate action',()=>{
 const f=fixture();f.hass.states['climate.duplicate']={...f.climate,entity_id:'climate.duplicate'};
 assert.equal(f.model().climate,undefined);assert.equal(f.model().canSetTemperature,false);assert.equal(f.model().canSetPreset,false);
});
test('unavailable climate or diagnostic never enables controls or exposes ETA',()=>{
 for(const key of ['climate','sensor'])for(const state of ['unavailable','unknown']){
  const f=fixture();f[key].state=state;assert.equal(f.model().canSetTemperature,false);assert.equal(f.model().canSetPreset,false);assert.equal(f.model().eta(false,now),null);
 }
});
test('ETA is a published best case and is hidden for previews',()=>{
 const m=fixture().model();assert.equal(m.eta(false,now).label,'≈ 35 min');assert.match(m.eta(false,now).detail,/Meilleur cas/);
 assert.equal(m.eta(true,now),null);
});
test('ETA requires available Twin, affirmative model/tau flags and completed warmup',()=>{
 for(const [key,values] of Object.entries({twin_status:[undefined,'unavailable','warming_up'],twin_model_reliable:[false,undefined,'true'],twin_warming_up:[true,undefined,'false']})){
  for(const value of values){const f=fixture();f.sensor.attributes.live.analysis.twin[key]=value;assert.equal(f.model().eta(false,now),null);}
 }
 for(const tau of [false,null,undefined,'true']){const f=fixture();f.sensor.attributes.live.model.tau_reliable=tau;assert.equal(f.model().eta(false,now),null);}
});
test('ETA omits missing, invalid, unreachable, stale and too-far forecasts',()=>{
 for(const seconds of [null,undefined,NaN,Infinity,-1,0,172801]){const f=fixture();f.sensor.attributes.live.analysis.twin.eta_s=seconds;assert.equal(f.model().eta(false,now),null);}
 for(const reason of [null,undefined,'not_reliable','unreachable','too_far']){const f=fixture();f.sensor.attributes.live.analysis.twin.eta_reason=reason;assert.equal(f.model().eta(false,now),null);}
 const f=fixture();assert.equal(f.model().eta(false,now+600001),null);
 f.climate.last_updated=new Date(now+1).toISOString();assert.equal(f.model().eta(false,now),null);
 f.climate.state='off';assert.equal(f.model().eta(false,now),null);
});
test('ETA preserves an explicitly published already-reached zero',()=>{
 const f=fixture();Object.assign(f.sensor.attributes.live.analysis.twin,{eta_s:0,eta_reason:'already_reached'});
 assert.equal(f.model().eta(false,now).label,'À la consigne');assert.equal(f.model().eta(false,now).seconds,0);
});
test('Fahrenheit climate keeps native SmartPI temperatures without double conversion',()=>{
 const f=fixture();Object.assign(f.climate.attributes,{temperature:68,min_temp:45,max_temp:86,target_temp_step:1});f.climate.attributes.configuration.temperature_unit='°F';
 f.sensor.attributes.live.temperature.indoor=66.56;f.sensor.attributes.live.setpoint.filtered_setpoint=67.46;
 assert.equal(f.model().target,68);assert.equal(f.model().measured,66.56);assert.equal(f.model().filtered,67.46);assert.equal(f.model().validate({kind:'temperature',value:69}),true);
});
test('increment controls snap an off-grid preset onto the configured temperature step',()=>{
 const m=fixture().model();assert.equal(m.shift(19.3,1),19.5);assert.equal(m.shift(19.3,-1),19);assert.equal(m.shift(20,1),20.5);assert.equal(m.shift(7,-1),7);
});
test('only explicit valid choices call the two allowed climate services',async()=>{
 const f=fixture(),d=discover(f.hass)[0],context=f.model().context;
 assert.deepEqual(f.calls,[]);
 await applyClimateChoice(f.hass,d,{kind:'temperature',value:20.5},context);
 await applyClimateChoice(f.hass,d,{kind:'preset',value:'eco'},context);
 assert.deepEqual(f.calls,[['climate','set_temperature',{entity_id:'climate.example',temperature:20.5}],['climate','set_preset_mode',{entity_id:'climate.example',preset_mode:'eco'}]]);
});
test('stale choices, changed associations, removed presets and invalid values never call HA',async()=>{
 for(const mutate of [f=>{f.climate.attributes.temperature=21},f=>{f.climate.attributes.specific_states.regulation_diagnostics='sensor.other'},f=>{f.climate.state='unavailable'},f=>{f.climate.attributes.preset_modes=['none']}]){
  const f=fixture(),d=discover(f.hass)[0],context=f.model().context;mutate(f);
  await assert.rejects(applyClimateChoice(f.hass,d,{kind:'preset',value:'eco'},context));assert.deepEqual(f.calls,[]);
 }
 for(const choice of [{kind:'temperature',value:100},{kind:'temperature',value:NaN},{kind:'preset',value:'bogus'}]){
  const f=fixture();await assert.rejects(applyClimateChoice(f.hass,discover(f.hass)[0],choice,f.model().context));assert.deepEqual(f.calls,[]);
 }
});
test('service refusals propagate without fallback actions',async()=>{
 const f=fixture();let calls=0;f.hass.callService=async()=>{calls++;throw Error('permission denied')};
 await assert.rejects(applyClimateChoice(f.hass,discover(f.hass)[0],{kind:'preset',value:'eco'},f.model().context),/permission denied/);assert.equal(calls,1);
});

test('applied effort uses the published percentage and the actual HVAC mode',()=>{
 const f=fixture();f.sensor.attributes.live.power={applied_percent:68};
 assert.deepEqual(f.model().appliedEffort(now),{percent:68,direction:1,label:'Commande de chauffe'});
 f.climate.state='cool';assert.deepEqual(f.model().appliedEffort(now),{percent:68,direction:-1,label:'Commande de refroidissement'});
 f.climate.state='off';assert.deepEqual(f.model().appliedEffort(now),{percent:68,direction:0,label:'Commande appliquée'});
});
test('effort preserves zero and refuses missing, invalid or stale publications',()=>{
 const f=fixture();f.sensor.attributes.live.power={applied_percent:0};assert.equal(f.model().appliedEffort(now).percent,0);
 for(const value of [null,undefined,NaN,Infinity,-1,101,true]){f.sensor.attributes.live.power.applied_percent=value;assert.equal(f.model().appliedEffort(now),null);}
 f.sensor.attributes.live.power.applied_percent=100;
 for(const time of [now-600001,now+60001]){f.sensor.last_updated=new Date(time).toISOString();assert.equal(f.model().appliedEffort(now),null);}
 f.sensor.last_updated=new Date(now).toISOString();f.climate.last_updated=new Date(now+1).toISOString();assert.equal(f.model().appliedEffort(now),null);
 f.climate.last_updated=new Date(now-1).toISOString();f.sensor.state='unavailable';assert.equal(f.model().appliedEffort(now),null);
});
test('overshoot correction is independent of the remaining heating command',()=>{
 const f=fixture();f.sensor.attributes.live.temperature.indoor=20.3;f.sensor.attributes.live.power={applied_percent:12};
 assert.deepEqual(f.model().setpointPosition(now),{kind:'above',overshoot:true,direction:-1,gap:.3,target:20});
 assert.equal(f.model().appliedEffort(now).direction,1);
 f.sensor.attributes.live.power.applied_percent=0;assert.equal(f.model().setpointPosition(now).overshoot,true);
 f.sensor.attributes.live.temperature.indoor=19.2;assert.equal(f.model().setpointPosition(now).overshoot,false);
});
test('display alignment, cooling return and native Fahrenheit do not use Twin predictions',()=>{
 const f=fixture();delete f.sensor.attributes.live.analysis;
 f.sensor.attributes.live.temperature.indoor=19.98;assert.equal(f.model().setpointPosition(now).kind,'aligned');
 f.climate.state='cool';f.sensor.attributes.live.temperature.indoor=19.7;
 assert.deepEqual(f.model().setpointPosition(now),{kind:'below',overshoot:true,direction:1,gap:.3,target:20});
 f.climate.attributes.configuration.temperature_unit='°F';f.climate.attributes.temperature=68;f.sensor.attributes.live.temperature.indoor=67.5;
 assert.equal(f.model().setpointPosition(now).gap,.5);
 f.climate.state='off';assert.equal(f.model().setpointPosition(now),null);
});

test('routine climate attribute updates preserve a recent command and current-target gap',()=>{
 const f=fixture();f.sensor.attributes.live.power={applied_percent:42};
 f.climate.last_changed=new Date(now-60000).toISOString();
 f.climate.last_updated=new Date(now+1).toISOString();
 f.climate.attributes.hvac_action='idle';
 assert.equal(f.model().appliedEffort(now)?.percent,42);
 assert.equal(f.model().setpointPosition(now)?.gap,.8);
 f.climate.attributes.temperature=21;
 assert.equal(f.model().setpointPosition(now)?.gap,1.8);
 assert.equal(f.model().eta(false,now),null);
});
test('mode transitions wait for a diagnostic from the new mode',()=>{
 for(const mode of ['heat','cool','off']){
  const f=fixture();f.sensor.attributes.live.power={applied_percent:42};f.climate.state=mode;
  f.climate.last_changed=new Date(now+1).toISOString();
  assert.equal(f.model().appliedEffort(now),null);assert.equal(f.model().setpointPosition(now),null);
  f.sensor.last_updated=new Date(now+2).toISOString();
  assert.equal(f.model().appliedEffort(now)?.direction,mode==='heat'?1:mode==='cool'?-1:0);
 }
 for(const time of ['', 'invalid']){
  const f=fixture();f.sensor.attributes.live.power={applied_percent:42};f.climate.last_changed=time;
  assert.equal(f.model().appliedEffort(now),null);
 }
});
test('freshness refuses invalid clocks and unavailable bindings with an old mode timestamp',()=>{
 const f=fixture();f.sensor.attributes.live.power={applied_percent:42};
 f.climate.last_changed=new Date(now-60000).toISOString();
 for(const time of [NaN,Infinity,now+600001,now-60001]){
  assert.equal(f.model().appliedEffort(time),null);assert.equal(f.model().setpointPosition(time),null);
 }
 f.climate.state='unavailable';assert.equal(f.model().appliedEffort(now),null);
});
