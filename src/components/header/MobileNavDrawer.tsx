"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  GlobeIcon,
  Languages,
  MoonIcon,
  SunIcon,
  XIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Locale, NavItem } from "./types";
import { accordionVariants } from "./types";

type MobileNavDrawerProps = {
  open: boolean;
  locale: Locale;
  theme: "light" | "dark";
  navItems: NavItem[];
  normalizedPath: string;
  mobileSections: Record<string, boolean>;
  onToggleSection: (id: string) => void;
  onLocaleChange: (locale: Locale) => void;
  onToggleTheme: () => void;
  onClose: () => void;
};

const LOCALE_LABEL: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
};

export function MobileNavDrawer({
  open,
  locale,
  theme,
  navItems,
  normalizedPath,
  mobileSections,
  onToggleSection,
  onLocaleChange,
  onToggleTheme,
  onClose,
}: MobileNavDrawerProps) {
  if (!open) {
    return null;
  }

  return (
    <>
      <div
        className="absolute inset-0 h-screen w-full bg-black/30 md:hidden"
        onClick={onClose}
      />
      <div className="md:hidden sticky top-0 z-50">
        <div className="fixed inset-y-0 right-0 z-50 flex h-screen w-full max-w-[300px] flex-col gap-4 border-l border-border/20 bg-background p-4 shadow-xl sm:max-w-md">
          <div className="flex h-12 items-center justify-between">
            {theme === "light" ? (
              <Image
                src="/img/logo/header_logo.png"
                alt="더헬리아 산후조리원 로고"
                width={120}
                height={20}
                priority
                className="h-7 w-auto"
              />
            ) : (
              <Image
                src="/img/logo/header_logo_white.png"
                alt="더헬리아 산후조리원 로고"
                width={160}
                height={40}
                priority
                className="h-7 w-auto"
              />
            )}

            <div className="flex items-center">
              <button
                type="button"
                onClick={() => onLocaleChange(locale === "ko" ? "en" : "ko")}
                className="flex-1 rounded-lg px-3 py-2 text-sm text-secondary cursor-pointer"
              >
                {locale === "ko" ? (
                  <div className="flex items-center justify-center gap-2">
                    <Languages className="h-4 w-4" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <GlobeIcon className="h-4 w-4" />
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={onToggleTheme}
                className="flex-1 rounded-lg px-3 py-2 text-sm text-secondary transition cursor-pointer"
              >
                {theme === "dark" ? (
                  <div className="flex items-center justify-center gap-2">
                    <SunIcon className="h-4 w-4" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <MoonIcon className="h-4 w-4" />
                  </div>
                )}
              </button>
              <button
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-secondary cursor-pointer"
                aria-label="메뉴 닫기"
                onClick={onClose}
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <nav className="flex flex-col gap-2 overflow-y-auto pb-4">
            {navItems.map((item) => {
              const hasSub = item.sub && item.sub.length > 0;
              const sectionOpen = hasSub && !!mobileSections[item.id];

              return (
                <div
                  key={item.id}
                  className="rounded-xl p-2"
                >
                  {hasSub ? (
                    <>
                      <button
                        type="button"
                        onClick={() => onToggleSection(item.id)}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-secondary transition hover:bg-black/5 cursor-pointer"
                      >
                        <span className="text-base font-medium">{item.label}</span>
                        <ChevronDown
                          className={clsx(
                            "h-4 w-4 transition-transform",
                            sectionOpen && "rotate-180",
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {sectionOpen && (
                          <motion.div
                            key={`mobile-accordion-${item.id}`}
                            initial="collapsed"
                            animate="expanded"
                            exit="collapsed"
                            variants={accordionVariants}
                            transition={{ duration: 0.18, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                            className="mt-2 rounded-lg bg-background/80 px-2 py-1"
                          >
                            <motion.ul layout className="flex flex-col gap-1">
                              {item.sub?.map((subItem) => {
                                const active = normalizedPath.startsWith(subItem.baseHref);
                                return (
                                  <li key={subItem.id}>
                                    <Link
                                      href={subItem.href}
                                      onClick={onClose}
                                      className={clsx(
                                        "flex items-center rounded-md px-3 py-2 text-sm transition",
                                        active
                                          ? "bg-primary/10 text-secondary"
                                          : "text-secondary/70 hover:bg-black/5 hover:text-secondary",
                                      )}
                                    >
                                      {subItem.label}
                                    </Link>
                                  </li>
                                );
                              })}
                            </motion.ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : item.href ? (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={clsx(
                        "flex items-center justify-between rounded-lg px-3 py-2 text-base transition",
                        normalizedPath.startsWith(item.baseHref ?? "")
                          ? "bg-black/5 text-secondary"
                          : "text-secondary/70 hover:bg-black/5 hover:text-secondary",
                      )}
                    >
                      {item.label}
                    </Link>
                  ) : null}
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
