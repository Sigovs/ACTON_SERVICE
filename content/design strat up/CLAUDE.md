# Acton Autowerks project contract

Read this file at the start of every session. Then read `PROJECT_STATE.md` and only the page/content files relevant to the active task.

## What this project is

Design six separate Acton Autowerks service landing pages from the supplied client content. They are new internal SEO/service pages within the existing live site. They share its global visual language and shell, but they are not six copies of one template.

The five focused service pages may share a flexible page grammar. The European Car Repair page is a much larger brand/service hub and requires a distinct information architecture built from the same design system.

## Required knowledge before design

The following must be active before substantial visual or front-end work:

1. `frontend-design` — distinctive visual design and anti-template guidance.
2. Alex's Design DNA modules relevant to the task: composition, typography, color, interaction, motion, responsive behavior, and dimensionality.
3. `playwright` — browser screenshots, responsive review, and regression QA.
4. `figma` when reading from or writing to a Figma file.
5. `adobe-for-creativity` only when actual image treatment or production work needs it.
6. `context7` only when current library documentation is required.

If a required skill is unavailable, report the missing capability before styling. Do not replace it with invented rules.

## Non-negotiable scope rules

- Treat the supplied content as six independent pages.
- Do not redesign the homepage, header, footer, navigation, or global site architecture unless explicitly added to scope.
- Represent the current header/footer accurately enough to review every page in its real context.
- Preserve the supplied copy verbatim in source files. Never silently rewrite client copy.
- Record copy problems in `docs/content/COPY_AUDIT.md`; keep design and copy approval separate.
- Do not invent certifications, reviews, warranties, service claims, prices, brand authorizations, OEM status, addresses, or business facts.
- Do not imply Acton Autowerks is an authorized dealer for Audi, BMW, Mercedes-Benz, Porsche, Land Rover, Jaguar, or Volkswagen.
- Partner-provided auto-body work must remain clearly described as coordinated through partner shops, not performed onsite.

## Design sequence

1. Audit source copy, current assets, and missing inputs.
2. Audit the live site's inherited typography, palette, controls, imagery, spacing, and shell before introducing new page-level behavior.
3. Produce two or three genuinely different service-page territories that remain compatible with the live site. Each must define image language, layout behavior, information hierarchy, motion posture, and why it belongs to Acton.
4. Select one direction with Alex.
5. Build the shared shell and one representative focused service page first.
6. Validate desktop and mobile before propagating the system.
7. Build the European Car Repair hub separately; do not stretch a short-page template to contain it.
8. Confirm the implementation/handoff profile, then run visual and technical QA at the specified viewports.

Do not jump directly from the PDF to six coded pages.

## Design standard

- Specific to an independent European repair specialist in Acton and MetroWest; never generic luxury automotive.
- Extend the current Acton identity rather than replacing it: Unbounded display type, Montserrat body/UI, black/white foundations, and the existing blue-teal action color are inherited anchors.
- Competence before spectacle. The site should feel precise, experienced, candid, and human.
- Premium without pretending to be a dealership showroom.
- Automotive imagery must communicate service knowledge, parts, diagnostics, craft, and regional reality—not only glossy hero cars.
- Hierarchy comes from scale, rhythm, cropping, and contrast before cards, gradients, glows, and decorative effects.
- Use one clear primary action per view. Repeated service items do not each receive loud filled buttons.
- Motion supports orientation or meaning. The static composition must remain complete with motion disabled.
- Mobile is recomposed, not reduced by hiding the visual idea.

## Design-phase implementation profile

This project is for design exploration and browser-based visual prototyping inside the existing site identity. Do not introduce production-platform constraints during this phase.

- Art direction and page composition are platform-agnostic.
- Use the lightest prototype structure that lets the design be reviewed accurately.
- Keep the visual system coherent, responsive, accessible, and easy to translate later.
- Production adaptation is a later phase and is outside this project's current operating rules.

## File discipline

- Shared assets belong in `mockups/_shared/`; page-specific assets stay in the page folder.
- No files named `final`, `final2`, `new`, `test2`, or similar.
- Use numbered design passes and dated decision entries.
- Do not overwrite an approved visual baseline. Create the next numbered pass.
- Screenshots and recordings belong in `docs/qa/<pass-name>/`, not the project root.
- Keep `PROJECT_STATE.md` current after every meaningful work session.
- Append approved decisions to `DECISIONS.md`; do not rewrite history.

## Verification before reporting completion

- Review 1440×900, 1920×1080, 1024×1366, and 390×844.
- Confirm zero horizontal overflow and no clipped content.
- Confirm keyboard focus parity for hover states.
- Confirm reduced-motion behavior.
- Confirm headings, CTA labels, phone number, and page identity against source copy.
- Confirm the European brand navigation works and remains understandable in the chosen implementation profile.
- Capture desktop and mobile screenshots for the active pass.
- Report every file changed and any unresolved content/design decision.
