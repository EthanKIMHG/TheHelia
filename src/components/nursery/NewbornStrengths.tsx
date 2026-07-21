"use client";

import { FadeInUp } from "@/components/common/FadeInUp";
import type { Locale } from "@/components/header/types";
import { GlassCard } from "@/components/ui/glass/GlassCard";
import { blobUrl } from "@/lib/media";
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
    image: blobUrl("img/infant/us/care.jpg"),
  },
  {
    id: "spacing",
    title: { ko: "100cm 감염 예방 거리두기", en: "100cm Safety Distance" },
    desc: { 
      ko: "모든 베지넷 간격을 100cm 이상 유지하여 비말 감염 및 교차 감염을 철저히 예방합니다. 넓은 공간은 아기에게도 쾌적한 환경을 제공합니다.", 
      en: "We maintain a strict 100cm distance between bassinets to prevent droplet and cross-infection, providing a spacious and safe environment." 
    },
    image: blobUrl("img/infant/us/bassinet.jpg"),
  },
  {
    id: "diaper",
    title: { ko: "1인 1 기저귀 갈이대 & 전용 처치", en: "Individual Diaper Station" },
    desc: { 
      ko: "교차 감염 방지를 위해 모든 아기는 전용 기저귀 갈이대를 사용합니다. 작은 처치 하나에도 타협하지 않는 위생 기준을 적용합니다.", 
      en: "To prevent cross-infection, every baby has their own dedicated diaper changing station. We apply uncompromising hygiene standards to every detail." 
    },
    image: blobUrl("img/infant/us/tending.jpg"),
  },
  {
    id: "bath",
    title: { ko: "매일 아침 개별 욕조 목욕", en: "Daily Individual Bath" },
    desc: { 
      ko: "매일 아침, 전용 욕조에서 개별 목욕을 진행하여 청결과 위생을 최우선으로 합니다. 아기의 컨디션을 체크하며 하루를 상쾌하게 시작합니다.", 
      en: "We prioritize hygiene with daily baths in individual tubs. It's a refreshing start to the day, allowing us to closely check your baby's condition." 
    },
    image: blobUrl("img/infant/us/bath.jpg"),
  },
];

export function NewbornStrengths({ locale }: { locale: Locale }) {
  return (
    <section className="glass-depth w-full px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeInUp>
             <div className="mb-24 text-center">
                <span className="eyebrow block mb-6">
                    {locale === "ko" ? "더헬리아 스탠다드" : "The Helia Standard"}
                </span>
                <h2 className="font-display-serif text-4xl font-normal leading-[1.4] break-keep text-foreground md:text-4xl">
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
              <GlassCard radius="lg" className="flex-1 relative aspect-[4/3] w-full overflow-hidden md:aspect-[16/10]">
                 <FadeInUp delay={0.2} className="w-full h-full">
                    <div className="relative w-full h-full">
                        <Image
                            src={item.image}
                            alt={item.title[locale]}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                        />
                     </div>
                  </FadeInUp>
               </GlassCard>

              {/* Text Section */}
              <div className="flex-1">
                <FadeInUp
                  delay={0.4}
                  className="flex flex-col gap-6 md:gap-8"
                >
                    <div className="eyebrow flex items-center gap-2">
                        <CheckCircle2 className="h-3 w-3" strokeWidth={1.5} />
                        <span>
                            Strength 0{index + 1}
                        </span>
                    </div>
                    <h3 className="font-display-serif text-2xl font-normal leading-[1.4] text-foreground md:text-3xl">
                    {item.title[locale]}
                    </h3>
                    <p className="break-keep text-base leading-[1.85] text-secondary md:text-lg">
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
