/**
 * Builds a static client-preview snapshot into `.pages/`.
 *
 * The app builds to a Cloudflare SSR worker, which GitHub Pages cannot run.
 * This page has no server data — one route, no fetching — so a prerendered
 * snapshot is a faithful copy. The snapshot is path-relative, so it works
 * under a project-site base such as /ACTON_SERVICE/.
 *
 *   npm run build && node scripts/build-preview.mjs
 */
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist/client");
const OUT = path.join(ROOT, ".pages");
const PORT = 4399;
const WIN = process.platform === "win32";

if (!fs.existsSync(DIST)) {
  console.error("dist/client missing — run `npm run build` first.");
  process.exit(1);
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** A leftover server on this port would silently serve a stale build. */
function portInUse(port) {
  return new Promise((resolve) => {
    const probe = net
      .createServer()
      .once("error", () => resolve(true))
      .once("listening", () => probe.close(() => resolve(false)))
      .listen(port, "127.0.0.1");
  });
}

if (await portInUse(PORT)) {
  console.error(
    `port ${PORT} is already in use. A stale preview server would serve an ` +
      `old build — stop it and re-run.`,
  );
  process.exit(1);
}

async function fetchWithRetry(url, tries = 30) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) return await res.text();
    } catch {
      /* server not up yet */
    }
    await wait(1000);
  }
  throw new Error("production server never became ready on " + url);
}

console.log("starting production server on " + PORT + " …");
/* Node 24 on Windows refuses to spawn a .cmd shim without a shell, so the
   launcher is a shell — which means kill() would only reap the shell and
   leave the server listening. taskkill /T takes the whole tree down. */
const server = spawn("npx", ["vinext", "start", "--port", String(PORT)], {
  cwd: ROOT,
  shell: true,
  stdio: "ignore",
});

function stopServer() {
  if (server.pid == null) return;
  if (WIN) spawnSync("taskkill", ["/PID", String(server.pid), "/T", "/F"], { stdio: "ignore" });
  else server.kill("SIGTERM");
}

/* Every route the snapshot must serve. `depth` is how many directories the
   emitted file sits below the snapshot root, which sets its relative prefix. */
const ROUTES = [
  { route: "/", out: "index.html", depth: 0 },
  {
    route: "/maintenance-service-intervals/",
    out: "maintenance-service-intervals/index.html",
    depth: 1,
  },
  {
    route: "/european-car-repair/",
    out: "european-car-repair/index.html",
    depth: 1,
  },
];

const pages = [];
try {
  for (const page of ROUTES) {
    pages.push({ ...page, html: await fetchWithRetry(`http://localhost:${PORT}${page.route}`) });
  }
} finally {
  stopServer();
}

/* A stale handle on Windows can hold the directory; clear contents instead of
   removing the directory itself. */
fs.mkdirSync(OUT, { recursive: true });
for (const entry of fs.readdirSync(OUT)) {
  fs.rmSync(path.join(OUT, entry), { recursive: true, force: true });
}
fs.cpSync(DIST, OUT, { recursive: true });

/* Absolute roots become document-relative so any base path works.
   The root-level asset names come from what the build actually emitted rather
   than from a hardcoded pattern, so a newly added image can never be missed. */
const rootAssets = fs
  .readdirSync(DIST, { withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name);

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

for (const page of pages) {
  /* A page one directory down needs "../" to reach the snapshot root. */
  const prefix = page.depth === 0 ? "./" : "../".repeat(page.depth);
  let html = page.html.replace(/"\/assets\//g, `"${prefix}assets/`);
  for (const name of rootAssets) {
    html = html.replace(new RegExp('"/' + escapeRe(name) + '"', "g"), `"${prefix}${name}"`);
  }
  /* Chunk names inside the bundle are root-relative ("assets/x.js"), and the
     shared resolver cannot use document.baseURI because that differs per route.
     Each page declares its own way back to the snapshot root instead. */
  html = html.replace(
    /<head>/,
    `<head><script>window.__aawBase=${JSON.stringify(prefix)}</script>`,
  );

  const target = path.join(OUT, page.out);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
  page.rewritten = html;
  console.log("  page " + page.route + " -> " + page.out);
}

/* CSS lives in ./assets, so its root-absolute urls need one level up. */
const assetsDir = path.join(OUT, "assets");
for (const f of fs.readdirSync(assetsDir)) {
  const file = path.join(assetsDir, f);
  let src = fs.readFileSync(file, "utf8");
  const before = src;

  if (f.endsWith(".css")) {
    for (const name of rootAssets) {
      src = src.replace(
        new RegExp("url\\(/" + escapeRe(name) + "\\)", "g"),
        "url(../" + name + ")",
      );
    }
  }

  if (f.endsWith(".js")) {
    /* Vite's asset resolver hardcodes a "/" base. Point it at the per-page
       root prefix instead — document.baseURI would resolve chunk names against
       the nested route's own directory and 404. */
    src = src.replace(
      /function\(e\)\{return`\/`\+e\}/g,
      'function(e){return (window.__aawBase||"./")+e}',
    );
  }

  if (src !== before) {
    fs.writeFileSync(file, src);
    console.log("  rewrote " + f);
  }
}

fs.writeFileSync(path.join(OUT, ".nojekyll"), "");

/* Every reference each page makes must resolve, or the snapshot is stale. */
let checked = 0;
for (const page of pages) {
  const prefix = page.depth === 0 ? "\\./" : "(?:\\.\\./)+";
  const re = new RegExp(prefix + "((?:assets/)?[A-Za-z0-9_.-]+\\.(?:js|css|webp|jpg|png|svg))", "g");
  const referenced = [...new Set([...page.rewritten.matchAll(re)].map((m) => m[1]))];
  const missing = referenced.filter((f) => !fs.existsSync(path.join(OUT, f)));
  if (missing.length) {
    console.error(`snapshot is stale — ${page.out} references missing assets:`);
    missing.forEach((f) => console.error("  " + f));
    process.exit(1);
  }

  /* The icon font must survive or every symbol on the page vanishes. */
  if (!page.rewritten.includes("Material+Symbols+Sharp")) {
    console.error(`${page.out} is missing the Material Symbols stylesheet link.`);
    process.exit(1);
  }

  /* Exactly one H1 per page. */
  const h1s = (page.rewritten.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) {
    console.error(`${page.out} has ${h1s} <h1> elements; expected exactly 1.`);
    process.exit(1);
  }

  checked += referenced.length;
}

console.log(
  `snapshot ready in .pages/ (${pages.length} routes, ${checked} asset refs verified)`,
);
