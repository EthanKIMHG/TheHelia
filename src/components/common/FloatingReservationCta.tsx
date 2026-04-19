'use client'

import clsx from 'clsx'
import { ArrowUpRight, CalendarDays } from 'lucide-react'

import { useThemeLocale } from '@/context/theme-locale-context'

import { TransitionLink } from './TransitionLink'

export function FloatingReservationCta(): React.JSX.Element {
  const { locale, theme } = useThemeLocale()
  const isDark = theme === 'dark'

  return (
    <div className="fixed bottom-6 right-4 z-30 md:bottom-10 md:right-10">
      <TransitionLink
        href={`/${locale}/reservation`}
        className={clsx(
          'group relative isolate flex items-center gap-3 overflow-hidden rounded-[1.9rem] border px-4 py-3 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1',
          isDark
            ? 'border-[#7f6b59]/55 bg-[#2f2824]/58 text-[#f6efe7] shadow-[0_22px_60px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.14)] hover:border-[#a8927d]/68 hover:bg-[#3a312b]/68 hover:shadow-[0_28px_72px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.18)]'
            : 'border-[#cfb9a0]/70 bg-[#efe3d1]/74 text-[#4a3b36] shadow-[0_22px_60px_rgba(106,82,60,0.18),inset_0_1px_0_rgba(255,255,255,0.55)] hover:border-[#b79877]/86 hover:bg-[#ead8c2]/82 hover:shadow-[0_28px_72px_rgba(106,82,60,0.22),inset_0_1px_0_rgba(255,255,255,0.62)]',
        )}
      >
        <span
          className={clsx(
            'pointer-events-none absolute inset-[1px] rounded-[calc(1.9rem-1px)] opacity-90',
            isDark
              ? 'bg-[linear-gradient(135deg,rgba(255,255,255,0.11),rgba(255,255,255,0.03)_42%,rgba(255,255,255,0.01)_65%,rgba(199,162,128,0.14))]'
              : 'bg-[linear-gradient(135deg,rgba(255,255,255,0.5),rgba(255,248,240,0.22)_42%,rgba(238,223,202,0.12)_65%,rgba(214,185,149,0.3))]',
          )}
        />
        <span
          className={clsx(
            'pointer-events-none absolute -left-10 top-0 h-full w-16 rotate-12 blur-2xl transition-transform duration-700 group-hover:translate-x-4',
            isDark ? 'bg-[#f0d5b0]/10' : 'bg-white/38',
          )}
        />
        <span
          className={clsx(
            'pointer-events-none absolute -right-6 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-110',
            isDark ? 'bg-[#caa57c]/18' : 'bg-[#f6e8d2]/70',
          )}
        />

        <span
          className={clsx(
            'relative z-10 flex h-11 w-11 items-center justify-center rounded-[1.15rem] border backdrop-blur-xl',
            isDark
              ? 'border-white/12 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]'
              : 'border-[#d4bda4]/65 bg-white/34 shadow-[inset_0_1px_0_rgba(255,255,255,0.52)]',
          )}
        >
          <CalendarDays
            className={clsx(
              'h-[18px] w-[18px]',
              isDark ? 'text-[#f4e9dc]' : 'text-[#6f5844]',
            )}
          />
        </span>

        <span className="relative z-10 flex min-w-0 flex-col text-left">
          <span
            className={clsx(
              'text-[10px] uppercase tracking-[0.26em]',
              isDark ? 'text-[#eadac8]/54' : 'text-[#8a715d]/72',
            )}
          >
            {locale === 'ko' ? 'Reservation' : 'Reserve'}
          </span>
          <span
            className={clsx(
              'text-sm font-semibold tracking-[0.08em] md:text-[15px]',
              isDark ? 'text-[#fbf6f0]' : 'text-[#4c3b31]',
            )}
          >
            {locale === 'ko' ? '예약하기' : 'Book Now'}
          </span>
        </span>

        <span
          className={clsx(
            'relative z-10 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-xl transition-transform duration-500 group-hover:translate-x-0.5',
            isDark
              ? 'border-white/14 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]'
              : 'border-[#cfb499]/60 bg-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.48)]',
          )}
        >
          <ArrowUpRight
            className={clsx(
              'h-4 w-4',
              isDark ? 'text-[#f5ede4]' : 'text-[#705741]',
            )}
          />
        </span>
      </TransitionLink>
    </div>
  )
}
