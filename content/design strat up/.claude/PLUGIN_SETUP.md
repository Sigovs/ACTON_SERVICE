# Claude Code plugin and skill setup

Project settings enable the design-related plugins used by this workflow:

- `frontend-design` — mandatory for visual concept and interface work
- `figma` — Figma inspection and write actions when a Figma file is part of the task
- `playwright` — browser screenshots, responsive testing, and interaction QA
- `adobe-for-creativity` — optional production image treatment
- `context7` — current library documentation when code needs it

Required user-level custom skill system:

- Alex's `design_dna` system — load only the relevant composition, typography, color, interaction, motion, responsive, and dimensionality modules

## Install/verify

From Claude Code, use `/plugin` to verify the official plugins are installed and enabled. If one is missing, install it from `claude-plugins-official` for this project.

The Design DNA system should remain a user-level/shared source of truth rather than copied into this repository. This prevents stale duplicates and keeps updates available to every project.

## Session check

Before visual work, Claude should state which relevant skills are active. Before browser QA, verify Playwright can open the local static files and capture all required viewport sizes.
