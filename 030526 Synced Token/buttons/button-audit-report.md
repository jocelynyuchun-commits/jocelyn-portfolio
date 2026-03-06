# Button Component Audit Report
**Date:** March 5, 2026  
**Component:** Button.tsx  
**Purpose:** Identify all hardcoded values for token migration

---

## Hardcoded Values by Category

### 🎨 **Colors** (14 instances)

| Value | Usage | Count | Line References |
|-------|-------|-------|-----------------|
| `#142D51` | Blue-900 (Navy) - Primary brand color | 4 | Comments only (documented) |
| `#245090` | Blue-700 - Hover state | 1 | Comment |
| `#2F71D4` | Blue-500 - Active/pressed state | 1 | Comment |
| `#E4EAF4` | Blue-100 - Focus fill background | 1 | Comment |
| `#90A5C3` | Blue-300 - Focus ring | 1 | Comment |
| `#C4C4C4` | Neutral-300 - Disabled background | 1 | Comment |

**Tailwind Classes (actual implementation):**
- `bg-blue-900`, `border-blue-900`, `text-blue-900` (6 instances)
- `bg-blue-700`, `border-blue-700`, `text-blue-700` (4 instances)
- `bg-blue-500`, `border-blue-500`, `text-blue-500` (3 instances)
- `bg-blue-100`, `border-blue-900` (focus state, 2 instances)
- `bg-neutral-300`, `border-neutral-300`, `text-neutral-400` (disabled, 3 instances)
- `bg-white`, `border-white`, `text-white` (inverted variants, 9 instances)
- `bg-transparent` (outline variants, 2 instances)

**Total Color References:** 32 Tailwind color classes

---

### 📏 **Spacing** (6 instances)

| Value | Usage | Context | Line |
|-------|-------|---------|------|
| `144px` | Button width small | SIZES.sm | 44 |
| `172px` | Button width medium | SIZES.md | 45 |
| `366px` | Button width large | SIZES.lg | 46 |
| `40px` | Button height small | SIZES.sm | 44 |
| `48px` | Button height md/lg | SIZES.md, SIZES.lg | 45-46 |
| `px-4` | Padding horizontal small | Tailwind utility | 44 |
| `px-5` | Padding horizontal md/lg/full | Tailwind utility | 45-47 |

**Spacing Pattern:** Fixed pixel widths + Tailwind padding utilities

---

### 🔤 **Typography** (7 instances)

| Property | Value | Tailwind Class | Line |
|----------|-------|----------------|------|
| Font family | Proxima Nova | `font-proxima` | 33 |
| Font weight | 500 (Medium) | `font-medium` | 33 |
| Font size | 16px | `text-base` | 33 |
| Line height | 20px | `leading-5` | 33 |
| Letter spacing | 0.02em | `tracking-btn` | 33 |
| Text transform | capitalize | `capitalize` | 33 |

**Note:** These reference Tailwind config values, not raw numbers in code

---

### 🔘 **Border & Radius** (2 instances)

| Property | Value | Comment Reference | Implementation |
|----------|-------|-------------------|----------------|
| Border radius | 4px | "Buttons/Radius/Default" | `rounded-dls` (Tailwind) |
| Border width | 1px | "Buttons/Border Width" | `border` (Tailwind default) |

---

### ⚡ **Motion** (2 instances)

| Property | Value | Context | Line |
|----------|-------|---------|------|
| Transition duration | 150ms | All state changes | 34 |
| Transition easing | ease-in-out | All state changes | 34 |

**Implementation:** `transition-colors duration-150 ease-in-out`

---

### 🎯 **Focus & Interaction** (2 instances)

| Value | Usage | Implementation |
|-------|-------|----------------|
| Focus shadow | `shadow-focus` | Custom Tailwind utility | Multiple lines |
| Opacity modifiers | `/60`, `/30` | White variant opacity | Lines 82, 86 |

---

## Summary Statistics

| Category | Hardcoded Count | Token Candidates |
|----------|----------------|------------------|
| **Colors** | 32 instances | 10 unique colors |
| **Spacing** | 8 instances | 5 unique values |
| **Typography** | 6 properties | 6 tokens needed |
| **Border/Radius** | 2 instances | 2 tokens |
| **Motion** | 2 instances | 2 tokens |
| **Focus/Shadow** | 2 instances | 2 tokens |
| **TOTAL** | **52 instances** | **27 unique tokens** |

---

## Most Frequent Patterns

1. **Blue color scale** (blue-900, blue-700, blue-500, blue-100, blue-300) — 18 instances
2. **Fixed button widths** (144px, 172px, 366px) — 3 unique values
3. **Button height 48px** — used in 3 of 4 sizes
4. **Padding horizontal** (px-4, px-5) — 2 values

---

## Tokenization Priority

### 🔴 **High Priority** (Breaking Changes)
- All color values (32 instances) — brand identity
- Button dimensions (6 instances) — accessibility impact

### 🟡 **Medium Priority**
- Typography scale (6 properties) — consistency
- Border radius & width (2 instances)

### 🟢 **Low Priority**
- Motion tokens (2 instances) — nice-to-have
- Focus shadow (1 instance) — can use Tailwind default

---

## Recommended Token Structure

```css
/* Layer 1: Primitives */
--color-blue-900: #142D51;
--color-blue-700: #245090;
--color-blue-500: #2F71D4;
--color-blue-100: #E4EAF4;
--color-blue-300: #90A5C3;
--color-neutral-300: #C4C4C4;
--color-neutral-400: #9B9B9B;
--color-white: #FFFFFF;

--spacing-400: 16px;  /* px-4 */
--spacing-500: 20px;  /* px-5 */

--button-width-sm: 144px;
--button-width-md: 172px;
--button-width-lg: 366px;
--button-height-sm: 40px;
--button-height-md: 48px;

/* Layer 2: Semantic Aliases */
--color-primary: var(--color-blue-900);
--color-primary-hover: var(--color-blue-700);
--color-primary-active: var(--color-blue-500);

/* Layer 3: Component Tokens */
--button-bg-solid-default: var(--color-primary);
--button-bg-solid-hover: var(--color-primary-hover);
--button-text-solid-default: var(--color-white);
```

---

## Next Steps

1. ✅ Audit complete — 52 hardcoded instances identified
2. ⏭️ Create tokens.css with 3-layer architecture
3. ⏭️ Create audit script to catch future violations
4. ⏭️ Refactor Button.tsx to use tokens
5. ⏭️ Verify zero violations with audit script

