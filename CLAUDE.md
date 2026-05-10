# Project Instructions

## Protected Files — DO NOT MODIFY

The following public HTML files are finalized and deployed. **Never** overwrite, refactor, or modify their content, structure, or styling unless the user explicitly requests a specific change to that file by name:

- `public/index.html`
- `public/ai-experiments.html`
- `public/dls-2026-case-study.html`
- `public/insight-engine-case-study.html`
- `public/cpo-case-study.html`
- `public/top-nav-plp.html`
- `public/pdp.html`
- `public/about-me.html`
- `vercel.json`

Before making any change to these files, confirm with the user what specifically will be modified and get explicit approval.

## Token Reference Display Conventions

- **Single-brand pages** (`/`, `/product-card`, `/product-discovery`):
  Token reference cells show the resolved hex value only.

- **Multi-brand page** (`/multibrand/`):
  Each brand cell MUST show BOTH the semantic→primitive alias path
  (e.g., "Blue-Brand 1/Blue-900") AND the resolved hex below it.
  This mirrors how Figma displays semantic tokens in the Variables
  panel. Don't collapse multibrand cells to hex-only — the alias
  path IS the architectural story being told.
