import type { Config } from 'tailwindcss'

// ─────────────────────────────────────────────────────────────
// UNTUCKit Design Language System 2026 — Tailwind Configuration
// Tokens sourced from Primitives.json + Semantic.json (Brand 1)
// Last synced: 2026-03-05
// ─────────────────────────────────────────────────────────────
const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      // ── Font Family ──────────────────────────────────────────
      fontFamily: {
        proxima: ['"Proxima Nova"', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },

      // ── Colors ───────────────────────────────────────────────
      colors: {
        // Blue-Brand 1
        blue: {
          100: '#E4EAF4',
          200: '#BDC9DD',
          300: '#90A5C4', // focus ring
          400: '#5A84BC',
          500: '#2F71D4', // active/pressed
          600: '#2A60B2',
          700: '#255090', // hover
          800: '#1C3E70',
          900: '#142D51', // default/navy
        },
        // Brown-Brand 2
        brown: {
          100: '#C6B9B4',
          200: '#B7A69F',
          300: '#B7A69F',
          400: '#A7928A',
          500: '#987E75',
          600: '#896B60',
          700: '#79574A',
          800: '#623220',
          900: '#5A2F1F',
        },
        // Green-Brand 3
        'green-brand': {
          100: '#C8D7D1',
          200: '#B1C8BE',
          300: '#9BBAAC',
          400: '#84AA99',
          500: '#6E9C88',
          600: '#588E76',
          700: '#417F63',
          800: '#2C7051',
          900: '#15613F',
        },
        // Neutral / Grey
        neutral: {
          50:  '#FBFBFB',
          100: '#FBFBFB',
          200: '#EAEAEA',
          300: '#C5C5C5', // disabled bg/border
          400: '#9B9B9B', // disabled text
          500: '#7C7C7C',
          600: '#686868',
          700: '#4A4A4A',
          800: '#333333',
          900: '#181818',
        },
        // Brand
        navy:   '#142D51',
        maroon: '#8E2231',
        // Feedback
        success: '#24882D',
        error:   '#C02321',
        // Red scale
        red: {
          500: '#EF6664',
          600: '#E83D3B',
          700: '#DB100E',
          800: '#CC1A18',
          900: '#C02321',
        },
        // Green (feedback)
        green: {
          500: '#72D07C',
          600: '#52C45D',
          700: '#34B340',
          800: '#2A9E35',
          900: '#24882D',
        },
      },

      // ── Border Radius ─────────────────────────────────────────
      borderRadius: {
        dls: '4px',
      },

      // ── Box Shadow ────────────────────────────────────────────
      boxShadow: {
        focus: '0 0 0 3px #90A5C4',
      },

      // ── Letter Spacing ───────────────────────────────────────
      letterSpacing: {
        btn: '0.02em',
      },
    },
  },
  plugins: [],
}

export default config
