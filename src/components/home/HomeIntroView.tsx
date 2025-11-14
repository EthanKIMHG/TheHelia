"use client";

import AnimatedTextReveal from "@/components/common/AnimatedTextReveal";
import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import { DEFAULT_BLUR_DATA_URL } from "@/lib/blur-placeholder";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  HomeExperienceGallery,
  HomeExperienceStacked,
  HomeExperienceTilted,
  type HomeExperienceHighlight,
} from "./HomeExperienceShowcase";

type HomeIntroViewProps = {
  onSectionMount?: (id: string, node: HTMLElement | null) => void;
};

const SHOWCASE_SEQUENCE = ["stacked", "tilted", "perspective"] as const;
const SHOWCASE_COMPONENTS = {
  stacked: HomeExperienceStacked,
  tilted: HomeExperienceTilted,
  perspective: HomeExperienceGallery,
} as const;

export function HomeIntroView({
  onSectionMount,
}: HomeIntroViewProps = {}) {
  const themeLocale = useOptionalThemeLocale();
  const locale = themeLocale?.locale ?? "ko";
  const theme = themeLocale?.theme ?? "light";
  const copy = locale === "ko" ? KOREAN_COPY : ENGLISH_COPY;
  const [isMobile, setIsMobile] = useState(false);
  const registerSection = useCallback(
    (id: string, node: HTMLElement | null) => {
      onSectionMount?.(id, node);
    },
    [onSectionMount],
  );

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  return (
    <>
      <section
        id="intro"
        ref={(node) => registerSection("intro", node)}
        className="flex min-h-screen w-full items-center justify-center bg-background px-6 py-12 text-secondary md:py-16"
      >
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-12 text-center">
          <IntroHeroContent
            primary={copy.primaryText}
            secondary={copy.secondaryText}
            theme={theme}
          />
        </div>
      </section>

      {copy.grid.map((item, index) => {
        const variant = SHOWCASE_SEQUENCE[index % SHOWCASE_SEQUENCE.length];
        const highlight: HomeExperienceHighlight = {
          meta: item.meta,
          title: item.title,
          description: item.description,
          image: item.image.src,
          imageAlt: item.image.alt,
          bullets: item.bullets,
          badge: item.badge,
        };

        return (
          <HomeShowcaseSlot
            key={item.title}
            id={`intro-experience-${index}`}
            variant={variant}
            highlight={highlight}
            register={(node) =>
              registerSection(`intro-experience-${index}`, node)
            }
            order={
              isMobile
                ? "image-first"
                : index % 2 === 1
                  ? "text-first"
                  : "image-first"
            }
          />
        );
      })}
    </>
  );
}

type IntroHeroContentProps = {
  primary: string;
  secondary: string;
  theme: "light" | "dark";
};

function IntroHeroContent({ primary, secondary, theme }: IntroHeroContentProps) {
  const logoSrc =
    theme === "dark"
      ? "/img/logo/page_logo_white.png"
      : "/img/logo/page_logo.png";

  return (
    <div className="flex flex-col items-center gap-10 text-center">
      <div className="relative">
        <Image
          src={logoSrc}
          alt="The Helia emblem"
          width={260}
          height={120}
          className="object-contain"
          priority
          placeholder="blur"
          blurDataURL={DEFAULT_BLUR_DATA_URL}
        />
      </div>

      <IntroTextReveal
        text={primary}
        scrub={false}
        className="text-2xl md:text-5xl"
        animationDuration={1}
      />
      <IntroTextReveal
        text={secondary}
        className="max-w-3xl text-lg leading-relaxed md:text-[22px]"
        scrub={false}
        scrollStart="top bottom"
        scrollEnd="center center"
        animationDuration={1.4}
      />
    </div>
  );
}

type IntroTextRevealProps = {
  text: string;
  className?: string;
  scrub?: boolean;
  scrollStart?: string;
  scrollEnd?: string;
  animationDuration?: number;
};

function IntroTextReveal({
  text,
  className,
  scrub = true,
  scrollStart,
  scrollEnd,
  animationDuration,
}: IntroTextRevealProps) {
  return (
    <AnimatedTextReveal
      animationDuration={animationDuration ?? 1.6}
      ease="back.inOut(1)"
      scrollStart={scrollStart ?? "center bottom+=50%"}
      scrollEnd={scrollEnd ?? "bottom bottom-=40%"}
      stagger={0.07}
      scrub={scrub}
      textClassName={className}
    >
      {text}
    </AnimatedTextReveal>
  );
}

const KOREAN_COPY = {
  primaryText: "최고의 시설과 세심한 배려를 담아 잊지 못할 14일을 선사합니다.",
  secondaryText:
    "더헬리아 산후조리원은 최고의 시설과 차별화된 신생아 케어, 격이 다른 고품격 산모 케어 서비스를 제공함과 동시에 합리적인 가격을 책정했습니다. 모든 것이 준비된 최고의 공간에서 기억에 남는 14일을 선사합니다.",
  grid: [
    {
      title: "프라이빗 객실",
      description:
        "모든 객실은 독립형 스위트 구조로 설계되어 가족만의 시간을 온전히 지킬 수 있습니다. La Cloud 모션 베드와 헝가리산 구스 침구를 갖추어 편안한 14일의 여정을 완성합니다.",
      meta: "PRESTIGE · VVIP · VIP",
      image: { src: "/img/room/prestige.jpg", alt: "프라이빗 객실 전경" },
      bullets: [
        "독립형 투룸 구조와 라운지",
        "헝가리산 구스 침구 & La Cloud 모션 베드",
        "Dyson, LG 하이엔드 공조 라인업",
        "파트너를 위한 라운지 케이터링",
      ],
      badge: "Signature Suites",
    },
    {
      title: "신생아실 케어",
      description:
        "전담 간호 인력이 24시간 상주하며 최신 살균 시스템과 맞춤 케어 프로토콜을 통해 아기의 컨디션을 세심하게 살핍니다. 모자동실 전환도 편안하게 이어집니다.",
      meta: "24H Nursery",
      image: { src: "/img/infantroom.jpg", alt: "더헬리아 신생아실" },
      bullets: [
        "간호사 24시간 상주 & 1:3 케어 비율",
        "스마트 모니터링 시스템으로 실시간 체크",
        "UV 살균과 항균 공조 설비",
        "모자동실 전환 프로그램",
      ],
      badge: "Care Protocol",
    },
    {
      title: "스파 & 웰니스",
      description:
        "산전·산후 맞춤 테라피와 림프 케어 프로그램으로 회복에 집중할 수 있는 시간을 선사합니다. 전용 테라피 룸에서 조용한 힐링을 경험하세요.",
      meta: "Helia Signature Spa",
      image: { src: "/img/spa/spa_1.png", alt: "스파 케어 공간" },
      bullets: [
        "산전·산후 맞춤 바디 리커버리",
        "림프 드레이닝 & 체형 밸런스 프로그램",
        "천연 아로마 블렌딩 테라피",
        "전용 테라피 라운지와 티 세션",
      ],
      badge: "Wellness Journey",
    },
  ],
};

const ENGLISH_COPY = {
  primaryText:
    "Thoughtful care and premium amenities for an unforgettable 14-day stay.",
  secondaryText:
    "The Helia combines exceptional suites with differentiated newborn care and premium recovery services, while keeping pricing reasonable. Every detail is prepared so you can remember these 14 days as the most comforting chapter.",
  grid: [
    {
      title: "Private Suites",
      description:
        "Independent suite layouts safeguard precious family time. La Cloud motion beds and Hungarian down bedding ensure deep rest throughout your stay.",
      meta: "PRESTIGE · VVIP · VIP",
      image: { src: "/img/main/homepage_4.jpg", alt: "Private suite view" },
      bullets: [
        "Two-room layouts with dedicated lounge zone",
        "Hungarian goose bedding & La Cloud motion beds",
        "Dyson & LG premium air and care devices",
        "Curated tea service for partners and family",
      ],
      badge: "Signature Suites",
    },
    {
      title: "Nursery Care",
      description:
        "Round-the-clock nursing staff oversee each newborn with advanced sterilisation and tailored protocols, keeping rooming-in transitions seamless.",
      meta: "24H Nursery",
      image: { src: "/img/신생아 메인.jpg", alt: "Nursery facility" },
      bullets: [
        "24-hour nurse presence with 1:3 care ratio",
        "Smart monitoring with real-time updates",
        "UV sterilisation & hospital-grade sanitation",
        "Guided transition into rooming-in routines",
      ],
      badge: "Care Protocol",
    },
    {
      title: "Spa & Wellness",
      description:
        "Pre- and postnatal therapies, lymphatic programs, and private treatment rooms offer a serene healing experience tailored to each mother.",
      meta: "Helia Signature Spa",
      image: { src: "/img/main/homepage_5.jpg", alt: "Spa and therapy room" },
      bullets: [
        "Prenatal & postpartum body recovery blends",
        "Lymphatic drainage and posture balance work",
        "Custom aromatherapy rituals",
        "Private therapy lounge with curated tea service",
      ],
      badge: "Wellness Journey",
    },
  ],
};

type HomeShowcaseSlotProps = {
  id: string;
  variant: (typeof SHOWCASE_SEQUENCE)[number];
  highlight: HomeExperienceHighlight;
  order: "text-first" | "image-first";
  register: (node: HTMLElement | null) => void;
};

function HomeShowcaseSlot({
  id,
  variant,
  highlight,
  order,
  register,
}: HomeShowcaseSlotProps) {
  const [visible, setVisible] = useState(false);
  const placeholderRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = placeholderRef.current;
    if (!node || visible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -20%", threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    return () => register(null);
  }, [register]);

  if (!visible) {
    return (
      <section
        id={id}
        ref={(node) => {
          placeholderRef.current = node;
          register(node);
        }}
        className="flex min-h-screen w-full items-center justify-center bg-background px-6 py-16 text-secondary md:py-24"
      >
        <div className="flex h-full w-full max-w-6xl items-center justify-center rounded-3xl border border-dashed border-border/60 bg-background/60 text-secondary/40">
          <span className="text-sm font-semibold uppercase tracking-[0.3em]">
            Section is loading…
          </span>
        </div>
      </section>
    );
  }

  const ShowcaseComponent = SHOWCASE_COMPONENTS[variant];
  return (
    <ShowcaseComponent
      id={id}
      sectionRef={(node) => register(node)}
      highlight={highlight}
      order={order}
    />
  );
}
