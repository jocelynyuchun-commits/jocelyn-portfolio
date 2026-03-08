#!/usr/bin/env node

/**
 * Token Audit Script - ProductCard Component
 * Detects hardcoded values that should be replaced with design tokens
 * 
 * Usage:
 *   node token-audit.js <file-path>
 *   node token-audit.js components/ProductCard.tsx
 * 
 * Exit Codes:
 *   0 - No violations found
 *   1 - Violations found (CI-ready)
 */

const fs = require('fs');
const path = require('path');

// ─── Violation Patterns ────────────────────────────────────────────────────

const PATTERNS = {
  // ERRORS - Must be fixed
  hexColor: /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g,
  rgbaColor: /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+)?\s*\)/g,
  pixelSpacing: /(?:padding|margin|gap|width|height|top|right|bottom|left|inset):\s*\d+px/gi,
  pixelInlineStyle: /\{\s*(?:width|height|bottom|top|left|right):\s*['"]?\d+px/gi,
  
  // WARNINGS - Should be fixed
  rawDuration: /(?:duration|delay)-\d+|transition:\s*\w+\s+\d+ms/gi,
  rawBorderRadius: /border-radius:\s*\d+px/gi,
  
  // INFO - Tailwind classes (optional to fix)
  tailwindColor: /(?:bg|text|border|ring)-(?:blue|gray|neutral|maroon|white|black|red|green)-\d+/g,
  tailwindSpacing: /(?:w|h|p|m|gap|inset|top|right|bottom|left)-\[?\d+(?:px)?\]?/g,
};

// ─── Token Suggestion Maps ─────────────────────────────────────────────────

const COLOR_MAP = {
  // ProductCard specific
  '#ececec': 'var(--card-badge-bg) or var(--color-neutral-200)',
  '#8e2231': 'var(--card-price-sale-text) or var(--color-brand-maroon)',
  '#142d51': 'var(--color-blue-900) or var(--color-primary)',
  '#eaeaea': 'var(--color-neutral-200)',
  '#4a4a4a': 'var(--color-neutral-700)',
  '#686868': 'var(--color-neutral-600)',
  '#7c7c7c': 'var(--color-neutral-500)',
  '#9b9b9b': 'var(--color-neutral-400)',
  '#ffffff': 'var(--color-white)',
  'rgba(255, 255, 255, 0.6)': 'var(--card-overlay-bg)',
};

const SPACING_MAP = {
  '240px': 'var(--card-cta-width)',
  '40px': 'var(--card-cta-height)',
  '80px': 'var(--card-cta-offset-bottom)',
  '32px': 'var(--card-wishlist-size) or var(--spacing-800)',
  '12px': 'var(--card-wishlist-inset) or var(--spacing-300)',
  '10px': 'var(--card-badge-inset)',
  '24px': 'var(--card-badge-height) or var(--spacing-600)',
  '36px': 'var(--card-swatch-size-mobile)',
  '30px': 'var(--card-swatch-size-desktop)',
  '16px': 'var(--card-swatch-gap-mobile) or var(--spacing-400)',
  '8px': 'var(--card-swatch-gap-desktop) or var(--spacing-200)',
  '4px': 'var(--card-badge-padding-x) or var(--spacing-100)',
};

const DURATION_MAP = {
  '200ms': 'var(--card-cta-transition-duration) or var(--duration-default)',
  '150ms': 'var(--duration-fast)',
  '300ms': 'var(--duration-medium)',
};

// ─── Violation Tracking ────────────────────────────────────────────────────

class Violation {
  constructor(type, line, value, suggestion) {
    this.type = type;        // ERROR | WARNING | INFO
    this.line = line;
    this.value = value;
    this.suggestion = suggestion;
  }
}

// ─── Audit Functions ───────────────────────────────────────────────────────

function auditFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const violations = [];

  // Check each line
  lines.forEach((line, index) => {
    const lineNum = index + 1;

    // ERRORS: Hex colors
    let matches = line.match(PATTERNS.hexColor);
    if (matches) {
      matches.forEach(match => {
        const normalized = match.toLowerCase();
        const suggestion = COLOR_MAP[normalized] || 'Use CSS variable';
        violations.push(new Violation('ERROR', lineNum, match, suggestion));
      });
    }

    // ERRORS: RGB/RGBA colors
    matches = line.match(PATTERNS.rgbaColor);
    if (matches) {
      matches.forEach(match => {
        const suggestion = COLOR_MAP[match] || 'Use CSS variable';
        violations.push(new Violation('ERROR', lineNum, match, suggestion));
      });
    }

    // ERRORS: Pixel spacing in CSS
    matches = line.match(PATTERNS.pixelSpacing);
    if (matches) {
      matches.forEach(match => {
        const value = match.match(/\d+px/)?.[0];
        const suggestion = SPACING_MAP[value] || 'Use spacing token';
        violations.push(new Violation('ERROR', lineNum, match, suggestion));
      });
    }

    // ERRORS: Pixel spacing in inline styles
    matches = line.match(PATTERNS.pixelInlineStyle);
    if (matches) {
      matches.forEach(match => {
        const value = match.match(/\d+px/)?.[0];
        const suggestion = SPACING_MAP[value] || 'Use spacing token';
        violations.push(new Violation('ERROR', lineNum, match, suggestion));
      });
    }

    // WARNINGS: Raw durations
    matches = line.match(PATTERNS.rawDuration);
    if (matches) {
      matches.forEach(match => {
        const value = match.match(/\d+ms/)?.[0];
        const suggestion = DURATION_MAP[value] || 'Use duration token';
        violations.push(new Violation('WARNING', lineNum, match, suggestion));
      });
    }

    // WARNINGS: Raw border radius
    matches = line.match(PATTERNS.rawBorderRadius);
    if (matches) {
      matches.forEach(match => {
        violations.push(new Violation('WARNING', lineNum, match, 'Use --radius-* token'));
      });
    }

    // INFO: Tailwind color classes
    if (line.includes('className') || line.includes('class=')) {
      matches = line.match(PATTERNS.tailwindColor);
      if (matches) {
        matches.forEach(match => {
          let suggestion = 'Consider using CSS variables';
          if (match.includes('blue-900')) suggestion = 'var(--color-blue-900)';
          if (match.includes('maroon')) suggestion = 'var(--color-brand-maroon)';
          if (match.includes('neutral')) suggestion = 'var(--color-neutral-*)';
          violations.push(new Violation('INFO', lineNum, match, suggestion));
        });
      }
    }
  });

  return violations;
}

// ─── Reporting ─────────────────────────────────────────────────────────────

function generateReport(filePath, violations) {
  const errors = violations.filter(v => v.type === 'ERROR');
  const warnings = violations.filter(v => v.type === 'WARNING');
  const infos = violations.filter(v => v.type === 'INFO');

  console.log('\n' + '═'.repeat(80));
  console.log(`  TOKEN AUDIT REPORT: ${path.basename(filePath)}`);
  console.log('═'.repeat(80) + '\n');

  // Summary
  if (violations.length === 0) {
    console.log('✅ \x1b[32mALL CHECKS PASSED!\x1b[0m');
    console.log('   No hardcoded values found. Component is token-synced.\n');
    return true;
  }

  console.log('📊 SUMMARY:');
  console.log(`   Errors:   ${errors.length} (must fix)`);
  console.log(`   Warnings: ${warnings.length} (should fix)`);
  console.log(`   Info:     ${infos.length} (optional)\n`);

  // Errors
  if (errors.length > 0) {
    console.log('🔴 ERRORS (Must Fix):');
    console.log('─'.repeat(80));
    errors.forEach(v => {
      console.log(`   Line ${v.line}: \x1b[31m${v.value}\x1b[0m`);
      console.log(`   → Suggestion: \x1b[36m${v.suggestion}\x1b[0m\n`);
    });
  }

  // Warnings
  if (warnings.length > 0) {
    console.log('⚠️  WARNINGS (Should Fix):');
    console.log('─'.repeat(80));
    warnings.forEach(v => {
      console.log(`   Line ${v.line}: \x1b[33m${v.value}\x1b[0m`);
      console.log(`   → Suggestion: \x1b[36m${v.suggestion}\x1b[0m\n`);
    });
  }

  // Info (only show count, not details to avoid noise)
  if (infos.length > 0) {
    console.log(`ℹ️  INFO: ${infos.length} Tailwind color classes found (optional to replace)\n`);
  }

  console.log('─'.repeat(80));
  console.log(`Total violations: ${violations.length}\n`);

  return errors.length === 0;
}

// ─── Main ──────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: node token-audit.js <file-path>');
    console.error('Example: node token-audit.js components/ProductCard.tsx');
    process.exit(1);
  }

  const filePath = args[0];
  const violations = auditFile(filePath);
  const passed = generateReport(filePath, violations);

  // Exit code for CI/CD
  process.exit(passed ? 0 : 1);
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { auditFile, generateReport };
