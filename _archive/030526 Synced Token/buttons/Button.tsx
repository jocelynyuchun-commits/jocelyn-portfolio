/**
 * UNTUCKit DLS 2026 — Button Component (Token-Synced)
 *
 * This component uses ONLY design tokens from tokens.css.
 * No hardcoded colors, spacing, or other visual values.
 *
 * Variants (from Figma node 4225:7875 "Buttons"):
 *   solid        — Solid Blue, light-mode primary
 *   outline      — Outlined Blue, light-mode secondary
 *   inverted     — White Solid, dark-mode primary
 *   outline-white — White Outlined, dark-mode secondary
 *
 * Sizes:
 *   sm   — 144 × 40 px
 *   md   — 172 × 48 px   [default]
 *   lg   — 366 × 48 px
 *   full — 100% × 48 px
 *
 * Token Reference:
 *   All visual values reference tokens.css Layer 3 (--button-*)
 *   See specs/components/button.md for full token mapping
 */
import { ButtonHTMLAttributes, forwardRef } from 'react'
import './button.css' // Import component-specific styles

export type ButtonVariant = 'solid' | 'outline' | 'inverted' | 'outline-white'
export type ButtonSize    = 'sm' | 'md' | 'lg' | 'full'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?:    ButtonSize
}

/** Minimal class joiner — no external deps needed */
function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ')
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'solid', size = 'md', className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'button',
        `button--${variant}`,
        `button--${size}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)

Button.displayName = 'Button'
