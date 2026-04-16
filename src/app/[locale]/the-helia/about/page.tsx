import type { Metadata } from 'next'

import { AboutPageShowcase } from '@/components/pages/the-helia/about/AboutPageShowcase'
import { SubPageTemplate } from '@/components/SubPageTemplate'
import { buildSubPageMetadata, normalizeLocale, type LocalePageProps } from '@/lib/seo'

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params

  return buildSubPageMetadata(normalizeLocale(locale), '/the-helia/about')
}

export default async function AboutPage({ params }: LocalePageProps): Promise<React.JSX.Element> {
  const { locale } = await params
  const normalizedLocale = normalizeLocale(locale)

  return (
    <SubPageTemplate path="/the-helia/about" localeOverride={normalizedLocale}>
      <AboutPageShowcase locale={normalizedLocale} />
    </SubPageTemplate>
  )
}
