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
    <SubPageTemplate
      path="/service/helia-spa"
      localeOverride={normalizedLocale}
      heroVariant="cinematic"
      heroImageSrc="/img/subhero/us/helia-spa.jpg"
      heroImageAlt={
        normalizedLocale === 'ko'
          ? '헬리아 스파의 따뜻하고 고요한 프라이빗 라운지'
          : 'The warm, serene private lounge at Helia Spa'
      }
    >
      <HeliaSpaPageContent />
    </SubPageTemplate>
  )
}
