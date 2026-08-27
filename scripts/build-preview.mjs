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
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DIST = path.join(ROOT, "dist/client");
const OUT = path.join(ROOT, ".pages");
const PORT = 4399;

if (!fs.existsSync(DIST)) {
  console.error("dist/client missing — run `npm run build` first.");
  process.exit(1);
}

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWithRetry(url, tries = 25) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.text();
    } catch {
      /* server not up yet */
    }
    await wait(1000);
  }
  throw new Error("production server never became ready on " + url);
}

console.log("starting production server on " + PORT + " …");
const server = spawn("npx", ["vinext", "start", "--port", String(PORT)], {
  cwd: ROOT,
  shell: true,
  stdio: "ignore",
});

let html;
try {
  html = await fetchWithRetry(`http://localhost:${PORT}/`);
} finally {
  server.kill();
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
console.log("snapshot ready in .pages/");
