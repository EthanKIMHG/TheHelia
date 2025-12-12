"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import { DEFAULT_BLUR_DATA_URL } from "@/lib/blur-placeholder";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { HomeExperienceHighlight } from "./HomeExperienceShowcase";

type BentoGridShowcaseProps = {
  highlights: HomeExperienceHighlight[];
  onSectionMount?: (id: string, node: HTMLElement | null) => void;
};

export function BentoGridShowcase({ highlights, onSectionMount }: BentoGridShowcaseProps) {
  return (
    <section
      id="bento-showcase"
      ref={(node) => onSectionMount?.("bento-showcase", node)}
      className="w-full bg-background px-4 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-6 lg:gap-8">
          {highlights.map((item, index) => (
            <BentoCard
              key={item.title}
              item={item}
              index={index}
              className={
                index === 0
                  ? "md:col-span-2 md:row-span-2" // First item (Suites) takes 2x2
                  : index === 1
                  ? "md:col-span-1 md:row-span-1" // Second item (Nursery) takes 1x1
                  : "md:col-span-1 md:row-span-1" // Third item (Spa) takes 1x1
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  item,
  index,
  className,
}: {
  item: HomeExperienceHighlight;
  index: number;
  className?: string;
}) {
  return (
    <ScrollReveal
      className={`group relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/5 backdrop-blur-2xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:bg-white/10 ${className}`}
    >
      {/* Image Background - Darker overlay for text contrast */}
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          placeholder="blur"
          blurDataURL={DEFAULT_BLUR_DATA_URL}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end p-8 text-white md:p-10">
        <div className="mb-auto flex justify-between">
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
            {item.meta}
          </span>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-colors group-hover:bg-white group-hover:text-black">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-8 transform transition-transform duration-500 group-hover:-translate-y-2">
          <h3 className="mb-3 font-serif text-2xl md:text-3xl font-semibold leading-tight">
            {item.title}
          </h3>
          <p className="mb-5 text-sm text-foreground/90 line-clamp-3 md:text-base font-light tracking-wide">
            {item.description}
          </p>
          
          {/* Bullets */}
          <ul className="hidden space-y-2 text-md text-foreground/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block">
            {item.bullets?.slice(0, 3).map((bullet) => (
              <li key={bullet} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ScrollReveal>
  );
}
