# Acton Autowerks — six-page service-site project

This is the pre-design foundation for six independent service pages inside the existing Acton Autowerks website. It is intentionally documentation-first: the global site language already exists, while the service-page system and individual page compositions still need to be designed.

## Start here

1. Open the project in Claude Code from this folder.
2. Confirm the required plugins and skills listed in `.claude/PLUGIN_SETUP.md` are available.
3. Read `CLAUDE.md`, then `BRIEF.md`, `CONTENT_MAP.md`, and `DESIGN_DNA.md`.
4. Audit the current site language, then explore two or three service-page directions that remain recognizably Acton.
5. Do not code all six pages at once. Approve one representative service page first, then extract the shared page system.

## Scope

The supplied document contains six separate pages:

1. Tire and Wheel Service
2. Maintenance and Service Intervals
3. European Car Repair Specialists
4. Electrical Systems Diagnostics & Service
5. Auto Body Services
6. Transmission Service

The source PDF is preserved under `docs/source/`. Extracted page copy lives under `docs/content/` and must remain traceable to the source.

## Project map

- `CLAUDE.md` — operating contract for every session
- `BRIEF.md` — project definition, constraints, workflow, and acceptance criteria
- `CONTENT_MAP.md` — six-page architecture and component implications
- `DESIGN_DNA.md` — Acton-specific visual principles; not a locked art direction
- `PROJECT_STATE.md` — current stage, active task, blockers, and next action
- `DECISIONS.md` — append-only record of approved decisions
- `.claude/` — plugin and skill setup
- `docs/content/` — one source-of-truth file per page
- `docs/design/` — research, territories, and design rationale
- `docs/qa/` — visual and technical QA rules
- `mockups/` — eventual plain HTML/CSS/JS deliverables
