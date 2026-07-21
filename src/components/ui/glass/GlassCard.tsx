import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils'

export type GlassTone = 'light' | 'warm' | 'prominent' | 'dark'
export type GlassRadius =
  | 'none'
  | 'sm'
  | 'input'
  | 'card'
  | 'md'
  | 'lg'
  | 'group'
  | 'sheet'
  | 'pill'

const TONE_CLASS: Record<GlassTone, string> = {
  light: 'glass',
  warm: 'glass-warm',
  prominent: 'glass-prominent',
  dark: 'glass-on-dark',
}

export const GLASS_RADIUS: Record<GlassRadius, string> = {
  none: '0px',
  sm: 'var(--radius-sm)',
  input: 'var(--radius-input)',
  card: 'var(--radius-card)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  group: 'var(--radius-group)',
  sheet: 'var(--radius-sheet)',
  pill: 'var(--radius-pill)',
}

type GlassCardProps = {
  /** Element to render. Defaults to div. */
  as?: ElementType
  /** Glass material variant. */
  tone?: GlassTone
  /** Corner radius token. */
  radius?: GlassRadius
  /** Add a gentle hover lift (for clickable cards). */
  interactive?: boolean
  className?: string
  style?: CSSProperties
  children?: ReactNode
} & Omit<HTMLAttributes<HTMLElement>, 'color'>

/**
 * Base liquid-glass surface — frosted fill + specular + hairline + soft warm
 * shadow. The site's default content/chrome surface. Pair a radius token with
 * it and avoid layering a competing bg-* utility on the same element.
 */
export function GlassCard({
  as: Tag = 'div',
  tone = 'light',
  radius = 'card',
  interactive = false,
  className,
  style,
  children,
  ...rest
}: GlassCardProps): React.JSX.Element {
  return (
    <Tag
      className={cn(TONE_CLASS[tone], interactive && 'glass-interactive', className)}
      style={{ borderRadius: GLASS_RADIUS[radius], ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
