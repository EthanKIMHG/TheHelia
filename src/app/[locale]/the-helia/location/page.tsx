import type { Metadata } from 'next'

import { LocationPageShowcase } from '@/components/pages/the-helia/location/LocationPageShowcase'
import { SubPageTemplate } from '@/components/SubPageTemplate'
import { buildSubPageMetadata, normalizeLocale, type LocalePageProps } from '@/lib/seo'

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params

  return buildSubPageMetadata(normalizeLocale(locale), '/the-helia/location')
}

export default async function LocationPage({
  params,
}: LocalePageProps): Promise<React.JSX.Element> {
  const { locale } = await params
  const normalizedLocale = normalizeLocale(locale)

  return (
    <SubPageTemplate path="/the-helia/location" localeOverride={normalizedLocale}>
      <LocationPageShowcase locale={normalizedLocale} />
    </SubPageTemplate>
  )
}
