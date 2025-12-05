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
          <h2 className="text-2xl md:text-2xl lg:text-3xl font-serif font-semibold text-foreground mb-6 leading-tight">
            {copy.headline}
          </h2>
          <p className="text-lg text-secondary/80 leading-relaxed whitespace-pre-line">
            {copy.intro}
          </p>
        </div>

        {/* Bottom Section: THALAC Brand Story */}
        <div className="relative w-full bg-white/40 dark:bg-black/5 border-t border-border/10">
          {/* Image Grid (Merged from SpaImageBento) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-[400px] md:h-[500px] p-4">
            {/* Left: THALAC Products */}
            <div className="relative overflow-hidden group rounded-t-xl md:rounded-l-xl">
              <Image
                src="/img/spa/thalac.png"
                alt="THALAC Premium Products"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-sm font-medium uppercase tracking-wider mb-2 opacity-80">Premium Aesthetic</p>
                <h3 className="text-2xl font-serif">THALAC</h3>
              </div>
            </div>

            {/* Right: Spa Main Atmosphere */}
            <div className="relative overflow-hidden group rounded-b-xl md:rounded-r-xl">
              <Image
                src="/img/spa/thalac2.jpg"
                alt="Helia Spa Atmosphere"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-sm font-medium uppercase tracking-wider mb-2 opacity-80">Relaxation</p>
                <h3 className="text-2xl font-serif">Signature Spa</h3>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto p-8 md:p-12 lg:p-16">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Waves className="w-8 h-8 text-primary" />
                <h3 className="text-3xl font-serif font-semibold text-foreground">
                  THALAC
                </h3>
              </div>
              <h4 className="text-2xl md:text-3xl font-medium text-foreground mb-6 leading-snug">
                {copy.thalac.title}
              </h4>
              <p className="text-secondary/80 leading-relaxed whitespace-pre-line text-base md:text-lg max-w-3xl">
                {copy.thalac.description}
              </p>
            </div>
            
            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {copy.thalac.features.map((feature, index) => {
                const Icon = ICON_MAP[feature.icon];
                return (
                  <div 
                    key={index} 
                    className="bg-white/80 dark:bg-white/5 p-6 rounded-3xl border border-primary/5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto md:mx-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h5 className="font-medium text-lg text-foreground mb-2 text-center md:text-left">
                      {feature.title}
                    </h5>
                    <p className="text-sm text-secondary/70 leading-relaxed text-center md:text-left">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
