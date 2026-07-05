"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import { TransitionLink } from "@/components/common/TransitionLink";
import { DEFAULT_BLUR_DATA_URL } from "@/lib/blur-placeholder";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
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
      className="w-full bg-background px-4 pb-24 pt-4 md:px-8 md:pb-36"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-4">
          {highlights.map((item, index) => (
            <TriptychCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}


function TriptychCard({
  item,
  index,
}: {
  item: HomeExperienceHighlight;
  index: number;
}) {
  const params = useParams();
  const locale = params?.locale ?? "ko";

  const getHref = (idx: number) => {
    switch (idx) {
      case 0:
        return `/${locale}/room-suites/vip`;
      case 1:
        return `/${locale}/service/infant-room`;
      case 2:
        return `/${locale}/service/helia-spa`;
      default:
        return "#";
    }
  };

  return (
    <ScrollReveal>
      <TransitionLink href={getHref(index)} className="group block">
        {/* Tall photography — the focus */}
        <div className="relative aspect-[3/5] w-full overflow-hidden bg-accent/60">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            placeholder="blur"
            blurDataURL={DEFAULT_BLUR_DATA_URL}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        </div>

        {/* Minimal caption below the image */}
        <div className="flex items-center justify-between gap-3 pt-6 text-left">
          <div>
            <span className="eyebrow">{item.meta}</span>
            <h3 className="mt-3 font-display-serif text-xl font-normal text-foreground md:text-2xl">
              {item.title}
            </h3>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground/40 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>
      </TransitionLink>
    </ScrollReveal>
  );
}
