"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import ScrollFloat from "./ui/ScrollFloat";

type IntroSectionId = "intro" | "intro2";

type HomeIntroSectionProps = {
  onSectionMount?: (id: IntroSectionId, node: HTMLElement | null) => void;
};

export function HomeIntroSection({ onSectionMount }: HomeIntroSectionProps = {}) {
  const locale = useOptionalThemeLocale()?.locale ?? "ko";
  const theme = useOptionalThemeLocale()?.theme ?? "light";
  const copy = locale === "ko" ? KOREAN_COPY : ENGLISH_COPY;

  return (
    <>
      <section
        id="intro"
        ref={(node) => onSectionMount?.("intro", node)}
        className="snap-start flex min-h-screen w-full items-center bg-background px-6 py-16 text-secondary md:py-24"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-32">
          <PinnedCopy primary={copy.primaryText} secondary={copy.secondaryText} theme={theme}/>
        </div>
      </section>
      <section
        id="intro2"
        ref={(node) => onSectionMount?.("intro2", node)}
        className="snap-start flex min-h-screen w-full items-center bg-background px-6 py-16 text-secondary md:py-24"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-32">
          <ExperienceGrid items={copy.grid} />
        </div>
      </section>
    </>
  );
}

type PinnedCopyProps = {
  primary: string;
  secondary: string;
  theme: "light" | "dark";
};

export function PinnedCopy({ primary, secondary, theme }: PinnedCopyProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-12">
      {theme === "dark" ? 
      <Image
        src={"/img/logo/page_logo_white.png"}
        alt="homepage_logo"
        width={500}
        height={500}
      />
    : <Image
        src={"/img/logo/page_logo.png"}
        alt="homepage_logo"
        width={500}
        height={500}
      />}
      
      <PinnedBlock text={primary} />
      <PinnedBlock
        text={secondary}
        className="max-w-3xl leading-relaxed md:text-[24px] text-center"
      />
    </div>
  );
}

type PinnedBlockProps = {
  text: string;
  delay?: number;
  className?: string;
};

function PinnedBlock({ text, className }: PinnedBlockProps) {
  return (
      
        <ScrollFloat
            animationDuration={1}
            ease='back.inOut(2)'
            scrollStart='center bottom+=50%'
            scrollEnd='bottom bottom-=40%'
            stagger={0.03}
            textClassName={className}
          >
          {text}
        </ScrollFloat>
      
  );
}

export function ExperienceGrid({ items }: { items: typeof KOREAN_COPY.grid }) {
  return (
    <div className="space-y-12">
      {items.map((item, index) => (
        <div
          key={item.title}
          className="grid gap-20 md:grid-cols-2 md:items-center"
        >
          <motion.div
            className={`relative h-64 w-full overflow-hidden rounded-3xl border border-border/40 shadow-sm md:h-80 ${
              index % 2 === 1 ? "md:order-2" : ""
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority={index === 0}
            />
          </motion.div>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              {item.meta}
            </p>
            <h3 className="text-2xl font-semibold text-secondary md:text-3xl">
              {item.title}
            </h3>
            <p className="text-base leading-relaxed text-secondary/80">
              {item.description}
            </p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

const KOREAN_COPY = {
  primaryText: "최고의 시설과 세심한 배려를 담아\n잊지 못할 14일을 선사합니다.",
  secondaryText:
    "더헬리아 산후조리원은 최고의 시설과 차별화된 신생아 케어, 격이 다른 고품격 산모 케어 서비스를 제공함과 동시에 합리적인 가격을 책정했습니다. 모든 것이 준비된 최고의 공간에서 기억에 남는 14일을 선사합니다.",
  grid: [
    {
      title: "프라이빗 객실",
      description:
        "모든 객실은 독립형 스위트 구조로 설계되어 가족만의 시간을 온전히 지킬 수 있습니다. La Cloud 모션 베드와 헝가리산 구스 침구를 갖추어 편안한 14일의 여정을 완성합니다.",
      meta: "PRESTIGE · VVIP · VIP",
      image: { src: "/img/room/prestige.jpg", alt: "프라이빗 객실 전경" },
    },
    {
      title: "신생아실 케어",
      description:
        "전담 간호 인력이 24시간 상주하며 최신 살균 시스템과 맞춤 케어 프로토콜을 통해 아기의 컨디션을 세심하게 살핍니다. 모자동실 전환도 편안하게 이어집니다.",
      meta: "24H Nursery",
      image: { src: "/img/infantroom.jpg", alt: "더헬리아 신생아실" },
    },
    {
      title: "스파 & 웰니스",
      description:
        "산전·산후 맞춤 테라피와 림프 케어 프로그램으로 회복에 집중할 수 있는 시간을 선사합니다. 전용 테라피 룸에서 조용한 힐링을 경험하세요.",
      meta: "Helia Signature Spa",
      image: { src: "/img/spa/spa_1.png", alt: "스파 케어 공간" },
    },
  ],
} as const;

const ENGLISH_COPY = {
  primaryText: "Thoughtful care and premium amenities for an unforgettable 14-day stay.",
  secondaryText:
    "The Helia combines exceptional suites with differentiated newborn care and premium recovery services, while keeping pricing reasonable. Every detail is prepared so you can remember these 14 days as the most comforting chapter.",
  grid: [
    {
      title: "Private Suites",
      description:
        "Independent suite layouts safeguard precious family time. La Cloud motion beds and Hungarian down bedding ensure deep rest throughout your stay.",
      meta: "PRESTIGE · VVIP · VIP",
      image: { src: "/img/main/homepage_4.jpg", alt: "Private suite view" },
    },
    {
      title: "Nursery Care",
      description:
        "Round-the-clock nursing staff oversee each newborn with advanced sterilisation and tailored protocols, keeping rooming-in transitions seamless.",
      meta: "24H Nursery",
      image: { src: "/img/신생아 메인.jpg", alt: "Nursery facility" },
    },
    {
      title: "Spa & Wellness",
      description:
        "Pre- and postnatal therapies, lymphatic programs, and private treatment rooms offer a serene healing experience tailored to each mother.",
      meta: "Helia Signature Spa",
      image: { src: "/img/main/homepage_5.jpg", alt: "Spa and therapy room" },
    },
  ],
} as const;
