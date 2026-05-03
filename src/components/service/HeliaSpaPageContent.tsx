"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
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
      <section className="overflow-hidden rounded-[2.5rem] border border-border/30 bg-gradient-to-br from-primary/10 via-background to-background/95 shadow-sm">
        <div className="p-6 md:p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary font-playfair italic">
            {copy.badge}
          </p>
          <h2 className="mt-3 break-keep text-3xl leading-[1.24] text-foreground md:text-3xl md:leading-tight font-serif">
            {copy.title}
          </h2>
        </div>
        <div className="grid gap-8 p-6 md:p-8 lg:flex lg:p-10">
          <div className="grid grid-cols-2 md:flex gap-4 ">
            {cards.map(({ id, Icon, badge, title, description }) => (
              <a
                key={id}
                href={`#${id}`}
                className="group rounded-[1.75rem] border border-border/30 bg-white/78 p-5 text-left shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md dark:bg-[#2A2928]/60"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-[#333231]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                    {badge}
                  </span>
                </div>

                <h3 className="mt-5 max-w-[16ch] break-keep text-xl font-semibold leading-[1.24] text-foreground font-serif">
                  {title}
                </h3>
                <p className="mt-3 break-keep text-sm leading-[1.8] text-foreground/72">
                  {description}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  {copy.actionLabel}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
      <section className="rounded-[2.5rem] border border-border/30 bg-primary/10 p-6 shadow-sm md:p-8 lg:p-10">
        <div className="flex flex-col gap-6 text-left md:items-center md:text-center">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary font-playfair italic">
              Consultation
            </p>
            <h2 className="break-keep text-3xl font-semibold leading-[1.24] text-foreground md:text-4xl md:leading-tight font-serif">
              {copy.title}
            </h2>
            <p className="max-w-[32ch] whitespace-pre-line break-keep text-sm leading-[1.9] text-foreground/75 md:mx-auto md:max-w-2xl md:text-base">
              {copy.description}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-center">
            <Link
              href={`/${locale}/reservation`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-background transition-colors hover:bg-primary/90"
            >
              {copy.button}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-xs leading-relaxed text-foreground/60 md:text-sm">
              {copy.note}
            </p>
          </div>
        </div>
      </section>
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
    "더헬리아 스파는 산모님의 지친 몸과 마음을 깊이 이해합니다.\n프랑스 정통 탈라소 테라피의 해양 에너지를 통해\n가장 편안하고 우아한 회복의 시간을 선사합니다.",
  thalac: {
    title: "프랑스 정통 탈라소 테라피, THALAC",
    description:
      "지중해의 풍부한 미네랄과 해양 성분을 담은 프랑스 정통 에스테틱 브랜드 THALAC 제품을 사용합니다. \n\n미네랄은 체내 삼투압 작용을 도와 부종 완화와 독소 배출에 탁월하며, 임산부에게도 안전한 순수 해양 성분으로 깊은 보습과 영양을 공급합니다.",
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
      "호르몬 변화로 예민해진 두피를 진정시키고, 깊은 이완을 통해 스트레스를 해소하는 더헬리아만의 시그니처 헤드스파입니다.",
    images: [
      {
        src: "/img/spa/headspa1.jpeg",
        alt: "편안한 샴푸대에서 진행되는 더헬리아 헤드스파 케어",
        caption: "편안한 샴푸대에서의 두피 케어",
      },
      {
        src: "/img/spa/headspa2.jpg",
        alt: "두피 진정 케어가 진행되는 더헬리아 헤드스파 공간",
        caption: "편안한 샴푸대에서의 두피 케어",
      },
      {
        src: "/img/spa/headspa3.jpg",
        alt: "전문 테라피스트의 손길로 진행되는 헤드스파 관리",
        caption: "전문 테라피스트의 섬세한 터치",
      },
      {
        src: "/img/spa/headspa4.jpg",
        alt: "아로마와 함께 휴식을 돕는 더헬리아 헤드스파 룸",
        caption: "아로마와 함께하는 깊은 이완",
      },
    ],
    features: [
      {
        title: "두피 진정 & 탈모 예방",
        items: [
          "호르몬 변화로 인한 민감성 두피 케어",
          "산후 탈모 예방을 위한 영양 공급",
          "두피 열감 완화 및 쿨링 효과",
        ],
      },
      {
        title: "스트레스 릴리프",
        items: [
          "아로마 테라피를 통한 심신 안정",
          "목과 어깨의 긴장 완화",
          "깊은 수면 유도 및 피로 회복",
        ],
      },
      {
        title: "프라이빗 케어",
        items: [
          "1:1 맞춤형 두피 진단",
          "프라이빗 룸에서의 조용한 휴식",
          "최고급 헤어 제품 사용",
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
      "임신 중기부터 말기까지, 급격한 신체 변화로 인한 통증과 부종을 완화하고 엄마와 태아의 교감을 돕는 릴랙싱 케어입니다.",
    images: [
      { src: "/img/spa/pre1.jpg", alt: "더헬리아 산전 바디 테라피 케어 공간" },
      { src: "/img/spa/pre2.jpg", alt: "산전 순환 케어가 진행되는 더헬리아 스파 룸" },
      { src: "/img/spa/pre3.jpg", alt: "임산부를 위한 더헬리아 바디 테라피 장면" },
      { src: "/img/spa/pre4.jpg", alt: "산전 부종 완화를 돕는 더헬리아 테라피 공간" },
      { src: "/img/spa/pre5.jpg", alt: "편안한 회복을 위한 더헬리아 산전 관리 환경" },
    ],
    features: [
      {
        title: "순환 & 부종 관리",
        items: [
          "임신성 부종 완화 및 혈액 순환 촉진",
          "다리 저림 및 경련 예방",
          "체내 노폐물 배출",
          "무거워진 하체 피로감 완화",
          "장시간 같은 자세로 생긴 순환 정체 완화",
        ],
      },
      {
        title: "통증 집중 케어",
        items: [
          "허리 및 골반 통증 완화",
          "어깨 및 목 긴장 해소",
          "튼살 예방 및 피부 탄력 유지",
          "자세 변화로 누적된 등 라인 부담 완화",
          "컨디션에 맞춘 부드러운 이완 케어",
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
      "출산 후 틀어진 골반과 체형을 바로잡고, 산후풍 예방과 오로 배출을 돕는 전문적인 회복 프로그램입니다.",
    images: [
      { src: "/img/spa/after1.jpg", alt: "더헬리아 산후 바디 테라피 프로그램 대표 이미지" },
      { src: "/img/spa/after2.jpg", alt: "산후 회복을 위한 더헬리아 바디 케어 장면" },
      { src: "/img/spa/after3.jpg", alt: "산후 순환 관리를 돕는 더헬리아 스파 룸" },
      { src: "/img/spa/after4.jpeg", alt: "산모 회복을 위한 더헬리아 바디 테라피 공간" },
      { src: "/img/spa/after5.jpg", alt: "산후 체형 회복을 지원하는 더헬리아 테라피 장면" },
      { src: "/img/spa/after6.jpg", alt: "더헬리아 산후 케어 프로그램 디테일 이미지" },
    ],
    features: [
      {
        title: "체형 교정 & 회복",
        items: [
          "벌어진 골반 및 복직근 이개 회복",
          "산후 부종 및 체중 감량 지원",
          "바디 라인 리프팅",
          "회복 초기 무너진 중심 밸런스 정돈",
          "장시간 수유와 안아주기로 누적된 자세 부담 완화",
        ],
      },
      {
        title: "디톡스 & 밸런스",
        items: [
          "오로 배출 촉진 및 자궁 회복",
          "산후 우울감 완화 및 호르몬 밸런스",
          "온열 돔을 이용한 심부열 독소 배출",
          "순환 회복을 통한 몸의 무거움 완화",
          "컨디션 저하 시기 피로 회복 보조",
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
      "모유 수유를 준비하는 산모님과 수유 중인 산모님을 위한 전문적인 가슴 관리 프로그램입니다. 유선 발달을 돕고 젖몸살을 예방합니다.",
    images: [
      { src: "/img/spa/breast1.jpg", alt: "더헬리아 가슴 관리 프로그램 대표 이미지" },
      { src: "/img/spa/breast2.jpg", alt: "수유 준비를 돕는 더헬리아 가슴 케어 장면" },
      { src: "/img/spa/breast3.jpg", alt: "더헬리아 전문 가슴 관리 프로그램 공간" },
      { src: "/img/spa/breast4.jpg", alt: "모유 수유를 위한 더헬리아 케어 디테일" },
      { src: "/img/spa/breast5.jpg", alt: "산모 유방 컨디션 관리를 위한 더헬리아 서비스 이미지" },
    ],
    features: [
      {
        title: "수유 준비 & 통증 완화",
        items: [
          "유선 발달 촉진 및 유두 관리",
          "젖몸살 및 유방 울혈 예방",
          "수유 자세 교정 및 통증 완화",
          "수유 시작 전 가슴 컨디션 단계별 케어",
          "초기 수유 적응 과정의 부담 완화",
        ],
      },
      {
        title: "단유 관리",
        items: [
          "건강하고 아름다운 단유를 위한 체계적 관리",
          "가슴 처짐 예방 및 탄력 회복",
          "잔여 모유 배출 및 독소 제거",
          "불편감이 커지지 않도록 부드러운 단계 조절",
          "민감해진 컨디션을 고려한 진정 케어",
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
    "The Helia Spa deeply understands the exhausted body and mind of mothers.\nThrough the marine energy of authentic French Thalassotherapy,\nwe present the most comfortable and elegant time of recovery.",
  thalac: {
    title: "Authentic French Thalassotherapy, THALAC",
    description:
      "We use THALAC, an authentic French aesthetic brand containing rich minerals and marine ingredients from the Mediterranean.\n\nMinerals help relieve edema and eliminate toxins through osmotic action in the body, and provide deep hydration and nutrition with pure marine ingredients safe for pregnant women.",
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
      "The Helia's signature head spa soothes the scalp sensitive to hormonal changes and relieves stress through deep relaxation.",
    images: [
      {
        src: "/img/spa/headspa1.jpeg",
        alt: "The Helia head spa care in a comfortable shampoo unit",
        caption: "Scalp care in a comfortable shampoo unit",
      },
      {
        src: "/img/spa/headspa2.jpg",
        alt: "Soothing head spa treatment room at The Helia",
        caption: "Delicate touch of professional therapists",
      },
      {
        src: "/img/spa/headspa3.jpg",
        alt: "Professional therapist performing The Helia head spa",
        caption: "Deep relaxation with aroma",
      },
      {
        src: "/img/spa/headspa4.jpg",
        alt: "Private and cozy head spa room at The Helia",
        caption: "Private and cozy spa room",
      },
    ],
    features: [
      {
        title: "Scalp Soothing & Hair Loss Prevention",
        items: [
          "Care for sensitive scalp due to hormonal changes",
          "Nutrition supply to prevent postpartum hair loss",
          "Relief of scalp heat & cooling effect",
        ],
      },
      {
        title: "Stress Relief",
        items: [
          "Mind-body stability through aromatherapy",
          "Relief of tension in neck and shoulders",
          "Induction of deep sleep & fatigue recovery",
        ],
      },
      {
        title: "Private Care",
        items: [
          "1:1 customized scalp diagnosis",
          "Quiet rest in a private room",
          "Use of premium hair products",
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
      "Relaxing care that relieves pain and edema caused by rapid physical changes from mid to late pregnancy and helps communion between mother and fetus.",
    images: [
      { src: "/img/spa/pre1.jpg", alt: "Prenatal body therapy space at The Helia" },
      { src: "/img/spa/pre2.jpg", alt: "Prenatal circulation care room at The Helia" },
      { src: "/img/spa/pre3.jpg", alt: "Relaxing prenatal body therapy at The Helia" },
      { src: "/img/spa/pre4.jpg", alt: "Prenatal edema care environment at The Helia" },
      { src: "/img/spa/pre5.jpg", alt: "Comfort-focused prenatal care setting at The Helia" },
    ],
    features: [
      {
        title: "Circulation & Edema Care",
        items: [
          "Relief of gestational edema & promotion of blood circulation",
          "Prevention of leg numbness & cramps",
          "Elimination of body wastes",
          "Relief for heavy, tired lower body",
          "Gentle support for sluggish circulation after long hours in one position",
        ],
      },
      {
        title: "Intensive Pain Care",
        items: [
          "Relief of back & pelvic pain",
          "Relief of shoulder & neck tension",
          "Prevention of stretch marks & maintenance of elasticity",
          "Support for upper-back strain from posture changes",
          "Soft tension release adjusted to your daily condition",
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
      "A professional recovery program that corrects the pelvis and body shape distorted after childbirth, and helps prevent postpartum wind and discharge lochia.",
    images: [
      { src: "/img/spa/after1.jpg", alt: "Postpartum body therapy program at The Helia" },
      { src: "/img/spa/after2.jpg", alt: "Postpartum recovery care at The Helia" },
      { src: "/img/spa/after3.jpg", alt: "Circulation-focused postpartum therapy room at The Helia" },
      { src: "/img/spa/after4.jpeg", alt: "Body recovery treatment space at The Helia" },
      { src: "/img/spa/after5.jpg", alt: "Postpartum care detail at The Helia" },
      { src: "/img/spa/after6.jpg", alt: "The Helia postpartum wellness program image" },
    ],
    features: [
      {
        title: "Body Correction & Recovery",
        items: [
          "Recovery of widened pelvis & diastasis recti",
          "Support for postpartum edema & weight loss",
          "Body line lifting",
          "Realignment of core balance after delivery",
          "Relief for posture strain from feeding and holding your baby",
        ],
      },
      {
        title: "Detox & Balance",
        items: [
          "Promotion of lochia discharge & uterine recovery",
          "Relief of postpartum depression & hormone balance",
          "Deep heat toxin elimination using thermal dome",
          "Support for a lighter body through circulation recovery",
          "Recovery support during periods of low energy",
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
      "Professional breast care program for mothers preparing for breastfeeding and breastfeeding mothers. Helps mammary gland development and prevents mastitis.",
    images: [
      { src: "/img/spa/breast1.jpg", alt: "Breast care program at The Helia" },
      { src: "/img/spa/breast2.jpg", alt: "Breastfeeding support care at The Helia" },
      { src: "/img/spa/breast3.jpg", alt: "Professional breast care setting at The Helia" },
      { src: "/img/spa/breast4.jpg", alt: "Breast care service detail for postpartum mothers" },
      { src: "/img/spa/breast5.jpg", alt: "The Helia breast care treatment image" },
    ],
    features: [
      {
        title: "Breastfeeding Prep & Pain Relief",
        items: [
          "Promotion of mammary gland development & nipple care",
          "Prevention of mastitis & breast engorgement",
          "Correction of breastfeeding posture & pain relief",
          "Step-by-step care for changing breast condition before feeding begins",
          "Reduced strain during the early breastfeeding adjustment period",
        ],
      },
      {
        title: "Weaning Care",
        items: [
          "Systematic management for healthy and beautiful weaning",
          "Prevention of breast sagging & recovery of elasticity",
          "Discharge of residual breast milk & toxin removal",
          "Gentle pacing so discomfort does not build too quickly",
          "Soothing care for a more sensitive condition during weaning",
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
