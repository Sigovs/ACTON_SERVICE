# Project State

## Current

- Project type: internal child pages of the live Service & Maintenance section
- Parent page: https://www.actonautowerks.com/service-maintenance/
- Phase: local design/build
- Baseline page: Tire & Wheel Service
- Baseline status: **rebuilt 2026-08-26 as a native sibling of the parent page**;
  production build passes
- AAN: intentionally deferred until implementation
- Deployment: not authorized

## What changed on 2026-08-26

The first Tire & Wheel build was a standalone campaign landing page. It was
scrapped and rebuilt against the live site's own CSS.

Removed: oversized editorial hero, outlined "Service" word, "Service Page 01"
marker, split gray hero, experimental grid lines, "European expertise. Everyday
confidence.", "Control starts here", and the incorrect Powder Mill Road address.

Added: the real utility bar (`#0B5C7F`, ruled inline contact items, social
right), the real black sticky header with the `Logo-bg` / `header-bg` logo
plate, the compact chamfered Get A Quote button, the black internal-page hero
with the `0 0 250px 0` bottom-right radius and the 0.7 photo overlay, the live
breadcrumb pattern, and the white geometric-pattern content sections, card,
FAQ, CTA and footer treatments.

Shell values are extracted from Elementor kit 6, header 27, footer 56 and
page 504 rather than approximated. They are recorded in `CLAUDE.md`.

## Composition and density pass — 2026-08-26 (second pass)

The shell was frozen (utility bar, header, hero, breadcrumbs, contact facts,
type, colour, footer) and only the content layer was recomposed:

- Primary content groups now fill the 1350px container instead of sitting in a
  narrow centred strip.
- The four services moved from a 4-up strip to a 2-up grid of wide cards with a
  number rail beside the copy, 40px padding and equal heights.
- Seasonal cards gained real mass: 36/44px padding, 25px Unbounded titles, and
  a stronger 01/02/03 tint that stays subtle but is actually visible.
- Intro is a 55/45 copy/image split with 17px body copy and centred alignment.
- The alignment block fills the container with a 50/50 split and larger chips.
- Trust is a full-width two-column panel (badge + copy), no longer a floating
  white strip.
- FAQ widened to 880px with 28/32px summary padding and 34px toggles.
- CTA runs at 1.3x section padding with a 1.15x headline.
- The blue car icon now appears only on the two dark bands, where it marks a
  real band transition, instead of above every section head.

## Menu pass — 2026-08-26 (third pass)

The mobile/tablet menu was taken from the live site rather than invented:

- Burger appears at `≤1024px` (Elementor `dropdown-tablet`), not `≤767px`.
- Toggle: 2px teal outline, 5px radius, 25px glyph, using Elementor's own
  burger and close paths.
- Panel: teal `#0B5C7F`, absolutely positioned under the header block, 15px
  offset, `transform: scaleY` + `max-height` over 0.3s from the top edge.
- Links: Montserrat 600 16px capitalize, 12px/20px padding, white-on-teal
  inverting to teal-on-white. "Service & Maintenance" carries the active state.
- "Services" is not a link on the live site — it only opens its submenu.
  Same here, as a button with `aria-expanded`.
- At `≤767px` the utility bar and Get A Quote drop, matching the live
  `elementor-hidden-mobile` classes.
- The desktop "Services" flyout was added as well — it exists on the live
  header and was missing from the first build.

Header markup moved to `app/site-header.tsx` ("use client") and shared glyphs
to `app/icons.tsx`. `app/page.tsx` remains a server component.

Verified over CDP at 1920 / 1440 / 1024 / 768 / 390: correct element
visibility at every breakpoint, `scrollWidth === clientWidth` throughout,
panel and submenu open/close, Escape closes and restores focus.

## Page-system decisions this establishes

1. **The shell is recreated, not reinterpreted.** New pages start by copying the
   header block, hero, section furniture and footer from this page.
2. **Hero grammar:** visual page title (display size) → single H1 subtitle →
   breadcrumbs, left aligned in the 1350px container, black with the large
   bottom-right corner.
3. **Section rhythm:** 100 / 70 / 50px, alternating white-pattern and
   black-overlay bands.
4. **Section head:** centered `breadcrumbs-*-icon.svg`, H2 capped at 940px,
   lede capped at 880px.
5. **Card:** white, 10px radius, soft shadow, `service-bg-1` texture, oversized
   Unbounded number in `#DEDEDE`.
6. **CTA:** dark band, checklist, `Get A Quote` + `or` + phone — the same pair
   the parent page uses.

## Approved page order

1. Tire & Wheel Service
2. Maintenance & Service Intervals
3. European Car Repair Specialists
4. Electrical Systems Diagnostics & Service
5. Auto Body Services
6. Transmission Service

## Next decision

Review the rebuilt Tire & Wheel baseline side by side with
`/service-maintenance/`. Once approved, extract the `Service Page Extension`
components and apply them to the four remaining focused pages, then build
European Car Repair Specialists as the hub variant.

## Page 02 — Maintenance & Service Intervals: photography pass (2026-08-27)

Client-supplied photography replaced every placeholder/borrowed image on this
page, and three sections were recomposed to the supplied section layouts.

| Section | Asset | Source file |
|---|---|---|
| Intro band | `maintenance-intro.webp` 977x550 | `Regular maintenance is the single best way…png` |
| Service ledger | `maintenance-services.webp` 515x476 | `maintannaceservice we offer.png` |
| Interval scene | `maintenance-intervals.webp` 366x190 | `how offten should you service.png` |
| Trust band | `maintenance-trust.webp` 1920x960 | `why new england.png` |

Decisions this establishes for the remaining pages:

1. **Cut-outs carry their own glow.** The supplied PNGs bake a soft halo into
   their alpha, so they sit straight on the section ground with no frame,
   plate or CSS glow behind them. Same rule as the Tire page cut-outs.
2. **Cut-outs are never upscaled.** Each figure is capped at the asset's native
   width (`515px`, `366px`), because these are product shots whose detail is
   the point.
3. **The ledger heading moved into the column with its list.** Left column is
   the photograph alone, optically centred; right column is heading + rows. The
   heading is capped at `480px` so it keeps its two-line break.
4. **The intro figure's sweep is `0 250px 0 0`** — the same 250px radius the
   hero uses on its bottom-right, mirrored to face the copy. It becomes
   `0 0 160px 0` once the grid stacks.
5. **`.aaw-trustsplit` is retired.** The trust section now reuses the Tire
   page's `.aaw-trustband` with a `--maintenance` modifier: same badge, same
   ring animation, same 960px band. Only the photograph and a left-aligned
   copy block (`max-width: 680px`) differ, because this frame keeps its dark,
   unlit half on the left. The veil is directional rather than centred, and
   flips to vertical at ≤1024 where `cover` crops toward the middle.

Verified at 1920 / 1440 / 1366 / 1024 / 768 / 390: one H1, utility 41, header
85, logo 98x34, hero 600, zero horizontal overflow, no failed requests, no
console errors, and the trust copy optically centred at every width (top gap
equals bottom gap).

## European hub — marque plates and two stacking/sizing fixes (2026-08-27)

### Marque plate

Each brand chapter carries a small portrait photo hung across its own top
seam — not beside the copy and not above it. It sits at the head's top-right,
pulled up by the chapter's padding plus 30px so it crosses the seam and lands
in the previous chapter's bottom padding, where there is never any copy. On a
graphite chapter it crosses from white into the dark band; on a light chapter
it crosses out of the band above.

Motion, both dependency-free:

1. **Entry** — the frame settles out of a 3.5° tilt (alternating down the
   stream) while a shutter wipe opens inside it. Driven by the existing
   IntersectionObserver reveal, as a new `data-reveal="plate"` variant.
2. **Drift** — a scroll-linked parallax on the image using the native
   `animation-timeline: view()`, behind `@supports` and
   `prefers-reduced-motion: no-preference`. Browsers without it show the
   still frame. No animation library, per the project rule.

**The wipe must never live on the observed element.** A `clip-path` that
collapses the box to zero area also collapses its intersection ratio, so the
0.18 reveal threshold can never be met and the element stays hidden forever.
The clip lives on `.aaw-euro-plate-inner`; the observed `<figure>` stays
unclipped. This cost a full debug cycle — all 25 other reveals fired and only
the 7 plates did not.

Images are `public/brand-<marque>.webp`, currently labelled placeholders at
480x600 (portrait 4:5). Real photography drops in at the same paths.

### Two fixes found along the way

**The graphite band was being painted over.** BMW and Land Rover showed white
headings on a white page. The band is a `z-index: -1` pseudo-element and
nothing between the chapter and `<html>` created a stacking context, so it
fell into the root's negative layer where `.aaw-euro-hub`'s white background
covers it. `isolation: isolate` on the graphite chapter fixes it.

**The mobile stream was 814px wide inside a 390px viewport.** At <=1024 the
brand index becomes a full-width rail and, as a grid item, defaults to
`min-width: auto` — so the rail's min-content (seven chips in a row) became
the floor of the single `1fr` track and dragged the chapter stream with it.
Body copy was being clipped off-screen. `min-width: 0` on `.aaw-euro-index`
fixes it.

Both were invisible to the overflow check: `overflow-x: clip` suppresses
`scrollWidth`, so `documentElement.scrollWidth - clientWidth` reads 0 while
content is clipped away. **A zero overflow reading on this page proves
nothing on its own** — compare child rects against the viewport instead.

Verified at 1920/1440/1366/1024/768/390: 7 plates, 7 revealed, 7 loaded, no
failed requests, no console errors, and the stream inside the viewport at
every width.

## Pages 04-06 complete — the approved six-page set is built (2026-08-27)

### New routes

| Route | Page | Source |
|---|---|---|
| `/electrical-systems/` | Electrical Systems Diagnostics & Service in Acton, MA | `docs/content/04-electrical-systems.md` |
| `/auto-body/` | Auto Body Services in Acton, MA | `docs/content/05-auto-body.md` |
| `/transmission/` | Transmission Service in Acton, MA | `docs/content/06-transmission.md` |

Each source supplies a single title string, so on all three it is the single
H1 in the display slot — no second visual title, no invented "in Acton, MA"
variation. The breadcrumb uses the navigation label, which is wayfinding
rather than page copy.

### Visual signatures — one per page, deliberately not shared

- **04 Electrical — a diagnostic trace.** One hairline runs the page: it closes
  the lede, carries the four capabilities as illuminated nodes instead of
  cards, marks the European-electronics heading, and crosses the photograph
  once. No fake readouts, no invented codes, no dashboard warnings.
- **05 Auto Body — panel seams.** Every division is a body-panel shut line: a
  dark hairline with a lighter one offset beneath. The onsite/partner
  distinction is the page's first statement at lede size against a teal rule,
  never small print. Deliberately the only one of the six with no full-bleed
  photographic band, and the lightest and warmest of the set.
- **06 Transmission — a shift gate.** The six services step left and right off
  a central spine, so the eye travels across as well as down. Graphite and
  steel, one wide underbody pause, no fear language added anywhere.

### Content parity — proved twice

`scripts/extract-service-content.mjs` parses all three sources into typed data
and fails the build on any token-sequence divergence. Exact results:

| Page | Tokens | Sections | Items | FAQs |
|---|---|---|---|---|
| Electrical | 370 | 3 | 4 | 4 |
| Auto Body | 400 | 4 | 5 | 4 |
| Transmission | 342 | 3 | 6 | 4 |

The guard was negative-tested against the five failure modes that matter and
caught every one: a dropped list item, reordered blocks, duplicated CTA copy,
lost punctuation, and a heading swallowing its paragraph.

Then a second, independent check compares the **rendered DOM** against the
markdown — 370 / 400 / 342 tokens, identical sequences. Together these prove
markdown -> data -> pixels with nothing lost, reordered or repeated.

Only proven list syntax is excluded from parity: the `U+25CF` bullet and the
`U+200B` that follows it, plus the `#####` separator rows.

`app/service-blocks.ts` additionally asserts that each page renders its
sections in the source's order, so a change to the markdown fails the build
rather than silently mis-ordering a page.

### Images — all from the existing local set

No image generation is available in this environment, so every image is a
deliberate crop of a preserved local source, reproducible via
`scripts/prepare-service-images.mjs`, which records each crop and its reason.

| Output | Source | Note |
|---|---|---|
| `electrical-hero.webp` | `european-source/audi-diagnostics.png` | engine bay + cabled diagnostic tablet |
| `electrical-break.webp` | `european-source/bmw-oil-leak.png` | drain pan cropped out, so it reads as inspection |
| `autobody-hero.webp` | `european-source/break-workshop.png` | whole car bodies, warm bay, right side clear for copy |
| `autobody-panel.webp` | `Regular maintenance ….png` | native 977x550, inset rather than stretched |
| `transmission-hero.webp` | `european-source/mercedes-air-suspension.png` | atmosphere only, behind the 0.7 overlay |
| `transmission-break.webp` | `european-source/landrover-underbody.png` | the most drivetrain-credible underbody available |
| `european-intro.webp` | `alignment.jpg` | retires the last labelled PLACEHOLDER on the site |

Nothing is upscaled and no gradient or text is baked in; every readability
treatment is CSS.

**Replacement candidates, in priority order:**

1. **Transmission** — neither image shows an actual gearbox or clutch. A
   transmission or clutch on the bench would be a real upgrade.
2. **Auto Body** — true panel, paint or dent work. The current hero shares its
   photograph with the European page's break, in a different crop and role.
3. **European intro** — the photograph the delivery archive was meant to carry.
   Drop it at `public/european-intro.webp`.
4. **Electrical** — its two crops share sources with the European Audi and BMW
   marque plates, again in different crops and roles.

### Navigation

`app/site-nav.ts` is the single source for header flyout, mobile accordion and
footer. Three entries were added; the Services order is now the approved set:
Service & Maintenance, Tire & Wheel, Maintenance & Service Intervals, European
Car Repair Specialists, Electrical Systems Diagnostics & Service, Auto Body
Services, Transmission Service. No Performance page was created.

One fix the fuller menu forced: with the set complete, the flyout ran past the
bottom of a short desktop window. `.aaw-subnav` now takes
`max-height: calc(100vh - 150px)` with `overflow-y: auto`. Row height, header
alignment and the Services arrow are untouched — the locked metrics still hold.

### QA

All six pages at 1920 / 1440 / 1366 / 1024 / 768 / 390: one H1, no heading-level
skips, locked shell metrics (utility 41, header 85, logo 98x34, hero 600), all
images loaded, all reveals fired, no failed requests, no console output.

**Overflow was measured by bounding box, not `scrollWidth`.** The European
lesson holds: `overflow-x: clip` reports a zero delta while content is clipped
away. The detector now also distinguishes an `overflow-x: auto` ancestor — a
scroll container, whose children are reachable — from `clip`/`hidden`, which
genuinely cuts content off. Result: zero escaping elements on all six pages.

Keyboard: all six service links in the flyout are reachable and fully in view
at 1366x640, each with a visible white 2px focus ring on the teal panel. The
live-site rows have no `href` while the preview is scoped, so they are not
focusable and no one can be stranded below the fold.

Reduced motion: every reveal target shown, nothing left transformed, no
animation running, full text visible.

Static snapshot: six routes, direct navigation and refresh, real dropdown
clicks navigating between pages with no `.rsc` failures.
