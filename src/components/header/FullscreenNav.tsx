"use client";

import { AnimatePresence, motion } from "framer-motion";
import { GlobeIcon, Languages, MoonIcon, SunIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { TransitionLink } from "@/components/common/TransitionLink";
import clsx from "clsx";
import type { Locale, NavItem } from "./types";

type FullscreenNavProps = {
  open: boolean;
  locale: Locale;
  theme: "light" | "dark";
  navItems: NavItem[];
  normalizedPath: string;
  onClose: () => void;
  onLocaleChange: (locale: Locale) => void;
  onToggleTheme: () => void;
};

const SOFT_EASE = [0.22, 1, 0.36, 1] as const;

export function FullscreenNav({
  open,
  locale,
  theme,
  navItems,
  normalizedPath,
  onClose,
  onLocaleChange,
  onToggleTheme,
}: FullscreenNavProps) {
  const [activeId, setActiveId] = useState<string | null>(
    navItems[0]?.id ?? null,
  );

  const activeItem = useMemo(
    () => navItems.find((item) => item.id === activeId) ?? navItems[0] ?? null,
    [navItems, activeId],
  );

  const activeImage =
    activeItem?.previewImage?.src ??
    activeItem?.sub?.[0]?.previewImage?.src ??
    "/img/main/homepage_1.jpg";
  const activeAlt =
    activeItem?.previewImage?.alt ?? activeItem?.label ?? "The Helia";

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) setActiveId(navItems[0]?.id ?? null);
  }, [open, navItems]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: SOFT_EASE }}
          className="fixed inset-0 z-[60] flex flex-col bg-background"
          role="dialog"
          aria-modal="true"
          aria-label={locale === "ko" ? "메뉴" : "Menu"}
        >
          <div className="grid flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-[1.05fr_0.95fr] lg:overflow-hidden">
            {/* Navigation column */}
            <div className="flex flex-col justify-between px-6 pb-10 pt-28 sm:px-10 lg:px-16 lg:pt-32">
              <nav className="flex flex-col">
                {navItems.map((item, index) => {
                  const isActive = item.id === activeId;
                  const targetHref =
                    item.href ?? item.sub?.[0]?.href ?? `/${locale}`;
                  const pathActive =
                    (item.baseHref &&
                      item.baseHref !== "/" &&
                      normalizedPath.startsWith(item.baseHref)) ||
                    item.sub?.some((s) => normalizedPath.startsWith(s.baseHref));

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.12 + index * 0.06,
                        ease: SOFT_EASE,
                      }}
                      onMouseEnter={() => setActiveId(item.id)}
                      className="border-b border-border/70 py-4 lg:py-5"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <TransitionLink
                          href={targetHref}
                          onClick={onClose}
                          className={clsx(
                            "font-display-serif text-3xl font-normal leading-[1.1] tracking-[0.01em] transition-colors duration-300 sm:text-4xl lg:text-5xl",
                            isActive || pathActive
                              ? "text-foreground"
                              : "text-foreground/45 hover:text-foreground",
                          )}
                        >
                          {item.label}
                        </TransitionLink>
                        <span className="font-sans text-[10px] tracking-[0.28em] text-primary/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Sub links */}
                      {item.sub?.length ? (
                        <AnimatePresence initial={false}>
                          {isActive ? (
                            <motion.div
                              key={`${item.id}-sub`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: SOFT_EASE }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-wrap gap-x-7 gap-y-2 pt-4">
                                {item.sub.map((sub) => {
                                  const subActive = normalizedPath.startsWith(
                                    sub.baseHref,
                                  );
                                  return (
                                    <TransitionLink
                                      key={sub.id}
                                      href={sub.href}
                                      onClick={onClose}
                                      onMouseEnter={() => setActiveId(item.id)}
                                      className={clsx(
                                        "font-sans text-[11px] uppercase tracking-[0.2em] transition-colors duration-300",
                                        subActive
                                          ? "text-foreground"
                                          : "text-secondary hover:text-foreground",
                                      )}
                                    >
                                      {sub.label}
                                    </TransitionLink>
                                  );
                                })}
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      ) : null}
                    </motion.div>
                  );
                })}
              </nav>

              {/* Footer controls */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4, ease: SOFT_EASE }}
                className="mt-10 flex items-center justify-between gap-4"
              >
                <TransitionLink
                  href={`/${locale}/reservation`}
                  onClick={onClose}
                  className="inline-flex items-center gap-3 bg-foreground px-6 py-3.5 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-background transition-colors duration-500 hover:bg-foreground/90"
                >
                  {locale === "ko" ? "예약하기" : "Reserve"}
                </TransitionLink>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onLocaleChange(locale === "ko" ? "en" : "ko")}
                    className="inline-flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-foreground"
                    aria-label={
                      locale === "ko" ? "Switch to English" : "한국어로 전환"
                    }
                  >
                    {locale === "ko" ? (
                      <Languages className="h-4 w-4" strokeWidth={1.5} />
                    ) : (
                      <GlobeIcon className="h-4 w-4" strokeWidth={1.5} />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={onToggleTheme}
                    className="inline-flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-foreground"
                    aria-label={
                      theme === "dark"
                        ? "라이트 모드로 전환"
                        : "다크 모드로 전환"
                    }
                  >
                    {theme === "dark" ? (
                      <SunIcon className="h-4 w-4" strokeWidth={1.5} />
                    ) : (
                      <MoonIcon className="h-4 w-4" strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Image column */}
            <div className="relative hidden overflow-hidden bg-accent/60 lg:block">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: SOFT_EASE }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeImage}
                    alt={activeAlt}
                    fill
                    sizes="50vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute bottom-10 left-10 z-10">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeItem?.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: SOFT_EASE }}
                    className="font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-background/90"
                  >
                    {activeItem?.label}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
