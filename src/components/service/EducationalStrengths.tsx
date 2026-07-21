"use client";

import { FadeInUp } from "@/components/common/FadeInUp";
import type { Locale } from "@/components/header/types";
import { GlassCard } from "@/components/ui/glass/GlassCard";
import {
    Activity,
    Quote,
    Smartphone,
    Sparkles,
    Stethoscope
} from "lucide-react";
import Image from "next/image";

export function EducationalStrengths({ locale }: { locale: Locale }) {
  const isKo = locale === "ko";

  return (
    <section className="w-full px-4 text-foreground">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 lg:gap-6 h-auto md:h-[800px]">
          
          {/* Card 1: Trendy (Large Left) */}
          <GlassCard radius="lg" className="group relative col-span-1 row-span-1 md:col-span-2 md:row-span-2 overflow-hidden">
             {/* Background Image - Full Visibility */}
             <div className="absolute inset-0">
                 <Image
                    src="/img/momclass/strength-momclass1.png"
                    alt={isKo ? "더헬리아 산모 교육 프로그램 대표 이미지" : "Mothers education program at The Helia"}
                    fill
                    className="object-cover opacity-90 group-hover:scale-[1.03] transition-transform duration-700"
                 />
                 {/* Gradient for text readability */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                 {/* AI Image Disclaimer */}
                 <div className="absolute bottom-3 right-4 z-20 text-[10px] font-medium text-white/40 drop-shadow-md">
                   * 이 사진은 생성형 AI 로 만든 이미지 입니다.
                 </div>
             </div>

             <div className="relative flex h-full flex-col justify-between p-8 md:p-12 z-10 text-white">
                 <div className="flex items-start justify-between">
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-white drop-shadow-md">
                        Trend
                    </span>
                    <Quote className="h-10 w-10 text-white/50" strokeWidth={1.5} />
                 </div>

                 <div className="space-y-6">
                    <h3 className="font-display-serif text-2xl font-normal leading-[1.4] md:text-4xl text-white">
                      {isKo ? "실전 육아의" : "Pratical"} <br/>
                      <span className="text-white/90">{isKo ? "새로운 기준" : "Standard"}</span>
                    </h3>
                    <p className="max-w-md text-base leading-[1.85] text-white/90 drop-shadow-sm">
                        {isKo
                         ? "유니콘 수면 교육부터 육아 MBTI까지. 요즘 엄마들이 가장 궁금해하는 트렌디한 콘텐츠를 엄선했습니다."
                         : "From Unicorn Sleep Training to Parenting MBTI. We curated the trendiest contents that modern moms care about."}
                    </p>
                    <ul className="space-y-3 pt-4">
                        {[
                            isKo ? "수면 전문가 초빙 교육" : "Sleep Expert Session",
                            isKo ? "우리 아이 기질 파악 (MBTI)" : "Baby Temperament (MBTI)",
                            isKo ? "정서 발달 책육아 솔루션" : "Book Parenting Solution"
                        ].map((item) => (
                            <li key={item} className="flex items-center gap-3 text-white/90 text-sm md:text-base">
                                <div className="h-px w-3 bg-white/80" />
                                {item}
                            </li>
                        ))}
                    </ul>
                 </div>
             </div>
          </GlassCard>

          {/* Card 2: Medical (Top Right) */}
          <GlassCard radius="md" className="group relative col-span-1 row-span-1 overflow-hidden">
             {/* Full Visible Image */}
             <div className="absolute inset-0">
                 <Image
                    src="/img/momclass/strength-momclass2.png"
                    alt={isKo ? "소아과 전문의 회진과 안전 교육을 상징하는 이미지" : "Image representing pediatric rounds and safety education"}
                    fill
                    className="object-cover opacity-80 group-hover:scale-[1.03] transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                 {/* AI Image Disclaimer */}
                 <div className="absolute bottom-3 right-4 z-20 text-[10px] font-medium text-white/40 drop-shadow-md">
                   * 이 사진은 생성형 AI 로 만든 이미지 입니다.
                 </div>
             </div>

             <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
                <Stethoscope className="h-5 w-5 text-white drop-shadow-md" strokeWidth={1.5} />
                <div>
                    <h3 className="mb-3 font-display-serif text-xl font-normal leading-[1.4] text-white">
                        Medical & Safety
                    </h3>
                    <p className="text-white/80 leading-relaxed text-sm">
                        {isKo
                        ? "주 2회 소아과 전문의 회진과 전문적인 응급처치 교육으로 불안감을 해소합니다."
                        : "Twice-weekly pediatrician rounds and emergency training to relieve anxiety."}
                    </p>
                </div>
             </div>
          </GlassCard>

          {/* Card 3: Recovery (Bottom Right 1) */}
          <GlassCard radius="md" className="group relative col-span-1 row-span-1 overflow-hidden">
             {/* Full Visible Image */}
             <div className="absolute inset-0">
                 <Image
                    src="/img/momclass/strength-momclass3.png"
                    alt={isKo ? "산후 회복 교육과 필라테스를 상징하는 이미지" : "Image representing postpartum recovery education and pilates"}
                    fill
                    className="object-cover opacity-80 group-hover:scale-[1.03] transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                 {/* AI Image Disclaimer */}
                 <div className="absolute bottom-3 right-4 z-20 text-[10px] font-medium text-white/40 drop-shadow-md">
                   * 이 사진은 생성형 AI 로 만든 이미지 입니다.
                 </div>
             </div>

             <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
                <Activity className="h-5 w-5 text-white drop-shadow-md" strokeWidth={1.5} />
                <div>
                    <h3 className="mb-3 font-display-serif text-xl font-normal leading-[1.4] text-white">
                        Body Recovery
                    </h3>
                    <p className="text-white/80 leading-relaxed text-sm">
                        {isKo
                        ? "산후 필라테스와 자가 유방 관리 교육으로 내 몸을 돌보는 시간을 가집니다."
                        : "Time to care for yourself with Postpartum Pilates and breast care education."}
                    </p>
                </div>
             </div>
          </GlassCard>

        </div>

        {/* Bottom Banner: Hybrid */}
        <FadeInUp delay={0.3}>
            <div className="group mt-4 md:mt-6 bg-foreground px-8 py-10 md:px-12 md:py-16 text-background overflow-hidden relative rounded-[var(--radius-lg)]">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20 dark:opacity-40 group-hover:scale-[1.03] transition-transform duration-700 mix-blend-overlay">
                     <Image
                        src="/img/headerpreview/vip.jpg"
                        alt={isKo ? "하이브리드 산모 교육을 상징하는 이미지" : "Image representing hybrid learning for mothers"}
                        fill
                        className="object-cover grayscale"
                     />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.3em] text-background/90">
                            <Smartphone className="h-3 w-3" strokeWidth={1.5} />
                            <span>Hybrid System</span>
                        </div>
                        <h3 className="font-display-serif text-xl md:text-3xl font-normal leading-[1.4] text-background">
                            {isKo ? "언제 어디서나, 유연한 교육" : "Flexible Learning Anywhere"}
                        </h3>
                        <p className="max-w-xl text-background/70 text-sm md:text-base leading-[1.85]">
                            {isKo
                             ? "컨디션이 좋지 않을 땐 룸에서 QR코드로 편안하게. 산모님의 회복 속도에 맞춘 하이브리드 교육 환경을 제공합니다."
                             : "Learn comfortably from your room via QR code when resting. We offer a hybrid environment tailored to your recovery pace."}
                        </p>
                    </div>

                    {/* Visual Graphic Element */}
                    <div className="flex-shrink-0 h-20 w-20 md:h-24 md:w-24 flex items-center justify-center rounded-[var(--radius-md)] border border-background/30 transition-colors duration-500 group-hover:border-background/60">
                        <span className="font-serif text-3xl font-italic opacity-50 text-background">QR</span>
                    </div>
                </div>
            </div>
        </FadeInUp>
      </div>
    </section>
  );
}
