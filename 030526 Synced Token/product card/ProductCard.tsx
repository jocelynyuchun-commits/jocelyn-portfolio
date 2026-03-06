'use client'

/**
 * ProductCard Component (Token-Synced)
 * UNTUCKit DLS 2026 — AI-Governed Design System
 * 
 * ✅ 100% Token-Synced - Zero hardcoded values
 * ✅ Uses BEM class composition
 * ✅ All styling via product-card.css with CSS custom properties
 * 
 * Figma source: pTgtkyE8xnvM526Khy13Br
 * Variants: default | sale | finalSale | notifyMe
 */

import { useState } from 'react'
import './product-card.css'

// ─── Types ────────────────────────────────────────────────────────────────────

export type CardVariant = 'default' | 'sale' | 'finalSale' | 'notifyMe'

export interface ColorSwatch {
  name: string
  color: string
  imageUrl?: string
}

export interface ProductCardProps {
  variant?: CardVariant
  title?: string
  price?: string
  salePrice?: string
  promoText?: string
  priceNote?: string
  badge?: string | null
  colorName?: string
  colors?: ColorSwatch[]
  imageSrc?: string
  imageAlt?: string
  isWishlisted?: boolean
  onWishlistToggle?: () => void
  onQuickBuy?: () => void
  onNotifyMe?: () => void
  className?: string
}

// ─── Badge Configuration ──────────────────────────────────────────────────────

const VARIANT_BADGE: Record<CardVariant, string | null> = {
  default:   null,
  sale:      'Sale',
  finalSale: 'Final Sale',
  notifyMe:  null,
}

const VARIANT_BADGE_CLASS: Record<CardVariant, string> = {
  default:   'product-card__badge--default',
  sale:      'product-card__badge--sale',
  finalSale: 'product-card__badge--sale',
  notifyMe:  'product-card__badge--default',
}

// ─── Heart Icon ───────────────────────────────────────────────────────────────

function HeartIcon({ filled }: { filled: boolean }) {
  const className = filled 
    ? 'product-card__heart-icon product-card__heart-icon--filled'
    : 'product-card__heart-icon product-card__heart-icon--outline'
  
  return (
    <svg
      className={className}
      viewBox="0 0 20 18"
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

  // Badge configuration
  const badgeText  = badge !== undefined ? badge : VARIANT_BADGE[variant]
  const badgeClass = VARIANT_BADGE_CLASS[variant]

  const isSale     = variant === 'sale' && !!salePrice
  const isNotifyMe = variant === 'notifyMe'

  function handleWishlist() {
    setWishlisted((w) => !w)
    onWishlistToggle?.()
  }

  return (
    <article className={`product-card${className ? ` ${className}` : ''}`}>
      
      {/* ── Image Container ──────────────────────────────────────────────── */}
      <div className="product-card__image-container">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={imageAlt ?? title}
            className="product-card__image"
          />
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="product-card__wishlist"
        >
          <HeartIcon filled={wishlisted} />
        </button>

        {/* CTA Overlay: Quick Shop or Notify Me */}
        {isNotifyMe ? (
          <button
            type="button"
            onClick={onNotifyMe}
            className="product-card__cta product-card__cta--notify-me"
          >
            Coming Soon: Notify Me
          </button>
        ) : (
          <button
            type="button"
            onClick={onQuickBuy}
            className="product-card__cta product-card__cta--quick-shop"
          >
            Quick Shop
          </button>
        )}

        {/* Badge */}
        {badgeText && (
          <div className={`product-card__badge ${badgeClass}`}>
            <span>{badgeText}</span>
          </div>
        )}
      </div>

      {/* ── Product Info ─────────────────────────────────────────────────── */}
      <div className="product-card__info">
        
        {/* Title */}
        <p className="product-card__title">{title}</p>

        {/* Pricing */}
        {isSale ? (
          <div className="product-card__price-section">
            <div className="product-card__price-row">
              <p className="product-card__price product-card__price--original">
                {price}*
              </p>
              <p className="product-card__price product-card__price--sale">
                {salePrice}
              </p>
            </div>
            {promoText && (
              <p className="product-card__promo">{promoText}</p>
            )}
          </div>
        ) : (
          <p className="product-card__price">{price}</p>
        )}

        {/* Color Swatches */}
        {colors.length > 0 && (
          <div className="product-card__swatches">
            <p className="product-card__color-name">{activeColorName}</p>
            
            <div className="product-card__swatch-strip">
              {colors.map((swatch, i) => {
                const isSelected = i === selectedIndex
                const swatchClass = isSelected 
                  ? 'product-card__swatch product-card__swatch--selected'
                  : 'product-card__swatch'
                
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedIndex(i)}
                    aria-label={`Select color ${swatch.name}`}
                    aria-pressed={isSelected}
                    className={swatchClass}
                  >
                    <span
                      className="product-card__swatch-color"
                      style={{
                        backgroundColor: swatch.imageUrl ? undefined : swatch.color,
                      }}
                    >
                      {swatch.imageUrl && (
                        <img 
                          src={swatch.imageUrl} 
                          alt="" 
                          className="product-card__swatch-image"
                        />
                      )}
                    </span>
                    {isSelected && (
                      <span className="product-card__swatch-ring" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Footnote */}
        {isSale && priceNote && (
          <p className="product-card__footnote">{priceNote}</p>
        )}
      </div>
    </article>
  )
}
