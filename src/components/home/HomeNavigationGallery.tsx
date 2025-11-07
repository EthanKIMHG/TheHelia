"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { getLocalizedNavItems } from "@/components/header/nav-data";
import type { Locale, NavItem } from "@/components/header/types";

type NavigationCopy = {
  badge: string;
  title: string;
  subtitle: string;
  cta: string;
};

type HomeNavigationGalleryProps = {
  locale: Locale;
  sectionId?: string;
  onSectionMount?: (node: HTMLElement | null) => void;
};

export function HomeNavigationGallery({
  locale,
  sectionId = "nav-gallery",
  onSectionMount,
}: HomeNavigationGalleryProps) {
  const navItems = useMemo(() => getLocalizedNavItems(locale), [locale]);
  const [activeId, setActiveId] = useState<string | null>(
    navItems[0]?.id ?? null,
  );
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const copy = useMemo<NavigationCopy>(
    () =>
      locale === "ko"
        ? {
            badge: "HELIA NAVIGATION",
            title: "더 헬리아의 무드를 따라가 보세요",
            subtitle:
              "원하는 메뉴에 마우스를 올려 미리보기를 확인하고 바로 이동해 보세요.",
            cta: "바로가기",
          }
        : {
            badge: "HELIA NAVIGATION",
            title: "Explore The Helia",
            subtitle:
              "Hover over any column to preview the destination instantly.",
            cta: "Open page",
          },
    [locale],
  );

  return (
    <section
      id={sectionId}
      ref={onSectionMount}
      className="w-full bg-background px-4 py-16 text-secondary sm:px-6 md:py-20 lg:px-12"
      style={{ minHeight: isDesktop ? "80vh" : undefined }}
    >
      <NavigationGalleryHeader copy={copy} />
      <NavigationPanelGrid
        items={navItems}
        activeId={activeId}
        onActivate={setActiveId}
        copy={copy}
        isDesktop={isDesktop}
        locale={locale}
      />
    </section>
  );
}

function NavigationGalleryHeader({ copy }: { copy: NavigationCopy }) {
  return (
    <div className="mx-auto flex w-full flex-col gap-4 text-left">
      <p className="text-xs  uppercase tracking-[0.4em] text-primary">
        {copy.badge}
      </p>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h2 className="text-3xl  md:text-4xl">{copy.title}</h2>
        <p className="max-w-xl text-sm text-secondary/70 md:text-base">
          {copy.subtitle}
        </p>
      </div>
    </div>
  );
}

type NavigationPanelGridProps = {
  items: NavItem[];
  activeId: string | null;
  onActivate: (id: string) => void;
  copy: NavigationCopy;
  isDesktop: boolean;
  locale: Locale;
};

function NavigationPanelGrid({
  items,
  activeId,
  onActivate,
  copy,
  isDesktop,
  locale,
}: NavigationPanelGridProps) {
  const columnTemplate = useMemo(() => {
    if (!isDesktop || !items.length) return undefined;
    return items.map((item) => (item.id === activeId ? "4fr" : "1fr")).join(" ");
  }, [activeId, isDesktop, items]);

  const wrapperClass = isDesktop
    ? "mt-10 grid w-full gap-4"
    : "mt-10 flex w-full flex-col gap-4";

  return (
    <div
      className={wrapperClass}
      style={
        columnTemplate
          ? {
              gridTemplateColumns: columnTemplate,
              transition: "grid-template-columns 0.6s ease",
            }
          : undefined
      }
    >
      {items.map((item) => (
        <NavigationPanelCard
          key={item.id}
          item={item}
          active={item.id === activeId}
          ctaLabel={copy.cta}
          isDesktop={isDesktop}
          locale={locale}
          onActivate={onActivate}
        />
      ))}
    </div>
  );
}

type NavigationPanelCardProps = {
  item: NavItem;
  active: boolean;
  onActivate: (id: string) => void;
  ctaLabel: string;
  isDesktop: boolean;
  locale: Locale;
};

function NavigationPanelCard({
  item,
  active,
  onActivate,
  ctaLabel,
  isDesktop,
  locale,
}: NavigationPanelCardProps) {
  const targetHref =
    item.href ?? item.sub?.[0]?.href ?? item.sub?.[0]?.baseHref ?? "#";
  const previewSrc =
    item.previewImage?.src ??
    item.sub?.[0]?.previewImage?.src ??
    "/img/main/homepage_1.jpg";
  const previewAlt =
    item.previewImage?.alt ??
    item.sub?.[0]?.previewImage?.alt ??
    item.label;

  const handleMobileNavigate = () => {
    if (!isDesktop && typeof window !== "undefined") {
      window.location.href = targetHref;
    }
  };
  const isExpanded = active && isDesktop;
  const showSubLinks = isExpanded && item.sub?.length;

  return (
    <motion.button
      layout
      transition={{ layout: { duration: 0.5, ease: "easeOut" } }}
      type="button"
      onMouseEnter={() => onActivate(item.id)}
      onFocus={() => onActivate(item.id)}
      onClick={handleMobileNavigate}
      className={clsx(
        "group relative min-h-[210px] overflow-hidden rounded-3xl border border-border/40 bg-background/70 text-left transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-ne-resize",
        "flex flex-col",
        isDesktop && "md:min-h-[80vh]",
      )}
    >
      <span className="sr-only">{item.label}</span>
      <div className="absolute inset-0">
        <Image
          src={previewSrc}
          alt={previewAlt}
          fill
          className={clsx(
            "object-cover transition duration-500",
            active ? "scale-110" : "scale-100",
          )}
          sizes="(min-width: 1024px) 20vw, 100vw"
          priority={active}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/0" />
      </div>

      <div
        className={clsx(
          "relative flex h-full flex-col justify-between p-6 text-white transition-colors",
          active ? "backdrop-blur-sm" : "",
        )}
      >
        <div>
          <p
            className={clsx(
              "text-sm uppercase tracking-[0.35em] text-white/80",
              localeClassName(locale),
            )}
          >
            {item.label}
          </p>
          <h3
            className={clsx(
              "mt-3 text-2xl font-semibold leading-snug md:text-3xl",
              active ? "text-white" : "text-white/85",
            )}
          >
            {item.description ?? item.label}
          </h3>
          {item.sub?.length ? (
            <p className="mt-4 text-base text-white/80 line-clamp-3 md:text-lg">
              {item.sub[0].description}
            </p>
          ) : null}
        </div>

        <div
          className={clsx(
            "mt-auto flex w-full gap-4 pt-6",
            isExpanded
              ? "flex-col md:flex-row md:items-center md:justify-between"
              : "flex-col items-center",
          )}
        >
          {showSubLinks ? (
            <div className="flex flex-wrap justify-center gap-2 text-xs text-white/90 md:justify-start">
              {item.sub?.map((sub) => (
                <Link
                  key={sub.id}
                  href={sub.href}
                  className="rounded-lg border border-white/40 px-3 py-1 transition hover:bg-white/15"
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          ) : null}
          <Link
            href={targetHref}
            className={clsx(
              "inline-flex items-center gap-2 rounded-lg  px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white cursor-pointer border border-white/20",
              showSubLinks ? "" : "justify-center border border-white/20 ",
            )}
          >
            {ctaLabel}
            <span aria-hidden className="text-base">↗</span>
          </Link>
        </div>
      </div>
    </motion.button>
  );
}

const localeClassName = (locale: Locale) =>
  locale === "ko" ? "font-maru-semi" : "font-source-semi";
