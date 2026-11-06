import test from 'node:test';
import assert from 'node:assert/strict';
import {discover, inBootstrap, explanations, reliableValue, at} from '../.build-tests/adapter.mjs';
const id = 'sensor.any_name';
const sensor = {entity_id:id,state:'stable',attributes:{schema_version:2,live:{control:{mode:'smartpi'},power:{applied_percent:0}},history:{}}};
test('SmartPI and incomplete diagnostics remain discoverable',()=>{
 const [d]=discover({states:{[id]:sensor}});
 assert.equal(inBootstrap(d),false); assert.equal(at(d.live,'power.applied_percent'),0);
 assert.doesNotMatch(explanations(d).join(' '),/hystérésis/);
 assert.equal(discover({states:{[id]:{...sensor,attributes:{schema_version:2,live:{},history:{}}}}}).length,1);
});
test('unknown and unavailable never expose stale live values',()=>{
 for(const state of ['unknown','unavailable']){
 const [d]=discover({states:{[id]:{...sensor,state}}});
 assert.equal(d.available,false); assert.equal(at(d.live,'power.applied_percent'),undefined);
 assert.match(explanations(d)[0],/indisponible/);
 }
});
test('reliability is affirmative and preserves zero',()=>{
 for(const tau_reliable of [false,undefined,null,'true'])
 assert.equal(reliableValue({model:{tau_min:9999,tau_reliable}},'model.tau_min','model.tau_reliable'),undefined);
 assert.equal(reliableValue({model:{tau_min:0,tau_reliable:true}},'model.tau_min','model.tau_reliable'),0);
});
test('Twin predictions require reliable model outside warmup',()=>{
 const v={analysis:{twin:{twin_model_reliable:false,twin_warming_up:false,twin_T_pred:50}}};
 assert.equal(reliableValue(v,'analysis.twin.twin_T_pred'),undefined);
 v.analysis.twin.twin_model_reliable=true;
 assert.equal(reliableValue(v,'analysis.twin.twin_T_pred'),50);
 v.analysis.twin.twin_warming_up=true;
 assert.equal(reliableValue(v,'analysis.twin.twin_T_pred'),undefined);
});
