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
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden bg-accent/60",
        className
      )}
    >
      <div className="absolute inset-0 h-full w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
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
        <div className="transition-all duration-500">
          {subtitle && (
            <span className="mb-3 inline-block font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-white/90 drop-shadow-sm">
              {subtitle}
            </span>
          )}
          <h3 className="mb-2 font-display-serif text-2xl font-normal leading-[1.4] md:text-3xl">
            {title}
          </h3>
          {description && (
            <p className="max-w-md text-sm leading-relaxed text-white/90 md:text-base opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              {description}
            </p>
          )}
          {children}
        </div>

        <div className="absolute top-6 right-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5 text-white drop-shadow-md" strokeWidth={1.5} />
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
          image="/img/spa/us/bento-thalac.jpg"
          className="md:col-span-2 md:row-span-2 min-h-[400px]"
          darkOverlay
        >
          <ul className="mt-4 hidden space-y-1 md:block opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 delay-100">
            {copy.thalac.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                <div className="h-px w-3 bg-white/80" />
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
          image="/img/spa/us/headspa-2.jpg"
          className="md:col-span-1 md:row-span-2 min-h-[400px]"
        />

        {/* 3. Body Therapies - Wide Horizontal (2x1) */}
        <BentoCard
          title={copy.bodyCare.title}
          subtitle="Prenatal & Postpartum"
          description={copy.bodyCare.description}
          image="/img/spa/us/after-3.jpg"
          className="md:col-span-2 md:row-span-1 min-h-[250px]"
        />

        {/* 4. Atmosphere / Private Room (1x1) */}
        <BentoCard
          title={copy.atmosphere.title}
          image="/img/spa/us/bento-atmosphere.jpg"
          className="md:col-span-1 md:row-span-1 min-h-[250px]"
          description={copy.atmosphere.description}
        />
      </div>
    </ScrollReveal>
  );
}
