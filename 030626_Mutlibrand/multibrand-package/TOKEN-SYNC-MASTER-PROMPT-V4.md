# Token Synchronization Master Prompt — Multi-Brand Edition
## AI-Governed Design System · Component Refactoring Guide

**Version:** 4.1 (Final — all layout, shell, and labeling fixes)
**Date:** March 2026
**Lineage:** v2.0 Button → v3.0 Multi-Brand → v4.0 Layout/Interaction → v4.1 Shell/Mobile/Compare

---

## Core Principle

*Shared architecture, owned values.*
Token names and CSS contracts are shared across all brands.
Brand decisions live only in token values under `[data-brand="brand-N"]`.
A single `data-brand` attribute change switches the entire theme — zero JS color logic.

---

## Prerequisites

- ✅ `Primitives_Multibrands.json` — Figma export with all brand modes
- ✅ `Semantic_Multibrands.json` — Figma export with all brand modes
- ✅ Node.js for running token generation scripts
- ✅ All deliverables must be **self-contained single HTML files** (CSS inlined, no external `<link>`)

---

## Step 1 — Parse Figma JSON & Map Mode IDs

Figma exports use **different mode IDs for the same brands** across the two files. Map manually:

```javascript
// Primitives: { "13843:8": "Brand 1", "13846:0": "Brand 2", "13846:1": "Brand 3" }
// Semantic:   { "13789:1": "Brand 1", "13846:2": "Brand 2", "13846:3": "Brand 3" }

const semanticToPrimitive = {
  '13789:1': '13843:8',  // Brand 1
  '13846:2': '13846:0',  // Brand 2
  '13846:3': '13846:1',  // Brand 3
};
```

Resolve all semantic aliases recursively (up to 8 hops). Strip `"VariableID:"` prefix before lookup.

**Key differentiating tokens per brand:**

| Token | Brand 1 (Navy) | Brand 2 (Brown) | Brand 3 (Green) |
|---|---|---|---|
| `--btn-solid-default` | `#142d51` | `#5a2f1f` | `#15613f` |
| `--btn-solid-hover` | `#24508f` | `#79574a` | `#417f63` |
| `--btn-radius` | `4px` | `0px` | `16px` |
| `--btn-font-family` | Proxima Nova | Cormorant Garamond | Nunito |

---

## Step 2 — Three-Layer CSS Architecture

```css
/* LAYER 1 — Shared primitives (:root) */
:root {
  --spacing-200: 8px;
  --color-neutral-200: #e8e8e8;
  /* identical across all brands */
}

/* LAYER 2 — Brand semantic values */
[data-brand="brand-1"] { --btn-solid-default: #142d51; --btn-radius: 4px; }
[data-brand="brand-2"] { --btn-solid-default: #5a2f1f; --btn-radius: 0px; }
[data-brand="brand-3"] { --btn-solid-default: #15613f; --btn-radius: 16px; }

/* LAYER 3 — Component tokens (alias Layer 2 only — never skip layers) */
.discovery-section {
  --discovery-filter-active-bg: var(--btn-solid-default);
  --discovery-filter-radius:    var(--btn-radius);
}
```

❌ Never: `--discovery-bg: var(--color-blue-900)` (skips semantic layer)
✅ Always: `--discovery-bg: var(--btn-solid-default)`

---

## Step 3 — Page Header (Hero Pattern)

All DLS documentation pages use a **3-row stacked hero header** — never a compact single-row nav bar.

```html
<header class="page-header">
  <!-- Row 1: eyebrow + nav links -->
  <div class="page-header-top">
    <span class="logo">Design Language System</span>
    <nav class="nav-links">
      <a href="...">← Button Components</a>
    </nav>
  </div>
  <!-- Row 2: H1 + badge -->
  <div class="page-header-title">
    <h1>Multi-Brand Product Discovery · 2026</h1>
    <span class="badge">Multi-Brand</span>
  </div>
  <!-- Row 3: subtitle with monospace chips -->
  <p class="page-header-subtitle">
    Token-synced from <span class="chip">Primitives_Multibrands.json</span>
    + <span class="chip">Semantic_Multibrands.json</span>
    · 3 brands · Shared architecture, owned values
  </p>
</header>
```

```css
.page-header {
  background: var(--shell-surface, #142d51);  /* DLS navy — NEVER black */
  color: #ffffff;
  padding: 36px 48px 32px;
}
.page-header .logo {
  font-size: 11px; font-weight: 600;
  letter-spacing: 0.12em; text-transform: uppercase; opacity: 0.55;
}
.page-header h1 {
  font-size: 28px;
  font-weight: 400;                /* Regular — not Bold */
  font-family: "Proxima Nova", ui-sans-serif, system-ui, -apple-system, sans-serif;
  letter-spacing: -0.01em;
}
.page-header .badge {
  background: #8e2231; color: #fff;
  font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
  text-transform: uppercase; border-radius: 100px; padding: 4px 10px;
}
.page-header-subtitle { font-size: 13px; opacity: 0.60; }
.page-header-subtitle .chip {
  font-family: 'SF Mono', 'Fira Code', monospace; font-size: 11px;
  background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.15);
  border-radius: 4px; padding: 2px 6px;
}
```

**Shell color:** `#142d51` everywhere — page header, token panel headers, compare section headers.
❌ Never use `#181818` or `#000` for nav/header backgrounds.

---

## Step 4 — Mobile Layout (CRITICAL)

On mobile (`max-width: 639px`), heading + filter buttons must stack **ABOVE** the carousel.

```css
@media (max-width: 639px) {
  .discovery-inner {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 24px 16px;
  }
  .discovery-left  { order: 1; width: 100%; }  /* heading + filters: ALWAYS first */
  .discovery-right { order: 2; width: 100%; }  /* carousel: ALWAYS second */
  .discovery-filters { flex-direction: column; width: 100%; }
  .filter-btn { width: 100%; }                 /* full-width stacked buttons */
}
@media (min-width: 640px) {
  .discovery-filters { flex-direction: column; }
  .filter-btn { width: 100%; }
}
```

❌ Anti-pattern: `flex-direction: row; flex-wrap: wrap` on mobile filters — buttons become cramped chips, not full-width.

---

## Step 5 — Compare All View (CRITICAL)

Compare view must be **vertically stacked** (one brand per row), not a 3-column side-by-side grid.

```css
/* Stacked, not grid */
.compare-grid {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* Each brand section: force 2-col desktop layout */
.compare-column .discovery-inner {
  grid-template-columns: 1fr 2fr !important;
  gap: 32px !important;
  padding: 32px !important;
  align-items: center !important;
}
.compare-column .discovery-filters { flex-direction: column !important; }
.compare-column .filter-btn        { width: 100% !important; }

/* Brand label as section divider */
.brand-label {
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--color-neutral-500, #7c7c7c);
  margin-bottom: 12px; padding-bottom: 12px;
  border-bottom: 1px solid #e5e5e5;
  display: flex; align-items: center; gap: 8px;
}
```

❌ Anti-pattern: `grid-template-columns: repeat(3, 1fr)` — produces cramped 3-column layout.

---

## Step 6 — Carousel Architecture

**Never rebuild DOM on pagination** — animate the track transform directly.

```javascript
// ✅ Smooth animation — updates transform, CSS transition fires
function slideToPage(containerId, newPage, pages) {
  const track = document.getElementById(`${containerId}-track`);
  track.style.transform = `translateX(-${newPage * 100}%)`;
  // update arrows + dots state...
}

// ❌ Kills animation — full DOM rebuild has no element to transition
function goToPage(newPage) {
  state.page = newPage;
  buildDiscovery(containerId, state.brandKey); // NEVER on pagination
}
```

```css
.carousel-track { display: flex; transition: transform 300ms ease-in-out; }
```

**Arrow wrapper structure** — two-layer separation to clip track without clipping arrows:

```html
<div class="carousel-container">     <!-- NO overflow:hidden, margin:0 24px -->
  <div class="carousel-wrapper">     <!-- overflow:hidden — clips track only -->
    <div class="carousel-track">...</div>
  </div>
  <button class="arrow-btn prev">‹</button>
  <button class="arrow-btn next">›</button>
</div>
```

```css
.carousel-container { position: relative; margin: 0 24px; /* no overflow:hidden */ }
.carousel-wrapper   { overflow: hidden; }
.arrow-btn.prev     { position: absolute; left: -24px;  top: 50%; transform: translateY(-50%); }
.arrow-btn.next     { position: absolute; right: -24px; top: 50%; transform: translateY(-50%); }
/* Arrow style: neutral grey — NOT brand color */
.arrow-btn { background: #fff; border: 1px solid #c5c5c5; color: #686868; border-radius: 50%; }
```

---

## Step 7 — Card Image (No Ghost Space)

```css
/* ✅ Correct — position:absolute fills aspect-ratio container exactly */
.card-image { position: relative; aspect-ratio: 3/4; overflow: hidden; flex-shrink: 0; }
.card-img   { position: absolute; top: 0; left: 0; width: 100%; height: 100%;
              object-fit: cover; display: block; }

/* ❌ Wrong — img in normal flow + aspect-ratio parent = double height + grey space */
.card-image { aspect-ratio: 3/4; }
.card-img   { width: 100%; } /* causes ghost grey below image */
```

Card: `display: flex; flex-direction: column; gap: 0` — no gap between image and info.

---

## Step 8 — Badge + Quick Shop Z-Index

```css
.card-badge  { position: absolute; bottom: 48px; left: 8px; z-index: 4; }
.quick-shop  { position: absolute; bottom: 0; z-index: 3; }
/* Badge (4) always above Quick Shop overlay (3) */
```

---

## Step 9 — Brand-Aware Interaction Icons

Wishlist heart inherits brand color automatically via token cascade — zero JS logic:

```css
.card-wishlist svg        { color: var(--btn-solid-default, #142d51); }
.card-wishlist.wishlisted svg { fill: var(--btn-solid-default, #142d51); }
/* Brand 1 → navy, Brand 2 → brown, Brand 3 → green — automatic */
```

---

## Step 10 — Delivery: Inline All CSS

External `<link>` tags break on `file://` protocol. Always inline before delivery:

```python
with open('tokens-multibrand.css') as f: token_css = f.read()
with open('index.html') as f: html = f.read()
html = html.replace(
  '<link rel="stylesheet" href="tokens-multibrand.css" />',
  f'<style id="tokens-multibrand">\n{token_css}\n</style>'
)
```

Always include CSS fallback values: `var(--token, fallback)` — never bare `var(--token)`.

---

## Step 11 — Brand Labeling Convention

Never use product brand names in documentation UI. Use neutral numbered labels:

```
Brand 1 — Navy       ✅    (not "Brand 1 — UNTUCKit")
Brand 2 — Brown      ✅    (not "Brand 2 — Banana Republic")
Brand 3 — Green      ✅    (not "Brand 3 — Athleta")
```

Keeps the case study portable across client presentations without text edits.

---

## Anti-Patterns Quick Reference

| ❌ Anti-Pattern | ✅ Correct |
|---|---|
| `buildDiscovery()` on arrow click | `slideToPage()` — transform only |
| `overflow:hidden` on arrow parent | Two-layer: container (no clip) + wrapper (clips track) |
| `<img>` normal flow + `aspect-ratio` | `position:absolute` img inside `position:relative` container |
| `repeat(3, 1fr)` for compare view | `flex-direction: column` — stacked |
| `flex-direction:row; flex-wrap:wrap` mobile filters | `flex-direction:column; width:100%` — full-width stack |
| `font-weight:700` on page H1 | `font-weight:400` — Proxima Nova Regular |
| `#181818` or `#000` for nav background | `#142d51` — DLS navy always |
| External `<link>` to CSS in deliverable | Inline all CSS into `<style>` block |
| `var(--token)` without fallback | `var(--token, fallback-value)` |
| Product brand names in UI labels | "Brand 1 / 2 / 3 — Navy / Brown / Green" |
| Brand color logic in JS | Single `data-brand` attribute, zero JS color logic |
| Layer 3 → Layer 1 token skip | Component → Semantic → Primitive always |

---

## Pre-Delivery Checklist

- [ ] CSS fully inlined — no external `<link>` to `.css` files
- [ ] All `var()` calls have fallback values
- [ ] 0 hardcoded hex values in component CSS (run `node scripts/token-audit.js`)
- [ ] Brand switching works via single `data-brand` attribute
- [ ] Carousel animates — 300ms `ease-in-out` slide transition visible
- [ ] Arrows fully visible — not clipped by `overflow:hidden`
- [ ] No ghost grey space below card images
- [ ] Mobile: filters + heading render ABOVE carousel (`order:1` / `order:2`)
- [ ] Mobile: filter buttons are full-width stacked (not row chips)
- [ ] Compare All: brands render stacked vertically (not 3-column side-by-side)
- [ ] Compare All: each brand section shows 2-col layout (heading left, carousel right)
- [ ] Page header is 3-row hero pattern (eyebrow / H1+badge / subtitle)
- [ ] H1 is `font-weight:400` Proxima Nova Regular
- [ ] Nav header is `#142d51` — not black, not brand-colored
- [ ] No product brand names in UI labels — "Brand 1 / 2 / 3" convention
- [ ] Wishlist heart color matches brand primary across all 3 brands
- [ ] Badge visible above Quick Shop overlay

---

## Deployment

```bash
node scripts/generate-tokens.js   # regenerate from Figma exports
node scripts/token-audit.js       # verify 0 hardcoded values
vercel --yes                       # deploy
```
