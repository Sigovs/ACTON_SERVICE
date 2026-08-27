# Claude Code Project Rules — Acton Autowerks

## Mission

Design and build six internal SEO/content pages for the existing Acton
Autowerks website. The pages are **child pages of the live Service &
Maintenance section**, not standalone marketing landing pages and not a
separate microsite.

Parent page: `https://www.actonautowerks.com/service-maintenance/`

## Current milestone

Finish and approve `Tire & Wheel Service` first. Treat it as the reusable
baseline for the other focused service pages. Do not start all six pages at once.

## Prime directive — native sibling, not a redesign

Every page must read as a page that already exists inside the live site.
The correct test is: *place a screenshot of the new page next to a screenshot of
`/service-maintenance/` — a stranger should not be able to tell which one is new.*

Do not redesign the Acton Autowerks brand. Recreate its shell and proportions,
then place approved content inside it.

## Inherited shell — recreate exactly, do not reinterpret

Source of truth is the live page's own CSS (Elementor kit 6, header 27,
footer 56, page 504). Values below are extracted from it.

### Tokens

| Token | Value |
|---|---|
| Primary teal | `#0B5C7F` |
| Black | `#000000` |
| White | `#FFFFFF` |
| Text on dark | `#DEDEDE` |
| Body copy on light | `#555555` |
| Tint / button hover | `#DEEDF4` |
| Container max width | `1350px`, inline padding `20px` |
| Section rhythm | `100px` desktop, `70px` ≤1024, `50px` ≤767 |

### Typography

| Role | Stack |
|---|---|
| Display / page title | Unbounded 700 · 60/85 → 54/75 (≤1366) → 48/58 (≤1024) → 30/40 (≤767) |
| H2 | Unbounded 700 · 40/60 → 38/55 → 34/44 → 24/34 |
| H3 | Unbounded 700 · 20/30 → 18/28 |
| Hero H1 subtitle | Unbounded 700 · 25/45 → 25/30 → 20/30 |
| Body / UI | Montserrat 500 · 16/28 |
| Buttons / accent | Montserrat 700 · 16/19, uppercase |
| Utility bar | Montserrat 600 · 14/20 |

### Shell components

- **Utility bar** — solid `#0B5C7F`, white Montserrat 600 14px, inline items
  separated by 1px `#DDDDDD6B` rules, 40px gap, social icons right with a
  `#FFFFFF33` left divider. Hidden below 767px.
- **Header** — black, sticky, 1px `#C0D7E033` bottom border, backdrop blur,
  `margin-bottom: -95px` so it floats over the top of the page hero.
- **Logo** — `site-logo.png` (112×39) inside the angled `Logo-bg.png` plate with
  the `header-bg.png` band running off to the left.
- **Nav** — Montserrat 600 16/28 white, active and hover `#0B5C7F`. "Services"
  opens a teal flyout (250px wide, 28px below the item, white links inverting
  to teal-on-white) on hover and focus-within.
- **Menu breakpoints** — the horizontal nav is replaced by the burger toggle at
  `≤1024px`, matching the live Elementor `dropdown-tablet` setting. The toggle
  is a 2px teal outline, 5px radius, 25px glyph, transparent fill. At `≤767px`
  the utility bar and the Get A Quote button both drop, leaving logo + toggle.
- **Mobile panel** — absolutely positioned under the header block, teal
  `#0B5C7F`, 15px offset, `scaleY` + `max-height` reveal over 0.3s from
  `transform-origin: top`. Links are Montserrat 600 16px capitalize with
  12px/20px padding, inverting to teal-on-white. "Services" expands its
  submenu in place with a rotating chevron; it is not a link, same as live.
- **Get A Quote button** — compact, teal, 5px radius, and the site's signature
  chamfer `clip-path: polygon(20% 0%,100% 0,100% 20%,100% 82%,92% 100%,20% 100%,0 100%,0 0)`.
  Hover inverts to `#DEEDF4` on `#0B5C7F`.
- **Internal-page hero** — black, `min-height: 600px`, padding `145px 20px 50px`,
  photographic background under a 0.7 black overlay plus
  `main-banner-bg-overlay-img.png` bottom-right, and the large rounded
  bottom-right corner `border-radius: 0 0 250px 0`.
- **Hero content order** — visual page title (display size), then the single H1
  subtitle, then breadcrumbs. Left aligned inside the 1350px container.
- **Breadcrumbs** — Montserrat 500 16px, 10px gap, `breadcrumb-img.svg`
  separator, links `#DEDEDE`, current page white 700.
- **Light content sections** — white with the subtle `about-bg.webp` /
  `service-bg.webp` geometric pattern.
- **Section heads** — centered `breadcrumbs-bmw-icon.svg` (dark type) or
  `breadcrumbs-white-icon.svg` (light type) above the H2, with a centered
  lede capped near 880–940px.
- **Cards** — white, 10px radius, `0 10px 40px rgba(0,0,0,.05)` shadow, the
  `service-bg-1.webp` texture, an oversized Unbounded number in `#DEDEDE`.
- **Footer** — `footer-bg-img.webp` under a 0.9 black overlay, four columns,
  Unbounded 600 16px column titles, teal copyright bar.

### Contact facts — the only correct values

- `(978) 429-8913`
- `service@actonautowerks.com`
- `429 Great Rd, Acton, MA 01720`

The Powder Mill Road address is wrong and must never appear.

## Banned on these pages

- Oversized editorial heroes, split gray heroes, experimental grid lines
- Outlined or ghosted display words
- "Service Page 01" style page markers
- Invented taglines such as "European expertise. Everyday confidence." or
  "Control starts here"
- Any second visual identity, alternate global navigation, or standalone
  campaign/microsite styling

## Content guardrails

- Use only approved source facts from `content/design strat up/docs/content/`.
  Do not invent certifications, warranties, pricing, turnaround times, loaner
  programs, guarantees, or service claims.
- Section headings should be drawn from or paraphrase the approved copy, in the
  site's Title Case convention.
- Keep exactly one clear H1 per page. The visual page title above it is not a
  heading element.
- Preserve local intent: Acton, MA and relevant service language.
- CTA for the baseline page: `Get A Quote` / `(978) 429-8913`.
- Use semantic HTML: `header`, `nav`, `main`, `section`, `article`, `footer`,
  and `details/summary` for FAQs.

## Template strategy

Focused service pages share this order:

1. Existing site utility bar and header
2. Native internal-page hero with breadcrumbs
3. Intro image/text split
4. Primary service list
5. Topic-specific education block
6. Topic-specific detail block
7. Proof/trust block
8. FAQ
9. Existing-style CTA band and footer

`European Car Repair Specialists` is the exception. It needs a hub structure
with brand navigation and deeper sections, while still using the same shell and
tokens.

## Implementation rules

- Main page: `app/page.tsx`
- Shell header and menu: `app/site-header.tsx` (client component — the menu
  needs state; the rest of the page stays a server component)
- Shared SVG glyphs: `app/icons.tsx`
- Shared styles: `app/globals.css`
- Metadata: `app/layout.tsx`
- Prefer data arrays and `.map()` for repeated service cards and FAQs.
- Keep responsive behavior at desktop, tablet, and mobile widths.
- Maintain visible focus states, adequate contrast, meaningful alt text, and
  reduced-motion support.
- Avoid unnecessary dependencies and animation libraries.
- Never deploy or publish unless Alex explicitly asks.
- Before handoff, run `npm run build` once as the final production gate.

## AAN boundary

AAN integration belongs to the later implementation phase. Do not add AAN
markup, constraints, or platform assumptions during design.

## Working rhythm

Before making a large visual change, compare it against
`docs/DESIGN_STRATEGY.md`. After a coherent edit, summarize what changed and
which page-system decision it establishes. Keep `docs/PROJECT_STATE.md` current.
