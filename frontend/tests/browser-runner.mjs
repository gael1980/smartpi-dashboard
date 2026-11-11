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
  await send("Page.bringToFront");
  await send("Runtime.enable");
  await send("Emulation.setTimezoneOverride", { timezoneId: "UTC" });
  await send("Emulation.setLocaleOverride", { locale: "en-US" });
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
  checks.learningProgress = await run(`
    const meters = [...p.shadowRoot.querySelectorAll('.learn progress')];
    return meters.length === 2 && meters.every(meter => meter.max === 31)
      && meters[0].value === 9 && meters[1].value === 5
      && p.shadowRoot.querySelector('.learn').textContent.includes('premier palier 5');
  `);
  assert.ok(checks.learningProgress);
  assert.equal(checks.initial.charts, 3);
  assert.ok(checks.initial.canvas);
  assert.ok(checks.initial.rows > 5700);
  await run(`root.querySelector('[aria-label="Zoom avant"]').click();`);
  await settle();
  checks.zoom = await run(
    `return [...root.querySelectorAll('smartpi-time-chart')].every(c=>Math.abs(c.plot.scales.x.min-v.range[0])<.1&&Math.abs(c.plot.scales.x.max-v.range[1])<.1)&&Math.abs(v.range[1]-v.range[0]-12*3600)<.1;`,
  );
  assert.ok(checks.zoom);
  checks.trackingWindow = await run(
    `const summary=root.querySelector('.tracking');const chart=root.querySelector('smartpi-time-chart');const pairs=chart.samples.filter(s=>Number.isFinite(s.history.temperature?.indoor)&&Number.isFinite(s.history.setpoint?.filtered_setpoint)).length;return chart.samples.length>0&&summary.querySelector('dd').textContent===pairs+' / '+chart.samples.length&&summary.textContent.includes('Médiane absolue');`,
  );
  assert.ok(checks.trackingWindow);
  await run(
    `root.querySelector('smartpi-time-chart').shadowRoot.querySelector('.series-controls button').focus();`,
  );
  await send("Input.dispatchKeyEvent", {
    type: "keyDown",
    key: "Enter",
    code: "Enter",
    windowsVirtualKeyCode: 13,
    text: "\r",
    unmodifiedText: "\r",
  });
  await send("Input.dispatchKeyEvent", {
    type: "keyUp",
    key: "Enter",
    code: "Enter",
    windowsVirtualKeyCode: 13,
  });
  await settle();
  checks.keyboardLegend = await run(
    `return root.querySelector('smartpi-time-chart').plot.series[1].show===false && root.querySelector('smartpi-time-chart').shadowRoot.querySelector('.series-controls button').getAttribute('aria-pressed')==='false';`,
  );
  if (!checks.keyboardLegend)
    checks.legendDetails = await run(
      `const c=root.querySelector('smartpi-time-chart');return {button:c.shadowRoot.querySelector('.series-controls button').outerHTML,show:c.plot.series[1].show,hidden:[...c.hiddenCurves],focus:c.shadowRoot.activeElement?.outerHTML};`,
    );
  assert.ok(checks.keyboardLegend);
  checks.unrelatedUpdate = await run(
    `const charts=[...root.querySelectorAll('smartpi-time-chart')],plots=charts.map(c=>c.plot);p.hass={...fixture.hass,states:{...fixture.hass.states,'sensor.unrelated':{entity_id:'sensor.unrelated',state:'1',attributes:{}}}};await p.updateComplete;await v.updateComplete;await Promise.all(charts.map(c=>c.updateComplete));return charts.every((c,i)=>c.plot===plots[i]);`,
  );
  assert.ok(checks.unrelatedUpdate);
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
  checks.inspection = await run(`
    const event = [...root.querySelectorAll('.timeline button')].find(b => b.textContent.includes('Consigne filtrée 19 → 20'));
    event.click();
    await v.updateComplete;
    const charts = [...root.querySelectorAll('smartpi-time-chart')];
    await Promise.all(charts.map(c => c.updateComplete));
    const time = charts[0].selectedTime;
    const aligned = charts.every(c => c.selectedTime === time);
    const panel = root.querySelector('.publication');
    const recorder = panel.querySelector('time').dateTime === new Date(time * 1000).toISOString()
      && panel.textContent.includes('Recorder') && panel.textContent.includes('Non archivé')
      && !root.querySelector('.active-path');
    const gap = charts[0].samples.find(s => s.state === 'unavailable');
    charts[0].dispatchEvent(new CustomEvent('inspect-publication', { detail: gap.time, bubbles: true, composed: true }));
    await v.updateComplete;
    const unavailable = panel.textContent.includes('Indisponible') && !root.querySelector('.active-path');
    panel.querySelector('button').click();
    await v.updateComplete;
    const direct = panel.textContent.includes('Instantané SmartPI');
    const over = charts[0].shadowRoot.querySelector('.u-over');
    const x = Math.round(over.getBoundingClientRect().left + charts[0].plot.valToPos(time, 'x'));
    const clickedTime = charts[0].plot.data[0][charts[0].plot.posToIdx(x - over.getBoundingClientRect().left)];
    let emitted;
    charts[0].addEventListener('inspect-publication', e => emitted = e.detail, { once: true });
    over.dispatchEvent(new PointerEvent('pointerdown', { clientX: x, button: 0, bubbles: true }));
    over.dispatchEvent(new MouseEvent('click', { clientX: x, bubbles: true }));
    await v.updateComplete;
    const click = panel.querySelector('time').dateTime === new Date(clickedTime * 1000).toISOString();
    if (!click) throw Error(JSON.stringify({x, time, clickedTime, emitted, pointerStart: charts[0].pointerStart, current: panel.querySelector('time').dateTime, inspection:v.inspection, samePlot:over===charts[0].plot.over}));
    panel.querySelector('button').click();
    await v.updateComplete;
    return { aligned, recorder, unavailable, direct, click };
  `);
  assert.ok(Object.values(checks.inspection).every(Boolean));
  checks.blockDetails = await run(`
    const chart = root.querySelector('.command-chart smartpi-time-chart');
    const buttons = [...root.querySelectorAll('.synoptic button')];
    const block = (label) => buttons.find(b => b.textContent.trim() === label);
    for (const [label, series, detail] of [['PI', 3, 'Contribution PI'], ['Anticipation', 4, 'Anticipation retenue']]) {
      chart.shadowRoot.querySelectorAll('.series-controls button')[series - 1].click();
      if (chart.plot.series[series].show !== false) return false;
      block(label).click();
      await v.updateComplete;
      if (!chart.plot.series[series].show || !root.querySelector('#block-detail').textContent.includes(detail)) return false;
    }
    block('Modèle thermique').click();
    await v.updateComplete;
    return root.querySelector('#block-detail').textContent.includes('Pertes estimées B');
  `);
  assert.ok(checks.blockDetails);
  checks.sessionCalibration = await run(`
    const session = v.session;
    const time = v.range[1] - 30;
    v.session = [{ time, state: 'calibration', observedAt: true,
      history: { power: { applied_percent: 0 } },
      live: { control: { phase: 'Calibration' } } }];
    v.preferSession = true;
    await v.updateComplete;
    const chart = root.querySelectorAll('smartpi-time-chart')[1];
    await chart.updateComplete;
    const button = chart.shadowRoot.querySelector('tbody button');
    chart.shadowRoot.querySelector('details').open = true;
    button.focus();
    button.click();
    await v.updateComplete;
    const panel = root.querySelector('.publication');
    const verified = panel.textContent.includes('Observation de session') && panel.textContent.includes('0 %')
      && root.querySelector('.synoptic').textContent.includes('Voie directe déclarée');
    panel.querySelector('button').click();
    v.session = session;
    v.preferSession = false;
    await v.updateComplete;
    return verified;
  `);
  assert.ok(checks.sessionCalibration);
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
  await run(`window.scrollTo(0,0);`);
  await settle();
  await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false }).then((r) =>
    writeFile(output + "/overview.png", Buffer.from(r.data, "base64")),
  );
  await run(`v.tab='regulation';v.expert=true;`);
  await settle();
  checks.diagram = await run(
    `const d=root.querySelector('smartpi-control-diagram'),s=d.shadowRoot;s.querySelector('summary').click();const b=s.querySelector('[role="button"]');b.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));await d.updateComplete;return {blocks:s.querySelectorAll('[role="button"]').length,provenance:s.textContent.includes('attributes.live.setpoint.filtered_setpoint'),chain:root.querySelector('smartpi-command-chain').shadowRoot.textContent.includes('-4 %')};`,
  );
  assert.equal(checks.diagram.blocks, 8);
  assert.ok(checks.diagram.provenance);
  assert.ok(checks.diagram.chain);
  checks.piDetail = await run(
    `const d=root.querySelector('smartpi-control-diagram'),b=d.shadowRoot.querySelectorAll('g[role="button"]')[2];b.focus();b.dispatchEvent(new KeyboardEvent('keydown',{key:' ',bubbles:true}));await d.updateComplete;const detail=d.shadowRoot.querySelector('aside').textContent;return b.getAttribute('aria-pressed')==='true'&&d.shadowRoot.activeElement===b&&detail.includes('0,5 °C')&&detail.includes('0,8 °C')&&detail.includes('attributes.live.analysis.control.error_p')&&!!d.shadowRoot.querySelector('time[datetime]');`,
  );
  assert.ok(checks.piDetail);
  checks.liveSeparation = await run(`return !root.querySelector('.toolbar, .source, .tracking, .timeline')&&!!root.querySelector('smartpi-control-diagram');`);
  assert.ok(checks.liveSeparation);
  checks.liveRoutes = await run(`
    const d=root.querySelector('smartpi-control-diagram'),s=d.shadowRoot,base=d.diagnostic;
    const use=async live=>{d.diagnostic={...base,live};await d.updateComplete;};
    const live=structuredClone(base.live);
    live.power.applied_percent=0;
    live.power.current_cycle_percent=0;
    live.power.next_cycle_percent=28;
    live.analysis.control.forced_by_timing=true;
    await use(live);
    const timing=s.querySelector('.note').textContent.includes('Temporisation imposée') &&
      [...s.querySelectorAll('.snapshot dd')].at(-1).textContent==='0 %';
    s.querySelector('[data-block="applied"]').click();await d.updateComplete;
    const cycle=s.querySelector('aside').textContent.includes('Candidat au cycle suivant') &&
      s.querySelector('aside').textContent.includes('28 %');
    await use({...live, calibration:{state:'HeatUp'}});
    const calibration=s.querySelector('.route-badge').textContent.includes('Calibration') &&
      s.querySelectorAll('.step').length===2 && !s.querySelector('[data-block="limits"]') &&
      s.querySelector('aside h4').textContent.includes('Calibration');
    await use({power:{applied_percent:0}});
    const partial=!s.querySelector('.steps .arrow, svg path.flow') &&
      s.querySelector('.note').textContent.includes('Motif indisponible') &&
      [...s.querySelectorAll('.snapshot dd')].at(-1).textContent==='0 %';
    d.diagnostic=base; await d.updateComplete;
    s.querySelector('details').open=false;
    return {timing,cycle,calibration,partial};
  `);
  assert.ok(Object.values(checks.liveRoutes).every(Boolean), JSON.stringify(checks.liveRoutes));
  await run(`v.expert=false;await v.updateComplete;const d=root.querySelector('smartpi-control-diagram');await d.updateComplete;d.shadowRoot.querySelector('[data-block="limits"]').click();`);
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
  for (const tab of ["evolution", "regulation", "model", "learning"]) {
    await run(`v.tab='${tab}';`);
    await settle();
    checks.mobileViews[tab] = await evaluate(
      "document.documentElement.scrollWidth",
    );
    assert.equal(checks.mobileViews[tab], 390);
  }
  checks.learning = await run(`
    const chart = root.querySelector('smartpi-time-chart');
    await chart.updateComplete;
    const before = chart.marks;
    const filter = root.querySelector('[aria-label="Repères d’apprentissage"] button');
    filter.click();
    await v.updateComplete;
    const filtered = !before.some(mark => mark.kind === 'A' || mark.kind === 'B') && chart.marks.every(mark => mark.kind !== 'A') && chart.thermalPhases && root.querySelectorAll('smartpi-time-chart').length === 2;
    filter.click();
    await v.updateComplete;
    chart.scrollIntoView({block:'center'});
    return filtered && !!chart.shadowRoot.querySelector('canvas');
  `);
  assert.ok(checks.learning);
  await settle();
  await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false }).then((r) =>
    writeFile(output + "/learning-mobile.png", Buffer.from(r.data, "base64")),
  );
  await run(`v.tab='evolution';await v.updateComplete;root.querySelector('.tracking').scrollIntoView({block:'center'});`);
  await settle();
  await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false }).then((r) =>
    writeFile(output + "/tracking-mobile.png", Buffer.from(r.data, "base64")),
  );
  await run(`v.tab='regulation';await v.updateComplete;const d=root.querySelector('smartpi-control-diagram');await d.updateComplete;d.shadowRoot.querySelector('[data-block="command"]').click();await d.updateComplete;d.scrollIntoView();`);
  await settle();
  checks.mobileDirectDetail = await run(`const d=root.querySelector('smartpi-control-diagram'),detail=d.shadowRoot.querySelector('aside').textContent;return detail.includes('État de l’hystérésis')&&!detail.includes('Sortie PI publiée')&&d.shadowRoot.querySelectorAll('.block.inactive').length===3&&document.documentElement.scrollWidth===390;`);
  assert.ok(checks.mobileDirectDetail);
  await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false }).then((r) =>
    writeFile(output + "/diagram-mobile.png", Buffer.from(r.data, "base64")),
  );
  checks.supervisionShortcut = await run(`
    const {session,preferSession,followNow,range,end}=v;
    v.preferSession=true;await v.updateComplete;
    const time=Date.parse(v.diagnostic.lastUpdated)/1000;
    const sample={time,state:v.diagnostic.state,history:v.diagnostic.history,live:v.diagnostic.live};
    v.session=[{...sample,observedAt:true}];await v.updateComplete;
    root.querySelector('.open-supervision').click();await v.updateComplete;
    const missing=!v.inspection && root.textContent.includes('publication du direct est introuvable');
    v.tab='regulation';v.session=[sample];await v.updateComplete;
    root.querySelector('.open-supervision').click();await v.updateComplete;
    const selected=v.inspection?.time===time && v.inspection?.recorder===false &&
      root.querySelector('#inspection-title').textContent.includes('Publication sélectionnée');
    Object.assign(v,{session,preferSession,followNow,range,end});await v.updateComplete;
    return {missing,selected};
  `);
  assert.ok(Object.values(checks.supervisionShortcut).every(Boolean), JSON.stringify(checks.supervisionShortcut));
  await run(`v.tab='evolution';window.historyMode='error';await v.load();`);
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
    `const id='sensor.salon';fixture.hass.states[id]={...fixture.hass.states[id],last_updated:new Date(Date.now()+500).toISOString()};p.hass={...fixture.hass,states:{...fixture.hass.states}};`,
  );
  await settle();
  checks.sessionVisible = await run(
    `const last=v.session.at(-1);return [...root.querySelectorAll('smartpi-time-chart')].every(c=>c.samples.includes(last));`,
  );
  assert.ok(checks.sessionVisible);
  await run(`root.querySelector('[aria-label="Zoom avant"]').click();`);
  await settle();
  checks.sessionPaused = await run(
    `const before=[...v.range],id='sensor.salon';fixture.hass.states[id]={...fixture.hass.states[id],last_updated:new Date(Date.now()+800).toISOString()};p.hass={...fixture.hass,states:{...fixture.hass.states}};await p.updateComplete;await v.updateComplete;return v.range[0]===before[0]&&v.range[1]===before[1]&&!v.followNow;`,
  );
  assert.ok(checks.sessionPaused);
  await run(`v.reset();`);
  await settle();
  await run(
    `const id='sensor.salon';fixture.hass.states[id]={...fixture.hass.states[id],state:'unavailable',last_updated:new Date(Date.now()+1000).toISOString()};p.hass={...fixture.hass,states:{...fixture.hass.states}};`,
  );
  await settle();
  checks.reactivity = await run(
    `const charts=[...root.querySelectorAll('smartpi-time-chart')];return v.session.some(s=>s.state==='unavailable'&&Object.keys(s.history).length===0)&&charts.every(c=>c.samples.some(s=>s.state==='unavailable'));`,
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
