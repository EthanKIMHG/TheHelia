"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import type { Locale } from "@/components/header/types";
import { Baby, Heart, Shield, Sparkles, Users, Utensils } from "lucide-react";

type HomeProgramsProps = {
  locale: Locale;
  onSectionMount?: (node: HTMLElement | null) => void;
};

export function HomePrograms({ locale, onSectionMount }: HomeProgramsProps) {
  const isKo = locale === "ko";
  const copy = isKo ? KOREAN_COPY : ENGLISH_COPY;

  return (
    <section
      ref={onSectionMount ? (node) => onSectionMount(node) : undefined}
      className="w-full py-24 bg-[#FDFBF9] dark:bg-background"
    >
      <ScrollReveal>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 fill-current" />
              Programs
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground leading-tight mb-4">
              {copy.title}
            </h2>
            <p className="text-secondary/80 text-lg">
              {copy.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {copy.programs.map((program, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-[#2A2928]/40 rounded-[2rem] p-8 border border-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {index === 0 && <Shield className="w-7 h-7" />}
                    {index === 1 && <Baby className="w-7 h-7" />}
                    {index === 2 && <Utensils className="w-7 h-7" />}
                    {index === 3 && <Sparkles className="w-7 h-7" />}
                    {index === 4 && <Users className="w-7 h-7" />}
                    {index === 5 && <Heart className="w-7 h-7" />}
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {program.title}
                  </h3>
                  <p className="text-secondary/80 leading-relaxed">
                    {program.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

const KOREAN_COPY = {
  title: "전문적인 케어 프로그램",
  subtitle: "산모와 아기를 위한 체계적이고 전문적인 케어 시스템",
  programs: [
    {
      title: "24시간 의료 케어",
      description: "전문 의료진이 24시간 상주하여 산모와 아기를 케어합니다"
    },
    {
      title: "신생아 케어",
      description: "소아과 전문의의 체계적인 신생아 건강 관리"
    },
    {
      title: "맞춤 영양 식단",
      description: "영양사가 산모 개인별 맞춤 식단을 제공합니다"
    },
    {
      title: "산후 회복 프로그램",
      description: "요가, 마사지, 산후 관리 프로그램"
    },
    {
      title: "산모 교육",
      description: "육아 교육 및 모유수유 상담"
    },
    {
      title: "정서 케어",
      description: "산후우울증 예방을 위한 심리 상담"
    }
  ]
};

const ENGLISH_COPY = {
  title: "Professional Care Programs",
  subtitle: "Systematic and professional care system for mother and baby",
  programs: [
    {
      title: "24H Medical Care",
      description: "Medical specialists available 24/7 for mother and baby care"
    },
    {
      title: "Newborn Care",
      description: "Systematic newborn health management by pediatricians"
    },
    {
      title: "Customized Nutrition",
      description: "Personalized meal plans provided by nutritionists"
    },
    {
      title: "Postpartum Recovery",
      description: "Yoga, massage, and postpartum management programs"
    },
    {
      title: "Maternal Education",
      description: "Parenting education and breastfeeding counseling"
    },
    {
      title: "Emotional Care",
      description: "Psychological counseling for postpartum depression prevention"
    }
  ]
};
