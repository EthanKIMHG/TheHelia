import type { Metadata } from 'next'

import { getSubPageContent } from '@/components/header/nav-data'
import type { Locale } from '@/components/header/types'
import { blobUrl } from '@/lib/media'
import { SITE_IMAGE_URL } from '@/lib/site'

export type LocalePageProps = {
  params: Promise<{
    locale: string
  }>
}

type LocalizedMetadataInput = {
  locale: Locale
  path: string
  title: string
  description: string
  imageUrl?: string
  imageAlt?: string
}

type RouteImageOverride = {
  src: string
  alt: Record<Locale, string>
}

export type PageSeoContent = {
  title: string
  description: string
  imageUrl: string
  imageAlt: string
}

const PAGE_IMAGE_OVERRIDES: Partial<Record<string, RouteImageOverride>> = {
  '/the-helia/about': {
    src: '/img/private.jpg',
    alt: {
      ko: '더헬리아 산후조리원 가족 전용 라운지 전경',
      en: 'Family lounge area at The Helia postpartum care center',
    },
  },
  '/the-helia/location': {
    src: '/img/location2.png',
    alt: {
      ko: '더헬리아 산후조리원이 위치한 MS메디컬스퀘어 외관',
      en: 'Exterior of MS Medical Square where The Helia is located',
    },
  },
  '/reservation': {
    src: '/img/headerpreview/reservation.png',
    alt: {
      ko: '더헬리아 예약 상담 안내 이미지',
      en: 'Reservation consultation image for The Helia',
    },
  },
  '/reservation/price': {
    src: '/img/headerpreview/price.jpg',
    alt: {
      ko: '더헬리아 가격 안내 대표 이미지',
      en: 'Pricing overview image for The Helia',
    },
  },
  '/room-suites/prestige': {
    src: blobUrl('img/room/prestige_livingroom1.jpg'),
    alt: {
      ko: '더헬리아 프레스티지 스위트 거실 전경',
      en: 'Living area of the Prestige suite at The Helia',
    },
  },
  '/room-suites/vvip': {
    src: blobUrl('img/room/vvip_livingroom1.jpg'),
    alt: {
      ko: '더헬리아 VVIP 스위트 객실 전경',
      en: 'VVIP suite overview at The Helia',
    },
  },
  '/room-suites/vip': {
    src: '/img/headerpreview/vip.jpg',
    alt: {
      ko: '더헬리아 VIP 객실 대표 이미지',
      en: 'VIP room image at The Helia',
    },
  },
  '/service/helia-spa': {
    src: '/img/spa/headspa1.jpeg',
    alt: {
      ko: '더헬리아 프리미엄 헤드스파 케어 공간',
      en: 'Premium head spa care space at The Helia',
    },
  },
  '/service/baby-spa': {
    src: blobUrl('img/babyspa/babyspa1.jpg'),
    alt: {
      ko: '더헬리아 베이비 스파 프로그램 대표 이미지',
      en: 'Baby spa program image at The Helia',
    },
  },
  '/service/infant-room': {
    src: '/img/infantroom.jpg',
    alt: {
      ko: '더헬리아 신생아실 전경',
      en: 'Nursery room view at The Helia',
    },
  },
  '/service/moms-class': {
    src: '/img/main/homepage_5.jpg',
    alt: {
      ko: '더헬리아 산모 교육 프로그램 대표 이미지',
      en: 'Mothers class image at The Helia',
    },
  },
  '/stories/faq': {
    src: '/img/main/homepage_5.jpg',
    alt: {
      ko: '더헬리아 FAQ 대표 이미지',
      en: 'FAQ image for The Helia',
    },
  },
  '/stories/guest-reviews': {
    src: '/img/main/homepage_6.jpg',
    alt: {
      ko: '더헬리아 고객 후기 대표 이미지',
      en: 'Guest reviews image for The Helia',
    },
  },
}

function buildLocalizedPath(locale: Locale, path: string): string {
  if (path === '/' || path === '') {
    return `/${locale}`
  }

  return `/${locale}${path}`.replace(/\/{2,}/g, '/')
}

export function normalizeLocale(locale: string): Locale {
  return locale === 'en' ? 'en' : 'ko'
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  imageUrl = SITE_IMAGE_URL,
  imageAlt = title,
}: LocalizedMetadataInput): Metadata {
  const localizedPath = buildLocalizedPath(locale, path)
  const alternateKoPath = buildLocalizedPath('ko', path)
  const alternateEnPath = buildLocalizedPath('en', path)

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath,
      languages: {
        ko: alternateKoPath,
        en: alternateEnPath,
      },
    },
    openGraph: {
      title,
      description,
      url: localizedPath,
      siteName: locale === 'ko' ? '더 헬리아 산후조리원' : 'The Helia Postpartum Care Center',
      locale,
      type: 'website',
      images: [
        {
          url: imageUrl,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export function buildHomePageMetadata(locale: Locale): Metadata {
  const title =
    locale === 'ko' ? '더 헬리아 산후조리원' : 'The Helia Postpartum Care Center'

  return {
    ...buildPageMetadata({
      locale,
      path: '/',
      title,
      description:
        locale === 'ko'
          ? '더 헬리아 산후조리원은 산모와 아기를 위한 프리미엄 산후케어 공간으로, 회복과 휴식 그리고 가족의 첫 시간을 세심하게 준비합니다.'
          : 'The Helia is a premium postpartum care center crafted for recovery, rest, and the first days your family shares together.',
      imageUrl: '/img/main/homepage_1.jpg',
      imageAlt:
        locale === 'ko'
          ? '더헬리아 산후조리원 메인 공간 전경'
          : 'Main space view of The Helia postpartum care center',
    }),
    title: {
      absolute: title,
    },
  }
}

export function getSubPageSeoContent(locale: Locale, path: string): PageSeoContent {
  const pageContent = getSubPageContent(path, locale)
  const imageOverride = PAGE_IMAGE_OVERRIDES[path]
  const title =
    pageContent?.title ??
    (locale === 'ko' ? '더 헬리아 산후조리원' : 'The Helia Postpartum Care Center')
  const description =
    pageContent?.copy ??
    pageContent?.description ??
    (locale === 'ko'
      ? '더헬리아 산후조리원의 공간과 프로그램을 확인해 보세요.'
      : 'Explore the spaces and programs at The Helia postpartum care center.')

  return {
    title,
    description,
    imageUrl: imageOverride?.src ?? pageContent?.imageSrc ?? SITE_IMAGE_URL,
    imageAlt: imageOverride?.alt[locale] ?? pageContent?.imageAlt ?? title,
  }
}

export function buildSubPageMetadata(locale: Locale, path: string): Metadata {
  const seoContent = getSubPageSeoContent(locale, path)

  return buildPageMetadata({
    locale,
    path,
    ...seoContent,
  })
}
