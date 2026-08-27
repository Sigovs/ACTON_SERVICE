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

        {/* 3 — Service range, stepped like a shift gate --------------------- */}
        <section className="aaw-section aaw-tx-services">
          <div className="aaw-shell">
            <h2 data-reveal="left" data-reveal-text>
              {SERVICES.heading}
            </h2>
            <ol className="aaw-tx-gate">
              {SERVICES.items.map((item, index) => (
                <li
                  key={item}
                  data-step={index % 2 === 0 ? "left" : "right"}
                  data-reveal={index % 2 === 0 ? "left" : "right"}
                  data-reveal-delay={String(Math.min(index % 3, 2))}
                >
                  <span className="aaw-tx-gate-label">{item}</span>
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

        {/* 5 — Wide underbody pause ---------------------------------------- */}
        <section className="aaw-tx-break" aria-hidden="true" />

        {/* 6 — Trust -------------------------------------------------------- */}
        <section className="aaw-section aaw-tx-trust">
          <div className="aaw-shell">
            {/* Nested rather than sharing the shell element, so the max-width
                does not inherit `margin-inline: auto` and centre the column. */}
            <div className="aaw-tx-trust-inner">
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
