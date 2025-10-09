"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GlobeIcon, Languages, Menu, MoonIcon, SunIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useThemeLocale } from "@/context/theme-locale-context";
import { DesktopPrimaryNav } from "./header/DesktopPrimaryNav";
import { DesktopNavPanel } from "./header/DesktopNavPanel";
import { MobileNavDrawer } from "./header/MobileNavDrawer";
import { getLocalizedNavItems } from "./header/nav-data";
import type { Locale, NavItem, NavSubItem, PreviewData } from "./header/types";

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

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<NavItem | null>(null);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [mobileSections, setMobileSections] = useState<Record<string, boolean>>({});

  const normalizedPath = useMemo(() => stripLocaleFromPath(pathname ?? "/"), [pathname]);

  const navItems = useMemo(() => getLocalizedNavItems(locale), [locale]);

  const buildPreviewData = useCallback((subItem?: NavSubItem | null): PreviewData | null => {
    if (!subItem || !subItem.previewImage) return null;
    return {
      src: subItem.previewImage.src,
      alt: subItem.previewImage.alt,
      label: subItem.label,
      copy: subItem.previewCopy,
    };
  }, []);

  const handleNavClick = useCallback(
    (item: NavItem) => {
      if (!item.sub?.length) {
        setActiveNav(null);
        setPreviewData(null);
        return;
      }
      setActiveNav((current) => {
        const isSame = current?.id === item.id;
        if (isSame) {
          setPreviewData(null);
          return null;
        }
        setPreviewData(buildPreviewData(item?.sub[0]));
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

  const changeLocale = useCallback(
    (nextLocale: Locale) => {
      if (nextLocale === locale) return;
      setLocale(nextLocale);
      const basePath = normalizedPath === "/" ? "" : normalizedPath;
      const target = `/${nextLocale}${basePath}`.replace(/\/{2,}/g, "/");
      setMobileOpen(false);
      setMobileSections({});
      setActiveNav(null);
      setPreviewData(null);
      router.push(target);
    },
    [locale, normalizedPath, router, setLocale],
  );

  const isActivePath = useCallback(
    (item: NavItem) => {
      if (item.sub?.some((subItem) => normalizedPath.startsWith(subItem.baseHref))) {
        return true;
      }
      if (item.baseHref) {
        if (item.baseHref === "/") {
          return normalizedPath === "/";
        }
        return normalizedPath.startsWith(item.baseHref);
      }
      return false;
    },
    [normalizedPath],
  );

  useEffect(() => {
    setActiveNav(null);
    setPreviewData(null);
    setMobileOpen(false);
  }, [normalizedPath]);

  useEffect(() => {
    setMobileSections((current) => {
      const next = { ...current };
      navItems.forEach((item) => {
        if (item.sub?.some((sub) => normalizedPath.startsWith(sub.baseHref))) {
          next[item.id] = true;
        }
      });
      return next;
    });
  }, [navItems, normalizedPath]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full border-b border-border bg-background/90 text-lg backdrop-blur supports-[backdrop-filter]:bg-background/70",
        {
          "font-maru-semi": locale === "ko",
          "font-source-semi": locale === "en",
        },
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 md:grid md:grid-cols-[auto_1fr_auto] md:gap-10 md:px-6">
        <Link href={`/${locale}`} className="flex items-center">
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
            onClick={() => changeLocale(locale === "ko" ? "en" : "ko")}
            className="hidden h-10 w-10 items-center justify-center text-secondary transition md:inline-flex cursor-pointer"
            aria-label={locale === "ko" ? "Switch to English" : "한국어로 전환"}
          >
            {locale === "ko" ? <GlobeIcon className="h-5 w-5" /> : <Languages className="h-5 w-5" />}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="hidden h-10 w-10 items-center justify-center text-secondary transition md:inline-flex cursor-pointer"
            aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
          >
            {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </button>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-secondary md:hidden cursor-pointer"
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
        locale={locale}
        theme={theme}
        navItems={navItems}
        normalizedPath={normalizedPath}
        mobileSections={mobileSections}
        onToggleSection={(id) =>
          setMobileSections((current) => ({ ...current, [id]: !current[id] }))
        }
        onLocaleChange={changeLocale}
        onToggleTheme={toggleTheme}
        onClose={closeOverlays}
      />

      <DesktopNavPanel
        activeNav={activeNav}
        previewData={previewData}
        locale={locale}
        normalizedPath={normalizedPath}
        onClose={closeOverlays}
        onPreviewChange={setPreviewData}
        buildPreviewData={buildPreviewData}
      />
    </header>
  );
}
