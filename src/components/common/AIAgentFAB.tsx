"use client";

import { motion } from "framer-motion";
import { MessageSquareDiff, Sparkles } from "lucide-react";

export function AIAgentFAB() {
  return (
    <div className="fixed bottom-6 right-6 z-50 md:bottom-10 md:right-10">

        <motion.button
          className="group glass-prominent glass-press relative flex h-14 w-14 items-center justify-center text-foreground"
          style={{ borderRadius: "var(--radius-pill)" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          aria-label="AI Concierge"
        >
          <div className="relative">
             <MessageSquareDiff className="h-5 w-5 text-primary" strokeWidth={1.5} />
             <div className="absolute -top-1 -right-1">
                <Sparkles className="h-3 w-3 text-primary" strokeWidth={1.5} />
             </div>
          </div>
        </motion.button>
    </div>
  );
}
