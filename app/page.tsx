import SiteHeader from "./site-header";
import Reveal from "./reveal";
import { MaterialSymbol, SYMBOLS } from "./material-symbol";
import { FOOTER_QUICK_LINKS, FOOTER_SERVICES } from "./site-nav";
import { navLink } from "./site-links";
import {
  CheckIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
} from "./icons";

const CDN = "https://www.actonautowerks.com/wp-content/uploads";

const PHONE_DISPLAY = "(978) 429-8913";
const PHONE_HREF = "tel:+19784298913";
const EMAIL = "service@actonautowerks.com";
const ADDRESS = "429 Great Rd, Acton, MA 01720";
const MAPS = "https://maps.app.goo.gl/Rsuie6ei9bPKs1Gm8";

const services = [
  {
    number: "1.",
    icon: SYMBOLS.tireReplacement,
    title: "Tire Replacement",
    text: "Summer high-performance, all-season, and winter tires for all cars and trucks, from daily commuters to the European and performance vehicles we specialize in.",
  },
  {
    number: "2.",
    icon: SYMBOLS.mountingBalancing,
    title: "Tire Mounting And Balancing",
    text: "A proper mount and balance protects ride quality and helps your tires wear evenly, whatever you drive.",
  },
  {
    number: "3.",
    icon: SYMBOLS.tireRepair,
    title: "Tire Repair",
    text: "Bring your car in and we will look at the damage and give you an honest assessment of what the tire needs.",
  },
  {
    number: "4.",
    icon: SYMBOLS.wheelAlignment,
    title: "Wheel Alignment",
    text: "A wheel alignment keeps your steering true and can meaningfully extend the life of your tires.",
  },
];

const tireTypes = [
  {
    number: "01",
    icon: SYMBOLS.summer,
    title: "Summer",
    text: "Summer performance tires deliver grip in warm weather.",
  },
  {
    number: "02",
    icon: SYMBOLS.allSeason,
    title: "All-Season",
    text: "All-seasons balance year-round versatility.",
  },
  {
    number: "03",
    icon: SYMBOLS.winter,
    title: "Winter",
    text: "Dedicated winter tires give you confidence through New England snow and ice.",
  },
];

const alignmentSigns = [
  "Uneven tread wear",
  "Steering wheel sits off-center",
  "Car pulling to one side",
];

const faqs = [
  {
    question: "How often should I replace my tires?",
    answer:
      "It depends on the tire, your mileage, and your driving conditions, but worn tread, cracking, or vibration are common signs it is time. Bring your car in and we will give you an honest assessment.",
  },
  {
    question: "Do you service run-flat and European performance tires?",
    answer:
      "Yes. As European car specialists, we regularly mount and balance run-flats and performance tires for BMW, Mercedes-Benz, Audi, and other makes, using the proper equipment suited to those wheels.",
  },
  {
    question: "How do I know if I need a wheel alignment?",
    answer:
      "Uneven tire wear, a crooked steering wheel, or the car drifting to one side on a straight road are the usual indicators. We can check your alignment and show you what we find.",
  },
  {
    question: "Do you rotate tires as part of regular maintenance?",
    answer:
      "Yes, tire rotation is part of the routine maintenance and service intervals we recommend to help your tires wear evenly and last longer.",
  },
];


export default function TireAndWheelServicePage() {
  return (
    <>
      <a className="aaw-skip" href="#content">
        Skip to content
      </a>

      <SiteHeader />
      <Reveal />

      <main id="content">
        {/* 1 — Internal page hero ------------------------------------------ */}
        <section className="aaw-hero">
          <div className="aaw-shell aaw-hero-inner">
            <p className="aaw-hero-title">Tire &amp; Wheel Service</p>
            <h1>Tire and Wheel Service in Acton, MA</h1>
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

        {/* 2 — Intro split -------------------------------------------------- */}
        <section className="aaw-section aaw-pattern">
          <div className="aaw-shell aaw-split aaw-split--wideCopy">
            <div className="aaw-split-copy">
              <div className="aaw-head aaw-head--start">
                <h2>The Only Part Of Your Vehicle That Touches The Road</h2>
              </div>
              <p>
                Your tires are the only part of your vehicle that actually
                touches the road, so their condition shapes your traction,
                steering, braking, and fuel economy.
              </p>
              <p>
                At Acton Autowerks, we use state-of-the-art equipment to mount,
                balance, repair, and align tires on all cars and trucks, from
                daily commuters to the European and performance vehicles we
                specialize in.
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

        {/* 3 — Primary service list ---------------------------------------- */}
        <section className="aaw-section aaw-dark">
          <div className="aaw-shell">
            <div className="aaw-head">
              <h2>Our Tire And Wheel Services</h2>
              <p>
                Different driving needs call for different tires. Whatever you
                drive, a proper mount and balance protects ride quality and
                helps your tires wear evenly.
              </p>
            </div>
            <div className="aaw-grid aaw-grid--2">
              {services.map((service) => (
                <article className="aaw-card" key={service.title}>
                  <p className="aaw-card-num">{service.number}</p>
                  <MaterialSymbol name={service.icon} />
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4 — Seasonal tire education -------------------------------------- */}
        <section className="aaw-section aaw-pattern aaw-pattern--alt2">
          <div className="aaw-shell">
            <div className="aaw-head">
              <h2>Summer, All-Season, And Winter Tires</h2>
              <p>
                Different driving needs call for different tires. Here is how the
                three families compare for New England roads.
              </p>
            </div>
            <div className="aaw-grid aaw-grid--3">
              {tireTypes.map((type) => (
                <article className="aaw-card" key={type.title}>
                  <p className="aaw-card-num">{type.number}</p>
                  <MaterialSymbol name={type.icon} />
                  <h3>{type.title}</h3>
                  <p>{type.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5 — Alignment ---------------------------------------------------- */}
        <section className="aaw-section aaw-pattern aaw-pattern--alt">
          <div className="aaw-shell aaw-split aaw-split--reverse">
            <div className="aaw-split-copy">
              <div className="aaw-head aaw-head--start">
                <h2>Why An Alignment Matters</h2>
              </div>
              <p>
                A wheel alignment keeps your steering true and can meaningfully
                extend the life of your tires. If you notice any of the
                following, it may be time to have your alignment checked.
              </p>
              <ul className="aaw-symptoms">
                {alignmentSigns.map((sign) => (
                  <li key={sign}>{sign}</li>
                ))}
              </ul>
              <p>
                We will inspect it and let you know honestly whether it needs
                attention, with no upselling.
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
            <figure className="aaw-split-figure" data-reveal="left">
              <img
                src={`${CDN}/2026/06/tire-and-wheel-service-img.webp`}
                alt="Wheel and tire work underway on a vehicle in the Acton Autowerks shop."
                width={430}
                height={245}
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        {/* 6 — Trust -------------------------------------------------------- */}
        <section className="aaw-section aaw-pattern">
          <div className="aaw-shell">
            <div className="aaw-trust">
              <div className="aaw-trust-figure">
                <strong>20+</strong>
                <span>Years combined experience</span>
              </div>
              <div className="aaw-trust-copy">
                <MaterialSymbol name={SYMBOLS.trust} tone="plain" />
                <h2>Why New England Drivers Trust Us</h2>
                <p>
                  With over 20 years of combined experience, our team has earned
                  a reputation across MetroWest and New England for our
                  expertise with European vehicles, straightforward advice and
                  quality work.
                </p>
                <p>
                  Whether you are here for a set of tires today or ongoing
                  maintenance and service down the road, we will treat your
                  vehicle like our own.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7 — FAQ ---------------------------------------------------------- */}
        <section className="aaw-section aaw-pattern aaw-pattern--alt">
          <div className="aaw-shell">
            <div className="aaw-head">
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="aaw-faq">
              {faqs.map((faq, index) => (
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

        {/* 8 — CTA band ----------------------------------------------------- */}
        <section className="aaw-section aaw-dark aaw-cta" id="quote">
          <div className="aaw-shell">
            <h2>Schedule An Appointment Today</h2>
            <p>
              Whether you are here for a set of tires today or ongoing
              maintenance and service down the road, we will treat your vehicle
              like our own.
            </p>
            <ul className="aaw-checklist">
              <li>
                <CheckIcon />
                Over 20 years of combined experience
              </li>
              <li>
                <CheckIcon />
                European and performance vehicle specialists
              </li>
              <li>
                <CheckIcon />
                Honest assessments, no upselling
              </li>
            </ul>
            <div className="aaw-actions">
              <a className="aaw-btn aaw-btn--onDark" href={PHONE_HREF}>
                Get A Quote
              </a>
              <span className="aaw-or aaw-or--onDark">or</span>
              <a className="aaw-callbtn aaw-callbtn--onDark" href={PHONE_HREF}>
                <PhoneIcon size={18} />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 9 — Footer --------------------------------------------------------- */}
      <footer className="aaw-footer">
        <div className="aaw-shell aaw-footer-grid">
          <div className="aaw-footer-col aaw-footer-col--brand">
            <a href="https://www.actonautowerks.com/" aria-label="Acton Autowerks home">
              <img
                src={`${CDN}/2025/07/site-logo.png`}
                alt="Acton Autowerks"
                width={112}
                height={39}
                loading="lazy"
              />
            </a>
            <p>
              Your one-stop destination for trusted automotive care, performance
              upgrades, and protection that keeps every vehicle in its best
              shape.
            </p>
            <div className="aaw-footer-social">
              <a
                href="https://www.facebook.com/ActonAutoWerks/"
                target="_blank"
                rel="noreferrer"
                aria-label="Acton Autowerks on Facebook"
              >
                <FacebookIcon size={21} />
              </a>
              <a
                href="https://www.instagram.com/acton_autowerks/?hl=en"
                target="_blank"
                rel="noreferrer"
                aria-label="Acton Autowerks on Instagram"
              >
                <InstagramIcon size={21} />
              </a>
            </div>
          </div>

          <div className="aaw-footer-col">
            <p className="aaw-footer-title">Services</p>
            <ul className="aaw-footer-links">
              {FOOTER_SERVICES.map((item) => (
                <li key={item.label}>
                  <a {...navLink(item)} aria-current={item.current ? "page" : undefined}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="aaw-footer-col">
            <p className="aaw-footer-title">Quick Links</p>
            <ul className="aaw-footer-links">
              {FOOTER_QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <a {...navLink(item)}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="aaw-footer-col">
            <p className="aaw-footer-title">Contact Us</p>
            <ul className="aaw-footer-contact">
              <li>
                <a href={`mailto:${EMAIL}`}>
                  <MailIcon size={18} />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={PHONE_HREF}>
                  <PhoneIcon size={18} />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={MAPS} target="_blank" rel="noreferrer">
                  <PinIcon size={14} />
                  {ADDRESS}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="aaw-footer-bar">
          <div className="aaw-shell">
            <p>
              Copyright &copy; 2026 <b>Acton Autowerks</b>. All rights reserved
            </p>
            <p>
              <a href="https://www.actonautowerks.com/privacy-policy/">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
