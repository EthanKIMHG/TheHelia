"use client";

import { FadeInUp } from "@/components/common/FadeInUp";
import type { Locale } from "@/components/header/types";
import {
  Baby,
  BookOpen,
  BrainCircuit,
  Camera,
  Heart,
  Moon,
  Move,
  Palette
} from "lucide-react";

export function ClassSchedule({ locale }: { locale: Locale }) {
  const isKo = locale === "ko";

  const programs = [
    {
      id: "sleep",
      icon: Moon,
      title: isKo ? "유니콘 수면 교육" : "Unicorn Sleep Edu",
      desc: isKo ? "아기의 올바른 수면 습관 형성" : "Building healthy sleep habits",
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      id: "pilates",
      icon: Move,
      title: isKo ? "산후 필라테스" : "Postpartum Pilates",
      desc: isKo ? "체형 교정 및 산후 회복 운동" : "Body alignment & recovery",
      color: "bg-rose-50 text-rose-600"
    },
    {
      id: "mbti",
      icon: BrainCircuit,
      title: isKo ? "엄마 육아 MBTI" : "Parenting MBTI",
      desc: isKo ? "나와 아이의 기질 맞춤 육아법" : "Personalized parenting style",
      color: "bg-violet-50 text-violet-600"
    },
    {
      id: "book",
      icon: BookOpen,
      title: isKo ? "책육아 & 초점책" : "Book Parenting",
      desc: isKo ? "정서 발달을 위한 첫 그림책" : "First books for development",
      color: "bg-amber-50 text-amber-600"
    },
    {
      id: "massage",
      icon: Heart,
      title: isKo ? "베이비 마사지" : "Baby Massage",
      desc: isKo ? "애착 형성 및 성장 발달 자극" : "Bonding & growth stimulation",
      color: "bg-red-50 text-red-600"
    },
    {
      id: "photo",
      icon: Camera,
      title: isKo ? "본아트 촬영" : "Newborn Photo",
      desc: isKo ? "가장 아름다운 순간의 기록" : "Capturing precious moments",
      color: "bg-stone-100 text-stone-600"
    },
    {
      id: "diy",
      icon: Palette,
      title: isKo ? "감성 DIY 클래스" : "Emotional DIY",
      desc: isKo ? "무드등, 흑백 모빌 만들기 등" : "Mood lamps, mobiles, etc.",
      color: "bg-teal-50 text-teal-600"
    },
    {
      id: "care",
      icon: Baby,
      title: isKo ? "신생아 케어 실습" : "Newborn Care",
      desc: isKo ? "목욕, 속싸개, 응급처치 교육" : "Bath, swaddle, first-aid",
      color: "bg-sky-50 text-sky-600"
    }
  ];

  return (
    <section className="w-full px-4 mb-20 text-secondary">
      <div className="mx-auto max-w-6xl">
         <FadeInUp>
            <div className="mb-16 text-center">
               <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                  {isKo ? "The Helia Programs" : "The Helia Programs"}
               </h2>
               <p className="mt-4 text-stone-500 max-w-2xl mx-auto leading-relaxed">
                  {isKo 
                   ? "산모님의 회복과 아기의 성장을 위해, 다채롭고 전문적인 프로그램들이 매일 준비되어 있습니다." 
                   : "Diverse professional programs are ready every day for your recovery and baby's growth."}
               </p>
            </div>
         </FadeInUp>

         {/* Program Grid */}
         <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {programs.map((item, idx) => (
                <FadeInUp key={item.id} delay={idx * 0.05}>
                    <div className="group flex flex-col items-center justify-center gap-4 rounded-[2rem] bg-white dark:bg-stone-900 p-6 md:p-8 text-center shadow-sm border border-stone-100 dark:border-white/5 transition-all hover:shadow-lg hover:-translate-y-1 hover:border-primary/20 dark:hover:border-white/20 aspect-video md:aspect-square">
                        <div className={`flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl ${item.color} dark:bg-opacity-20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                            <item.icon className="h-6 w-6 md:h-7 md:w-7" />
                        </div>
                        <div className="space-y-1 md:space-y-2">
                             <h3 className="font-serif text-base md:text-lg font-bold text-foreground break-keep">
                                 {item.title}
                             </h3>
                             <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 break-keep leading-relaxed">
                                 {item.desc}
                             </p>
                        </div>
                    </div>
                </FadeInUp>
            ))}
         </div>
      </div>
    </section>
  );
}
