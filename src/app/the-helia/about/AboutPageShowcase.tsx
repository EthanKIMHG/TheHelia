"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Baby,
  CalendarCheck2,
  ChefHat,
  Flower2,
  HeartHandshake,
  MoonStar,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import type { Locale } from "@/components/header/types";

type AboutPageShowcaseProps = {
  locale: Locale;
};

export function AboutPageShowcase({ locale }: AboutPageShowcaseProps) {
  const copy = getAboutCopy(locale);

  return (
    <div className="space-y-16">
      <PhilosophySection copy={copy.philosophy} />
      <SpacesSection copy={copy.spaces} />
      <CareSection copy={copy.care} />
      <VideoSection copy={copy.video} />
    </div>
  );
}

type PhilosophyCopy = ReturnType<typeof getAboutCopy>["philosophy"];

function PhilosophySection({ copy }: { copy: PhilosophyCopy }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-primary/10 via-background/85 to-background">
      <div className="space-y-8 p-8 md:p-12">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            {copy.badge}
          </p>
          <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
            {copy.title}
          </h2>
          <p className="text-base leading-relaxed text-foreground/70 md:text-lg">
            {copy.subtitle}
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          {copy.pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="flex h-full flex-col justify-between rounded-2xl border border-border/40 bg-background/95 p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 text-foreground">
                <pillar.icon className="h-9 w-9 text-primary" />
                <h3 className="text-lg font-semibold">{pillar.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                {pillar.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type SpacesCopy = ReturnType<typeof getAboutCopy>["spaces"];

function SpacesSection({ copy }: { copy: SpacesCopy }) {
  return (
    <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6 rounded-3xl border border-border/30 bg-background/95 p-8 shadow-sm">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            {copy.badge}
          </p>
          <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
            {copy.title}
          </h2>
          <p className="text-base leading-relaxed text-foreground/70 md:text-lg">
            {copy.subtitle}
          </p>
        </header>
        <div className="grid gap-4">
          {copy.highlights.map((highlight) => (
            <div
              key={highlight.title}
              className="flex items-start gap-4 rounded-2xl border border-border/30 bg-background/90 p-5 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <highlight.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-foreground">
                  {highlight.title}
                </p>
                <p className="text-sm leading-relaxed text-foreground/70">
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
            className="group relative h-64 overflow-hidden rounded-3xl border border-border/30 shadow-md md:h-full"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/0" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-lg font-semibold">{item.title}</p>
              <p className="mt-1 text-sm text-white/80">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

type CareCopy = ReturnType<typeof getAboutCopy>["care"];

function CareSection({ copy }: { copy: CareCopy }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-border/30 bg-gradient-to-br from-primary/5 via-background to-background shadow">
      <div className="space-y-8 p-8 md:p-12">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            {copy.badge}
          </p>
          <h2 className="text-2xl font-semibold text-foreground md:text-3xl">
            {copy.title}
          </h2>
          <p className="text-base leading-relaxed text-foreground/70 md:text-lg">
            {copy.subtitle}
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {copy.cards.map((card) => (
            <article
              key={card.title}
              className="flex h-full flex-col gap-4 rounded-2xl border border-border/30 bg-background/95 p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 text-foreground">
                <card.icon className="h-8 w-8 text-primary" />
                <h3 className="text-lg font-semibold">{card.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-foreground/70">
                {card.body}
              </p>
              <ul className="mt-auto space-y-2 text-sm text-foreground/70">
                {card.points.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type DailyFlowCopy = ReturnType<typeof getAboutCopy>["dailyFlow"];

function DailyFlowSection({ copy }: { copy: DailyFlowCopy }) {
  return (
    <section className="rounded-3xl border border-border/30 bg-background/95 p-8 shadow-sm md:p-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          {copy.badge}
        </p>
        <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
          {copy.title}
        </h2>
        <p className="text-base leading-relaxed text-foreground/70 md:text-lg">
          {copy.subtitle}
        </p>
      </header>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {copy.timeline.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border/30 bg-background p-6 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <CalendarCheck2 className="h-6 w-6 text-primary" />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
                {item.title}
              </p>
            </div>
            <p className="mt-3 text-lg font-semibold text-foreground">
              {item.headline}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-foreground/70">
              {item.points.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

type ClosingCopy = ReturnType<typeof getAboutCopy>["closing"];

function ClosingSection({ copy }: { copy: ClosingCopy }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-border/30 bg-gradient-to-r from-primary/20 via-primary/15 to-primary/20 p-[1px] shadow-lg">
      <div className="h-full rounded-[calc(1.5rem-1px)] bg-background/95 p-8 md:p-12">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              {copy.badge}
            </p>
            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
              {copy.title}
            </h2>
            <p className="text-base leading-relaxed text-foreground/75 md:text-lg">
              {copy.description}
            </p>
          </div>
          <div className="rounded-2xl border border-border/30 bg-background/90 p-6 text-sm text-foreground/70 shadow-sm">
            <p>{copy.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

type VideoCopy = ReturnType<typeof getAboutCopy>["video"];

function VideoSection({ copy }: { copy: VideoCopy }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-border/30 bg-background/95 shadow-lg">
      <div className="space-y-6 p-8 md:p-10">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            {copy.badge}
          </p>
          <h2 className="text-3xl font-semibold text-foreground md:text-4xl">
            {copy.title}
          </h2>
          <p className="text-base leading-relaxed text-foreground/70 md:text-lg">
            {copy.subtitle}
          </p>
        </header>
        <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-black shadow-md">
          <VideoPlayer videoId={copy.youtubeId} />
        </div>
      </div>
    </section>
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
        {
          icon: Baby,
          title: isKo ? "가족을 위한 배려" : "Thoughtful for Families",
          body: isKo
            ? "파트너와 가족도 편안히 머무를 수 있도록 라운지, 티타임, 육아 교육까지 포함한 프로그램을 준비했습니다."
            : "Lounges, tea service, and parenting sessions welcome partners and family members into the journey with ease.",
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
            ? "모든 객실은 단 하나의 가구처럼 설계된 독립형 스위트로, 산모와 가족만의 온전한 시간을 지켜드립니다."
            : "Each independent suite is arranged like a private residence, keeping every moment for you and your family alone.",
        },
        {
          icon: Flower2,
          title: isKo ? "신생아 케어 존" : "Newborn Care Zone",
          body: isKo
            ? "전용 신생아실에서 24시간 전담 간호사가 케어하며, 수유와 모자동실 전환도 편안하게 이어집니다."
            : "A dedicated nursery with 24-hour nurses keeps little ones safe while supporting smooth transitions to rooming-in.",
        },
        {
          icon: ShieldCheck,
          title: isKo ? "아기 케어 스테이션" : "Baby Care Station",
          body: isKo
            ? "24시간 모니터링이 가능한 아기 케어 룸과 수유실, 특화된 살균 시스템으로 안심 케어를 보장합니다."
            : "A dedicated nursery, feeding room, and advanced sanitisation systems ensure round-the-clock peace of mind.",
        },
      ],
      gallery: [
        {
          src: "/img/private.jpg",
          alt: isKo ? "더헬리아 라운지" : "The Helia lounge",
          title: isKo ? "조용한 프라이빗 존" : "Quiet Private Zone",
          body: isKo
            ? "자연광과 따뜻한 톤으로 완성한 라운지 존은 가족끼리만 사용하는 회유 공간으로 마련했습니다."
            : "A sunlit sitting area, reserved for families only, offers a calm retreat between moments of care.",
        },
        {
          src: "/img/infantroom.jpg",
          alt: isKo ? "신생아실" : "Newborn nursery",
          title: isKo ? "신생아실" : "Newborn Suite",
          body: isKo
            ? "따뜻한 조도와 안심 살균 시스템을 갖춘 신생아실에서 아기의 첫 시간을 전문적으로 돌봅니다."
            : "Warm lighting and advanced sanitisation keep the nursery perfect for your baby’s earliest moments.",
        },
        {
          src: "/img/headerpreview/prestige.jpg",
          alt: isKo ? "프라이빗 스위트" : "Private suite",
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
            ? "상주 간호 인력과 협력 의료진이 회복 상황을 모니터링하며 건강 체크를 지원합니다."
            : "Resident nurses and partner clinicians monitor recovery progress and guide health check-ins.",
          points: isKo
            ? ["24시간 간호 스테이션", "모유 수유, 회복 컨설팅", "필요 시 전문의 연계"]
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
      title: isKo ? "더헬리아에서의 하루, 이렇게 흐릅니다" : "A Day at The Helia",
      subtitle: isKo
        ? "휴식과 케어, 맛있는 식사와 가족의 시간을 조화롭게 담았습니다."
        : "Each day balances rest, care, nourishing meals, and meaningful family moments.",
      timeline: [
        {
          title: isKo ? "아침" : "Morning",
          headline: isKo ? "사랑스러운 시작" : "A Gentle Beginning",
          points: isKo
            ? [
                "맞춤 웨이크업 & 티타임",
                "건강한 모닝 케어와 바이탈 체크",
                "전담 간호사와 회복 컨설팅",
              ]
            : [
                "Personalised wake-up & morning tea",
                "Vital checks with gentle morning care",
                "Recovery consultation with assigned nurse",
              ],
        },
        {
          title: isKo ? "낮" : "Afternoon",
          headline: isKo ? "돌봄과 힐링의 시간" : "Moments of Care & Healing",
          points: isKo
            ? [
                "테라피 & 스파 프로그램",
                "영양 식단과 프라이빗 티라운지",
                "파트너와 함께하는 라운지 타임",
              ]
            : [
                "Therapy and spa programmes",
                "Balanced meals & private tea lounge",
                "Shared lounge time with partners",
              ],
        },
        {
          title: isKo ? "저녁" : "Evening",
          headline: isKo ? "포근한 마무리" : "A Warm Closing",
          points: isKo
            ? [
                "베이비 나잇 케어 & 수유 지원",
                "아로마 티와 취침 준비",
                "다음 날 컨디션 점검 및 가정 돌봄 가이드",
              ]
            : [
                "Baby night care & feeding support",
                "Aroma tea and bedtime preparation",
                "Next-day check-in with at-home tips",
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
      title: isKo ? "더 헬리아 산후조리원 3D 소개 영상" : "The Helia 3D Introduction",
      subtitle: isKo
        ? "3D 시선을 따라 더헬리아의 공간과 동선을 미리 경험해 보세요."
        : "Explore The Helia’s suites and flow through a 3D walkthrough.",
      youtubeId: "LYfst6ZKr1E",
    },
  };
}
