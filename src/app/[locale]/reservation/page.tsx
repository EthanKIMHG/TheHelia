import type { Metadata } from 'next'

import { ReservationPageContent } from '@/components/pages/reservation/ReservationPageContent'
import { SubPageTemplate } from '@/components/SubPageTemplate'
import { buildSubPageMetadata, normalizeLocale, type LocalePageProps } from '@/lib/seo'

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params

  return buildSubPageMetadata(normalizeLocale(locale), '/reservation')
}

export default async function ReservationPage({ params }: LocalePageProps): Promise<React.JSX.Element> {
  const { locale } = await params
  const normalizedLocale = normalizeLocale(locale)

  return (
    <SubPageTemplate path="/reservation" localeOverride={normalizedLocale}>
      <ReservationPageContent locale={normalizedLocale} />
    </SubPageTemplate>
  )
}
