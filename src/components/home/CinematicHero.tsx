"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Locale } from "../header/types";
import HeroCarousel from "./HeroCarousel";

export function CinematicHero({locale} : {locale: Locale}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Hero Carousel Background */}
      <div className="absolute inset-0 z-0">
        <HeroCarousel />
        <div className="absolute inset-0 h-full w-full bg-neutral-900/40 z-10" />
      </div>

      {/* Content Overlay */}
      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 tracking-wide"
        >
          The Helia
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-sans text-lg md:text-xl font-light tracking-widest uppercase opacity-80 mb-12"
        >
          Premium Postpartum Care
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-12 animate-bounce"
        >
          <ArrowDown className="w-6 h-6 text-white/50" />
        </motion.div>
      </motion.div>

      {/* Sticky CTA */}
      <div className="absolute bottom-8 right-8 z-20 ">
        <Link 
          href={`${locale}/reservation`}
          className="group relative flex items-center justify-center overflow-hidden rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 text-sm text-white transition-all hover:bg-white/20 hover:scale-105"
        >
          <span className="relative z-10 font-medium tracking-wider uppercase">{locale === "ko" ? "예약하기" : "Book Now" }</span>
        </Link>
      </div>
    </div>
  );
}
