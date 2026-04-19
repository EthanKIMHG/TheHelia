'use client'

import { Footer } from '@/components/Footer'
import Header from '@/components/Header'
import PageTransition from '@/components/PageTransition'
import { FloatingReservationCta } from '@/components/common/FloatingReservationCta'
import { ThemeLocaleProvider } from '@/context/theme-locale-context'
import clsx from 'clsx'

import type { Locale } from './header/types'

interface LocaleShellProps {
  locale: Locale
  theme: 'light' | 'dark'
  children: React.ReactNode
}

export function LocaleShell({ locale, theme, children }: LocaleShellProps) {
  const fontClass = locale === 'ko' ? 'font-locale-ko' : 'font-locale-en'

  return (
    <ThemeLocaleProvider initialLocale={locale} initialTheme={theme}>
      <div className={clsx("min-h-dvh", fontClass)}>
        <Header />
        <main className="min-h-[calc(100dvh-4rem)] w-full transition-colors">
          <PageTransition>{children}</PageTransition>
        </main>
        <FloatingReservationCta />
        <Footer />
      </div>
    </ThemeLocaleProvider>
  )
}
