
"use client";

import { TransitionLink } from "@/components/common/TransitionLink";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import type { Locale, NavItem, NavSubItem, PreviewData } from "./types";

type DesktopNavPanelProps = {
  activeNav: NavItem | null;
  previewData: PreviewData | null;
  locale: Locale;
  normalizedPath: string;
  onClose: () => void;
  onPreviewChange: (data: PreviewData | null) => void;
  buildPreviewData: (subItem?: NavSubItem | null) => PreviewData | null;
};

export function DesktopNavPanel({
  activeNav,
  previewData,
  locale,
  normalizedPath,
  onClose,
  onPreviewChange,
  buildPreviewData,
}: DesktopNavPanelProps) {
  if (!activeNav || !activeNav.sub?.length) {
    return null;
  }

  const handlePreview = (subItem?: NavSubItem) => {
    onPreviewChange(buildPreviewData(subItem));
  };

  return (
    <div className="hidden md:block">
      <div className="fixed inset-0 top-20 z-40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-1/2 top-20 z-50 -translate-x-1/2"
      >
        <div
          id="desktop-nav-panel"
          role="dialog"
          aria-labelledby="desktop-nav-heading"
          aria-modal="true"
          className="flex w-[540px] border border-t-0 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90"
        >
          {/* Links */}
          <div className="flex-1 px-7 pb-6 pt-5">
            <h3 id="desktop-nav-heading" className="eyebrow mb-4 block text-[10px]">
              {activeNav.label}
            </h3>
            <div className="divide-y divide-border">
              {activeNav.sub.map((subItem) => {
                const activePath = normalizedPath.startsWith(subItem.baseHref);
                const matchesPreview =
                  !!previewData && !!subItem.previewImage && previewData.src === subItem.previewImage.src;
                const isActive = activePath || matchesPreview;
                return (
                  <TransitionLink
                    key={subItem.id}
                    href={subItem.href}
                    onClick={onClose}
                    onMouseEnter={() => handlePreview(subItem)}
                    onFocus={() => handlePreview(subItem)}
                    className="group flex items-center justify-between gap-4 py-2.5 text-left text-sm tracking-[0.04em] transition-colors"
                  >
                    <span
                      className={clsx(
                        "truncate transition-colors duration-300 group-hover:text-foreground",
                        isActive ? "text-foreground" : "text-secondary",
                      )}
                    >
                      {subItem.label}
                    </span>
                    <ArrowUpRight
                      className={clsx(
                        "h-3 w-3 shrink-0 text-foreground/50 transition-opacity duration-300",
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                      )}
                      strokeWidth={1.5}
                    />
                  </TransitionLink>
                );
              })}
            </div>
          </div>

          {/* Preview */}
          <div className="w-[200px] shrink-0 border-l border-border p-5">
            <div className="relative h-[110px] w-full overflow-hidden bg-accent/60">
              {previewData ? (
                <Image
                  key={previewData.src}
                  src={previewData.src}
                  alt={previewData.alt}
                  fill
                  sizes="200px"
                  priority
                  className="object-cover"
                />
              ) : null}
            </div>
            <span className="mt-4 block font-display-serif text-[13px] font-normal text-foreground">
              {previewData?.label ??
                (locale === "ko" ? "헬리아 미리보기" : "Helia Preview")}
            </span>
            <span className="mt-1.5 line-clamp-3 break-keep text-[11px] leading-[1.8] text-secondary">
              {previewData?.copy ??
                (locale === "ko"
                  ? "원하는 메뉴를 선택하면 소개가 제공돼요."
                  : "Choose a submenu to reveal its story.")}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
