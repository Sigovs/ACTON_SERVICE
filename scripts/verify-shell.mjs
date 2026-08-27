/**
 * Measures the hero and shell of our page against the live Acton pages at an
 * identical viewport, so "it looks smaller" can be settled with numbers rather
 * than screenshots of two differently sized windows.
 *
 * Needs Chrome listening on --remote-debugging-port; pass the page ws:// URL.
 *   node scripts/verify-shell.mjs ws://127.0.0.1:9335/devtools/page/<id> [width]
 */
const ws = new WebSocket(process.argv[2]);
let id = 0;
const pending = new Map();
const send = (m, p = {}) =>
  new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); }
});

/* Generic: find the h1, walk up to the full-width hero section, and read the
   visual title that sits above the h1. Works on any Acton internal page. */
const PROBE = `(function () {
  var h1 = document.querySelector('h1');
  if (!h1) return { error: 'no h1' };
  var vw = document.documentElement.clientWidth;
  var hero = h1;
  while (hero.parentElement && Math.round(hero.getBoundingClientRect().width) < vw) hero = hero.parentElement;
  var heroRect = hero.getBoundingClientRect();
  var heroCS = getComputedStyle(hero);

  // the visual page title: nearest preceding heading-ish element with a big font
  var title = null, best = 0;
  Array.prototype.forEach.call(hero.querySelectorAll('div,p,h1,h2,span'), function (el) {
    if (el.contains(h1) || el === h1) return;
    if (el.children.length) return;
    var t = (el.textContent || '').trim();
    if (!t) return;
    var fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs > best) { best = fs; title = el; }
  });

  var f = function (el) {
    if (!el) return null;
    var s = getComputedStyle(el), r = el.getBoundingClientRect();
    return {
      text: (el.textContent || '').trim().slice(0, 34),
      font: s.fontSize + '/' + s.fontWeight + '/' + s.lineHeight,
      family: s.fontFamily.split(',')[0].replace(/"/g, ''),
      color: s.color,
      x: Math.round(r.x), y: Math.round(r.y), h: Math.round(r.height)
    };
  };

  var crumb = document.querySelector('.breadcrumb .elementor-shortcode > span, .aaw-crumbs');

  return {
    url: location.pathname,
    heroBox: Math.round(heroRect.width) + 'x' + Math.round(heroRect.height),
    heroTop: Math.round(heroRect.top),
    heroMinH: heroCS.minHeight,
    heroPad: heroCS.paddingTop + ' / ' + heroCS.paddingBottom,
    heroRadius: heroCS.borderBottomRightRadius,
    title: f(title),
    h1: f(h1),
    crumb: f(crumb)
  };
})()`;

ws.addEventListener("open", async () => {
  await send("Page.enable");
  await send("Network.enable");
  await send("Network.setCacheDisabled", { cacheDisabled: true });
  await send("Emulation.setDeviceMetricsOverride", { width: +(process.argv[3] || 1440), height: 900, deviceScaleFactor: 1, mobile: false });
  const out = [];
  for (const url of [
    "https://www.actonautowerks.com/paint-protection-film/",
    "https://www.actonautowerks.com/service-maintenance/",
    "http://localhost:3002/",
  ]) {
    await send("Page.navigate", { url });
    await new Promise((r) => setTimeout(r, 9000));
    await send("Runtime.evaluate", { expression: "window.scrollTo(0,0)" });
    await new Promise((r) => setTimeout(r, 500));
    const r = await send("Runtime.evaluate", { expression: PROBE, returnByValue: true });
    out.push(r.result.value);
  }
  const label = ["PPF (live)", "S&M (live)", "OURS"];
  const rows = ["heroBox", "heroTop", "heroMinH", "heroPad", "heroRadius"];
  console.log("prop".padEnd(12) + label.map((l) => l.padEnd(24)).join(""));
  rows.forEach((k) => console.log(k.padEnd(12) + out.map((o) => String(o[k]).padEnd(24)).join("")));
  ["title", "h1", "crumb"].forEach((part) => {
    console.log("--- " + part);
    ["text", "font", "family", "color", "x", "y", "h"].forEach((k) => {
      console.log(("  " + k).padEnd(12) + out.map((o) => String(o[part] ? o[part][k] : "—").padEnd(24)).join(""));
    });
  });
  ws.close();
});
