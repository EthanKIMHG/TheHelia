'use client'

import { ArrowUpRight, CalendarDays } from 'lucide-react'

import { useThemeLocale } from '@/context/theme-locale-context'

import { TransitionLink } from './TransitionLink'

export function FloatingReservationCta(): React.JSX.Element {
  const { locale } = useThemeLocale()

  return (
    <div className="fixed bottom-6 right-4 z-30 md:bottom-10 md:right-10">
      <TransitionLink
        href={`/${locale}/reservation`}
        className="group flex items-center gap-3 bg-foreground px-4 py-3 text-background transition-colors duration-500 hover:bg-foreground/90 md:gap-4 md:px-6 md:py-4"
      >
        <CalendarDays
          className="h-4 w-4 shrink-0 text-background/80 md:h-5 md:w-5"
          strokeWidth={1.5}
        />

        <span className="flex min-w-0 flex-col text-left">
          <span className="hidden font-sans text-[9px] font-semibold uppercase tracking-[0.3em] text-background/60 md:block">
            {locale === 'ko' ? 'Reservation' : 'Reserve'}
          </span>
          <span className="font-sans text-sm font-semibold tracking-[0.08em] text-background md:mt-0.5 md:text-[15px]">
            {locale === 'ko' ? '예약하기' : 'Book Now'}
          </span>
        </span>

        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-background/80 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.5}
        />
      </TransitionLink>
    </div>
  )
}
