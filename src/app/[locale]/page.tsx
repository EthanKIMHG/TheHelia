import type { Metadata } from 'next'

import type { Locale } from '@/components/header/types'
import HomePageContent from '@/components/home/HomePageContent'
import {
  buildHomePageMetadata,
  normalizeLocale,
  type LocalePageProps,
} from '@/lib/seo'
import { buildLodgingBusinessStructuredData } from '@/lib/structured-data'

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params

  return buildHomePageMetadata(normalizeLocale(locale))
}

export default async function LocaleHomePage({
  params,
}: LocalePageProps): Promise<React.JSX.Element> {
  const { locale } = await params
  const normalizedLocale: Locale = normalizeLocale(locale)
  const lodgingBusinessSchema = buildLodgingBusinessStructuredData(normalizedLocale)

  return (
    <>
      <HomePageContent locale={normalizedLocale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(lodgingBusinessSchema),
        }}
      />
    </>
  )
}
