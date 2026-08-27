import type { Metadata } from "next";
import SiteHeader from "../site-header";
import SiteFooter from "../site-footer";
import Reveal from "../reveal";
import { MaterialSymbol, SYMBOLS } from "../material-symbol";
import { PhoneIcon } from "../icons";
import { expectBlockCount, paragraph, section } from "../service-blocks";
import { BLOCKS, CTA_HEADING, CTA_LINES, FAQS, PAGE_TITLE } from "./content";

export const metadata: Metadata = {
  title: "Auto Body Services in Acton, MA | Acton Autowerks",
  description:
    "Collision support, classic European restoration and related body services in Acton, MA, coordinated through trusted partner shops. Call (978) 429-8913.",
};

const CDN = "https://www.actonautowerks.com/wp-content/uploads";
const PHONE_HREF = "tel:+19784298913";

/* Source order, asserted rather than assumed. */
expectBlockCount(BLOCKS, 5);
const INTRO = paragraph(BLOCKS, 0);
const COLLISION = section(BLOCKS, 1, "Collision");
const RESTORATION = section(BLOCKS, 2, "Restoration");
const RELATED = section(BLOCKS, 3, "Related Body and Protection Services");
const TRUST = section(BLOCKS, 4, "Why Acton Drivers Trust Us");

/* The two coordinated routes, in source order. */
const PATHWAY = [COLLISION, RESTORATION];

/* One verified Material Symbol per approved related service, keyed by the
   approved wording rather than by position. Every name is confirmed against
   the Google endpoint and listed in the `icon_names` subset in layout.tsx —
   an unverified name silently ships the full 659KB face and renders tofu. */
const RELATED_ICONS = {
  "Paintless dent removal": SYMBOLS.dentRemoval,
  Winterization: SYMBOLS.winter,
  "Rust prevention": SYMBOLS.rustPrevention,
  Undercoating: SYMBOLS.undercoating,
  Lubrication: SYMBOLS.oil,
} as const;

function relatedIcon(item: string) {
  const icon = RELATED_ICONS[item as keyof typeof RELATED_ICONS];
  if (!icon) {
    throw new Error(
      `No icon mapped for the approved service ${JSON.stringify(item)}. ` +
        `Add a verified Material Symbol to RELATED_ICONS and to icon_names in layout.tsx.`,
    );
  }
  return icon;
}

export default function AutoBodyPage() {
  return (
    <>
      <a className="aaw-skip" href="#content">
        Skip to content
      </a>

      <SiteHeader current="auto-body" />
      <Reveal />

      <main id="content">
        {/* 1 — Locked internal-page hero ----------------------------------- */}
        <section className="aaw-hero aaw-hero--autobody">
          <div className="aaw-shell aaw-hero-inner">
            {/* The source supplies one title, so it is the single H1. */}
            <h1 className="aaw-hero-title">{PAGE_TITLE}</h1>
            <nav aria-label="Breadcrumb">
              <ol className="aaw-crumbs">
                <li>
                  <a href="https://www.actonautowerks.com/">Home</a>
                  <img src={`${CDN}/2025/07/breadcrumb-img.svg`} alt="" />
                </li>
                <li>
                  <a href="https://www.actonautowerks.com/service-maintenance/">
                    Service &amp; Maintenance
                  </a>
                  <img src={`${CDN}/2025/07/breadcrumb-img.svg`} alt="" />
                </li>
                <li>
                  <span aria-current="page">Auto Body Services</span>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* 2 — How this service actually works.
               The onsite/partner distinction is the first thing on the page and
               is set at lede size, never reduced to small print. ------------- */}
        <section className="aaw-section aaw-pattern aaw-body-lead">
          <div className="aaw-shell">
            <p className="aaw-body-lede" data-reveal="up">
              {INTRO}
            </p>
          </div>
        </section>

        {/* 3 + 4 — The two coordinated routes, divided by panel seams ------- */}
        <section className="aaw-section aaw-pattern aaw-pattern--alt aaw-body-routes">
          <div className="aaw-shell">
            {PATHWAY.map((route, index) => (
              <article className="aaw-body-route" key={route.heading}>
                <div className="aaw-body-route-head">
                  <h2 data-reveal="left" data-reveal-text>
                    {route.heading}
                  </h2>
                  <span className="aaw-body-seam" aria-hidden="true" />
                </div>
                <div className="aaw-body-route-copy">
                  {route.paragraphs.map((text) => (
                    <p
                      key={text.slice(0, 40)}
                      data-reveal="up"
                      data-reveal-delay={String(Math.min(index, 2))}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 5 — Inset panel. Held to the image's own width rather than stretched
               across a full-bleed band, which keeps this page's silhouette its
               own. ---------------------------------------------------------- */}
        <section className="aaw-section aaw-pattern aaw-body-panel">
          <div className="aaw-shell">
            <figure className="aaw-body-panel-figure" data-reveal="up">
              <img
                src="/autobody-panel.webp"
                alt="A classic BMW at a partner restoration shop, with a lower body panel worked back to bare metal."
                width={1889}
                height={1083}
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        {/* 6 — Related services, as a dark break of icon cards -------------- */}
        <section className="aaw-section aaw-body-related">
          <div className="aaw-shell">
            <h2 data-reveal="left" data-reveal-text>
              {RELATED.heading}
            </h2>
            {/* Reveal on the <li>, hover on the card inside it — the two would
                otherwise fight over the same `transform`. */}
            <ul className="aaw-body-cards">
              {RELATED.items.map((item, index) => (
                <li key={item} data-reveal data-reveal-delay={String(index)}>
                  <div className="aaw-body-card">
                    <MaterialSymbol name={relatedIcon(item)} tone="ledger" />
                    <span>{item}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7 — Trust -------------------------------------------------------- */}
        <section className="aaw-section aaw-pattern aaw-body-trust">
          <div className="aaw-shell aaw-body-trust-grid">
            <h2 data-reveal="left" data-reveal-text>
              {TRUST.heading}
            </h2>
            <div className="aaw-body-trust-copy">
              {TRUST.paragraphs.map((text) => (
                <p key={text.slice(0, 40)} data-reveal="up">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 8 — FAQ ---------------------------------------------------------- */}
        <section className="aaw-section aaw-pattern aaw-pattern--alt aaw-faqsplit">
          <div className="aaw-shell aaw-faqsplit-grid">
            <div className="aaw-faqsplit-head">
              <MaterialSymbol name={SYMBOLS.faq} />
              <h2 data-reveal="left" data-reveal-text>
                Frequently Asked Questions
              </h2>
            </div>
            <div className="aaw-faq aaw-faq--split">
              {FAQS.map((faq, index) => (
                <details key={faq.question} name="auto-body-faq" open={index === 0}>
                  <summary>
                    <span>{faq.question}</span>
                    <MaterialSymbol name={SYMBOLS.disclosure} />
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 9 — CTA. The source supplies a heading and a phone line only. ---- */}
        <section className="aaw-section aaw-dark aaw-cta" id="quote">
          <div className="aaw-shell">
            <h2 data-reveal="up">{CTA_HEADING}</h2>
            <div className="aaw-actions">
              {CTA_LINES.map((line) => (
                <a key={line} className="aaw-callbtn aaw-callbtn--onDark" href={PHONE_HREF}>
                  <PhoneIcon size={18} />
                  {line}
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter current="auto-body" />
    </>
  );
}
