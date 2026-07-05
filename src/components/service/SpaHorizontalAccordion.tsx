"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type AccordionItemProps = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  isActive: boolean;
  onHover: (id: number) => void;
};

function AccordionCard({
  id,
  title,
  subtitle,
  description,
  image,
  features,
  isActive,
  onHover,
}: AccordionItemProps) {
  return (
    <motion.div
      layout
      onMouseEnter={() => onHover(id)}
      className={cn(
        "relative h-[500px] md:h-[600px] cursor-pointer overflow-hidden transition-all duration-500 ease-out",
        isActive ? "flex-[3]" : "flex-[1] hover:flex-[1.2]"
      )}
    >
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={image}
          alt={title}
          fill
          className={cn(
            "object-cover transition-transform duration-700",
            isActive ? "scale-100" : "scale-110 grayscale-[30%]"
          )}
        />
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            isActive
              ? "bg-gradient-to-t from-black/80 via-black/20 to-transparent"
              : "bg-black/40"
          )}
        />
      </div>

      <div className="relative flex h-full flex-col justify-end p-6 md:p-10 text-white">
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col gap-4"
            >
              <div>
                <span className="mb-3 inline-block font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-white/90 drop-shadow-sm">
                  {subtitle}
                </span>
                <h3 className="font-display-serif text-3xl font-normal leading-[1.4] md:text-4xl">
                  {title}
                </h3>
              </div>
              <p className="max-w-lg text-sm leading-relaxed text-white/90 md:text-base">
                {description}
              </p>
              <ul className="mt-2 space-y-2">
                {features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3 text-sm text-white/80"
                  >
                    <div className="h-px w-3 bg-white/80" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-white/80">
                <span>View Details</span>
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-end h-full pb-4"
            >
              <div className="rotate-[-90deg] whitespace-nowrap font-display-serif text-xl font-normal tracking-wide text-white/90 origin-bottom-left translate-x-8 mb-12">
                {title}
              </div>
              <div className="flex h-10 w-10 items-center justify-center border border-white/40">
                <Plus className="h-5 w-5 text-white" strokeWidth={1.5} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

type SpaHorizontalAccordionProps = {
  items: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    features: string[];
  }[];
};

export function SpaHorizontalAccordion({ items }: SpaHorizontalAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ScrollReveal>
      <div className="hidden md:flex w-full gap-4 lg:gap-6">
        {items.map((item, index) => (
          <AccordionCard
            key={index}
            id={index}
            {...item}
            isActive={activeIndex === index}
            onHover={setActiveIndex}
          />
        ))}
      </div>
      
      {/* Mobile Fallback: Vertical Stack */}
      <div className="flex flex-col gap-4 md:hidden">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative h-[400px] w-full overflow-hidden"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-6 text-white">
              <span className="mb-3 inline-block w-fit font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-white/90 drop-shadow-sm">
                {item.subtitle}
              </span>
              <h3 className="mb-2 font-display-serif text-2xl font-normal leading-[1.4]">
                {item.title}
              </h3>
              <p className="text-sm text-white/90 mb-4 line-clamp-2">
                {item.description}
              </p>
              <ul className="space-y-1">
                {item.features.slice(0, 2).map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs text-white/80">
                    <div className="h-px w-3 bg-white/80" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
}
