"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type BreathingProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function Breathing({ children, className, onClick }: BreathingProps) {
  return (
    <motion.div
      className={`inline-block cursor-pointer ${className || ""}`}
      whileHover={{ scale: 1.03, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
