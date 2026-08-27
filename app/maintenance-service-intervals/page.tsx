import type { Metadata } from "next";
import SiteHeader from "../site-header";
import SiteFooter from "../site-footer";
import Reveal from "../reveal";
import { MaterialSymbol, SYMBOLS } from "../material-symbol";
import { PhoneIcon } from "../icons";

export const metadata: Metadata = {
  title: "Maintenance and Service Intervals in Acton, MA | Acton Autowerks",
  description:
    "Oil changes, tune-ups, fluid checks, filters, batteries, diagnostics and fleet services in Acton, MA. Call (978) 429-8913.",
};

const CDN = "https://www.actonautowerks.com/wp-content/uploads";
const PHONE_DISPLAY = "(978) 429-8913";
const PHONE_HREF = "tel:+19784298913";

/* The ten approved services, verbatim, each paired with a neutral Material
   Symbol. Every name is verified against the Google endpoint. */
const services = [
  { label: "Oil changes", icon: SYMBOLS.oil },
  { label: "Tune-ups", icon: SYMBOLS.tuneUp },
  { label: "Fluid level checks", icon: SYMBOLS.fluid },
  { label: "Filter replacement", icon: SYMBOLS.filter },
  { label: "Battery check and replacement", icon: SYMBOLS.battery },
  { label: "Spark plug check and replacement", icon: SYMBOLS.spark },
  { label: "Check engine light diagnostics", icon: SYMBOLS.diagnostics },
  { label: "Windshield wiper blade replacement", icon: SYMBOLS.wiper },
  { label: "Tire services", icon: SYMBOLS.tireReplacement },
  { label: "Fleet services", icon: SYMBOLS.fleet },
] as const;

const faqs = [
  {
    question: "How often should I get an oil change?",
    answer:
      "We generally recommend every 5,000 miles or 6 months, whichever comes first, adjusted for your driving habits and your manufacturer’s guidance.",
  },
  {
    question: "Do you follow manufacturer service schedules for European cars?",
    answer:
      "Yes. As European specialists, we service vehicles according to their recommended maintenance intervals and can help you stay on track between visits.",
  },
  {
    question: "Can you diagnose a check engine light?",
    answer:
      "We do. We’ll run diagnostics to identify the cause and explain what’s going on before any work begins.",
  },
  {
    question: "Do you offer fleet maintenance?",
    answer:
      "Yes, we provide fleet services and can help keep your vehicles on a consistent maintenance schedule. Call us to discuss your fleet’s needs.",
  },
];

export default function MaintenanceServiceIntervalsPage() {
  return (
    <>
      <a className="aaw-skip" href="#content">
        Skip to content
      </a>

      <SiteHeader current="maintenance" />
      <Reveal />

      <main id="content">
        {/* 1 — Frozen native internal-page hero ---------------------------- */}
        <section className="aaw-hero aaw-hero--maintenance">
          <div className="aaw-shell aaw-hero-inner">
            <p className="aaw-hero-title">Maintenance &amp; Service Intervals</p>
            <h1>Maintenance and Service Intervals in Acton, MA</h1>
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
                  <span aria-current="page">Maintenance &amp; Service Intervals</span>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* 2 — Asymmetric intro: wide image left, copy right ---------------- */}
        <section className="aaw-section aaw-pattern aaw-introband">
          <div className="aaw-introband-grid">
            <figure className="aaw-introband-figure" data-reveal="left">
              <img
                src="/maintenance-intro.webp"
                alt="Acton Autowerks technician working on a car in the workshop."
                width={1672}
                height={941}
                loading="lazy"
              />
            </figure>
            <div className="aaw-introband-copy">
              <h2 data-reveal="up">
                Regular maintenance is the single best way to extend the life of
                your vehicle and keep it running the way it should.
              </h2>
              <p data-reveal="up" data-reveal-delay="1">
                Staying on schedule with services like oil changes helps you
                avoid costly repairs that could have been prevented.
              </p>
              <p data-reveal="up" data-reveal-delay="2">
                At Acton Autowerks, we help Acton, MetroWest and New England
                drivers keep their cars reliable for the long haul.
              </p>
              <div className="aaw-actions" data-reveal="up" data-reveal-delay="2">
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
          </div>
        </section>

        {/* 3 — Teal service ledger ----------------------------------------- */}
        <section className="aaw-section aaw-ledger">
          <div className="aaw-shell aaw-ledger-grid">
            <div className="aaw-ledger-head">
              <h2 data-reveal="left" data-reveal-text>
                Maintenance Services We Offer
              </h2>
              <span className="aaw-ledger-mark" aria-hidden="true" data-reveal="right">
                <span className="material-symbols-sharp">{SYMBOLS.tuneUp}</span>
              </span>
            </div>
            <ul className="aaw-ledger-list">
              {services.map((service, index) => (
                <li
                  key={service.label}
                  data-reveal="up"
                  data-reveal-delay={index % 3 === 0 ? undefined : String(index % 3)}
                >
                  <MaterialSymbol name={service.icon} tone="ledger" />
                  <span>{service.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4 — Interval scene ---------------------------------------------- */}
        <section className="aaw-section aaw-pattern aaw-pattern--alt aaw-intervals">
          <div className="aaw-shell">
            <div className="aaw-head">
              <h2 data-reveal="left" data-reveal-text>
                How Often Should You Service Your Car?
              </h2>
            </div>
            <div className="aaw-intervals-track">
              <div className="aaw-intervals-metric" data-reveal="left">
                <strong>5,000 miles</strong>
              </div>
              <span className="aaw-intervals-line" aria-hidden="true" />
              <div className="aaw-intervals-metric" data-reveal="right">
                <strong>6 months</strong>
              </div>
            </div>
            <div className="aaw-intervals-copy">
              <p data-reveal="up">
                As a general guideline, we recommend changing your oil every
                5,000 miles or every 6 months, depending on your driving habits.
                We also suggest checking your other fluids, tires, and wear items
                at those same intervals so small issues get caught before they
                turn into larger ones.
              </p>
              <p data-reveal="up" data-reveal-delay="1">
                Your vehicle’s owner’s manual may specify its own schedule, and
                we’re happy to help you follow it.
              </p>
            </div>
          </div>
        </section>

        {/* 5 — Dark photographic split trust ------------------------------- */}
        <section className="aaw-trustsplit">
          <div className="aaw-trustsplit-media" data-reveal="left">
            <img
              src="/maintenance-trust.webp"
              alt="Acton Autowerks technician servicing a vehicle on a lift in the workshop."
              width={572}
              height={572}
              loading="lazy"
            />
          </div>
          <div className="aaw-trustsplit-panel">
            <div className="aaw-trustbadge aaw-trustbadge--seam" data-reveal="up">
              <svg className="aaw-trustbadge-ring" viewBox="0 0 240 240" aria-hidden="true">
                <circle className="aaw-trustbadge-track" cx="120" cy="120" r="117" />
                <circle className="aaw-trustbadge-arc" cx="120" cy="120" r="117" />
              </svg>
              <strong>20+</strong>
            </div>
            <div className="aaw-trustsplit-copy">
              <h2 data-reveal="right" data-reveal-text>
                Why New England Drivers Trust Us
              </h2>
              <p data-reveal="right" data-reveal-delay="1">
                Over 20 years of combined experience have taught us that honest,
                preventative care is what keeps customers coming back. We’re
                known as European car specialists in BMW, Mercedes-Benz, Audi,
                Porsche, and more, but we maintain all makes and models. Our team
                is transparent about what your car actually needs, so you never
                pay for services you don’t.
              </p>
            </div>
          </div>
        </section>

        {/* 6 — Asymmetric FAQ ---------------------------------------------- */}
        <section className="aaw-section aaw-pattern aaw-faqsplit">
          <div className="aaw-shell aaw-faqsplit-grid">
            <div className="aaw-faqsplit-head">
              <MaterialSymbol name={SYMBOLS.faq} />
              <h2 data-reveal="left" data-reveal-text>
                Frequently Asked Questions
              </h2>
            </div>
            <div className="aaw-faq aaw-faq--split">
              {faqs.map((faq, index) => (
                <details key={faq.question} name="maintenance-faq" open={index === 0}>
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

        {/* 7 — CTA ---------------------------------------------------------- */}
        <section className="aaw-section aaw-dark aaw-cta" id="quote">
          <div className="aaw-shell">
            <h2 data-reveal="up">Schedule an Appointment Today</h2>
            <div className="aaw-actions">
              <a className="aaw-callbtn aaw-callbtn--onDark" href={PHONE_HREF}>
                <PhoneIcon size={18} />
                Call Us: 978-429-8913
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter current="maintenance" />
    </>
  );
}
