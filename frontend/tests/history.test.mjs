import test from "node:test";
import assert from "node:assert/strict";
import {
  decodeRows,
  observedEvents,
  valueAt,
  SessionHistory,
  normalize,
  usable,
} from "../.build-tests/utils/timeseries.mjs";
import { readHistory } from "../.build-tests/services/history.mjs";
import { ControlPresentation } from "../.build-tests/utils/control.mjs";
const row = (
  lu,
  s = "stable",
  history = {
    temperature: { indoor: 18 },
    setpoint: { filtered_setpoint: 19 },
    power: { pi_percent: 0 },
    model: { a: 0.01, b: 0.001 },
  },
) => ({ lu, s, a: { schema_version: 2, history } });
test("compressed Recorder shape, sorting, duplicates, zeros, missing values and explicit gaps", () => {
  const samples = decodeRows([
    row(120),
    row(60),
    row(120),
    row(180, "unavailable"),
    { ...row(240), a: { schema_version: 1, history: {} } },
  ]);
  assert.deepEqual(
    samples.map((s) => s.time),
    [60, 120, 180, 240],
  );
  assert.equal(valueAt(samples[0], "power.pi_percent"), 0);
  assert.equal(valueAt(samples[2], "temperature.indoor"), null);
  assert.equal(valueAt(samples[3], "temperature.indoor"), null);
  assert.equal(valueAt(samples[0], "error"), 1);
  assert.equal(
    valueAt(
      { ...samples[0], history: { temperature: { indoor: 18 } } },
      "error",
    ),
    null,
  );
});
test("timestamps require timezone; equivalent instants normalize across DST", () => {
  const a = decodeRows([
    {
      last_updated: "2026-10-25T02:30:00+02:00",
      state: "stable",
      attributes: row(1).a,
    },
    {
      last_updated: "2026-10-25T00:30:00Z",
      state: "stable",
      attributes: row(1).a,
    },
    { last_updated: "2026-10-25T02:30:00", attributes: row(1).a },
  ]);
  assert.equal(a.length, 1);
  assert.equal(a[0].time, Date.parse("2026-10-25T00:30:00Z") / 1000);
});
test("unsupported and empty response do not invent measurements", () => {
  assert.deepEqual(decodeRows([]), []);
  assert.throws(() => decodeRows({}));
  assert.equal(usable(decodeRows([row(1, "unknown")])), false);
});
test("events distinguish filtered setpoint variations and phase changes; no bridge across unavailable", () => {
  const samples = decodeRows([
    row(60, "bootstrap_hysteresis"),
    row(120),
    row(180, "unavailable"),
    row(240, "stable", { setpoint: { filtered_setpoint: 21 } }),
  ]);
  const events = observedEvents(samples);
  assert.equal(events.filter((e) => e.label.startsWith("Consigne")).length, 0);
  assert.ok(events.some((e) => e.label.includes("bootstrap_hysteresis")));
  assert.ok(events.every((e) => e.provenance.includes("observée")));
  const [a, b] = decodeRows([
    row(1),
    row(2, "stable", { setpoint: { filtered_setpoint: 19.1 } }),
  ]);
  assert.equal(
    observedEvents([a, b])[0].label,
    "Consigne filtrée 19 → 19.1 °C",
  );
});
test("Twin historical values require recorded live and reliability; history standard gives no Twin", () => {
  const [s] = decodeRows([row(1)]);
  assert.equal(valueAt(s, "live.analysis.twin.twin_T_pred"), null);
  s.live = {
    analysis: {
      twin: {
        twin_model_reliable: false,
        twin_warming_up: false,
        twin_T_pred: 22,
      },
    },
  };
  assert.equal(valueAt(s, "live.analysis.twin.twin_T_pred"), null);
});
test("official history read only, bounded windows, no initial fabricated boundary samples", async () => {
  const calls = [];
  const hass = {
    callWS: async (msg) => {
      calls.push(msg);
      return { "sensor.test": [row(Date.parse(msg.start_time) / 1000 + 1)] };
    },
  };
  const data = await readHistory(hass, "sensor.test", 1, 48 * 3600 + 1);
  assert.equal(data.length, 4);
  assert.equal(calls.length, 4);
  for (const c of calls) {
    assert.equal(c.type, "history/history_during_period");
    assert.equal(c.no_attributes, false);
    assert.equal(c.minimal_response, false);
    assert.equal(c.significant_changes_only, false);
    assert.equal(c.include_start_time_state, false);
    assert.deepEqual(c.entity_ids, ["sensor.test"]);
  }
  await assert.rejects(() => readHistory(hass, "sensor.test", 1, 49 * 3600));
  assert.equal(calls.length, 4);
});
test("errors and cancellation propagate without other API calls", async () => {
  await assert.rejects(
    () =>
      readHistory(
        {
          callWS: async () => {
            throw Error("unauthorized");
          },
        },
        "sensor.test",
        1,
        3,
      ),
    /unauthorized/,
  );
  await assert.rejects(
    () => readHistory({ callWS: async () => null }, "sensor.test", 1, 3),
    /Format/,
  );
  let count = 0;
  await assert.rejects(
    () =>
      readHistory(
        {
          callWS: async () => {
            count++;
            return {};
          },
        },
        "sensor.test",
        1,
        48 * 3600,
        () => true,
      ),
    /annulée/,
  );
  assert.equal(count, 0);
});
test("session begins at observation, deduplicates publications, does not poll, clears and prunes", () => {
  const cache = new SessionHistory(),
    id = "sensor.test",
    d = {
      entityId: id,
      state: "stable",
      available: true,
      live: {},
      history: { temperature: { indoor: 18 } },
    };
  const states = { [id]: { last_updated: "2026-11-06T00:00:00Z" } };
  const now = Date.parse("2026-11-06T02:00:00Z") / 1000;
  cache.collect([d], states, now);
  cache.collect([d], states, now + 1);
  assert.equal(cache.get(id).length, 1);
  assert.equal(cache.get(id)[0].time, now);
  states[id].last_updated = "2026-11-06T03:00:00Z";
  cache.collect([d], states, now + 3600);
  assert.equal(cache.get(id).length, 2);
  cache.collect([], {}, now + 4000);
  assert.equal(cache.get(id).length, 0);
  cache.clear();
  assert.equal(cache.get(id).length, 0);
});
test("control presentation preserves publication, no additive waterfall, bootstrap bypass and signed ratios", () => {
  const d = {
    available: true,
    live: {
      control: { mode: "hysteresis" },
      learning: { stage: "bootstrap" },
      power: {
        applied_percent: 100,
        command_percent: 0,
        pi_percent: 0,
        ff_percent: 0,
      },
      analysis: {
        feedforward: { u_ff2: -0.12, u_ff3: 1.5, u_ff_effective: 0.7 },
      },
    },
  };
  const view = new ControlPresentation(d);
  assert.equal(view.bypass, true);
  assert.equal(view.blocks().find((b) => b.id === "pi").status, "Contourné");
  assert.equal(
    view.blocks().find((b) => b.id === "command").path,
    "power.applied_percent",
  );
  assert.equal(view.chain().find((c) => c.label === "FF2").value, -12);
  assert.equal(view.chain().find((c) => c.label === "FF3").value, 150);
  d.live.control.mode = "smartpi";
  d.live.learning.stage = "learning";
  assert.equal(new ControlPresentation(d).bypass, false);
  d.live.calibration = { state: "HeatUp" };
  assert.equal(new ControlPresentation(d).bypass, true);
});

test("late session publications are discarded rather than moved to a fabricated timestamp", () => {
  const cache = new SessionHistory(),
    id = "sensor.test",
    d = {
      entityId: id,
      state: "stable",
      available: true,
      live: {},
      history: { temperature: { indoor: 18 } },
    };
  cache.collect(
    [d],
    { [id]: { last_updated: "2026-11-06T00:00:00Z" } },
    1793926800,
  );
  cache.collect(
    [d],
    { [id]: { last_updated: "2026-11-06T00:30:00Z" } },
    1793926860,
  );
  assert.equal(cache.get(id).length, 1);
});
test("unknown calibration state does not invent a direct path", () => {
  const v = new ControlPresentation({
    available: true,
    live: { calibration: { state: "unavailable" } },
  });
  assert.equal(v.bypass, false);
  assert.equal(v.route, "unavailable");
});

test("live block details keep measured, published and guarded values distinct", () => {
  const d = {
    available: true,
    live: {
      control: { mode: "smartpi", in_deadband: true },
      temperature: { error: 0.2 },
      power: { pi_percent: 0, ff_percent: 14, command_percent: 14 },
      model: { tau_min: 9999, tau_reliable: false },
      analysis: {
        control: { error_p: 0, aw_du: 0, forced_by_timing: false },
        feedforward: { u_ff_effective: 0.19 },
        twin: { twin_model_reliable: true, twin_warming_up: false, twin_T_pred: 19.2, twin_T_steady_reliable: false, twin_T_steady: 23 },
      },
    },
  };
  const view = new ControlPresentation(d);
  const block = (id) => view.blocks().find((b) => b.id === id);
  const field = (id, path) => view.detail(block(id), true).find((r) => r.path === path)?.value;
  assert.equal(block("pi").value, "0 %");
  assert.equal(field("pi", "analysis.control.error_p"), "0 °C");
  assert.equal(field("pi", "temperature.error"), "0,2 °C");
  assert.equal(block("ff").value, "14 %");
  assert.equal(field("ff", "analysis.feedforward.u_ff_effective"), "0,19 (ratio)");
  assert.equal(field("limits", "analysis.control.forced_by_timing"), "Non");
  assert.equal(field("model", "model.tau_min"), "Indisponible");
  assert.equal(field("model", "analysis.twin.twin_T_pred"), "19,2 °C");
  assert.equal(field("model", "analysis.twin.twin_T_steady"), "Indisponible");
  d.live.analysis.twin.twin_warming_up = true;
  assert.equal(field("model", "analysis.twin.twin_T_pred"), "Indisponible");
  d.live.calibration = { state: "HeatUp" };
  assert.equal(field("command", "power.pi_percent"), undefined);
  assert.equal(field("command", "calibration.state"), "HeatUp");
  assert.equal(block("limits").status, "Contourné");
  d.available = false;
  assert.equal(view.route, "unavailable");
  assert.equal(field("pi", "analysis.control.error_p"), "Indisponible");
});
