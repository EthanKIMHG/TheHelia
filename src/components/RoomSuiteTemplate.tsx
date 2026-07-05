"use client";

import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import Link from "next/link";
import { ReactNode, useMemo } from "react";
import { ScrollReveal } from "./common/ScrollReveal";
import { getMainPageContent, getSubPageContent } from "./header/nav-data";
import type { Locale } from "./header/types";
import { SubPageHero } from "./SubPageHero";

interface RoomSuiteTemplateProps {
  path: string;
  children?: ReactNode;
  localeOverride?: Locale;
  hrefPrefix?: string;
}

export function RoomSuiteTemplate({
  path,
  children,
  localeOverride,
  hrefPrefix = "",
}: RoomSuiteTemplateProps) {
  const themeLocale = useOptionalThemeLocale();
  const contextLocale = themeLocale?.locale ?? "ko";
  const locale = useMemo(
    () => localeOverride ?? contextLocale,
    [contextLocale, localeOverride],
  );

  const primary = getSubPageContent(path, locale);
  if (!primary) {
    return null;
  }

  const segments = path.split("/").filter(Boolean);
  const parentSegments =
    segments.length > 1 ? segments.slice(0, -1) : segments.slice(0, 1);
  const parentPath = parentSegments.length
    ? `/${parentSegments.join("/")}`
    : "/";

  const main =
    parentSegments.length > 0
      ? getMainPageContent(parentPath, locale)
      : null;

  const SUITE_SLUGS = ["prestige", "vvip", "vip"] as const;
  const currentSuite = SUITE_SLUGS.find((slug) => path.endsWith(slug));
  const otherSuites = SUITE_SLUGS.filter((slug) => slug !== currentSuite);

  const SUITE_LABELS: Record<(typeof SUITE_SLUGS)[number], { ko: string; en: string }> = {
    prestige: { ko: "PRESTIGE", en: "PRESTIGE" },
    vvip: { ko: "VVIP", en: "VVIP" },
    vip: { ko: "VIP", en: "VIP" },
  };

  const buildSuiteHref = (slug: string) => {
    const basePath = path.replace(/\/[^/]+$/, "");
    const combined = `${hrefPrefix}${basePath}/${slug}`;
    return combined.replace(/\/{2,}/g, "/");
  };

  const renderSwitchButton = (
    slug?: string,
    options?: { align?: "left" | "right"; isMobile?: boolean; isActive?: boolean },
  ) => {
    if (!slug) {
      return <span className="hidden md:block" />;
    }
    const labels = SUITE_SLUGS.includes(slug as typeof SUITE_SLUGS[number])
      ? SUITE_LABELS[slug as keyof typeof SUITE_LABELS]
      : undefined;
    const label = labels?.[locale] ?? slug.toUpperCase();
    const { align, isMobile = false, isActive = false } = options ?? {};
    const baseClasses =
      "inline-flex items-center gap-2 border px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300";
    const paletteClasses = isMobile
      ? isActive
        ? "border-foreground bg-foreground text-background"
        : "border-foreground/40 text-foreground hover:border-foreground"
      : "border-foreground/40 text-foreground hover:border-foreground";
    const alignmentClasses =
      align === "left"
        ? "self-start md:self-auto"
        : align === "right"
        ? "self-end md:self-auto"
        : "";

    return (
      <Link
        key={slug}
        href={buildSuiteHref(slug)}
        className={`${baseClasses} ${paletteClasses} ${alignmentClasses}`.trim()}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="pb-12">
      <SubPageHero
        title={main?.title ?? primary.title}
        imageSrc={main?.imageSrc ?? primary.imageSrc}
        imageAlt={main?.imageAlt ?? primary.imageAlt}
      />

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pt-16 text-foreground">
        <div className="hidden items-start justify-between md:flex md:gap-6">
          {renderSwitchButton(otherSuites[0], { align: "left" })}
          <div className="text-center">
            <ScrollReveal>
              <h2 className="font-display-serif text-3xl font-normal leading-[1.4] text-foreground">
                {primary.title}
              </h2>
              <p className="mt-4 text-base leading-[1.85] text-secondary">
                {primary.copy ?? primary.description}
              </p>
            </ScrollReveal>
          </div>
          {renderSwitchButton(otherSuites[1], { align: "right" })}
        </div>

        <div className="flex flex-col gap-4 md:hidden">
          <div className="text-center">
            <ScrollReveal>
              <h2 className="break-keep font-display-serif text-3xl font-normal leading-[1.4] text-foreground">
                {primary.title}
              </h2>
              <p className="mx-auto mt-3 max-w-[30ch] break-keep text-base leading-[1.85] text-secondary">
                {primary.copy ?? primary.description}
              </p>
            </ScrollReveal>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {SUITE_SLUGS.map((slug) =>
              renderSwitchButton(slug, {
                isMobile: true,
                isActive: slug === currentSuite,
              }),
            )}
          </div>
        </div>

        {children ? (
          <div className="mt-4 w-full">
            {children}
          </div>
        ) : null}
      </section>
    </div>
  );
}
