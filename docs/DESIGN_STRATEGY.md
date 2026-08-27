# Acton Autowerks Service Page Design Strategy

## Correction — 2026-08-26

An earlier build treated Tire & Wheel Service as a standalone marketing landing
page: an oversized editorial hero, an outlined "Service" word, a "Service Page
01" marker, a split gray hero, experimental grid lines, invented taglines, and
a wrong Powder Mill Road address. That direction is withdrawn.

The pages are **internal child content pages of
`https://www.actonautowerks.com/service-maintenance/`**. The design goal is not
a better-looking page in the abstract. It is a page that a visitor would assume
had always been part of the site.

## Decision

Recreate the live Service & Maintenance page's visual language and proportions,
then place approved content inside it. Improve hierarchy and pacing only within
the space the existing system already allows.

## Acceptance test

Screenshot the new page's first viewport next to `/service-maintenance/`. If the
utility bar, header, logo plate, nav, Get A Quote button, hero background, hero
corner radius, title scale, and breadcrumbs do not line up, the page is wrong —
regardless of how good it looks on its own.

## Inherited shell (fixed)

Extracted from the live Elementor kit rather than eyeballed. See `CLAUDE.md`
for the full token, type, and component table. Summary:

| Layer | Direction |
|---|---|
| Utility bar | Solid `#0B5C7F`, Montserrat 600 14px, ruled inline items, social right |
| Header | Black, sticky, floats 95px over the hero, `#C0D7E033` hairline |
| Logo | `site-logo.png` on the angled `Logo-bg.png` plate |
| Nav | Montserrat 600 16/28 white, active teal |
| Get A Quote | Compact teal, 5px radius, signature chamfer clip-path |
| Page hero | Black, 600px min, photo + 0.7 overlay, `border-radius: 0 0 250px 0` |
| Hero order | Visual page title → single H1 subtitle → breadcrumbs, left aligned |
| Light sections | White with the `about-bg` / `service-bg` geometric pattern |
| Dark sections | Black over `portfolio-img.webp` at 0.9 overlay |
| Display type | Unbounded 700 |
| Body / UI type | Montserrat 500 |
| Primary teal | `#0B5C7F` |
| Body copy | `#555555` on light, `#DEDEDE` on dark |
| Container | 1350px, 20px inline padding |
| Section rhythm | 100 / 70 / 50px |
| Footer | `footer-bg-img.webp` at 0.9, four columns, teal copyright bar |

## What we still improve

Inside that shell, and only inside it:

- A clear single H1 and a scannable first screen
- Deliberate section pacing instead of stacked equal blocks
- Editorial typography for dense approved copy
- One topic-specific module per page so the six pages do not feel duplicated
- Consistent FAQ and final CTA treatment
- Layouts that hold at desktop, tablet, and mobile

## Baseline page: Tire & Wheel Service

Sections, in order:

1. Live utility bar and header
2. Native internal-page hero
   - visual page title: `Tire & Wheel Service`
   - H1: `Tire and Wheel Service in Acton, MA`
   - breadcrumbs: Home › Service & Maintenance › Tire & Wheel Service
3. Intro split — approved "only part that touches the road" copy + shop photo
4. Our Tire And Wheel Services — replacement, mounting/balancing, repair, alignment
5. Summer / all-season / winter tire education
6. Why An Alignment Matters — symptoms and honest-assessment language
7. Why New England Drivers Trust Us — 20+ years combined experience
8. Frequently Asked Questions — four approved Q&As in `details/summary`
9. Existing-style CTA band and footer

## Content boundary

Copy comes from `content/design strat up/docs/content/01-tires-wheels.md`.
Headings paraphrase that copy in the site's Title Case convention. Nothing about
certifications, warranties, pricing, turnaround, loaners, or guarantees is
invented. Contact facts are `(978) 429-8913`, `service@actonautowerks.com`,
`429 Great Rd, Acton, MA 01720`.

## Reuse plan

After Tire & Wheel is approved, extract a compact `Service Page Extension` —
hero, section head, card grid, split block, FAQ, CTA band — rather than
inventing a new site-wide design system. Apply it to:

- Maintenance & Service Intervals
- Electrical Systems Diagnostics & Service
- Auto Body Services
- Transmission Service

Build European Car Repair Specialists as a related hub variant with brand
navigation and longer content architecture, on the same shell and tokens.

## AAN boundary

AAN is required later for the dealer-site implementation, but it is absent from
the design phase. No current design choice should depend on AAN templates or
integration behavior. Translation into AAN happens only after design approval.

## Acceptance criteria

- Indistinguishable as a sibling of `/service-maintenance/` at first glance
- Correct contact facts; no Powder Mill Road
- Uses the supplied content without unsupported claims
- One H1, logical H2/H3 hierarchy, semantic FAQs
- Header/footer and brand tokens recreated, not reinterpreted
- No campaign-style visual detour or new global system
- Desktop, tablet, and mobile layouts hold together
- Production build succeeds
