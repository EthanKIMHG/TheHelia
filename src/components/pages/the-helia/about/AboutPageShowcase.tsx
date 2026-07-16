"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import type { Locale } from "@/components/header/types";
import { blobUrl } from "@/lib/media";
import {
  Baby,
  CalendarCheck2,
  ChefHat,
  Clock3,
  Flower2,
  HeartHandshake,
  MoonStar,
  Play,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type AboutPageShowcaseProps = {
  locale: Locale;
};

export function AboutPageShowcase({ locale }: AboutPageShowcaseProps) {
  const copy = getAboutCopy(locale);

  return (
    <div className="space-y-32 pb-20">
      <PhilosophySection copy={copy.philosophy} />
      <VideoSection copy={copy.video} />
      <VirtualTourSection copy={copy.virtualTour} />
      <SpacesSection copy={copy.spaces} />
      <DailyFlowSection copy={copy.dailyFlow} />
    </div>
  );
}

type PhilosophyCopy = ReturnType<typeof getAboutCopy>["philosophy"];

function PhilosophySection({ copy }: { copy: PhilosophyCopy }) {
  return (
    <ScrollReveal>
      <section>
        <div className="space-y-10">
          <header className="space-y-4">
            <p className="eyebrow">
              {copy.badge}
            </p>
            <h2 className="font-display-serif text-2xl font-normal leading-[1.4] text-foreground md:text-3xl">
              {copy.title}
            </h2>
            <p className="text-base leading-[1.85] text-secondary md:text-lg">
              {copy.subtitle}
            </p>
          </header>
          <div className="grid gap-x-8 gap-y-10 md:grid-cols-3">
            {copy.pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="flex h-full flex-col border-t border-border pt-6"
              >
                <div className="flex items-center gap-3 text-foreground">
                  <pillar.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  <h3 className="font-display-serif text-lg font-normal leading-[1.5]">{pillar.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-[1.85] text-secondary">
                  {pillar.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

type SpacesCopy = ReturnType<typeof getAboutCopy>["spaces"];

function SpacesSection({ copy }: { copy: SpacesCopy }) {
  return (
    <ScrollReveal>
      <section className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
        <div className="space-y-10">
          <header className="space-y-4">
            <p className="eyebrow">
              {copy.badge}
            </p>
            <h2 className="font-display-serif text-2xl font-normal leading-[1.4] text-foreground md:text-3xl">
              {copy.title}
            </h2>
            <p className="text-base leading-[1.85] text-secondary md:text-lg">
              {copy.subtitle}
            </p>
          </header>
          <div className="grid gap-8">
            {copy.highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="flex items-start gap-4 border-t border-border pt-6"
              >
                <highlight.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} />
                <div className="space-y-2">
                  <p className="font-display-serif text-lg font-normal leading-[1.5] text-foreground">
                    {highlight.title}
                  </p>
                  <p className="text-sm leading-[1.85] text-secondary">
                    {highlight.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          {copy.gallery.map((item) => (
            <div
              key={item.alt}
              className="group relative h-64 overflow-hidden bg-accent/30 md:h-full"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/0" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="font-display-serif text-lg font-normal drop-shadow">{item.title}</p>
                <p className="mt-1 text-sm text-white/80 drop-shadow">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}

type CareCopy = ReturnType<typeof getAboutCopy>["care"];

function CareSection({ copy }: { copy: CareCopy }) {
  return (
    <ScrollReveal>
      <section className="bg-accent/35 px-6 py-12 md:px-10 md:py-16">
        <div className="space-y-10">
          <header className="space-y-4">
            <p className="eyebrow">
              {copy.badge}
            </p>
            <h2 className="font-display-serif text-2xl font-normal leading-[1.4] text-foreground md:text-3xl">
              {copy.title}
            </h2>
            <p className="text-base leading-[1.85] text-secondary md:text-lg">
              {copy.subtitle}
            </p>
          </header>
          <div className="grid gap-x-8 gap-y-10 md:grid-cols-3">
            {copy.cards.map((card) => (
              <article
                key={card.title}
                className="flex h-full flex-col gap-4 border-t border-border pt-6"
              >
                <div className="flex items-center gap-3 text-foreground">
                  <card.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  <h3 className="font-display-serif text-lg font-normal leading-[1.5]">{card.title}</h3>
                </div>
                <p className="text-sm leading-[1.85] text-secondary">
                  {card.body}
                </p>
                <ul className="mt-auto text-sm text-foreground/80">
                  {card.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 border-b border-border py-2.5">
                      <span className="h-px w-3 shrink-0 bg-primary" />
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
  );
}

type DailyFlowCopy = ReturnType<typeof getAboutCopy>["dailyFlow"];

function DailyFlowSection({ copy }: { copy: DailyFlowCopy }) {
  const timelineIcons = [ChefHat, Stethoscope, MoonStar] as const;
  const timelineImages = [
    blobUrl("img/about/us/morning.jpg"),
    blobUrl("img/about/us/afternoon.jpg"),
    blobUrl("img/about/us/evening.jpg"),
  ] as const;

  return (
    <ScrollReveal>
      <section>
        <header className="mx-auto mb-12 max-w-4xl space-y-4 text-center">
          <p className="eyebrow">
            {copy.badge}
          </p>
          <h2 className="break-keep font-display-serif text-3xl font-normal leading-[1.4] text-foreground md:text-4xl">
            {copy.title}
          </h2>
          <p className="mx-auto max-w-[30ch] break-keep text-base leading-[1.85] text-secondary md:max-w-3xl md:text-lg">
            {copy.subtitle}
          </p>
        </header>
        <div className="mt-8">
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
            {copy.timeline.map((item, index) => {
              const Icon = timelineIcons[index % timelineIcons.length];

              return (
                <article
                  key={item.title}
                  className="flex flex-col border-t border-border pt-6 text-left"
                >
                  <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden bg-accent/60">
                    <Image
                      src={timelineImages[index % timelineImages.length]}
                      alt={item.headline}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                      {item.title}
                    </p>
                  </div>

                  <div className="w-full">
                    <p className="mb-4 break-keep font-display-serif text-lg font-normal leading-[1.5] text-foreground">
                      {item.headline}
                    </p>

                    {item.focus?.length ? (
                      <div className="mb-5 flex flex-wrap gap-x-5 gap-y-2">
                        {item.focus.map((chip) => (
                          <span
                            key={chip}
                            className="font-sans text-xs tracking-wide text-secondary"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <ul className="space-y-3 text-sm text-foreground/80 text-left">
                      {item.points.map((point, pointIndex) => (
                        <li key={point} className="flex items-start gap-3">
                          <span className="mt-0.5 font-display-serif text-sm tabular-nums text-primary">
                            {pointIndex + 1}
                          </span>
                          <span className="leading-[1.75]">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>

          {copy.notice?.length ? (
            <div className="mt-12 border-t border-border pt-6">
              <p className="mb-5 inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                <Clock3 className="h-3 w-3" strokeWidth={1.5} />
                {copy.noticeTitle}
              </p>
              <div className="grid gap-4 md:grid-cols-3 md:gap-8">
                {copy.notice.map((note) => (
                  <div
                    key={note}
                    className="text-sm leading-[1.85] text-secondary"
                  >
                    <div className="flex items-start gap-2.5">
                      <CalendarCheck2 className="mt-1 h-4 w-4 flex-shrink-0 text-primary" strokeWidth={1.5} />
                      <span>{note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </ScrollReveal>
  );
}



type VirtualTourCopy = ReturnType<typeof getAboutCopy>["virtualTour"];

function VirtualTourSection({ copy }: { copy: VirtualTourCopy }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ScrollReveal>
      <section className="overflow-hidden">
        <div className="space-y-4 pb-8 text-center md:pb-10">
          <p className="eyebrow">
            {copy.badge}
          </p>
          <h2 className="break-keep font-display-serif text-3xl font-normal leading-[1.4] text-foreground md:text-4xl">
            {copy.title}
          </h2>
          <p className="mx-auto max-w-[30ch] text-base leading-[1.85] break-keep text-secondary md:max-w-3xl md:text-lg">
            {copy.subtitle}
          </p>
        </div>

        <div className="relative w-full h-[500px] md:h-[700px] bg-black group">
          {!isLoaded ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${blobUrl('img/infant/infant1.jpg')})` }}
              />
              <div className="absolute inset-0 bg-black/40" />

              <div className="relative z-10 flex flex-col items-center gap-6">
                <button
                  onClick={() => setIsLoaded(true)}
                  className="flex h-20 w-20 items-center justify-center border border-white/40 text-white transition-colors duration-300 hover:bg-white hover:text-black"
                  aria-label="Start Virtual Tour"
                >
                  <Play className="ml-1 h-8 w-8" strokeWidth={1.5} />
                </button>
                <div className="space-y-1">
                  <p className="text-lg font-medium text-white">
                    {copy.startLabel}
                  </p>
                  <p className="text-sm text-white/60">
                    Matterport 3D Tour
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <iframe
              src={copy.url}
              className="w-full h-full animate-in fade-in duration-700"
              allowFullScreen
              loading="lazy"
              allow="xr-spatial-tracking"
            />
          )}
        </div>
      </section>
    </ScrollReveal>
  );
}

type VideoCopy = ReturnType<typeof getAboutCopy>["video"];

function VideoSection({ copy }: { copy: VideoCopy }) {
  return (
    <ScrollReveal>
      <section className="overflow-hidden">
        <div className="relative aspect-video w-full bg-black">
          <VideoPlayer videoId={copy.youtubeId} />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 md:p-12 text-white">
            <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.35em] text-white/80">
              {copy.badge}
            </p>
            <h2 className="mb-2 font-display-serif text-3xl font-normal leading-[1.4] md:text-4xl">
              {copy.title}
            </h2>
            <p className="max-w-2xl text-base text-white/80 md:text-lg">
              {copy.subtitle}
            </p>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

function VideoPlayer({ videoId }: { videoId: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === "undefined") {
      setShouldPlay(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setShouldPlay(true);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const params = new URLSearchParams({
    autoplay: shouldPlay ? "1" : "0",
    mute: "1",
    playsinline: "1",
    controls: "1",
  }).toString();

  return (
    <div ref={containerRef} className="relative w-full pb-[56.25%]">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube.com/embed/${videoId}?${params}`}
        title="The Helia 3D Video"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function getAboutCopy(locale: Locale) {
  const isKo = locale === "ko";

  return {
    philosophy: {
      badge: isKo ? "더헬리아 철학" : "Our Philosophy",
      title: isKo
        ? "엄마와 아기를 위한 가장 따뜻한 첫 공간"
        : "A Gentle First Home for Mother and Baby",
      subtitle: isKo
        ? "더헬리아는 회복의 시간을 아름다운 기억으로 남길 수 있도록, 조용한 프라이빗 공간과 섬세한 케어를 제공합니다."
        : "The Helia transforms postpartum recovery into a calming, memorable chapter with quiet suites and attentive care.",
      pillars: [
        {
          icon: MoonStar,
          title: isKo ? "회복에 집중한 환경" : "Rest-Centered Environment",
          body: isKo
            ? "모든 객실을 넓은 통창과 이중창으로 설계, 개별 온도와 조명이 조절되는 객실, 쾌적한 침구와 어메니티로 산모의 컨디션을 가장 먼저 생각합니다."
            : "Personalised lighting, climate control, and curated amenities keep every suite aligned with your recovery needs.",
        },
        {
          icon: HeartHandshake,
          title: isKo ? "전담 케어팀의 동행" : "Dedicated Care Team",
          body: isKo
            ? "24시간 상주하는 간호 인력과 전문가들이 산모와 아기의 상태를 세심하게 살피고 필요한 순간을 함께합니다."
            : "Round-the-clock nurses and specialists monitor mother and baby with warmth, staying close when you need support.",
        },
      ],
    },
    spaces: {
      badge: isKo ? "공간 소개" : "Our Spaces",
      title: isKo ? "하루의 리듬을 품은 프라이빗 스위트" : "Private Suites Orchestrated for Every Rhythm",
      subtitle: isKo
        ? "프리미엄 객실, 라운지, 테라피 룸 등 더헬리아의 모든 공간은 산후 회복을 위해 전문적으로 설계되었습니다."
        : "Suites, lounges, and therapy rooms are purposefully designed to guide you through a gentle postpartum rhythm.",
      highlights: [
        {
          icon: Sparkles,
          title: isKo ? "프라이빗 스위트" : "Private Suite Experience",
          body: isKo
            ? "모든 객실은 단 하나의 가구처럼 설계된 독립형 스위트로, 산모님의 온전한 시간을 지켜드립니다."
            : "Each independent suite is arranged like a private residence, keeping every moment for you alone.",
        },
        {
          icon: Flower2,
          title: isKo ? "신생아 케어 존" : "Newborn Care Zone",
          body: isKo
            ? "전용 신생아실에서 24시간 전담 간호 인력이 케어하며, 수유와 모자동실 전환도 편안하게 이어집니다."
            : "A dedicated nursery with 24-hour nurses keeps little ones safe while supporting smooth transitions to rooming-in.",
        },
      ],
      gallery: [
        {
          src: "/img/private.jpg",
          alt: isKo
            ? "더헬리아 산후조리원 가족 전용 라운지 전경"
            : "Family lounge area at The Helia postpartum care center",
          title: isKo ? "조용한 프라이빗 존" : "Quiet Private Zone",
          body: isKo
            ? "자연광과 따뜻한 톤으로 완성한 라운지 존은 가족끼리만 사용하는 회유 공간으로 마련했습니다."
            : "A sunlit sitting area, reserved for families only, offers a calm retreat between moments of care.",
        },
        {
          src: "/img/infantroom.jpg",
          alt: isKo
            ? "더헬리아 산후조리원 신생아실 전경"
            : "Nursery room at The Helia postpartum care center",
          title: isKo ? "신생아실" : "Newborn Suite",
          body: isKo
            ? "따뜻한 조도와 안심 살균 시스템을 갖춘 신생아실에서 아기의 첫 시간을 전문적으로 돌봅니다."
            : "Warm lighting and advanced sanitisation keep the nursery perfect for your baby’s earliest moments.",
        },
        {
          src: "/img/headerpreview/prestige.jpg",
          alt: isKo
            ? "더헬리아 산후조리원 프라이빗 스위트 객실 전경"
            : "Private suite room at The Helia postpartum care center",
          title: isKo ? "프라이빗 스위트" : "Private Suite",
          body: isKo
            ? "조용한 휴식을 위해 모든 객실은 독립형 구조와 맞춤형 서비스를 제공합니다."
            : "Independent layouts and bespoke services offer a truly private retreat.",
        },
      ],
    },
    care: {
      badge: isKo ? "케어 프로그램" : "Care Programs",
      title: isKo ? "전문가와 함께하는 맞춤 회복 여정" : "A Tailored Recovery Journey with Specialists",
      subtitle: isKo
        ? "산모와 아기의 컨디션을 기반으로 한 케어 플랜과 다채로운 웰니스 프로그램이 준비되어 있습니다."
        : "Care plans are shaped around each mother's and baby's needs, complemented by restorative wellness experiences.",
      cards: [
        {
          icon: Stethoscope,
          title: isKo ? "의료 연계 & 모니터링" : "Medical Monitoring",
          body: isKo
            ? "상주 간호 인력의 빈틈 없는 케어로 산모의 산후 회복을 약속합니다."
            : "Resident nurses and partner clinicians monitor recovery progress and guide health check-ins.",
          points: isKo
            ? ["24시간 간호 스테이션", "모유 수유 컨설팅", "필요 시 전문의 연계"]
            : [
              "24-hour nursing station",
              "Breastfeeding & recovery consultations",
              "Direct link to specialists when needed",
            ],
        },
        {
          icon: Flower2,
          title: isKo ? "웰니스 & 테라피" : "Wellness Therapies",
          body: isKo
            ? "산전·산후 맞춤 테라피, 유방 관리, 림프 순환 관리 등 깊이 있는 힐링 프로그램을 제공합니다."
            : "Tailored pre/postnatal therapies, lactation care, and lymphatic programmes nurture deep healing.",
          points: isKo
            ? ["산모 전용 릴리프 테라피", "바디 밸런스 스트레칭", "프리미엄 스파 설비"]
            : [
              "Mother-focused relief therapies",
              "Body balance stretching sessions",
              "Premium spa facilities",
            ],
        },
        {
          icon: ChefHat,
          title: isKo ? "식이 & 라이프케어" : "Cuisine & Lifestyle Care",
          body: isKo
            ? "셰프·영양사와 함께 균형 잡힌 식단을 제공하며, 가족을 위한 티타임과 클래스도 마련했습니다."
            : "Chefs and nutritionists craft balanced menus, with family-friendly tea times and gentle workshops.",
          points: isKo
            ? ["계절 식재료 기반 맞춤 식단", "파트너 동반 티타임", "육아 클래스 & 홈케어 팁"]
            : [
              "Seasonal, personalised menus",
              "Partner-inclusive tea gatherings",
              "Parenting classes & at-home tips",
            ],
        },
      ],
    },
    dailyFlow: {
      badge: isKo ? "하루의 리듬" : "Daily Rhythm",
      title: isKo ? "더 헬리아에서의 하루, 이렇게 흐릅니다" : "A Day at The Helia",
      subtitle: isKo
        ? "식사, 모자동실, 케어 프로그램이 균형 있게 이어지는 하루 루틴을 안내드립니다."
        : "Our daily routine balances meals, rooming-in sessions, and care programs throughout the day.",
      noticeTitle: isKo ? "운영 안내" : "Operation Guide",
      notice: isKo
        ? [
            "바디 마사지는 월~토, 10:00~17:00 운영됩니다.",
            "가슴 마사지는 월·수·금, 10:00~13:30 운영됩니다.",
            "교육은 원내 비치된 교육 일정표를 기준으로 참여합니다.",
          ]
        : [
            "Body massage is available Monday to Saturday, 10:00-17:00.",
            "Breast care is available Monday, Wednesday, and Friday, 10:00-13:30.",
            "Classes follow the in-house education schedule board.",
          ],
      timeline: [
        {
          title: isKo ? "아침" : "Morning",
          headline: isKo ? "식사와 모자동실로 시작하는 시간" : "A Nourishing Start with Rooming-In",
          focus: isKo
            ? ["아침식사", "오전 모자동실", "오전간식"]
            : ["Breakfast", "Morning Rooming-In", "Morning Snack"],
          points: isKo
            ? [
              "아침 식사 후 오전 모자동실로 아기와 교감하는 시간을 가집니다.",
              "오전 간식과 함께 컨디션을 점검하고 수유·유축 루틴을 정리합니다.",
              "소아과 전문의와의 상담 (매주 수, 토 오전 8시 진행)",
            ]
            : [
              "After breakfast, mothers join a morning rooming-in session with their baby.",
              "A morning snack supports energy while feeding and pumping routines are reviewed.",
              "Nurses are available to align the day’s care plan as needed.",
            ],
        },
        {
          title: isKo ? "점심" : "Lunch & Afternoon",
          headline: isKo ? "회복 프로그램이 이어지는 시간" : "Recovery Programs Through the Day",
          focus: isKo
            ? ["점심·오후간식", "유축·교육", "바디·가슴 마사지"]
            : ["Lunch & Snack", "Pumping & Classes", "Body & Breast Care"],
          points: isKo
            ? [
              "점심 식사와 오후 간식이 제공되며 회복 리듬을 안정적으로 유지합니다.",
              "자유시간에는 유축, 교육 수업, 바디 마사지, 가슴 마사지를 선택해 이용할 수 있습니다.",
              "바디 마사지는 월~토(10:00~17:00), 가슴 마사지는 월·수·금(10:00~13:30) 운영됩니다.",
              "교육 프로그램은 원내 비치된 교육 일정표를 기준으로 참여 가능합니다.",
            ]
            : [
              "Lunch and an afternoon snack are served to keep your recovery rhythm steady.",
              "During free blocks, mothers may choose pumping, classes, body massage, or breast care.",
              "Body massage runs Monday to Saturday (10:00-17:00), and breast care runs Monday/Wednesday/Friday (10:00-13:30).",
              "Class participation follows the in-house education schedule board.",
            ],
        },
        {
          title: isKo ? "저녁" : "Evening",
          headline: isKo ? "모자동실과 휴식으로 마무리" : "Rooming-In and Rest to Close the Day",
          focus: isKo
            ? ["저녁식사", "저녁 모자동실", "저녁간식·취침준비"]
            : ["Dinner", "Evening Rooming-In", "Snack & Bedtime Prep"],
          points: isKo
            ? [
              "저녁 식사 후 저녁 모자동실로 하루를 따뜻하게 마무리합니다.",
              "저녁 간식은 모자동실 이후 또는 진행 중 편하게 드실 수 있도록 제공됩니다.",
              "늦은 저녁은 자유 휴식과 취침 준비 시간으로 운영됩니다.",
            ]
            : [
              "After dinner, an evening rooming-in session helps close the day with your baby.",
              "An evening snack is provided for flexible timing after or during rooming-in.",
              "Late evening is reserved for quiet free time and bedtime preparation.",
            ],
        },
      ],
    },
    closing: {
      badge: isKo ? "더헬리아 약속" : "Our Promise",
      title: isKo ? "당신의 회복 여정에 온기를 더합니다" : "We Add Warmth to Your Recovery Journey",
      description: isKo
        ? "더헬리아는 엄마와 가족이 마주하는 첫 시간을 존중합니다. 섬세한 공간 구성과 전문 케어, 그리고 다정한 환대를 통해 마음까지 편안한 시간을 선물합니다."
        : "The Helia honours the first days of every family. Thoughtful spaces, clinical expertise, and heartfelt hospitality deliver comfort that lingers far beyond the stay.",
      note: isKo
        ? "더헬리아는 모든 프로그램을 사전 예약제로 운영하며, 개인별 맞춤 케어 플랜을 상담 후 제안드립니다."
        : "All programmes operate by reservation, and each family receives a tailored care plan following consultation.",
    },
    video: {
      badge: isKo ? "공간 미리보기" : "Sneak Preview",
      title: isKo ? "더헬리아 산후조리원 3D 소개 영상" : "The Helia 3D Introduction",
      subtitle: isKo
        ? "3D 시선을 따라 더헬리아의 공간과 동선을 미리 경험해 보세요."
        : "Explore The Helia’s suites and flow through a 3D walkthrough.",
      youtubeId: "LYfst6ZKr1E",
    },
    virtualTour: {
      badge: isKo ? "가상 투어" : "Virtual Tour",
      title: isKo ? "더헬리아 가상 투어" : "The Helia Virtual Tour",
      subtitle: isKo
        ? "실제 산후조리원 공간을 생생하게 경험해보세요. 마우스나 터치를 사용하여 자유롭게 이동할 수 있습니다."
        : "Experience the postnatal care center vividly through our virtual tour. Move around freely using your mouse or touch.",
      url: "https://my.matterport.com/show/?m=R4vpe9ettqP",
      startLabel: isKo ? "3D 투어 시작하기" : "Start Virtual Tour",
    },
  };
}
