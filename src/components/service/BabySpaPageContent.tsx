"use client";

import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import { SpaServiceBento } from "./SpaServiceBento";

export function BabySpaPageContent() {
  const themeLocale = useOptionalThemeLocale();
  const locale = themeLocale?.locale ?? "ko";
  const isKo = locale === "ko";
  const copy = isKo ? KOREAN_COPY : ENGLISH_COPY;

  return (
    <div className="w-full flex flex-col gap-12 pb-24">
      <div className="flex flex-col gap-24 mt-12">
        {/* Baby Spa Bento */}
        <SpaServiceBento
          badge={copy.babySpa.badge}
          title={copy.babySpa.title}
          description={copy.babySpa.description}
          images={copy.babySpa.images}
          features={copy.babySpa.features}
        />
      </div>
    </div>
  );
}

const KOREAN_COPY = {
  babySpa: {
    badge: "BABY SPA",
    title: "베이비 스파",
    description: "엄마의 양수와 가장 유사한 환경에서 진행되는 아기만을 위한 특별한 물놀이 시간입니다. 아기의 정서적 안정과 신체 발달을 돕습니다.",
    images: [
      "/img/babyspa/babyspa1.jpg",
      "/img/babyspa/babyspa2.jpg",
      "/img/babyspa/babyspa3.jpg",
      "/img/babyspa/babyspa4.jpg",
    ],
    features: [
      {
        title: "정서적 안정 & 숙면 유도",
        items: [
          "엄마 뱃속과 같은 편안함으로 정서적 안정감 부여",
          "물놀이 후 깊은 수면 유도 및 수면 패턴 개선",
          "부모와의 교감을 통한 애착 형성",
        ],
      },
      {
        title: "신체 발달 & 건강 증진",
        items: [
          "전신 운동을 통한 근육 발달 및 관절 유연성 증대",
          "심폐 기능 강화 및 소화 기능 촉진 (배앓이 완화)",
          "면역력 향상 및 두뇌 발달 자극",
        ],
      },
    ],
  },
};

const ENGLISH_COPY = {
  babySpa: {
    badge: "BABY SPA",
    title: "Baby Spa",
    description: "A special water play time just for babies in an environment most similar to the mother's amniotic fluid. It helps the baby's emotional stability and physical development.",
    images: [
      "/img/babyspa/babyspa1.jpg",
      "/img/babyspa/babyspa2.jpg",
      "/img/babyspa/babyspa3.jpg",
      "/img/babyspa/babyspa4.jpg",
    ],
    features: [
      {
        title: "Emotional Stability & Sleep Induction",
        items: [
          "Emotional stability with comfort like in the mother's womb",
          "Induction of deep sleep and improvement of sleep patterns after water play",
          "Attachment formation through communion with parents",
        ],
      },
      {
        title: "Physical Development & Health Promotion",
        items: [
          "Muscle development and increased joint flexibility through full-body exercise",
          "Strengthening of cardiopulmonary function and promotion of digestion (colic relief)",
          "Improvement of immunity and stimulation of brain development",
        ],
      },
    ],
  },
};
