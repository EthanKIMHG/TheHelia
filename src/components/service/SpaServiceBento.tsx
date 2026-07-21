"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import { GlassCard } from "@/components/ui/glass/GlassCard";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, wrap } from "framer-motion";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Hand } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type ServiceFeature = {
  title: string;
  items: string[];
};

type ServiceImage = {
  src: string;
  alt: string;
};

type SpaServiceBentoProps = {
  badge: string;
  title: string;
  description: string;
  images: Array<string | ServiceImage>;
  features: ServiceFeature[];
  reversed?: boolean;
};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function SpaServiceBento({
  badge,
  title,
  description,
  images,
  features,
  reversed = false,
}: SpaServiceBentoProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const normalizedImages = images.map((image) =>
    typeof image === "string"
      ? {
          src: image,
          alt: title,
        }
      : image,
  );
  const imageIndex = wrap(0, normalizedImages.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <ScrollReveal>
      <div className="flex flex-col gap-12 py-12">
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <span className="eyebrow mb-6 inline-block">
            {badge}
          </span>
          <h3 className="mb-6 break-keep font-display-serif text-3xl font-normal leading-[1.4] text-foreground md:text-4xl">
            {title}
          </h3>
          <p className="mx-auto max-w-[34ch] whitespace-pre-line break-keep text-base leading-loose text-secondary md:max-w-3xl md:text-lg lg:mx-0">
            {description}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main Image Card (Carousel) */}
          <GlassCard
            radius="lg"
            className={cn(
              "relative overflow-hidden group min-h-[400px] lg:h-full lg:min-h-0",
              reversed ? "lg:col-span-7 lg:order-2" : "lg:col-span-7 lg:order-1"
            )}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
              >
                <Image
                  src={normalizedImages[imageIndex].src}
                  alt={normalizedImages[imageIndex].alt}
                  fill
                  className="object-cover"
                  priority
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>
            
            {/* Carousel Controls (Desktop: Hover to show) */}
            <div className="absolute inset-0 hidden lg:flex items-center justify-between p-4 pointer-events-none z-20">
              <button
                onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                style={{ borderRadius: "var(--radius-pill)" }}
                className="w-10 h-10 glass-on-dark glass-press text-white flex items-center justify-center pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); paginate(1); }}
                style={{ borderRadius: "var(--radius-pill)" }}
                className="w-10 h-10 glass-on-dark glass-press text-white flex items-center justify-center pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Mobile Swipe Hint */}
            <div className="absolute inset-0 flex lg:hidden items-center justify-center pointer-events-none z-20">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ 
                  duration: 4,
                  times: [0, 0.1, 0.8, 1],
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                style={{ borderRadius: "var(--radius-pill)" }}
                className="glass-on-dark text-white px-4 py-2 flex items-center gap-2"
              >
                <Hand className="w-5 h-5 animate-pulse" strokeWidth={1.5} />
                <span className="text-sm font-medium">Swipe to view</span>
              </motion.div>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {normalizedImages.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "h-[2px] w-4 transition-all duration-300",
                    idx === imageIndex ? "bg-white w-8" : "bg-white/50"
                  )}
                />
              ))}
            </div>

            <div className="absolute bottom-8 left-8 right-8 text-white pointer-events-none z-10">
              <p className="text-lg font-medium opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                {title}
              </p>
            </div>
          </GlassCard>

          {/* Features Column */}
          <div
            className={cn(
              "flex flex-col gap-6",
              reversed ? "lg:col-span-5 lg:order-1" : "lg:col-span-5 lg:order-2"
            )}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="border-t border-border pt-6 transition-colors duration-500 hover:border-foreground/40 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="break-keep font-display-serif text-[1.45rem] font-normal leading-[1.4] text-foreground md:text-[1.55rem]">
                    {feature.title}
                  </h4>
                  <ArrowUpRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                </div>
                <ul className="space-y-4">
                  {feature.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 border-b border-border/70 pb-3 text-[15px] leading-[1.8] text-foreground/85 last:border-b-0 md:text-base">
                      <Check className="mt-1.5 w-3.5 h-3.5 flex-shrink-0 text-primary" strokeWidth={1.5} />
                      <span className="break-keep">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
