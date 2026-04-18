import type { Metadata } from 'next'

import { AboutPageShowcase } from '@/components/pages/the-helia/about/AboutPageShowcase'
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

const ABOUT_PAGE_PATH = '/the-helia/about'

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params

  return buildSubPageMetadata(normalizeLocale(locale), ABOUT_PAGE_PATH)
}

export default async function AboutPage({ params }: LocalePageProps): Promise<React.JSX.Element> {
  const { locale } = await params
  const normalizedLocale = normalizeLocale(locale)
  const seoContent = getSubPageSeoContent(normalizedLocale, ABOUT_PAGE_PATH)
  const structuredData = [
    buildWebPageStructuredData(normalizedLocale, {
      path: ABOUT_PAGE_PATH,
      ...seoContent,
      aboutId: getLodgingBusinessStructuredDataId(normalizedLocale),
    }),
    buildLodgingBusinessStructuredData(normalizedLocale),
  ]

  return (
    <>
      <SubPageTemplate path={ABOUT_PAGE_PATH} localeOverride={normalizedLocale}>
        <AboutPageShowcase locale={normalizedLocale} />
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
