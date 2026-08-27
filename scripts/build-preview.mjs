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

let html;
try {
  html = await fetchWithRetry(`http://localhost:${PORT}/`);
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

/* Absolute roots become document-relative so any base path works. */
html = html
  .replace(/"\/assets\//g, '"./assets/')
  .replace(/"\/favicon\.svg"/g, '"./favicon.svg"')
  .replace(/"\/(tire-wheel-[a-z]+\.jpg)"/g, '"./$1"');

fs.writeFileSync(path.join(OUT, "index.html"), html);

/* CSS lives in ./assets, so its root-absolute urls need one level up. */
const assetsDir = path.join(OUT, "assets");
for (const f of fs.readdirSync(assetsDir)) {
  const file = path.join(assetsDir, f);
  let src = fs.readFileSync(file, "utf8");
  const before = src;

  if (f.endsWith(".css")) {
    src = src.replace(/url\(\/(tire-wheel-[a-z]+\.jpg)\)/g, "url(../$1)");
  }

  if (f.endsWith(".js")) {
    /* Vite's asset resolver hardcodes a "/" base; resolve against the
       document instead so chunk preloads land under the project base. */
    src = src.replace(
      /function\(e\)\{return`\/`\+e\}/g,
      "function(e){return new URL(e,document.baseURI).href}",
    );
  }

  if (src !== before) {
    fs.writeFileSync(file, src);
    console.log("  rewrote " + f);
  }
}

fs.writeFileSync(path.join(OUT, ".nojekyll"), "");

/* Every asset the page asks for must exist, or the snapshot is stale. */
const referenced = [...html.matchAll(/\.\/assets\/([A-Za-z0-9_-]+\.(?:js|css))/g)].map(
  (m) => m[1],
);
const missing = [...new Set(referenced)].filter(
  (f) => !fs.existsSync(path.join(assetsDir, f)),
);
if (missing.length) {
  console.error("snapshot is stale — index.html references missing assets:");
  missing.forEach((f) => console.error("  " + f));
  process.exit(1);
}

/* The icon font must survive into the snapshot or every symbol vanishes. */
if (!html.includes("Material+Symbols+Sharp")) {
  console.error("snapshot is missing the Material Symbols stylesheet link.");
  process.exit(1);
}

console.log(`snapshot ready in .pages/ (${referenced.length} asset refs verified)`);
