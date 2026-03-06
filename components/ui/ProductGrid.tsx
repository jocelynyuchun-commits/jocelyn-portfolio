'use client'

/**
 * UNTUCKit DLS 2026 — ProductGrid Module
 *
 * Figma source (file: pTgtkyE8xnvM526Khy13Br):
 *   Module node — 9413-10956
 *
 * Module overview
 * ─────────────────────────────────────────────────────────────────────────────
 *  Composed of:
 *    • Section header (title)
 *    • Scrollable filter / category button row
 *    • Responsive product grid using <ProductCard>
 *
 * Responsive grid columns
 * ─────────────────────────────────────────────────────────────────────────────
 *  Mobile  (≤ 639 px)  : 1-column   [grid-cols-1]
 *  Tablet  (640–1023 px): 2-column   [sm:grid-cols-2]
 *  Desktop (≥ 1024 px) : 4-column   [lg:grid-cols-4]
 *
 * Filter interaction (300 ms total)
 * ─────────────────────────────────────────────────────────────────────────────
 *  1. Click filter  → button switches to active (solid) state immediately
 *  2. Grid fades out (opacity 0, 150 ms ease-out)
 *  3. Products array updates to new category
 *  4. Grid fades in  (opacity 1, 300 ms ease-in)
 *  Each category has its own accentColor, rendered as an SVG placeholder when
 *  no real imageSrc is supplied — makes the category switch visually obvious.
 *
 * Token usage
 * ─────────────────────────────────────────────────────────────────────────────
 *  Section title   : font-proxima semibold / text-blue-900  (Typography/H2_600)
 *  Filter gap      : gap-2                                   (Spacing/Scale/200 = 8 px)
 *  Grid gap        : gap-4 sm:gap-5 lg:gap-6                (Spacing/Scale/400–600)
 *  Module padding  : px-4 sm:px-6 lg:px-8                   (Spacing/Scale/400–800)
 *  Section padding : py-10 lg:py-14                          (Spacing/Scale/1000–1200)
 *  Filter button   : outline (idle) → solid (active)         (Button/Solid + Button/Outline tokens)
 *
 * Sample data is in product-grid-data.ts (plain module, importable by Server Components).
 */

import { useState, useTransition, useCallback } from 'react'
import { ProductCard, ProductCardProps } from './ProductCard'
import {
  DEFAULT_FILTERS as _DEFAULT_FILTERS,
  PRODUCTS_BY_CATEGORY as _PRODUCTS_BY_CATEGORY,
} from './product-grid-data'

// ─── Re-export defaults so callers can import from one place ─────────────────
export { DEFAULT_FILTERS, PRODUCTS_BY_CATEGORY } from './product-grid-data'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FilterCategory {
  id: string
  label: string
}

/**
 * A product record for the grid.
 * `accentColor` is used only when `imageSrc` is absent — it generates a
 * tinted SVG placeholder so each filter category is visually distinct.
 */
export type GridProduct = Omit<ProductCardProps, 'className'> & {
  id: number
  /** CSS hex color used for the placeholder image when imageSrc is omitted. */
  accentColor: string
}

export interface ProductGridProps {
  /** Section heading */
  title?: string
  /** Filter tabs. Defaults to DEFAULT_FILTERS. */
  filters?: FilterCategory[]
  /** Full product dataset keyed by filter id. Defaults to PRODUCTS_BY_CATEGORY. */
  productsByCategory?: Record<string, GridProduct[]>
  /** Initially selected filter id. Defaults to first filter. */
  defaultFilter?: string
  className?: string
}

// ─── Placeholder image helper ─────────────────────────────────────────────────
//
// Generates an inline SVG data URI so the card image area shows the category's
// accent color instead of the generic neutral-400 grey.

function accentPlaceholder(hex: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="321" height="381"><rect width="321" height="381" fill="${hex}"/></svg>`
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

// ─── ProductGrid ──────────────────────────────────────────────────────────────

/**
 * Composable product listing module.
 *
 * @example
 * ```tsx
 * import { ProductGrid } from '@/components/ui/ProductGrid'
 *
 * <ProductGrid title="Shop Our Collection" />
 * ```
 */
export function ProductGrid({
  title              = 'Shop Our Collection',
  filters            = _DEFAULT_FILTERS,
  productsByCategory = _PRODUCTS_BY_CATEGORY,
  defaultFilter,
  className          = '',
}: ProductGridProps) {
  const initialFilter = defaultFilter ?? filters[0]?.id ?? ''

  const [activeFilter, setActiveFilter] = useState(initialFilter)
  const [gridVisible,  setGridVisible]  = useState(true)
  const [products,     setProducts]     = useState<GridProduct[]>(
    () => productsByCategory[initialFilter] ?? []
  )

  const [, startTransition] = useTransition()

  const handleFilterClick = useCallback(
    (filterId: string) => {
      if (filterId === activeFilter) return

      // 1. Snap button to active immediately
      setActiveFilter(filterId)

      // 2. Fade out (CSS duration-150 handles the 150 ms transition)
      setGridVisible(false)

      // 3. After fade-out completes, swap data and fade back in
      setTimeout(() => {
        startTransition(() => {
          setProducts(productsByCategory[filterId] ?? [])
          setGridVisible(true)
        })
      }, 150)
    },
    [activeFilter, productsByCategory]
  )

  return (
    <section
      aria-label={title}
      className={`w-full py-10 lg:py-14 px-4 sm:px-6 lg:px-8${className ? ` ${className}` : ''}`}
    >
      {/* ── Section title ─────────────────────────────────────────────────── */}
      {/*
       * Typography/H2_600: Proxima Nova Semibold, 20/26, +0.4px tracking
       * Color: blue-900 (#142D51)
       * Margin below: Scale/600 (24 px) → mb-6
       */}
      <h2 className="
        font-proxima font-semibold text-[20px] leading-[26px] tracking-[0.4px]
        capitalize text-blue-900 mb-6
      ">
        {title}
      </h2>

      {/* ── Filter tabs ───────────────────────────────────────────────────── */}
      {/*
       * Horizontally scrollable on mobile (overflow-x-auto) so all tabs stay
       * on one line. `no-scrollbar` hides the browser scrollbar track.
       * Gap: Scale/200 (8 px) = gap-2
       * Margin below: Scale/800 (32 px) = mb-8
       */}
      <div
        role="tablist"
        aria-label="Product category filters"
        className="flex flex-nowrap gap-2 overflow-x-auto pb-1 mb-8 no-scrollbar"
      >
        {filters.map((filter) => (
          <FilterTab
            key={filter.id}
            label={filter.label}
            isActive={filter.id === activeFilter}
            onClick={() => handleFilterClick(filter.id)}
          />
        ))}
      </div>

      {/* ── Product grid ──────────────────────────────────────────────────── */}
      {/*
       * Responsive columns:
       *   default (< 640 px) : 1 col   [grid-cols-1]
       *   sm (640–1023 px)   : 2 cols  [sm:grid-cols-2]
       *   lg (≥ 1024 px)     : 4 cols  [lg:grid-cols-4]
       *
       * Grid gap: Scale/400 → Scale/500 → Scale/600 (16 → 20 → 24 px)
       *
       * Fade animation:
       *   gridVisible=false → opacity-0 + duration-150 (fast fade-out)
       *   gridVisible=true  → opacity-100 + duration-300 (smooth fade-in)
       */}
      <div
        className={[
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
          'gap-4 sm:gap-5 lg:gap-6',
          'transition-opacity',
          gridVisible ? 'opacity-100 duration-300' : 'opacity-0 duration-150',
        ].join(' ')}
        aria-live="polite"
        aria-busy={!gridVisible}
      >
        {products.map((product) => {
          const { id, accentColor, ...cardProps } = product
          const resolvedImageSrc =
            cardProps.imageSrc ?? accentPlaceholder(accentColor)
          return (
            <ProductCard
              key={id}
              {...cardProps}
              imageSrc={resolvedImageSrc}
            />
          )
        })}
      </div>
    </section>
  )
}

// ─── FilterTab ────────────────────────────────────────────────────────────────
//
// Semantically a tab (role="tab" inside role="tablist") that visually mirrors
// the Button component's solid (active) and outline (idle) variants, but uses
// native <button> rather than the fixed-width Button component so labels can
// be variable-width.

interface FilterTabProps {
  label: string
  isActive: boolean
  onClick: () => void
}

function FilterTab({ label, isActive, onClick }: FilterTabProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onClick}
      className={[
        // Layout — height matches Button size="sm" (40 px), px from Button px-5
        'inline-flex items-center justify-center whitespace-nowrap select-none flex-shrink-0',
        'h-[40px] px-5',
        // Typography — Button label token: Proxima Nova Medium 16/20, 0.02em, capitalize
        'font-proxima font-medium text-base leading-5 tracking-btn capitalize',
        // Border / radius — Button defaults: 1 px border, 4 px radius
        'rounded-dls border transition-colors duration-150 ease-in-out',
        'outline-none focus-visible:outline-none focus-visible:shadow-focus',
        // State: active → solid (navy); idle → outline (navy border + text)
        isActive
          ? [
              'bg-blue-900 border-blue-900 text-white',
              'hover:bg-blue-700 hover:border-blue-700',
              'active:bg-blue-500 active:border-blue-500',
            ].join(' ')
          : [
              'bg-transparent border-blue-900 text-blue-900',
              'hover:border-blue-700 hover:text-blue-700',
              'active:border-blue-500 active:text-blue-500',
            ].join(' '),
      ].join(' ')}
    >
      {label}
    </button>
  )
}
