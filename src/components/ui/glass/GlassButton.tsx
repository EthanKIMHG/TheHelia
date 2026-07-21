import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { GLASS_RADIUS, type GlassRadius } from './GlassCard'

type GlassButtonVariant = 'glass' | 'prominent' | 'solid'

type GlassButtonProps = {
  variant?: GlassButtonVariant
  radius?: GlassRadius
  children?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

const VARIANT_CLASS: Record<GlassButtonVariant, string> = {
  glass: 'glass glass-press text-foreground',
  prominent: 'glass-prominent glass-press text-foreground',
  // Solid espresso — the dominant conversion action (keeps existing hierarchy)
  solid: 'press-grow bg-foreground text-background shadow-[var(--shadow-glass-strong)] hover:bg-foreground/90',
}

/**
 * Glass control button. Press grows to 1.05 with a spring (source jelly
 * physics). Renders a real <button>; for internal links apply the glass
 * utility classes to the link element directly instead.
 */
export function GlassButton({
  variant = 'glass',
  radius = 'pill',
  type = 'button',
  className,
  style,
  children,
  ...rest
}: GlassButtonProps): React.JSX.Element {
  const composedStyle: CSSProperties = { borderRadius: GLASS_RADIUS[radius], ...style }
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 px-5 py-3 font-sans text-sm font-semibold tracking-[0.08em] transition-colors',
        VARIANT_CLASS[variant],
        className,
      )}
      style={composedStyle}
      {...rest}
    >
      {children}
    </button>
  )
}
