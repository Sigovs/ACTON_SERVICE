import type { Metadata } from "next";
import SiteHeader from "../site-header";
import SiteFooter from "../site-footer";
import Reveal from "../reveal";
import BrandNav from "./brand-nav";
import { CHAPTERS, CTA_BUTTON, CTA_HEADING, INTRO, PAGE_TITLE } from "./content";

export const metadata: Metadata = {
  title: "European Car Repair Specialists | Acton Autowerks",
  description:
    "European automotive service in Acton, MA for Audi, BMW, Mercedes-Benz, Porsche, Land Rover, Jaguar and Volkswagen.",
};

const CDN = "https://www.actonautowerks.com/wp-content/uploads";

/** Stable anchor per brand, derived from the approved chapter name. */
const slug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const brands = CHAPTERS.map((c) => ({
  id: slug(c.name),
  /* The marque alone reads better in a compact index than "Audi Repair". */
  name: c.name.replace(/ Repair$/, ""),
}));

export default function EuropeanCarRepairPage() {
  return (
    <>
      <a className="aaw-skip" href="#content">
        Skip to content
      </a>

      <SiteHeader current="european" />
      <Reveal />

      <main id="content">
        {/* 1 — Locked internal-page hero ----------------------------------- */}
        <section className="aaw-hero aaw-hero--european">
          <div className="aaw-shell aaw-hero-inner">
            {/* The source supplies one title, so the H1 occupies the large
                hero-title slot outright — no secondary line, no empty gap. */}
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
                  <span aria-current="page">European Car Repair Specialists</span>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* 2 — Asymmetric introduction: copy left, image right -------------- */}
        <section className="aaw-section aaw-pattern aaw-euro-intro">
          <div className="aaw-euro-intro-grid">
            <div className="aaw-euro-intro-copy">
              {INTRO.map((paragraph, i) => (
                <p
                  key={paragraph.slice(0, 40)}
                  data-reveal="up"
                  data-reveal-delay={i === 0 ? undefined : String(Math.min(i, 2))}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <figure className="aaw-euro-intro-figure" data-reveal="right">
              <img
                src="/european-intro.webp"
                alt="European vehicle under service in the Acton Autowerks workshop."
                width={1672}
                height={941}
                loading="lazy"
              />
            </figure>
          </div>
        </section>

        {/* 3 + 4 — Brand navigator and chapter stream ----------------------- */}
        <div className="aaw-euro-hub">
          <div className="aaw-shell aaw-euro-hub-grid">
            <div className="aaw-euro-index">
              <BrandNav brands={brands} />
            </div>

            <div className="aaw-euro-stream">
              {CHAPTERS.map((chapter, index) => {
                const items = chapter.blocks.filter((b) => b.type === "item");
                const leadIn = chapter.blocks.find((b) => b.type === "leadIn");
                /* Source order matters: some chapters close with a paragraph
                   after their items. Render paragraphs in the order given,
                   split around the item run. */
                const firstItem = chapter.blocks.findIndex((b) => b.type === "item");
                const before = chapter.blocks
                  .slice(0, firstItem === -1 ? undefined : firstItem)
                  .filter((b) => b.type === "paragraph");
                const after =
                  firstItem === -1
                    ? []
                    : chapter.blocks.slice(firstItem).filter((b) => b.type === "paragraph");

                return (
                  <article
                    className="aaw-euro-chapter"
                    id={slug(chapter.name)}
                    key={chapter.name}
                    data-tone={index % 3 === 1 ? "graphite" : "light"}
                  >
                    <header className="aaw-euro-chapter-head">
                      {/* Placed first so it leads once the head stacks on
                          narrow screens, where it must sit above the heading
                          to reach the seam; grid placement keeps it on the
                          right at desktop. Decorative either way — the heading
                          already announces the marque, and the photography is
                          of the work rather than of any badge or wordmark.

                          The wipe lives on the inner element, never on the
                          observed one: a clip-path that collapses the box to
                          zero area also collapses its intersection ratio, and
                          the reveal threshold would never be met. */}
                      <figure className="aaw-euro-plate" data-reveal="plate" aria-hidden="true">
                        <span className="aaw-euro-plate-inner">
                          <img
                            src={`/brand-${slug(chapter.name.replace(/ Repair$/, ""))}.webp`}
                            alt=""
                            width={960}
                            height={540}
                            loading="lazy"
                          />
                        </span>
                      </figure>
                      <h2 data-reveal="left" data-reveal-text>
                        {chapter.name} <span>{chapter.tagline}</span>
                      </h2>
                    </header>

                    {before.map((block) => (
                      <p key={block.text.slice(0, 40)} data-reveal="up">
                        {block.text}
                      </p>
                    ))}

                    {leadIn ? <p className="aaw-euro-leadin">{leadIn.text}</p> : null}

                    {items.length > 0 ? (
                      <ul className="aaw-euro-items">
                        {items.map((item) => (
                          <li key={item.title}>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {after.map((block) => (
                      <p key={block.text.slice(0, 40)} className="aaw-euro-closing">
                        {block.text}
                      </p>
                    ))}
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* 5 — Full-width photographic break -------------------------------- */}
        <section className="aaw-euro-break" aria-hidden="true" />

        {/* 6 — CTA, both elements taken from the approved source ------------ */}
        <section className="aaw-section aaw-dark aaw-cta aaw-euro-cta" id="quote">
          <div className="aaw-shell">
            <h2 data-reveal="up">{CTA_HEADING}</h2>
            <div className="aaw-actions">
              <a className="aaw-btn aaw-btn--onDark" href="#top">
                {CTA_BUTTON}
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter current="european" />
    </>
  );
}
