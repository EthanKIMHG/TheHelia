"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import { GlassCard } from "@/components/ui/glass/GlassCard";
import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import {
  ArrowRight,
  Flower2,
  HeartHandshake,
  Sparkles,
  Waves,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { SpaBrandIntro } from "./SpaBrandIntro";
import { SpaServiceBento } from "./SpaServiceBento";
import { SpaServiceCarousel } from "./SpaServiceCarousel";

type OverviewCard = {
  id: string;
  Icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
};

type SpaPageCopy = {
  overview: {
    badge: string;
    title: string;
    description: string;
    noteTitle: string;
    noteBody: string;
    actionLabel: string;
  };
  badge: string;
  headline: string;
  intro: string;
  thalac: {
    title: string;
    description: string;
    features: {
      icon: "crown" | "sparkles" | "shield";
      title: string;
      description: string;
    }[];
  };
  headSpa: {
    badge: string;
    title: string;
    summary: string;
    description: string;
    images: {
      src: string;
      alt: string;
      caption: string;
    }[];
    features: {
      title: string;
      items: string[];
    }[];
  };
  prenatal: {
    badge: string;
    title: string;
    summary: string;
    description: string;
    images: {
      src: string;
      alt: string;
    }[];
    features: {
      title: string;
      items: string[];
    }[];
  };
  postpartum: {
    badge: string;
    title: string;
    summary: string;
    description: string;
    images: {
      src: string;
      alt: string;
    }[];
    features: {
      title: string;
      items: string[];
    }[];
  };
  breastCare: {
    badge: string;
    title: string;
    summary: string;
    description: string;
    images: {
      src: string;
      alt: string;
    }[];
    features: {
      title: string;
      items: string[];
    }[];
  };
  cta: {
    title: string;
    description: string;
    button: string;
    note: string;
  };
};

export function HeliaSpaPageContent() {
  const themeLocale = useOptionalThemeLocale();
  const locale = themeLocale?.locale ?? "ko";
  const isKo = locale === "ko";
  const copy: SpaPageCopy = isKo ? KOREAN_COPY : ENGLISH_COPY;
  const programCards: OverviewCard[] = [
    {
      id: "head-spa",
      Icon: Waves,
      badge: copy.headSpa.badge,
      title: copy.headSpa.title,
      description: copy.headSpa.summary,
    },
    {
      id: "prenatal",
      Icon: Flower2,
      badge: copy.prenatal.badge,
      title: copy.prenatal.title,
      description: copy.prenatal.summary,
    },
    {
      id: "postpartum",
      Icon: Sparkles,
      badge: copy.postpartum.badge,
      title: copy.postpartum.title,
      description: copy.postpartum.summary,
    },
    {
      id: "breast-care",
      Icon: HeartHandshake,
      badge: copy.breastCare.badge,
      title: copy.breastCare.title,
      description: copy.breastCare.summary,
    },
  ];

  return (
    <div className="flex w-full flex-col gap-16 pb-24">
      <SpaBrandIntro copy={copy} />
      <SpaProgramOverview copy={copy.overview} cards={programCards} />

      <div className="mt-4 flex flex-col gap-24">
        <div id="head-spa" className="scroll-mt-28">
          <SpaServiceCarousel
            badge={copy.headSpa.badge}
            title={copy.headSpa.title}
            description={copy.headSpa.description}
            images={copy.headSpa.images}
            features={copy.headSpa.features}
          />
        </div>

        <div id="prenatal" className="scroll-mt-28">
          <SpaServiceBento
            badge={copy.prenatal.badge}
            title={copy.prenatal.title}
            description={copy.prenatal.description}
            images={copy.prenatal.images}
            features={copy.prenatal.features}
          />
        </div>

        <div id="postpartum" className="scroll-mt-28">
          <SpaServiceBento
            badge={copy.postpartum.badge}
            title={copy.postpartum.title}
            description={copy.postpartum.description}
            images={copy.postpartum.images}
            features={copy.postpartum.features}
            reversed
          />
        </div>

        <div id="breast-care" className="scroll-mt-28">
          <SpaServiceBento
            badge={copy.breastCare.badge}
            title={copy.breastCare.title}
            description={copy.breastCare.description}
            images={copy.breastCare.images}
            features={copy.breastCare.features}
          />
        </div>
      </div>

      <SpaPageCta locale={locale} copy={copy.cta} />
    </div>
  );
}

function SpaProgramOverview({
  copy,
  cards,
}: {
  copy: SpaPageCopy["overview"];
  cards: OverviewCard[];
}) {
  return (
    <ScrollReveal>
      <section>
        <div className="pb-10 md:pb-12">
          <p className="eyebrow">
            {copy.badge}
          </p>
          <h2 className="mt-4 break-keep font-display-serif text-3xl font-normal leading-[1.4] text-foreground md:text-3xl">
            {copy.title}
          </h2>
        </div>
        <div className="grid gap-8 lg:flex">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:flex md:gap-10">
            {cards.map(({ id, Icon, badge, title, description }) => (
              <a
                key={id}
                href={`#${id}`}
                className="group flex flex-col border-t border-border pt-6 text-left transition-colors duration-500 hover:border-foreground/40 md:flex-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                    {badge}
                  </span>
                </div>

                <h3 className="mt-5 max-w-[16ch] break-keep font-display-serif text-xl font-normal leading-[1.4] text-foreground">
                  {title}
                </h3>
                <p className="mt-3 break-keep text-sm leading-[1.85] text-secondary">
                  {description}
                </p>

                <div className="mt-auto inline-flex items-center gap-2 pt-6 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground">
                  {copy.actionLabel}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

function SpaPageCta({
  locale,
  copy,
}: {
  locale: "ko" | "en";
  copy: SpaPageCopy["cta"];
}) {
  return (
    <ScrollReveal>
      <GlassCard
        as="section"
        tone="warm"
        radius="lg"
        className="p-6 py-14 md:p-8 md:py-16 lg:p-10 lg:py-16"
      >
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="space-y-4">
            <p className="eyebrow">
              Consultation
            </p>
            <h2 className="break-keep font-display-serif text-3xl font-normal leading-[1.4] text-foreground md:text-4xl">
              {copy.title}
            </h2>
            <p className="mx-auto max-w-[32ch] whitespace-pre-line break-keep text-sm leading-[1.9] text-secondary md:max-w-2xl md:text-base">
              {copy.description}
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Link
              href={`/${locale}/reservation`}
              className="press-grow inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-foreground px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-background shadow-[var(--shadow-glass-strong)] transition-opacity duration-300 hover:opacity-90"
            >
              {copy.button}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <p className="text-xs leading-relaxed text-secondary md:text-sm">
              {copy.note}
            </p>
          </div>
        </div>
      </GlassCard>
    </ScrollReveal>
  );
}

const KOREAN_COPY: SpaPageCopy = {
  overview: {
    badge: "Signature Journey",
    title: "지금 필요한 회복 단계부터 차분히 살펴보세요",
    description:
      "헬리아 스파는 하나의 코스를 권하는 방식보다, 산모님의 시기와 컨디션에 맞춰 필요한 관리부터 이해하기 쉽게 안내하는 구성을 지향합니다.",
    noteTitle: "Helia Spa Guide",
    noteBody:
      "각 프로그램은 산전, 산후, 수유 준비처럼 서로 다른 회복 국면을 기준으로 나뉘어 있습니다. 모바일에서도 긴 설명이 한가운데 몰리지 않도록 정보 흐름을 왼쪽 기준으로 정리했습니다.",
    actionLabel: "프로그램 보기",
  },
  badge: "Premium Spa Service",
  headline: "바다의 생명력을 담은\n진정한 휴식과 치유",
  intro:
    "프랑스 정통 탈라소 테라피의 해양 에너지로, 가장 편안하고 우아한 회복의 시간을 선사합니다.",
  thalac: {
    title: "프랑스 정통 탈라소 테라피, THALAC",
    description:
      "지중해의 미네랄과 해양 성분을 담은 프랑스 에스테틱 브랜드. 임산부에게도 안전한 순수 성분으로 부종을 완화하고 깊은 보습을 더합니다.",
    features: [
      {
        icon: "crown",
        title: "프랑스 정통 에스테틱",
        description: "30년 전통의 프랑스 탈라소 테라피 전문 브랜드의 노하우",
      },
      {
        icon: "sparkles",
        title: "미네랄 디톡스",
        description: "삼투압 작용을 통한 탁월한 부종 완화 및 독소 배출 효과",
      },
      {
        icon: "shield",
        title: "임산부 안심 케어",
        description: "파라벤 등 유해 성분이 배제된 안전한 순수 해양 성분",
      },
    ],
  },
  headSpa: {
    badge: "HEAD SPA",
    title: "프리미엄 헤드스파",
    summary:
      "예민해진 두피를 부드럽게 진정시키고, 긴장과 피로를 차분히 풀어내는 시그니처 관리입니다.",
    description:
      "예민해진 두피를 진정시키고 깊은 이완으로 스트레스를 풀어내는 시그니처 헤드스파.",
    images: [
      {
        src: "/img/spa/us/headspa-2.jpg",
        alt: "두피 진정 케어가 진행되는 더헬리아 헤드스파 공간",
        caption: "편안한 샴푸대에서의 두피 케어",
      },
      {
        src: "/img/spa/us/headspa-3.jpg",
        alt: "전문 테라피스트의 손길로 진행되는 헤드스파 관리",
        caption: "전문 테라피스트의 섬세한 터치",
      },
      {
        src: "/img/spa/us/headspa-4.jpg",
        alt: "아로마와 함께 휴식을 돕는 더헬리아 헤드스파 룸",
        caption: "아로마와 함께하는 깊은 이완",
      },
    ],
    features: [
      {
        title: "두피 진정 & 탈모 예방",
        items: [
          "민감성 두피 케어와 산후 탈모 예방 영양 공급",
          "두피 열감 완화 및 쿨링 효과",
        ],
      },
      {
        title: "스트레스 릴리프",
        items: [
          "아로마 테라피로 심신 안정과 긴장 완화",
          "깊은 수면 유도 및 피로 회복",
        ],
      },
    ],
  },
  prenatal: {
    badge: "PRENATAL",
    title: "산전 바디 테라피",
    summary:
      "임신 중 컨디션 변화로 생긴 부종과 통증을 덜어내며, 몸의 순환 리듬을 편안하게 돕습니다.",
    description:
      "임신기 급격한 신체 변화로 생긴 통증과 부종을 완화하는 릴랙싱 케어.",
    images: [
      { src: "/img/spa/us/pre-2.jpg", alt: "산전 순환 케어가 진행되는 더헬리아 스파 룸" },
      { src: "/img/spa/us/pre-3.jpg", alt: "임산부를 위한 더헬리아 바디 테라피 장면" },
      { src: "/img/spa/us/pre-4.jpg", alt: "산전 부종 완화를 돕는 더헬리아 테라피 공간" },
      { src: "/img/spa/us/pre-5.jpg", alt: "편안한 회복을 위한 더헬리아 산전 관리 환경" },
    ],
    features: [
      {
        title: "순환 & 부종 관리",
        items: [
          "임신성 부종 완화 및 혈액 순환 촉진",
          "무거워진 하체 피로감과 저림 완화",
        ],
      },
      {
        title: "통증 집중 케어",
        items: [
          "허리·골반 통증과 어깨·목 긴장 완화",
          "튼살 예방 및 피부 탄력 유지",
        ],
      },
    ],
  },
  postpartum: {
    badge: "POSTPARTUM",
    title: "산후 바디 테라피",
    summary:
      "출산 후 흐트러진 균형을 다시 세우고, 붓기와 피로가 오래 남지 않도록 회복에 집중합니다.",
    description:
      "출산 후 틀어진 골반과 체형을 바로잡고 회복에 집중하는 전문 프로그램.",
    images: [
      { src: "/img/spa/us/after-2.jpg", alt: "산후 회복을 위한 더헬리아 바디 케어 장면" },
      { src: "/img/spa/us/after-3.jpg", alt: "산후 순환 관리를 돕는 더헬리아 스파 룸" },
      { src: "/img/spa/us/after-4.jpg", alt: "산모 회복을 위한 더헬리아 바디 테라피 공간" },
      { src: "/img/spa/us/after-5.jpg", alt: "산후 체형 회복을 지원하는 더헬리아 테라피 장면" },
      { src: "/img/spa/us/after-6.jpg", alt: "더헬리아 산후 케어 프로그램 디테일 이미지" },
    ],
    features: [
      {
        title: "체형 교정 & 회복",
        items: [
          "벌어진 골반 및 복직근 이개 회복",
          "산후 부종 완화와 바디 라인 리프팅",
        ],
      },
      {
        title: "디톡스 & 밸런스",
        items: [
          "오로 배출 촉진 및 자궁 회복",
          "온열 돔 심부열로 독소 배출과 순환 회복",
        ],
      },
    ],
  },
  breastCare: {
    badge: "BREAST CARE",
    title: "가슴 마사지",
    summary:
      "수유 준비부터 단유 관리까지, 통증과 불편을 줄이며 편안한 수유 흐름을 돕는 프로그램입니다.",
    description:
      "수유 준비부터 단유까지, 유선 발달을 돕고 젖몸살을 예방하는 전문 케어.",
    images: [
      { src: "/img/spa/us/breast-2.jpg", alt: "수유 준비를 돕는 더헬리아 가슴 케어 장면" },
      { src: "/img/spa/us/breast-3.jpg", alt: "더헬리아 전문 가슴 관리 프로그램 공간" },
      { src: "/img/spa/us/breast-4.jpg", alt: "모유 수유를 위한 더헬리아 케어 디테일" },
      { src: "/img/spa/us/breast-5.jpg", alt: "산모 유방 컨디션 관리를 위한 더헬리아 서비스 이미지" },
    ],
    features: [
      {
        title: "수유 준비 & 통증 완화",
        items: [
          "유선 발달 촉진 및 유두 관리",
          "젖몸살·유방 울혈 예방과 수유 자세 교정",
        ],
      },
      {
        title: "단유 관리",
        items: [
          "건강한 단유를 위한 체계적 관리",
          "가슴 처짐 예방 및 탄력 회복",
        ],
      },
    ],
  },
  cta: {
    title: "당신만을 위한 완벽한 휴식",
    description: "전문 테라피스트의 섬세한 손길로\n회복 그 이상의 감동을 경험하세요.",
    button: "상담 문의하기",
    note: "예약 페이지에서 상담 흐름과 방문 절차를 함께 확인하실 수 있습니다.",
  },
};

const ENGLISH_COPY: SpaPageCopy = {
  overview: {
    badge: "Signature Journey",
    title: "Start with the stage of recovery that matters most right now",
    description:
      "Helia Spa is designed to help mothers understand each program by recovery phase first, instead of pushing one course before the context feels clear.",
    noteTitle: "Helia Spa Guide",
    noteBody:
      "Programs are grouped around prenatal care, postpartum recovery, and breastfeeding support so the page reads more like a calm care guide. Text is kept left-aligned first for better scanability on smaller screens.",
    actionLabel: "View program",
  },
  badge: "Premium Spa Service",
  headline: "True Rest and Healing\nwith the Vitality of the Sea",
  intro:
    "Through the marine energy of authentic French Thalassotherapy, we present the most comfortable and elegant time of recovery.",
  thalac: {
    title: "Authentic French Thalassotherapy, THALAC",
    description:
      "A French aesthetic brand rich in Mediterranean minerals and marine ingredients — pure and safe for pregnancy, easing edema while adding deep hydration.",
    features: [
      {
        icon: "crown",
        title: "Authentic French Aesthetic",
        description:
          "Know-how of a 30-year tradition French Thalasso Therapy specialist brand",
      },
      {
        icon: "sparkles",
        title: "Mineral Detox",
        description:
          "Excellent edema relief and toxin elimination through osmotic action",
      },
      {
        icon: "shield",
        title: "Safe Care for Moms",
        description:
          "Safe pure marine ingredients excluding harmful substances like parabens",
      },
    ],
  },
  headSpa: {
    badge: "HEAD SPA",
    title: "Premium Head Spa",
    summary:
      "A signature treatment that gently settles the scalp, softens tension, and creates a calmer recovery rhythm.",
    description:
      "A signature head spa that soothes a sensitive scalp and releases stress through deep relaxation.",
    images: [
      {
        src: "/img/spa/us/headspa-2.jpg",
        alt: "Soothing head spa treatment room at The Helia",
        caption: "Delicate touch of professional therapists",
      },
      {
        src: "/img/spa/us/headspa-3.jpg",
        alt: "Professional therapist performing The Helia head spa",
        caption: "Deep relaxation with aroma",
      },
      {
        src: "/img/spa/us/headspa-4.jpg",
        alt: "Private and cozy head spa room at The Helia",
        caption: "Private and cozy spa room",
      },
    ],
    features: [
      {
        title: "Scalp Soothing & Hair Loss Prevention",
        items: [
          "Sensitive scalp care with nutrition to prevent postpartum hair loss",
          "Relief of scalp heat & cooling effect",
        ],
      },
      {
        title: "Stress Relief",
        items: [
          "Mind-body calm and tension relief through aromatherapy",
          "Induction of deep sleep & fatigue recovery",
        ],
      },
    ],
  },
  prenatal: {
    badge: "PRENATAL",
    title: "Prenatal Body Therapy",
    summary:
      "Built to ease swelling and pain during pregnancy while helping the body stay lighter and more comfortable.",
    description:
      "Relaxing care that eases the pain and edema of rapid changes through pregnancy.",
    images: [
      { src: "/img/spa/us/pre-2.jpg", alt: "Prenatal circulation care room at The Helia" },
      { src: "/img/spa/us/pre-3.jpg", alt: "Relaxing prenatal body therapy at The Helia" },
      { src: "/img/spa/us/pre-4.jpg", alt: "Prenatal edema care environment at The Helia" },
      { src: "/img/spa/us/pre-5.jpg", alt: "Comfort-focused prenatal care setting at The Helia" },
    ],
    features: [
      {
        title: "Circulation & Edema Care",
        items: [
          "Relief of gestational edema & better blood circulation",
          "Relief for a heavy, tired lower body and cramps",
        ],
      },
      {
        title: "Intensive Pain Care",
        items: [
          "Relief of back, pelvic, shoulder & neck tension",
          "Prevention of stretch marks & maintained elasticity",
        ],
      },
    ],
  },
  postpartum: {
    badge: "POSTPARTUM",
    title: "Postpartum Body Therapy",
    summary:
      "Focused on rebuilding balance after childbirth so swelling, fatigue, and body strain do not linger longer than needed.",
    description:
      "A professional recovery program that realigns the pelvis and body after childbirth.",
    images: [
      { src: "/img/spa/us/after-2.jpg", alt: "Postpartum recovery care at The Helia" },
      { src: "/img/spa/us/after-3.jpg", alt: "Circulation-focused postpartum therapy room at The Helia" },
      { src: "/img/spa/us/after-4.jpg", alt: "Body recovery treatment space at The Helia" },
      { src: "/img/spa/us/after-5.jpg", alt: "Postpartum care detail at The Helia" },
      { src: "/img/spa/us/after-6.jpg", alt: "The Helia postpartum wellness program image" },
    ],
    features: [
      {
        title: "Body Correction & Recovery",
        items: [
          "Recovery of widened pelvis & diastasis recti",
          "Postpartum edema relief and body-line lifting",
        ],
      },
      {
        title: "Detox & Balance",
        items: [
          "Promotion of lochia discharge & uterine recovery",
          "Deep-heat toxin release and circulation recovery",
        ],
      },
    ],
  },
  breastCare: {
    badge: "BREAST CARE",
    title: "Breast Care",
    summary:
      "Supports an easier feeding flow from preparation to weaning, while helping reduce pain and daily discomfort.",
    description:
      "Professional breast care from feeding prep to weaning — supporting gland development and preventing mastitis.",
    images: [
      { src: "/img/spa/us/breast-2.jpg", alt: "Breastfeeding support care at The Helia" },
      { src: "/img/spa/us/breast-3.jpg", alt: "Professional breast care setting at The Helia" },
      { src: "/img/spa/us/breast-4.jpg", alt: "Breast care service detail for postpartum mothers" },
      { src: "/img/spa/us/breast-5.jpg", alt: "The Helia breast care treatment image" },
    ],
    features: [
      {
        title: "Breastfeeding Prep & Pain Relief",
        items: [
          "Mammary gland development & nipple care",
          "Mastitis prevention and breastfeeding-posture correction",
        ],
      },
      {
        title: "Weaning Care",
        items: [
          "Systematic care for a healthy weaning",
          "Prevention of sagging & recovery of elasticity",
        ],
      },
    ],
  },
  cta: {
    title: "Perfect Rest Just for You",
    description:
      "Experience emotion beyond recovery\nwith the delicate touch of professional therapists.",
    button: "Plan Your Consultation",
    note: "You can review the consultation flow and visit guidance on the reservation page.",
  },
};
