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
    out: "electrical-intro.webp",
    from: "Electrical Systems Diagnostics_intro.png",
    /* Delivered cut-out at its native 349x262. Capped at that width in CSS so
       it is never upscaled; the alpha sits straight on the section pattern. */
    crop: null,
    quality: 92,
  },
  {
    out: "electrical-trust.webp",
    from: "electrical Systems why trust.jpg",
    /* Delivered 1920x960. The copy sits over its lower left, so the readability
       gradient is applied in CSS and nothing is baked into the file. */
    crop: null,
    quality: 86,
  },
  {
    out: "autobody-hero.webp",
    from: "Auto Body Services in Acton_hero.jpg",
    /* Delivered hero, 1920x800 native. Paintless dent removal in progress —
       one of the page's own approved services — with the left third dark and
       empty for the title. Replaces the borrowed workshop crop, which shared
       its photograph with the European page's band. */
    crop: null,
    quality: 86,
  },
  {
    out: "autobody-panel.webp",
    from: "Auto Body Services in Acton_restoration.jpg",
    /* Delivered restoration frame, 1889x1083 native — a classic BMW with the
       sill worked back to bare metal, which is what the approved Restoration
       copy actually describes. Replaces the borrowed maintenance shot, which
       shared its photograph with the Maintenance page's intro. */
    crop: null,
    quality: 86,
  },
  {
    out: "transmission-hero.webp",
    from: "Transmission Service in Acton, MA_hero.jpg",
    /* Delivered hero, 1920x800 native: a vehicle raised with the technician
       working underneath and the fluid-exchange rig in frame. Left third dark
       and empty for the title. */
    crop: null,
    quality: 86,
  },
  {
    out: "transmission-cutout.webp",
    from: "transmission-services-cutout.png",
    /* Transparent cut-out, 1122x1105 native, alpha preserved — never flattened
       and never cropped. Sits straight on the dark section with a CSS glow
       behind it, so it must keep its alpha channel. */
    crop: null,
    quality: 90,
  },
  {
    out: "transmission-trust.webp",
    from: "Transmission Service in Acton, MA_hero why trust.jpg",
    /* Delivered 1920x960: a technician showing the tablet to a customer, which
       is what the approved trust copy describes. The copy sits over its lower
       left, so the readability gradient is CSS. */
    crop: null,
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
  await pipeline
    /* alphaQuality stays at full for every job: it is a no-op on an opaque
       image, and lowering it would quietly degrade the transparent cut-outs. */
    .webp({ quality: job.quality, alphaQuality: 100, effort: 5 })
    .toFile(target);
  const done = await sharp(target).metadata();
  console.log(
    `  ${job.out.padEnd(26)} ${String(done.width).padStart(4)}x${String(done.height).padEnd(4)} ` +
      `${String(Math.round(fs.statSync(target).size / 1024)).padStart(4)}KB   <- ${job.from.replace(/^european-source\//, "")}`,
  );
}

if (failed) process.exit(1);
