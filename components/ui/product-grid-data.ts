/**
 * UNTUCKit DLS 2026 — ProductGrid sample data & filter config
 *
 * Kept in a plain (non-'use client') module so it can be imported by both
 * Server Components (e.g. demo pages) and the 'use client' ProductGrid.
 */

import type { GridProduct, FilterCategory } from './ProductGrid'

// ─── Default filter tabs ──────────────────────────────────────────────────────

export const DEFAULT_FILTERS: FilterCategory[] = [
  { id: 'new-arrivals', label: 'New Arrivals' },
  { id: 'wrinkle-free', label: 'Wrinkle-Free Collection' },
  { id: 'best-sellers', label: 'Best Sellers' },
  { id: 'sale',         label: 'Sale' },
]

// ─── Sample product data per category ────────────────────────────────────────

export const PRODUCTS_BY_CATEGORY: Record<string, GridProduct[]> = {
  'new-arrivals': [
    { id: 1,  accentColor: '#1c3d5a', title: 'New Slim-Fit Oxford',        price: '$89',  colors: [{ name: 'Navy',     color: '#1c3d5a' }, { name: 'Sky',     color: '#90A5C3' }, { name: 'White',    color: '#f5f5f5' }] },
    { id: 2,  accentColor: '#1c3d5a', title: 'New Classic Polo',           price: '$79',  colors: [{ name: 'Navy',     color: '#1c3d5a' }, { name: 'Green',   color: '#2d6a4f' }] },
    { id: 3,  accentColor: '#1c3d5a', title: 'New Stretch Performance',    price: '$95',  colors: [{ name: 'Cobalt',   color: '#245090' }, { name: 'Slate',   color: '#4a5568' }, { name: 'White',    color: '#f5f5f5' }, { name: 'Navy', color: '#1c3d5a' }] },
    { id: 4,  accentColor: '#1c3d5a', title: 'New Weekend Linen',          price: '$105', colors: [{ name: 'Sand',     color: '#c9b99a' }, { name: 'White',   color: '#f5f5f5' }] },
    { id: 5,  accentColor: '#1c3d5a', title: 'New Knit Quarter-Zip',       price: '$120', colors: [{ name: 'Navy',     color: '#1c3d5a' }, { name: 'Grey',    color: '#686868' }] },
    { id: 6,  accentColor: '#1c3d5a', title: 'New Short-Sleeve Henley',    price: '$69',  colors: [{ name: 'White',    color: '#f5f5f5' }, { name: 'Heather', color: '#9B9B9B' }, { name: 'Navy',     color: '#1c3d5a' }] },
    { id: 7,  accentColor: '#1c3d5a', title: 'New Signature Dress Shirt',  price: '$115', colors: [{ name: 'White',    color: '#f5f5f5' }, { name: 'Blue',    color: '#245090' }] },
    { id: 8,  accentColor: '#1c3d5a', title: 'New Sport Fleece Hoodie',    price: '$99',  colors: [{ name: 'Charcoal', color: '#4A4A4A' }, { name: 'Navy',    color: '#1c3d5a' }] },
  ],
  'wrinkle-free': [
    { id: 9,  accentColor: '#059669', title: 'Wrinkle-Free Oxford',        price: '$99',  colors: [{ name: 'White', color: '#f5f5f5' }, { name: 'Blue',  color: '#2F71D4' }, { name: 'Sage',  color: '#4a7c59' }] },
    { id: 10, accentColor: '#059669', title: 'Easy-Care Slim Fit',         price: '$89',  colors: [{ name: 'Sky',   color: '#90A5C3' }, { name: 'White', color: '#f5f5f5' }] },
    { id: 11, accentColor: '#059669', title: 'No-Iron Sport Shirt',        price: '$105', colors: [{ name: 'Sage',  color: '#4a7c59' }, { name: 'Navy',  color: '#1c3d5a' }, { name: 'Grey',  color: '#686868' }] },
    { id: 12, accentColor: '#059669', title: 'Wrinkle-Free Poplin',        price: '$95',  colors: [{ name: 'White', color: '#f5f5f5' }, { name: 'Mint',  color: '#a7f3d0' }] },
    { id: 13, accentColor: '#059669', title: 'Travel Performance Shirt',   price: '$115', colors: [{ name: 'Grey',  color: '#686868' }, { name: 'Navy',  color: '#1c3d5a' }, { name: 'Olive', color: '#6b7c3f' }] },
    { id: 14, accentColor: '#059669', title: 'Easy-Care Dress Shirt',      price: '$109', colors: [{ name: 'White', color: '#f5f5f5' }, { name: 'Blue',  color: '#2F71D4' }] },
    { id: 15, accentColor: '#059669', title: 'Wrinkle-Free Weekend Shirt', price: '$85',  colors: [{ name: 'Sage',  color: '#4a7c59' }, { name: 'Tan',   color: '#c9b99a' }, { name: 'White', color: '#f5f5f5' }] },
    { id: 16, accentColor: '#059669', title: 'Wrinkle-Free Piqué Polo',    price: '$79',  colors: [{ name: 'Navy',  color: '#1c3d5a' }, { name: 'Green', color: '#059669' }, { name: 'White', color: '#f5f5f5' }] },
  ],
  'best-sellers': [
    { id: 17, accentColor: '#7C3AED', title: 'Classic Favorite Oxford',    price: '$89',  colors: [{ name: 'White',    color: '#f5f5f5' }, { name: 'Blue',     color: '#2F71D4' }, { name: 'Navy',     color: '#1c3d5a' }] },
    { id: 18, accentColor: '#7C3AED', title: 'Top-Rated Slim Fit',         price: '$95',  colors: [{ name: 'Navy',     color: '#1c3d5a' }, { name: 'Charcoal', color: '#4A4A4A' }] },
    { id: 19, accentColor: '#7C3AED', title: '#1 Stretch Performance',     price: '$99',  colors: [{ name: 'Grey',     color: '#686868' }, { name: 'Navy',     color: '#1c3d5a' }, { name: 'Black',    color: '#181818' }] },
    { id: 20, accentColor: '#7C3AED', title: 'Fan-Favorite Weekend Shirt', price: '$85',  colors: [{ name: 'Cobalt',   color: '#245090' }, { name: 'White',    color: '#f5f5f5' }] },
    { id: 21, accentColor: '#7C3AED', title: 'Bestselling Polo',           price: '$79',  colors: [{ name: 'Navy',     color: '#1c3d5a' }, { name: 'White',    color: '#f5f5f5' }, { name: 'Green',    color: '#059669' }] },
    { id: 22, accentColor: '#7C3AED', title: 'Customer-Favorite Linen',   price: '$105', colors: [{ name: 'White',    color: '#f5f5f5' }, { name: 'Sage',     color: '#4a7c59' }] },
    { id: 23, accentColor: '#7C3AED', title: 'Top-Rated Dress Shirt',      price: '$115', colors: [{ name: 'White',    color: '#f5f5f5' }, { name: 'Blue',     color: '#2F71D4' }] },
    { id: 24, accentColor: '#7C3AED', title: 'Most-Loved Knit Pullover',   price: '$125', colors: [{ name: 'Navy',     color: '#1c3d5a' }, { name: 'Grey',     color: '#686868' }, { name: 'Burgundy', color: '#8E2231' }] },
  ],
  sale: [
    { id: 25, accentColor: '#DC2626', variant: 'sale',      title: 'Classic Oxford — Sale',    price: '$89',  salePrice: '$49',  promoText: 'Extra 20% Off With Code SAVE', priceNote: '*Price On 2/1/26', colors: [{ name: 'White',    color: '#f5f5f5' }, { name: 'Blue',    color: '#2F71D4' }] },
    { id: 26, accentColor: '#DC2626', variant: 'finalSale', title: 'Final Sale Slim Fit',      price: '$95',                                                                                                          colors: [{ name: 'Navy',     color: '#1c3d5a' }] },
    { id: 27, accentColor: '#DC2626', variant: 'sale',      title: 'Performance Shirt — Sale', price: '$99',  salePrice: '$59',  promoText: 'Extra 20% Off With Code SAVE', priceNote: '*Price On 2/1/26', colors: [{ name: 'Grey',     color: '#686868' }, { name: 'Navy',    color: '#1c3d5a' }] },
    { id: 28, accentColor: '#DC2626', variant: 'finalSale', title: 'Final Sale Weekend Shirt', price: '$85',                                                                                                          colors: [{ name: 'Cobalt',   color: '#245090' }] },
    { id: 29, accentColor: '#DC2626', variant: 'sale',      title: 'Polo — Clearance',         price: '$79',  salePrice: '$39',  promoText: 'Extra 30% Off With Code GIFT', priceNote: '*Price On 2/1/26',  colors: [{ name: 'White',    color: '#f5f5f5' }, { name: 'Navy',    color: '#1c3d5a' }] },
    { id: 30, accentColor: '#DC2626', variant: 'finalSale', title: 'Final Sale Linen Shirt',   price: '$105',                                                                                                         colors: [{ name: 'White',    color: '#f5f5f5' }] },
    { id: 31, accentColor: '#DC2626', variant: 'sale',      title: 'Dress Shirt — On Sale',    price: '$115', salePrice: '$69',  promoText: 'Extra 20% Off With Code SAVE', priceNote: '*Price On 2/1/26', colors: [{ name: 'White',    color: '#f5f5f5' }, { name: 'Blue',    color: '#2F71D4' }] },
    { id: 32, accentColor: '#DC2626', variant: 'finalSale', title: 'Final Sale Knit Pullover', price: '$125',                                                                                                         colors: [{ name: 'Burgundy', color: '#8E2231' }] },
  ],
}
