import type { Metadata } from 'next'

import { SubPageTemplate } from '@/components/SubPageTemplate'
import { GuestReviewsPageContent } from '@/components/stories/GuestReviewsPageContent'
import { buildSubPageMetadata, normalizeLocale, type LocalePageProps } from '@/lib/seo'

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params

  return buildSubPageMetadata(normalizeLocale(locale), '/stories/guest-reviews')
}

export default async function GuestReviewsPage({
  params,
}: LocalePageProps): Promise<React.JSX.Element> {
  const { locale } = await params
  const normalizedLocale = normalizeLocale(locale)

  return (
    <SubPageTemplate path="/stories/guest-reviews" localeOverride={normalizedLocale}>
      <GuestReviewsPageContent />
    </SubPageTemplate>
  )
}
