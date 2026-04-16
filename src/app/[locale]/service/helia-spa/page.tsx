import type { Metadata } from 'next'

import { SubPageTemplate } from '@/components/SubPageTemplate'
import { HeliaSpaPageContent } from '@/components/service/HeliaSpaPageContent'
import { buildSubPageMetadata, normalizeLocale, type LocalePageProps } from '@/lib/seo'

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params

  return buildSubPageMetadata(normalizeLocale(locale), '/service/helia-spa')
}

export default async function HeliaSpaPage({
  params,
}: LocalePageProps): Promise<React.JSX.Element> {
  const { locale } = await params
  const normalizedLocale = normalizeLocale(locale)

  return (
    <SubPageTemplate path="/service/helia-spa" localeOverride={normalizedLocale}>
      <HeliaSpaPageContent />
    </SubPageTemplate>
  )
}
