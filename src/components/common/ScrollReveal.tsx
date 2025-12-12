"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  offset?: [string, string]; // e.g., ["start end", "end start"]
};

export function ScrollReveal({
  children,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Slow Fade-in Up Scrollytelling
  // 0 -> 0.3: Fade In & Rise (Entry)
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8, 1],
    [0, 1, 1, 0]
  );
  
  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8, 1],
    [80, 0, 0, -50]
  );

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
