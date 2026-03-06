#!/usr/bin/env node

/**
 * UNTUCKit DLS — Token Audit Script
 *
 * Scans component files for hardcoded values that should use CSS custom properties.
 * Returns exit code 1 if errors found (CI-ready).
 *
 * Usage:
 *   node scripts/token-audit.js components/ui/ProductDiscovery.tsx
 *   node scripts/token-audit.js components/ui/product-discovery.css
 *   node scripts/token-audit.js  (audits all component files)
 */

const fs = require('fs');
const path = require('path');

// ─── Patterns to detect ──────────────────────────────────────────────────────

const PATTERNS = [
  {
    name: 'Hex color',
    regex: /#[0-9a-fA-F]{3,8}\b/g,
    severity: 'ERROR',
    // Allowlist: colors that are acceptable (e.g., in SVG data URIs that can't use CSS vars,
    // or CSS fallback values inside var() functions)
    allowlist: [
      // SVG data URI fallbacks (can't use CSS vars)
      '#142D51', '#2C1810', '#8E2231', '#C5C5C5',
      // In CSS var() fallback position these are acceptable
    ],
    // These contexts are acceptable
    allowContexts: [
      /var\(--[^,]+,\s*#[0-9a-fA-F]+\)/,  // var(--token, #fallback)
      /\/\*.*#[0-9a-fA-F]+.*\*\//,          // inside comments
      /data:image\/svg/,                      // SVG data URIs
    ],
  },
  {
    name: 'rgb/rgba color',
    regex: /(?<!var\()rgba?\(\s*\d+/g,
    severity: 'ERROR',
    allowlist: [],
    allowContexts: [
      /var\(/,           // inside var()
      /\/\*.*rgba?\(/,   // inside comments
      /box-shadow:/,     // shadow values (no Figma token)
    ],
  },
];

// Token suggestions for common hardcoded values
const TOKEN_MAP = {
  '#142d51': 'var(--color-blue-900) or var(--pd-heading-color)',
  '#255090': 'var(--color-blue-700) or var(--btn-solid-hover)',
  '#2f71d4': 'var(--color-blue-500) or var(--btn-solid-active)',
  '#e4eaf4': 'var(--color-blue-100) or var(--pd-filter-bg-hover)',
  '#90a5c4': 'var(--color-blue-300) or var(--pd-filter-focus-ring)',
  '#c5c5c5': 'var(--color-neutral-300) or var(--pd-arrow-border)',
  '#9b9b9b': 'var(--color-neutral-400)',
  '#7c7c7c': 'var(--color-neutral-500)',
  '#686868': 'var(--color-neutral-600)',
  '#4a4a4a': 'var(--color-neutral-700) or var(--pd-subtext-color)',
  '#181818': 'var(--color-neutral-900)',
  '#ffffff': 'var(--color-white) or var(--pd-arrow-bg)',
  '#eaeaea': 'var(--color-neutral-200) or var(--color-border-default)',
  '#fbfbfb': 'var(--color-neutral-100) or var(--color-surface-page)',
  '#8e2231': 'var(--color-maroon) or var(--pd-accent-performance)',
  '#2c1810': 'var(--pd-accent-wrinkle-free)',
  '#24882d': 'var(--color-feedback-success)',
  '#c02321': 'var(--color-feedback-error)',
};

// ─── Audit logic ─────────────────────────────────────────────────────────────

function auditFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const results = { errors: [], warnings: [], info: [] };
  const fileName = path.basename(filePath);

  lines.forEach((line, lineIndex) => {
    const lineNum = lineIndex + 1;

    // Skip comment-only lines
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) return;

    PATTERNS.forEach((pattern) => {
      const matches = line.matchAll(pattern.regex);
      for (const match of matches) {
        const value = match[0];
        const normalizedValue = value.toLowerCase();

        // Check if inside an allowed context
        const isAllowed = pattern.allowContexts?.some((ctx) => ctx.test(line));
        if (isAllowed) return;

        // Check allowlist
        if (pattern.allowlist.some((a) => a.toLowerCase() === normalizedValue)) return;

        const suggestion = TOKEN_MAP[normalizedValue] || 'Use a CSS custom property';
        results[pattern.severity === 'ERROR' ? 'errors' : 'warnings'].push({
          line: lineNum,
          value,
          suggestion,
          pattern: pattern.name,
        });
      }
    });
  });

  return { filePath, fileName, results };
}

// ─── Main ────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
let files = [];

if (args.length === 0) {
  // Default: audit ProductDiscovery component files
  const baseDir = path.resolve(__dirname, '..');
  const targets = [
    'components/ui/ProductDiscovery.tsx',
    'components/ui/product-discovery.css',
  ];
  files = targets
    .map((t) => path.join(baseDir, t))
    .filter((f) => fs.existsSync(f));
} else {
  files = args.map((a) => path.resolve(a)).filter((f) => fs.existsSync(f));
}

if (files.length === 0) {
  console.log('No files found to audit.');
  process.exit(0);
}

let totalErrors = 0;
let totalWarnings = 0;

console.log('\n  UNTUCKit DLS — Token Audit\n  ' + '═'.repeat(40) + '\n');

files.forEach((file) => {
  const { fileName, results } = auditFile(file);
  const errorCount = results.errors.length;
  const warnCount = results.warnings.length;
  totalErrors += errorCount;
  totalWarnings += warnCount;

  const icon = errorCount === 0 ? '\u2713' : '\u2717';
  console.log(`  ${icon} ${fileName}: ${errorCount} errors, ${warnCount} warnings`);

  if (errorCount > 0) {
    results.errors.forEach((e) => {
      console.log(`    L${e.line}  [${e.pattern}] ${e.value}`);
      console.log(`           \u2192 ${e.suggestion}`);
    });
  }
  if (warnCount > 0) {
    results.warnings.forEach((w) => {
      console.log(`    L${w.line}  [WARN] ${w.value} → ${w.suggestion}`);
    });
  }
});

console.log('\n  ' + '─'.repeat(40));
if (totalErrors === 0 && totalWarnings === 0) {
  console.log('  All files passed! Component is token-synced.\n');
  process.exit(0);
} else {
  console.log(`  ${totalErrors} error(s), ${totalWarnings} warning(s) found.\n`);
  process.exit(totalErrors > 0 ? 1 : 0);
}
