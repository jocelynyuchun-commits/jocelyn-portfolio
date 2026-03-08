#!/usr/bin/env node

/**
 * Token Audit Script
 * Gap Inc. AI-Governed Design System
 * 
 * Scans CSS/TSX/JSX files for hardcoded visual values and suggests tokens.
 * Returns exit code 1 if any ERRORS found (CI-ready).
 * 
 * Usage:
 *   node scripts/token-audit.js
 *   node scripts/token-audit.js path/to/file.tsx
 */

const fs = require('fs');
const path = require('path');

// ─── Configuration ──────────────────────────────────────────────────────────

const FILE_EXTENSIONS = ['.css', '.scss', '.tsx', '.jsx', '.ts', '.js'];
const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'build', '.next'];

// ─── Violation Patterns ─────────────────────────────────────────────────────

const PATTERNS = {
  // ERRORS (block commit)
  hexColor: {
    regex: /#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})\b/g,
    severity: 'ERROR',
    category: 'Color',
    message: 'Hardcoded hex color',
    suggest: (match) => suggestColorToken(match),
  },
  rgbColor: {
    regex: /rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/gi,
    severity: 'ERROR',
    category: 'Color',
    message: 'Hardcoded RGB color',
    suggest: () => 'Use var(--color-*) token instead',
  },
  rgbaColor: {
    regex: /rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)/gi,
    severity: 'ERROR',
    category: 'Color',
    message: 'Hardcoded RGBA color',
    suggest: () => 'Use var(--color-*) token with opacity modifier',
  },
  pixelSpacing: {
    regex: /(?:padding|margin|gap|width|height|top|right|bottom|left|inset):\s*(\d+)px/g,
    severity: 'ERROR',
    category: 'Spacing',
    message: 'Hardcoded pixel spacing',
    suggest: (match, value) => suggestSpacingToken(value),
  },
  
  // WARNINGS (allow but flag)
  rawDuration: {
    regex: /(?:transition|animation).*?(\d+)ms/g,
    severity: 'WARNING',
    category: 'Motion',
    message: 'Raw transition duration',
    suggest: (match, value) => suggestDurationToken(value),
  },
  rawBorderRadius: {
    regex: /border-radius:\s*(\d+)px/g,
    severity: 'WARNING',
    category: 'Border',
    message: 'Raw border radius',
    suggest: (match, value) => suggestRadiusToken(value),
  },
  tailwindColor: {
    regex: /\b(?:bg|text|border)-(?:blue|neutral|gray|red|green|yellow|purple|pink|indigo|teal|orange|cyan|emerald|rose|amber|lime|sky|violet|fuchsia|slate|zinc|stone)-(?:\d{2,3}|white|black)\b/g,
    severity: 'ERROR',
    category: 'Color (Tailwind)',
    message: 'Hardcoded Tailwind color class',
    suggest: (match) => `Replace '${match}' with bg-[var(--token)] or use tokens.css`,
  },
};

// ─── Token Suggestion Helpers ───────────────────────────────────────────────

const COLOR_MAP = {
  '#142D51': 'var(--color-blue-900) or var(--color-primary)',
  '#142d51': 'var(--color-blue-900) or var(--color-primary)',
  '#245090': 'var(--color-blue-700) or var(--color-primary-hover)',
  '#2F71D4': 'var(--color-blue-500) or var(--color-primary-active)',
  '#2f71d4': 'var(--color-blue-500) or var(--color-primary-active)',
  '#E4EAF4': 'var(--color-blue-100) or var(--color-primary-light)',
  '#e4eaf4': 'var(--color-blue-100) or var(--color-primary-light)',
  '#90A5C3': 'var(--color-blue-300) or var(--color-primary-focus-ring)',
  '#90a5c3': 'var(--color-blue-300) or var(--color-primary-focus-ring)',
  '#C4C4C4': 'var(--color-neutral-300) or var(--color-bg-disabled)',
  '#c4c4c4': 'var(--color-neutral-300) or var(--color-bg-disabled)',
  '#9B9B9B': 'var(--color-neutral-400) or var(--color-text-disabled)',
  '#9b9b9b': 'var(--color-neutral-400) or var(--color-text-disabled)',
  '#FFFFFF': 'var(--color-white)',
  '#ffffff': 'var(--color-white)',
  '#fff': 'var(--color-white)',
  '#FFF': 'var(--color-white)',
  '#000000': 'var(--color-black)',
  '#000': 'var(--color-black)',
  '#8E2231': 'var(--color-maroon)',
  '#8e2231': 'var(--color-maroon)',
  '#2C1810': 'var(--color-brown-dark)',
  '#2c1810': 'var(--color-brown-dark)',
};

function suggestColorToken(hex) {
  const normalized = hex.toLowerCase();
  return COLOR_MAP[hex] || COLOR_MAP[normalized] || 'Check tokens.css for closest match';
}

function suggestSpacingToken(pixels) {
  const value = parseInt(pixels, 10);
  const spacingMap = {
    2: 'var(--spacing-050)',
    4: 'var(--spacing-100)',
    8: 'var(--spacing-200)',
    12: 'var(--spacing-300)',
    16: 'var(--spacing-400) or var(--spacing-base)',
    20: 'var(--spacing-500)',
    24: 'var(--spacing-600) or var(--spacing-gutter)',
    32: 'var(--spacing-800)',
    40: 'var(--spacing-1000)',
    48: 'var(--spacing-1200) or var(--spacing-section)',
    64: 'var(--spacing-1600)',
    144: 'var(--button-width-sm)',
    172: 'var(--button-width-md)',
    366: 'var(--button-width-lg)',
  };
  return spacingMap[value] || 'Use spacing scale (multiples of 4px)';
}

function suggestDurationToken(ms) {
  const value = parseInt(ms, 10);
  const durationMap = {
    0: 'var(--duration-instant)',
    100: 'var(--duration-fast)',
    150: 'var(--duration-default)',
    200: 'var(--duration-medium)',
    300: 'var(--duration-slow)',
  };
  return durationMap[value] || 'var(--duration-default) or var(--duration-slow)';
}

function suggestRadiusToken(pixels) {
  const value = parseInt(pixels, 10);
  const radiusMap = {
    0: 'var(--radius-none)',
    2: 'var(--radius-sm)',
    4: 'var(--radius-default)',
    6: 'var(--radius-md)',
    8: 'var(--radius-lg)',
    12: 'var(--radius-xl)',
  };
  return radiusMap[value] || 'var(--radius-default)';
}

// ─── File Scanner ───────────────────────────────────────────────────────────

function shouldIgnore(filePath) {
  return IGNORE_DIRS.some(dir => filePath.includes(dir));
}

function isTargetFile(filePath) {
  return FILE_EXTENSIONS.some(ext => filePath.endsWith(ext));
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    
    if (shouldIgnore(fullPath)) return;
    
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (isTargetFile(fullPath)) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const violations = [];

  lines.forEach((line, lineIndex) => {
    // Skip comments
    if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
      return;
    }

    Object.entries(PATTERNS).forEach(([name, pattern]) => {
      let match;
      const regex = new RegExp(pattern.regex);
      
      while ((match = regex.exec(line)) !== null) {
        const fullMatch = match[0];
        const captureGroup = match[1] || fullMatch;
        
        violations.push({
          file: filePath,
          line: lineIndex + 1,
          column: match.index + 1,
          severity: pattern.severity,
          category: pattern.category,
          message: pattern.message,
          code: fullMatch,
          suggestion: pattern.suggest(fullMatch, captureGroup),
        });
      }
    });
  });

  return violations;
}

// ─── Report Formatter ───────────────────────────────────────────────────────

function formatViolation(v) {
  const severityColor = v.severity === 'ERROR' ? '\x1b[31m' : '\x1b[33m'; // Red : Yellow
  const reset = '\x1b[0m';
  const bold = '\x1b[1m';
  
  return [
    `${severityColor}${bold}${v.severity}${reset} ${v.category}: ${v.message}`,
    `  ${bold}File:${reset} ${v.file}:${v.line}:${v.column}`,
    `  ${bold}Code:${reset} ${v.code}`,
    `  ${bold}Fix:${reset}  ${v.suggestion}`,
    '',
  ].join('\n');
}

function printSummary(violations) {
  const errors = violations.filter(v => v.severity === 'ERROR');
  const warnings = violations.filter(v => v.severity === 'WARNING');
  
  console.log('\n' + '═'.repeat(80));
  console.log('TOKEN AUDIT SUMMARY');
  console.log('═'.repeat(80));
  console.log(`\x1b[31m${errors.length} ERROR(S)\x1b[0m — Must fix before committing`);
  console.log(`\x1b[33m${warnings.length} WARNING(S)\x1b[0m — Should fix when possible`);
  console.log(`Total violations: ${violations.length}`);
  console.log('═'.repeat(80) + '\n');
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log('\x1b[32m✅ All files pass token audit!\x1b[0m\n');
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const targetPath = args[0] || process.cwd();
  
  console.log(`\n🔍 Scanning for hardcoded values in: ${targetPath}\n`);
  
  let filesToScan;
  
  if (fs.statSync(targetPath).isDirectory()) {
    filesToScan = getAllFiles(targetPath);
  } else {
    filesToScan = [targetPath];
  }
  
  console.log(`Found ${filesToScan.length} file(s) to scan...\n`);
  
  const allViolations = [];
  
  filesToScan.forEach((file) => {
    const violations = scanFile(file);
    if (violations.length > 0) {
      allViolations.push(...violations);
    }
  });
  
  if (allViolations.length > 0) {
    allViolations.forEach(v => {
      console.log(formatViolation(v));
    });
  }
  
  printSummary(allViolations);
  
  const errorCount = allViolations.filter(v => v.severity === 'ERROR').length;
  
  if (errorCount > 0) {
    console.log('\x1b[31m❌ Audit failed. Fix errors before committing.\x1b[0m\n');
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main();
