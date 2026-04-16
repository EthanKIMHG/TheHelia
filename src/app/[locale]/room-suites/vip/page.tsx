import type { Metadata } from 'next'

import { RoomSuiteShowcase } from '@/components/pages/room-suites/RoomSuiteShowcase'
import { RoomSuiteTemplate } from '@/components/RoomSuiteTemplate'
import { buildSubPageMetadata, normalizeLocale, type LocalePageProps } from '@/lib/seo'

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params

  return buildSubPageMetadata(normalizeLocale(locale), '/room-suites/vip')
}

export default async function VipSuitePage({ params }: LocalePageProps): Promise<React.JSX.Element> {
  const { locale } = await params
  const normalizedLocale = normalizeLocale(locale)

  return (
    <RoomSuiteTemplate
        path="/room-suites/vip"
        localeOverride={normalizedLocale}
        hrefPrefix={`/${normalizedLocale}`}
    >
      <RoomSuiteShowcase suiteId="vip" locale={normalizedLocale} />
    </RoomSuiteTemplate>
  )
}
