"use client";

import type { Locale } from "@/components/header/types";
import { ClassSchedule } from "@/components/service/ClassSchedule";
import { EducationalStrengths } from "@/components/service/EducationalStrengths";

export function MomsClassPageContent({ locale }: { locale: Locale }) {
  return (
    <div className="flex flex-col gap-24 pb-24 md:gap-32">
       {/* 1. Key Competitiveness (Strengths) */}
       <EducationalStrengths locale={locale} />

       {/* Decorative Divider */}
       <div className="w-full px-4">
           <div className="mx-auto h-px max-w-7xl bg-stone-100" />
       </div>

       {/* 2. Weekly Schedule */}
       <ClassSchedule locale={locale} />
    </div>
  );
}
