'use client'

/**
 * UNTUCKit DLS 2026 — Product Discovery Module Docs
 *
 * Token-synced documentation page.
 * Shows Desktop, Tablet, and Mobile sizes on a single page with full interactivity.
 * All component values come from CSS custom properties (product-discovery.css + globals.css).
 *
 * Token sync: 2026-03-05 (Primitives.json + Semantic.json, Brand 1)
 */

import { ProductDiscovery } from '@/components/ui/ProductDiscovery'

// ─── Shared layout helpers ──────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
      {children}
    </p>
  )
}

function SectionHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-semibold text-blue-900 mb-1" style={{ fontSize: 20, lineHeight: '26px' }}>
      {children}
    </h2>
  )
}

function Divider() {
  return <hr className="border-neutral-200 my-12" />
}

// ─── Token reference rows ────────────────────────────────────────────────────

const TOKEN_ROWS: { property: string; token: string; value: string; notes: string }[] = [
  { property: 'Section heading',        token: '--pd-heading-* → Typography/H2_600',            value: '20px / 26px / 600 / #142D51',    notes: 'Uses H2 size + semibold + blue-900' },
  { property: 'Body text',              token: '--pd-subtext-* → Typography/Body_S_400',         value: '14px / 20px / 400 / #4A4A4A',    notes: 'Body small, secondary color' },
  { property: 'Filter button height',   token: '--pd-filter-height → Buttons/Height/Medium',     value: '48px',                            notes: 'Same as DLS button md height' },
  { property: 'Filter active bg',       token: '--pd-filter-bg-active → Buttons/Solid/Default',  value: '#142D51',                         notes: 'Blue-900 (navy)' },
  { property: 'Filter idle border',     token: '--pd-filter-border-idle → Buttons/Outline/Default', value: '#142D51',                      notes: 'Blue-900' },
  { property: 'Filter hover bg',        token: '--pd-filter-bg-hover → Color/Blue-100',          value: '#E4EAF4',                         notes: 'Light blue fill on hover' },
  { property: 'Filter button font',     token: '--pd-filter-font-* → Buttons/Font',              value: '16px / 500 / 0.02em',             notes: 'Medium weight, capitalize' },
  { property: 'Grid layout',            token: '--pd-grid-* (grid-cols-3)',                       value: '1fr 2fr',                         notes: 'Two-column: text left, carousel right' },
  { property: 'Grid gap (tablet)',      token: '--pd-grid-gap-tablet → Scale/600',                value: '24px',                            notes: 'Column gap at tablet' },
  { property: 'Grid gap (desktop)',     token: '--pd-grid-gap-desktop → Scale/900',               value: '40px',                            notes: 'Column gap at desktop' },
  { property: 'Card grid cols',         token: '3 columns (fixed)',                                value: 'repeat(3, 1fr)',                  notes: 'Always 3 cards per page' },
  { property: 'Card grid gap (mobile)', token: '--pd-card-gap-mobile → Scale/200',                value: '8px',                             notes: 'Tight gap on mobile' },
  { property: 'Card grid gap (tablet)', token: '--pd-card-gap-tablet → Scale/400',                value: '16px',                            notes: 'Medium gap on tablet' },
  { property: 'Card grid gap (desktop)',token: '--pd-card-gap-desktop → Scale/500',               value: '20px',                            notes: 'Wider gap on desktop' },
  { property: 'Carousel slide',         token: '--pd-transition-slide',                            value: '300ms ease-in-out',               notes: 'translateX pagination' },
  { property: 'Filter fade',            token: '--pd-transition-fade',                             value: '250ms',                           notes: 'Cards fade out → swap → fade in' },
  { property: 'Arrow button size',      token: '--pd-arrow-size → Scale/900',                     value: '40px',                            notes: 'Circular navigation button' },
  { property: 'Arrow bg/border',        token: '--pd-arrow-bg / --pd-arrow-border',               value: '#FFF / #C5C5C5',                  notes: 'White bg, neutral-300 border' },
  { property: 'Accent: New Arrivals',   token: '--pd-accent-new-arrivals → Blue-900',             value: '#142D51',                         notes: 'Navy bar on placeholder' },
  { property: 'Accent: Wrinkle-Free',   token: '--pd-accent-wrinkle-free',                        value: '#2C1810',                         notes: 'Dark brown bar on placeholder' },
  { property: 'Accent: Performance',    token: '--pd-accent-performance → Brand/Logo',            value: '#8E2231',                         notes: 'Maroon bar on placeholder' },
]

function TokenTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse min-w-[640px]">
        <thead>
          <tr className="bg-neutral-50 border-y border-neutral-200">
            <th className="px-4 py-2.5 text-left font-semibold text-[11px] uppercase tracking-widest text-neutral-400 w-44">Property</th>
            <th className="px-4 py-2.5 text-left font-semibold text-[11px] uppercase tracking-widest text-neutral-400 w-56">CSS Token</th>
            <th className="px-4 py-2.5 text-left font-semibold text-[11px] uppercase tracking-widest text-neutral-400 w-40">Value</th>
            <th className="px-4 py-2.5 text-left font-semibold text-[11px] uppercase tracking-widest text-neutral-400">Notes</th>
          </tr>
        </thead>
        <tbody>
          {TOKEN_ROWS.map((row, i) => (
            <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
              <td className="px-4 py-2.5 text-neutral-700 font-medium">{row.property}</td>
              <td className="px-4 py-2.5">
                <code className="bg-neutral-100 text-neutral-700 rounded px-1.5 py-0.5 font-mono text-[10px]">{row.token}</code>
              </td>
              <td className="px-4 py-2.5 font-mono text-neutral-500 text-[10px]">{row.value}</td>
              <td className="px-4 py-2.5 text-neutral-400">{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Token sync summary ──────────────────────────────────────────────────────

const SYNC_CHANGES = [
  { token: '--color-blue-700',    old: '#245090', new: '#255090', note: 'Hover state (Blue-Brand 1/Blue-700)' },
  { token: '--color-neutral-300', old: '#C4C4C4', new: '#C5C5C5', note: 'Disabled bg / arrow border' },
  { token: '--color-success',     old: '#248832', new: '#24882D', note: 'Feedback/success (Green-900)' },
  { token: '--btn-solid-hover',   old: '#245090', new: '#255090', note: 'Button hover (inherits Blue-700)' },
]

function SyncTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse min-w-[480px]">
        <thead>
          <tr className="bg-neutral-50 border-y border-neutral-200">
            <th className="px-4 py-2.5 text-left font-semibold text-[11px] uppercase tracking-widest text-neutral-400">Token</th>
            <th className="px-4 py-2.5 text-left font-semibold text-[11px] uppercase tracking-widest text-neutral-400">Old</th>
            <th className="px-4 py-2.5 text-left font-semibold text-[11px] uppercase tracking-widest text-neutral-400">New</th>
            <th className="px-4 py-2.5 text-left font-semibold text-[11px] uppercase tracking-widest text-neutral-400">Note</th>
          </tr>
        </thead>
        <tbody>
          {SYNC_CHANGES.map((row, i) => (
            <tr key={i} className="border-b border-neutral-100">
              <td className="px-4 py-2.5"><code className="font-mono text-[10px] text-neutral-700">{row.token}</code></td>
              <td className="px-4 py-2.5">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded border border-black/10 shrink-0" style={{ backgroundColor: row.old }} />
                  <code className="font-mono text-[10px] text-neutral-500 line-through">{row.old}</code>
                </span>
              </td>
              <td className="px-4 py-2.5">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded border border-black/10 shrink-0" style={{ backgroundColor: row.new }} />
                  <code className="font-mono text-[10px] text-neutral-700 font-semibold">{row.new}</code>
                </span>
              </td>
              <td className="px-4 py-2.5 text-neutral-400">{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── Accent color swatches ──────────────────────────────────────────────────

const FILTERS_META = [
  { id: 'new-arrivals', label: 'New Arrivals',            hex: '#142D51', token: '--pd-accent-new-arrivals' },
  { id: 'wrinkle-free', label: 'Wrinkle-Free Collection', hex: '#2C1810', token: '--pd-accent-wrinkle-free' },
  { id: 'performance',  label: 'Performance Collection',  hex: '#8E2231', token: '--pd-accent-performance' },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ProductDiscoveryPage() {
  return (
    <main className="min-h-screen bg-neutral-100">

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <header className="bg-blue-900 text-white px-6 sm:px-10 py-10">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-300 mb-2">
          Design Language System
        </p>
        <h1 className="font-semibold text-white" style={{ fontSize: 24, lineHeight: '30px' }}>
          Product Discovery Module · 2026
        </h1>
        <p className="text-blue-300 text-sm mt-2">
          Token-synced (2026-03-05) · Heading + filter buttons (left) · 3-card paginated carousel (right) ·
          3 filter categories · Responsive: Desktop / Tablet / Mobile
        </p>
      </header>

      <div className="px-6 sm:px-10 py-10 max-w-[1440px] mx-auto">

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 1 — TOKEN SYNC SUMMARY
        ══════════════════════════════════════════════════════════════════ */}
        <section id="sync" aria-labelledby="sync-heading">
          <SectionLabel>Token Sync</SectionLabel>
          <SectionHeading id="sync-heading">Token Changes</SectionHeading>
          <p className="text-sm text-neutral-500 mb-6">
            Values corrected from updated <code className="text-xs">Primitives.json</code> +{' '}
            <code className="text-xs">Semantic.json</code>. 3 primitive values updated.
          </p>

          <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden mb-10">
            <SyncTable />
          </div>
        </section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 2 — DESIGN TOKENS
        ══════════════════════════════════════════════════════════════════ */}
        <section id="tokens" aria-labelledby="tokens-heading">
          <SectionLabel>Design Tokens</SectionLabel>
          <SectionHeading id="tokens-heading">Token Reference</SectionHeading>
          <p className="text-sm text-neutral-500 mb-6">
            All values sourced from{' '}
            <code className="text-xs">Primitives.json</code> +{' '}
            <code className="text-xs">Semantic.json</code>.
            Component uses 3-layer token architecture: Primitives → Semantic → Component (--pd-*).
          </p>

          <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden mb-10">
            <TokenTable />
          </div>

          {/* Responsive behaviour callout */}
          <div className="bg-white rounded-lg border border-neutral-200 p-5 mb-10">
            <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">Responsive Behaviour</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-semibold text-neutral-700 mb-1">Mobile <span className="font-normal text-neutral-400">&lt; 640 px</span></p>
                <ul className="text-xs text-neutral-500 space-y-1">
                  <li>· Single column layout</li>
                  <li>· Heading + buttons stacked above carousel</li>
                  <li>· 3-card grid per page, <code className="font-mono text-[10px]">--pd-card-gap-mobile: 8px</code></li>
                  <li>· Arrows inset at <code className="font-mono text-[10px]">--pd-arrow-offset-mobile</code></li>
                  <li>· Filter buttons: full-width</li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-700 mb-1">Tablet <span className="font-normal text-neutral-400">640–1023 px</span></p>
                <ul className="text-xs text-neutral-500 space-y-1">
                  <li>· Two-column grid (1fr 2fr)</li>
                  <li>· Left: heading + filters</li>
                  <li>· Right: 3-card paginated carousel</li>
                  <li>· Card gap: <code className="font-mono text-[10px]">--pd-card-gap-tablet: 16px</code></li>
                  <li>· Column gap: <code className="font-mono text-[10px]">--pd-grid-gap-tablet: 24px</code></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-700 mb-1">Desktop <span className="font-normal text-neutral-400">&ge; 1024 px</span></p>
                <ul className="text-xs text-neutral-500 space-y-1">
                  <li>· Same two-column grid, wider gaps</li>
                  <li>· Card gap: <code className="font-mono text-[10px]">--pd-card-gap-desktop: 20px</code></li>
                  <li>· Column gap: <code className="font-mono text-[10px]">--pd-grid-gap-desktop: 40px</code></li>
                  <li>· Arrows at <code className="font-mono text-[10px]">-pd-arrow-offset-desktop</code></li>
                  <li>· ProductCard Quick Shop visible on hover</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Component API legend */}
          <div className="flex flex-wrap gap-6 mb-10 p-5 bg-white rounded-lg border border-neutral-200">
            <div>
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Filter Categories</p>
              <div className="space-y-1.5">
                {FILTERS_META.map((f) => (
                  <div key={f.id} className="flex items-center gap-2 text-xs text-neutral-600">
                    <div className="w-4 h-4 rounded shrink-0 border border-black/10" style={{ backgroundColor: f.hex }} />
                    <code className="bg-neutral-100 rounded px-1.5 py-0.5 text-[10px] font-mono text-neutral-700">{f.token}</code>
                    <span className="text-neutral-500">{f.label}</span>
                    <code className="font-mono text-[10px] text-neutral-400">{f.hex}</code>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Carousel behaviour</p>
              <div className="space-y-1.5">
                {[
                  { label: 'Cards per page',   value: '3' },
                  { label: 'Total products',   value: '6 per filter (2 pages)' },
                  { label: 'Slide animation',  value: '300ms ease-in-out translateX' },
                  { label: 'Filter transition', value: '250ms fade out → swap → fade in' },
                  { label: 'Left arrow',       value: 'Visible when page > 0' },
                  { label: 'Right arrow',      value: 'Visible when page < last' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-xs text-neutral-600">
                    <span className="w-28 text-neutral-500">{item.label}</span>
                    <code className="font-mono text-[10px] text-neutral-700">{item.value}</code>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Interaction States</p>
              <div className="space-y-1.5">
                {[
                  { label: 'Filter default',   desc: 'border-blue-900, text-blue-900, transparent bg' },
                  { label: 'Filter hover',     desc: 'bg-blue-100 (idle only)' },
                  { label: 'Filter active',    desc: 'bg-blue-900, text-white, border-blue-900' },
                  { label: 'Arrow hover',      desc: 'shadow-md (elevated)' },
                  { label: 'Arrow disabled',   desc: 'opacity-50, cursor-not-allowed' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-2 text-xs text-neutral-600">
                    <span className="w-28 text-neutral-500 shrink-0">{item.label}</span>
                    <span className="text-neutral-400">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 3 — DESKTOP (>= 1024 px)
        ══════════════════════════════════════════════════════════════════ */}
        <section id="desktop" aria-labelledby="desktop-heading">
          <SectionLabel>Breakpoint Preview</SectionLabel>
          <div className="flex items-baseline gap-3 mb-4">
            <SectionHeading id="desktop-heading">Desktop</SectionHeading>
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">&ge; 1024 px · Two-Column Grid</span>
          </div>
          <p className="text-xs text-neutral-500 mb-4">
            Two-column layout (1fr 2fr) with wider gap-10. Carousel arrows positioned at -left-5 / -right-5.
            Click filter buttons to see fade transition. Click arrows to paginate.
          </p>

          <div className="bg-white rounded-lg border border-neutral-200 px-6 py-6 mb-px">
            <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">
              Interactive — click filters to switch categories · click arrows to paginate
            </p>
            <div className="w-full max-w-[1024px]">
              <ProductDiscovery layout="desktop" />
            </div>
          </div>
        </section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 4 — TABLET (640–1023 px)
        ══════════════════════════════════════════════════════════════════ */}
        <section id="tablet" aria-labelledby="tablet-heading">
          <div className="flex items-baseline gap-3 mb-4">
            <SectionHeading id="tablet-heading">Tablet</SectionHeading>
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">640–1023 px · Two-Column Grid</span>
          </div>
          <p className="text-xs text-neutral-500 mb-4">
            Same two-column layout with tighter gap-6. Card grid uses gap-4.
          </p>

          <div className="bg-white rounded-lg border border-neutral-200 px-6 py-6 mb-px">
            <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">
              Interactive — 720 px container
            </p>
            <div className="w-[720px] max-w-full">
              <ProductDiscovery layout="tablet" />
            </div>
          </div>
        </section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 5 — MOBILE (< 640 px)
        ══════════════════════════════════════════════════════════════════ */}
        <section id="mobile" aria-labelledby="mobile-heading">
          <div className="flex items-baseline gap-3 mb-4">
            <SectionHeading id="mobile-heading">Mobile</SectionHeading>
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">&lt; 640 px · Single Column</span>
          </div>
          <p className="text-xs text-neutral-500 mb-4">
            Single-column stacked layout. Heading and filter buttons above, carousel below. Card grid uses gap-2.
          </p>

          <div className="bg-white rounded-lg border border-neutral-200 px-6 py-6 mb-px">
            <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">
              Interactive — 375 px container
            </p>
            <div className="w-[375px] max-w-full">
              <ProductDiscovery layout="mobile" />
            </div>
          </div>
        </section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 6 — ALL 3 BREAKPOINTS SIDE BY SIDE
        ══════════════════════════════════════════════════════════════════ */}
        <section id="comparison" aria-labelledby="comparison-heading">
          <SectionLabel>Comparison</SectionLabel>
          <SectionHeading id="comparison-heading">All 3 Breakpoints — Side by Side</SectionHeading>
          <p className="text-sm text-neutral-500 mb-8">
            Each instance is fully interactive. Click filters and arrows independently.
          </p>

          <div className="space-y-10">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">Desktop · 1024 px</p>
              <div className="w-full max-w-[1024px]">
                <ProductDiscovery layout="desktop" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">Tablet · 720 px</p>
              <div className="w-[720px] max-w-full">
                <ProductDiscovery layout="tablet" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">Mobile · 375 px</p>
              <div className="w-[375px] max-w-full">
                <ProductDiscovery layout="mobile" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <footer className="border-t border-neutral-200 mt-16 pt-8 pb-4 text-center">
          <p className="text-xs text-neutral-400">
            UNTUCKit Design Language System 2026 ·{' '}
            Product Discovery Module ·{' '}
            Token-synced 2026-03-05 · 3 filters · 3-card paginated carousel · Desktop / Tablet / Mobile
          </p>
        </footer>

      </div>
    </main>
  )
}
