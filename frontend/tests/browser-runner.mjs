/** Isolated Chrome CDP test runner. Serve repository on loopback port 8765 first. */
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const endpoint = process.env.SMARTPI_CDP_URL ?? "http://127.0.0.1:9224";
const output =
  process.env.SMARTPI_BROWSER_OUTPUT ?? "/private/tmp/smartpi-browser-evidence";
const pause = (ms) => new Promise((r) => setTimeout(r, ms));
let target;
for (let n = 0; n < 30; n++) {
  try {
    target = await (
      await fetch(endpoint + "/json/new?about:blank", { method: "PUT" })
    ).json();
    break;
  } catch {
    await pause(300);
  }
}
assert.ok(target, "Start isolated Chrome with remote debugging enabled");
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => socket.addEventListener("open", r, { once: true }));
let id = 0;
const pending = new Map(),
  errors = [];
socket.addEventListener("message", (e) => {
  const r = JSON.parse(e.data);
  if (r.method === "Runtime.exceptionThrown")
    errors.push(r.params.exceptionDetails);
  if (r.id && pending.has(r.id)) {
    const p = pending.get(r.id);
    pending.delete(r.id);
    clearTimeout(p.timer);
    r.error ? p.reject(r.error) : p.resolve(r.result);
  }
});
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const key = ++id;
    const timer = setTimeout(() => {
      pending.delete(key);
      reject(Error("Timeout " + method));
    }, 10000);
    pending.set(key, { resolve, reject, timer });
    socket.send(JSON.stringify({ id: key, method, params }));
  });
}
async function evaluate(expression) {
  const r = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (r.exceptionDetails) throw Error(JSON.stringify(r.exceptionDetails));
  return r.result.value;
}
const context = `const p=fixture.panel,v=p.shadowRoot.querySelector('smartpi-visual-diagnostics'),root=v.shadowRoot;`;
const run = (script) => evaluate(`(async()=>{${context}${script}})()`);
async function settle() {
  await pause(80);
}
async function waitLoaded() {
  for (let n = 0; n < 50; n++) {
    if (
      await evaluate(
        `!!window.fixture && !fixture.panel.shadowRoot.querySelector('smartpi-visual-diagnostics')?.loading`,
      )
    )
      return;
    await pause(100);
  }
  throw Error("History did not settle");
}
const checks = {};
try {
  await mkdir(output, { recursive: true });
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-color-scheme", value: "light" }],
  });
  await send("Page.navigate", {
    url: "http://127.0.0.1:8765/frontend/tests/visual-browser.html",
  });
  await waitLoaded();
  checks.initial = await run(
    `return {reads:fixture.counts.reads,writes:fixture.counts.writes,charts:root.querySelectorAll('smartpi-time-chart').length,rows:v.recorder.length,canvas:[...root.querySelectorAll('smartpi-time-chart')].every(c=>!!c.shadowRoot.querySelector('canvas'))};`,
  );
  assert.equal(checks.initial.reads, 4);
  assert.equal(checks.initial.writes, 0);
  assert.equal(checks.initial.charts, 3);
  assert.ok(checks.initial.canvas);
  assert.ok(checks.initial.rows > 5700);
  await run(`root.querySelector('[aria-label="Zoom avant"]').click();`);
  await settle();
  checks.zoom = await run(
    `return [...root.querySelectorAll('smartpi-time-chart')].every(c=>Math.abs(c.plot.scales.x.min-v.range[0])<.1&&Math.abs(c.plot.scales.x.max-v.range[1])<.1)&&Math.abs(v.range[1]-v.range[0]-12*3600)<.1;`,
  );
  assert.ok(checks.zoom);
  await run(
    `const c=root.querySelector('smartpi-time-chart');c.plot.setSeries(1,{show:false});root.querySelector('[aria-label="Période précédente"]').click();`,
  );
  await settle();
  checks.legend = await run(
    `return root.querySelector('smartpi-time-chart').plot.series[1].show===false;`,
  );
  assert.ok(checks.legend);
  await run(
    `const c=root.querySelector('smartpi-time-chart');c.plot.setScale('x',{min:v.range[0]+300,max:v.range[1]-300});`,
  );
  await settle();
  checks.dragRange = await run(
    `return [...root.querySelectorAll('smartpi-time-chart')].every(c=>Math.abs(c.plot.scales.x.min-v.range[0])<.1);`,
  );
  assert.ok(checks.dragRange);
  await run(`v.hours=48;v.reset();`);
  await settle();
  checks.science = await run(
    `const charts=[...root.querySelectorAll('smartpi-time-chart')];return {gaps:charts[0].plot.data[1].some(x=>x===null),fullRange:charts[1].plot.scales.y.max>100&&charts[1].plot.scales.y.min<0,source:root.textContent.includes('Recorder · historique persistant'),event:root.textContent.includes('Consigne filtrée 19 → 20')};`,
  );
  assert.ok(Object.values(checks.science).every(Boolean));
  await run(
    `const c=root.querySelector('smartpi-time-chart'),over=c.shadowRoot.querySelector('.u-over'),r=over.getBoundingClientRect();over.dispatchEvent(new MouseEvent('mousemove',{clientX:r.left+100,clientY:r.top+80,bubbles:true}));`,
  );
  await settle();
  checks.cursor = await run(
    `return [...root.querySelectorAll('smartpi-time-chart')].map(c=>c.plot.cursor.left);`,
  );
  assert.ok(checks.cursor.every((n) => Math.abs(n - checks.cursor[0]) < 2));
  await run(
    `root.querySelector('smartpi-time-chart').plot.setSeries(1,{show:true});v.scrollIntoView();`,
  );
  await settle();
  await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  }).then((r) =>
    writeFile(output + "/desktop.png", Buffer.from(r.data, "base64")),
  );
  await run(`v.tab='regulation';v.expert=true;`);
  await settle();
  checks.diagram = await run(
    `const d=root.querySelector('smartpi-control-diagram'),b=d.shadowRoot.querySelector('[role="button"]');b.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));await d.updateComplete;return {blocks:d.shadowRoot.querySelectorAll('[role="button"]').length,provenance:d.shadowRoot.textContent.includes('attributes.live.setpoint.filtered_setpoint'),chain:root.querySelector('smartpi-command-chain').shadowRoot.textContent.includes('-4 %')};`,
  );
  assert.equal(checks.diagram.blocks, 8);
  assert.ok(checks.diagram.provenance);
  assert.ok(checks.diagram.chain);
  await run(`root.querySelector('smartpi-control-diagram').scrollIntoView();`);
  await settle();
  await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  }).then((r) =>
    writeFile(output + "/diagram.png", Buffer.from(r.data, "base64")),
  );
  await run(`p.shadowRoot.querySelectorAll('.tile')[1].click();`);
  await settle();
  await waitLoaded();
  checks.navigation = await run(
    `const d=root.querySelector('smartpi-control-diagram');return d.diagnostic.entityId==='sensor.salon'&&d.shadowRoot.textContent.includes('PI/FF contournés')&&d.shadowRoot.querySelectorAll('.inactive').length>=2;`,
  );
  assert.ok(checks.navigation);
  await run(`v.tab='model';`);
  await settle();
  checks.model = await run(
    `return root.querySelectorAll('smartpi-time-chart').length===2&&!root.textContent.includes('120 °C')&&root.textContent.includes('Aucune courbe Twin');`,
  );
  assert.ok(checks.model);
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await send("Emulation.setEmulatedMedia", {
    features: [
      { name: "prefers-color-scheme", value: "dark" },
      { name: "prefers-reduced-motion", value: "reduce" },
    ],
  });
  await settle();
  await run(`v.scrollIntoView();`);
  await settle();
  checks.mobile = await evaluate(
    `({width:document.documentElement.scrollWidth,viewport:innerWidth})`,
  );
  assert.equal(checks.mobile.width, 390);
  await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  }).then((r) =>
    writeFile(output + "/mobile.png", Buffer.from(r.data, "base64")),
  );
  checks.mobileViews = {};
  for (const tab of ["evolution", "regulation", "model"]) {
    await run(`v.tab='${tab}';`);
    await settle();
    checks.mobileViews[tab] = await evaluate(
      "document.documentElement.scrollWidth",
    );
    assert.equal(checks.mobileViews[tab], 390);
  }
  await run(`window.historyMode='error';await v.load();`);
  await settle();
  checks.permission = await run(
    `return root.textContent.includes('refusée ou impossible')&&root.textContent.includes('Historique de session');`,
  );
  assert.ok(checks.permission);
  await run(`window.historyMode='empty';await v.load();v.tab='evolution';`);
  await settle();
  checks.empty = await run(
    `return root.textContent.includes('aucune série v2 exploitable')&&root.textContent.includes('Historique de session');`,
  );
  assert.ok(checks.empty);
  await run(
    `const id='sensor.salon';fixture.hass.states[id]={...fixture.hass.states[id],state:'unavailable',last_updated:new Date(Date.now()+1000).toISOString()};p.hass={...fixture.hass,states:{...fixture.hass.states}};`,
  );
  await settle();
  checks.reactivity = await run(
    `return v.session.some(s=>s.state==='unavailable'&&Object.keys(s.history).length===0);`,
  );
  assert.ok(checks.reactivity);
  checks.cleanup = await run(
    `v.tab='evolution';await v.updateComplete;const charts=[...root.querySelectorAll('smartpi-time-chart')];p.remove();return charts.every(c=>!c.plot&&!c.observer)&&p.sessionHistory.get('sensor.salon').length===0;`,
  );
  assert.ok(checks.cleanup);
  assert.equal(await evaluate("fixture.counts.writes"), 0);
  assert.deepEqual(errors, []);
  await writeFile(
    output + "/checks.json",
    JSON.stringify(checks, null, 2) + "\n",
  );
  console.log(JSON.stringify(checks, null, 2));
} catch (error) {
  await writeFile(
    output + "/failure.json",
    JSON.stringify({ checks, error: String(error) }, null, 2),
  ).catch(() => {});
  console.log(JSON.stringify(checks, null, 2));
  await send("Runtime.terminateExecution").catch(() => {});
  console.error(error);
  process.exitCode = 1;
} finally {
  await send("Page.close").catch(() => {});
  socket.close();
}
