'use client'

import clsx from 'clsx'
import {
  ArrowUpRight,
  Building2,
  CalendarCheck,
  CalendarClock,
  CarFrontIcon,
  CheckCircle2,
  Compass,
  MapPinIcon,
  Navigation,
  PhoneCall,
  Route,
  TrainFrontIcon,
  X,
  type LucideIcon,
} from 'lucide-react'
import Image from 'next/image'
import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'

import { ScrollReveal } from '@/components/common/ScrollReveal'
import type { Locale } from '@/components/header/types'

const BOOKING_URL = 'https://booking.naver.com/booking/6/bizes/1021790'
const SITE_URL = 'https://thehelia.co.kr'
const MAP_APP_FALLBACK_DELAY = 1200
const HELIA_DESTINATION = {
  name: '더헬리아 산후조리원',
  lat: '37.275258840774896',
  lng: '126.95109607716499',
} as const

type MapProviderId = 'naver' | 'kakao' | 'apple'

const MAP_PROVIDER_ICONS: Record<MapProviderId, LucideIcon> = {
  naver: Navigation,
  kakao: Route,
  apple: Compass,
}

type QuickFact = {
  id: string
  Icon: LucideIcon
  label: string
  value: string
  description: string
}

type GuideCard = {
  id: string
  Icon: LucideIcon
  title: string
  value: string
  description: string
  points: string[]
}

type MapAppOption = {
  id: MapProviderId
  label: string
  description: string
}

type LocationPageContent = {
  heroBadge: string
  heroTitle: string
  heroSubtitle: string
  reservationEyebrow: string
  reservationTitle: string
  reservationDescription: string
  reservationNote: string
  buttonLabel: string
  exteriorAlt: string
  exteriorBadge: string
  exteriorTitle: string
  exteriorBody: string
  quickFacts: QuickFact[]
  mapBadge: string
  mapTitle: string
  mapCallout: string
  mapAppButtonLabel: string
  mapAppDialogTitle: string
  mapAppDialogSubtitle: string
  mapAppDialogCloseLabel: string
  mapAppOptions: MapAppOption[]
  addressLabel: string
  addressValue: string
  addressDescription: string
  guidesBadge: string
  guidesTitle: string
  guidesSubtitle: string
  guideCards: GuideCard[]
}

type LocationPageShowcaseProps = {
  locale: Locale
}

export function LocationPageShowcase({
  locale,
}: LocationPageShowcaseProps): React.JSX.Element {
  const content = getLocationContent(locale)

  return (
    <div className="space-y-24 pb-24 md:space-y-32">
      <LocationHeroSection content={content} />
      <LocationMapSection content={content} />
      <LocationGuideSection content={content} />
    </div>
  )
}

function LocationHeroSection({
  content,
}: {
  content: LocationPageContent
}): React.JSX.Element {
  const contactFact = content.quickFacts.find((fact) => fact.id === 'contact')
  const hoursFact = content.quickFacts.find((fact) => fact.id === 'hours')
  const buildingFact = content.quickFacts.find((fact) => fact.id === 'building')

  if (!contactFact || !hoursFact || !buildingFact) {
    return <></>
  }

  const facts = [contactFact, hoursFact, buildingFact]

  return (
    <ScrollReveal>
      <section>
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch lg:gap-14">
          <header className="flex flex-col justify-center space-y-8 text-center lg:text-left">
            <div className="space-y-5">
              <p className="eyebrow">
                {content.heroBadge}
              </p>
              <h2 className="mx-auto max-w-[14ch] text-balance break-keep font-display-serif text-3xl font-normal leading-[1.4] text-foreground md:text-5xl lg:mx-0">
                {content.heroTitle}
              </h2>
              <p className="mx-auto max-w-[42ch] text-balance break-keep text-sm leading-[1.9] text-secondary md:text-base lg:mx-0">
                {content.heroSubtitle}
              </p>
            </div>

            <div className="flex flex-col items-center gap-3 lg:items-start">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-foreground px-8 py-3.5 font-sans text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                {content.buttonLabel}
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <p className="break-keep text-[11px] leading-[1.7] text-secondary">
                {content.reservationNote}
              </p>
            </div>
          </header>

          <div className="relative min-h-[380px] overflow-hidden bg-accent/30 lg:min-h-[540px]">
            <Image
              src="/img/location2.png"
              alt={content.exteriorAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 52vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/78 via-[#2D241E]/15 to-transparent" />
            <div className="absolute left-5 top-5 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-white drop-shadow md:left-6 md:top-6">
              {content.exteriorBadge}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <div className="text-white">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-white/75 drop-shadow">
                  {content.exteriorTitle}
                </p>
                <p className="mt-2 font-display-serif text-2xl font-normal leading-snug drop-shadow">
                  {content.exteriorBody}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 border-t border-border sm:grid-cols-3 md:mt-20">
          {facts.map((fact, index) => (
            <div
              key={fact.id}
              className={clsx(
                'py-8 sm:px-8 sm:first:pl-0',
                index > 0 && 'border-t border-border sm:border-t-0 sm:border-l',
              )}
            >
              <div className="mb-4 flex items-center gap-2.5">
                <fact.Icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                  {fact.label}
                </p>
              </div>
              <p className="break-keep font-display-serif text-xl font-normal leading-[1.4] text-foreground">
                {fact.value}
              </p>
              <p className="mt-3 max-w-[30ch] break-keep text-[13px] leading-[1.75] text-secondary">
                {fact.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </ScrollReveal>
  )
}

function LocationMapSection({
  content,
}: {
  content: LocationPageContent
}): React.JSX.Element {
  const [isMapDialogOpen, setIsMapDialogOpen] = useState(false)
  const mapDialogTitleId = useId()
  const mapDialogDescriptionId = useId()

  useEffect(() => {
    if (!isMapDialogOpen || typeof window === 'undefined') return

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsMapDialogOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMapDialogOpen])

  const handleMapProviderSelect = (providerId: MapProviderId): void => {
    setIsMapDialogOpen(false)
    openMapRoute(providerId)
  }

  return (
    <>
      <ScrollReveal>
        <section className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          <div>
            <div className="space-y-4 pb-6 text-center md:text-left">
              <p className="eyebrow">
                {content.mapBadge}
              </p>
              <h3 className="mx-auto max-w-[17ch] text-balance break-keep font-display-serif text-2xl font-normal leading-[1.4] text-foreground md:mx-0 md:text-3xl">
                {content.mapTitle}
              </h3>
              <div className="flex justify-center pt-1 md:justify-start">
                <button
                  type="button"
                  onClick={() => setIsMapDialogOpen(true)}
                  className="inline-flex w-full items-center justify-center gap-2 border border-foreground/30 bg-background px-5 py-3 font-sans text-sm font-semibold text-foreground transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:w-auto"
                >
                  <Navigation className="h-4 w-4 text-primary" strokeWidth={1.5} />
                  {content.mapAppButtonLabel}
                </button>
              </div>
            </div>

            <div className="group relative h-[340px] overflow-hidden border border-border md:h-[420px]">
              <iframe
                title="The Helia Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.8384058135257!2d126.95109607716499!3d37.275258840774896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x277bcbed795ddd7%3A0xad9cdb91d0fde45f!2z642U7Zes66as7JWEIOyCsO2bhOyhsOumrOybkA!5e0!3m2!1sko!2sus!4v1760246577990!5m2!1sko!2sus"
                loading="lazy"
                className="h-full w-full grayscale-[8%] transition-all duration-700 group-hover:grayscale-0"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="absolute right-4 top-4 border border-border bg-background px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground">
                {content.mapCallout}
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <article className="border-t border-border pt-6">
              <div className="flex items-start gap-4">
                <MapPinIcon className="mt-1 h-5 w-5 flex-shrink-0 text-primary" strokeWidth={1.5} />
                <div className="space-y-2">
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                    {content.addressLabel}
                  </p>
                  <p className="max-w-[26ch] text-balance break-keep font-display-serif text-lg font-normal leading-relaxed text-foreground">
                    {content.addressValue}
                  </p>
                  <p className="max-w-[40ch] break-keep text-[13px] leading-[1.8] text-secondary md:text-sm">
                    {content.addressDescription}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>
      </ScrollReveal>

      {isMapDialogOpen ? (
        <MapAppDialog
          content={content}
          descriptionId={mapDialogDescriptionId}
          titleId={mapDialogTitleId}
          onClose={() => setIsMapDialogOpen(false)}
          onSelect={handleMapProviderSelect}
        />
      ) : null}
    </>
  )
}

function MapAppDialog({
  content,
  descriptionId,
  titleId,
  onClose,
  onSelect,
}: {
  content: LocationPageContent
  descriptionId: string
  titleId: string
  onClose: () => void
  onSelect: (providerId: MapProviderId) => void
}): React.JSX.Element {
  if (typeof document === 'undefined') {
    return <></>
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-end bg-black/60 px-4 md:items-center md:justify-center md:px-6 md:py-8"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative mb-0 flex max-h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-t-lg border border-border bg-background md:rounded-none"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
          <div className="min-w-0">
            <div className="eyebrow mb-3 inline-flex items-center gap-2">
              <Navigation className="h-3 w-3" strokeWidth={1.5} />
              MAP APP
            </div>
            <h3
              id={titleId}
              className="break-keep font-display-serif text-2xl font-normal leading-[1.4] text-foreground sm:text-3xl"
            >
              {content.mapAppDialogTitle}
            </h3>
            <p
              id={descriptionId}
              className="mt-3 break-keep text-sm leading-[1.85] text-secondary sm:text-base"
            >
              {content.mapAppDialogSubtitle}
            </p>
          </div>
          <button
            type="button"
            aria-label={content.mapAppDialogCloseLabel}
            onClick={onClose}
            className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center border border-border bg-background text-foreground transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        <div
          data-lenis-prevent
          className="space-y-3 overflow-y-auto overscroll-contain px-5 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-5 sm:px-6 sm:pb-6"
        >
          {content.mapAppOptions.map((option) => {
            const Icon = MAP_PROVIDER_ICONS[option.id]

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelect(option.id)}
                className="group flex w-full items-center gap-4 border border-border bg-background p-4 text-left transition-colors hover:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:p-5"
              >
                <Icon className="h-5 w-5 flex-shrink-0 text-primary" strokeWidth={1.5} />
                <span className="min-w-0 flex-1">
                  <span className="block break-keep text-base font-semibold text-foreground">
                    {option.label}
                  </span>
                  <span className="mt-1 block break-keep text-[13px] leading-[1.7] text-secondary sm:text-sm">
                    {option.description}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
              </button>
            )
          })}
        </div>
      </div>
    </div>,
    document.body,
  )
}

function openMapRoute(providerId: MapProviderId): void {
  if (typeof window === 'undefined') return

  const routeTarget = getMapRouteTarget(providerId)

  if (!routeTarget.usesFallbackTimer) {
    window.location.href = routeTarget.url
    return
  }

  const openedAt = Date.now()

  window.location.href = routeTarget.url
  window.setTimeout(() => {
    const elapsed = Date.now() - openedAt

    if (document.visibilityState === 'visible' && elapsed < MAP_APP_FALLBACK_DELAY + 800) {
      window.location.href = routeTarget.fallbackUrl
    }
  }, MAP_APP_FALLBACK_DELAY)
}

function getMapRouteTarget(providerId: MapProviderId): {
  url: string
  fallbackUrl: string
  usesFallbackTimer: boolean
} {
  const isAndroid = typeof window !== 'undefined' && /Android/i.test(window.navigator.userAgent)

  if (providerId === 'apple') {
    const appleMapsUrl = buildAppleMapsUrl()

    return {
      url: appleMapsUrl,
      fallbackUrl: appleMapsUrl,
      usesFallbackTimer: false,
    }
  }

  if (providerId === 'kakao') {
    const fallbackUrl = buildKakaoFallbackUrl()

    return {
      url: isAndroid ? buildKakaoIntentUrl(fallbackUrl) : buildKakaoAppUrl(),
      fallbackUrl,
      usesFallbackTimer: true,
    }
  }

  const fallbackUrl = buildNaverFallbackUrl()

  return {
    url: isAndroid ? buildNaverIntentUrl(fallbackUrl) : buildNaverAppUrl(),
    fallbackUrl,
    usesFallbackTimer: true,
  }
}

function buildNaverRouteQuery(): string {
  return new URLSearchParams({
    dlat: HELIA_DESTINATION.lat,
    dlng: HELIA_DESTINATION.lng,
    dname: HELIA_DESTINATION.name,
    appname: SITE_URL,
  }).toString()
}

function buildNaverAppUrl(): string {
  return `nmap://route/car?${buildNaverRouteQuery()}`
}

function buildNaverIntentUrl(fallbackUrl: string): string {
  const routeQuery = buildNaverRouteQuery()
  const encodedFallbackUrl = encodeURIComponent(fallbackUrl)

  return [
    `intent://route/car?${routeQuery}#Intent`,
    'scheme=nmap',
    'action=android.intent.action.VIEW',
    'category=android.intent.category.BROWSABLE',
    'package=com.nhn.android.nmap',
    `S.browser_fallback_url=${encodedFallbackUrl}`,
    'end',
  ].join(';')
}

function buildNaverFallbackUrl(): string {
  return `https://map.naver.com/p/search/${encodeURIComponent(HELIA_DESTINATION.name)}`
}

function buildKakaoAppUrl(): string {
  return `kakaomap://route?ep=${HELIA_DESTINATION.lat},${HELIA_DESTINATION.lng}&by=car`
}

function buildKakaoIntentUrl(fallbackUrl: string): string {
  const encodedFallbackUrl = encodeURIComponent(fallbackUrl)

  return [
    `intent://route?ep=${HELIA_DESTINATION.lat},${HELIA_DESTINATION.lng}&by=car#Intent`,
    'scheme=kakaomap',
    'action=android.intent.action.VIEW',
    'category=android.intent.category.BROWSABLE',
    'package=net.daum.android.map',
    `S.browser_fallback_url=${encodedFallbackUrl}`,
    'end',
  ].join(';')
}

function buildKakaoFallbackUrl(): string {
  return `https://map.kakao.com/link/to/${encodeURIComponent(HELIA_DESTINATION.name)},${HELIA_DESTINATION.lat},${HELIA_DESTINATION.lng}`
}

function buildAppleMapsUrl(): string {
  const params = new URLSearchParams({
    daddr: `${HELIA_DESTINATION.lat},${HELIA_DESTINATION.lng}`,
    q: HELIA_DESTINATION.name,
    dirflg: 'd',
  })

  return `https://maps.apple.com/?${params.toString()}`
}

function LocationGuideSection({
  content,
}: {
  content: LocationPageContent
}): React.JSX.Element {
  return (
    <ScrollReveal>
      <section className="bg-accent/35 px-6 py-12 md:px-10 md:py-16">
        <div className="space-y-10">
          <header className="max-w-3xl space-y-4 text-center md:text-left">
            <p className="eyebrow">
              {content.guidesBadge}
            </p>
            <h3 className="mx-auto max-w-[19ch] text-balance break-keep font-display-serif text-2xl font-normal leading-[1.4] text-foreground md:mx-0 md:text-3xl">
              {content.guidesTitle}
            </h3>
            <p className="mx-auto max-w-[38ch] break-keep text-sm leading-[1.85] text-secondary md:mx-0 md:max-w-[54ch] md:text-base">
              {content.guidesSubtitle}
            </p>
          </header>

          <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
            {content.guideCards.map((card) => (
              <article
                key={card.id}
                className="flex h-full flex-col border-t border-border pt-6"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <card.Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                    {card.title}
                  </p>
                </div>
                <p className="text-balance break-keep font-display-serif text-xl font-normal leading-[1.4] text-foreground">
                  {card.value}
                </p>

                <ul className="mt-6 space-y-3">
                  {card.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 break-keep text-[13px] leading-[1.75] text-foreground/80 md:text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" strokeWidth={1.5} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}

function getLocationContent(locale: Locale): LocationPageContent {
  const isKo = locale === 'ko'

  return {
    heroBadge: isKo ? '방문 안내' : 'Visit & Arrival',
    heroTitle: isKo
      ? '더 헬리아 방문 상담을 더 편안하게 준비하세요'
      : 'Plan a calm and confident visit to The Helia',
    heroSubtitle: isKo
      ? '사전 예약부터 도착 동선까지, 처음 방문하시는 분도 부담 없이 오실 수 있도록 핵심 정보만 정리했습니다.'
      : 'From booking your consultation to finding the building, this page gathers the essentials for a smooth first visit.',
    reservationEyebrow: isKo ? '방문 예약' : 'Visit Booking',
    reservationTitle: isKo
      ? '네이버 예약으로 상담 일정을 먼저 선택해 주세요'
      : 'Choose your preferred consultation slot through Naver Booking',
    reservationDescription: isKo
      ? '여유 있는 상담과 투어를 위해 방문은 사전 예약 기준으로 안내해 드립니다.'
      : 'Visits are guided by advance reservation so your consultation and tour can stay calm and unhurried.',
    reservationNote: isKo
      ? '* 네이버 예약 페이지로 이동합니다.'
      : '* Opens the Naver Booking page in a new tab.',
    buttonLabel: isKo ? '네이버 예약 하기' : 'Book on Naver',
    exteriorAlt: isKo
      ? '더헬리아 산후조리원이 위치한 MS메디컬스퀘어 외관'
      : 'Exterior of MS Medical Square where The Helia is located',
    exteriorBadge: isKo ? 'MS메디컬스퀘어 5·6층' : 'MS Medical Square 5F-6F',
    exteriorTitle: isKo ? '건물 도착 후 5층 안내 데스크에서 등록해 주세요' : 'Please check in at the 5F information desk after arrival',
    exteriorBody: isKo
      ? '더헬리아는 MS메디컬스퀘어 5·6층에 있습니다.'
      : 'The Helia occupies the 5th and 6th floors of MS Medical Square.',
    quickFacts: [
      {
        id: 'contact',
        Icon: PhoneCall,
        label: isKo ? '예약 문의' : 'Inquiry',
        value: '010-5077-3962',
        description: isKo
          ? '카카오톡 더헬리아 산후조리원 채널로도 상담 가능합니다.'
          : 'Consultation is also available via KakaoTalk 더헬리아 산후조리원.',
      },
      {
        id: 'hours',
        Icon: CalendarClock,
        label: isKo ? '상담 운영' : 'Hours',
        value: isKo ? '연중 무휴 10:00 - 19:00' : 'All Day 10:00 - 19:00',
        description: isKo
          ? '방문시 사전 예약 후 방문해 주세요.'
          : 'Every visits are available by prior reservation.',
      },
      {
        id: 'building',
        Icon: Building2,
        label: isKo ? '방문 위치' : 'Location',
        value: isKo ? '수원 권선구 MS메디컬스퀘어' : 'MS Medical Square, Suwon',
        description: isKo
          ? '5층 등록 후 6층 상담 공간으로 안내해 드립니다.'
          : 'Register on 5F first, then continue to the consultation area on 6F.',
      },
    ],
    mapBadge: isKo ? '도착 안내' : 'Arrival Guide',
    mapTitle: isKo
      ? '지도와 함께 도착 동선을 한 번에 확인하세요'
      : 'See the location and arrival flow at a glance',
    mapCallout: isKo ? 'MS메디컬스퀘어 5·6층' : 'MS Medical Square 5F-6F',
    mapAppButtonLabel: isKo ? '지도 앱으로 길찾기' : 'Open in map app',
    mapAppDialogTitle: isKo
      ? '사용할 지도 앱을 선택해 주세요'
      : 'Choose your map app',
    mapAppDialogSubtitle: isKo
      ? '선택한 지도 앱에서 현재 위치 기준 길찾기를 엽니다. 이동수단은 앱에서 변경할 수 있습니다.'
      : 'Open directions from your current location to The Helia. You can change the travel mode in the map app.',
    mapAppDialogCloseLabel: isKo ? '지도 앱 선택 닫기' : 'Close map app chooser',
    mapAppOptions: [
      {
        id: 'naver',
        label: isKo ? '네이버 지도' : 'Naver Map',
        description: isKo
          ? '네이버 지도 앱에서 더헬리아까지 길찾기를 엽니다.'
          : 'Open directions to The Helia in Naver Map.',
      },
      {
        id: 'kakao',
        label: isKo ? '카카오맵' : 'KakaoMap',
        description: isKo
          ? '카카오맵 앱에서 더헬리아까지 길찾기를 엽니다.'
          : 'Open directions to The Helia in KakaoMap.',
      },
      {
        id: 'apple',
        label: isKo ? '애플 지도' : 'Apple Maps',
        description: isKo
          ? '아이폰 기본 지도 앱에서 현재 위치 기준 길찾기를 엽니다.'
          : 'Open directions from here in Apple Maps.',
      },
    ],
    addressLabel: isKo ? '주소' : 'Address',
    addressValue: isKo
      ? '경기도 수원시 권선구 금곡로197번길 18-39'
      : '18-39 Geumgok-ro 197beon-gil, Gwonseon-gu, Suwon',
    addressDescription: isKo
      ? '더헬리아는 MS메디컬스퀘어 5·6층에 위치합니다. 건물 도착 후 5층 안내 데스크에서 등록해 주세요.'
      : 'The Helia is located on the 5th and 6th floors of MS Medical Square. Please check in at the 5F information desk upon arrival.',
    guidesBadge: isKo ? '방문 전 체크' : 'Before You Visit',
    guidesTitle: isKo
      ? '방문 전 알아두면 좋은 핵심 안내'
      : 'Helpful essentials to review before you come',
    guidesSubtitle: isKo
      ? '교통, 주차, 운영 정보를 한눈에 확인하고 여유 있게 방문 일정을 준비해 보세요.'
      : 'Review transportation, parking, and consultation timing details before setting out.',
    guideCards: [
      {
        id: 'transit',
        Icon: TrainFrontIcon,
        title: isKo ? '대중교통' : 'Transit',
        value: isKo
          ? '홈플러스 서수원점 도보 5분'
          : '5 minutes on foot from HomePlus West Suwon Branch',
        description: isKo
          ? '주변 기준점이 분명해 대중교통 방문 시에도 비교적 쉽게 찾으실 수 있습니다.'
          : 'Clear nearby landmarks make the building easier to find when arriving by public transportation.',
        points: isKo
          ? [
              '버스 13-1, 64-2, 200번 이용 가능',
              '금곡동 주민센터 정류장 하차 후 도보 5분',
              '2028년 신분당선 개통 예정',
            ]
          : [
              'Accessible via buses 13-1, 64-2, and 200',
              'Walk about 5 minutes from Geumgok-dong Community Center stop',
              'The Shinbundang Line extension is planned for 2028',
            ],
      },
      {
        id: 'parking',
        Icon: CarFrontIcon,
        title: isKo ? '주차 안내' : 'Parking',
        value: isKo
          ? 'MS메디컬스퀘어 지하주차장 이용'
          : 'Use the underground parking at MS Medical Square',
        description: isKo
          ? '차량으로 방문하셔도 건물 안에서 바로 이동할 수 있도록 준비되어 있습니다.'
          : 'If you arrive by car, you can move directly through the building after parking.',
        points: isKo
          ? [
              '방문 고객 주차권 제공',
              '건물 도착 후 5층 안내 데스크 등록',
              '주차 후 실내 동선으로 이동 가능',
            ]
          : [
              'Visitor parking validation is provided',
              'Check in at the 5F information desk after arrival',
              'You can continue through the indoor building route after parking',
            ],
      },
      {
        id: 'consultation',
        Icon: CalendarCheck,
        title: isKo ? '방문 운영' : 'Visit Timing',
        value: isKo
          ? '연중 무휴 10:00 - 19:00 상담 운영'
          : 'Consultation hours: weekdays 09:00 - 18:00',
        description: isKo
          ? '방문 시간을 미리 정해 두시면 상담과 투어를 보다 차분하게 진행하실 수 있습니다.'
          : 'Scheduling in advance helps keep your consultation and tour relaxed and focused.',
        points: isKo
          ? [
              '방문시 사전 예약은 필수 입니다.',
              '네이버 예약 또는 전화로 일정 문의 가능',
              '카카오톡 더헬리아 산후조리원 채널 상담 가능',
            ]
          : [
              'Weekend and holiday visits are available with prior reservation',
              'Inquiries are available by Naver Booking or phone',
              'KakaoTalk consultation is also available through 더헬리아 산후조리원',
            ],
      },
    ],
  }
}
