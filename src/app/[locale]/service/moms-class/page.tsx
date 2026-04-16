import type { Metadata } from 'next'

import { SubPageTemplate } from '@/components/SubPageTemplate'
import { MomsClassPageContent } from '@/components/service/MomsClassPageContent'
import { buildSubPageMetadata, normalizeLocale, type LocalePageProps } from '@/lib/seo'

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params

  return buildSubPageMetadata(normalizeLocale(locale), '/service/moms-class')
}

export default async function MomsClassPage({
  params,
}: LocalePageProps): Promise<React.JSX.Element> {
  const { locale } = await params
  const normalizedLocale = normalizeLocale(locale)

  return (
    // fullWidth is enabled to allow custom spacing in the content components
    <SubPageTemplate path="/service/moms-class" localeOverride={normalizedLocale} fullWidth>
      <MomsClassPageContent locale={normalizedLocale} />
    </SubPageTemplate>
  )
}
