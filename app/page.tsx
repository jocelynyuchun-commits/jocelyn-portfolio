/**
 * UNTUCKit DLS 2026 — Design System Showcase
 *
 * Sections:
 *   1. Design Tokens  — colors, typography, spacing
 *   2. Button Components — all variants × sizes × states
 */
import type { CSSProperties } from 'react'
import { Button, ButtonVariant, ButtonSize } from '@/components/ui/Button'

// ─────────────────────────────────────────────────────────────────────────────
// Token data
// ─────────────────────────────────────────────────────────────────────────────

const BLUE_SCALE = [
  { shade: '100', hex: '#E4EAF4', semantic: 'Solid/Focus-Fill, Outline/Focus-Fill' },
  { shade: '200', hex: '#BDC9DD', semantic: 'Inverted Active' },
  { shade: '300', hex: '#90A5C3', semantic: 'Focus Ring' },
  { shade: '400', hex: '#5A84BC', semantic: '' },
  { shade: '500', hex: '#2F71D4', semantic: 'Active / Pressed' },
  { shade: '600', hex: '#2A60B2', semantic: '' },
  { shade: '700', hex: '#255090', semantic: 'Hover' },
  { shade: '800', hex: '#1C3E70', semantic: '' },
  { shade: '900', hex: '#142D51', semantic: 'Default (Navy)' },
]

const NEUTRAL_SCALE = [
  { shade: '100', hex: '#FBFBFB', semantic: '' },
  { shade: '200', hex: '#EAEAEA', semantic: '' },
  { shade: '300', hex: '#C5C5C5', semantic: 'Disabled BG / Border' },
  { shade: '400', hex: '#9B9B9B', semantic: 'Disabled Text' },
  { shade: '500', hex: '#7C7C7C', semantic: '' },
  { shade: '600', hex: '#686868', semantic: '' },
  { shade: '700', hex: '#4A4A4A', semantic: '' },
  { shade: '800', hex: '#333333', semantic: '' },
  { shade: '900', hex: '#181818', semantic: '' },
]

const BRAND_COLORS = [
  { name: 'Navy',    hex: '#142D51', token: 'navy' },
  { name: 'Maroon',  hex: '#8E2231', token: 'maroon' },
  { name: 'Success', hex: '#24882D', token: 'success' },
  { name: 'Error',   hex: '#C02321', token: 'error' },
]

const TYPE_SCALE = [
  { label: 'H1', size: '24px', lineH: '30px', weight: '600', example: 'Shop the Collection' },
  { label: 'H2', size: '20px', lineH: '26px', weight: '600', example: 'New Arrivals' },
  { label: 'H3', size: '18px', lineH: '22px', weight: '600', example: 'Featured Styles' },
  { label: 'H4', size: '16px', lineH: '20px', weight: '600', example: 'Product Details' },
  { label: 'H5', size: '14px', lineH: '18px', weight: '600', example: 'Size & Fit' },
]

const BODY_SCALE = [
  { label: 'Body XL', size: '20px', lineH: '28px', weight: '400', example: 'Our shirts are designed to be worn untucked.' },
  { label: 'Body L',  size: '18px', lineH: '24px', weight: '400', example: 'Our shirts are designed to be worn untucked.' },
  { label: 'Body M',  size: '16px', lineH: '22px', weight: '400', example: 'Our shirts are designed to be worn untucked.' },
  { label: 'Body S',  size: '14px', lineH: '20px', weight: '400', example: 'Our shirts are designed to be worn untucked.' },
  { label: 'Body XS', size: '12px', lineH: '16px', weight: '400', example: 'Our shirts are designed to be worn untucked.' },
]

const SPACING = [
  { token: '0',    value: '0px',   label: 'Scale/0'    },
  { token: '100',  value: '4px',   label: 'Scale/100'  },
  { token: '200',  value: '8px',   label: 'Scale/200'  },
  { token: '300',  value: '12px',  label: 'Scale/300'  },
  { token: '400',  value: '16px',  label: 'Scale/400'  },
  { token: '500',  value: '20px',  label: 'Scale/500'  },
  { token: '600',  value: '24px',  label: 'Scale/600'  },
  { token: '700',  value: '28px',  label: 'Scale/700'  },
  { token: '800',  value: '32px',  label: 'Scale/800'  },
  { token: '900',  value: '40px',  label: 'Scale/900'  },
  { token: '1000', value: '48px',  label: 'Scale/1000' },
  { token: '1100', value: '64px',  label: 'Scale/1100' },
  { token: '1200', value: '80px',  label: 'Scale/1200' },
  { token: '1300', value: '96px',  label: 'Scale/1300' },
  { token: '1400', value: '120px', label: 'Scale/1400' },
]

// ─────────────────────────────────────────────────────────────────────────────
// Button state helpers — forced inline styles for the documentation matrix
// ─────────────────────────────────────────────────────────────────────────────
type DemoState = 'default' | 'hover' | 'active' | 'focus' | 'disabled'

const STATE_STYLES: Record<ButtonVariant, Partial<Record<DemoState, CSSProperties>>> = {
  solid: {
    hover:   { backgroundColor: '#255090', borderColor: '#255090' },
    active:  { backgroundColor: '#2F71D4', borderColor: '#2F71D4' },
    focus:   { backgroundColor: '#E4EAF4', borderColor: '#142D51', color: '#142D51', boxShadow: '0 0 0 3px #90A5C3' },
  },
  outline: {
    hover:   { borderColor: '#255090', color: '#255090' },
    active:  { borderColor: '#2F71D4', color: '#2F71D4' },
    focus:   { boxShadow: '0 0 0 3px #90A5C3' },
  },
  inverted: {
    hover:   { backgroundColor: '#E4EAF4', borderColor: '#E4EAF4' },
    active:  { backgroundColor: '#BDC9DD', borderColor: '#BDC9DD' },
    focus:   { boxShadow: '0 0 0 3px #90A5C3' },
  },
  'outline-white': {
    hover:   { borderColor: 'rgba(255,255,255,0.6)', color: 'rgba(255,255,255,0.6)' },
    active:  { borderColor: '#E4EAF4', color: '#E4EAF4' },
    focus:   { boxShadow: '0 0 0 3px #90A5C3' },
  },
}

interface DemoButtonProps {
  variant: ButtonVariant
  size: ButtonSize
  state: DemoState
  label?: string
}

function DemoButton({ variant, size, state, label = 'Shop Now' }: DemoButtonProps) {
  const forcedStyle = state !== 'default' && state !== 'disabled'
    ? STATE_STYLES[variant]?.[state]
    : undefined

  return (
    <Button
      variant={variant}
      size={size}
      disabled={state === 'disabled'}
      style={forcedStyle}
      tabIndex={-1}
      aria-label={`${variant} ${size} ${state}`}
    >
      {label}
    </Button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Button state matrix component
// ─────────────────────────────────────────────────────────────────────────────
const STATES: { key: DemoState; label: string }[] = [
  { key: 'default',  label: 'Default' },
  { key: 'hover',    label: 'Hover' },
  { key: 'active',   label: 'Active' },
  { key: 'focus',    label: 'Focus' },
  { key: 'disabled', label: 'Disabled' },
]

const SIZES: { key: ButtonSize; label: string; dim: string }[] = [
  { key: 'sm',   label: 'Small',    dim: '144 × 40' },
  { key: 'md',   label: 'Regular',  dim: '172 × 48' },
  { key: 'lg',   label: 'CTA',      dim: '366 × 48' },
]

interface ButtonMatrixProps {
  variant: ButtonVariant
  dark?: boolean
}

function ButtonMatrix({ variant, dark = false }: ButtonMatrixProps) {
  return (
    <div className={`rounded-lg overflow-hidden border ${dark ? 'border-blue-800' : 'border-neutral-200'}`}>
      {/* Column headers */}
      <div
        className={`grid border-b ${dark ? 'border-blue-800 bg-blue-900' : 'border-neutral-200 bg-white'}`}
        style={{ gridTemplateColumns: '80px repeat(5, 1fr)' }}
      >
        <div className={`px-3 py-2.5 text-[11px] font-semibold uppercase tracking-widest ${dark ? 'text-blue-300' : 'text-neutral-400'}`}>
          Size
        </div>
        {STATES.map((s) => (
          <div
            key={s.key}
            className={`px-3 py-2.5 text-[11px] font-semibold uppercase tracking-widest ${dark ? 'text-blue-300' : 'text-neutral-400'}`}
          >
            {s.label}
          </div>
        ))}
      </div>

      {/* Rows per size */}
      {SIZES.map((sz, i) => (
        <div
          key={sz.key}
          className={`grid items-center ${
            i < SIZES.length - 1
              ? dark ? 'border-b border-blue-800' : 'border-b border-neutral-200'
              : ''
          } ${dark ? 'bg-blue-900' : 'bg-white'}`}
          style={{ gridTemplateColumns: '80px repeat(5, 1fr)' }}
        >
          {/* Size label */}
          <div className={`px-3 py-4 ${dark ? 'text-blue-300' : 'text-neutral-400'}`}>
            <div className={`text-xs font-semibold ${dark ? 'text-white' : 'text-neutral-700'}`}>{sz.label}</div>
            <div className={`text-[10px] mt-0.5 ${dark ? 'text-blue-300' : 'text-neutral-400'}`}>{sz.dim}</div>
          </div>
          {/* State cells */}
          {STATES.map((s) => (
            <div key={s.key} className="px-3 py-4 flex items-center">
              <DemoButton variant={variant} size={sz.key} state={s.key} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Section layout helpers
// ─────────────────────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-3">
      {children}
    </p>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-semibold text-blue-900 mb-1" style={{ fontSize: 20, lineHeight: '26px' }}>
      {children}
    </h2>
  )
}

function Divider() {
  return <hr className="border-neutral-200 my-12" />
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <main className="min-h-screen bg-neutral-100">

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <header className="bg-blue-900 text-white px-6 sm:px-10 py-10">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-300 mb-2">
          Design Language System
        </p>
        <h1 className="font-semibold text-white" style={{ fontSize: 24, lineHeight: '30px' }}>
          Button Components · 2026
        </h1>
        <p className="text-blue-300 text-sm mt-2">
          Tokens sourced from{' '}
          <code className="text-blue-200 bg-blue-800 rounded px-1 py-0.5 text-xs">Primitives.json</code>
          {' '}+{' '}
          <code className="text-blue-200 bg-blue-800 rounded px-1 py-0.5 text-xs">Semantic.json</code>
        </p>
      </header>

      <div className="px-6 sm:px-10 py-10 max-w-[1440px] mx-auto">

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 0 — TOKEN SYNC SUMMARY
        ══════════════════════════════════════════════════════════════════ */}
        <section id="sync" aria-labelledby="sync-heading">
          <SectionLabel>Token Sync</SectionLabel>
          <SectionHeading>Token Changes</SectionHeading>
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
          <SectionHeading>Color</SectionHeading>
          <p className="text-sm text-neutral-500 mb-6">
            Primitive palette extracted from <code className="text-xs">Primitives.json</code>. Semantic mappings from <code className="text-xs">Semantic.json</code>.
          </p>

          {/* Blue scale */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">Blue Scale</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
              {BLUE_SCALE.map((c) => (
                <div key={c.shade}>
                  <div
                    className="w-full aspect-square rounded-dls border border-black/10 mb-2"
                    style={{ backgroundColor: c.hex }}
                  />
                  <p className="text-[11px] font-semibold text-neutral-700">Blue-{c.shade}</p>
                  <p className="text-[10px] text-neutral-400 font-mono">{c.hex}</p>
                  {c.semantic && (
                    <p className="text-[9px] text-blue-700 mt-0.5 leading-tight">{c.semantic}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Neutral scale */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">Neutral Scale</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
              {NEUTRAL_SCALE.map((c) => (
                <div key={c.shade}>
                  <div
                    className="w-full aspect-square rounded-dls border border-black/10 mb-2"
                    style={{ backgroundColor: c.hex }}
                  />
                  <p className="text-[11px] font-semibold text-neutral-700">Neutral-{c.shade}</p>
                  <p className="text-[10px] text-neutral-400 font-mono">{c.hex}</p>
                  {c.semantic && (
                    <p className="text-[9px] text-neutral-500 mt-0.5 leading-tight">{c.semantic}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Brand + Feedback */}
          <div className="mb-10">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-3">Brand &amp; Feedback</p>
            <div className="flex flex-wrap gap-4">
              {BRAND_COLORS.map((c) => (
                <div key={c.name} className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-dls border border-black/10 shrink-0"
                    style={{ backgroundColor: c.hex }}
                  />
                  <div>
                    <p className="text-xs font-semibold text-neutral-700">{c.name}</p>
                    <p className="text-[10px] text-neutral-400 font-mono">{c.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* ── Typography ─────────────────────────────────────────────── */}
          <SectionHeading>Typography</SectionHeading>
          <p className="text-sm text-neutral-500 mb-6">
            Font: <strong>Proxima Nova</strong> · Weights: Regular 400, Medium 500, Semibold 600
          </p>

          {/* Headers */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">Headers</p>
            <div className="bg-white rounded-lg border border-neutral-200 divide-y divide-neutral-100">
              {TYPE_SCALE.map((t) => (
                <div key={t.label} className="flex items-center gap-4 px-5 py-4">
                  <div className="w-8 text-[11px] font-semibold text-neutral-400 shrink-0">{t.label}</div>
                  <div
                    className="flex-1 font-proxima font-semibold text-neutral-900"
                    style={{ fontSize: t.size, lineHeight: t.lineH }}
                  >
                    {t.example}
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-[10px] text-neutral-400 font-mono shrink-0">
                    <span>{t.size}/{t.lineH}</span>
                    <span>w{t.weight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="mb-10">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">Body Text</p>
            <div className="bg-white rounded-lg border border-neutral-200 divide-y divide-neutral-100">
              {BODY_SCALE.map((t) => (
                <div key={t.label} className="flex items-center gap-4 px-5 py-4">
                  <div className="w-16 text-[11px] font-semibold text-neutral-400 shrink-0">{t.label}</div>
                  <div
                    className="flex-1 font-proxima text-neutral-900"
                    style={{ fontSize: t.size, lineHeight: t.lineH, fontWeight: Number(t.weight) }}
                  >
                    {t.example}
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-[10px] text-neutral-400 font-mono shrink-0">
                    <span>{t.size}/{t.lineH}</span>
                    <span>w{t.weight}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* ── Spacing ────────────────────────────────────────────────── */}
          <SectionHeading>Spacing Scale</SectionHeading>
          <p className="text-sm text-neutral-500 mb-6">
            15-step scale derived from <code className="text-xs">Scale/*</code> primitive tokens.
          </p>

          <div className="bg-white rounded-lg border border-neutral-200 divide-y divide-neutral-100">
            {SPACING.filter((s) => s.value !== '0px').map((s) => (
              <div key={s.token} className="flex items-center gap-4 px-5 py-3">
                <div className="w-20 text-[11px] font-mono text-neutral-400 shrink-0">{s.label}</div>
                <div
                  className="bg-blue-500 rounded-sm shrink-0"
                  style={{ width: s.value, height: '12px', maxWidth: '100%' }}
                />
                <div className="text-xs font-semibold text-neutral-700 font-mono">{s.value}</div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ══════════════════════════════════════════════════════════════════
            SECTION 2 — BUTTON COMPONENTS
        ══════════════════════════════════════════════════════════════════ */}
        <section id="buttons" aria-labelledby="buttons-heading">
          <SectionLabel>Button Components</SectionLabel>
          <h2
            id="buttons-heading"
            className="font-semibold text-blue-900 mb-1"
            style={{ fontSize: 20, lineHeight: '26px' }}
          >
            Button
          </h2>
          <p className="text-sm text-neutral-500 mb-8">
            4 variants · 4 sizes · 5 interactive states. Typography: Proxima Nova Medium 16/20 · tracking 0.02em · capitalize.
            Border radius: 4px (Buttons/Radius/Default).
          </p>

          {/* Component legend */}
          <div className="flex flex-wrap gap-6 mb-10 p-5 bg-white rounded-lg border border-neutral-200">
            <div>
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-2">Sizing tokens</p>
              <div className="space-y-1">
                {[
                  { size: 'sm',   w: '144px', h: '40px', px: '16px', token: 'Small' },
                  { size: 'md',   w: '172px', h: '48px', px: '20px', token: 'Medium/Regular' },
                  { size: 'lg',   w: '366px', h: '48px', px: '20px', token: 'CTA/Large' },
                  { size: 'full', w: '100%',  h: '48px', px: '20px', token: 'Full Width' },
                ].map((s) => (
                  <div key={s.size} className="flex items-center gap-2 text-xs text-neutral-600">
                    <code className="bg-neutral-100 rounded px-1.5 py-0.5 text-[10px] font-mono text-neutral-700 w-8">{s.size}</code>
                    <span className="font-mono">{s.w} × {s.h}</span>
                    <span className="text-neutral-400">px {s.px}</span>
                    <span className="text-neutral-400">·</span>
                    <span className="text-neutral-500">Buttons/Width+Height/{s.token}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-2">Semantic color tokens (Solid)</p>
              <div className="space-y-1">
                {[
                  { state: 'Default',  value: '#142D51', token: 'Buttons/Solid/Default' },
                  { state: 'Hover',    value: '#255090', token: 'Buttons/Solid/Hover' },
                  { state: 'Active',   value: '#2F71D4', token: 'Buttons/Solid/Active-Pressed' },
                  { state: 'Focus bg', value: '#E4EAF4', token: 'Buttons/Solid/Focus-Fill' },
                  { state: 'Focus ring', value: '#90A5C3', token: 'Buttons/Solid/Focus-Ring' },
                  { state: 'Disabled', value: '#C5C5C5', token: 'Buttons/Solid/Disabled' },
                ].map((t) => (
                  <div key={t.state} className="flex items-center gap-2 text-xs text-neutral-600">
                    <div className="w-4 h-4 rounded shrink-0 border border-black/10" style={{ backgroundColor: t.value }} />
                    <span className="w-16 text-neutral-500">{t.state}</span>
                    <code className="font-mono text-[10px] text-neutral-700">{t.value}</code>
                    <span className="text-neutral-400 text-[10px]">{t.token}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── 2.1  Solid — Light Mode ─────────────────────────────────── */}
          <div className="mb-10">
            <div className="flex items-baseline gap-3 mb-4">
              <h3 className="font-semibold text-blue-900 text-base">Solid</h3>
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">Light Mode · Primary</span>
            </div>
            <p className="text-xs text-neutral-500 mb-4">
              Figma: <em>Buttons-Solid/Light Mode → Buttons/Solid Blue</em> ·
              Default bg: <code className="font-mono text-[10px]">#142D51</code> (Buttons/Solid/Default → Color/Blue/Blue-900)
            </p>

            {/* Live interactive row */}
            <div className="bg-white rounded-t-lg border border-neutral-200 px-5 py-4 mb-px overflow-x-auto">
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Interactive — hover &amp; click to preview states</p>
              <div className="flex gap-4 items-end min-w-max">
                <Button variant="solid" size="sm">Shop Now</Button>
                <Button variant="solid" size="md">Shop Now</Button>
                <Button variant="solid" size="lg">Shop Now</Button>
                <Button variant="solid" size="full" className="max-w-[366px] min-w-[366px]">Shop Now</Button>
              </div>
            </div>

            {/* State matrix */}
            <div className="overflow-x-auto">
              <div className="min-w-[760px]">
                <ButtonMatrix variant="solid" />
              </div>
            </div>
          </div>

          {/* ── 2.2  Outline Blue — Light Mode ──────────────────────────── */}
          <div className="mb-10">
            <div className="flex items-baseline gap-3 mb-4">
              <h3 className="font-semibold text-blue-900 text-base">Outline</h3>
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest">Light Mode · Secondary</span>
            </div>
            <p className="text-xs text-neutral-500 mb-4">
              Figma: <em>Button/Outlined → Buttons_CTA/Outlined (Border=Blue)</em> ·
              Border: <code className="font-mono text-[10px]">#142D51</code> (Buttons/Outline/Default → Color/Blue/Blue-900)
            </p>

            {/* Live interactive row */}
            <div className="bg-white rounded-t-lg border border-neutral-200 px-5 py-4 mb-px overflow-x-auto">
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-widest mb-3">Interactive</p>
              <div className="flex gap-4 items-end min-w-max">
                <Button variant="outline" size="sm">Shop Now</Button>
                <Button variant="outline" size="md">Shop Now</Button>
                <Button variant="outline" size="lg">Shop Now</Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[760px]">
                <ButtonMatrix variant="outline" />
              </div>
            </div>
          </div>

          {/* ── 2.3 + 2.4  Dark Mode section ────────────────────────────── */}
          <div className="rounded-xl bg-blue-900 p-6 sm:p-8 mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-300 mb-1">Dark Mode</p>
            <p className="text-white font-semibold text-base mb-1">Dark Background · Navy #142D51</p>
            <p className="text-blue-300 text-xs mb-8">
              Figma: <em>Buttons-Solid/Dark Mode</em> · Use on images, hero banners, or dark-surface sections.
            </p>

            {/* ── 2.3  Inverted (White Solid) ───────────────────────────── */}
            <div className="mb-8">
              <div className="flex items-baseline gap-3 mb-3">
                <h3 className="font-semibold text-white text-base">Inverted</h3>
                <span className="text-[11px] font-semibold text-blue-300 uppercase tracking-widest">White Solid · Dark Mode Primary</span>
              </div>
              <p className="text-blue-300 text-xs mb-4">
                Figma: <em>Size=Regular, Border=No, Use=Inverted_Primary</em> ·
                BG: <code className="font-mono text-[10px] text-blue-200">#FFFFFF</code> · Text: <code className="font-mono text-[10px] text-blue-200">#142D51</code>
              </p>

              {/* Interactive */}
              <div className="bg-blue-800/40 rounded-t-lg border border-blue-700 px-5 py-4 mb-px overflow-x-auto">
                <p className="text-[11px] font-semibold text-blue-300 uppercase tracking-widest mb-3">Interactive</p>
                <div className="flex gap-4 items-end min-w-max">
                  <Button variant="inverted" size="sm">Shop Now</Button>
                  <Button variant="inverted" size="md">Shop Now</Button>
                  <Button variant="inverted" size="lg">Shop Now</Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <div className="min-w-[760px]">
                  <ButtonMatrix variant="inverted" dark />
                </div>
              </div>
            </div>

            {/* ── 2.4  Outline White ────────────────────────────────────── */}
            <div>
              <div className="flex items-baseline gap-3 mb-3">
                <h3 className="font-semibold text-white text-base">Outline White</h3>
                <span className="text-[11px] font-semibold text-blue-300 uppercase tracking-widest">White Border · Dark Mode Secondary</span>
              </div>
              <p className="text-blue-300 text-xs mb-4">
                Figma: <em>Size=Regular, Border=Yes, Use=Secondary</em> ·
                Border/Text: <code className="font-mono text-[10px] text-blue-200">#FFFFFF</code>
              </p>

              {/* Interactive */}
              <div className="bg-blue-800/40 rounded-t-lg border border-blue-700 px-5 py-4 mb-px overflow-x-auto">
                <p className="text-[11px] font-semibold text-blue-300 uppercase tracking-widest mb-3">Interactive</p>
                <div className="flex gap-4 items-end min-w-max">
                  <Button variant="outline-white" size="sm">Shop Now</Button>
                  <Button variant="outline-white" size="md">Shop Now</Button>
                  <Button variant="outline-white" size="lg">Shop Now</Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <div className="min-w-[760px]">
                  <ButtonMatrix variant="outline-white" dark />
                </div>
              </div>
            </div>
          </div>

          {/* ── 2.5  Composition examples ───────────────────────────────── */}
          <div className="mb-10">
            <h3 className="font-semibold text-blue-900 text-base mb-4">Composition Examples</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Hero CTA */}
              <div className="bg-blue-900 rounded-lg px-6 py-8 flex flex-col items-center text-center">
                <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-2">Hero Banner</p>
                <p className="text-white font-semibold mb-1" style={{ fontSize: 20, lineHeight: '26px' }}>
                  New Arrivals
                </p>
                <p className="text-blue-200 text-sm mb-5">Untucked. Always.</p>
                <div className="flex flex-col gap-3 w-full max-w-[200px]">
                  <Button variant="inverted" size="full">Shop Now</Button>
                  <Button variant="outline-white" size="full">Learn More</Button>
                </div>
              </div>

              {/* Product card */}
              <div className="bg-white rounded-lg border border-neutral-200 px-6 py-6 flex flex-col">
                <div className="bg-neutral-100 rounded mb-4 aspect-[4/3]" />
                <p className="text-xs text-neutral-400 mb-1">Button-Down</p>
                <p className="font-semibold text-blue-900 text-sm mb-3">Classic Oxford Shirt</p>
                <div className="mt-auto flex gap-2">
                  <Button variant="solid" size="sm">Add to Bag</Button>
                  <Button variant="outline" size="sm">Wishlist</Button>
                </div>
              </div>

              {/* Form CTA */}
              <div className="bg-white rounded-lg border border-neutral-200 px-6 py-6">
                <p className="font-semibold text-blue-900 text-sm mb-1">Find Your Fit</p>
                <p className="text-xs text-neutral-500 mb-4">Answer 3 questions for a personalised recommendation.</p>
                <div className="space-y-3">
                  <Button variant="solid" size="full">Get Started</Button>
                  <Button variant="outline" size="full">Skip for Now</Button>
                  <Button variant="solid" size="full" disabled>Submitting…</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <footer className="border-t border-neutral-200 pt-8 pb-4 text-center">
          <p className="text-xs text-neutral-400">
            Design Language System 2026 ·{' '}
            Button Components · Token-synced · 4 variants · 4 sizes · 5 states
          </p>
        </footer>
      </div>
    </main>
  )
}
