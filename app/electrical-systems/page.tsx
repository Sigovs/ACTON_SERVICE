import type { Metadata } from "next";
import SiteHeader from "../site-header";
import SiteFooter from "../site-footer";
import Reveal from "../reveal";
import { MaterialSymbol, SYMBOLS } from "../material-symbol";
import { PhoneIcon } from "../icons";
import { expectBlockCount, paragraph, section } from "../service-blocks";
import { BLOCKS, CTA_HEADING, CTA_LINES, FAQS, PAGE_TITLE } from "./content";

export const metadata: Metadata = {
  title: "Electrical Systems Diagnostics & Service in Acton, MA | Acton Autowerks",
  description:
    "Battery replacement, dashboard and gauge repair, audio and interior electronics, and software updates in Acton, MA. Call (978) 429-8913.",
};

const CDN = "https://www.actonautowerks.com/wp-content/uploads";
const PHONE_HREF = "tel:+19784298913";

/* Source order, asserted rather than assumed. */
expectBlockCount(BLOCKS, 5);
const INTRO = paragraph(BLOCKS, 0);
const SERVICES = section(BLOCKS, 1, "Our Electrical Services");
const DIAGNOSIS = paragraph(BLOCKS, 2);
const EUROPEAN = section(BLOCKS, 3, "Electronics on European Vehicles");
const TRUST = section(BLOCKS, 4, "Why Acton Drivers Trust Us");

/* One verified Material Symbol per approved capability, keyed by the approved
   wording rather than by position. Every name is confirmed against the Google
   endpoint and listed in the `icon_names` subset in layout.tsx — an unverified
   name silently ships the full 659KB face and renders tofu. */
const SERVICE_ICONS = {
  "Battery replacement": SYMBOLS.battery,
  "Audio and interior electronic repair": SYMBOLS.audio,
  "Dashboard and gauge repair": SYMBOLS.gauge,
  "Software updates": SYMBOLS.software,
} as const;

function iconFor(item: string) {
  const icon = SERVICE_ICONS[item as keyof typeof SERVICE_ICONS];
  if (!icon) {
    throw new Error(
      `No icon mapped for the approved service ${JSON.stringify(item)}. ` +
        `Add a verified Material Symbol to SERVICE_ICONS and to icon_names in layout.tsx.`,
    );
  }
  return icon;
}

export default function ElectricalSystemsPage() {
  return (
    <>
      <a className="aaw-skip" href="#content">
        Skip to content
      </a>

      <SiteHeader current="electrical" />
      <Reveal />

      <main id="content">
        {/* 1 — Locked internal-page hero ----------------------------------- */}
        <section className="aaw-hero aaw-hero--electrical">
          <div className="aaw-shell aaw-hero-inner">
            {/* The source supplies one title, so it is the single H1 and takes
                the large hero slot outright — no second visual title. */}
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
                  <span aria-current="page">Electrical Systems</span>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* 2 — Signal: the lede beside the equipment that reads it --------- */}
        <section className="aaw-section aaw-pattern aaw-elec-intro">
          <div className="aaw-shell aaw-elec-intro-grid">
            <p className="aaw-elec-lede" data-reveal="up">
              {INTRO}
            </p>
            {/* Decorative: a cut-out of the equipment the copy describes. It
                sits straight on the section pattern, with no frame. */}
            <figure className="aaw-elec-intro-figure" data-reveal="right" aria-hidden="true">
              <img
                src="/electrical-intro.webp"
                alt=""
                width={349}
                height={262}
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        {/* 3 — Capability as cards that arrive one at a time ---------------- */}
        <section className="aaw-section aaw-elec-services">
          <div className="aaw-shell">
            <h2 data-reveal="left" data-reveal-text>
              {SERVICES.heading}
            </h2>
            <ul className="aaw-elec-cards">
              {SERVICES.items.map((item, index) => (
                <li key={item} data-reveal="pop" data-reveal-delay={String(index)}>
                  <MaterialSymbol name={iconFor(item)} tone="ledger" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4 — Investigation: why a symptom is not yet a cause -------------- */}
        <section className="aaw-section aaw-pattern aaw-pattern--alt aaw-elec-reasoning">
          <div className="aaw-shell">
            <p data-reveal="up">{DIAGNOSIS}</p>
          </div>
        </section>

        {/* 5 — European electronics ---------------------------------------- */}
        <section className="aaw-section aaw-pattern aaw-elec-euro">
          <div className="aaw-shell aaw-elec-euro-grid">
            <h2 data-reveal="left" data-reveal-text>
              {EUROPEAN.heading}
            </h2>
            <div className="aaw-elec-euro-copy">
              {EUROPEAN.paragraphs.map((text) => (
                <p key={text.slice(0, 40)} data-reveal="up">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 6 — Photographic pause, crossed by the same trace ---------------- */}
        <section className="aaw-elec-break" aria-hidden="true">
          <span className="aaw-elec-scan" />
        </section>

        {/* 7 — Trust -------------------------------------------------------- */}
        <section className="aaw-section aaw-elec-trust">
          <div className="aaw-shell">
            {/* Nested rather than sharing the shell element: a max-width on the
                shell itself would inherit its `margin-inline: auto` and centre
                the column against the rest of the page's left-aligned rhythm. */}
            <div className="aaw-elec-trust-inner">
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

        {/* 8 — FAQ ---------------------------------------------------------- */}
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
                <details key={faq.question} name="electrical-faq" open={index === 0}>
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

      <SiteFooter current="electrical" />
    </>
  );
}
