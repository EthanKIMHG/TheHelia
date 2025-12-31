"use client";

import { usePageLoad } from "@/components/common/PageLoadContext";
import { useLenis } from "lenis/react";
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
  const { setIsLoading, setNavigationPending } = usePageLoad();
  const lenis = useLenis();

  const handleClick = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent standard navigation
    
    // Trigger any custom onClick handler passed from parent
    if (onClick) {
        onClick(e);
    }

    // 1. Start loading state
    setIsLoading(true);

    // 2. Perform Navigation
    lenis?.scrollTo(0, { immediate: true });
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
