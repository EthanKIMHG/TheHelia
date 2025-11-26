"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import { SpaBrandIntro } from "./SpaBrandIntro";
import { SpaServiceCarousel } from "./SpaServiceCarousel";

export function HeliaSpaPageContent() {
  const themeLocale = useOptionalThemeLocale();
  const locale = themeLocale?.locale ?? "ko";
  const isKo = locale === "ko";
  const copy = isKo ? KOREAN_COPY : ENGLISH_COPY;

  return (
    <div className="w-full flex flex-col gap-24 pb-24">
      {/* Brand Intro (Philosophy + THALAC) */}
      <SpaBrandIntro copy={copy} />

      {/* Head Spa Carousel */}
      <SpaServiceCarousel
        badge={copy.headSpa.badge}
        title={copy.headSpa.title}
        description={copy.headSpa.description}
        images={copy.headSpa.images}
        features={copy.headSpa.features}
      />

      {/* Body Therapies Carousel */}
      <SpaServiceCarousel
        badge={copy.bodyCare.badge}
        title={copy.bodyCare.title}
        description={copy.bodyCare.description}
        images={copy.bodyCare.images}
        features={copy.bodyCare.features}
      />

      {/* CTA */}
      <ScrollReveal>
        <div className="max-w-4xl mx-auto w-full px-4">
          <div className="text-center bg-primary/5 rounded-[2.5rem] p-12 border border-primary/10">
            <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
              {copy.cta.title}
            </h3>
            <p className="text-secondary/80 mb-8 whitespace-pre-line">
              {copy.cta.description}
            </p>
            <button className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-primary text-white font-medium text-lg transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
              {copy.cta.button}
            </button>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

const KOREAN_COPY = {
  badge: "Premium Spa Service",
  headline: "바다의 생명력을 담은\n진정한 휴식과 치유",
  intro: "더헬리아 스파는 산모님의 지친 몸과 마음을 깊이 이해합니다.\n프랑스 정통 탈라소 테라피의 해양 에너지를 통해\n가장 편안하고 우아한 회복의 시간을 선사합니다.",
  thalac: {
    title: "프랑스 정통 탈라소 테라피, THALAC",
    description: "지중해의 풍부한 미네랄과 해양 성분을 담은 프랑스 정통 에스테틱 브랜드 THALAC 제품을 사용합니다. \n\n미네랄은 체내 삼투압 작용을 도와 부종 완화와 독소 배출에 탁월하며, 임산부에게도 안전한 순수 해양 성분으로 깊은 보습과 영양을 공급합니다.",
    features: [
      {
        icon: "crown" as const,
        title: "프랑스 정통 에스테틱",
        description: "30년 전통의 프랑스 탈라소 테라피 전문 브랜드의 노하우",
      },
      {
        icon: "sparkles" as const,
        title: "미네랄 디톡스",
        description: "삼투압 작용을 통한 탁월한 부종 완화 및 독소 배출 효과",
      },
      {
        icon: "shield" as const,
        title: "임산부 안심 케어",
        description: "파라벤 등 유해 성분이 배제된 안전한 순수 해양 성분",
      },
    ],
  },
  headSpa: {
    badge: "HEAD SPA",
    title: "프리미엄 헤드스파",
    description: "호르몬 변화로 예민해진 두피를 진정시키고, 깊은 이완을 통해 스트레스를 해소하는 더헬리아만의 시그니처 헤드스파입니다.",
    images: [
      { src: "/img/spa/headspa1.jpg", alt: "헤드스파 메인", caption: "편안한 샴푸대에서의 두피 케어" },
      { src: "/img/spa/headspa2.jpg", alt: "헤드스파 케어", caption: "전문 테라피스트의 섬세한 터치" },
      { src: "/img/spa/headspa3.jpg", alt: "헤드스파 릴랙싱", caption: "아로마와 함께하는 깊은 이완" },
      { src: "/img/spa/headspa4.jpg", alt: "헤드스파 시설", caption: "프라이빗하고 아늑한 스파 룸" },
    ],
    features: [
      {
        title: "두피 진정 & 탈모 예방",
        items: ["호르몬 변화로 인한 민감성 두피 케어", "산후 탈모 예방을 위한 영양 공급", "두피 열감 완화 및 쿨링 효과"],
      },
      {
        title: "스트레스 릴리프",
        items: ["아로마 테라피를 통한 심신 안정", "목과 어깨의 긴장 완화", "깊은 수면 유도 및 피로 회복"],
      },
      {
        title: "프라이빗 케어",
        items: ["1:1 맞춤형 두피 진단", "프라이빗 룸에서의 조용한 휴식", "최고급 헤어 제품 사용"],
      },
    ],
  },
  bodyCare: {
    badge: "BODY THERAPY",
    title: "산전 & 산후 바디 테라피",
    description: "임신 중의 부종 관리부터 출산 후의 체형 교정까지, 엄마의 몸을 가장 잘 아는 전문가의 손길로 건강한 아름다움을 되찾아드립니다.",
    images: [
      { src: "/img/spa/spa2.jpg", alt: "바디 테라피 룸", caption: "아늑하고 따뜻한 분위기의 테라피 룸" },
      { src: "/img/spa/spa3.jpg", alt: "스파 시설", caption: "최신식 스파 설비와 편안한 베드" },
      { src: "/img/spa/spa4.jpg", alt: "릴랙싱 존", caption: "휴식을 위한 프라이빗 공간" },
      { src: "/img/spa/spa5.jpg", alt: "테라피 제품", caption: "엄선된 프리미엄 오일과 제품" },
      { src: "/img/spa/spa6.jpg", alt: "스파 인테리어", caption: "마음의 안정을 주는 인테리어" },
    ],
    features: [
      {
        title: "산전 마사지 (Prenatal)",
        items: ["임신 중기~말기 부종 완화", "허리 및 골반 통증 집중 케어", "튼살 예방 및 피부 탄력 유지", "태교를 위한 심리적 안정"],
      },
      {
        title: "산후 마사지 (Postpartum)",
        items: ["출산 후 골반 교정 및 통증 완화", "오로 배출 촉진 및 자궁 회복", "디톡스 슬리밍 & 바디 라인 회복", "산후 우울감 완화"],
      },
      {
        title: "스페셜 케어",
        items: ["고주파 기기를 이용한 심부열 관리", "온열 돔을 이용한 독소 배출", "개인별 맞춤 아로마 블렌딩"],
      },
    ],
  },
  cta: {
    title: "당신만을 위한 완벽한 휴식",
    description: "전문 테라피스트의 섬세한 손길로\n회복 그 이상의 감동을 경험하세요.",
    button: "상담 문의하기",
  },
};

const ENGLISH_COPY = {
  badge: "Premium Spa Service",
  headline: "True Rest and Healing\nwith the Vitality of the Sea",
  intro: "The Helia Spa deeply understands the exhausted body and mind of mothers.\nThrough the marine energy of authentic French Thalassotherapy,\nwe present the most comfortable and elegant time of recovery.",
  thalac: {
    title: "Authentic French Thalassotherapy, THALAC",
    description: "We use THALAC, an authentic French aesthetic brand containing rich minerals and marine ingredients from the Mediterranean.\n\nMinerals help relieve edema and eliminate toxins through osmotic action in the body, and provide deep hydration and nutrition with pure marine ingredients safe for pregnant women.",
    features: [
      {
        icon: "crown" as const,
        title: "Authentic French Aesthetic",
        description: "Know-how of a 30-year tradition French Thalasso Therapy specialist brand",
      },
      {
        icon: "sparkles" as const,
        title: "Mineral Detox",
        description: "Excellent edema relief and toxin elimination through osmotic action",
      },
      {
        icon: "shield" as const,
        title: "Safe Care for Moms",
        description: "Safe pure marine ingredients excluding harmful substances like parabens",
      },
    ],
  },
  headSpa: {
    badge: "HEAD SPA",
    title: "Premium Head Spa",
    description: "The Helia's signature head spa soothes the scalp sensitive to hormonal changes and relieves stress through deep relaxation.",
    images: [
      { src: "/img/spa/headspa1.jpg", alt: "Head Spa Main", caption: "Scalp care in a comfortable shampoo unit" },
      { src: "/img/spa/headspa2.jpg", alt: "Head Spa Care", caption: "Delicate touch of professional therapists" },
      { src: "/img/spa/headspa3.jpg", alt: "Head Spa Relaxing", caption: "Deep relaxation with aroma" },
      { src: "/img/spa/headspa4.jpg", alt: "Head Spa Facility", caption: "Private and cozy spa room" },
    ],
    features: [
      {
        title: "Scalp Soothing & Hair Loss Prevention",
        items: ["Care for sensitive scalp due to hormonal changes", "Nutrition supply to prevent postpartum hair loss", "Relief of scalp heat & cooling effect"],
      },
      {
        title: "Stress Relief",
        items: ["Mind-body stability through aromatherapy", "Relief of tension in neck and shoulders", "Induction of deep sleep & fatigue recovery"],
      },
      {
        title: "Private Care",
        items: ["1:1 customized scalp diagnosis", "Quiet rest in a private room", "Use of premium hair products"],
      },
    ],
  },
  bodyCare: {
    badge: "BODY THERAPY",
    title: "Prenatal & Postpartum Body Therapy",
    description: "From edema management during pregnancy to body correction after childbirth, we restore healthy beauty with the touch of experts who know the mother's body best.",
    images: [
      { src: "/img/spa/spa2.jpg", alt: "Body Therapy Room", caption: "Cozy and warm therapy room" },
      { src: "/img/spa/spa3.jpg", alt: "Spa Facility", caption: "Latest spa equipment and comfortable beds" },
      { src: "/img/spa/spa4.jpg", alt: "Relaxing Zone", caption: "Private space for rest" },
      { src: "/img/spa/spa5.jpg", alt: "Therapy Products", caption: "Selected premium oils and products" },
      { src: "/img/spa/spa6.jpg", alt: "Spa Interior", caption: "Interior that gives peace of mind" },
    ],
    features: [
      {
        title: "Prenatal Massage",
        items: ["Edema relief for mid~late pregnancy", "Intensive care for back & pelvic pain", "Stretch mark prevention & elasticity", "Psychological stability for prenatal care"],
      },
      {
        title: "Postpartum Massage",
        items: ["Postpartum pelvic correction & pain relief", "Promotion of lochia discharge & uterine recovery", "Detox slimming & body line recovery", "Relief of postpartum depression"],
      },
      {
        title: "Special Care",
        items: ["Deep heat management using high-frequency devices", "Toxin elimination using thermal dome", "Personalized aroma blending"],
      },
    ],
  },
  cta: {
    title: "Perfect Rest Just for You",
    description: "Experience emotion beyond recovery\nwith the delicate touch of professional therapists.",
    button: "Inquire Now",
  },
};
