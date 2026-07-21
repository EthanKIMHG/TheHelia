import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { GLASS_RADIUS, type GlassRadius } from './GlassCard'

type GlassIconButtonProps = {
  /** round → pill radius; square → medium radius. */
  shape?: 'round' | 'square'
  radius?: GlassRadius
  prominent?: boolean
  children?: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

/**
 * Round or square glass icon button — carousel arrows, menu toggles, FABs.
 * Press grows to 1.05 with a spring. Size via className (default h-11 w-11).
 */
export function GlassIconButton({
  shape = 'round',
  radius,
  prominent = false,
  type = 'button',
  className,
  style,
  children,
  ...rest
}: GlassIconButtonProps): React.JSX.Element {
  const resolvedRadius: GlassRadius = radius ?? (shape === 'round' ? 'pill' : 'md')
  const composedStyle: CSSProperties = { borderRadius: GLASS_RADIUS[resolvedRadius], ...style }
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-11 w-11 items-center justify-center text-foreground glass-press',
        prominent ? 'glass-prominent' : 'glass',
        className,
      )}
      style={composedStyle}
      {...rest}
    >
      {children}
    </button>
  )
}
