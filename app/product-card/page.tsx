'use client'

/**
 * UNTUCKit DLS 2026 — Product Card Component Docs
 *
 * Matches the visual style of the Button component docs (app/page.tsx).
 * Figma source (file: pTgtkyE8xnvM526Khy13Br):
 *   4134:2865  Default Small  ·  4167:2577  Default Large
 *   4134:2863  Sale           ·  4146:2770  Final Sale
 *   4134:3013  Notify Me
 *   4192:3980  Mobile         ·  7170:6173  Tablet
 */

import { useState } from 'react'
import { ProductCard, ColorSwatch } from '@/components/ui/ProductCard'

// ─── Shared fixture data ───────────────────────────────────────────────────────

const SWATCHES: ColorSwatch[] = [
  { name: 'Sky Blue', color: '#8BAED0' },
  { name: 'Maroon',   color: '#8E2231' },
  { name: 'Gold',     color: '#C9A84C' },
  { name: 'Khaki',    color: '#B5916E' },
  { name: 'Heather',  color: '#7C7C7C' },
]

const MANY_SWATCHES: ColorSwatch[] = [
  ...SWATCHES,
  { name: 'White',       color: '#FFFFFF' },
  { name: 'Black',       color: '#181818' },
  { name: 'Forest',      color: '#3B5C3E' },
]

const TITLE   = 'Wrinkle-Free Short Sleeve Riverstone Shirt'
const PRICE   = '$110'
const SALE_PRICE = '$88'

// ─── Layout helpers ────────────────────────────────────────────────────────────

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

// ─── Token reference table ─────────────────────────────────────────────────────

const TOKEN_ROWS = [
  { property: 'Image aspect ratio', token: '321 : 381', value: '0.842', notes: 'Fluid width, locked ratio' },
  { property: 'Image placeholder',  token: 'neutral-400',          value: '#9B9B9B', notes: 'Shown when imageSrc omitted' },
  { property: 'Quick Shop width',   token: '240 px',               value: '240px',   notes: 'max capped to calc(100%−24px)' },
  { property: 'Quick Shop height',  token: '40 px',                value: '40px',    notes: '' },
  { property: 'Quick Shop BG',      token: 'white / 60%',          value: 'rgba(255,255,255,0.6)', notes: 'bg-white/60' },
  { property: 'Quick Shop bottom',  token: 'Scale/1200',           value: '80px',    notes: 'Fixed offset from image bottom' },
  { property: 'Badge height',       token: 'Scale/600',            value: '24px',    notes: 'Always bg-[#ececec]' },
  { property: 'Badge inset',        token: 'Scale/300',            value: '10px',    notes: 'bottom-left' },
  { property: 'Badge text (Default)',  token: 'Color/Blue/Blue-900', value: '#142D51', notes: 'Navy' },
  { property: 'Badge text (Sale)',  token: 'Color/Maroon',         value: '#8E2231', notes: 'Maroon' },
  { property: 'Wishlist hit target',token: 'Scale/800',            value: '32×32px', notes: 'top-right, 12 px inset' },
  { property: 'Swatch size (desktop)', token: '30 px',             value: '30px',    notes: 'w-[30px] h-[30px]' },
  { property: 'Swatch size (mobile)', token: '36 px',              value: '36px',    notes: 'w-9 h-9 (< lg)' },
  { property: 'Swatch gap (desktop)', token: 'Scale/200',          value: '8px',     notes: 'gap-x-2' },
  { property: 'Swatch gap (mobile)', token: 'Scale/400',           value: '16px',    notes: 'gap-x-4 (< lg)' },
  { property: 'Swatch ring',        token: '1.5 px / Blue-900',    value: '1.5px #142D51', notes: 'ring-[1.5px] ring-blue-900' },
  { property: 'Title type',         token: 'Label/L_500',          value: '16/20px w500 ls0.02em', notes: 'neutral-700' },
  { property: 'Price type',         token: 'Label/L_400',          value: '16/20px w400 ls0.02em', notes: 'neutral-700' },
  { property: 'Sale original price', token: 'Label/L_400',         value: '16/20px w400',          notes: 'neutral-500 + asterisk' },
  { property: 'Sale price',         token: 'Label/L_400',          value: '16/20px w400',          notes: 'maroon (#8E2231)' },
  { property: 'Promo line type',    token: 'Label/M_400',          value: '14/16px w400 ls0.02em', notes: 'maroon' },
  { property: 'Color name type',    token: 'Label/M_500',          value: '14/16px w500 ls0.02em', notes: 'neutral-600' },
  { property: 'Price note type',    token: 'Label/XS_600',         value: '10/12px w600 ls0.02em', notes: 'neutral-600' },
]

function TokenTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs border-collapse min-w-[640px]">
        <thead>
          <tr className="bg-neutral-50 border-y border-neutral-200">
            <th className="px-4 py-2.5 text-left font-semibold text-[11px] uppercase tracking-widest text-neutral-400 w-44">Property</th>
            <th className="px-4 py-2.5 text-left font-semibold text-[11px] uppercase tracking-widest text-neutral-400 w-48">Design Token</th>
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

// ─── Breakpoint showcase strip ─────────────────────────────────────────────────

interface BreakpointStripProps {
  variant: 'default' | 'sale' | 'finalSale' | 'notifyMe'
  badge?: string | null
}

function BreakpointStrip({ variant, badge }: BreakpointStripProps) {
  const commonProps = {
    variant,
    title: TITLE,
    price: PRICE,
    colorName: 'Sky Blue',
    colors: SWATCHES,
    badge,
    ...(variant === 'sale'
      ? { salePrice: SALE_PRICE, promoText: 'Extra 30% Off With Code GIFT', priceNote: '*Price On 11/20/23' }
      : {}),
  }

  return (
    <div className="flex flex-wrap items-start gap-8">
      <div>
        <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Desktop Large · 438 px</p>
        <div className="w-[438px]">
          <ProductCard {...commonProps} />
        </div>
      </div>
      <div>
        <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Desktop Small · 321 px</p>
        <div className="w-[321px]">
          <ProductCard {...commonProps} />
        </div>
      </div>
      <div>
        <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Tablet · 211 px</p>
        <div className="w-[211px]">
          <ProductCard {...commonProps} />
        </div>
      </div>
      <div>
        <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Mobile · 171 px</p>
        <div className="w-[171px]">
          <ProductCard {...commonProps} />
        </div>
      </div>
    </div>
  )
}

// ─── Wishlist toggle demo ──────────────────────────────────────────────────────

function WishlistDemo() {
  const [wishlisted, setWishlisted] = useState(false)
  return (
    <ProductCard
      variant="default"
      title={TITLE}
      price={PRICE}
      colorName="Sky Blue"
      colors={SWATCHES}
      badge="New"
      isWishlisted={wishlisted}
      onWishlistToggle={() => setWishlisted((w) => !w)}
    />
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ProductCardPage() {
  return (
    <main className="min-h-screen bg-neutral-100">

      {/* ── Page header ───────────────────────────────────────────────────── */}
      <header className="bg-blue-900 text-white px-6 sm:px-10 py-10">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-300 mb-2">
          Design Language System
        </p>
        <h1 className="font-semibold text-white" style={{ fontSize: 24, lineHeight: '30px' }}>
          Product Card · 2026
        </h1>
        <p className="text-blue-300 text-sm mt-2">
          Figma source:{' '}
          <code className="text-blue-200 bg-blue-800 rounded px-1 py-0.5 text-xs">pTgtkyE8xnvM526Khy13Br</code>
          {' '}· Node{' '}
          <code className="text-blue-200 bg-blue-800 rounded px-1 py-0.5 text-xs">4134:2864</code>
          {' '}· 4 variants · 3 breakpoints
        </p>
      </header>

      <div className="px-6 sm:px-10 py-10 max-w-[1440px] mx-auto">

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 0 — TOKEN SYNC SUMMARY
        ══════════════════════════════════════════════════════════════════ */}
        <section id="sync" aria-labelledby="sync-heading">
          <SectionLabel>Token Sync</SectionLabel>
          <SectionHeading id="sync-heading">Token Changes</SectionHeading>
          <p className="text-sm text-neutral-500 mb-6">
            Values corrected from updated <code className="text-xs">Primitives.json</code> +{' '}
            <code className="text-xs">Semantic.json</code>. 3 primitive values updated.
          </p>

          <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden mb-10">
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
                  {[
                    { token: '--color-blue-700',    old: '#245090', new: '#255090', note: 'Hover state (Blue-Brand 1/Blue-700)' },
                    { token: '--color-neutral-300', old: '#C4C4C4', new: '#C5C5C5', note: 'Disabled bg / border' },
                    { token: '--color-success',     old: '#248832', new: '#24882D', note: 'Feedback/success (Green-900)' },
                    { token: '--btn-solid-hover',   old: '#245090', new: '#255090', note: 'Button hover (inherits Blue-700)' },
                  ].map((row, i) => (
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
          </div>
        </section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 1 — DESIGN TOKENS
        ══════════════════════════════════════════════════════════════════ */}
        <section id="tokens" aria-labelledby="tokens-heading">
          <SectionLabel>Design Tokens</SectionLabel>
          <SectionHeading id="tokens-heading">Token Reference</SectionHeading>
          <p className="text-sm text-neutral-500 mb-6">
            All values sourced from{' '}
            <code className="text-xs">Primitives.json</code> +{' '}
            <code className="text-xs">Semantic.json</code>.
            Typography uses <strong>Proxima Nova</strong> throughout.
          </p>

          <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden mb-10">
            <TokenTable />
          </div>

          {/* Responsive behaviour callout */}
          <div className="bg-white rounded-lg border border-neutral-200 p-5 mb-10">
            <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">Responsive Behaviour</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-semibold text-neutral-700 mb-1">Mobile <span className="font-normal text-neutral-400">≤ 575 px</span></p>
                <ul className="text-xs text-neutral-500 space-y-1">
                  <li>· Card width ≈ 171 px</li>
                  <li>· Swatches: 36 px circles</li>
                  <li>· Swatch gap: 16 px</li>
                  <li>· Swatch row: <code className="font-mono text-[10px]">overflow-x-auto</code></li>
                  <li>· Quick Shop: <strong className="text-neutral-700">hidden</strong></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-700 mb-1">Tablet <span className="font-normal text-neutral-400">576–1023 px</span></p>
                <ul className="text-xs text-neutral-500 space-y-1">
                  <li>· Card width ≈ 211 px</li>
                  <li>· Swatches: 36 px circles</li>
                  <li>· Swatch gap: 16 px</li>
                  <li>· Swatch row: <code className="font-mono text-[10px]">overflow-x-auto</code></li>
                  <li>· Quick Shop: <strong className="text-neutral-700">hidden</strong></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-700 mb-1">Desktop <span className="font-normal text-neutral-400">≥ 1024 px</span></p>
                <ul className="text-xs text-neutral-500 space-y-1">
                  <li>· Card width: 321–438 px</li>
                  <li>· Swatches: 30 px circles</li>
                  <li>· Swatch gap: 8 px</li>
                  <li>· Swatch row: <code className="font-mono text-[10px]">flex-wrap</code></li>
                  <li>· Quick Shop: hover-reveal (opacity transition)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 2 — VARIANTS
        ══════════════════════════════════════════════════════════════════ */}
        <section id="variants" aria-labelledby="variants-heading">
          <SectionLabel>Card Variants</SectionLabel>
          <SectionHeading id="variants-heading">Product Card</SectionHeading>
          <p className="text-sm text-neutral-500 mb-8">
            4 variants · Fully responsive · Semantic design tokens throughout.
            Quick Shop fades in on desktop hover; hidden on mobile &amp; tablet.
          </p>

          {/* Component API legend */}
          <div className="flex flex-wrap gap-6 mb-10 p-5 bg-white rounded-lg border border-neutral-200">
            <div>
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Variant prop</p>
              <div className="space-y-1.5">
                {[
                  { v: 'default',   desc: 'Standard card. Optional badge prop.' },
                  { v: 'sale',      desc: 'Sale badge + sale pricing layout.' },
                  { v: 'finalSale', desc: '"Final Sale" badge + standard pricing.' },
                  { v: 'notifyMe',  desc: '"Coming Soon: Notify Me" always visible.' },
                ].map(({ v, desc }) => (
                  <div key={v} className="flex items-start gap-2 text-xs text-neutral-600">
                    <code className="bg-neutral-100 rounded px-1.5 py-0.5 text-[10px] font-mono text-neutral-700 shrink-0">{v}</code>
                    <span className="text-neutral-400">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Badge colours</p>
              <div className="space-y-1.5">
                {[
                  { label: 'All badges',      bg: '#ececec', text: '—',       note: 'Always bg-[#ececec]' },
                  { label: 'Default text',    bg: '#142D51', text: '#142D51', note: 'Blue-900 (Navy)' },
                  { label: 'Sale / FS text',  bg: '#8E2231', text: '#8E2231', note: 'Maroon' },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-2 text-xs text-neutral-600">
                    <div className="w-4 h-4 rounded shrink-0 border border-black/10" style={{ backgroundColor: b.bg }} />
                    <span className="w-28 text-neutral-500">{b.label}</span>
                    <code className="font-mono text-[10px] text-neutral-400">{b.note}</code>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Sale pricing props</p>
              <div className="space-y-1.5">
                {[
                  { prop: 'price',     desc: 'Original price — shown with asterisk in neutral-500' },
                  { prop: 'salePrice', desc: 'Sale price — rendered in maroon' },
                  { prop: 'promoText', desc: 'Promo line — maroon, 14px Regular' },
                  { prop: 'priceNote', desc: 'Footnote — neutral-600, 10px Semibold' },
                ].map(({ prop, desc }) => (
                  <div key={prop} className="flex items-start gap-2 text-xs text-neutral-600">
                    <code className="bg-neutral-100 rounded px-1.5 py-0.5 text-[10px] font-mono text-neutral-700 shrink-0">{prop}</code>
                    <span className="text-neutral-400">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── 2.1  Default ─────────────────────────────────────────────── */}
          <div className="mb-10">
            <div className="flex items-baseline gap-3 mb-4">
              <h3 className="font-semibold text-blue-900 text-base">Default</h3>
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">Standard Product Card</span>
            </div>
            <p className="text-xs text-neutral-500 mb-4">
              Figma: <em>Desktop/Small/Default → 4134:2865</em> · Large → <em>4167:2577</em>. Optional <code className="font-mono text-[10px]">badge</code> prop (e.g. "New").
              Quick Shop fades in on desktop hover.
            </p>

            {/* Interactive */}
            <div className="bg-white rounded-t-lg border border-neutral-200 px-5 py-4 mb-px">
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">
                Interactive — hover over card to preview Quick Shop · click heart to toggle wishlist
              </p>
              <div className="flex flex-wrap gap-6 items-start">
                <div className="w-[321px]">
                  <WishlistDemo />
                </div>
              </div>
            </div>

            {/* Breakpoint strip */}
            <div className="bg-neutral-50 rounded-b-lg border border-t-0 border-neutral-200 px-5 py-5">
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">All breakpoints</p>
              <div className="overflow-x-auto">
                <BreakpointStrip variant="default" badge="New" />
              </div>
            </div>
          </div>

          {/* ── 2.2  Sale ────────────────────────────────────────────────── */}
          <div className="mb-10">
            <div className="flex items-baseline gap-3 mb-4">
              <h3 className="font-semibold text-blue-900 text-base">Sale</h3>
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">Promotional Pricing</span>
            </div>
            <p className="text-xs text-neutral-500 mb-4">
              Figma: <em>Desktop/Small/Sale → 4134:2863</em>. Badge: "Sale" (maroon text, #ececec bg).
              Original price: neutral-500 + asterisk. Sale price: maroon. Promo line + footnote optional.
            </p>

            <div className="bg-white rounded-t-lg border border-neutral-200 px-5 py-4 mb-px">
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Interactive</p>
              <div className="w-[321px]">
                <ProductCard
                  variant="sale"
                  title={TITLE}
                  price={PRICE}
                  salePrice={SALE_PRICE}
                  promoText="Extra 30% Off With Code GIFT At Checkout"
                  priceNote="*Price On 11/20/23"
                  colorName="Sky Blue"
                  colors={SWATCHES}
                />
              </div>
            </div>

            <div className="bg-neutral-50 rounded-b-lg border border-t-0 border-neutral-200 px-5 py-5">
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">All breakpoints</p>
              <div className="overflow-x-auto">
                <BreakpointStrip variant="sale" />
              </div>
            </div>
          </div>

          {/* ── 2.3  Final Sale ──────────────────────────────────────────── */}
          <div className="mb-10">
            <div className="flex items-baseline gap-3 mb-4">
              <h3 className="font-semibold text-blue-900 text-base">Final Sale</h3>
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">Non-Returnable</span>
            </div>
            <p className="text-xs text-neutral-500 mb-4">
              Figma: <em>Desktop/Small/Final Sale → 4146:2770</em>. Badge: "Final Sale" (maroon text, #ececec bg).
              Standard pricing layout — no sale price or promo line.
            </p>

            <div className="bg-white rounded-t-lg border border-neutral-200 px-5 py-4 mb-px">
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Interactive</p>
              <div className="w-[321px]">
                <ProductCard
                  variant="finalSale"
                  title={TITLE}
                  price={PRICE}
                  colorName="Sky Blue"
                  colors={SWATCHES}
                />
              </div>
            </div>

            <div className="bg-neutral-50 rounded-b-lg border border-t-0 border-neutral-200 px-5 py-5">
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">All breakpoints</p>
              <div className="overflow-x-auto">
                <BreakpointStrip variant="finalSale" />
              </div>
            </div>
          </div>

          {/* ── 2.4  Notify Me ───────────────────────────────────────────── */}
          <div className="mb-10">
            <div className="flex items-baseline gap-3 mb-4">
              <h3 className="font-semibold text-blue-900 text-base">Notify Me</h3>
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">Out of Stock / Coming Soon</span>
            </div>
            <p className="text-xs text-neutral-500 mb-4">
              Figma: <em>Desktop/Small/Notify Me → 4134:3013</em>. No badge.
              Replaces Quick Shop with <strong>"Coming Soon: Notify Me"</strong> — always visible at all breakpoints (no hover dependency).
            </p>

            <div className="bg-white rounded-t-lg border border-neutral-200 px-5 py-4 mb-px">
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Interactive</p>
              <div className="w-[321px]">
                <ProductCard
                  variant="notifyMe"
                  title={TITLE}
                  price={PRICE}
                  colorName="Sky Blue"
                  colors={SWATCHES}
                />
              </div>
            </div>

            <div className="bg-neutral-50 rounded-b-lg border border-t-0 border-neutral-200 px-5 py-5">
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-4">All breakpoints</p>
              <div className="overflow-x-auto">
                <BreakpointStrip variant="notifyMe" />
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 3 — ALL VARIANTS SIDE-BY-SIDE
        ══════════════════════════════════════════════════════════════════ */}
        <section id="comparison" aria-labelledby="comparison-heading">
          <SectionLabel>Comparison</SectionLabel>
          <SectionHeading id="comparison-heading">All 4 Variants — Desktop Small (321 px)</SectionHeading>
          <p className="text-sm text-neutral-500 mb-8">
            Hover over each card to see the Quick Shop overlay (Default, Sale, Final Sale).
          </p>

          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex flex-wrap gap-8 items-start">
              <div>
                <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Default</p>
                <div className="w-[321px]">
                  <ProductCard variant="default" title={TITLE} price={PRICE} badge="New" colorName="Sky Blue" colors={SWATCHES} />
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Sale</p>
                <div className="w-[321px]">
                  <ProductCard variant="sale" title={TITLE} price={PRICE} salePrice={SALE_PRICE}
                    promoText="Extra 30% Off With Code GIFT" priceNote="*Price On 11/20/23"
                    colorName="Sky Blue" colors={SWATCHES} />
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Final Sale</p>
                <div className="w-[321px]">
                  <ProductCard variant="finalSale" title={TITLE} price={PRICE} colorName="Sky Blue" colors={SWATCHES} />
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Notify Me</p>
                <div className="w-[321px]">
                  <ProductCard variant="notifyMe" title={TITLE} price={PRICE} colorName="Sky Blue" colors={SWATCHES} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 4 — RESPONSIVE GRID
        ══════════════════════════════════════════════════════════════════ */}
        <section id="grid" aria-labelledby="grid-heading">
          <SectionLabel>Responsive Grid</SectionLabel>
          <SectionHeading id="grid-heading">Mixed Variants — Fluid Grid</SectionHeading>
          <p className="text-sm text-neutral-500 mb-8">
            4 col (lg) → 3 col (md) → 2 col (sm) → 1 col. Resize the window to test swatch layout switching.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ProductCard variant="default" title={TITLE} price={PRICE} badge="New" colorName="Sky Blue" colors={MANY_SWATCHES} />
            <ProductCard variant="sale" title={TITLE} price={PRICE} salePrice={SALE_PRICE}
              promoText="Extra 30% Off With Code GIFT" priceNote="*Price On 11/20/23"
              colorName="Sky Blue" colors={SWATCHES} />
            <ProductCard variant="finalSale" title={TITLE} price={PRICE} colorName="Sky Blue" colors={SWATCHES} />
            <ProductCard variant="notifyMe" title={TITLE} price={PRICE} colorName="Sky Blue" colors={SWATCHES} />
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────────────────── */}
        <footer className="border-t border-neutral-200 mt-16 pt-8 pb-4 text-center">
          <p className="text-xs text-neutral-400">
            Design Language System 2026 ·{' '}
            Product Card · Token-synced · 4 variants · 3 breakpoints
          </p>
        </footer>

      </div>
    </main>
  )
}
