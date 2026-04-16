import type { Metadata } from 'next'

import { RoomSuiteShowcase } from '@/components/pages/room-suites/RoomSuiteShowcase'
import { RoomSuiteTemplate } from '@/components/RoomSuiteTemplate'
import { buildSubPageMetadata, normalizeLocale, type LocalePageProps } from '@/lib/seo'

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params

  return buildSubPageMetadata(normalizeLocale(locale), '/room-suites/vvip')
}

export default async function VvipSuitePage({
  params,
}: LocalePageProps): Promise<React.JSX.Element> {
  const { locale } = await params
  const normalizedLocale = normalizeLocale(locale)

  return (
    <RoomSuiteTemplate
        path="/room-suites/vvip"
        localeOverride={normalizedLocale}
        hrefPrefix={`/${normalizedLocale}`}
    >
      <RoomSuiteShowcase suiteId="vvip" locale={normalizedLocale} />
    </RoomSuiteTemplate>
  )
}
