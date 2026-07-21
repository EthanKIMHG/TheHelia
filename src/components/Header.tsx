"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useThemeLocale } from "@/context/theme-locale-context";
import { FullscreenNav } from "./header/FullscreenNav";
import { getLocalizedNavItems } from "./header/nav-data";
import type { Locale } from "./header/types";

const SUPPORTED_LOCALES: Locale[] = ["ko", "en"];

const stripLocaleFromPath = (path: string) => {
  if (!path) return "/";
  const segments = path.split("/").filter(Boolean);
  if (segments.length && SUPPORTED_LOCALES.includes(segments[0] as Locale)) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return path.startsWith("/") ? path : `/${path}`;
};

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, locale, setLocale, toggleTheme } = useThemeLocale();

  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const normalizedPath = useMemo(() => stripLocaleFromPath(pathname ?? "/"), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = useMemo(() => getLocalizedNavItems(locale), [locale]);

  const changeLocale = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) return;
      setLocale(nextLocale);
      const basePath = normalizedPath === "/" ? "" : normalizedPath;
      const target = `/${nextLocale}${basePath}`.replace(/\/{2,}/g, "/");
      setNavOpen(false);
      router.push(target);
    },
    [locale, normalizedPath, router, setLocale],
  );

  useEffect(() => {
    setNavOpen(false);
  }, [normalizedPath]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={clsx(
          "fixed inset-x-0 top-3 z-50 mx-auto w-full max-w-6xl px-4 transition-opacity duration-500 md:top-4 md:px-6",
          navOpen && "pointer-events-none opacity-0",
        )}
      >
        <div
          style={{ borderRadius: "var(--radius-pill)", border: "1px solid var(--glass-hairline)" }}
          className={clsx(
            "glass-bar grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-x-3 px-4 transition-shadow duration-500 md:h-16 md:gap-x-4 md:px-6",
            scrolled && "shadow-[var(--shadow-glass-strong)]",
          )}
        >
          <button
            type="button"
            onClick={() => setNavOpen(true)}
            className="group inline-flex items-center gap-3 justify-self-start text-foreground"
            aria-label={locale === "ko" ? "메뉴 열기" : "Open menu"}
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
            <span className="hidden font-sans text-[11px] font-semibold uppercase tracking-[0.28em] md:inline">
              {locale === "ko" ? "메뉴" : "Menu"}
            </span>
          </button>

          <Link
            href={`/${locale}`}
            className="justify-self-center"
            aria-label="The Helia"
          >
            <span className="whitespace-nowrap font-force-playfair text-sm tracking-[0.2em] text-foreground md:text-lg md:tracking-[0.42em]">
              THE HELIA
            </span>
          </Link>

          <div className="flex items-center gap-2.5 justify-self-end md:gap-4">
            <button
              type="button"
              onClick={() => changeLocale(locale === "ko" ? "en" : "ko")}
              className="hidden shrink-0 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/65 transition-colors hover:text-foreground md:inline-flex"
              aria-label={locale === "ko" ? "Switch to English" : "한국어로 전환"}
            >
              {locale === "ko" ? "EN" : "KO"}
            </button>
            <Link
              href={`/${locale}/reservation`}
              style={{ borderRadius: "var(--radius-pill)" }}
              className="press-grow shrink-0 whitespace-nowrap bg-foreground/[0.07] px-3 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-foreground/[0.13] md:px-3.5 md:tracking-[0.22em]"
            >
              {locale === "ko" ? "예약" : "Reserve"}
            </Link>
          </div>
        </div>
      </motion.header>

      <FullscreenNav
        open={navOpen}
        locale={locale}
        theme={theme}
        navItems={navItems}
        normalizedPath={normalizedPath}
        onClose={() => setNavOpen(false)}
        onLocaleChange={changeLocale}
        onToggleTheme={toggleTheme}
      />

      {/* Close button lives above the overlay so it stays reachable */}
      <NavCloseButton open={navOpen} locale={locale} onClose={() => setNavOpen(false)} />
    </>
  );
}

function NavCloseButton({
  open,
  locale,
  onClose,
}: {
  open: boolean;
  locale: Locale;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-x-0 top-3 z-[70] mx-auto max-w-6xl px-7 md:top-4 md:px-11">
      <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center md:h-16">
        <button
          type="button"
          onClick={onClose}
          className="group inline-flex items-center gap-3 justify-self-start text-foreground"
          aria-label={locale === "ko" ? "메뉴 닫기" : "Close menu"}
        >
          <CloseIcon />
          <span className="hidden font-sans text-[11px] font-semibold uppercase tracking-[0.28em] md:inline">
            {locale === "ko" ? "닫기" : "Close"}
          </span>
        </button>
        <Link
          href={`/${locale}`}
          onClick={onClose}
          className="justify-self-center"
          aria-label="The Helia"
        >
          <span className="font-force-playfair text-base tracking-[0.42em] text-foreground md:text-xl">
            THE HELIA
          </span>
        </Link>
        <span aria-hidden className="justify-self-end" />
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
