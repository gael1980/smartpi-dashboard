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
  checks.scatterProjection = await run(`
    const xy=root.querySelector('smartpi-diagnostic-projection');await xy.updateComplete;
    return xy.kind==='scatter'&&xy.shadowRoot.querySelector('svg')?.getAttribute('aria-label').includes('600 points')&&
      xy.shadowRoot.textContent.includes('publications couplées')&&xy.shadowRoot.textContent.includes('600 publications réparties');
  `);
  assert.ok(checks.scatterProjection);
  await run(`const xy=root.querySelector('smartpi-diagnostic-projection');xy.shadowRoot.querySelector('input').focus();`);
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowLeft',code:'ArrowLeft',windowsVirtualKeyCode:37});
  await send('Input.dispatchKeyEvent',{type:'keyUp',key:'ArrowLeft',code:'ArrowLeft',windowsVirtualKeyCode:37});
  checks.scatterKeyboardInspection = await run(`
    const xy=root.querySelector('smartpi-diagnostic-projection');await xy.updateComplete;await v.updateComplete;
    const good=xy.selected>=0&&v.inspection?.time===xy.projection.points[xy.selected].time&&xy.shadowRoot.activeElement?.tagName==='INPUT';
    xy.selected=-1;v.inspection=undefined;await v.updateComplete;return good;
  `);
  assert.ok(checks.scatterKeyboardInspection);
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
  checks.liveSeparation = await run(`return !root.querySelector('.tracking, .timeline')&&!!root.querySelector('smartpi-control-diagram')&&!!root.querySelector('.toolbar')&&!!root.querySelector('.command-comparison smartpi-time-chart')&&root.textContent.includes('Le schéma reste l’instantané actuel');`);
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
  checks.modelProjection = await run(`const xy=root.querySelector('smartpi-diagnostic-projection');await xy.updateComplete;return xy.kind==='model'&&!!xy.shadowRoot.querySelector('svg')&&xy.shadowRoot.textContent.includes('la confiance actuelle ne valide pas le passé');`);
  assert.ok(checks.modelProjection);
  checks.projectionGapsAndBands = await evaluate(`(async()=>{
    const sample=(time,changes={})=>({time,state:'stable',history:{power:{command_percent:80,applied_percent:40},model:{a:.02,b:.001}},live:{},...changes});
    const data=[sample(100),sample(200,{state:'unavailable'}),sample(300),sample(1000)];
    const xy=document.createElement('smartpi-diagnostic-projection');xy.kind='model';xy.samples=data;document.body.append(xy);await xy.updateComplete;
    const separated=xy.shadowRoot.querySelectorAll('path.trajectory').length===3;
    const chart=document.createElement('smartpi-time-chart');chart.commandComparison=true;chart.percent=true;chart.range=[90,1100];chart.heading='Comparaison synthétique';chart.samples=data;
    chart.curves=[{label:'Demandée',path:'power.command_percent',color:'#d6892e',unit:'%',step:true},{label:'Appliquée',path:'power.applied_percent',color:'#2689ca',unit:'%',step:true}];
    document.body.append(chart);await chart.updateComplete;
    const bands=chart.plot?.bands.length===2&&chart.plot.data[1][1]===null&&chart.plot.data[2][1]===null&&chart.plot.series[1].gaps(chart.plot,1,0,3,[]).length>0;
    xy.remove();chart.remove();return separated&&bands&&!xy.observer&&!chart.observer&&!chart.plot;
  })()`);
  assert.ok(checks.projectionGapsAndBands);
  checks.commandBandPixels = await evaluate(`(async()=>{
    const chart=document.createElement('smartpi-time-chart');chart.commandComparison=true;chart.percent=true;chart.range=[0,6];chart.heading='Zone entre commandes';
    chart.curves=[{label:'Demandée',path:'power.command_percent',color:'#d6892e',unit:'%',step:true},{label:'Appliquée',path:'power.applied_percent',color:'#2689ca',unit:'%',step:true}];
    chart.samples=[1,2,3,4,5].map(time=>({time,state:'stable',live:{},history:{power:{command_percent:time<3?80:40,applied_percent:time<3?40:80}}}));
    document.body.append(chart);await chart.updateComplete;await new Promise(resolve=>requestAnimationFrame(resolve));
    const u=chart.plot,alpha=time=>u.ctx.getImageData(Math.round(u.valToPos(time,'x',true)),Math.round(u.valToPos(57,'y',true)),1,1).data[3];
    const values=[alpha(1.5),alpha(4.5)];chart.remove();return values;
  })()`);
  assert.ok(checks.commandBandPixels.every(alpha=>alpha>0),'Both directions of command difference must have a visible band');
  checks.analysisResponsive = {};
  for (const [width,height] of [[1440,1000],[390,844],[320,800]]) {
    await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<500});
    await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:width===1440?'light':'dark'},{name:'prefers-reduced-motion',value:'reduce'}]});
    for (const tab of ['evolution','regulation','model']) {
      await run(`v.tab='${tab}';await v.updateComplete;`);await settle();
      const bounds=await run(`const target=root.querySelector('${tab==='regulation'?'.command-comparison':'smartpi-diagnostic-projection'}');await target.updateComplete;target.scrollIntoView({block:'start'});const b=target.getBoundingClientRect();return {x:b.x+scrollX,y:b.y+scrollY,width:b.width,height:Math.min(b.height,1600)};`);
      const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{...bounds,scale:1}});
      await writeFile(output+'/analysis-'+tab+'-'+width+'.png',Buffer.from(shot.data,'base64'));
      checks.analysisResponsive[tab+'-'+width]=await evaluate('document.documentElement.scrollWidth<=innerWidth');
      assert.ok(checks.analysisResponsive[tab+'-'+width],'Analysis overflow '+tab+' '+width);
    }
  }
  await run(`v.tab='model';await v.updateComplete;`);
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
    `v.tab='evolution';await v.updateComplete;const charts=[...root.querySelectorAll('smartpi-time-chart')],xy=[...root.querySelectorAll('smartpi-diagnostic-projection')];p.remove();return charts.every(c=>!c.plot&&!c.observer)&&xy.every(c=>!c.observer)&&p.sessionHistory.get('sensor.salon').length===0;`,
  );
  assert.ok(checks.cleanup);
  assert.equal(await evaluate("fixture.counts.writes"), 0);
  // Separate synthetic scene: the two explicitly authorized climate actions.
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:'light'}]});
  await send("Page.navigate", {url: "http://127.0.0.1:8765/frontend/tests/thermal-browser.html"});
  for (let n = 0; n < 50; n++) {
    if (await evaluate("!!window.thermalFixture?.panel.shadowRoot.querySelector('smartpi-thermal-journey')?.shadowRoot")) break;
    await pause(100);
  }
  const journey = script => evaluate(`(async()=>{const f=thermalFixture,p=f.panel,j=p.shadowRoot.querySelector('smartpi-thermal-journey'),r=j.shadowRoot;${script}})()`);
  const sync = `f.publish();await p.updateComplete;await j.updateComplete;`;
  checks.journeyInitial = await journey(`return {calls:f.calls.length,eta:r.querySelector('.eta')?.textContent.includes('35 min'),target:r.querySelector('.destination').textContent.includes('20'),measured:r.querySelector('.measured').textContent.includes('19,2')};`);
  assert.equal(checks.journeyInitial.calls, 0);
  assert.ok(checks.journeyInitial.eta && checks.journeyInitial.target && checks.journeyInitial.measured);
  checks.journeyEffortProportion = await journey(`
    const results=[];
    for(const percent of [0,15,68,100]){
      f.sensor.attributes.live.power.applied_percent=percent;${sync}
      const meter=r.querySelector('[role=meter]'),arrow=r.querySelector('.effort-arrow');
      results.push(meter?.getAttribute('aria-valuenow')===String(percent)&&
        (percent===0?!arrow:Math.abs(arrow.getBoundingClientRect().width/meter.getBoundingClientRect().width-percent/100)<.001));
    }
    f.sensor.attributes.live.power.applied_percent=42;${sync}return results.every(Boolean)&&getComputedStyle(r.querySelector('.effort-arrow')).clipPath!=='none';
  `);
  assert.ok(checks.journeyEffortProportion);
  checks.journeyOvershootAndZero = await journey(`
    f.sensor.attributes.live.temperature.indoor=20.3;f.sensor.attributes.live.power.applied_percent=12;${sync}
    const positive=r.querySelector('.return-chevron')?.dataset.direction==='left'&&r.querySelector('.setpoint-position').textContent.includes('+0,3')&&
      !r.querySelector('.effort-arrow').classList.contains('reverse')&&r.querySelector('[role=meter]').getAttribute('aria-valuenow')==='12';
    f.sensor.attributes.live.power.applied_percent=0;${sync}
    const zero=!r.querySelector('.effort-arrow')&&r.querySelector('.return-chevron')?.dataset.direction==='left';
    f.sensor.attributes.live.temperature.indoor=20;${sync}
    const aligned=!!r.querySelector('.aligned-mark')&&!r.querySelector('.return-chevron')&&r.querySelector('.setpoint-position').textContent.includes('À la consigne affichée');
    f.climate.state='cool';f.sensor.attributes.live.temperature.indoor=19.7;f.sensor.attributes.live.power.applied_percent=68;${sync}
    const cool=r.querySelector('.return-chevron')?.dataset.direction==='right'&&!!r.querySelector('.effort-arrow.reverse');
    f.climate.state='heat';f.sensor.attributes.live.temperature.indoor=19.2;f.sensor.attributes.live.power.applied_percent=42;${sync}
    f.sensor.last_updated=new Date(Date.now()+1).toISOString();${sync}
    return positive&&zero&&aligned&&cool&&f.calls.length===0;
  `);
  assert.ok(checks.journeyOvershootAndZero);
  checks.journeyEffortMissing = await journey(`
    const oldTime=f.sensor.last_updated;const results=[];
    for(const value of [null,-1,101]){f.sensor.attributes.live.power.applied_percent=value;${sync}results.push(!r.querySelector('[role=meter]')&&!r.querySelector('.effort-arrow'));}
    f.sensor.attributes.live.power.applied_percent=42;f.sensor.last_updated=new Date(Date.now()-601000).toISOString();${sync}
    results.push(!r.querySelector('[role=meter]')&&!r.querySelector('.return-chevron'));
    f.sensor.last_updated=oldTime;${sync}return results.every(Boolean)&&!!r.querySelector('[role=meter]');
  `);
  assert.ok(checks.journeyEffortMissing);
  checks.journeyEffortExpiry = await journey(`
    const source=f.sensor.last_updated,climateTime=f.climate.last_updated;
    f.climate.last_updated=new Date(Date.now()-601000).toISOString();f.sensor.last_updated=new Date(Date.now()-599700).toISOString();${sync}
    const visible=!!r.querySelector('[role=meter]');await new Promise(resolve=>setTimeout(resolve,400));await j.updateComplete;
    const expired=!r.querySelector('[role=meter]');f.climate.last_updated=climateTime;f.sensor.last_updated=source;${sync}return visible&&expired;
  `);
  assert.ok(checks.journeyEffortExpiry);
  checks.journeyKeyboardFocus = await journey(`const input=r.querySelector('input');input.focus();const style=getComputedStyle(input);return r.activeElement===input&&style.outlineStyle==='solid'&&parseFloat(style.outlineWidth)>=3;`);
  assert.ok(checks.journeyKeyboardFocus);
  checks.journeyEtaAbsent = await journey(`
    const twin=f.sensor.attributes.live.analysis.twin;const results=[];
    for(const patch of [{twin_model_reliable:false},{twin_status:'unavailable'},{eta_s:null},{eta_reason:'too_far'},{twin_warming_up:true}]){
      const old={...twin};Object.assign(twin,patch);${sync}results.push(!r.querySelector('.eta'));Object.assign(twin,old);
    }${sync}return results.every(Boolean)&&!!r.querySelector('.eta');
  `);
  assert.ok(checks.journeyEtaAbsent);
  checks.journeyPreview = await journey(`
    const eco=[...r.querySelectorAll('.preset')].find(b=>b.textContent.includes('Éco'));eco.click();await j.updateComplete;
    const preview=r.querySelector('.preview')?.textContent.includes('17')&&!r.querySelector('.eta')&&f.calls.length===0&&r.querySelector('.destination').textContent.includes('20')&&r.querySelector('.setpoint-position').textContent.includes('Encore 0,8')&&r.querySelector('[role=meter]').getAttribute('aria-valuenow')==='42';
    r.querySelector('.actions button').click();await j.updateComplete;return preview&&!r.querySelector('.preview')&&!!r.querySelector('.eta');
  `);
  assert.ok(checks.journeyPreview);
  await journey(`r.querySelector('input').focus();`);
  await send("Input.dispatchKeyEvent", {type:"keyDown",key:"ArrowRight",code:"ArrowRight",windowsVirtualKeyCode:39});
  await send("Input.dispatchKeyEvent", {type:"keyUp",key:"ArrowRight",code:"ArrowRight",windowsVirtualKeyCode:39});
  checks.journeyKeyboard = await journey(`await j.updateComplete;return j.choice?.kind==='temperature'&&j.choice.value===20.5&&f.calls.length===0;`);
  assert.ok(checks.journeyKeyboard);
  checks.journeyStale = await journey(`f.climate.attributes.temperature=21;${sync}return !j.choice&&!r.querySelector('.preview')&&f.calls.length===0;`);
  assert.ok(checks.journeyStale);
  checks.journeyApply = await journey(`
    [...r.querySelectorAll('.preset')].find(b=>b.textContent.includes('Éco')).click();await j.updateComplete;
    r.querySelector('.apply').click();await j.updateComplete;await new Promise(resolve=>setTimeout(resolve,0));await j.updateComplete;
    return f.calls.length===1&&JSON.stringify(f.calls[0])===JSON.stringify(['climate','set_preset_mode',{entity_id:'climate.demo_salon',preset_mode:'eco'}])&&r.querySelector('.destination').textContent.includes('21')&&!j.choice;
  `);
  assert.ok(checks.journeyApply);
  checks.journeyTemperature = await journey(`
    r.querySelector('[aria-label="Augmenter la température"]').click();await j.updateComplete;r.querySelector('.apply').click();
    await new Promise(resolve=>setTimeout(resolve,0));await j.updateComplete;
    return f.calls.length===2&&JSON.stringify(f.calls[1])===JSON.stringify(['climate','set_temperature',{entity_id:'climate.demo_salon',temperature:21.5}]);
  `);
  assert.ok(checks.journeyTemperature);
  checks.journeyRefused = await journey(`
    f.setReject(true);r.querySelector('[aria-label="Augmenter la température"]').click();await j.updateComplete;r.querySelector('.apply').click();
    await new Promise(resolve=>setTimeout(resolve,0));await j.updateComplete;
    return f.calls.length===3&&r.querySelector('[role=status]').textContent.includes('refusée')&&!!r.querySelector('.preview');
  `);
  assert.ok(checks.journeyRefused);
  checks.journeyPending = await journey(`
    f.setReject(false);let resolve;f.setPending(new Promise(r=>resolve=r));r.querySelector('.apply').click();await j.updateComplete;
    r.querySelector('.apply').click();await new Promise(resolve=>setTimeout(resolve,0));const blocked=f.calls.length===4&&r.querySelector('.apply').disabled;
    f.climate.entity_id='climate.other';f.climate.attributes.specific_states.regulation_diagnostics='sensor.other';${sync}
    resolve();await new Promise(r=>setTimeout(r,0));await j.updateComplete;f.setPending(undefined);
    return blocked&&!r.querySelector('.preview')&&!r.querySelector('.eta')&&!r.querySelector('[role=status]').textContent.includes('Demande envoyée');
  `);
  assert.ok(checks.journeyPending);
  await journey(`f.climate.entity_id='climate.demo_salon';f.climate.attributes.specific_states.regulation_diagnostics=f.sensor.entity_id;f.climate.attributes.temperature=20;${sync}f.sensor.last_updated=new Date(Date.now()+1).toISOString();${sync}`);
  checks.journeyResponsive = {};
  for (const [width,height] of [[1440,1000],[390,844],[320,800]]) {
    await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<500});
    await settle();
    const bounds=await journey(`j.scrollIntoView({block:'start'});const b=j.getBoundingClientRect();return {x:b.x+scrollX,y:b.y+scrollY,width:b.width,height:b.height};`);
    const capture=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{...bounds,scale:1}});
    await writeFile(output+`/thermal-${width}.png`,Buffer.from(capture.data,'base64'));
    checks.journeyResponsive[width]=await journey(`return document.documentElement.scrollWidth<=innerWidth&&[...r.querySelectorAll('button')].filter(b=>!b.disabled).every(b=>b.getBoundingClientRect().height>=44);`);
    assert.ok(checks.journeyResponsive[width]);
  }
  for (const [scene,width,height,temp,percent,mode] of [
    ['heating',1440,1000,19.2,68,'heat'],['overshoot',390,844,20.3,12,'heat'],
    ['overshoot-zero',320,800,20.3,0,'heat'],['aligned',390,844,20,0,'heat'],['cooling',390,844,19.7,68,'cool']
  ]) {
    await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<500});
    await journey(`f.climate.state='${mode}';f.sensor.attributes.live.temperature.indoor=${temp};f.sensor.attributes.live.power.applied_percent=${percent};Object.assign(f.sensor.attributes.live.analysis.twin,{eta_s:${scene === 'heating' ? 2100 : 'null'},eta_reason:'${scene === 'heating' ? 'ok' : 'unavailable'}'});f.sensor.last_updated=new Date(Date.now()+1).toISOString();${sync}`);
    await settle();
    const bounds=await journey(`j.scrollIntoView({block:'start'});const b=j.getBoundingClientRect();return {x:b.x+scrollX,y:b.y+scrollY,width:b.width,height:b.height};`);
    const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{...bounds,scale:1}});
    await writeFile(output+'/effort-'+scene+'.png',Buffer.from(shot.data,'base64'));
    assert.ok(await journey(`return document.documentElement.scrollWidth<=innerWidth;`),'Effort scene overflow '+scene);
  }
  await journey(`f.climate.state='heat';f.sensor.attributes.live.temperature.indoor=19.2;f.sensor.attributes.live.power.applied_percent=42;Object.assign(f.sensor.attributes.live.analysis.twin,{eta_s:2100,eta_reason:'ok'});${sync}`);
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-color-scheme',value:'dark'},{name:'prefers-reduced-motion',value:'reduce'}]});
  await settle();
  const darkBounds=await journey(`const b=j.getBoundingClientRect();return {x:b.x+scrollX,y:b.y+scrollY,width:b.width,height:b.height};`);
  const dark=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{...darkBounds,scale:1}});
  await writeFile(output+'/thermal-dark-390.png',Buffer.from(dark.data,'base64'));
  const observatory = script => evaluate(`(async()=>{const f=thermalFixture,p=f.panel,j=p.shadowRoot.querySelector('smartpi-thermal-journey'),o=p.shadowRoot.querySelector('smartpi-observatory'),r=o.shadowRoot;${script}})()`);
  checks.observatoryLoaded = await observatory(`await o.refresh();await o.updateComplete;return !!o.room&&!o.error&&r.textContent.includes('Reçus de chauffe');`);
  assert.ok(checks.observatoryLoaded);
  const initialClimateCalls = await evaluate('thermalFixture.calls.length');
  checks.authorityAndAdvice = await observatory(`
    f.climate.state='off';f.climate.attributes.specific_states.hvac_off_reason='hvac_off_window_detection';f.climate.attributes.requested_state={target_temperature:21};f.publish();await p.updateComplete;await j.updateComplete;
    const authority=j.shadowRoot.querySelector('.authority').textContent.includes('Fenêtre ouverte');
    f.climate.state='heat';delete f.climate.attributes.specific_states.hvac_off_reason;f.sensor.attributes.live.power.applied_percent=100;f.publish();await p.updateComplete;await j.updateComplete;
    j.shadowRoot.querySelector('[aria-label="Augmenter la température"]').click();await j.updateComplete;
    const good=authority&&j.shadowRoot.querySelector('.advice').textContent.includes('déjà à 100');
    j.shadowRoot.querySelector('.actions button').click();delete f.climate.attributes.specific_states.hvac_off_reason;f.sensor.attributes.live.power.applied_percent=42;f.publish();await p.updateComplete;return good;
  `);
  assert.ok(checks.authorityAndAdvice);
  checks.comfortBookmark = await observatory(`
    r.querySelector('[data-view=bookmarks]').click();await o.updateComplete;
    const input=r.querySelector('#bookmark-name');input.value='Lecture du soir';r.querySelector('form').requestSubmit();
    await new Promise(resolve=>setTimeout(resolve,0));await o.updateComplete;
    const saved=r.textContent.includes('Lecture du soir')&&o.room.bookmarks.length===1;
    [...r.querySelectorAll('button')].find(b=>b.textContent.includes('Préparer')).click();await p.updateComplete;await j.updateComplete;
    const preview=!!j.shadowRoot.querySelector('.preview')&&j.choice.value===20;
    j.shadowRoot.querySelector('.actions button').click();await j.updateComplete;
    return saved&&preview;
  `);
  assert.ok(checks.comfortBookmark);
  checks.trialAndFeedback = await observatory(`
    r.querySelector('[data-view=trials]').click();await o.updateComplete;r.querySelector('#trial-name').value='Soirée à 20';r.querySelector('form').requestSubmit();
    await new Promise(resolve=>setTimeout(resolve,0));await o.updateComplete;
    const started=o.room.trials.length===1&&r.textContent.includes('Soirée à 20');
    [...r.querySelectorAll('button')].find(b=>b.textContent.includes('Terminer l’essai')).click();await new Promise(resolve=>setTimeout(resolve,0));await o.updateComplete;
    const select=r.querySelector('select');select.value='good';select.dispatchEvent(new Event('change',{bubbles:true}));await new Promise(resolve=>setTimeout(resolve,0));await o.updateComplete;
    return started&&o.room.trials[0].status==='finished'&&o.room.trials[0].feedback==='good';
  `);
  assert.ok(checks.trialAndFeedback);
  checks.trialComparison = await observatory(`
    const book=f.getBook(f.sensor.entity_id),first=book.trials[0];Object.assign(first.summary,{publications:12,minimum:19.5,maximum:20.1,last:20,max_abs_error:.5});
    book.trials.push({...structuredClone(first),id:'comparison-trial',label:'Autre soirée',target:19.5,outdoor:3,feedback:'cold'});
    await o.refresh();await o.updateComplete;[...r.querySelectorAll('.compare input')].forEach(box=>box.click());await o.updateComplete;
    return !!r.querySelector('table')&&r.querySelector('.comparison').textContent.includes('Conditions et durées peuvent différer');
  `);
  assert.ok(checks.trialComparison);
  checks.forecastNotebook = await observatory(`
    f.getBook(f.sensor.entity_id).forecasts=[{id:'forecast-ok',started_at:Date.now()/1000-2400,target:20,temperature:19.2,outdoor:8,unit:'°C',eta_s:1800,status:'reached',observed_s:2400,observed_at:Date.now()/1000},{id:'forecast-gap',started_at:Date.now()/1000-1000,target:21,temperature:19,unit:'°C',eta_s:3000,status:'excluded',reason:'Interruption de données supérieure à 10 min'}];
    await o.refresh();r.querySelector('[data-view=forecasts]').click();await o.updateComplete;
    return r.textContent.includes('30 min')&&r.textContent.includes('40 min')&&r.textContent.includes('Interruption de données')&&r.querySelector('.counts').textContent.includes('1 atteinte');
  `);
  assert.ok(checks.forecastNotebook);
  for (const [width,height] of [[1440,1000],[390,844],[320,800]]) {
    await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<500});
    for (const tab of ['receipts','bookmarks','trials','forecasts']) {
      await observatory(`r.querySelector('[data-view=${tab}]').click();await o.updateComplete;`);
      await settle();
      const bounds=await observatory(`o.scrollIntoView({block:'start'});const b=o.getBoundingClientRect();return {x:b.x+scrollX,y:b.y+scrollY,width:b.width,height:Math.min(b.height,1600)};`);
      const capture=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{...bounds,scale:1}});
      await writeFile(output+`/observatory-${tab}-${width}.png`,Buffer.from(capture.data,'base64'));
      assert.ok(await observatory(`return document.documentElement.scrollWidth<=innerWidth;`),'Observatory overflow '+tab+' '+width);
    }
  }
  checks.observatoryRefusal = await observatory(`f.setMetadataReject(true);await o.refresh();await o.updateComplete;const refused=r.textContent.includes('Stockage local refusé');f.setMetadataReject(false);await o.refresh();await o.updateComplete;return refused&&!o.error;`);
  assert.ok(checks.observatoryRefusal);
  checks.observatoryDelete = await observatory(`
    r.querySelector('[data-view=bookmarks]').click();await o.updateComplete;
    [...r.querySelectorAll('.entries button')].find(b=>b.textContent.trim()==='Supprimer').click();await new Promise(resolve=>setTimeout(resolve,0));await o.updateComplete;
    const removed=o.room.bookmarks.length===0;r.querySelector('.storage').open=true;
    [...r.querySelectorAll('.storage button')].find(b=>b.textContent.includes('Effacer les données')).click();await o.updateComplete;
    const armed=!![...r.querySelectorAll('button')].find(b=>b.textContent.includes('Confirmer l’effacement'));
    [...r.querySelectorAll('button')].find(b=>b.textContent.includes('Confirmer l’effacement')).click();await new Promise(resolve=>setTimeout(resolve,0));await o.updateComplete;
    return removed&&armed&&o.room.trials.length===0&&o.room.forecasts.length===0&&o.room.receipts.length===0;
  `);
  assert.ok(checks.observatoryDelete);
  checks.observatoryMalformedResponse = await observatory(`
    const book=f.getBook(f.sensor.entity_id);book.trials.push({id:'incomplete'});
    await o.refresh();await o.updateComplete;const refused=!!o.error&&r.textContent.includes('non reconnue');
    book.trials=[];await o.refresh();await o.updateComplete;return refused&&!o.error;
  `);
  assert.ok(checks.observatoryMalformedResponse);
  checks.observatoryTextEscaping = await observatory(`
    const label='<img src=x onerror="window.smartpiXss=true">';
    await o.mutate('bookmark_save',{label});r.querySelector('[data-view=bookmarks]').click();await o.updateComplete;
    const escaped=r.textContent.includes(label)&&!r.querySelector('img')&&!window.smartpiXss;
    await o.mutate('bookmark_delete',{id:o.room.bookmarks[0].id});return escaped;
  `);
  assert.ok(checks.observatoryTextEscaping);
  checks.observatoryReconnectDuringSave = await observatory(`
    const original=f.hass.callWS;let release;const gate=new Promise(resolve=>release=resolve);
    p.hass={...f.hass,callWS:async msg=>{if(msg.action==='bookmark_save')await gate;return original(msg)}};
    await p.updateComplete;await o.updateComplete;
    const saving=o.mutate('bookmark_save',{label:'Retour au panneau'});await o.updateComplete;
    const parent=o.parentNode,next=o.nextSibling;o.remove();parent.insertBefore(o,next);await o.updateComplete;
    release();await saving;await o.refresh();await o.updateComplete;
    const recovered=!o.saving&&!o.loading&&o.room.bookmarks.some(b=>b.label==='Retour au panneau');
    p.hass=f.hass;await p.updateComplete;await o.updateComplete;
    await o.mutate('bookmark_delete',{id:o.room.bookmarks.find(b=>b.label==='Retour au panneau').id});
    return recovered;
  `);
  assert.ok(checks.observatoryReconnectDuringSave);
  assert.equal(await evaluate('thermalFixture.calls.length'),initialClimateCalls,'Observatory metadata and bookmark previews must not issue climate commands');
  checks.journeyLocked = await journey(`f.climate.attributes.specific_states.is_locked=true;${sync}return !r.querySelector('input')&&[...r.querySelectorAll('button')].every(b=>b.disabled);`);
  assert.ok(checks.journeyLocked);
  checks.journeyMissing = await journey(`f.sensor.state='unavailable';${sync}return !r.querySelector('.eta')&&!r.querySelector('input')&&r.querySelector('.measured').textContent.includes('—')&&document.documentElement.scrollWidth<=innerWidth;`);
  assert.ok(checks.journeyMissing);
  assert.equal(errors.length, 0, JSON.stringify(errors.slice(0, 2).map(error => error.exception?.description ?? error.text)));
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
