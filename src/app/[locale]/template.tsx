"use client";

import { usePageLoad } from "@/components/common/PageLoadContext";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const { setIsLoading, isLoading, setNavigationPending, setCriticalImageLoading } = usePageLoad();

  useEffect(() => {
    // Trigger loading on every mount (route change)
    setIsLoading(true);
    // Unblock navigation wait
    setNavigationPending(false);
    // Reset critical requirement (new page starts fresh)
    setCriticalImageLoading(false);
  }, [setIsLoading, setNavigationPending, setCriticalImageLoading]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0 : 1 }}
      transition={{ duration: 0.5, delay: 0.2 }} // Small delay to allow loader to fade out first
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
