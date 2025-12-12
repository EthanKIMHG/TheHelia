"use client";

import { FadeInUp } from "@/components/common/FadeInUp";
import type { Locale } from "@/components/header/types";
import { Activity, Baby, ClipboardCheck, DoorOpen, ShieldCheck, Thermometer } from "lucide-react";

const steps = [
  {
    icon: DoorOpen,
    title: { ko: "관찰실 이동 & 신체사정", en: "Observation Room & Check-up" },
    desc: { ko: "입소 직후 관찰실로 이동하여 꼼꼼한 신체 사정을 진행합니다.", en: "Initial body check-up immediately after arrival." },
  },
  {
    icon: Thermometer,
    title: { ko: "집중 관찰 1단계 (RSV)", en: "Intensive Observation 1 (RSV)" },
    desc: { ko: "발열, 기침, 재채기 등 RSV 바이러스 의심 증상을 면밀히 관찰합니다.", en: "Checking for RSV symptoms like fever and cough." },
  },
  {
    icon: ClipboardCheck,
    title: { ko: "집중 관찰 2단계 (로타)", en: "Intensive Observation 2 (Rota)" },
    desc: { ko: "분변 채취를 통해 로타 바이러스 감염 여부를 신속하게 검사합니다.", en: "Rapid testing for Rota virus via stool sample." },
  },
  {
    icon: Activity,
    title: { ko: "안심 격리 케어 (4시간)", en: "Safety Quarantine (4hrs)" },
    desc: { ko: "혹시 모를 잠복기를 대비하여 4시간 동안 안전하게 격리 관찰합니다.", en: "Precautionary isolation for 4 hours." },
  },
  {
    icon: Baby,
    title: { ko: "신생아실 1 이동", en: "Move to Nursery 1" },
    desc: { ko: "건강 상태 확인 후, 신입 아가들을 위한 신생아실 1로 이동합니다.", en: "Moving to Nursery 1 designated for newcomers." },
  },
  {
    icon: ShieldCheck,
    title: { ko: "신생아실 2 이동", en: "Move to Nursery 2" },
    desc: { ko: "적응 기간을 마친 후 메인 신생아실 2에서 생활하게 됩니다.", en: "Transfer to Main Nursery 2 after adaptation." },
  },
];

export function NewbornProcess({ locale }: { locale: Locale }) {
  return (
    <section className="w-full bg-background px-6 py-24 md:py-32">
        <div className="w-full max-w-[1450px] mx-auto">
            <FadeInUp>
                <div className="text-center mb-20 md:mb-32">
                    <span className="block mb-4 font-sans text-sm font-bold tracking-[0.2em] text-primary uppercase">
                        Process
                    </span>
                    <h2 className="font-serif text-4xl font-bold text-secondary md:text-5xl">
                        {locale === "ko" ? "체계적인 입소 프로세스" : "Systematic Admission Process"}
                    </h2>
                </div>
            </FadeInUp>

            {/* Horizontal Timeline Container */}
             <div className="relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-[27px] left-0 w-full h-[2px] bg-primary/20" />

                <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-4">
                    {steps.map((step, index) => (
                        <div key={index} className="relative flex flex-col md:items-center group">
                            {/* Dot/Node */}
                            <div className="hidden md:flex relative z-10 w-[54px] h-[54px] rounded-full border-[3px] border-background bg-primary items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary/30 mb-8 shadow-md">
                                <div className="w-3 h-3 rounded-full bg-white" />
                            </div>

                            {/* Card Content */}
                            <FadeInUp delay={index * 0.1}>
                                <div className="h-full flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-6 bg-primary/10 backdrop-blur-md rounded-[2rem] p-8 border border-white/40 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:bg-primary/5">
                                    {/* Mobile Icon */}
                                    <div className="md:hidden flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <step.icon className="w-6 h-6" />
                                    </div>
                                    
                                     {/* Center Icon (Desktop - inside card for better visual balance in this layout, or keep dot only? The reference has icons IN the card) */}
                                     {/* Reviewing reference: The reference has icons at top of card. */}
                                    <div className="hidden md:flex w-14 h-14 rounded-full bg-primary/5 items-center justify-center text-primary mb-2">
                                        <step.icon className="w-7 h-7" />
                                    </div>

                                    <div className="flex-1 md:text-center">
                                        <h3 className="font-serif text-lg font-bold text-secondary mb-3 leading-snug">
                                            {step.title[locale]}
                                        </h3>
                                        <p className="text-sm text-secondary/70 leading-relaxed word-keep-all">
                                            {step.desc[locale]}
                                        </p>
                                    </div>
                                </div>
                            </FadeInUp>
                        </div>
                    ))}
                </div>
             </div>
        </div>
    </section>
  );
}
