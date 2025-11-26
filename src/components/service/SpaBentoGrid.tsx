"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

type BentoItemProps = {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  className?: string;
  children?: ReactNode;
  darkOverlay?: boolean;
};

function BentoCard({
  title,
  subtitle,
  description,
  image,
  className,
  children,
  darkOverlay = false,
}: BentoItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden rounded-[2rem] bg-gray-100 dark:bg-neutral-800 shadow-sm",
        className
      )}
    >
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            darkOverlay
              ? "bg-black/40 group-hover:bg-black/50"
              : "bg-gradient-to-t from-black/60 via-black/10 to-transparent group-hover:from-black/70"
          )}
        />
      </div>

      <div className="relative flex h-full flex-col justify-end p-8 text-white">
        <div className="transform transition-all duration-500 group-hover:-translate-y-2">
          {subtitle && (
            <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              {subtitle}
            </span>
          )}
          <h3 className="mb-2 text-2xl font-serif font-semibold leading-tight md:text-3xl">
            {title}
          </h3>
          {description && (
            <p className="max-w-md text-sm leading-relaxed text-white/90 md:text-base opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              {description}
            </p>
          )}
          {children}
        </div>
        
        <div className="absolute top-6 right-6 opacity-0 transform translate-x-4 -translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
            <ArrowUpRight className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

type SpaBentoGridProps = {
  copy: {
    thalac: {
      title: string;
      description: string;
      features: string[];
    };
    headSpa: {
      title: string;
      description: string;
    };
    bodyCare: {
      title: string;
      description: string;
    };
    atmosphere: {
      title: string;
      description: string;
    };
    products: {
      title: string;
      description: string;
    };
  };
};

export function SpaBentoGrid({ copy }: SpaBentoGridProps) {
  return (
    <ScrollReveal>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-3 lg:gap-6 h-auto md:h-[900px]">
        {/* 1. THALAC Brand - Large Feature (2x2) */}
        <BentoCard
          title={copy.thalac.title}
          subtitle="Authentic French Thalassotherapy"
          description={copy.thalac.description}
          image="/img/spa/spa_1.png"
          className="md:col-span-2 md:row-span-2 min-h-[400px]"
          darkOverlay
        >
          <ul className="mt-4 hidden space-y-1 md:block opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 delay-100">
            {copy.thalac.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                <div className="h-1 w-1 rounded-full bg-white" />
                {feature}
              </li>
            ))}
          </ul>
        </BentoCard>

        {/* 2. Head Spa - Tall Vertical (1x2) */}
        <BentoCard
          title={copy.headSpa.title}
          subtitle="Signature Care"
          description={copy.headSpa.description}
          image="/img/spa/headspa1.jpg"
          className="md:col-span-1 md:row-span-2 min-h-[400px]"
        />

        {/* 3. Body Therapies - Wide Horizontal (2x1) */}
        <BentoCard
          title={copy.bodyCare.title}
          subtitle="Prenatal & Postpartum"
          description={copy.bodyCare.description}
          image="/img/spa/spa3.jpg"
          className="md:col-span-2 md:row-span-1 min-h-[250px]"
        />

        {/* 4. Atmosphere / Private Room (1x1) */}
        <BentoCard
          title={copy.atmosphere.title}
          image="/img/spa/headspa4.jpg"
          className="md:col-span-1 md:row-span-1 min-h-[250px]"
          description={copy.atmosphere.description}
        />
      </div>
    </ScrollReveal>
  );
}
