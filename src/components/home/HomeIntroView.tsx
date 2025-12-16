"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import { motion } from "framer-motion";

import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import { DEFAULT_BLUR_DATA_URL } from "@/lib/blur-placeholder";
import clsx from "clsx";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { BentoGridShowcase } from "./BentoGridShowcase";

type HomeIntroViewProps = {
  onSectionMount?: (id: string, node: HTMLElement | null) => void;
};

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
        className="flex min-h-[60vh] w-full items-center justify-center bg-background px-6 py-12 text-secondary md:py-20"
      >
        <ScrollReveal className="mx-auto flex w-full max-w-4xl flex-col items-center gap-12 text-center">
          <IntroHeroContent
            primary={copy.primaryText}
            secondary={copy.secondaryText}
            theme={theme}
          />
        </ScrollReveal>
      </section>

      <BentoGridShowcase
        highlights={copy.grid.map((item) => ({
          meta: item.meta,
          title: item.title,
          description: item.description,
          image: item.image.src,
          imageAlt: item.image.alt,
          bullets: item.bullets,
          badge: item.badge,
        }))}
        onSectionMount={registerSection}
      />
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
        className="text-2xl md:text-5xl text-foreground"
        animationDuration={1}
      />
      <IntroTextReveal
        text={secondary}
        className="max-w-3xl text-lg leading-relaxed md:text-[22px] text-secondary"
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
  animationDuration = 1,
}: IntroTextRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-10%" }} // Changed once: true to false for re-triggering if needed, but ScrollReveal wrapper handles main scrub
      transition={{ 
        duration: animationDuration, 
        ease: [0.22, 1, 0.36, 1] // Premium ease curve
      }}
      className={clsx("whitespace-pre-line", className)}
    >
      {text}
    </motion.div>
  );
}

const KOREAN_COPY = {
  primaryText: "최고의 시설과 세심한 배려를 담아 \n잊지 못할 14일을 선사합니다.",
  secondaryText:
    "더헬리아 산후조리원은 최고의 시설과 차별화된 신생아 케어, \n격이 다른 고품격 산모 케어 서비스를 제공함과 동시에 합리적인 가격을 책정했습니다. \n모든 것이 준비된 최고의 공간에서 기억에 남는 14일을 선사합니다.",
  grid: [
    {
      title: "프라이빗 객실",
      description:
        "모든 객실은 독립형 스위트 구조로 설계되어 산모님의 프라이빗한 시간을 온전히 지킬 수 있습니다. \n전 객실 La Cloud 모션베드 & Body Friend 안마의자 & Medela 유축기 구비",
      meta: "PRESTIGE · VVIP · VIP",
      image: { src: "/img/room/prestige1.jpg", alt: "프라이빗 객실 전경" },
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
      image: { src: "/img/room/prestige1.jpg", alt: "Private suite view" },
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
      image: { src: "/img/infantroom.jpg", alt: "Nursery facility" },
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
      image: { src: "/img/spa/spa_1.png", alt: "Spa and therapy room" },
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
