"use client";

import { usePageLoad } from "@/components/common/PageLoadContext";
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode } from "react";

type TransitionLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (e?: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  [key: string]: any; // Allow other props
};

export function TransitionLink({
  href,
  children,
  className,
  onClick,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();
  const { setIsLoading } = usePageLoad();

  const handleClick = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent standard navigation
    
    // Trigger any custom onClick handler passed from parent
    if (onClick) {
        onClick(e);
    }

    // 1. Show Loader Immediately
    setIsLoading(true);

    // 2. Perform Navigation
    // Small timeout to allow the loader render cycle to start visually if main thread is heavy
    // though usually not strictly necessary, it's safer.
    // However, for maximum snappiness, we just push.
    router.push(href);
  };

  // We render an <a> tag for SEO and accessibility, but override click behavior.
  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
