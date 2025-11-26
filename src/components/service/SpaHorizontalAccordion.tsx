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
        "relative h-[500px] md:h-[600px] cursor-pointer overflow-hidden rounded-[2rem] transition-all duration-500 ease-out",
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
                <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                  {subtitle}
                </span>
                <h3 className="text-3xl font-serif font-semibold leading-tight md:text-4xl">
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
                    className="flex items-center gap-2 text-sm text-white/80"
                  >
                    <div className="h-1 w-1 rounded-full bg-white" />
                    {feature}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-white/80">
                <span>View Details</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-end h-full pb-4"
            >
              <div className="rotate-[-90deg] whitespace-nowrap text-xl font-medium tracking-wide text-white/90 origin-bottom-left translate-x-8 mb-12">
                {title}
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                <Plus className="h-5 w-5 text-white" />
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
            className="relative h-[400px] w-full overflow-hidden rounded-[2rem]"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-6 text-white">
              <span className="mb-2 inline-block w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                {item.subtitle}
              </span>
              <h3 className="mb-2 text-2xl font-serif font-semibold">
                {item.title}
              </h3>
              <p className="text-sm text-white/90 mb-4 line-clamp-2">
                {item.description}
              </p>
              <ul className="space-y-1">
                {item.features.slice(0, 2).map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-white/80">
                    <div className="h-1 w-1 rounded-full bg-white" />
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
