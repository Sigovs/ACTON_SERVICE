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
