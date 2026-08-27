/**
 * Turns the approved markdown for service pages 04-06 into typed data modules.
 *
 *   node scripts/extract-service-content.mjs
 *
 * The three sources share one shape — title, intro, named sections, bullet
 * lists, an FAQ and a CTA — so one parser covers all three and each page
 * renders from the result rather than from hand-transcribed copy.
 *
 * PARITY CHECK
 * ------------
 * One normalisation is applied to both sides and the comparison is a strict
 * element-by-element match of the resulting token sequences, never a word
 * count. A count alone would pass even if paragraphs were reordered, a list
 * item went missing, or the CTA were repeated to fill a layout. The script
 * exits non-zero on the first divergence and prints the position and the
 * surrounding tokens.
 *
 * NORMALISATION (identical on both sides):
 *   1. drop the `#####` page-separator rows the sources use
 *   2. drop the list bullet U+25CF and the zero-width space U+200B that
 *      follows it — that is list syntax, not copy
 *   3. collapse all whitespace runs to single spaces
 *   4. split on spaces
 *
 * TRAPS THIS GUARDS AGAINST — all of them present in these three sources:
 *   - headings sitting flush against the paragraph above, with no blank line
 *     ("Why Acton Drivers Trust Us" in 04, several FAQ questions in 05/06)
 *   - an FAQ answer sitting flush under its question, with no blank line
 *     ("How often should transmission fluid be changed?" in 06)
 *   - hard-wrapped paragraphs that must rejoin without losing punctuation
 */
import fs from "node:fs";
import path from "node:path";

const BULLET = /[●•]​?/g;
const ZWSP = /​/g;

/** Every section heading, declared per page and asserted to appear exactly once. */
const PAGES = [
  {
    id: "electrical",
    src: "content/design strat up/docs/content/04-electrical-systems.md",
    out: "app/electrical-systems/content.ts",
    headings: [
      "Our Electrical Services",
      "Electronics on European Vehicles",
      "Why Acton Drivers Trust Us",
      "Frequently Asked Questions",
      "Schedule an Appointment Today",
    ],
  },
  {
    id: "autoBody",
    src: "content/design strat up/docs/content/05-auto-body.md",
    out: "app/auto-body/content.ts",
    headings: [
      "Collision",
      "Restoration",
      "Related Body and Protection Services",
      "Why Acton Drivers Trust Us",
      "Frequently Asked Questions",
      "Schedule an Appointment Today",
    ],
  },
  {
    id: "transmission",
    src: "content/design strat up/docs/content/06-transmission.md",
    out: "app/transmission/content.ts",
    headings: [
      "Our Transmission Services",
      "Signs You May Need Transmission Service",
      "Why Acton Drivers Trust Us",
      "Frequently Asked Questions",
      "Schedule an Appointment Today",
    ],
  },
];

const FAQ_HEADING = "Frequently Asked Questions";
const CTA_HEADING = "Schedule an Appointment Today";

/** Shared normaliser — the single source of truth for both sides of parity. */
function tokenise(text) {
  return text
    .replace(/^#{3,}.*$/gm, " ")
    .replace(BULLET, " ")
    .replace(ZWSP, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);
}

/** Rejoins hard-wrapped lines into paragraphs, splitting on blank lines. */
function paragraphsFrom(lines) {
  const out = [];
  let buf = [];
  const flush = () => {
    if (buf.length) out.push(buf.join(" ").replace(/\s+/g, " ").trim());
    buf = [];
  };
  for (const line of lines) {
    if (!line.trim()) flush();
    else buf.push(line.trim());
  }
  flush();
  return out.filter(Boolean);
}

function parse(page) {
  const raw = fs.readFileSync(page.src, "utf8");
  /* Drop the separator row some sources close with. */
  const body = raw.replace(/^#{3,}.*$/gm, "");
  const lines = body.split(/\r?\n/);

  const firstIdx = lines.findIndex((l) => l.trim());
  if (firstIdx < 0) throw new Error(`${page.src}: empty source`);
  const title = lines[firstIdx].trim();

  /* Every declared heading must be present exactly once, on its own line. */
  const headingSet = new Set(page.headings);
  for (const h of page.headings) {
    const hits = lines.filter((l) => l.trim() === h).length;
    if (hits !== 1) {
      throw new Error(`${page.src}: heading ${JSON.stringify(h)} found ${hits} times, expected 1`);
    }
  }

  /* Split into sections on those headings. Content before the first heading is
     the intro and carries no heading of its own. */
  const sections = [{ heading: null, lines: [] }];
  for (let i = firstIdx + 1; i < lines.length; i++) {
    const t = lines[i].trim();
    if (headingSet.has(t)) sections.push({ heading: t, lines: [] });
    else sections.at(-1).lines.push(lines[i]);
  }

  const blocks = [];
  let faqs = null;
  let cta = null;

  for (const section of sections) {
    const bulletLines = section.lines.filter((l) => BULLET.test(l.replace(BULLET, "●")) && /[●•]/.test(l));
    const isList = bulletLines.length > 0;

    if (section.heading === FAQ_HEADING) {
      /* A line ending in "?" is a question in its own right — several answers
         sit flush underneath with no blank line between them. */
      const items = [];
      let current = null;
      let answer = [];
      const closeItem = () => {
        if (current) items.push({ question: current, answer: paragraphsFrom(answer).join(" ") });
        answer = [];
      };
      for (const line of section.lines) {
        const t = line.trim();
        if (t.endsWith("?") && t.length > 8) {
          closeItem();
          current = t;
        } else {
          answer.push(line);
        }
      }
      closeItem();
      faqs = items;
      continue;
    }

    if (section.heading === CTA_HEADING) {
      const paras = paragraphsFrom(section.lines);
      cta = { heading: CTA_HEADING, lines: paras };
      continue;
    }

    if (isList) {
      const items = section.lines
        .filter((l) => /[●•]/.test(l))
        .map((l) => l.replace(BULLET, "").replace(ZWSP, "").replace(/\s+/g, " ").trim())
        .filter(Boolean);
      const rest = paragraphsFrom(section.lines.filter((l) => !/[●•]/.test(l)));
      blocks.push({ type: "section", heading: section.heading, paragraphs: [], items });
      /* A section may carry prose after its list (04 does). */
      for (const p of rest) blocks.push({ type: "paragraph", text: p });
      continue;
    }

    const paras = paragraphsFrom(section.lines);
    if (section.heading === null) {
      for (const p of paras) blocks.push({ type: "paragraph", text: p });
    } else {
      blocks.push({ type: "section", heading: section.heading, paragraphs: paras, items: [] });
    }
  }

  if (!faqs || !faqs.length) throw new Error(`${page.src}: no FAQ parsed`);
  if (!cta) throw new Error(`${page.src}: no CTA parsed`);

  return { title, blocks, faqs, cta };
}

/** Rebuilds the document in render order, for the rendered side of parity. */
function renderOrder(data) {
  const parts = [data.title];
  for (const b of data.blocks) {
    if (b.type === "paragraph") parts.push(b.text);
    else {
      parts.push(b.heading);
      parts.push(...b.paragraphs);
      parts.push(...b.items);
    }
  }
  parts.push(FAQ_HEADING);
  for (const f of data.faqs) {
    parts.push(f.question);
    parts.push(f.answer);
  }
  parts.push(data.cta.heading);
  parts.push(...data.cta.lines);
  return parts.join(" ");
}

function compare(page, data) {
  const source = tokenise(fs.readFileSync(page.src, "utf8"));
  const rendered = tokenise(renderOrder(data));
  const n = Math.max(source.length, rendered.length);
  for (let i = 0; i < n; i++) {
    if (source[i] !== rendered[i]) {
      const ctx = (arr) => arr.slice(Math.max(0, i - 6), i + 6).join(" ");
      throw new Error(
        `${page.src}: PARITY FAILED at token ${i + 1}\n` +
          `  source  : …${ctx(source)}…\n` +
          `  rendered: …${ctx(rendered)}…\n` +
          `  source token   = ${JSON.stringify(source[i])}\n` +
          `  rendered token = ${JSON.stringify(rendered[i])}`,
      );
    }
  }
  return source.length;
}

const HEADER = (src) => `/**
 * GENERATED — do not edit by hand.
 *
 * Parsed verbatim from ${src} by scripts/extract-service-content.mjs, which
 * fails if the token sequence diverges from the source. Re-run that script
 * after any change to the source.
 */
export type Block =
  | { type: "paragraph"; text: string }
  | { type: "section"; heading: string; paragraphs: string[]; items: string[] };

export type Faq = { question: string; answer: string };
`;

let failed = false;
for (const page of PAGES) {
  try {
    const data = parse(page);
    const tokens = compare(page, data);

    const body =
      HEADER(page.src) +
      `\nexport const PAGE_TITLE = ${JSON.stringify(data.title)};\n` +
      `\nexport const BLOCKS: Block[] = ${JSON.stringify(data.blocks, null, 2)};\n` +
      `\nexport const FAQS: Faq[] = ${JSON.stringify(data.faqs, null, 2)};\n` +
      `\nexport const CTA_HEADING = ${JSON.stringify(data.cta.heading)};\n` +
      `\nexport const CTA_LINES: string[] = ${JSON.stringify(data.cta.lines, null, 2)};\n`;

    fs.mkdirSync(path.dirname(page.out), { recursive: true });
    fs.writeFileSync(page.out, body);

    const sections = data.blocks.filter((b) => b.type === "section").length;
    const items = data.blocks.reduce((n, b) => n + (b.items ? b.items.length : 0), 0);
    const paras = data.blocks.filter((b) => b.type === "paragraph").length;
    console.log(
      `  ${page.id.padEnd(13)} parity OK  ${String(tokens).padStart(4)} tokens  ` +
        `· ${sections} sections · ${paras} loose paragraphs · ${items} items · ${data.faqs.length} FAQs`,
    );
  } catch (error) {
    failed = true;
    console.error("\n" + error.message + "\n");
  }
}

if (failed) {
  console.error("content extraction FAILED — pages not written for the failing sources.");
  process.exit(1);
}
console.log("all three sources parsed with exact token-sequence parity.");
