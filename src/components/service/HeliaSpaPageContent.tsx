"use client";

import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import { SpaBrandIntro } from "./SpaBrandIntro";
import { SpaServiceBento } from "./SpaServiceBento";
import { SpaServiceCarousel } from "./SpaServiceCarousel";

export function HeliaSpaPageContent() {
  const themeLocale = useOptionalThemeLocale();
  const locale = themeLocale?.locale ?? "ko";
  const isKo = locale === "ko";
  const copy = isKo ? KOREAN_COPY : ENGLISH_COPY;

  return (
    <div className="w-full flex flex-col gap-12 pb-24">
      {/* Brand Intro (Philosophy + THALAC Text + Images) */}
      <SpaBrandIntro copy={copy} />

      <div className="flex flex-col gap-24 mt-12">
        {/* Head Spa Carousel (Kept as requested/default) */}
        <SpaServiceCarousel
          badge={copy.headSpa.badge}
          title={copy.headSpa.title}
          description={copy.headSpa.description}
          images={copy.headSpa.images}
          features={copy.headSpa.features}
        />

        {/* Prenatal Body Therapy Bento */}
        <SpaServiceBento
          badge={copy.prenatal.badge}
          title={copy.prenatal.title}
          description={copy.prenatal.description}
          images={copy.prenatal.images}
          features={copy.prenatal.features}
        />

        {/* Postpartum Body Therapy Bento */}
        <SpaServiceBento
          badge={copy.postpartum.badge}
          title={copy.postpartum.title}
          description={copy.postpartum.description}
          images={copy.postpartum.images}
          features={copy.postpartum.features}
          reversed
        />

        {/* Breast Care Bento */}
        <SpaServiceBento
          badge={copy.breastCare.badge}
          title={copy.breastCare.title}
          description={copy.breastCare.description}
          images={copy.breastCare.images}
          features={copy.breastCare.features}
        />
      </div>

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
      { src: "/img/spa/headspa2.jpg", alt: "헤드스파 메인2", caption: "편안한 샴푸대에서의 두피 케어" },
      { src: "/img/spa/headspa3.jpg", alt: "헤드스파 케어", caption: "전문 테라피스트의 섬세한 터치" },
      { src: "/img/spa/headspa4.jpg", alt: "헤드스파 릴랙싱", caption: "아로마와 함께하는 깊은 이완" },
      { src: "/img/spa/headspa5.jpg", alt: "헤드스파 시설", caption: "프라이빗하고 아늑한 스파 룸" },
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
  prenatal: {
    badge: "PRENATAL",
    title: "산전 바디 테라피",
    description: "임신 중기부터 말기까지, 급격한 신체 변화로 인한 통증과 부종을 완화하고 엄마와 태아의 교감을 돕는 릴랙싱 케어입니다.",
    images: ["/img/spa/pre1.jpg", "/img/spa/pre2.jpg", "/img/spa/pre3.jpg", "/img/spa/pre4.jpg", "/img/spa/pre5.jpg"],
    features: [
      {
        title: "순환 & 부종 관리",
        items: ["임신성 부종 완화 및 혈액 순환 촉진", "다리 저림 및 경련 예방", "체내 노폐물 배출"],
      },
      {
        title: "통증 집중 케어",
        items: ["허리 및 골반 통증 완화", "어깨 및 목 긴장 해소", "튼살 예방 및 피부 탄력 유지"],
      },
    ],
  },
  postpartum: {
    badge: "POSTPARTUM",
    title: "산후 바디 테라피",
    description: "출산 후 틀어진 골반과 체형을 바로잡고, 산후풍 예방과 오로 배출을 돕는 전문적인 회복 프로그램입니다.",
    images: ["/img/spa/after1.jpg", "/img/spa/after2.jpg", "/img/spa/after3.jpg", "/img/spa/after4.jpg", "/img/spa/after5.jpg", "/img/spa/after6.jpg"],
    features: [
      {
        title: "체형 교정 & 회복",
        items: ["벌어진 골반 및 복직근 이개 회복", "산후 부종 및 체중 감량 지원", "바디 라인 리프팅"],
      },
      {
        title: "디톡스 & 밸런스",
        items: ["오로 배출 촉진 및 자궁 회복", "산후 우울감 완화 및 호르몬 밸런스", "온열 돔을 이용한 심부열 독소 배출"],
      },
    ],
  },
  breastCare: {
    badge: "BREAST CARE",
    title: "가슴 마사지",
    description: "모유 수유를 준비하는 산모님과 수유 중인 산모님을 위한 전문적인 가슴 관리 프로그램입니다. 유선 발달을 돕고 젖몸살을 예방합니다.",
    images: ["/img/spa/breast1.jpg", "/img/spa/breast2.jpg", "/img/spa/breast3.jpg", "/img/spa/breast4.jpg", "/img/spa/breast5.jpg"],
    features: [
      {
        title: "수유 준비 & 통증 완화",
        items: ["유선 발달 촉진 및 유두 관리", "젖몸살 및 유방 울혈 예방", "수유 자세 교정 및 통증 완화"],
      },
      {
        title: "단유 관리",
        items: ["건강하고 아름다운 단유를 위한 체계적 관리", "가슴 처짐 예방 및 탄력 회복", "잔여 모유 배출 및 독소 제거"],
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
  prenatal: {
    badge: "PRENATAL",
    title: "Prenatal Body Therapy",
    description: "Relaxing care that relieves pain and edema caused by rapid physical changes from mid to late pregnancy and helps communion between mother and fetus.",
    images: ["/img/spa/pre1.jpg", "/img/spa/pre2.jpg", "/img/spa/pre3.jpg", "/img/spa/pre4.jpg", "/img/spa/pre5.jpg"],
    features: [
      {
        title: "Circulation & Edema Care",
        items: ["Relief of gestational edema & promotion of blood circulation", "Prevention of leg numbness & cramps", "Elimination of body wastes"],
      },
      {
        title: "Intensive Pain Care",
        items: ["Relief of back & pelvic pain", "Relief of shoulder & neck tension", "Prevention of stretch marks & maintenance of elasticity"],
      },
    ],
  },
  postpartum: {
    badge: "POSTPARTUM",
    title: "Postpartum Body Therapy",
    description: "A professional recovery program that corrects the pelvis and body shape distorted after childbirth, and helps prevent postpartum wind and discharge lochia.",
    images: ["/img/spa/after1.jpg", "/img/spa/after2.jpg", "/img/spa/after3.jpg", "/img/spa/after4.jpg", "/img/spa/after5.jpg", "/img/spa/after6.jpg"],
    features: [
      {
        title: "Body Correction & Recovery",
        items: ["Recovery of widened pelvis & diastasis recti", "Support for postpartum edema & weight loss", "Body line lifting"],
      },
      {
        title: "Detox & Balance",
        items: ["Promotion of lochia discharge & uterine recovery", "Relief of postpartum depression & hormone balance", "Deep heat toxin elimination using thermal dome"],
      },
    ],
  },
  breastCare: {
    badge: "BREAST CARE",
    title: "Breast Care",
    description: "Professional breast care program for mothers preparing for breastfeeding and breastfeeding mothers. Helps mammary gland development and prevents mastitis.",
    images: ["/img/spa/breast1.jpg", "/img/spa/breast2.jpg", "/img/spa/breast3.jpg", "/img/spa/breast4.jpg", "/img/spa/breast5.jpg"],
    features: [
      {
        title: "Breastfeeding Prep & Pain Relief",
        items: ["Promotion of mammary gland development & nipple care", "Prevention of mastitis & breast engorgement", "Correction of breastfeeding posture & pain relief"],
      },
      {
        title: "Weaning Care",
        items: ["Systematic management for healthy and beautiful weaning", "Prevention of breast sagging & recovery of elasticity", "Discharge of residual breast milk & toxin removal"],
      },
    ],
  },
  cta: {
    title: "Perfect Rest Just for You",
    description: "Experience emotion beyond recovery\nwith the delicate touch of professional therapists.",
    button: "Inquire Now",
  },
};
