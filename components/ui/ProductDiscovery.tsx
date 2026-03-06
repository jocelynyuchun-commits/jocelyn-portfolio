'use client'

/**
 * UNTUCKit DLS 2026 — ProductDiscovery Module (Token-Synced)
 *
 * All styles come from CSS custom properties via product-discovery.css.
 * Zero hardcoded color, spacing, or typography values in JSX.
 *
 * Layout
 * ──────────────────────────────────────────────────────────────────────────────
 *  Mobile  (< 640 px) : single column — heading/buttons above, paginated carousel below
 *  Tablet  (640–1023px): two-column grid (1fr 2fr) — left: text + filters,
 *                        right: 3-card paginated carousel
 *  Desktop (≥ 1024 px): same two-column grid, wider gaps
 *
 * Carousel navigation (all breakpoints)
 * ──────────────────────────────────────────────────────────────────────────────
 *  Paginates in groups of 3 using CSS translateX slide (300 ms ease-in-out)
 *  LEFT arrow : visible only when page > 0
 *  RIGHT arrow: visible only when page < last page
 *
 * Filter interaction
 * ──────────────────────────────────────────────────────────────────────────────
 *  Click filter → button goes solid immediately → cards fade out (250 ms) →
 *  product set + page reset → cards fade in (250 ms)
 *
 * Accent colours per filter (thin bar at bottom of placeholder SVGs)
 * ──────────────────────────────────────────────────────────────────────────────
 *  New Arrivals  : var(--pd-accent-new-arrivals)  — blue-900 / navy
 *  Wrinkle-Free  : var(--pd-accent-wrinkle-free)  — dark brown
 *  Performance   : var(--pd-accent-performance)    — maroon
 *
 * Token sync: 2026-03-05 (Primitives.json + Semantic.json, Brand 1)
 */

import { useState } from 'react'
import { ProductCard } from './ProductCard'
import './product-discovery.css'

// ─── Constants ────────────────────────────────────────────────────────────────

const FILTERS = [
  { id: 'new-arrivals', label: 'New Arrivals',            accentColor: 'var(--pd-accent-new-arrivals)' },
  { id: 'wrinkle-free', label: 'Wrinkle-Free Collection', accentColor: 'var(--pd-accent-wrinkle-free)' },
  { id: 'performance',  label: 'Performance Collection',  accentColor: 'var(--pd-accent-performance)' },
] as const

type FilterId = (typeof FILTERS)[number]['id']

// Fallback hex values needed for SVG data URIs (CSS vars don't work inside data URIs)
const ACCENT_HEX: Record<FilterId, string> = {
  'new-arrivals': '#142D51',
  'wrinkle-free': '#2C1810',
  'performance':  '#8E2231',
}

const PLACEHOLDER_BG = '#C5C5C5' // var(--pd-placeholder-bg) fallback for SVG

/** Gray placeholder SVG with a thin accent bar at the bottom */
function makeAccentSrc(filterId: FilterId): string {
  const accent = ACCENT_HEX[filterId]
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400">` +
    `<rect width="300" height="400" fill="${PLACEHOLDER_BG}"/>` +
    `<rect y="372" width="300" height="28" fill="${accent}"/>` +
    `</svg>`,
  )}`
}

type DiscoveryProduct = { id: string; title: string; price: string; imageSrc: string }

const PRODUCTS: Record<FilterId, DiscoveryProduct[]> = Object.fromEntries(
  FILTERS.map(({ id }) => [
    id,
    Array.from({ length: 6 }, (_, i) => ({
      id:       `${id}-${i}`,
      title:    'Wrinkle-Free Domaschino Long-Sleeve Polo',
      price:    '$110.00',
      imageSrc: makeAccentSrc(id),
    })),
  ]),
) as Record<FilterId, DiscoveryProduct[]>

const CARDS_PER_PAGE = 3

// ─── Chevron icons ────────────────────────────────────────────────────────────

function ChevronLeft() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
      stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 1L1 7l6 6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none"
      stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 1l6 6-6 6" />
    </svg>
  )
}

// ─── Arrow button ─────────────────────────────────────────────────────────────

function ArrowButton({
  side,
  onClick,
  disabled,
  label,
}: {
  side: 'left' | 'right'
  onClick: () => void
  disabled: boolean
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      className={`pd__arrow pd__arrow--${side}`}
    >
      {side === 'left' ? <ChevronLeft /> : <ChevronRight />}
    </button>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export interface ProductDiscoveryProps {
  className?: string
  /** Force a specific layout mode (for docs). Omit for responsive behaviour. */
  layout?: 'mobile' | 'tablet' | 'desktop'
}

export function ProductDiscovery({ className = '', layout }: ProductDiscoveryProps) {
  const [activeFilter, setActiveFilter] = useState<FilterId>('new-arrivals')
  const [cardsVisible, setCardsVisible]  = useState(true)
  const [page, setPage]                  = useState(0)
  const [isSliding, setIsSliding]        = useState(false)

  const products   = PRODUCTS[activeFilter]
  const totalPages = Math.ceil(products.length / CARDS_PER_PAGE)
  const canGoBack    = page > 0
  const canGoForward = page < totalPages - 1

  const productPages: DiscoveryProduct[][] = Array.from(
    { length: totalPages },
    (_, i) => products.slice(i * CARDS_PER_PAGE, (i + 1) * CARDS_PER_PAGE),
  )

  function switchFilter(id: FilterId) {
    if (id === activeFilter) return
    setIsSliding(false)
    setCardsVisible(false)
    setTimeout(() => {
      setActiveFilter(id)
      setPage(0)
      setCardsVisible(true)
    }, 250) // var(--pd-transition-fade)
  }

  function navigate(dir: 'prev' | 'next') {
    if (isSliding) return
    const newPage = dir === 'next' ? page + 1 : page - 1
    if (newPage < 0 || newPage >= totalPages) return
    setIsSliding(true)
    setPage(newPage)
    setTimeout(() => setIsSliding(false), 300) // var(--pd-transition-slide)
  }

  // Build class names
  const gridCls = [
    'pd__grid',
    layout ? `pd__grid--${layout}` : '',
  ].filter(Boolean).join(' ')

  const carouselCls = [
    'pd__carousel',
    !cardsVisible ? 'pd__carousel--hidden' : '',
  ].filter(Boolean).join(' ')

  const trackCls = [
    'pd__track',
    isSliding ? 'pd__track--sliding' : '',
  ].filter(Boolean).join(' ')

  return (
    <section className={`pd${className ? ` ${className}` : ''}`}>
      <div className={gridCls}>

        {/* ── LEFT COLUMN — heading + filter buttons ──────────────── */}
        <div className="pd__aside">
          <div className="pd__heading-group">
            <h2 className="pd__heading">Discover New Favorites</h2>
            <p className="pd__subtext">
              Try our bestselling shirts, new arrivals, and more to find your new look.
            </p>
          </div>

          <div className="pd__filters">
            {FILTERS.map((filter) => {
              const isActive = filter.id === activeFilter
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => switchFilter(filter.id)}
                  className={[
                    'pd__filter-btn',
                    isActive ? 'pd__filter-btn--active' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── RIGHT COLUMN — paginated carousel ───────────────────── */}
        <div className={carouselCls}>
          {canGoBack && (
            <ArrowButton
              side="left"
              onClick={() => navigate('prev')}
              disabled={isSliding}
              label="Previous products"
            />
          )}

          <div className="pd__track-wrapper">
            <div
              className={trackCls}
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {productPages.map((pageCards, pageIdx) => (
                <div key={pageIdx} className="pd__card-page">
                  {pageCards.map((product) => (
                    <ProductCard
                      key={product.id}
                      title={product.title}
                      price={product.price}
                      badge="New"
                      imageSrc={product.imageSrc}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {canGoForward && (
            <ArrowButton
              side="right"
              onClick={() => navigate('next')}
              disabled={isSliding}
              label="Next products"
            />
          )}
        </div>

      </div>
    </section>
  )
}
