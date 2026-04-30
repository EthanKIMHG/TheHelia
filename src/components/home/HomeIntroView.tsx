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
        className="flex min-h-[60vh] w-full items-center justify-center bg-background px-6 py-12 text-foreground md:py-20"
      >
        <ScrollReveal className="mx-auto flex w-full max-w-4xl flex-col items-start gap-12 text-left md:items-center md:text-center">
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
    <div className="flex w-full flex-col items-start gap-10 text-left md:items-center md:text-center">
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
        className="text-2xl leading-[1.28] break-keep text-foreground md:text-5xl md:leading-tight"
        animationDuration={1}
      />
      <IntroTextReveal
        text={secondary}
        className="max-w-[30ch] text-lg leading-relaxed text-foreground break-keep md:mx-auto md:max-w-3xl md:text-[20px]"
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
    "더헬리아 산후조리원은 타협하지 않는 하이엔드 시설과 독보적인 신생아 케어 시스템, 그리고 산모님을 위한 격조 높은 서비스를 약속합니다. \n모든 것이 완벽하게 준비된 최고의 공간에서, 가격 이상의 가치를 경험해 보세요. \n당신의 기억 속에 영원히 남을 선물 같은 14일을 선사하겠습니다.",
  grid: [
    {
      title: "프라이빗 객실",
      description:
        "아늑하고 쾌적한 프라이빗 공간에서 시간을 보내며 산후 회복에 집중하실 수 있습니다.",
      meta: "VIP · VVIP · PRESTIGE",
      image: {
        src: "/img/room/prestige1.jpg",
        alt: "더헬리아 프레스티지 스위트 객실 전경",
      },
      bullets: [
        "La Cloud 모션베드 구비",
        "Medela 유축기 구비",
        "Dyson, LG 가전 라인업",
      ],
      badge: "Signature Suites",
    },
    {
      title: "신생아실 케어",
      description:
        "24시간 전문 간호 인력이 상주하며 아가들의 컨디션을 세심하게 살핍니다",
      meta: "24H Nursery",
      image: {
        src: "/img/infantroom.jpg",
        alt: "더헬리아 산후조리원 신생아실 케어 공간",
      },
      bullets: [
        "1 신생아 1 거치대 구비",
        "베지넷 간 100cm 간격 유지",
        "1 신생아 1 욕조 사용",
      ],
      badge: "Care Protocol",
      
    },
    {
      title: "스파 & 웰니스",
      description:
        "임신과 출산으로 인해 지친 몸과 마음을 회복할 수 있는 시간을 선사합니다.",
      meta: "Helia Signature Spa",
      image: {
        src: "/img/spa/spa_1.png",
        alt: "더헬리아 산모 스파 케어 공간",
      },
      bullets: [
        "산전 및 산후 맞춤 관리",
        "헤드스파 및 페이셜 관리",
        "가슴 관리",
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
        "Spend time in a cozy, comfortable private space while focusing on postpartum recovery.",
      meta: "VIP · VVIP · PRESTIGE",
      image: {
        src: "/img/room/prestige1.jpg",
        alt: "Prestige suite room at The Helia postpartum care center",
      },
      bullets: [
        "Equipped with La Cloud motion beds",
        "Equipped with Medela breast pumps",
        "Dyson and LG appliance lineup",
      ],
      badge: "Signature Suites",
    },
    {
      title: "Nursery Care",
      description:
        "Professional nursing staff are on site 24 hours a day, carefully monitoring each baby's condition.",
      meta: "24H Nursery",
      image: {
        src: "/img/infantroom.jpg",
        alt: "Nursery care room at The Helia postpartum care center",
      },
      bullets: [
        "One stand provided per newborn",
        "100 cm spacing maintained between bassinets",
        "One bathtub used per newborn",
      ],
      badge: "Care Protocol",
    },
    {
      title: "Spa & Wellness",
      description:
        "A restorative experience designed to help the body and mind recover from pregnancy and childbirth.",
      meta: "Helia Signature Spa",
      image: {
        src: "/img/spa/spa_1.png",
        alt: "Spa care room for mothers at The Helia postpartum care center",
      },
      bullets: [
        "Customized prenatal and postpartum care",
        "Head spa and facial care",
        "Breast care",
      ],
      badge: "Wellness Journey",
    },
  ],
};
