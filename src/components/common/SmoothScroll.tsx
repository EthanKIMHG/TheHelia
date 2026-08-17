"use client";

import { useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { type ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
