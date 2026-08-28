import type { Metadata } from "next";
import SiteHeader from "./site-header";
import SiteFooter from "./site-footer";
import Reveal from "./reveal";
import { MaterialSymbol, SYMBOLS } from "./material-symbol";
import { PhoneIcon } from "./icons";
import { expectBlockCount, paragraph, section } from "./service-blocks";
import { BLOCKS, CTA_HEADING, CTA_LINES, FAQS, PAGE_TITLE } from "./tire-wheel-content";

export const metadata: Metadata = {
  title: "Tire & Wheel Service in Acton, MA | Acton Autowerks",
  description:
    "Tire replacement, mounting, balancing, repair, and wheel alignment in Acton, MA for daily drivers and the European and performance vehicles we specialize in. Call (978) 429-8913.",
};

const CDN = "https://www.actonautowerks.com/wp-content/uploads";

const PHONE_DISPLAY = "(978) 429-8913";
const PHONE_HREF = "tel:+19784298913";

/* Source order, asserted rather than assumed. */
expectBlockCount(BLOCKS, 5);
const INTRO = paragraph(BLOCKS, 0);
const SERVICES = section(BLOCKS, 1, "Our Tire and Wheel Services");
const TIRE_TYPES = paragraph(BLOCKS, 2);
const ALIGNMENT = section(BLOCKS, 3, "Why an Alignment Matters");
const TRUST = section(BLOCKS, 4, "Why New England Drivers Trust Us");

/* One verified Material Symbol per approved service, keyed by the approved
   wording rather than by position. */
const SERVICE_ICONS = {
  "Tire replacement: summer high-performance, all-season, and winter tires":
    SYMBOLS.tireReplacement,
  "Tire mounting and balancing": SYMBOLS.mountingBalancing,
  "Tire repair": SYMBOLS.tireRepair,
  "Wheel alignment": SYMBOLS.wheelAlignment,
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

export default function TireAndWheelServicePage() {
  return (
    <>
      <a className="aaw-skip" href="#content">
        Skip to content
      </a>

      <SiteHeader current="tire-wheel" />
      <Reveal />

      <main id="content">
        {/* 1 — Internal page hero ------------------------------------------ */}
        <section className="aaw-hero">
          <div className="aaw-shell aaw-hero-inner">
            <p className="aaw-hero-title">Tire &amp; Wheel Service</p>
            <h1>{PAGE_TITLE}</h1>
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
                  <span aria-current="page">Tire &amp; Wheel Service</span>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* 2 — Intro split. The source opens straight into this paragraph, so
               the page does too — it carries no heading of its own. -------- */}
        <section className="aaw-section aaw-pattern">
          <div className="aaw-shell aaw-split aaw-split--wideCopy">
            <div className="aaw-split-copy">
              <p className="aaw-lede" data-reveal="up">
                {INTRO}
              </p>
              <div className="aaw-actions">
                <a className="aaw-btn" href="#quote">
                  Get A Quote
                </a>
                <span className="aaw-or">or</span>
                <a className="aaw-callbtn" href={PHONE_HREF}>
                  <PhoneIcon size={18} />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <figure className="aaw-split-figure" data-reveal="right">
              <img
                src="/tire-wheel-intro.jpg"
                alt="Acton Autowerks technician removing a wheel from a Porsche 911 on a lift, with the wheel and tire standing in the foreground."
                width={572}
                height={572}
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        {/* 3 — The approved service list. The source gives four labels and no
               descriptions, so the cards carry the labels alone. ----------- */}
        <section className="aaw-section aaw-dark aaw-dark--wheel">
          {/* Decorative: sits in the left gutter, behind the card grid. */}
          <img
            className="aaw-section-wheel"
            src="/tire-wheel-cutout.webp"
            alt=""
            aria-hidden="true"
            width={478}
            height={492}
            loading="lazy"
            data-reveal="left"
          />
          <div className="aaw-shell">
            <div className="aaw-head">
              <h2 data-reveal="left" data-reveal-text>
                {SERVICES.heading}
              </h2>
            </div>
            <div className="aaw-grid aaw-grid--2">
              {SERVICES.items.map((item, index) => (
                <article className="aaw-card aaw-card--label" key={item}>
                  <p className="aaw-card-num" aria-hidden="true">{index + 1}.</p>
                  <MaterialSymbol name={iconFor(item)} />
                  <h3>{item}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4 — Seasonal guidance. One approved paragraph, kept whole rather
               than split into cards. -------------------------------------- */}
        <section className="aaw-section aaw-pattern aaw-pattern--alt2">
          <div className="aaw-shell aaw-seasons">
            <img
              className="aaw-seasons-figure"
              src="/seasonal-tires.webp"
              alt="Three stacked tires showing different tread patterns."
              width={536}
              height={433}
              loading="lazy"
              data-reveal="up"
            />
            <p data-reveal="up" data-reveal-delay="1">
              {TIRE_TYPES}
            </p>
          </div>
        </section>

        {/* 5 — Alignment ---------------------------------------------------- */}
        <section className="aaw-section aaw-pattern aaw-pattern--alt">
          <div className="aaw-shell aaw-split">
            <div className="aaw-split-copy">
              <div className="aaw-head aaw-head--start">
                <h2 data-reveal="left" data-reveal-text>
                  {ALIGNMENT.heading}
                </h2>
              </div>
              {ALIGNMENT.paragraphs.map((text) => (
                <p key={text.slice(0, 40)} data-reveal="up">
                  {text}
                </p>
              ))}
              <div className="aaw-actions">
                <a className="aaw-btn" href="#quote">
                  Get A Quote
                </a>
                <span className="aaw-or">or</span>
                <a className="aaw-callbtn" href={PHONE_HREF}>
                  <PhoneIcon size={18} />
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>
            <figure
              className="aaw-split-figure aaw-split-figure--cutout"
              data-reveal="right"
            >
              <img
                src="/alignment-target.webp"
                alt="An alignment target head clamped to a wheel, as used to measure and set wheel alignment."
                width={594}
                height={452}
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        {/* 6 — Trust: full-bleed photographic band -------------------------- */}
        <section className="aaw-trustband">
          <div className="aaw-shell aaw-trustband-inner">
            <div className="aaw-trustband-copy">
              <div className="aaw-trustbadge" data-reveal="up">
                {/* Ring draws itself once on reveal, like a loader completing. */}
                <svg className="aaw-trustbadge-ring" viewBox="0 0 240 240" aria-hidden="true">
                  <circle className="aaw-trustbadge-track" cx="120" cy="120" r="117" />
                  <circle className="aaw-trustbadge-arc" cx="120" cy="120" r="117" />
                </svg>
                <strong>20+</strong>
                <span>Years combined experience</span>
              </div>
              <h2 data-reveal="up">{TRUST.heading}</h2>
              {TRUST.paragraphs.map((text, index) => (
                <p
                  key={text.slice(0, 40)}
                  data-reveal="up"
                  data-reveal-delay={String(Math.min(index + 1, 2))}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 7 — FAQ ---------------------------------------------------------- */}
        <section className="aaw-section aaw-pattern aaw-pattern--alt">
          <div className="aaw-shell">
            <div className="aaw-head">
              <h2 data-reveal="left" data-reveal-text>
                Frequently Asked Questions
              </h2>
            </div>
            <div className="aaw-faq">
              {FAQS.map((faq, index) => (
                <details key={faq.question} open={index === 0}>
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

      <SiteFooter current="tire-wheel" />
    </>
  );
}
