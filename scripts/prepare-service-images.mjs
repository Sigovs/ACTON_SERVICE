/**
 * Derives the page 04-06 imagery from the preserved sources in
 * `service pages/`, so every crop is reproducible and its provenance is
 * recorded rather than remembered.
 *
 *   node scripts/prepare-service-images.mjs
 *
 * No image is upscaled: each output is written at the native resolution of its
 * crop and the browser handles any further scaling under the hero overlay.
 * Readability treatments live in CSS, never baked into the file.
 *
 * These are the strongest appropriate images in the local set. The subjects
 * that would be better still — a gearbox or clutch on the bench for
 * Transmission, and true panel/paint work for Auto Body — do not exist locally
 * yet and are recorded as replacement candidates in docs/PROJECT_STATE.md.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "service pages/";
const OUT = "public/";

const JOBS = [
  {
    out: "electrical-hero.webp",
    from: "european-source/audi-diagnostics.png",
    /* Engine bay with the diagnostic tablet cabled in — the page's subject. */
    crop: { left: 0, top: 440, width: 1122, height: 520 },
    quality: 86,
  },
  {
    out: "electrical-break.webp",
    from: "european-source/bmw-oil-leak.png",
    /* Inspection lamp over the bay. The drain pan sits below the crop, so this
       reads as investigation rather than as an oil service. */
    crop: { left: 0, top: 300, width: 1122, height: 520 },
    quality: 86,
  },
  {
    out: "autobody-hero.webp",
    from: "european-source/break-workshop.png",
    /* Whole car bodies in a calm, warm bay, with the right side clear for the
       hero copy. No active mechanical work, and nothing that could read as
       collision imagery. */
    crop: { left: 460, top: 181, width: 1455, height: 591 },
    quality: 86,
  },
  {
    out: "autobody-panel.webp",
    from: "Regular maintenance is the single best way to extend the life of your vehicle and keep it running the way it should..png",
    /* Native 977x550: clean body contours and panel reflections, used inset at
       its own resolution rather than stretched across a full-bleed band. */
    crop: null,
    quality: 88,
  },
  {
    out: "transmission-hero.webp",
    from: "european-source/mercedes-air-suspension.png",
    /* Atmosphere only: a car raised with a technician underneath, sitting
       behind the hero's 0.7 overlay. */
    crop: { left: 0, top: 60, width: 1122, height: 760 },
    quality: 86,
  },
  {
    out: "transmission-break.webp",
    from: "european-source/landrover-underbody.png",
    /* The most drivetrain-credible underbody in the local set, so it takes the
       dominant full-width position on the page. */
    crop: { left: 0, top: 540, width: 1122, height: 520 },
    quality: 86,
  },
  {
    out: "european-intro.webp",
    from: "alignment.jpg",
    /* Retires the last labelled PLACEHOLDER on the site. This was the one image
       the European delivery never included, and the archive it was promised in
       has never reached the repository. A European car on the alignment rack is
       an honest stand-in for "which European cars we work on", and the file was
       otherwise unused. Drop the real intro photograph in at this same path to
       replace it. */
    crop: null,
    quality: 86,
  },
];

let failed = false;
for (const job of JOBS) {
  const from = path.join(SRC, job.from);
  if (!fs.existsSync(from)) {
    console.error(`  MISSING SOURCE  ${job.from}`);
    failed = true;
    continue;
  }
  let pipeline = sharp(from);
  const meta = await pipeline.metadata();
  if (job.crop) {
    const crop = {
      ...job.crop,
      width: Math.min(job.crop.width, meta.width - job.crop.left),
      height: Math.min(job.crop.height, meta.height - job.crop.top),
    };
    pipeline = sharp(from).extract(crop);
  }
  const target = path.join(OUT, job.out);
  await pipeline.webp({ quality: job.quality, effort: 5 }).toFile(target);
  const done = await sharp(target).metadata();
  console.log(
    `  ${job.out.padEnd(26)} ${String(done.width).padStart(4)}x${String(done.height).padEnd(4)} ` +
      `${String(Math.round(fs.statSync(target).size / 1024)).padStart(4)}KB   <- ${job.from.replace(/^european-source\//, "")}`,
  );
}

if (failed) process.exit(1);
