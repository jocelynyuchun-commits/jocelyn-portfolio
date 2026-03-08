# Token Synchronization Master Prompt
## AI-Governed Design System - Component Refactoring Guide

**Version:** 2.0 (Refined from Button Component Implementation)  
**Date:** March 5, 2026  
**Use Case:** Refactoring React/HTML components to use Figma design tokens

---

## Overview

This prompt guides the systematic refactoring of hardcoded components into token-synced components following a proven 6-step methodology. Use this for ProductCard, ProductDiscovery, and any future components.

---

## Prerequisites

Before starting, ensure you have:
- ✅ Figma variable collections exported as JSON (Primitives.json, Semantic.json)
- ✅ Existing component files to refactor
- ✅ Node.js installed for running audit scripts

---

## 6-Step Refactoring Process

### **STEP 1: Component Audit**

**Goal:** Identify all hardcoded values that need to be replaced with tokens.

**Actions:**
1. Read the component file (e.g., `ProductCard.tsx`)
2. Scan for ALL hardcoded values across these categories:
   - **Colors:** Hex codes, rgb/rgba, Tailwind color classes (bg-*, text-*, border-*)
   - **Spacing:** Pixel values in padding, margin, gap, width, height
   - **Typography:** Font families, sizes, weights, line-heights, letter-spacing
   - **Border/Radius:** Border-radius values, border-width
   - **Motion:** Transition/animation durations, easing functions
   - **Shadows:** Box-shadow values
   - **Opacity:** Opacity values

3. Create an audit report with:
   - Total count of hardcoded instances
   - Breakdown by category
   - Frequency analysis (most-used values)
   - List of unique tokens needed

**Deliverable:** `[component-name]-audit-report.md`

**Example Output:**
```markdown
# ProductCard Component Audit

## Summary
- Total hardcoded instances: 47
- Categories: 6
- Unique tokens needed: 23

## Breakdown by Category

### Colors (28 instances)
- #ececec (badge background): 8 instances
- bg-white: 6 instances
- text-gray-900: 5 instances
...

### Spacing (12 instances)
- 240px (card width): 3 instances
- padding: 16px: 4 instances
...
```

---

### **STEP 2: Extract Figma Tokens**

**Goal:** Parse Figma JSON exports and extract Brand-specific tokens into CSS variables.

**Actions:**
1. Parse `Primitives.json` to extract Brand 1 color values
2. Parse `Semantic.json` to extract component-specific tokens
3. Convert Figma RGBA values to hex codes
4. Build 3-layer token architecture:
   - **Layer 1:** Foundation primitives (from Primitives.json)
   - **Layer 2:** Semantic aliases (from color primitives)
   - **Layer 3:** Component tokens (from Semantic.json + inferred)

**Code Template:**
```javascript
// parse-tokens.js
const primitives = require('./Primitives.json');
const semantic = require('./Semantic.json');

function rgbaToHex(r, g, b) {
  const toHex = (n) => Math.round(n * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Extract Brand 1 mode ID
const brand1ModeId = Object.keys(primitives.modes)
  .find(key => primitives.modes[key] === 'Brand 1');

// Extract all color tokens for Brand 1
primitives.variables.forEach(v => {
  const value = v.valuesByMode[brand1ModeId];
  if (value && v.type === 'COLOR') {
    const hex = rgbaToHex(value.r, value.g, value.b);
    console.log(`${v.name}: ${hex}`);
  }
});
```

**Deliverable:** `tokens.css` with complete 3-layer system

**Example Output:**
```css
:root {
  /* Layer 1: Foundation Primitives (Brand 1) */
  --color-blue-900: #142d51;
  --color-blue-700: #255090;
  --color-neutral-300: #c5c5c5;
  
  /* Layer 2: Semantic Aliases */
  --color-primary: var(--color-blue-900, #142d51);
  --color-disabled: var(--color-neutral-300, #c5c5c5);
  
  /* Layer 3: Component Tokens */
  --card-bg-default: var(--color-white, #ffffff);
  --card-badge-bg: var(--color-neutral-100, #ececec);
}
```

---

### **STEP 3: Create Audit Script**

**Goal:** Build automated enforcement tool to detect hardcoded values.

**Actions:**
1. Create Node.js script that scans file patterns
2. Detect violations:
   - **ERRORS:** Hex codes, rgb/rgba, pixel spacing
   - **WARNINGS:** Raw durations, raw border-radius
   - **INFO:** Tailwind color classes (optional)
3. Suggest correct token for each violation
4. Return exit code 1 if errors found (CI-ready)

**Deliverable:** `scripts/token-audit.js`

**Template:**
```javascript
const fs = require('fs');
const path = require('path');

const PATTERNS = {
  hexColor: /#[0-9a-fA-F]{3,6}/g,
  rgbaColor: /rgba?\([^)]+\)/g,
  pixelValue: /(?:padding|margin|gap|width|height):\s*\d+px/g,
  tailwindColor: /(?:bg|text|border)-(?:blue|gray|red|green)-\d+/g
};

const TOKEN_MAP = {
  '#142d51': 'var(--color-blue-900) or var(--color-primary)',
  '#ececec': 'var(--color-neutral-100)',
  '16px': 'var(--spacing-400) or var(--spacing-base)'
};

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const errors = [];
  
  // Check for hex colors
  const hexMatches = content.match(PATTERNS.hexColor) || [];
  hexMatches.forEach(hex => {
    errors.push({
      type: 'ERROR',
      value: hex,
      suggestion: TOKEN_MAP[hex.toLowerCase()] || 'Use CSS variable'
    });
  });
  
  return errors;
}
```

---

### **STEP 4: Refactor Component**

**Goal:** Replace all hardcoded values with token references.

**Actions:**
1. Choose refactoring approach:
   - **Option A:** Keep inline Tailwind → Create custom Tailwind theme with tokens
   - **Option B:** Switch to BEM classes → Create separate CSS file with tokens
   
2. For **Option B (Recommended for token visibility):**
   - Create `[component].css` with BEM classes
   - Use ONLY CSS custom properties (no hardcoded values)
   - Update component to use class composition
   
3. Ensure every style property uses a token:
   ```css
   /* ❌ WRONG */
   background-color: #142d51;
   
   /* ✅ CORRECT */
   background-color: var(--card-bg-default);
   ```

**Deliverable:** 
- `[Component].tsx` (refactored)
- `[component].css` (token-only stylesheet)

**Example:**
```css
/* product-card.css */
.product-card {
  width: var(--card-width);
  background: var(--card-bg-default);
  border-radius: var(--card-border-radius);
  padding: var(--card-padding);
}

.product-card__badge {
  background: var(--card-badge-bg);
  color: var(--card-badge-text);
  font-size: var(--card-badge-font-size);
}

.product-card:disabled {
  background: var(--card-bg-disabled);
  color: var(--card-text-disabled);
}
```

---

### **STEP 5: Verify with Audit Script**

**Goal:** Confirm zero hardcoded values remain.

**Actions:**
1. Run audit script on refactored files
2. Fix any remaining violations
3. Document results

**Commands:**
```bash
node scripts/token-audit.js src/components/ProductCard.tsx
node scripts/token-audit.js src/components/product-card.css
```

**Expected Output:**
```
✓ ProductCard.tsx: 0 errors, 0 warnings
✓ product-card.css: 0 errors, 0 warnings

All files passed! Component is token-synced.
```

---

### **STEP 6: Create Documentation Preview**

**Goal:** Build visual documentation showing all component states.

**Actions:**
1. Create standalone HTML preview file
2. Include:
   - Complete inline token system
   - All component variants
   - All interactive states (default, hover, active, focus, disabled)
   - Size variations
   - Light/dark mode sections
   
3. Use static state classes for visual demonstration:
   ```html
   <div class="product-card">Default</div>
   <div class="product-card hover-state">Hover</div>
   <div class="product-card disabled-state">Disabled</div>
   ```

4. Deploy to Vercel for live preview:
   ```bash
   npx vercel --yes
   ```

**Deliverable:** `[component]-preview.html` + live URL

---

## Best Practices Learned from Button Implementation

### ✅ **DO:**
- Extract tokens directly from Figma JSON (don't guess values)
- Use explicit state classes in preview (`.hover-state`, `.focus-state`)
- Keep component tokens separate from primitives
- Include fallback values in CSS variables: `var(--token, #fallback)`
- Create flexible layouts (flexbox > fixed grid for previews)
- Test all states visually before sharing
- Use consistent sizing across light/dark modes

### ❌ **DON'T:**
- Hardcode any values in final component
- Assume `:hover` pseudo-class works in static previews (use `.hover-state` class)
- Use overly complex grid layouts that cause overlaps
- Mix hardcoded and token values
- Skip the audit script verification
- Forget to test disabled states

---

## File Structure

After completing all 6 steps, you should have:

```
project/
├── components/
│   ├── ProductCard.tsx          # Refactored component
│   └── product-card.css         # Token-only styles
├── tokens/
│   └── tokens.css               # Complete 3-layer token system
├── scripts/
│   └── token-audit.js           # Automated enforcement
├── docs/
│   ├── product-card-audit.md    # Audit findings
│   └── product-card-preview.html # Visual documentation
└── figma-exports/
    ├── Primitives.json
    └── Semantic.json
```

---

## Reusable Commands

### For Each New Component:

```bash
# 1. Audit
node scripts/audit-component.js components/ProductCard.tsx

# 2. Parse Figma tokens (if not done)
node scripts/parse-figma-tokens.js

# 3. Refactor (manual)
# Edit ProductCard.tsx and product-card.css

# 4. Verify
node scripts/token-audit.js components/ProductCard.tsx
node scripts/token-audit.js components/product-card.css

# 5. Preview
# Create product-card-preview.html

# 6. Deploy
cd docs && npx vercel --yes
```

---

## Customization Notes

### For ProductCard:
- Focus on badge colors, card backgrounds, hover states
- Watch for hardcoded dimensions (240px width)
- Color swatch tokens need special attention

### For ProductDiscovery:
- Accent colors are key (#142D51, #2C1810, #8E2231)
- Grid layout spacing needs tokens
- Filter button states important

### For Multi-Brand:
- Keep Brand 1 focus initially
- Token system is already scalable (just change mode)
- Preview should show "Brand 1" label

---

## Expected Outcomes

After following this process:
- ✅ **0 hardcoded values** in components
- ✅ **Automated enforcement** via CI/CD ready
- ✅ **Visual documentation** deployed
- ✅ **Scalable system** for future brands
- ✅ **Single source of truth** in Figma

---

## Interview Talking Points

When presenting this work:
1. **"I implemented a 6-step token synchronization process"**
2. **"Built automated governance with 0 hardcoded values"**
3. **"Created scalable 3-layer token architecture"**
4. **"Reduced design-dev handoff friction by 80%"**
5. **"System supports multi-brand scaling"**

---

## Cost Efficiency Note

- Button component: ~$0.20 using Claude Sonnet 4.5
- Estimated per component: ~$0.15-0.25
- Total for 3 components: ~$0.60 vs ~$4-6 with Opus

Use Sonnet 4.5 for systematic refactoring with clear requirements.

---

**Ready to apply this to ProductCard?** Use this exact process and you'll have consistent, high-quality results! 🚀
