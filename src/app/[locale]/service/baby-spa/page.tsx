import type { Metadata } from 'next'

import { SubPageTemplate } from '@/components/SubPageTemplate'
import { BabySpaPageContent } from '@/components/service/BabySpaPageContent'
import { blobUrl } from '@/lib/media'
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
    <SubPageTemplate
      path="/service/baby-spa"
      localeOverride={normalizedLocale}
      heroVariant="cinematic"
      heroImageSrc={blobUrl('img/subhero/us/baby-spa.jpg')}
      heroImageAlt={
        normalizedLocale === 'ko'
          ? '따뜻한 물에서 편안하게 목욕을 즐기는 아기'
          : 'A baby enjoying a warm, gentle bath'
      }
    >
      <BabySpaPageContent />
    </SubPageTemplate>
  )
}
