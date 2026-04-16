import type { Metadata } from 'next'

import { SubPageTemplate } from '@/components/SubPageTemplate'
import { FAQ_ITEMS } from '@/components/stories/faq-data'
import { FaqPageContent } from '@/components/stories/FaqPageContent'
import { buildSubPageMetadata, normalizeLocale, type LocalePageProps } from '@/lib/seo'
import { buildFaqPageStructuredData } from '@/lib/structured-data'

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params

  return buildSubPageMetadata(normalizeLocale(locale), '/stories/faq')
}

export default async function FaqPage({ params }: LocalePageProps): Promise<React.JSX.Element> {
  const { locale } = await params
  const normalizedLocale = normalizeLocale(locale)
  const faqStructuredData = buildFaqPageStructuredData(normalizedLocale, FAQ_ITEMS)

  return (
    <>
      <SubPageTemplate path="/stories/faq" localeOverride={normalizedLocale}>
        <FaqPageContent />
      </SubPageTemplate>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
    </>
  )
}
