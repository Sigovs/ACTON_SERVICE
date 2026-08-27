# Content and page architecture

## Six-page matrix

| # | Slug / folder | Page | Content scale | Recommended page grammar | Main design risk |
|---|---|---|---|---|---|
| 01 | `tires-wheels` | Tire and Wheel Service | Focused | Editorial service page with tire-mode comparison, alignment education, FAQ, CTA | Becoming a generic list of tire services |
| 02 | `maintenance` | Maintenance and Service Intervals | Focused | Interval-led service page with maintenance system, cadence, trust, FAQ, CTA | Looking like a checklist or oil-change coupon page |
| 03 | `european-repair` | European Car Repair Specialists | Very large hub | Intro + seven-brand navigator + brand chapters + contextual service index + CTA | A 12-page text wall or seven identical accordion dumps |
| 04 | `electrical-systems` | Electrical Systems Diagnostics & Service | Focused | Diagnostic-story page with signal-to-cause logic, capability list, FAQ, CTA | Visualizing electronics as generic blue-tech graphics |
| 05 | `auto-body` | Auto Body Services | Focused, partner-dependent | Coordination/service pathway page with clear onsite/partner distinction | Accidentally implying body work is performed onsite |
| 06 | `transmission` | Transmission Service | Focused | Symptom-led page with service range, warning signs, trust, FAQ, CTA | Fear-based repair clichés and stock gearbox imagery |

## Shared page system

The shared system may provide:

- Global header and footer context
- Service-page identity/hero framework
- Breadcrumb and local navigation behavior
- Trust/evidence module
- FAQ behavior
- Appointment CTA system
- Shared type, spacing, color, button, image, icon, and motion tokens

The shared system must support multiple compositions. It is a grammar, not one frozen stack of reusable sections.

## Page 01 — Tires and Wheels

Source: `docs/content/01-tires-wheels.md`

Key content groups:

- Tire replacement, mounting/balancing, repair, and alignment
- Summer, all-season, and winter tire needs
- Alignment symptoms and value
- European/run-flat/performance expertise
- Four FAQs
- Appointment CTA

Potential visual material: tread, wheel face, balancing equipment, alignment laser/rig, seasonal road conditions, hands-on service detail.

## Page 02 — Maintenance

Source: `docs/content/02-maintenance.md`

Key content groups:

- Ten maintenance capabilities
- 5,000 miles / 6 months guideline
- Preventive-care positioning
- European manufacturer schedules
- Check-engine and fleet questions
- Four FAQs
- Appointment CTA

Potential visual material: timeline/interval system, fluids and filters, inspection sequence, service record, honest recommendation moment.

## Page 03 — European Car Repair

Source: `docs/content/03-european-repair.md`

Key content groups:

- Long introductory sales copy
- Audi: 8 named issue/service groups
- BMW: 7 named issue/service groups
- Mercedes-Benz: 10 named issue/service groups
- Porsche: 7 named issue/service groups
- Land Rover: 7 named issue/service groups
- Jaguar: 4 named issue/service groups
- Volkswagen: 12 named issue/service groups

Recommended architecture principles:

- Provide a seven-brand overview near the top.
- Keep meaningful HTML headings and all text in the document flow for SEO and accessibility.
- Use sticky/local brand navigation only when it remains usable on mobile and by keyboard.
- Use progressive disclosure carefully; users must understand how much content exists and where they are.
- Avoid manufacturer logos until usage rights and approved assets are confirmed.
- Do not imitate an authorized dealer brand page.

## Page 04 — Electrical Systems

Source: `docs/content/04-electrical-systems.md`

Key content groups:

- Battery, interior/audio, dashboard/gauge, and software-update capability
- Explanation of diagnostic complexity
- European electronics specialization
- Four FAQs
- Appointment CTA

Potential visual material: diagnostic screen, measured signal, instrument cluster, battery/charging system, technician using OEM-grade diagnostic equipment.

## Page 05 — Auto Body

Source: `docs/content/05-auto-body.md`

Key content groups:

- Explicitly no onsite auto-body facility
- Coordination through trusted partner shops
- Collision support: written estimates, drop-off and pickup, coordinating the repair
- Vintage/classic European restoration through two partner restoration shops
- Related body and protection services: paintless dent removal, winterization,
  rust prevention, undercoating, lubrication
- Four FAQs
- Appointment CTA

The onsite/partner distinction is structural content and must not be buried in small print.

## Page 06 — Transmission

Source: `docs/content/06-transmission.md`

Key content groups:

- Transmission inspection, diagnostics, repair and replacement, fluid service,
  filter replacement, clutch replacements and upgrades
- Warning signs: strange noises, difficulty changing gears, sticking in gear,
  and fluid leaking underneath
- European specialization plus service for most makes/models
- Four FAQs
- Appointment CTA

Potential visual material: diagnostic/service sequence, fluid inspection, transmission detail, clutch component, road/shift behavior—not only an isolated stock gearbox render.

