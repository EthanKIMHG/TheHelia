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
      <section className="overflow-hidden rounded-[2.5rem] border border-border/30 bg-gradient-to-br from-primary/10 via-background to-background/95 shadow-sm">
        <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div className="space-y-6 text-left">
            <div className="space-y-4">
              <span className="inline-flex rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                {copy.badge}
              </span>
              <h2 className="whitespace-pre-line break-keep text-3xl font-serif font-semibold leading-[1.24] text-foreground md:text-4xl md:leading-tight">
                {copy.headline}
              </h2>
              <p className="max-w-[34ch] whitespace-pre-line break-keep text-sm leading-[1.9] text-foreground/78 md:max-w-[42ch] md:text-base">
                {copy.intro}
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-border/30 bg-white/82 p-6 shadow-sm backdrop-blur-sm dark:bg-[#2A2928]/60">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-[#333231]">
                  <Waves className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                    THALAC
                  </p>
                  <h3 className="mt-1 break-keep text-2xl font-semibold leading-snug text-foreground font-serif">
                    {copy.thalac.title}
                  </h3>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-line break-keep text-sm leading-[1.85] text-foreground/74 md:text-base">
                {copy.thalac.description}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="">
              <div className="relative h-72 overflow-hidden rounded-[2rem] border border-border/30 shadow-sm md:h-[420px]">
                <Image
                  src="/img/spa/thalac.png"
                  alt="THALAC premium spa products used at The Helia"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {copy.thalac.features.map((feature, index) => {
                const Icon = ICON_MAP[feature.icon];
                return (
                  <article
                    key={index}
                    className="rounded-[1.75rem] border border-border/30 bg-white/82 p-5 text-left shadow-sm backdrop-blur-sm dark:bg-[#2A2928]/60"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-[#333231]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="mt-4 break-keep text-lg font-medium text-foreground">
                      {feature.title}
                    </h4>
                    <p className="mt-2 break-keep text-sm leading-[1.8] text-foreground/70">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
