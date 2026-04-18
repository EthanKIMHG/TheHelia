import type { Metadata } from 'next'

import { LocationPageShowcase } from '@/components/pages/the-helia/location/LocationPageShowcase'
import { SubPageTemplate } from '@/components/SubPageTemplate'
import {
  buildSubPageMetadata,
  getSubPageSeoContent,
  normalizeLocale,
  type LocalePageProps,
} from '@/lib/seo'
import {
  buildLodgingBusinessStructuredData,
  buildWebPageStructuredData,
  getLodgingBusinessStructuredDataId,
} from '@/lib/structured-data'

const LOCATION_PAGE_PATH = '/the-helia/location'

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params

  return buildSubPageMetadata(normalizeLocale(locale), LOCATION_PAGE_PATH)
}

export default async function LocationPage({
  params,
}: LocalePageProps): Promise<React.JSX.Element> {
  const { locale } = await params
  const normalizedLocale = normalizeLocale(locale)
  const seoContent = getSubPageSeoContent(normalizedLocale, LOCATION_PAGE_PATH)
  const structuredData = [
    buildWebPageStructuredData(normalizedLocale, {
      path: LOCATION_PAGE_PATH,
      ...seoContent,
      aboutId: getLodgingBusinessStructuredDataId(normalizedLocale),
    }),
    buildLodgingBusinessStructuredData(normalizedLocale),
  ]

  return (
    <>
      <SubPageTemplate path={LOCATION_PAGE_PATH} localeOverride={normalizedLocale}>
        <LocationPageShowcase locale={normalizedLocale} />
      </SubPageTemplate>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </>
  )
}
