"use client";

import Link from "next/link";
import { ReactNode, useMemo } from "react";
import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import { SubPageHero } from "./SubPageHero";
import { getMainPageContent, getSubPageContent } from "./header/nav-data";
import type { Locale } from "./header/types";

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

  const renderSwitchButton = (slug?: string, variant: "left" | "right" | "mobile" = "mobile") => {
    if (!slug) {
      return <span className="hidden md:block" />;
    }
    const labels = SUITE_LABELS[slug as keyof typeof SUITE_LABELS];
    const label = labels?.[locale] ?? slug.toUpperCase();
    const baseClasses =
      "inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-3 text-base font-semibold transition";
    const desktopClasses =
      variant === "mobile"
        ? "bg-primary/10 text-primary hover:bg-primary hover:text-background"
        : "bg-background/90 text-primary hover:bg-primary hover:text-background";
    const alignmentClasses =
      variant === "left"
        ? "self-start md:self-auto"
        : variant === "right"
          ? "self-end md:self-auto"
          : "";
    return (
      <Link
        key={slug}
        href={buildSuiteHref(slug)}
        className={`${baseClasses} ${desktopClasses} ${alignmentClasses}`}
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

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pt-16 text-secondary">
        <div className="hidden items-start justify-between md:flex md:gap-6">
          {renderSwitchButton(otherSuites[0], "left")}
          <div className="text-center">
            <h2 className="text-4xl font-semibold">
              {primary.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-secondary/80">
              {primary.copy ?? primary.description}
            </p>
          </div>
          {renderSwitchButton(otherSuites[1], "right")}
        </div>

        <div className="flex flex-col gap-4 md:hidden">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {otherSuites.map((slug) => renderSwitchButton(slug, "mobile"))}
          </div>
        </div>

        {children ? (
          <div className="mt-4 w-full rounded-3xl backdrop-blur">
            {children}
          </div>
        ) : null}
      </section>
    </div>
  );
}
