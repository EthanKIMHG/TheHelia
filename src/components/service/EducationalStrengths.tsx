"use client";

import { FadeInUp } from "@/components/common/FadeInUp";
import type { Locale } from "@/components/header/types";
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
    <section className="w-full px-4 text-secondary">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <FadeInUp>
          <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="font-serif text-3xl font-bold leading-tight md:text-4xl lg:text-5xl text-foreground">
              {isKo ? "새로운 영감을 주는" : "Inspiring"} <br />
              <span className="text-secondary/60">{isKo ? "헬리아의 교육" : "The Helia Class"}</span>
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-secondary/80 md:text-lg">
              {isKo 
               ? "단순한 지식 전달을 넘어, 육아의 자신감을 채워주는 4가지 핵심 가치를 담았습니다." 
               : "Beyond knowledge, we deliver 4 core values to build your parenting confidence."}
            </p>
          </div>
        </FadeInUp>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 lg:gap-6 h-auto md:h-[800px]">
          
          {/* Card 1: Trendy (Large Left) */}
          <div className="group relative col-span-1 row-span-1 md:col-span-2 md:row-span-2 overflow-hidden rounded-[2.5rem] bg-stone-900 transition-all hover:shadow-lg">
             {/* Background Image - Full Visibility */}
             <div className="absolute inset-0">
                 <Image 
                    src="/img/momclass/strength-momclass1.png"
                    alt="Education"
                    fill
                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                 />
                 {/* Gradient for text readability */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
             </div>

             <div className="relative flex h-full flex-col justify-between p-8 md:p-12 z-10 text-white">
                 <div className="flex items-start justify-between">
                    <span className="rounded-full bg-white/20 backdrop-blur-md px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-sm border border-white/20">
                        Trend
                    </span>
                    <Quote className="h-10 w-10 text-white/50" />
                 </div>
                 
                 <div className="space-y-6">
                    <h3 className="font-serif text-2xl font-bold leading-tight md:text-4xl text-white">
                      {isKo ? "실전 육아의" : "Pratical"} <br/>
                      <span className="text-primary-foreground/90">{isKo ? "새로운 기준" : "Standard"}</span>
                    </h3>
                    <p className="max-w-md text-base leading-relaxed text-white/90 font-medium shadow-black/10 drop-shadow-sm">
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
                            <li key={item} className="flex items-center gap-3 text-white/90 font-medium text-sm md:text-base">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                {item}
                            </li>
                        ))}
                    </ul>
                 </div>
             </div>
          </div>

          {/* Card 2: Medical (Top Right) */}
          <div className="group relative col-span-1 row-span-1 overflow-hidden rounded-[2.5rem] transition-all hover:shadow-md">
             {/* Full Visible Image */}
             <div className="absolute inset-0">
                 <Image 
                    src="/img/momclass/strength-momclass2.png"
                    alt="Medical"
                    fill
                    className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             </div>

             <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/20">
                    <Stethoscope className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="mb-3 font-serif text-xl font-bold text-white">
                        Medical & Safety
                    </h3>
                    <p className="text-white/80 leading-relaxed text-sm">
                        {isKo 
                        ? "주 2회 소아과 전문의 회진과 전문적인 응급처치 교육으로 불안감을 해소합니다." 
                        : "Twice-weekly pediatrician rounds and emergency training to relieve anxiety."}
                    </p>
                </div>
             </div>
          </div>

          {/* Card 3: Recovery (Bottom Right 1) */}
          <div className="group relative col-span-1 row-span-1 overflow-hidden rounded-[2.5rem] transition-all hover:shadow-md">
             {/* Full Visible Image */}
             <div className="absolute inset-0">
                 <Image 
                    src="/img/momclass/strength-momclass3.png"
                    alt="Recovery"
                    fill
                    className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             </div>

             <div className="relative z-10 p-8 h-full flex flex-col justify-between text-white">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white border border-white/20">
                    <Activity className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="mb-3 font-serif text-xl font-bold text-white">
                        Body Recovery
                    </h3>
                    <p className="text-white/80 leading-relaxed text-sm">
                        {isKo 
                        ? "산후 필라테스와 자가 유방 관리 교육으로 내 몸을 돌보는 시간을 가집니다." 
                        : "Time to care for yourself with Postpartum Pilates and breast care education."}
                    </p>
                </div>
             </div>
          </div>

        </div>

        {/* Bottom Banner: Hybrid */}
        <FadeInUp delay={0.3}>
            <div className="group mt-4 md:mt-6 rounded-[2.5rem] bg-stone-900 dark:bg-black/40 px-8 py-10 md:px-12 md:py-16 text-white overflow-hidden relative border dark:border-white/10">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20 dark:opacity-40 group-hover:scale-105 transition-transform duration-700 mix-blend-overlay">
                     <Image 
                        src="/img/headerpreview/vip.jpg"
                        alt="Hybrid Class"
                        fill
                        className="object-cover grayscale"
                     />
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur-md text-white/90">
                            <Smartphone className="h-3 w-3" />
                            <span>Hybrid System</span>
                        </div>
                        <h3 className="font-serif text-xl md:text-3xl font-bold text-white">
                            {isKo ? "언제 어디서나, 유연한 교육" : "Flexible Learning Anywhere"}
                        </h3>
                        <p className="max-w-xl text-white/70 text-sm md:text-base">
                            {isKo 
                             ? "컨디션이 좋지 않을 땐 룸에서 QR코드로 편안하게. 산모님의 회복 속도에 맞춘 하이브리드 교육 환경을 제공합니다." 
                             : "Learn comfortably from your room via QR code when resting. We offer a hybrid environment tailored to your recovery pace."}
                        </p>
                    </div>
                    
                    {/* Visual Graphic Element */}
                    <div className="flex-shrink-0 h-20 w-20 md:h-24 md:w-24 rounded-2xl bg-white/10 backdrop-blur-lg flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                        <span className="font-serif text-3xl font-italic opacity-50 text-white">QR</span>
                    </div>
                </div>

                {/* Abstract Background */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 opacity-30 group-hover:opacity-50 transition-opacity" />
            </div>
        </FadeInUp>
      </div>
    </section>
  );
}
