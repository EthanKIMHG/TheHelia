import type { Metadata } from 'next'

import { NewbornPageContent } from '@/components/pages/service/infant-room/NewbornPageContent'
import { SubPageTemplate } from '@/components/SubPageTemplate'
import { buildSubPageMetadata, normalizeLocale, type LocalePageProps } from '@/lib/seo'

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params

  return buildSubPageMetadata(normalizeLocale(locale), '/service/infant-room')
}

export default async function InfantRoomPage({
  params,
}: LocalePageProps): Promise<React.JSX.Element> {
  const { locale } = await params
  const normalizedLocale = normalizeLocale(locale)

  return (
    <SubPageTemplate path="/service/infant-room" localeOverride={normalizedLocale} fullWidth>
      <NewbornPageContent locale={normalizedLocale} />
    </SubPageTemplate>
  )
}
