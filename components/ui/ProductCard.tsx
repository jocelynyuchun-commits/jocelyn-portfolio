'use client'

/**
 * UNTUCKit DLS 2026 — ProductCard Component
 *
 * Figma source (file: pTgtkyE8xnvM526Khy13Br):
 *   Default    — 4134:2865 (Small) · 4167:2577 (Large)
 *   Sale       — 4134:2863 (Small)
 *   Final Sale — 4146:2770 (Small)
 *   Notify Me  — 4134:3013 (Small)
 *
 * Variant overview
 * ─────────────────────────────────────────────────────────────────────────────
 *  default    — standard card; optional "New" badge (navy text on #ececec)
 *  sale       — "Sale" badge (maroon text on #ececec); original price + asterisk
 *               in neutral-500, sale price in maroon, optional promo + footnote
 *  finalSale  — "Final Sale" badge (maroon text on #ececec); standard pricing
 *  notifyMe   — no badge; replaces Quick Shop with permanent "Coming Soon:
 *               Notify Me" CTA (always visible, no hover dependency)
 *
 * Responsive behaviour
 * ─────────────────────────────────────────────────────────────────────────────
 *  Mobile (< 1024 px)  : 36 px swatches · 16 px gap · overflow-x-auto scroll
 *                         Quick Shop hidden entirely
 *  Desktop (≥ 1024 px) : 30 px swatches ·  8 px gap · flex-wrap
 *                         Quick Shop hidden by default, fades in on card hover
 *
 * Shared specs
 * ─────────────────────────────────────────────────────────────────────────────
 *  Image aspect ratio : 321:381
 *  Quick Shop         : 240×40 px, bg-white/60, centered, 80 px above image bottom
 *  Badge              : 24 px tall, bottom-left (10 px inset), always bg-[#ececec]
 *  Wishlist           : 32×32 px, top-right (12 px inset), inline SVG heart
 */

import { useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export type CardVariant = 'default' | 'sale' | 'finalSale' | 'notifyMe'

export interface ColorSwatch {
  name: string
  /** CSS color string (hex, rgb, hsl) */
  color: string
  /** URL for patterned / textured swatches — renders as <img> inside circle */
  imageUrl?: string
}

export interface ProductCardProps {
  /**
   * Controls the badge, pricing layout, and CTA overlay.
   *   'default'   — no automatic badge; standard pricing; hover Quick Shop
   *   'sale'      — "Sale" badge + sale pricing; hover Quick Shop
   *   'finalSale' — "Final Sale" badge + standard pricing; hover Quick Shop
   *   'notifyMe'  — no badge; "Coming Soon: Notify Me" always visible
   */
  variant?: CardVariant
  title?: string
  /** Regular / original price, e.g. "$110" */
  price?: string
  /**
   * Sale price (e.g. "$88"). Only rendered when variant='sale'.
   * When provided, original price is shown in neutral-500 with an asterisk.
   */
  salePrice?: string
  /**
   * Promotional copy below the prices (variant='sale' only).
   * e.g. "Extra 30% Off With Code GIFT At Checkout"
   * Rendered in maroon, Label/M_400 (14 px Regular).
   */
  promoText?: string
  /**
   * Price-date footnote (variant='sale' only), e.g. "*Price On 11/20/23".
   * Rendered in neutral-600, Label/XS_600 (10 px Semibold).
   */
  priceNote?: string
  /** Overrides the auto-derived badge text for the active variant. */
  badge?: string | null
  /** Currently selected colour name; overridden by clicked swatch name. */
  colorName?: string
  colors?: ColorSwatch[]
  /** Product image URL — grey neutral-400 placeholder when omitted. */
  imageSrc?: string
  imageAlt?: string
  isWishlisted?: boolean
  onWishlistToggle?: () => void
  onQuickBuy?: () => void
  /** Called when "Coming Soon: Notify Me" is clicked (notifyMe variant). */
  onNotifyMe?: () => void
  className?: string
}

// ─── Badge config ─────────────────────────────────────────────────────────────
//
// ALL badge types use bg-[#ececec] per Figma.
// Text colour: navy for Default ("New"), maroon for Sale / Final Sale.
// notifyMe has no badge.

const VARIANT_BADGE: Record<CardVariant, string | null> = {
  default:   null,
  sale:      'Sale',
  finalSale: 'Final Sale',
  notifyMe:  null,
}

const VARIANT_BADGE_STYLE: Record<CardVariant, string> = {
  default:   'bg-[#ececec] text-blue-900',
  sale:      'bg-[#ececec] text-maroon',
  finalSale: 'bg-[#ececec] text-maroon',
  notifyMe:  'bg-[#ececec] text-blue-900',
}

// ─── Heart icon ───────────────────────────────────────────────────────────────

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill={filled ? '#142D51' : 'none'}
      stroke="#142D51"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17.36 1.64a5 5 0 0 0-7.07 0L10 1.93l-.29-.29a5 5 0 0 0-7.07 7.07l.29.29L10 16.07l7.07-7.07.29-.29a5 5 0 0 0 0-7.07z" />
    </svg>
  )
}

// ─── ProductCard ──────────────────────────────────────────────────────────────

export function ProductCard({
  variant      = 'default',
  title        = 'Wrinkle-Free Short Sleeve Riverstone Shirt',
  price        = '$110',
  salePrice,
  promoText,
  priceNote,
  badge,
  colorName    = '',
  colors       = [],
  imageSrc,
  imageAlt,
  isWishlisted = false,
  onWishlistToggle,
  onQuickBuy,
  onNotifyMe,
  className    = '',
}: ProductCardProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [wishlisted, setWishlisted]       = useState(isWishlisted)

  const activeColorName = colors[selectedIndex]?.name ?? colorName

  // Badge: caller's explicit text wins; otherwise derive from variant
  const badgeText  = badge !== undefined ? badge : VARIANT_BADGE[variant]
  const badgeStyle = VARIANT_BADGE_STYLE[variant]

  const isSale     = variant === 'sale' && !!salePrice
  const isNotifyMe = variant === 'notifyMe'

  function handleWishlist() {
    setWishlisted((w) => !w)
    onWishlistToggle?.()
  }

  // ── Price section ─────────────────────────────────────────────────────────
  //
  // Sale:      original price (neutral-500, + asterisk)  |  sale price (maroon)
  //            optional promo line (maroon, 14/16/0.28 px Regular)
  // Default / Final Sale / Notify Me: regular price (neutral-700)

  function PriceSection() {
    if (isSale) {
      return (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <p className="font-proxima font-normal text-base leading-5 tracking-[0.32px] capitalize text-neutral-500">
              {price}*
            </p>
            <p className="font-proxima font-normal text-base leading-5 tracking-[0.32px] capitalize text-maroon">
              {salePrice}
            </p>
          </div>
          {promoText && (
            <p className="font-proxima font-normal text-sm leading-4 tracking-[0.28px] capitalize text-maroon">
              {promoText}
            </p>
          )}
        </div>
      )
    }
    return (
      <p className="font-proxima font-normal text-base leading-5 tracking-[0.32px] capitalize text-neutral-700">
        {price}
      </p>
    )
  }

  return (
    // `group` enables group-hover for the Quick Shop fade-in on desktop
    <article className={`w-full font-proxima group${className ? ` ${className}` : ''}`}>

      {/* ── Image area ──────────────────────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden bg-neutral-400"
        style={{ aspectRatio: '321 / 381' }}
      >
        {imageSrc && (
          <img
            src={imageSrc}
            alt={imageAlt ?? title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Wishlist — top-right, 12 px inset */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center"
        >
          <HeartIcon filled={wishlisted} />
        </button>

        {/* ── CTA overlay — Quick Shop vs Notify Me ─────────────────────────
            Quick Shop:
              • Mobile/Tablet (< lg): hidden entirely (matches Figma mobile frame)
              • Desktop (≥ lg): hidden by default, fades in on card hover
              • 240×40 px, bg-white/60, centered, 80 px above image bottom
            Notify Me:
              • Always visible at all breakpoints
              • Same positioning as Quick Shop
              • Text: "Coming Soon: Notify Me"
        */}
        {isNotifyMe ? (
          <button
            type="button"
            onClick={onNotifyMe}
            className="
              absolute left-1/2 -translate-x-1/2
              flex items-center justify-center
              w-[240px] max-w-[calc(100%-24px)] h-[40px]
              bg-white/60
              font-proxima font-medium text-sm leading-4 tracking-[0.28px] capitalize
              text-blue-900 text-center
            "
            style={{ bottom: '80px' }}
          >
            Coming Soon: Notify Me
          </button>
        ) : (
          <button
            type="button"
            onClick={onQuickBuy}
            className="
              absolute left-1/2 -translate-x-1/2
              flex items-center justify-center
              w-[240px] max-w-[calc(100%-24px)] h-[40px]
              bg-white/60
              font-proxima font-medium text-sm leading-4 tracking-[0.28px] capitalize
              text-blue-900 text-center
              hidden lg:flex
              opacity-0 group-hover:opacity-100
              transition-opacity duration-200
            "
            style={{ bottom: '80px' }}
          >
            Quick Shop
          </button>
        )}

        {/* Badge — bottom-left, 10 px inset, 24 px tall
            ALL variants use bg-[#ececec] per Figma.
            Text colour: navy = Default/Notify Me; maroon = Sale/Final Sale.
        */}
        {badgeText && (
          <div
            className={`absolute bottom-[10px] left-[10px] z-10 h-6 flex items-center px-1 ${badgeStyle}`}
          >
            <span className="font-proxima font-semibold text-sm leading-4 tracking-[0.28px] capitalize whitespace-nowrap">
              {badgeText}
            </span>
          </div>
        )}
      </div>

      {/* ── Product info ────────────────────────────────────────────────────── */}
      <div className="w-full pt-2">

        {/* Title — Label/L_500: 16/20/0.32 px Medium, neutral-700 */}
        <p className="font-proxima font-medium text-base leading-5 tracking-[0.32px] capitalize text-neutral-700">
          {title}
        </p>

        <PriceSection />

        {/* Colour swatches
            Mobile/Tablet (< lg) : 36 px circles · 16 px gap · overflow-x-auto (no wrap)
            Desktop (≥ lg)       : 30 px circles ·  8 px gap · flex-wrap
        */}
        {colors.length > 0 && (
          <div className="flex flex-col gap-2 lg:gap-1 pt-2">

            {/* Colour name — Label/M_500: 14/16/0.28 px Medium, neutral-600 */}
            <p className="font-proxima font-medium text-sm leading-4 tracking-[0.28px] capitalize text-neutral-600">
              {activeColorName}
            </p>

            {/* Swatch strip */}
            <div className="flex flex-nowrap lg:flex-wrap overflow-x-auto lg:overflow-visible gap-x-4 lg:gap-x-2 pb-0.5 lg:pb-0" style={{ rowGap: '6.67px' }}>
              {colors.map((swatch, i) => {
                const isSelected = i === selectedIndex
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedIndex(i)}
                    aria-label={`Select color ${swatch.name}`}
                    aria-pressed={isSelected}
                    className="relative flex-shrink-0 w-9 h-9 lg:w-[30px] lg:h-[30px] rounded-full p-0 border-0 bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
                  >
                    <span
                      className="absolute rounded-full overflow-hidden"
                      style={{
                        inset: isSelected ? '10%' : '8.33%',
                        backgroundColor: swatch.imageUrl ? undefined : swatch.color,
                      }}
                    >
                      {swatch.imageUrl && (
                        <img src={swatch.imageUrl} alt="" className="w-full h-full object-cover" />
                      )}
                    </span>
                    {isSelected && (
                      <span className="absolute inset-0 rounded-full ring-[1.5px] ring-blue-900" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Price-date footnote — Label/XS_600: 10/12/0.2 px Semibold, neutral-600 */}
        {isSale && priceNote && (
          <p className="font-proxima font-semibold text-[10px] leading-3 tracking-[0.2px] capitalize text-neutral-600 pt-1">
            {priceNote}
          </p>
        )}

      </div>
    </article>
  )
}
