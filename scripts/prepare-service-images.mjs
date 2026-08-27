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
    from: "Electrical Systems Diagnostics & Service in Acton_hero.jpg",
    /* Delivered hero, 1920x800 native. Note: the same frame was also delivered
       as the European intro at 16:9, so the two pages share a photograph in
       different crops and treatments. */
    crop: null,
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
    out: "electrical-intro.webp",
    from: "Electrical Systems Diagnostics_intro.png",
    /* Delivered cut-out at its native 349x262. Capped at that width in CSS so
       it is never upscaled; the alpha sits straight on the section pattern. */
    crop: null,
    quality: 92,
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
    from: "European Car Repair Specialists-intro image.jpg",
    /* The delivered intro photograph, 1672x941 native. It replaces both the
       original labelled placeholder and the alignment-rack stand-in that stood
       in for it while this image was outstanding. */
    crop: null,
    quality: 86,
  },
];

/* The European chapter banners: 16:7, each framed on the marque's own factory
   badge so a reader can identify the chapter before reading a word. Real
   badging photographed as-is — nothing is drawn, added or reconstructed. */
const BANNERS = [
  { out: "brand-audi.webp", from: "european-source/audi-diagnostics.png", crop: { left: 40, top: 725, width: 1040, height: 455 } },
  { out: "brand-bmw.webp", from: "european-source/bmw-oil-leak.png", crop: { left: 82, top: 486, width: 1040, height: 455 } },
  /* The air-suspension frame carries the star at the extreme right edge, where
     it cannot be centred; this frame has it on the grille. */
  /* That frame is lit far darker than the rest of the set, so it gets an
     exposure lift to sit in the same series. Exposure only — no gradient and
     no treatment is baked in. */
  { out: "brand-mercedes-benz.webp", from: "why new england.png", crop: { left: 680, top: 59, width: 900, height: 394 }, brighten: 1.32 },
  /* No badge is legible in the only Porsche frame available, so this crop
     identifies the car by its light bar and open decklid instead. */
  { out: "brand-porsche.webp", from: "european-source/porsche-engine.png", crop: { left: 129, top: 518, width: 886, height: 388 } },
  { out: "brand-land-rover.webp", from: "european-source/landrover-underbody.png", crop: { left: 0, top: 69, width: 1040, height: 455 } },
  { out: "brand-jaguar.webp", from: "european-source/jaguar-cooling.png", crop: { left: 82, top: 753, width: 1040, height: 455 } },
  { out: "brand-volkswagen.webp", from: "european-source/volkswagen-filter-tuneup.png", crop: { left: 0, top: 758, width: 800, height: 350 } },
];

for (const banner of BANNERS) JOBS.push({ ...banner, quality: 88 });

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
  if (job.brighten) pipeline = pipeline.modulate({ brightness: job.brighten });
  const target = path.join(OUT, job.out);
  await pipeline.webp({ quality: job.quality, effort: 5 }).toFile(target);
  const done = await sharp(target).metadata();
  console.log(
    `  ${job.out.padEnd(26)} ${String(done.width).padStart(4)}x${String(done.height).padEnd(4)} ` +
      `${String(Math.round(fs.statSync(target).size / 1024)).padStart(4)}KB   <- ${job.from.replace(/^european-source\//, "")}`,
  );
}

if (failed) process.exit(1);
