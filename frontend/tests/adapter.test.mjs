import test from "node:test";
import assert from "node:assert/strict";
import {at, num, display, discover, explanations, inBootstrap} from "../.build-tests/adapter.mjs";

const sensor = "sensor.thermostat_salon_smartpi_diagnostics";
const climate = "climate.example_room";
const live = {
  control: {mode: "hysteresis", in_deadtime_window: true},
  power: {applied_percent: 100, pi_percent: 0, ff_percent: 0},
  model: {a: 0.0005, b: 0.001, tau_min: 9999, tau_reliable: false},
  learning: {stage: "bootstrap"},
  feedforward: {ff3_status: "disabled:config_disabled"},
  analysis: {twin: {twin_T_steady_reliable: false}}
};
const s = {entity_id: sensor, state: "bootstrap_hysteresis", attributes: {
  friendly_name: "Thermostat Salon SmartPI Diagnostics", schema_version: 2, live,
  history: {temperature: {indoor: 18.26}}
}};
const hass = {states: {
  [sensor]: s,
  [climate]: {entity_id: climate, state: "heat", attributes: {
    friendly_name: "Salon",
    specific_states: {regulation_diagnostics: sensor}
  }}
}};
test("detects v2 sensors and explicit climate reference", () => {
  const d = discover(hass);
  assert.equal(d.length, 1);
  assert.equal(d[0].name, "Salon");
  assert.equal(d[0].climateId, climate);
  assert.equal(at(d[0].live, "power.applied_percent"), 100);
});
test("rejects unsupported schema and missing blocks", () => {
  const attrs = s.attributes;
  assert.equal(discover({states: {[sensor]: {...s, attributes: {...attrs, schema_version: 1}}}}).length, 0);
  assert.equal(discover({states: {[sensor]: {...s, attributes: {...attrs, live: null}}}}).length, 0);
});
test("preserves zero and distinguishes unavailable values", () => {
  assert.equal(num(0), 0);
  assert.equal(num(NaN), null);
  assert.equal(display(0, " %"), "0 %");
  assert.equal(display(undefined), "Indisponible");
});
test("bootstrap explanations only use published flags", () => {
  const [d] = discover(hass);
  assert.equal(inBootstrap(d), true);
  const all = explanations(d).join(" ");
  assert.match(all, /hystérésis/);
  assert.match(all, /non fiable/);
  assert.match(all, /config_disabled/);
});
test("discovers a fifth sensor without a fixed entity list", () => {
  const extra = "sensor.thermostat_nouveau_smartpi_diagnostics";
  const d = discover({states: {...hass.states, [extra]: {...s, entity_id: extra}}});
  assert.equal(d.length, 2);
});
