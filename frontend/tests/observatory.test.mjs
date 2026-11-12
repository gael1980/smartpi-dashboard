import test from 'node:test';
import assert from 'node:assert/strict';
import {discover} from '../.build-tests/adapter.mjs';
import {ThermalJourney} from '../.build-tests/utils/thermal-journey.mjs';
import {DecisionPresentation} from '../.build-tests/utils/decision.mjs';
import {ObservatoryClient} from '../.build-tests/services/observatory.mjs';
import {applyClimateChoice} from '../.build-tests/services/climate.mjs';

function fixture(){
 const sensor={entity_id:'sensor.example',state:'stable',attributes:{schema_version:2,live:{temperature:{indoor:19},power:{applied_percent:100}},history:{}}};
 const climate={entity_id:'climate.example',state:'heat',attributes:{temperature:20,min_temp:7,max_temp:30,target_temp_step:.5,supported_features:17,preset_mode:'comfort',preset_modes:['none','eco','comfort'],configuration:{temperature_unit:'°C'},specific_states:{regulation_diagnostics:sensor.entity_id,messages:[]},requested_state:{target_temperature:21,preset:'comfort',hvac_mode:'heat'}}};
 const calls=[],metadata=[];const hass={states:{[sensor.entity_id]:sensor,[climate.entity_id]:climate},callService:async(...args)=>calls.push(args),callWS:async msg=>{metadata.push(msg);return msg.action==='receipt_begin'?{id:'receipt-1'}:{}}};
 const d=()=>discover(hass)[0],model=()=>new ThermalJourney(hass,d()),view=()=>new DecisionPresentation(model());
 return{sensor,climate,hass,calls,metadata,d,model,view};
}
test('authority reads requested vs retained target and translates only published reasons',()=>{
 const f=fixture();f.climate.state='off';f.climate.attributes.specific_states.hvac_off_reason='hvac_off_window_detection';f.climate.attributes.specific_states.messages=['safety_detected','unknown_future_reason'];
 const v=f.view();assert.equal(v.requestedTemperature,21);assert.equal(v.model.target,20);assert.match(v.reasons[0].label,/Fenêtre/);assert.ok(v.reasons.some(r=>r.label==='unknown_future_reason'));
 f.climate.attributes.specific_states={regulation_diagnostics:'sensor.example'};assert.deepEqual(f.view().reasons,[]);
});
test('a stale off reason is not presented as an active priority while heating',()=>{
 const f=fixture();f.climate.attributes.specific_states.hvac_off_reason='hvac_off_window_detection';assert.deepEqual(f.view().reasons,[]);
});
test('maximum-command advice is limited to a higher heat target and exactly published 100%',()=>{
 const f=fixture();assert.match(f.view().advice({kind:'temperature',value:21}).join(' '),/déjà à 100/);
 for(const applied of [99,0,null,undefined]){f.sensor.attributes.live.power.applied_percent=applied;assert.doesNotMatch(f.view().advice({kind:'temperature',value:21}).join(' '),/déjà à 100/);}
 f.sensor.attributes.live.power.applied_percent=100;f.climate.state='cool';assert.doesNotMatch(f.view().advice({kind:'temperature',value:21}).join(' '),/déjà à 100/);
});
test('inhibition and priorities require affirmative published state, not temperature gap',()=>{
 const f=fixture();assert.deepEqual(f.view().reasons,[]);f.climate.attributes.specific_states.inhibition={inhibited:true};assert.equal(f.view().reasons[0].code,'hvac_off_inhibition');
 assert.match(f.view().advice({kind:'temperature',value:21}).join(' '),/priorité/);
 f.sensor.state='unavailable';assert.deepEqual(f.view().reasons,[]);assert.deepEqual(f.view().advice({kind:'temperature',value:21}),[]);
});
test('metadata uses one bound admin endpoint without generic service or external network',async()=>{
 const f=fixture();await new ObservatoryClient(f.hass).request('sensor.example','bookmark_save',{label:'Lecture'});
 assert.deepEqual(f.metadata,[{type:'smartpi_dashboard/observatory',entity_id:'sensor.example',action:'bookmark_save',payload:{label:'Lecture'}}]);assert.deepEqual(f.calls,[]);
 await assert.rejects(new ObservatoryClient(f.hass).request('climate.other','get'));
 assert.throws(()=>ObservatoryClient.room([]),/non reconnue/);
});
test('receipt surrounds the command but never substitutes a thermostat write',async()=>{
 const f=fixture();const result=await applyClimateChoice(f.hass,f.d(),{kind:'temperature',value:21},f.model().context);
 assert.equal(result.receipt,'receipt-1');assert.equal(f.calls.length,1);assert.deepEqual(f.metadata.map(m=>m.action),['receipt_begin','receipt_finish']);assert.equal(f.metadata[1].payload.success,true);
});
test('metadata refusal does not fabricate a receipt or duplicate the climate action',async()=>{
 const f=fixture();f.hass.callWS=async()=>{throw Error('permission denied')};
 const result=await applyClimateChoice(f.hass,f.d(),{kind:'preset',value:'eco'},f.model().context);assert.equal(result.receipt,null);assert.equal(f.calls.length,1);
});
test('state changed while receipt was being saved prevents the command',async()=>{
 const f=fixture();f.hass.callWS=async msg=>{f.metadata.push(msg);if(msg.action==='receipt_begin'){f.climate.attributes.temperature=22;return{id:'receipt-1'}}return{}};
 await assert.rejects(applyClimateChoice(f.hass,f.d(),{kind:'temperature',value:21},f.model().context),/changé avant/);
 assert.equal(f.calls.length,0);assert.equal(f.metadata.at(-1).payload.not_sent,true);
});
test('replacement of the frontend hass object is checked before command dispatch',async()=>{
 const f=fixture();let current=true;f.hass.callWS=async msg=>{f.metadata.push(msg);if(msg.action==='receipt_begin'){current=false;return{id:'receipt-1'}}return{}};
 await assert.rejects(applyClimateChoice(f.hass,f.d(),{kind:'temperature',value:21},f.model().context,()=>current),/changé avant/);assert.equal(f.calls.length,0);
});

test('malformed metadata responses fail before nested fields reach rendering',()=>{
 const empty={current:null,bookmarks:[],receipts:[],trials:[],forecasts:[]};
 assert.deepEqual(ObservatoryClient.room(empty),empty);
 for(const change of [{receipts:[{id:'bad'}]}, {trials:[{id:'bad',summary:null}]}, {bookmarks:[{id:'bad',label:{html:'<img>'}}]}, {forecasts:[{id:'bad',eta_s:Infinity}]}, {bookmarks:Array(31).fill({})}])
  assert.throws(()=>ObservatoryClient.room({...empty,...change}),/non reconnue/);
});
test('the selected value cannot be replaced through the caller during metadata await',async()=>{
 const f=fixture(),choice={kind:'temperature',value:21};
 f.hass.callWS=async msg=>{if(msg.action==='receipt_begin'){choice.value=999;return{id:'receipt-1'}}return{}};
 await applyClimateChoice(f.hass,f.d(),choice,f.model().context);
 assert.equal(f.calls[0][2].temperature,21);
});
test('unexpected runtime choice kinds never dispatch a preset service',async()=>{
 const f=fixture();await assert.rejects(applyClimateChoice(f.hass,f.d(),{kind:'unknown',value:21},f.model().context));assert.equal(f.calls.length,0);
});
test('metadata write timeout remains uncertain and never retries itself',async t=>{
 const f=fixture();t.mock.timers.enable({apis:['setTimeout']});
 f.hass.callWS=msg=>{f.metadata.push(msg);return new Promise(()=>{})};
 const request=new ObservatoryClient(f.hass).request('sensor.example','bookmark_save',{label:'Lent'});
 const rejected=assert.rejects(request,/non confirmé/);t.mock.timers.tick(8000);await rejected;
 assert.equal(f.metadata.length,1);assert.equal(f.calls.length,0);t.mock.timers.reset();
});
test('HA websocket errors are presented as actionable messages',async()=>{
 const f=fixture();f.hass.callWS=async()=>{throw{code:'storage_error',message:'Sauvegarde non confirmée.'}};
 await assert.rejects(new ObservatoryClient(f.hass).request('sensor.example','bookmark_save',{label:'Test'}),/Sauvegarde non confirmée/);
});
test('unknown codes and preset identifiers do not resolve Object prototype properties',()=>{
 const f=fixture();f.climate.attributes.specific_states.messages=['constructor','__proto__'];
 assert.deepEqual(f.view().reasons.map(r=>r.label),['constructor','__proto__']);
 f.climate.attributes.preset_modes=['constructor'];assert.equal(f.model().presets[0].label,'constructor');
});
