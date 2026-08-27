# Acton Autowerks — Service Pages

Local design/build workspace for six SEO content pages that will live inside the
existing Acton Autowerks website.

The first page, **Tire & Wheel Service**, is the baseline. It establishes the
content-page layout that the remaining focused service pages will reuse.

## Start locally

Requirements: Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. Production verification:

```bash
npm run build
```

## VS Code + Claude Code

- Open this folder in VS Code.
- Install the extensions suggested by `.vscode/extensions.json`.
- Claude Code reads `CLAUDE.md` automatically from the project root.
- Use `/new-service-page` in Claude Code for the next content page.
- The current strategy and fixed design rules live in
  `docs/DESIGN_STRATEGY.md`.

## Page inventory

1. Tire & Wheel Service — baseline in progress
2. Maintenance & Service Intervals
3. European Car Repair Specialists — larger hub template
4. Electrical Systems Diagnostics & Service
5. Auto Body Services
6. Transmission Service

## Important constraint

These are not standalone campaign landing pages. They are internal content pages
for the current Acton Autowerks site. Preserve its global shell, visual identity,
and navigation behavior. AAN is a later implementation concern and is not used
to constrain the design phase.
