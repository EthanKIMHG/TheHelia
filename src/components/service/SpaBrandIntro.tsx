"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import { GlassCard } from "@/components/ui/glass/GlassCard";
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
      <section className="overflow-hidden">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className="space-y-10 text-left">
            <div className="space-y-8 text-center lg:text-left">
              <span className="eyebrow inline-flex">
                {copy.badge}
              </span>
              <h2 className="whitespace-pre-line break-keep font-display-serif text-3xl font-normal leading-[1.4] text-foreground md:text-4xl">
                {copy.headline}
              </h2>
              <p className="mx-auto max-w-[34ch] whitespace-pre-line break-keep text-sm leading-[1.9] text-secondary md:max-w-[42ch] md:text-base lg:mx-0">
                {copy.intro}
              </p>
            </div>

            <div className="border-t border-border pt-6">
              <div className="flex items-center gap-3">
                <Waves className="h-5 w-5 text-primary" strokeWidth={1.5} />
                <div>
                  <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                    THALAC
                  </p>
                  <h3 className="mt-1 break-keep font-display-serif text-2xl font-normal leading-[1.4] text-foreground">
                    {copy.thalac.title}
                  </h3>
                </div>
              </div>
              <p className="mt-4 whitespace-pre-line break-keep text-sm leading-[1.85] text-secondary md:text-base">
                {copy.thalac.description}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="">
              <GlassCard radius="lg" className="relative h-60 overflow-hidden md:h-[420px]">
                <Image
                  src="/img/spa/us/thalac.jpg"
                  alt="THALAC premium spa products used at The Helia"
                  fill
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="object-cover"
                />
              </GlassCard>
            </div>

            <div className="grid gap-x-8 gap-y-10 md:grid-cols-3">
              {copy.thalac.features.map((feature, index) => {
                const Icon = ICON_MAP[feature.icon];
                return (
                  <GlassCard
                    as="article"
                    key={index}
                    radius="card"
                    className="p-6 text-left"
                  >
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                    <h4 className="mt-4 break-keep font-display-serif text-lg font-normal leading-[1.5] text-foreground">
                      {feature.title}
                    </h4>
                    <p className="mt-2 break-keep text-sm leading-[1.85] text-secondary">
                      {feature.description}
                    </p>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
