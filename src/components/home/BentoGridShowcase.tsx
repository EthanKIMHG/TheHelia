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
                  ? "min-h-[460px] md:min-h-[860px] md:col-span-2 md:row-span-2" // First item (Suites) takes 2x2
                  : index === 1
                  ? "min-h-[360px] md:min-h-[430px] md:col-span-1 md:row-span-1" // Second item (Nursery) takes 1x1
                  : "min-h-[360px] md:min-h-[430px] md:col-span-1 md:row-span-1" // Third item (Spa) takes 1x1
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
  const params = useParams();
  const locale = params?.locale ?? "ko";
  const isPrimaryCard = index === 0;

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
    <ScrollReveal
      className={`group relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/5 backdrop-blur-2xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:bg-white/10 ${className}`}
    >
      <TransitionLink
        href={getHref(index)}
        className="block h-full w-full transition-none"
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

          <div
            className={`relative my-4 transform transition-all duration-500 group-hover:-translate-y-2 md:group-hover:-translate-y-14`}
          >
            <h3
              className={`mb-3 font-serif font-bold leading-tight ${
                isPrimaryCard ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
              }`}
            >
              {item.title}
            </h3>
            <p
              className={`text-white/80 whitespace-pre-line font-bold tracking-wide  ${
                isPrimaryCard ? "text-sm md:text-base line-clamp-3" : "text-xs md:text-sm line-clamp-2"
              }`}
            >
              {item.description}
            </p>

            {/* Bullets */}
            <ul
              className={`mt-3 space-y-2 text-white/80 ${
                isPrimaryCard ? "text-sm" : "text-xs"
              } md:pointer-events-none md:absolute md:left-0 md:right-0 md:top-full md:mt-4 md:translate-y-3 md:opacity-0 md:transition-all md:duration-500 md:group-hover:translate-y-0 md:group-hover:opacity-100 ${
                isPrimaryCard ? "md:text-md md:pb-8" : "md:text-sm md:pb-6"
              }`}
            >
              {item.bullets?.slice(0, 3).map((bullet) => (
                <li key={bullet} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </TransitionLink>
    </ScrollReveal>
  );
}
