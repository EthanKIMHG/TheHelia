"use client";


import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Locale } from "../header/types";
import HeroCarousel from "./HeroCarousel";

import { usePageLoad } from "@/components/common/PageLoadContext";

export function CinematicHero({locale} : {locale: Locale}) {
  const { setCriticalImageLoading } = usePageLoad();

  // Set critical image loading to true on mount
  useEffect(() => {
    setCriticalImageLoading(true);
  }, [setCriticalImageLoading]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div ref={containerRef} className="relative h-svh w-full overflow-hidden bg-accent">
      {/* 1. Full-bleed photography with soft ivory veils */}
      <div className="absolute inset-0 z-0">
        <HeroCarousel onLoadComplete={() => setCriticalImageLoading(false)} />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-44 bg-gradient-to-b from-[#FBF9F4]/60 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-72 bg-gradient-to-t from-[#FBF9F4]/80 via-[#FBF9F4]/30 to-transparent" />
      </div>

      {/* 2. Minimal centered wordmark */}
      <motion.div
        style={{ opacity, y }}
        className="relative z-20 h-full w-full"
      >
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-force-playfair absolute inset-x-0 bottom-40 px-6 text-center text-4xl font-normal uppercase tracking-[0.3em] indent-[0.3em] text-foreground md:bottom-32 md:text-6xl md:tracking-[0.4em] md:indent-[0.4em]"
        >
          The Helia
        </motion.h1>

        {/* Scroll Indicator — thin drip line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-0 left-1/2 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-foreground/55 to-transparent"
        />
      </motion.div>
    </div>
  );
}
