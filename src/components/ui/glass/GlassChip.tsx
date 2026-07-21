import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { GLASS_RADIUS } from './GlassCard'

type GlassChipProps = {
  as?: ElementType
  /** Sand-tinted glass instead of frosted white. */
  warm?: boolean
  /** Glass over photography / deep surfaces. */
  onDark?: boolean
  className?: string
  style?: CSSProperties
  children?: ReactNode
} & Omit<HTMLAttributes<HTMLElement>, 'color'>

/**
 * Pill-shaped glass chip — badges, eyebrow labels, tags, filters. Content
 * stays inline; keep copy terse.
 */
export function GlassChip({
  as: Tag = 'span',
  warm = false,
  onDark = false,
  className,
  style,
  children,
  ...rest
}: GlassChipProps): React.JSX.Element {
  const tone = onDark ? 'glass-on-dark' : warm ? 'glass-warm' : 'glass'
  return (
    <Tag
      className={cn('inline-flex items-center gap-2 px-3 py-1.5', tone, className)}
      style={{ borderRadius: GLASS_RADIUS.pill, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
