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
        <section className="border border-border bg-background p-6 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="eyebrow">
                {badge}
              </p>
              <h3 className="mt-3 break-keep font-display-serif text-2xl font-normal leading-[1.4] text-foreground md:text-3xl">
                {title}
              </h3>
              <p className="mx-auto mt-3 max-w-[34ch] whitespace-pre-line break-keep text-sm leading-[1.85] text-secondary md:mx-0 md:max-w-2xl md:text-base">
                {description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex h-11 w-11 items-center justify-center border border-border bg-background text-foreground transition-colors duration-300 hover:border-foreground/50"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex h-11 w-11 items-center justify-center border border-border bg-background text-foreground transition-colors duration-300 hover:border-foreground/50"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="mt-8 overflow-hidden">
            <div className="relative h-[300px] w-full bg-accent/60 md:h-[500px]">
              <Image
                key={currentImage.src}
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-cover transition-opacity duration-500"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 text-white/90">
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
                className={`relative h-20 w-32 flex-shrink-0 overflow-hidden border transition-all duration-300 ${
                  currentIndex === index
                    ? "border-foreground"
                    : "border-border opacity-70 hover:opacity-100"
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
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((group) => (
            <article
              key={group.title}
              className="border-t border-border pt-6 transition-colors duration-500 hover:border-foreground/40"
            >
              <h4 className="break-keep font-display-serif text-lg font-normal leading-[1.5] text-foreground mb-4 flex items-center gap-3">
                <span className="h-px w-3 bg-primary" />
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                    <span className="mt-3 h-px w-3 flex-shrink-0 bg-primary" />
                    <span className="break-keep leading-[1.85]">{item}</span>
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
