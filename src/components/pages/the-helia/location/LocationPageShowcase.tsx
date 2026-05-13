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

type VisitStep = {
  id: string
  title: string
  body: string
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
  mapSubtitle: string
  mapCallout: string
  mapAppButtonLabel: string
  mapAppDialogTitle: string
  mapAppDialogSubtitle: string
  mapAppDialogCloseLabel: string
  mapAppOptions: MapAppOption[]
  addressLabel: string
  addressValue: string
  addressDescription: string
  stepsEyebrow: string
  stepsTitle: string
  steps: VisitStep[]
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
    <div className="space-y-20 pb-20">
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

  return (
    <ScrollReveal>
      <section className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-gradient-to-br from-primary/10 via-background to-background/95 shadow-sm">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-accent/25 blur-3xl" />

        <div className="relative space-y-4 p-6 md:space-y-5 md:p-8 lg:p-10">
          <div className="grid items-end gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <header className="space-y-4 text-center lg:pb-8 lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary font-playfair italic">
                {content.heroBadge}
              </p>
              <h2 className="mx-auto max-w-[13ch] text-balance break-keep text-3xl leading-[1.18] text-foreground md:text-5xl md:leading-[1.12] lg:mx-0 font-serif">
                {content.heroTitle}
              </h2>
              <p className="mx-auto max-w-[38ch] text-balance break-keep text-sm leading-[1.85] text-foreground/75 md:max-w-[54ch] md:text-base lg:mx-0">
                {content.heroSubtitle}
              </p>
            </header>

            <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-border/40 shadow-lg">
              <Image
                src="/img/location2.png"
                alt={content.exteriorAlt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/78 via-[#2D241E]/15 to-transparent" />
              <div className="absolute left-4 top-4 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md md:left-6 md:top-6">
                {content.exteriorBadge}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                <div className="rounded-[1.5rem] border border-white/15 bg-black/20 p-5 text-white backdrop-blur-md">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">
                    {content.exteriorTitle}
                  </p>
                  <p className="mt-2 text-2xl font-semibold leading-snug">
                    {content.exteriorBody}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-border/25 pt-4 md:pt-5 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="flex h-full flex-col justify-between rounded-[1.75rem] border border-border/35 bg-white/80 p-6 shadow-sm backdrop-blur-md dark:bg-[#2A2928]/60 md:p-7 lg:row-span-2">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-[#333231]">
                    <CalendarCheck className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 space-y-2">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">
                      {content.reservationEyebrow}
                    </p>
                    <p className="max-w-[16ch] text-balance break-keep text-2xl font-semibold leading-[1.24] text-foreground md:text-[1.7rem]">
                      {content.reservationTitle}
                    </p>
                    <p className="max-w-[40ch] break-keep text-[13px] leading-[1.78] text-foreground/70 md:text-base">
                      {content.reservationDescription}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-[auto_1fr] md:items-end">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-primary/90 md:justify-self-start"
                >
                  {content.buttonLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <p className=" break-keep text-[11px] leading-[1.7] text-foreground/55 md:justify-self-end md:text-right md:text-xs">
                  {content.reservationNote}
                </p>
              </div>
            </article>

            <FactCard
              fact={buildingFact}
              className="h-full bg-primary/5"
              valueClassName="text-xl leading-[1.22]"
              descriptionClassName="max-w-[32ch]"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FactCard
                fact={contactFact}
                className="h-full"
                valueClassName="font-sans text-lg leading-none tracking-[-0.045em] whitespace-nowrap tabular-nums md:text-xl"
                descriptionClassName="max-w-[26ch]"
              />
              <FactCard
                fact={hoursFact}
                className="h-full"
                valueClassName="font-sans text-lg leading-[1.08] tracking-[-0.035em] whitespace-nowrap tabular-nums md:text-xl"
                descriptionClassName="max-w-[26ch]"
              />
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  )
}

function FactCard({
  fact,
  className,
  valueClassName,
  descriptionClassName,
}: {
  fact: QuickFact
  className?: string
  valueClassName?: string
  descriptionClassName?: string
}): React.JSX.Element {
  return (
    <article
      className={clsx(
        'rounded-[1.5rem] border border-border/35 bg-white/70 p-5 shadow-sm backdrop-blur-md dark:bg-[#2A2928]/60 md:p-6',
        className,
      )}
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-[#333231]">
        <fact.Icon className="h-5 w-5" />
      </div>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/80">
        {fact.label}
      </p>
      <p
        className={clsx(
          'mt-2 text-balance break-keep text-lg font-semibold leading-snug text-foreground',
          valueClassName,
        )}
      >
        {fact.value}
      </p>
      <p
        className={clsx(
          'mt-3 break-keep text-[13px] leading-[1.75] text-foreground/65 md:text-sm',
          descriptionClassName,
        )}
      >
        {fact.description}
      </p>
    </article>
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
        <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[2rem] border border-border/40 bg-background/80 p-4 shadow-sm backdrop-blur md:p-5">
            <div className="space-y-3 px-2 pb-5 text-center md:px-3 md:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary font-playfair italic">
                {content.mapBadge}
              </p>
              <h3 className="mx-auto max-w-[17ch] text-balance break-keep text-2xl font-semibold leading-[1.24] text-foreground md:mx-0 md:text-3xl font-serif">
                {content.mapTitle}
              </h3>
              <p className="mx-auto max-w-[38ch] break-keep text-sm leading-[1.85] text-foreground/72 md:mx-0 md:max-w-[52ch] md:text-base">
                {content.mapSubtitle}
              </p>
              <div className="flex justify-center pt-1 md:justify-start">
                <button
                  type="button"
                  onClick={() => setIsMapDialogOpen(true)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-background shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:w-auto"
                >
                  <Navigation className="h-4 w-4" />
                  {content.mapAppButtonLabel}
                </button>
              </div>
            </div>

            <div className="group relative h-[340px] overflow-hidden rounded-[1.75rem] border border-border/30 shadow-md md:h-[420px]">
              <iframe
                title="The Helia Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.8384058135257!2d126.95109607716499!3d37.275258840774896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x277bcbed795ddd7%3A0xad9cdb91d0fde45f!2z642U7Zes66as7JWEIOyCsO2bhOyhsOumrOybkA!5e0!3m2!1sko!2sus!4v1760246577990!5m2!1sko!2sus"
                loading="lazy"
                className="h-full w-full grayscale-[8%] transition-all duration-700 group-hover:grayscale-0"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="absolute right-4 top-4 rounded-full border border-white/50 bg-white/90 px-4 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur-md">
                {content.mapCallout}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <article className="rounded-[2rem] border border-border/40 bg-white/80 p-6 shadow-sm backdrop-blur-md dark:bg-[#2A2928]/60">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-[#333231]">
                  <MapPinIcon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">
                    {content.addressLabel}
                  </p>
                  <p className="max-w-[26ch] text-balance break-keep text-lg font-semibold leading-relaxed text-foreground">
                    {content.addressValue}
                  </p>
                  <p className="max-w-[40ch] break-keep text-[13px] leading-[1.8] text-foreground/70 md:text-sm">
                    {content.addressDescription}
                  </p>
                </div>
              </div>
            </article>

            <article className="rounded-[2rem] border border-border/40 bg-gradient-to-br from-primary/10 via-background to-background/95 p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-[#333231]">
                  <Navigation className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">
                    {content.stepsEyebrow}
                  </p>
                  <h3 className="max-w-[19ch] text-balance break-keep text-xl font-semibold text-foreground font-serif">
                    {content.stepsTitle}
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                {content.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className="flex gap-4 rounded-[1.5rem] border border-border/35 bg-white/75 p-4 shadow-sm dark:bg-[#2A2928]/60"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-background">
                      {index + 1}
                    </div>
                    <div>
                      <p className="max-w-[24ch] text-balance break-keep text-[15px] font-semibold text-foreground md:text-base">
                        {step.title}
                      </p>
                      <p className="mt-1 max-w-[38ch] break-keep text-[13px] leading-[1.75] text-foreground/70 md:text-sm">
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
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
      className="fixed inset-0 z-[120] flex items-end bg-black/58 px-4 backdrop-blur-[3px] md:items-center md:justify-center md:px-6 md:py-8"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative mb-0 flex max-h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-t-[2rem] border border-border/40 bg-background shadow-[0_26px_80px_rgba(0,0,0,0.22)] md:rounded-[2rem]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent)]" />

        <div className="flex items-start justify-between gap-4 border-b border-border/40 px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
          <div className="min-w-0">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              <Navigation className="h-3.5 w-3.5" />
              MAP APP
            </div>
            <h3
              id={titleId}
              className="break-keep text-2xl font-serif font-semibold leading-tight text-foreground sm:text-3xl"
            >
              {content.mapAppDialogTitle}
            </h3>
            <p
              id={descriptionId}
              className="mt-3 break-keep text-sm leading-relaxed text-foreground/72 sm:text-base"
            >
              {content.mapAppDialogSubtitle}
            </p>
          </div>
          <button
            type="button"
            aria-label={content.mapAppDialogCloseLabel}
            onClick={onClose}
            className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-border/50 bg-primary/5 text-foreground transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <X className="h-4 w-4" />
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
                className="group flex w-full items-center gap-4 rounded-[1.5rem] border border-border/40 bg-white/75 p-4 text-left shadow-sm transition hover:border-primary/45 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:bg-[#2A2928]/60 sm:p-5"
              >
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-background">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block break-keep text-base font-semibold text-foreground">
                    {option.label}
                  </span>
                  <span className="mt-1 block break-keep text-[13px] leading-[1.7] text-foreground/68 sm:text-sm">
                    {option.description}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
      <section className="overflow-hidden rounded-[2rem] border border-border/40 bg-gradient-to-br from-background via-primary/5 to-background/95 shadow-sm">
        <div className="space-y-8 p-6 md:p-10">
          <header className="max-w-3xl space-y-3 text-center md:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary font-playfair italic">
              {content.guidesBadge}
            </p>
            <h3 className="mx-auto max-w-[19ch] text-balance break-keep text-2xl font-semibold leading-[1.24] text-foreground md:mx-0 md:text-3xl font-serif">
              {content.guidesTitle}
            </h3>
            <p className="mx-auto max-w-[38ch] break-keep text-sm leading-[1.85] text-foreground/72 md:mx-0 md:max-w-[54ch] md:text-base">
              {content.guidesSubtitle}
            </p>
          </header>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {content.guideCards.map((card) => (
              <article
                key={card.id}
                className="flex h-full flex-col rounded-[1.75rem] border border-border/35 bg-white/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-[#2A2928]/60"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-[#333231]">
                  <card.Icon className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">
                  {card.title}
                </p>
                <p className="mt-2 text-balance break-keep text-xl font-semibold leading-snug text-foreground">
                  {card.value}
                </p>
                <p className="mt-3 max-w-[30ch] break-keep text-[13px] leading-[1.75] text-foreground/70 md:text-sm">
                  {card.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {card.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 break-keep text-[13px] leading-[1.75] text-foreground/72 md:text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
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
        value: isKo ? '평일 09:00 - 18:00' : 'Weekdays 09:00 - 18:00',
        description: isKo
          ? '주말·공휴일은 사전 예약 후 방문해 주세요.'
          : 'Weekend and holiday visits are available by prior reservation.',
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
    mapSubtitle: isKo
      ? '건물 위치를 먼저 확인한 뒤, 도착 후에는 안내 데스크 등록 순서대로 이동하시면 됩니다.'
      : 'Check the building location first, then follow the check-in flow once you arrive.',
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
    stepsEyebrow: isKo ? '방문 순서' : 'Visit Flow',
    stepsTitle: isKo
      ? '처음 오셔도 헤매지 않도록 짧게 안내드립니다'
      : 'A simple step-by-step guide for your first visit',
    steps: [
      {
        id: 'step-1',
        title: isKo ? '방문 일정을 먼저 예약해 주세요' : 'Reserve your visit first',
        body: isKo
          ? '평일 상담 시간 내 예약을 권장드리며, 주말·공휴일 방문은 사전 예약 후 가능합니다.'
          : 'Weekday consultation hours are recommended, and weekend or holiday visits are available with prior reservation.',
      },
      {
        id: 'step-2',
        title: isKo ? '홈플러스 서수원점 인근에서 건물을 찾으세요' : 'Use HomePlus West Suwon as your landmark',
        body: isKo
          ? '버스 13-1, 64-2, 200번 이용 시 금곡동 주민센터 정류장에서 하차 후 도보 5분 거리입니다.'
          : 'Take buses 13-1, 64-2, or 200, get off at Geumgok-dong Community Center, then walk about 5 minutes.',
      },
      {
        id: 'step-3',
        title: isKo ? '도착 후 5층에서 등록하고 이동합니다' : 'Check in on 5F and then head up',
        body: isKo
          ? '등록을 마치면 더헬리아 상담 공간으로 자연스럽게 안내해 드립니다.'
          : 'After check-in, you will be guided to The Helia consultation space.',
      },
    ],
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
          ? '평일 09:00 - 18:00 상담 운영'
          : 'Consultation hours: weekdays 09:00 - 18:00',
        description: isKo
          ? '방문 시간을 미리 정해 두시면 상담과 투어를 보다 차분하게 진행하실 수 있습니다.'
          : 'Scheduling in advance helps keep your consultation and tour relaxed and focused.',
        points: isKo
          ? [
              '주말·공휴일은 사전 예약 후 방문 가능',
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
