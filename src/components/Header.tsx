"use client";

import clsx from "clsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlobeIcon, Languages, Menu, MoonIcon, SunIcon } from "lucide-react";

import { DesktopPrimaryNav } from "./header/DesktopPrimaryNav";
import { DesktopNavPanel } from "./header/DesktopNavPanel";
import { MobileNavDrawer } from "./header/MobileNavDrawer";
import { NAV_ITEMS } from "./header/nav-data";
import type {
  Locale,
  NavItem,
  NavSubItem,
  PreviewData,
} from "./header/types";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<NavItem | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [locale, setLocale] = useState<Locale>("ko");
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [mobileSections, setMobileSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    } else {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(media.matches ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedLocale = window.localStorage.getItem("locale");
    if (storedLocale === "ko" || storedLocale === "en") {
      setLocale(storedLocale);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale;
    if (typeof window !== "undefined") {
      window.localStorage.setItem("locale", locale);
    }
  }, [locale]);

  const buildPreviewData = useCallback(
    (subItem?: NavSubItem | null): PreviewData | null => {
      if (!subItem || !subItem.previewImage) return null;
      return {
        src: subItem.previewImage.src,
        alt: subItem.previewImage.alt,
        label: subItem.label,
        copy: subItem.previewCopy,
      };
    },
    [],
  );

  const toggleTheme = () =>
    setTheme((current) => (current === "dark" ? "light" : "dark"));

  const toggleLocale = () =>
    setLocale((current) => (current === "ko" ? "en" : "ko"));

  const toggleMobileSection = (id: string) => {
    setMobileSections((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  const navItems = useMemo<NavItem[]>(
    () =>
      NAV_ITEMS.map(({ label, description, sub, ...rest }) => ({
        ...rest,
        label: label[locale],
        description: description?.[locale],
        sub: sub?.map(({ label: subLabel, description: subDescription, previewImage, previewCopy, ...subRest }) => ({
          ...subRest,
          label: subLabel[locale],
          description: subDescription[locale],
          previewImage: previewImage
            ? {
                src: previewImage.src,
                alt: previewImage.alt[locale],
              }
            : undefined,
          previewCopy: previewCopy ? previewCopy[locale] : undefined,
        })),
      })),
    [locale],
  );

  const handleNavClick = useCallback(
    (item: NavItem) => {
      setActiveNav((current) => {
        const isSame = current?.id === item.id;
        if (isSame) {
          setPreviewData(null);
          return null;
        }
        if (item.sub?.length) {
          setPreviewData(buildPreviewData(item.sub[0]));
        } else {
          setPreviewData(null);
        }
        return item;
      });
    },
    [buildPreviewData],
  );

  const closeOverlays = useCallback(() => {
    setActiveNav(null);
    setMobileOpen(false);
    setPreviewData(null);
    setMobileSections({});
  }, []);

  useEffect(() => {
    setActiveNav(null);
    setMobileOpen(false);
    setPreviewData(null);
    setMobileSections({});
  }, [pathname]);

  useEffect(() => {
    if (!activeNav) return;
    const updated = navItems.find((item) => item.id === activeNav.id);
    if (!updated || updated === activeNav) return;
    setActiveNav(updated);
    if (updated.sub?.length) {
      setPreviewData(buildPreviewData(updated.sub[0]));
    } else {
      setPreviewData(null);
    }
  }, [navItems, activeNav, buildPreviewData]);

  const isActivePath = useCallback(
    (item: NavItem) => {
      if (item.sub?.some((subItem) => pathname.startsWith(subItem.href))) {
        return true;
      }
      if (item.id === "the-helia" && pathname === "/") {
        return true;
      }
      if (!item.href) return false;
      if (item.href === "/") {
        return pathname === "/";
      }
      return pathname.startsWith(item.href);
    },
    [pathname],
  );

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full border-b border-border bg-background/90 text-lg backdrop-blur supports-[backdrop-filter]:bg-background/70",
        {
          "font-maru": locale === "ko",
          "font-source-semi": locale === "en",
        },
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 md:grid md:grid-cols-[auto_1fr_auto] md:gap-10 md:px-6">
        <Link href="/" className="flex items-center">
          {theme === "light" ? (
            <Image
              src="/img/logo/header_logo.png"
              alt="더헬리아 산후조리원 로고"
              width={160}
              height={40}
              priority
              className="h-10 w-auto"
            />
          ) : (
            <Image
              src="/img/logo/header_logo_white.png"
              alt="더헬리아 산후조리원 로고"
              width={160}
              height={40}
              priority
              className="h-10 w-auto"
            />
          )}
        </Link>

        <DesktopPrimaryNav
          navItems={navItems}
          activeNav={activeNav}
          isActivePath={isActivePath}
          onNavClick={handleNavClick}
        />

        <div className="ml-auto flex items-center gap-4 md:ml-0 md:gap-1">
          <button
            type="button"
            onClick={toggleLocale}
            className="hidden h-10 w-10 items-center justify-center text-secondary transition md:inline-flex"
            aria-label={locale === "ko" ? "Switch to English" : "한국어로 전환"}
          >
            {locale === "ko" ? (
              <Languages className="h-5 w-5" />
            ) : (
              <GlobeIcon className="h-5 w-5" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="hidden h-10 w-10 items-center justify-center text-secondary transition md:inline-flex"
            aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-secondary md:hidden"
            aria-label="메뉴 열기"
            onClick={() => setMobileOpen(true)}
          >
            <span className="sr-only">모바일 메뉴 열기</span>
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MobileNavDrawer
        open={mobileOpen}
        theme={theme}
        locale={locale}
        navItems={navItems}
        pathname={pathname}
        mobileSections={mobileSections}
        onToggleSection={toggleMobileSection}
        onToggleLocale={toggleLocale}
        onToggleTheme={toggleTheme}
        onClose={closeOverlays}
      />

      <DesktopNavPanel
        activeNav={activeNav}
        previewData={previewData}
        locale={locale}
        pathname={pathname}
        onClose={closeOverlays}
        onPreviewChange={setPreviewData}
        buildPreviewData={buildPreviewData}
      />
    </header>
  );
}
