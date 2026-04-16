import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

import { LocaleShell } from '@/components/LocaleShell'
import { GlobalPageLoader } from '@/components/common/GlobalPageLoader'
import { PageLoadProvider } from '@/components/common/PageLoadContext'
import type { Locale } from '@/components/header/types'
import { SITE_URL } from '@/lib/site'

const SUPPORTED_LOCALES: Locale[] = ['ko', 'en']

type LocaleLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params

  const isKo = locale === 'ko'
  const title = isKo
    ? '더 헬리아 산후조리원 | 프리미엄 산후조리원'
    : 'The Helia | Premium Postpartum Care Center'
  const description = isKo
    ? '더 헬리아 산후조리원은 산모와 아기를 위한 최상의 1:1 케어와 고품격 시설을 제공하는 프리미엄 산후조리원입니다.'
    : 'The Helia provides premium 1:1 care and high-end facilities for mothers and babies.'

  return {
    title: {
      template: `%s | ${isKo ? '더 헬리아 산후조리원' : 'The Helia'}`,
      default: title,
    },
    description,
    keywords: isKo
      ? ['산후조리원', '프리미엄 산후조리원', '더 헬리아 산후조리원', '더헬리아', '산모 케어', '신생아 케어']
      : ['Postpartum Care Center', 'Korea Postpartum Care', 'The Helia', 'Newborn Care'],
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      siteName: isKo ? '더 헬리아 산후조리원' : 'The Helia Postpartum Care Center',
      locale: locale,
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'ko': '/ko',
        'en': '/en',
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps): Promise<React.JSX.Element> {
  const { locale: localeParam } = await params
  if (!SUPPORTED_LOCALES.includes(localeParam as Locale)) {
    notFound()
  }

  const locale = localeParam as Locale
  const themeCookie = (await cookies()).get('theme')
  const theme =
    themeCookie && (themeCookie.value === 'dark' || themeCookie.value === 'light')
      ? themeCookie.value
      : 'light'

  return (
    <PageLoadProvider>
      <LocaleShell locale={locale} theme={theme}>
        {children}
      </LocaleShell>
      <GlobalPageLoader />
    </PageLoadProvider>
  )
}
