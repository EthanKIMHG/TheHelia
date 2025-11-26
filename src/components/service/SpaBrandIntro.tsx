"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import { Crown, ShieldCheck, Sparkles, Waves } from "lucide-react";
import Image from "next/image";

type SpaBrandIntroProps = {
  copy: {
    badge: string;
    headline: string;
    intro: string;
    thalac: {
      title: string;
      description: string;
      features: {
        icon: "crown" | "sparkles" | "shield";
        title: string;
        description: string;
      }[];
    };
  };
};

const ICON_MAP = {
  crown: Crown,
  sparkles: Sparkles,
  shield: ShieldCheck,
};

export function SpaBrandIntro({ copy }: SpaBrandIntroProps) {
  return (
    <ScrollReveal>
      <div className="rounded-[2.5rem] border border-border/30 bg-white/60 dark:bg-[#2A2928]/40 backdrop-blur-sm overflow-hidden shadow-sm">
        {/* Top Section: Philosophy Intro */}
        <div className="text-center px-8 pt-16 pb-12 md:px-16 md:pt-20 md:pb-16 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            {copy.badge}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6 leading-tight">
            {copy.headline}
          </h2>
          <p className="text-lg text-secondary/80 leading-relaxed whitespace-pre-line">
            {copy.intro}
          </p>
        </div>

        {/* Bottom Section: THALAC Brand Story */}
        <div className="relative w-full bg-white/40 dark:bg-black/5 border-t border-border/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative h-[400px] lg:h-auto min-h-[500px] order-2 lg:order-1">
              <Image
                src="/img/spa/thalac.png"
                alt="THALAC Spa Products"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/5 dark:bg-black/20" />
            </div>

            {/* Content Side */}
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <Waves className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-serif font-semibold text-foreground">
                  THALAC
                </h3>
              </div>
              <h4 className="text-xl md:text-2xl font-medium text-foreground mb-6 leading-snug">
                {copy.thalac.title}
              </h4>
              <p className="text-secondary/80 leading-relaxed mb-10 whitespace-pre-line text-base md:text-lg">
                {copy.thalac.description}
              </p>
              
              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {copy.thalac.features.map((feature, index) => {
                  const Icon = ICON_MAP[feature.icon];
                  return (
                    <div 
                      key={index} 
                      className="bg-white/80 dark:bg-white/5 p-5 rounded-2xl border border-primary/5 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h5 className="font-medium text-foreground mb-1">
                        {feature.title}
                      </h5>
                      <p className="text-sm text-secondary/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
