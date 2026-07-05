"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePageLoad } from "./PageLoadContext";

export function GlobalPageLoader() {
  const { isLoading } = usePageLoad();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo / Brand Name Animation */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center"
            >
                <span className="font-force-playfair text-center text-4xl font-normal tracking-[0.3em] indent-[0.3em] text-foreground md:text-4xl lg:text-6xl">
                    The Helia
                </span>
                <span className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-primary md:text-sm">
                    Organic Serenity
                </span>
            </motion.div>

            {/* Loading Bar / Indicator */}
            <div className="w-24 h-px bg-border overflow-hidden relative">
                <motion.div
                    className="absolute inset-0 bg-primary"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
