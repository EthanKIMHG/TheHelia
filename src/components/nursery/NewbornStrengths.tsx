"use client";

import { FadeInUp } from "@/components/common/FadeInUp";
import type { Locale } from "@/components/header/types";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

const strengths = [
  {
    id: "care",
    title: { ko: "1:3 소수 정예 케어 & 상시 오픈 투어", en: "1:3 Private Care & Open Tour" },
    desc: { 
      ko: "전문 간호 인력이 아이 셋을 전담하여 세심하게 케어합니다. 언제든 투어를 통해 투명하게 운영되는 신생아실을 직접 확인하실 수 있습니다.", 
      en: "Dedicated nursing staff provides 1:3 care. Our transparent operation allows for open tours anytime, giving you peace of mind." 
    },
    image: "/img/infant/strength_infant1.jpg", 
  },
  {
    id: "spacing",
    title: { ko: "100cm 감염 예방 거리두기", en: "100cm Safety Distance" },
    desc: { 
      ko: "모든 베지넷 간격을 100cm 이상 유지하여 비말 감염 및 교차 감염을 철저히 예방합니다. 넓은 공간은 아기에게도 쾌적한 환경을 제공합니다.", 
      en: "We maintain a strict 100cm distance between bassinets to prevent droplet and cross-infection, providing a spacious and safe environment." 
    },
    image: "/img/infant/strength_infant2.png", 
  },
  {
    id: "diaper",
    title: { ko: "1인 1 기저귀 갈이대 & 전용 처치", en: "Individual Diaper Station" },
    desc: { 
      ko: "교차 감염 방지를 위해 모든 아기는 전용 기저귀 갈이대를 사용합니다. 작은 처치 하나에도 타협하지 않는 위생 기준을 적용합니다.", 
      en: "To prevent cross-infection, every baby has their own dedicated diaper changing station. We apply uncompromising hygiene standards to every detail." 
    },
    image: "/img/infant/strength_infant3.png", 
  },
  {
    id: "bath",
    title: { ko: "매일 아침 개별 욕조 목욕", en: "Daily Individual Bath" },
    desc: { 
      ko: "매일 아침, 전용 욕조에서 개별 목욕을 진행하여 청결과 위생을 최우선으로 합니다. 아기의 컨디션을 체크하며 하루를 상쾌하게 시작합니다.", 
      en: "We prioritize hygiene with daily baths in individual tubs. It's a refreshing start to the day, allowing us to closely check your baby's condition." 
    },
    image: "/img/infant/strength_infant4.png", 
  },
];

export function NewbornStrengths({ locale }: { locale: Locale }) {
  return (
    <section className="w-full bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeInUp>
             <div className="mb-24 text-center">
                <span className="block mb-4 font-sans text-sm font-bold tracking-[0.2em] text-primary uppercase">
                    {locale === "ko" ? "더 헬리아 스탠다드" : "The Helia Standard"}
                </span>
                <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
                    {locale === "ko" ? "타협하지 않는 프리미엄 케어" : "Uncompromising Premium Care"}
                </h2>
             </div>
        </FadeInUp>

        <div className="flex flex-col gap-24 md:gap-32">
          {strengths.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col gap-8 md:flex-row md:items-center md:gap-16 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Image Section */}
              <div className="flex-1 relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] md:aspect-[16/10]">
                 <FadeInUp delay={0.2} className="w-full h-full">
                    <div className="relative w-full h-full"> 
                        <Image
                            src={item.image}
                            alt={item.title[locale]}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                         {/* Decorative Border */}
                        <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/20 pointer-events-none" />
                        
                     </div>
                  </FadeInUp>
                  {/* AI Image Disclaimer - Moved outside FadeInUp for stable positioning */}
                  <div className="absolute bottom-3 right-4 z-20 text-[10px] font-medium text-black/80 drop-shadow-md">
                      * 이 사진은 생성형 AI 로 만든 이미지 입니다.
                  </div>
               </div>

              {/* Text Section */}
              <div className="flex-1">
                <FadeInUp
                  delay={0.4}
                  className="flex flex-col gap-6 md:gap-8"
                >
                    <div className="flex items-center gap-3 text-primary/80">
                        <CheckCircle2 className="h-6 w-6" />
                        <span className="font-bold tracking-widest text-xs uppercase">
                            Strength 0{index + 1}
                        </span>
                    </div>
                    <h3 className="font-serif text-2xl font-semibold leading-tight text-foreground md:text-3xl">
                    {item.title[locale]}
                    </h3>
                    <p className="text-md leading-relaxed text-secondary/90 md:text-lg">
                    {item.desc[locale]}
                    </p>
                </FadeInUp>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
