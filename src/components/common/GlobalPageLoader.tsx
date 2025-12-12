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
           {/* Background Texture & Pulse */}
           <div className="absolute inset-0 bg-grain opacity-50" />
           <motion.div 
             animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
             transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
             className="absolute w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[100px]" 
           />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo / Brand Name Animation */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center"
            >
                <span className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary tracking-widest">
                    The Helia
                </span>
                <span className="mt-4 font-sans text-xs md:text-sm text-secondary/60 tracking-[0.3em] uppercase">
                    Organic Serenity
                </span>
            </motion.div>

            {/* Loading Bar / Indicator */}
            <div className="w-24 h-[2px] bg-secondary/20 overflow-hidden relative rounded-full">
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
