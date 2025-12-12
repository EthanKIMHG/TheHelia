"use client";

import { Breathing } from "@/components/common/Breathing";
import { motion } from "framer-motion";
import { MessageSquareDiff, Sparkles } from "lucide-react";

export function AIAgentFAB() {
  return (
    <div className="fixed bottom-6 right-6 z-50 md:bottom-10 md:right-10">
      <Breathing>
        <motion.button
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-xl shadow-lg transition-all hover:bg-primary hover:border-primary"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          aria-label="AI Concierge"
        >
          {/* Pulse Ring */}
          <span className="absolute inset-0 rounded-full border border-white/50 opacity-0 group-hover:animate-ping" />
          
          <div className="relative">
             <MessageSquareDiff className="h-6 w-6" />
             <div className="absolute -top-1 -right-1">
                <Sparkles className="h-3 w-3 text-accent animate-pulse" />
             </div>
          </div>
        </motion.button>
      </Breathing>
    </div>
  );
}
