/**
 * UNTUCKit DLS 2026 — Button Component
 *
 * Variants (from Figma node 4225:7875 "Buttons"):
 *   solid        — Solid Blue, light-mode primary (bg #142D51, text white)
 *   outline      — Outlined Blue, light-mode secondary (border #142D51, text #142D51)
 *   inverted     — White Solid, dark-mode primary (bg white, text #142D51)
 *   outline-white — White Outlined, dark-mode secondary (border white, text white)
 *
 * Sizes (from Semantic tokens Buttons/Width & Buttons/Height):
 *   sm   — 144 × 40 px  (px-4)
 *   md   — 172 × 48 px  (px-5)   [default]
 *   lg   — 366 × 48 px  (px-5)
 *   full — 100% × 48 px (px-5)
 *
 * Typography (2026_TypeStyle/Label/L_500):
 *   Proxima Nova Medium (500), 16px/20px, tracking 0.02em, capitalize
 *
 * Token mapping to Semantic.json:
 *   Solid Default    → Buttons/Solid/Default      #142D51
 *   Solid Hover      → Buttons/Solid/Hover        #245090
 *   Solid Active     → Buttons/Solid/Active-Pressed #2F71D4
 *   Solid Focus-Fill → Buttons/Solid/Focus-Fill   #E4EAF4
 *   Solid Focus-Ring → Buttons/Solid/Focus-Ring   #90A5C3
 *   Solid Disabled   → Buttons/Solid/Disabled     #C4C4C4
 */
import { ButtonHTMLAttributes, forwardRef } from 'react'

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

// ── Shared base ──────────────────────────────────────────────────────────────
// Buttons/Radius/Default = 4px  |  Buttons/Border Width/Default = 1px
// Buttons/Font-Family = Proxima Nova  |  Buttons/Font Size = 16  |  Weight = 500
const BASE = [
  'inline-flex items-center justify-center whitespace-nowrap select-none',
  'font-proxima font-medium text-base leading-5 tracking-btn capitalize',
  'rounded-dls border transition-colors duration-150 ease-in-out',
  'outline-none focus-visible:outline-none',
  'cursor-pointer disabled:cursor-not-allowed',
].join(' ')

// ── Sizes ─────────────────────────────────────────────────────────────────────
// Buttons/Width: sm=144, md=172, lg=366  |  Buttons/Height: sm=40, md=48, lg=48
const SIZES: Record<ButtonSize, string> = {
  sm:   'w-[144px] h-[40px] px-4',
  md:   'w-[172px] h-[48px] px-5',
  lg:   'w-[366px] h-[48px] px-5',
  full: 'w-full    h-[48px] px-5',
}

// ── Variants ──────────────────────────────────────────────────────────────────
// Tailwind's CSS order ensures disabled:* overrides hover:* / active:*
const VARIANTS: Record<ButtonVariant, string> = {

  // ── Solid (Light Mode Primary) ────────────────────────────────────────────
  solid: cn(
    /* default  */ 'bg-blue-900 border-blue-900 text-white',
    /* hover    */ 'hover:bg-blue-700 hover:border-blue-700',
    /* active   */ 'active:bg-blue-500 active:border-blue-500',
    /* focus    */ 'focus-visible:bg-blue-100 focus-visible:border-blue-900',
    /*          */ 'focus-visible:text-blue-900 focus-visible:shadow-focus',
    /* disabled */ 'disabled:bg-neutral-300 disabled:border-neutral-300 disabled:text-neutral-400',
  ),

  // ── Outline Blue (Light Mode Secondary) ──────────────────────────────────
  outline: cn(
    /* default  */ 'bg-transparent border-blue-900 text-blue-900',
    /* hover    */ 'hover:border-blue-700 hover:text-blue-700',
    /* active   */ 'active:border-blue-500 active:text-blue-500',
    /* focus    */ 'focus-visible:border-blue-900 focus-visible:text-blue-900 focus-visible:shadow-focus',
    /* disabled */ 'disabled:border-neutral-300 disabled:text-neutral-300',
  ),

  // ── Inverted / White Solid (Dark Mode Primary) ────────────────────────────
  inverted: cn(
    /* default  */ 'bg-white border-white text-blue-900',
    /* hover    */ 'hover:bg-blue-100 hover:border-blue-100',
    /* active   */ 'active:bg-blue-200 active:border-blue-200',
    /* focus    */ 'focus-visible:bg-white focus-visible:border-white focus-visible:shadow-focus',
    /* disabled */ 'disabled:bg-neutral-300 disabled:border-neutral-300 disabled:text-neutral-400',
  ),

  // ── Outline White (Dark Mode Secondary) ──────────────────────────────────
  'outline-white': cn(
    /* default  */ 'bg-transparent border-white text-white',
    /* hover    */ 'hover:border-white/60 hover:text-white/60',
    /* active   */ 'active:border-blue-100 active:text-blue-100',
    /* focus    */ 'focus-visible:border-white focus-visible:text-white focus-visible:shadow-focus',
    /* disabled */ 'disabled:border-white/30 disabled:text-white/30',
  ),
}

// ── Component ─────────────────────────────────────────────────────────────────
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'solid', size = 'md', className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(BASE, SIZES[size], VARIANTS[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
)

Button.displayName = 'Button'
