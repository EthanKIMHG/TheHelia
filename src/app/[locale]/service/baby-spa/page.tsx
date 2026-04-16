import type { Metadata } from 'next'

import { SubPageTemplate } from '@/components/SubPageTemplate'
import { BabySpaPageContent } from '@/components/service/BabySpaPageContent'
import { buildSubPageMetadata, normalizeLocale, type LocalePageProps } from '@/lib/seo'

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params

  return buildSubPageMetadata(normalizeLocale(locale), '/service/baby-spa')
}

export default async function BabySpaPage({
  params,
}: LocalePageProps): Promise<React.JSX.Element> {
  const { locale } = await params
  const normalizedLocale = normalizeLocale(locale)

  return (
    <SubPageTemplate path="/service/baby-spa" localeOverride={normalizedLocale}>
      <BabySpaPageContent />
    </SubPageTemplate>
  )
}
