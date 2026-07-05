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


  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 h-screen w-full bg-black/30 md:hidden"
            onClick={onClose}
          />
          <div className="md:hidden sticky top-0 z-50">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 flex h-screen w-full max-w-[300px] flex-col gap-4 border-l border-border bg-background p-4 sm:max-w-md"
            >
              <div className="flex h-12 items-center justify-between">
                <span className="whitespace-nowrap font-force-playfair text-base tracking-[0.3em] text-foreground">
                  THE HELIA
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onLocaleChange(locale === "ko" ? "en" : "ko")}
                    className="inline-flex h-9 w-9 items-center justify-center border border-border text-sm text-foreground transition-colors hover:border-foreground cursor-pointer"
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
                    className="inline-flex h-9 w-9 items-center justify-center border border-border text-sm text-foreground transition-colors hover:border-foreground cursor-pointer"
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
                    className="inline-flex h-9 w-9 items-center justify-center border border-border text-foreground transition-colors hover:border-foreground cursor-pointer"
                    aria-label="메뉴 닫기"
                    onClick={onClose}
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <nav className="flex flex-col divide-y divide-border overflow-y-auto pb-4">
                {navItems.map((item) => {
                  const hasSub = item.sub && item.sub.length > 0;
                  const sectionOpen = hasSub && !!mobileSections[item.id];

                  return (
                    <div
                      key={item.id}
                      className="py-2"
                    >
                      {hasSub ? (
                        <>
                          <button
                            type="button"
                            onClick={() => onToggleSection(item.id)}
                            className="flex w-full items-center justify-between px-1 py-2 text-left text-foreground transition-colors cursor-pointer"
                          >
                            <span className="text-base font-medium tracking-[0.08em]">{item.label}</span>
                            <ChevronDown
                              strokeWidth={1.5}
                              className={clsx(
                                "h-4 w-4 text-primary transition-transform",
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
                                className="mt-1 px-1 py-1"
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
                                            "flex items-center px-3 py-2 text-sm tracking-[0.08em] transition-colors",
                                            active
                                              ? "bg-accent/50 text-foreground"
                                              : "text-secondary hover:text-foreground",
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
                            "flex items-center justify-between px-1 py-2 text-base tracking-[0.08em] transition-colors",
                            normalizedPath.startsWith(item.baseHref ?? "")
                              ? "text-foreground"
                              : "text-secondary hover:text-foreground",
                          )}
                        >
                          {item.label}
                        </Link>
                      ) : null}
                    </div>
                  );
                })}
              </nav>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
