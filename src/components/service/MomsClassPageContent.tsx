"use client";

import type { Locale } from "@/components/header/types";
import { ClassSchedule } from "@/components/service/ClassSchedule";

export function MomsClassPageContent({ locale }: { locale: Locale }) {
  return (
    <div className="flex flex-col gap-24 pb-24 md:gap-32">
       {/* 1. Key Competitiveness (Strengths) */}
       {/* Decorative Divider */}
    
       {/* 2. Weekly Schedule */}
       <ClassSchedule locale={locale} />
    </div>
  );
}
