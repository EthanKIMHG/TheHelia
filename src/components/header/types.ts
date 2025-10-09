import type { Variants } from "framer-motion";

export type Locale = "en" | "ko";
export const LOCALES: Locale[] = ["ko", "en"];

export type SubNavItemDefinition = {
  id: string;
  href: string;
  label: Record<Locale, string>;
  description: Record<Locale, string>;
  previewImage?: {
    src: string;
    alt: Record<Locale, string>;
  };
  previewCopy?: Record<Locale, string>;
};

export type NavItemDefinition = {
  id: string;
  href?: string;
  comingSoon?: boolean;
  label: Record<Locale, string>;
  description?: Record<Locale, string>;
  sub?: SubNavItemDefinition[];
};

export type NavItem = {
  id: string;
  label: string;
  href?: string;
  baseHref?: string;
  description?: string;
  comingSoon?: boolean;
  sub?: NavSubItem[];
};

export type NavSubItem = {
  id: string;
  label: string;
  href: string;
  baseHref: string;
  description: string;
  previewImage?: {
    src: string;
    alt: string;
  };
  previewCopy?: string;
};

export type PreviewData = {
  src: string;
  alt: string;
  label: string;
  copy?: string;
};

export const accordionVariants: Variants = {
  collapsed: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  expanded: { opacity: 1, clipPath: "inset(0 0 0% 0)" },
};
