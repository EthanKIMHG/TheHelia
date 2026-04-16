import type { Metadata } from 'next'

import { PricePageContent } from '@/components/pages/reservation/price/PricePageContent'
import { SubPageTemplate } from '@/components/SubPageTemplate'
import { buildSubPageMetadata, normalizeLocale, type LocalePageProps } from '@/lib/seo'

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params

  return buildSubPageMetadata(normalizeLocale(locale), '/reservation/price')
}

export default async function PricePage({ params }: LocalePageProps): Promise<React.JSX.Element> {
  const { locale } = await params
  const normalizedLocale = normalizeLocale(locale)

  return (
    <SubPageTemplate path="/reservation/price" localeOverride={normalizedLocale}>
      <PricePageContent locale={normalizedLocale} />
    </SubPageTemplate>
  )
}
