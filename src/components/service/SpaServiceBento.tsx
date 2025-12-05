"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, wrap } from "framer-motion";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Hand } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type ServiceFeature = {
  title: string;
  items: string[];
};

type SpaServiceBentoProps = {
  badge: string;
  title: string;
  description: string;
  images: string[];
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
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <ScrollReveal>
      <div className="flex flex-col gap-12 py-12">
        {/* Header Section */}
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            {badge}
          </span>
          <h3 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6">
            {title}
          </h3>
          <p className="text-lg text-secondary/80 leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
          {/* Main Image Card (Carousel) */}
          <div
            className={cn(
              "relative rounded-[2.5rem] overflow-hidden group min-h-[400px] lg:min-h-0 bg-gray-100 dark:bg-gray-800",
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
                  src={images[imageIndex]}
                  alt={title}
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
                className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/40 transition-colors pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); paginate(1); }}
                className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/40 transition-colors pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <ChevronRight className="w-6 h-6" />
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
                className="bg-black/30 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2"
              >
                <Hand className="w-5 h-5 animate-pulse" />
                <span className="text-sm font-medium">Swipe to view</span>
              </motion.div>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, idx) => (
                <div 
                  key={idx}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300 shadow-sm",
                    idx === imageIndex ? "bg-white w-6" : "bg-white/50"
                  )}
                />
              ))}
            </div>

            <div className="absolute bottom-8 left-8 right-8 text-white pointer-events-none z-10">
              <p className="text-lg font-medium opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                {title}
              </p>
            </div>
          </div>

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
                className="flex-1 bg-white dark:bg-[#2A2928] rounded-[2rem] p-8 border border-border/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-serif font-medium text-foreground">
                    {feature.title}
                  </h4>
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <ul className="space-y-3">
                  {feature.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-secondary/80 text-sm">
                      <div className="mt-1 w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-primary" />
                      </div>
                      <span className="leading-relaxed">{item}</span>
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
