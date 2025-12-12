"use client";

import { Breathing } from "@/components/common/Breathing";
import { TransitionLink } from "@/components/common/TransitionLink";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { Locale } from "../header/types";
import HeroCarousel from "./HeroCarousel";

import { usePageLoad } from "@/components/common/PageLoadContext";
import { useEffect } from "react";

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
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black font-serif">
      {/* 1. Fluid Background & Texture */}
      <div className="absolute inset-0 z-0">
        <HeroCarousel onLoadComplete={() => setCriticalImageLoading(false)} />
        <div className="absolute inset-0 z-10 h-full w-full bg-black/30 bg-grain" /> 
        {/* Anti-Grid Fluid Shape Overlay */}
        <div className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-primary/20 blur-[120px] rounded-full mix-blend-overlay animate-pulse" />
      </div>

      {/* 2. Anti-Grid Layout Content */}
      <motion.div 
        style={{ opacity, y }}
        className="relative z-20 h-full w-full max-w-[1920px] mx-auto p-6 md:p-12 lg:p-24"
      >
        {/* Main Title: Bottom Left, Oversized */}
        <motion.h1 
          initial={{ opacity: 0, y: 100, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-24 left-6 md:bottom-32 md:left-12 text-7xl md:text-9xl lg:text-[11rem] text-white tracking-widest mix-blend-overlay"
        >
          The <br/> Helia
        </motion.h1>
        
        {/* Subtitle: High contrast, floating Top Right */}
        <motion.p 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="absolute top-32 right-6 md:top-48 md:right-24 text-right font-sans text-xl md:text-2xl font-light text-white/90 tracking-widest uppercase"
        >
          Organic Serenity <br/> & Smart Comfort
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="w-6 h-6 text-white/60 animate-bounce" />
        </motion.div>
      </motion.div>

      {/* 3. Breathing CTA: Floating organic position */}
      <div className="absolute bottom-12 right-6 md:bottom-16 md:right-16 z-30">
        <Breathing>
          <TransitionLink 
            href={`${locale}/reservation`}
            className="group relative flex items-center justify-center overflow-hidden rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/30 px-10 py-5 text-base text-white transition-all hover:bg-white/20"
          >
            <span className="relative z-10 font-medium tracking-wider uppercase">
              {locale === "ko" ? "예약하기" : "Book Now" }
            </span>
          </TransitionLink>
        </Breathing>
      </div>
    </div>
  );
}
