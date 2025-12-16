"use client";

import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import { SpaServiceBento } from "./SpaServiceBento";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import { Droplets, GraduationCap, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";

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
        
        {/* Strengths Section */}
        <BabySpaStrengths copy={copy.strengths} />
      </div>
    </div>
  );
}

function BabySpaStrengths({ copy }: { copy: typeof KOREAN_COPY.strengths }) {
  return (
    <ScrollReveal>
      <section className="space-y-12">
        {/* Row 1: Experience & Exclusivity */}
        <div className="grid gap-6 lg:grid-cols-2">
           {/* Image Card */}
           <div className="relative overflow-hidden rounded-[2.5rem] h-[360px] lg:h-auto shadow-sm group">
             <Image
               src="/img/babyspa/strength-babyspa1.png"
               alt="Baby Spa Experience"
               fill
               className="object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-black/5" />
           </div>
           
           {/* Text Card */}
           <div className="flex flex-col justify-center rounded-[2.5rem] bg-stone-100 dark:bg-[#2A2928] p-8 md:p-12 shadow-sm border border-stone-200/50 dark:border-white/5">
              <div className="space-y-10">
                 {/* Point 1 */}
                 <div className="flex gap-5 items-start">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-[#333231] shadow-sm text-primary">
                       <Droplets className="h-6 w-6" />
                    </div>
                    <div className="space-y-3">
                       <h3 className="text-xl font-bold font-serif text-foreground">{copy.point1.title}</h3>
                       <p className="text-muted-foreground leading-relaxed text-[15px]">{copy.point1.desc}</p>
                    </div>
                 </div>
                 
                 <div className="w-full h-px bg-stone-200 dark:bg-white/10" />

                 {/* Point 2 */}
                 <div className="flex gap-5 items-start">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-[#333231] shadow-sm text-primary">
                       <MapPin className="h-6 w-6" />
                    </div>
                    <div className="space-y-3">
                       <h3 className="text-xl font-bold font-serif text-foreground">{copy.point2.title}</h3>
                       <p className="text-muted-foreground leading-relaxed text-[15px]">{copy.point2.desc}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Row 2: Quality & Education */}
        <div className="grid gap-6 lg:grid-cols-2">
           {/* Text Card */}
           <div className="order-2 lg:order-1 flex flex-col justify-center rounded-[2.5rem] bg-stone-100 dark:bg-[#2A2928] p-8 md:p-12 shadow-sm border border-stone-200/50 dark:border-white/5">
              <div className="space-y-10">
                 {/* Point 3 */}
                 <div className="flex gap-5 items-start">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-[#333231] shadow-sm text-primary">
                       <Sparkles className="h-6 w-6" />
                    </div>
                    <div className="space-y-3">
                       <h3 className="text-xl font-bold font-serif text-foreground">{copy.point3.title}</h3>
                       <p className="text-muted-foreground leading-relaxed text-[15px]">{copy.point3.desc}</p>
                    </div>
                 </div>
                 
                 <div className="w-full h-px bg-stone-200 dark:bg-white/10" />

                 {/* Point 4 */}
                 <div className="flex gap-5 items-start">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-[#333231] shadow-sm text-primary">
                       <GraduationCap className="h-6 w-6" />
                    </div>
                    <div className="space-y-3">
                       <h3 className="text-xl font-bold font-serif text-foreground">{copy.point4.title}</h3>
                       <p className="text-muted-foreground leading-relaxed text-[15px]">{copy.point4.desc}</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Image Card */}
           <div className="order-1 lg:order-2 relative overflow-hidden rounded-[2.5rem] h-[360px] lg:h-auto shadow-sm group">
             <Image
               src="/img/babyspa/strength-babyspa2.png"
               alt="Baby Spa Education"
               fill
               className="object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-black/5" />
           </div>
        </div>
      </section>
    </ScrollReveal>
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
  strengths: {
    point1: {
      title: "1:1 프라이빗 스파",
      desc: "어디서도 경험할 수 없는 1:1 케어 시스템으로, 엄마 양수와 가장 유사한 환경에서 아이가 편안하게 유영하는 모습을 생생하게 볼 수 있습니다.",
    },
    point2: {
      title: "수원 유일 베이비 스파",
      desc: "수원 일대에서 유일하게 전문 베이비 스파 시설을 갖추고 있어, 더헬리아만의 특별한 프리미엄 서비스를 경험하실 수 있습니다.",
    },
    point3: {
      title: "로하스베베 유기농 케어",
      desc: "소중한 우리 아이 피부를 위해 호주 프리미엄 유기농 스킨케어 브랜드 '로하스베베(Lohas Bebe)' 제품만을 사용하여 마사지를 진행합니다.",
    },
    point4: {
      title: "1:1 목욕 교육 & 실습",
      desc: "스파 후 진행되는 1:1 목욕 교육을 통해, 단순히 보는 것을 넘어 전문가의 코칭 아래 직접 아이를 목욕시켜 보는 실습 기회를 제공합니다.",
    },
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
  strengths: {
    point1: {
      title: "1:1 Private Spa",
      desc: "Experience our exclusive 1:1 care system where you can watch your baby swim comfortably in an environment that mimics the mother's amniotic fluid.",
    },
    point2: {
      title: "Exclusive in Suwon",
      desc: "We are the only facility in the Suwon area with a specialized baby spa, offering a unique premium service available only at The Helia.",
    },
    point3: {
      title: "Lohas Bebe Organic Care",
      desc: "We only use premium Australian organic skincare products from 'Lohas Bebe' for massages to protect your baby's precious skin.",
    },
    point4: {
      title: "1:1 Bathing Education",
      desc: "After the spa, we provide 1:1 bathing education where you can directly practice bathing your baby under expert coaching.",
    },
  },
};
