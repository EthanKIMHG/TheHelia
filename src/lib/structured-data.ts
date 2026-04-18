import type { Locale } from '@/components/header/types'
import type { FaqItem } from '@/components/stories/faq-data'
import { SITE_IMAGE_URL, SITE_URL } from '@/lib/site'

function buildLocalizedAbsoluteUrl(locale: Locale, path: string = ''): string {
  const localizedPath =
    path === '/' || path === '' ? `/${locale}` : `/${locale}${path}`.replace(/\/{2,}/g, '/')

  return new URL(localizedPath, SITE_URL).toString()
}

function normalizeStructuredDataText(value: string): string {
  return value
    .split('\n')
    .map((line) => line.replace(/^∙\s?/, '').trim())
    .filter(Boolean)
    .join('\n')
}

function buildAbsoluteImageUrl(imageUrl: string): string {
  return new URL(imageUrl, SITE_URL).toString()
}

export function getLodgingBusinessStructuredDataId(locale: Locale): string {
  return `${buildLocalizedAbsoluteUrl(locale)}#lodging-business`
}

type WebPageStructuredDataInput = {
  path: string
  title: string
  description: string
  imageUrl: string
  imageAlt: string
  aboutId?: string
}

export function buildLodgingBusinessStructuredData(locale: Locale): Record<string, unknown> {
  const isKo = locale === 'ko'

  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': getLodgingBusinessStructuredDataId(locale),
    name: isKo ? '더 헬리아 산후조리원' : 'The Helia Postpartum Care Center',
    description: isKo
      ? '휴식과 회복, 그리고 가족의 시간을 담아내는 프리미엄 산후조리원'
      : 'A premium sanctuary curated for recovery, rest, and cherished family moments.',
    url: buildLocalizedAbsoluteUrl(locale),
    telephone: '+82-10-5077-3962',
    email: 'thesaintmom@naver.com',
    image: [SITE_IMAGE_URL],
    address: {
      '@type': 'PostalAddress',
      streetAddress: isKo
        ? '권선구 금곡로 197번길 18-39, 5,6층'
        : '18-39, Geumgok-ro 197beon-gil, Gwonseon-gu',
      addressLocality: isKo ? '수원시' : 'Suwon-si',
      addressRegion: isKo ? '경기도' : 'Gyeonggi-do',
      addressCountry: 'KR',
    },
  }
}

export function buildWebPageStructuredData(
  locale: Locale,
  {
    path,
    title,
    description,
    imageUrl,
    imageAlt,
    aboutId,
  }: WebPageStructuredDataInput,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: buildLocalizedAbsoluteUrl(locale, path),
    name: title,
    description,
    inLanguage: locale === 'ko' ? 'ko-KR' : 'en',
    ...(aboutId
      ? {
          about: {
            '@id': aboutId,
          },
        }
      : {}),
    primaryImageOfPage: {
      '@type': 'ImageObject',
      contentUrl: buildAbsoluteImageUrl(imageUrl),
      caption: imageAlt,
    },
  }
}

export function buildFaqPageStructuredData(
  locale: Locale,
  items: FaqItem[],
  path: string = '/stories/faq',
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: buildLocalizedAbsoluteUrl(locale, path),
    inLanguage: locale === 'ko' ? 'ko-KR' : 'en',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question[locale],
      acceptedAnswer: {
        '@type': 'Answer',
        text: normalizeStructuredDataText(item.answer[locale]),
      },
    })),
  }
}
