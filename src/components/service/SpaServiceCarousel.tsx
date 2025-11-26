"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type CarouselImage = {
  src: string;
  alt: string;
  caption: string;
};

type SpaServiceCarouselProps = {
  badge: string;
  title: string;
  description: string;
  images: CarouselImage[];
  features: {
    title: string;
    items: string[];
  }[];
};

export function SpaServiceCarousel({
  badge,
  title,
  description,
  images,
  features,
}: SpaServiceCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentImage = images[currentIndex] ?? images[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="space-y-14">
      <ScrollReveal>
        <section className="rounded-[2.5rem] border border-border/30 bg-white dark:bg-[#2A2928]/40 p-6 shadow-sm md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
                {badge}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl font-serif">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary/80 md:text-base whitespace-pre-line">
                {description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/40 bg-background/80 text-foreground transition hover:bg-primary/10"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/40 bg-background/80 text-foreground transition hover:bg-primary/10"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-border/30 shadow-inner">
            <div className="relative h-[300px] w-full md:h-[500px]">
              <Image
                key={currentImage.src}
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-cover transition-opacity duration-500"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 text-white/90 backdrop-blur-[2px]">
                <p className="text-sm md:text-base font-medium">{currentImage.caption}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex overflow-x-auto pb-2 gap-3 scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={image.src + index}
                type="button"
                onClick={() => goToIndex(index)}
                className={`relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-xl border transition-all duration-300 ${
                  currentIndex === index
                    ? "border-primary shadow-md ring-2 ring-primary/20 scale-105"
                    : "border-border/40 opacity-70 hover:opacity-100 hover:scale-105"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((group) => (
            <article
              key={group.title}
              className="rounded-3xl border border-border/30 bg-white/60 dark:bg-[#2A2928]/40 p-8 shadow-sm backdrop-blur-sm transition-transform hover:-translate-y-1"
            >
              <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-secondary">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
