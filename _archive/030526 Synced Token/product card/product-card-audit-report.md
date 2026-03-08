# ProductCard Component Audit Report
**Component:** ProductCard.tsx  
**Date:** March 5, 2026  
**Auditor:** AI-Governed Design System  
**Status:** ❌ NOT Token-Synced (hardcoded values detected)

---

## Executive Summary

| Metric | Count |
|--------|-------|
| **Total hardcoded instances** | **68** |
| **Categories affected** | **6** |
| **Unique tokens needed** | **31** |
| **Most frequent value** | `#ececec` (badge bg) - 8 instances |

---

## Breakdown by Category

### 1. **Colors** (32 instances)

#### Hex Colors (8 instances)
| Value | Usage | Count | Lines |
|-------|-------|-------|-------|
| `#ececec` | Badge background | 4 | 108, 109, 110, 111 |
| `#142D51` | Heart icon fill/stroke, text-blue-900 | 4 | 122, 123 |

#### Tailwind Color Classes (24 instances)
| Class | Usage | Count | Lines |
|-------|-------|-------|-------|
| `text-blue-900` | Badge text (default), CTA text, ring | 5 | 108, 111, 251, 267, 340 |
| `text-maroon` | Badge text (sale), price, promo | 4 | 109, 110, 186, 191 |
| `text-neutral-500` | Original price (sale) | 1 | 182 |
| `text-neutral-600` | Color name, footnote | 2 | 311, 351 |
| `text-neutral-700` | Title, regular price | 2 | 198, 297 |
| `text-neutral-400` | Placeholder background | 1 | 210 |
| `bg-neutral-400` | Image placeholder | 1 | 210 |
| `bg-white/60` | Quick Shop overlay | 2 | 249, 265 |
| `ring-blue-900` | Selected swatch ring | 1 | 340 |
| `ring-blue-300` | Focus ring | 1 | 326 |

**Token Mapping Needed:**
- `#ececec` → `--card-badge-bg`
- `#142D51` → `--color-blue-900` or `--color-primary`
- `text-maroon` → `--card-sale-text` or `--color-brand-maroon`
- `text-neutral-*` → Semantic text tokens
- `bg-white/60` → `--card-overlay-bg`

---

### 2. **Spacing** (18 instances)

#### Fixed Pixel Values
| Value | Usage | Count | Lines |
|-------|-------|-------|-------|
| `240px` | Quick Shop width | 2 | 248, 264 |
| `40px` | Quick Shop height | 2 | 248, 264 |
| `80px` | Quick Shop bottom position | 2 | 253, 272 |
| `32px` | Wishlist button (w-8 h-8) | 2 | 226 |
| `12px` | Wishlist inset (top-3 right-3) | 2 | 226 |
| `10px` | Badge inset (bottom-[10px] left-[10px]) | 2 | 284 |
| `24px` | Badge height (h-6) | 1 | 284 |
| `36px` | Mobile swatch size (w-9 h-9) | 2 | 326 |
| `30px` | Desktop swatch size (lg:w-[30px] lg:h-[30px]) | 2 | 326 |
| `16px` | Mobile swatch gap (gap-x-4) | 1 | 316 |
| `8px` | Desktop swatch gap (lg:gap-x-2) | 1 | 316 |

**Token Mapping Needed:**
- `240px` → `--card-cta-width`
- `40px` → `--card-cta-height`
- `80px` → `--card-cta-offset-bottom`
- `32px` → `--card-wishlist-size`
- `12px` → `--card-wishlist-inset`
- `10px` → `--card-badge-inset`
- `24px` → `--card-badge-height`
- `36px` → `--card-swatch-size-mobile`
- `30px` → `--card-swatch-size-desktop`
- `16px` → `--card-swatch-gap-mobile`
- `8px` → `--card-swatch-gap-desktop`

---

### 3. **Typography** (12 instances)

#### Font Properties
| Property | Value | Count | Lines |
|----------|-------|-------|-------|
| `font-proxima` | Proxima Nova | 10 | 182, 186, 191, 198, 250, 266, 286, 297, 311, 351 |
| `font-normal` | 400 weight | 4 | 182, 186, 191, 198 |
| `font-medium` | 500 weight | 4 | 250, 266, 297, 311 |
| `font-semibold` | 600 weight | 2 | 286, 351 |
| `text-base` | 16px | 3 | 182, 186, 198 |
| `text-sm` | 14px | 3 | 191, 250, 266, 286, 311 |
| `text-[10px]` | 10px | 1 | 351 |
| `leading-5` | 20px | 3 | 182, 186, 198 |
| `leading-4` | 16px | 4 | 191, 250, 266, 286, 311 |
| `leading-3` | 12px | 1 | 351 |
| `tracking-[0.32px]` | 0.32px | 3 | 182, 186, 198, 297 |
| `tracking-[0.28px]` | 0.28px | 5 | 191, 250, 266, 286, 311 |
| `tracking-[0.2px]` | 0.2px | 1 | 351 |

**Token Mapping Needed:**
- `font-proxima` → `--font-family-primary`
- Font weights → `--font-weight-normal/medium/semibold`
- Font sizes → `--font-size-base/sm/xs`
- Line heights → `--line-height-tight/base/relaxed`
- Letter spacing → `--tracking-tight/base/wide`

---

### 4. **Dimensions** (4 instances)

| Value | Usage | Count | Lines |
|-------|-------|-------|-------|
| `321 / 381` | Image aspect ratio | 1 | 211 |
| `20` (width) | Heart icon SVG | 1 | 119 |
| `18` (height) | Heart icon SVG | 1 | 120 |
| `1.5` | Heart stroke width | 1 | 124 |

**Token Mapping Needed:**
- `321 / 381` → `--card-image-aspect-ratio`
- Heart dimensions → `--card-icon-size` (configurable)
- Stroke width → `--card-icon-stroke-width`

---

### 5. **Border/Radius** (1 instance)

| Value | Usage | Count | Lines |
|-------|-------|-------|-------|
| `rounded-full` | Swatches | 4 | 326, 329, 340 |
| `ring-[1.5px]` | Selected swatch | 1 | 340 |

**Token Mapping Needed:**
- `rounded-full` → Already semantic, no change needed
- `ring-[1.5px]` → `--card-swatch-ring-width`

---

### 6. **Motion** (1 instance)

| Value | Usage | Count | Lines |
|-------|-------|-------|-------|
| `duration-200` | Quick Shop fade | 1 | 270 |

**Token Mapping Needed:**
- `duration-200` → `--card-cta-transition-duration`

---

## Detailed Token Requirements

### Layer 3: ProductCard Component Tokens

```css
:root {
  /* Dimensions */
  --card-image-aspect-ratio: 321 / 381;
  --card-cta-width: 240px;
  --card-cta-height: 40px;
  --card-cta-offset-bottom: 80px;
  --card-wishlist-size: 32px;
  --card-wishlist-inset: 12px;
  --card-badge-height: 24px;
  --card-badge-inset: 10px;
  --card-swatch-size-mobile: 36px;
  --card-swatch-size-desktop: 30px;
  --card-swatch-gap-mobile: 16px;
  --card-swatch-gap-desktop: 8px;
  --card-swatch-ring-width: 1.5px;
  
  /* Colors */
  --card-badge-bg: #ececec;
  --card-badge-text-default: var(--color-blue-900);
  --card-badge-text-sale: var(--color-brand-maroon);
  --card-overlay-bg: rgba(255, 255, 255, 0.6);
  --card-placeholder-bg: var(--color-neutral-400);
  --card-title-text: var(--color-neutral-700);
  --card-price-text: var(--color-neutral-700);
  --card-price-original-text: var(--color-neutral-500);
  --card-price-sale-text: var(--color-brand-maroon);
  --card-promo-text: var(--color-brand-maroon);
  --card-color-name-text: var(--color-neutral-600);
  --card-footnote-text: var(--color-neutral-600);
  --card-cta-text: var(--color-blue-900);
  --card-icon-fill: var(--color-blue-900);
  --card-icon-stroke: var(--color-blue-900);
  --card-swatch-ring: var(--color-blue-900);
  --card-focus-ring: var(--color-blue-300);
  
  /* Typography */
  --card-font-family: var(--font-family-primary);
  --card-title-size: var(--font-size-base);
  --card-title-weight: var(--font-weight-medium);
  --card-title-line-height: var(--line-height-tight);
  --card-title-tracking: 0.32px;
  --card-price-size: var(--font-size-base);
  --card-price-weight: var(--font-weight-normal);
  --card-promo-size: var(--font-size-sm);
  --card-badge-size: var(--font-size-sm);
  --card-badge-weight: var(--font-weight-semibold);
  --card-cta-size: var(--font-size-sm);
  --card-cta-weight: var(--font-weight-medium);
  --card-footnote-size: 10px;
  --card-footnote-weight: var(--font-weight-semibold);
  
  /* Motion */
  --card-cta-transition-duration: 200ms;
  --card-cta-transition-easing: ease-in-out;
}
```

---

## Refactoring Strategy

### Recommended Approach: **BEM + CSS Module**

Given the complexity and number of states, use:
1. **product-card.css** - Token-only stylesheet with BEM classes
2. **ProductCard.tsx** - Import CSS, use class composition

### Alternative Approach: **Tailwind + CSS Variables**

Extend Tailwind config with custom properties:
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'card-badge': 'var(--card-badge-bg)',
        'card-sale': 'var(--card-price-sale-text)',
      },
      spacing: {
        'card-cta': 'var(--card-cta-width)',
      }
    }
  }
}
```

---

## Priority Violations

### Critical (Must Fix)
1. ✅ Badge background `#ececec` - Used 4 times across all variants
2. ✅ Maroon color references - Not yet in token system
3. ✅ Fixed CTA dimensions - Should be tokens for consistency

### High (Should Fix)
4. Typography values - Reuse from button tokens
5. Spacing values - CTA positioning, swatch sizes
6. Color swatches - Need configurable ring width

### Medium (Nice to Fix)
7. Aspect ratio - Could be token for multi-brand
8. Icon dimensions - Flexibility for different icon sets

---

## Estimated Refactoring Effort

- **Audit:** ✅ Complete (1 hour)
- **Token extraction:** 30 minutes (reuse existing parser)
- **CSS creation:** 1 hour
- **Component refactor:** 1.5 hours (more complex than Button)
- **Preview creation:** 1 hour
- **Total:** ~5 hours

---

## Next Steps

1. ✅ Extract Figma tokens (reuse existing Primitives.json + Semantic.json)
2. ⏭️ **Create ProductCard tokens in tokens.css** (extend Layer 3)
3. ⏭️ Refactor ProductCard.tsx to use BEM classes
4. ⏭️ Create product-card.css with token-only values
5. ⏭️ Run audit script to verify 0 hardcoded values
6. ⏭️ Create preview showing all variants (default, sale, finalSale, notifyMe)

---

## Special Considerations

### Variant-Specific Tokens
- Default variant: Navy badge, standard pricing
- Sale variant: Maroon badge + price, promo text, footnote
- Final Sale variant: Maroon badge, standard pricing
- Notify Me variant: No badge, permanent CTA

### Responsive Behavior
- Mobile vs Desktop swatch sizes (36px vs 30px)
- Quick Shop visibility (hidden on mobile)
- Swatch scrolling vs wrapping

### Interactive States
- Wishlist toggle (filled vs outline)
- Swatch selection ring
- Quick Shop fade-in on hover
- Focus states on buttons

---

**Status:** Ready for Step 2 - Token Extraction & Layer 3 Extension 🚀
