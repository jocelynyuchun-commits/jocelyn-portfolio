/**
 * Product Grid Module — Demo Page
 *
 * Route: /product-grid
 *
 * Demonstrates:
 *   • Desktop layout  (4-column grid, ≥ 1024 px)
 *   • Tablet layout   (2-column grid, 640–1023 px)
 *   • Mobile layout   (1-column grid, < 640 px)
 *   • Filter interaction — click tabs to fade-refresh cards with accent colors
 *   • Token usage reference table
 *   • Two independent ProductGrid instances on one page
 */

import { ProductGrid } from '@/components/ui/ProductGrid'
import {
  DEFAULT_FILTERS,
  PRODUCTS_BY_CATEGORY,
} from '@/components/ui/product-grid-data'

// ─── Custom filter set: Men's Shirts (subset of the default tabs) ─────────────

const SHIRTS_FILTERS = [
  { id: 'new-arrivals', label: 'New Arrivals' },
  { id: 'best-sellers', label: 'Best Sellers' },
  { id: 'sale',         label: 'Sale' },
]

const SHIRTS_PRODUCTS = {
  'new-arrivals': PRODUCTS_BY_CATEGORY['new-arrivals'],
  'best-sellers': PRODUCTS_BY_CATEGORY['best-sellers'],
  sale:           PRODUCTS_BY_CATEGORY['sale'],
}

// ─── Token reference rows ─────────────────────────────────────────────────────

const TOKEN_ROWS: [string, string, string, string][] = [
  ['Section title',       'Typography/H2_600 + Color/Blue/Blue-900',   '20px / 26px / semibold / #142D51', 'text-[20px] leading-[26px] font-semibold text-blue-900'],
  ['Module v-padding',    'Scale/1000 · Scale/1200',                   '40px (mobile) → 56px (desktop)',   'py-10 lg:py-14'],
  ['Module h-padding',    'Scale/400 · Scale/600 · Scale/800',         '16px → 24px → 32px',              'px-4 sm:px-6 lg:px-8'],
  ['Title → filter gap',  'Scale/600',                                  '24px',                            'mb-6'],
  ['Filter row gap',      'Scale/200',                                  '8px',                             'gap-2'],
  ['Filter → grid gap',   'Scale/800',                                  '32px',                            'mb-8'],
  ['Grid gap (mobile)',   'Scale/400',                                  '16px',                            'gap-4'],
  ['Grid gap (tablet)',   'Scale/500',                                  '20px',                            'sm:gap-5'],
  ['Grid gap (desktop)',  'Scale/600',                                  '24px',                            'lg:gap-6'],
  ['Filter tab height',   'Buttons/Height/Small',                       '40px',                            'h-[40px]'],
  ['Filter tab px',       'Scale/500',                                  '20px',                            'px-5'],
  ['Filter active bg',    'Buttons/Solid/Default',                      '#142D51',                         'bg-blue-900'],
  ['Filter active hover', 'Buttons/Solid/Hover',                        '#245090',                         'hover:bg-blue-700'],
  ['Filter idle border',  'Buttons/Outline/Default',                    '#142D51',                         'border-blue-900'],
  ['Filter idle text',    'Buttons/Outline/Text-Default',               '#142D51',                         'text-blue-900'],
  ['Filter tab font',     'Buttons/Font/Label_L_500',                   '16px / Medium / 0.02em',          'font-proxima font-medium text-base tracking-btn'],
  ['Filter tab radius',   'Buttons/Radius/Default',                     '4px',                             'rounded-dls'],
  ['Grid 1-col',          'Grid/Breakpoint/Mobile ≤ 575 px',            '1 column',                        'grid-cols-1'],
  ['Grid 2-col',          'Grid/Breakpoint/Tablet 576–1023 px',         '2 columns',                       'sm:grid-cols-2'],
  ['Grid 4-col',          'Grid/Breakpoint/Small Desktop ≥ 1024 px',    '4 columns',                       'lg:grid-cols-4'],
  ['Fade out',            'Motion/Transition/Short',                     '150 ms',                          'duration-150'],
  ['Fade in',             'Motion/Transition/Medium',                    '300 ms',                          'duration-300'],
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductGridDemoPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Page header ────────────────────────────────────────────────────── */}
      <header className="bg-blue-900 text-white px-4 sm:px-6 lg:px-8 py-8">
        <p className="font-proxima text-xs tracking-widest uppercase text-blue-300 mb-1">
          UNTUCKit DLS 2026
        </p>
        <h1 className="font-proxima font-semibold text-2xl leading-[30px]">
          Product Grid Module
        </h1>
        <p className="font-proxima text-sm text-blue-200 mt-2 max-w-2xl">
          Figma node 9413-10956 · Composed of Button + ProductCard components ·
          Click a filter tab to see the 300 ms fade-refresh · Resize the window to test
          1 / 2 / 4-column responsive layouts
        </p>
      </header>

      {/* ── Responsive indicator ───────────────────────────────────────────── */}
      <div className="bg-neutral-100 border-b border-neutral-200 px-4 sm:px-6 lg:px-8 py-2.5">
        <p className="font-proxima text-sm text-neutral-600 flex flex-wrap gap-x-4 gap-y-1">
          <span>
            <span className="font-semibold text-blue-900">Current layout: </span>
            <span className="inline lg:hidden sm:hidden">📱 1 column (mobile)</span>
            <span className="hidden sm:inline lg:hidden">📟 2 columns (tablet)</span>
            <span className="hidden lg:inline">🖥 4 columns (desktop)</span>
          </span>
          <span>
            <span className="font-semibold text-blue-900">Accent colors: </span>
            <span style={{ color: '#1c3d5a' }} className="font-bold">■</span> New Arrivals &nbsp;
            <span style={{ color: '#059669' }} className="font-bold">■</span> Wrinkle-Free &nbsp;
            <span style={{ color: '#7C3AED' }} className="font-bold">■</span> Best Sellers &nbsp;
            <span style={{ color: '#DC2626' }} className="font-bold">■</span> Sale
          </span>
        </p>
      </div>

      {/* ── Module 1: Full collection (all 4 tabs) ─────────────────────────── */}
      <ProductGrid
        title="Shop Our Collection"
        filters={DEFAULT_FILTERS}
        productsByCategory={PRODUCTS_BY_CATEGORY}
        defaultFilter="new-arrivals"
      />

      {/* ── Divider ────────────────────────────────────────────────────────── */}
      <hr className="border-neutral-200 mx-4 sm:mx-6 lg:mx-8" />

      {/* ── Module 2: Shirts-only (3 tabs — reuses same data) ─────────────── */}
      <ProductGrid
        title="Men's Shirts"
        filters={SHIRTS_FILTERS}
        productsByCategory={SHIRTS_PRODUCTS}
        defaultFilter="best-sellers"
      />

      {/* ── Token reference table ──────────────────────────────────────────── */}
      <div className="bg-neutral-100 border-t border-neutral-200 px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="font-proxima font-semibold text-xl text-blue-900 mb-6">
          Token Usage Reference
        </h2>
        <div className="overflow-x-auto rounded border border-neutral-200">
          <table className="font-proxima text-sm text-neutral-700 w-full border-collapse">
            <thead>
              <tr className="bg-blue-900 text-white">
                {['Element', 'Token / Figma variable', 'CSS value', 'Tailwind class'].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 font-semibold whitespace-nowrap first:rounded-tl last:rounded-tr">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TOKEN_ROWS.map(([element, token, css, tw], i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-100'}>
                  <td className="px-4 py-2 font-medium text-blue-900 whitespace-nowrap">{element}</td>
                  <td className="px-4 py-2 font-mono text-xs text-maroon whitespace-nowrap">{token}</td>
                  <td className="px-4 py-2 font-mono text-xs whitespace-nowrap">{css}</td>
                  <td className="px-4 py-2 font-mono text-xs text-neutral-500 whitespace-nowrap">{tw}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
