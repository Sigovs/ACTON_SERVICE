/**
 * Turns the approved European Car Repair markdown into a typed data module.
 *
 * The page is ~3,700 words across seven brand chapters. Transcribing that by
 * hand would risk silent edits, so the copy is parsed straight from the
 * approved source and the page renders from the result.
 *
 *   node scripts/extract-european-content.mjs
 *
 * PARITY CHECK
 * ------------
 * One normalisation is used for both sides, and the check is a strict
 * element-by-element comparison of the resulting token sequences — not a word
 * count. A count alone would pass even if chapters were reordered or a
 * paragraph moved between chapters. Chapter contents are therefore stored as an
 * ordered `blocks` array that mirrors the source exactly (BMW, for instance,
 * closes with a paragraph *after* its service items).
 *
 * NORMALISATION (applied identically to source and to rendered output):
 *   1. drop the trailing `#####` page-separator row the source uses
 *   2. collapse all whitespace runs to single spaces
 *   3. split on spaces
 *   4. drop standalone "-" tokens, because "Title - body" items are stored as
 *      two fields and lose the separator that the source spells out
 */
import fs from "node:fs";
import path from "node:path";

const SRC = "content/design strat up/docs/content/03-european-repair.md";
const OUT = "app/european-car-repair/content.ts";

/** The seven brands, detected by their own chapter headings — never guessed. */
const BRAND_HEADING =
  /^((?:Audi|BMW|Mercedes-Benz|Porsche|Land Rover|Jaguar|Volkswagen) Repair) - (.+)$/;

/** "Title - body" items, as used by the Land Rover and Jaguar chapters. */
const INLINE_ITEM = /^([A-Z][A-Za-z0-9&/'’(). -]{2,60}?) - (.+)$/s;

/** The source's own call-to-action pair, which belongs in the final CTA. */
const CTA_HEADING = "Are you ready to get ahead?";
const CTA_BUTTON = "Schedule Service";

const raw = fs.readFileSync(SRC, "utf8");
const body = raw.replace(/^#+\s*$/gm, "").replace(/#{5,}[\s\S]*$/, "");

const looksLikeTitle = (s) =>
  s.length > 2 &&
  s.length <= 60 &&
  !/[.!?:,]$/.test(s) &&
  /^[A-Z]/.test(s) &&
  /^[A-Za-z0-9&/'’(). -]+$/.test(s) &&
  s
    .split(/\s+/)
    .every((w) => /^[A-Z0-9(]/.test(w) || ["and", "of", "the", "or", "&"].includes(w));

/* Headings in the source are not reliably separated by blank lines — the
   Mercedes-Benz and Jaguar chapter headings, and several item headings, sit
   flush against the paragraph above. Isolate each onto its own block. */
const srcLines = body.split(/\r?\n/);
const isolated = srcLines
  .map((line, i) => {
    const s = line.trim();
    if (BRAND_HEADING.test(s)) return `\n${s}\n`;
    if (!looksLikeTitle(s)) return line;
    let prev = "";
    for (let j = i - 1; j >= 0; j--) {
      if (srcLines[j].trim()) {
        prev = srcLines[j].trim();
        break;
      }
    }
    if (/[.!?]$/.test(prev) && (srcLines[i + 1] || "").trim()) return `\n${s}\n`;
    return line;
  })
  .join("\n");

/* The source is hard-wrapped; rejoin each block into one paragraph. */
const blocks = isolated
  .split(/\r?\n\s*\r?\n/)
  .map((b) => b.replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim())
  .filter(Boolean);

/* The title shares its block with the first paragraph — no blank line between
   them — so take it from the source's first line, not from the reflowed block
   (whitespace is already collapsed by then). */
const pageTitle = srcLines.find((l) => l.trim())?.trim() ?? "";
const introHead = blocks[0].slice(pageTitle.length).trim();

const intro = [];
const chapters = [];
let current = null;
let pendingHeading = null;

if (introHead) intro.push(introHead);

for (let i = 1; i < blocks.length; i++) {
  const block = blocks[i];

  const brand = block.match(BRAND_HEADING);
  if (brand) {
    current = { name: brand[1], tagline: brand[2], blocks: [] };
    chapters.push(current);
    pendingHeading = null;
    continue;
  }

  /* The CTA pair is lifted out of the intro so it appears once, at the end. */
  if (block === CTA_HEADING || block === CTA_BUTTON) continue;

  const sink = current ? current.blocks : intro;

  if (/:$/.test(block) && block.length < 80) {
    sink.push(current ? { type: "leadIn", text: block } : block);
    continue;
  }

  if (looksLikeTitle(block)) {
    pendingHeading = block;
    continue;
  }

  if (pendingHeading) {
    sink.push({ type: "item", title: pendingHeading, text: block });
    pendingHeading = null;
    continue;
  }

  const inline = current && block.match(INLINE_ITEM);
  if (inline && looksLikeTitle(inline[1])) {
    sink.push({ type: "item", title: inline[1], text: inline[2] });
    continue;
  }

  sink.push(current ? { type: "paragraph", text: block } : block);
}

const data = { pageTitle, intro, ctaHeading: CTA_HEADING, ctaButton: CTA_BUTTON, chapters };

/* ---- strict parity: same normaliser, sequence compared element by element -- */
const tokens = (s) =>
  s
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter((w) => w && w !== "-");

/* Rebuild the document in source order, including the CTA pair at the point the
   source states them, so the sequences line up exactly. */
const renderedParts = [pageTitle, intro[0], CTA_HEADING];
intro.slice(1).forEach((p) => renderedParts.push(p));
renderedParts.push(CTA_BUTTON);
for (const c of data.chapters) {
  renderedParts.push(`${c.name} - ${c.tagline}`);
  for (const b of c.blocks) {
    if (b.type === "item") renderedParts.push(b.title, b.text);
    else renderedParts.push(b.text);
  }
}

const sourceTokens = tokens(body);
const renderedTokens = tokens(renderedParts.join(" "));

let divergence = -1;
for (let i = 0; i < Math.max(sourceTokens.length, renderedTokens.length); i++) {
  if (sourceTokens[i] !== renderedTokens[i]) {
    divergence = i;
    break;
  }
}

console.log(`brands parsed  : ${data.chapters.length}`);
data.chapters.forEach((c) => {
  const items = c.blocks.filter((b) => b.type === "item").length;
  const paras = c.blocks.filter((b) => b.type === "paragraph").length;
  console.log(`  ${c.name.padEnd(22)} paragraphs ${paras}, items ${items}`);
});
console.log(`intro blocks   : ${data.intro.length}`);
console.log(`cta heading    : ${data.ctaHeading}`);
console.log(`cta button     : ${data.ctaButton}`);
console.log(`tokens source  : ${sourceTokens.length}`);
console.log(`tokens rendered: ${renderedTokens.length}`);

if (data.chapters.length !== 7) {
  console.error(`expected 7 brand chapters, parsed ${data.chapters.length}`);
  process.exit(1);
}
if (divergence !== -1) {
  console.error(`\nsequence diverges at token ${divergence}:`);
  console.error(`  source  : …${sourceTokens.slice(Math.max(0, divergence - 6), divergence + 6).join(" ")}…`);
  console.error(`  rendered: …${renderedTokens.slice(Math.max(0, divergence - 6), divergence + 6).join(" ")}…`);
  process.exit(1);
}
console.log("parity         : exact — token sequences identical");

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(
  OUT,
  `/**
 * GENERATED — do not edit by hand.
 *
 * Parsed verbatim from ${SRC}
 * by scripts/extract-european-content.mjs, which fails if the token sequence
 * diverges from the source. Re-run that script after any change to the source.
 *
 * \`blocks\` preserves the source's own order: some chapters close with a
 * paragraph after their service items.
 */
export type ChapterBlock =
  | { type: "paragraph"; text: string }
  | { type: "leadIn"; text: string }
  | { type: "item"; title: string; text: string };

export type BrandChapter = {
  name: string;
  tagline: string;
  blocks: ChapterBlock[];
};

export const PAGE_TITLE = ${JSON.stringify(data.pageTitle)};

export const INTRO: string[] = ${JSON.stringify(data.intro, null, 2)};

/** Both taken from the source; moved here so each appears once, at the end. */
export const CTA_HEADING = ${JSON.stringify(data.ctaHeading)};
export const CTA_BUTTON = ${JSON.stringify(data.ctaButton)};

export const CHAPTERS: BrandChapter[] = ${JSON.stringify(data.chapters, null, 2)};
`,
);
console.log(`\nwrote ${OUT}`);
