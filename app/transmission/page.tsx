import type { Metadata } from "next";
import SiteHeader from "../site-header";
import SiteFooter from "../site-footer";
import Reveal from "../reveal";
import { MaterialSymbol, SYMBOLS } from "../material-symbol";
import { PhoneIcon } from "../icons";
import { expectBlockCount, paragraph, section } from "../service-blocks";
import { BLOCKS, CTA_HEADING, CTA_LINES, FAQS, PAGE_TITLE } from "./content";

export const metadata: Metadata = {
  title: "Transmission Service in Acton, MA | Acton Autowerks",
  description:
    "Transmission inspection, diagnostics, fluid and filter service, clutch replacement, repair and replacement in Acton, MA. Call (978) 429-8913.",
};

const CDN = "https://www.actonautowerks.com/wp-content/uploads";
const PHONE_HREF = "tel:+19784298913";

/* Source order, asserted rather than assumed. */
expectBlockCount(BLOCKS, 4);
const INTRO = paragraph(BLOCKS, 0);
const SERVICES = section(BLOCKS, 1, "Our Transmission Services");
const SIGNS = section(BLOCKS, 2, "Signs You May Need Transmission Service");
const TRUST = section(BLOCKS, 3, "Why Acton Drivers Trust Us");

export default function TransmissionPage() {
  return (
    <>
      <a className="aaw-skip" href="#content">
        Skip to content
      </a>

      <SiteHeader current="transmission" />
      <Reveal />

      <main id="content">
        {/* 1 — Locked internal-page hero ----------------------------------- */}
        <section className="aaw-hero aaw-hero--transmission">
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
                  <span aria-current="page">Transmission Service</span>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* 2 — Asymmetric introduction ------------------------------------- */}
        <section className="aaw-section aaw-pattern aaw-tx-intro">
          <div className="aaw-shell aaw-tx-intro-grid">
            <span className="aaw-tx-rule" aria-hidden="true" />
            <p data-reveal="up">{INTRO}</p>
          </div>
        </section>

        {/* 3 — The unit itself, against a numbered service ledger ----------- */}
        <section className="aaw-section aaw-tx-services">
          <div className="aaw-shell aaw-tx-services-grid">
            <div className="aaw-tx-services-lead">
              <h2 data-reveal="up">{SERVICES.heading}</h2>
              <figure className="aaw-tx-object" data-reveal="object">
                {/* Glow only — no card, frame or pedestal. It precedes the
                    image in the DOM, so it paints behind without needing a
                    negative z-index that would escape this stacking context. */}
                <span className="aaw-tx-glow" aria-hidden="true" />
                <img
                  src="/transmission-cutout.webp"
                  alt="An automatic transmission unit, showing its torque converter housing, valve body and output shaft."
                  width={1122}
                  height={1105}
                  loading="lazy"
                />
              </figure>
            </div>

            {/* An ordered list carries the sequence for assistive technology,
                so the printed numerals are decorative and hidden from it. */}
            <ol className="aaw-tx-ledger">
              {SERVICES.items.map((item, index) => (
                <li key={item} data-reveal data-reveal-delay={String(Math.min(index, 5))}>
                  <span className="aaw-tx-ledger-num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="aaw-tx-ledger-label">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4 — Warning signs ------------------------------------------------ */}
        <section className="aaw-section aaw-pattern aaw-pattern--alt aaw-tx-signs">
          <div className="aaw-shell aaw-tx-signs-grid">
            <h2 data-reveal="left" data-reveal-text>
              {SIGNS.heading}
            </h2>
            <div className="aaw-tx-signs-copy">
              {SIGNS.paragraphs.map((text) => (
                <p key={text.slice(0, 40)} data-reveal="up">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 6 — Trust -------------------------------------------------------- */}
        <section className="aaw-section aaw-phototrust aaw-tx-trust">
          <div className="aaw-shell">
            {/* Nested rather than sharing the shell element, so the max-width
                does not inherit `margin-inline: auto` and centre the column. */}
            <div className="aaw-phototrust-inner">
              {/* Same device as the Electrical band: the shared ring, left
                  aligned on the copy's own edge. */}
              <div className="aaw-trustbadge" data-reveal="up">
                <svg className="aaw-trustbadge-ring" viewBox="0 0 240 240" aria-hidden="true">
                  <circle className="aaw-trustbadge-track" cx="120" cy="120" r="117" />
                  <circle className="aaw-trustbadge-arc" cx="120" cy="120" r="117" />
                </svg>
                <strong>20+</strong>
                <span>Years combined experience</span>
              </div>
              <h2 data-reveal="left" data-reveal-text>
                {TRUST.heading}
              </h2>
              {TRUST.paragraphs.map((text) => (
                <p key={text.slice(0, 40)} data-reveal="up" data-reveal-delay="1">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 7 — FAQ ---------------------------------------------------------- */}
        <section className="aaw-section aaw-pattern aaw-faqsplit">
          <div className="aaw-shell aaw-faqsplit-grid">
            <div className="aaw-faqsplit-head">
              <MaterialSymbol name={SYMBOLS.faq} />
              <h2 data-reveal="left" data-reveal-text>
                Frequently Asked Questions
              </h2>
            </div>
            <div className="aaw-faq aaw-faq--split">
              {FAQS.map((faq, index) => (
                <details key={faq.question} name="transmission-faq" open={index === 0}>
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

        {/* 8 — CTA. The source supplies a heading and a phone line only. ---- */}
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

      <SiteFooter current="transmission" />
    </>
  );
}
