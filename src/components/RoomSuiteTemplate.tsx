"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useMemo } from "react";

import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import { ScrollReveal } from "./common/ScrollReveal";
import { getMainPageContent, getSubPageContent } from "./header/nav-data";
import type { Locale } from "./header/types";

interface RoomSuiteTemplateProps {
  path: string;
  children?: ReactNode;
  localeOverride?: Locale;
  hrefPrefix?: string;
}

const SUITE_SLUGS = ["vip", "vvip", "prestige"] as const;

const SUITE_LABELS: Record<(typeof SUITE_SLUGS)[number], { ko: string; en: string }> = {
  vip: { ko: "VIP", en: "VIP" },
  vvip: { ko: "VVIP", en: "VVIP" },
  prestige: { ko: "PRESTIGE", en: "PRESTIGE" },
};

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
    parentSegments.length > 0 ? getMainPageContent(parentPath, locale) : null;

  const lastSegment = segments[segments.length - 1];
  const currentSuite = SUITE_SLUGS.find((slug) => slug === lastSegment);

  const buildSuiteHref = (slug: string) => {
    const basePath = path.replace(/\/[^/]+$/, "");
    const combined = `${hrefPrefix}${basePath}/${slug}`;
    return combined.replace(/\/{2,}/g, "/");
  };

  const eyebrow = main?.title ?? (locale === "ko" ? "룸 & 스위트" : "Room & Suites");

  return (
    <div className="pb-12">
      {/* Suite-specific cinematic hero */}
      <section className="relative h-[62vh] min-h-[440px] w-full overflow-hidden bg-accent/60 md:h-[70vh]">
        <Image
          src={primary.imageSrc}
          alt={primary.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/85 via-[#2D241E]/25 to-[#2D241E]/10" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-6xl px-4 pb-10 md:pb-16">
            <ScrollReveal>
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-white/80">
                {eyebrow}
              </p>
              <h1 className="mt-4 font-display-serif text-4xl font-normal uppercase tracking-[0.12em] text-white md:text-6xl">
                {primary.title}
              </h1>
              <p className="mt-5 max-w-[46ch] break-keep text-sm leading-[1.9] text-white/85 md:text-base">
                {primary.copy ?? primary.description}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Suite selector tabs */}
      <nav className="glass-bar border-b border-border" aria-label={eyebrow}>
        <div className="mx-auto flex max-w-6xl items-stretch justify-center px-2 md:justify-start md:px-4">
          {SUITE_SLUGS.map((slug, index) => {
            const active = slug === currentSuite;
            const label = SUITE_LABELS[slug][locale];
            return (
              <Link
                key={slug}
                href={buildSuiteHref(slug)}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "group -mb-px flex items-baseline gap-2.5 border-b-2 px-4 py-5 transition-colors duration-300 md:gap-3 md:px-9 md:py-7",
                  active
                    ? "border-foreground"
                    : "border-transparent hover:border-border",
                )}
              >
                <span
                  className={clsx(
                    "font-sans text-[10px] font-semibold tracking-[0.24em] tabular-nums transition-colors duration-300",
                    active ? "text-primary" : "text-secondary",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={clsx(
                    "font-display-serif text-lg font-normal tracking-[0.08em] transition-colors duration-300 md:text-xl",
                    active
                      ? "text-foreground"
                      : "text-foreground/40 group-hover:text-foreground",
                  )}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {children ? (
        <section className="mx-auto w-full max-w-6xl px-4 pt-16 text-foreground md:pt-20">
          {children}
        </section>
      ) : null}
    </div>
  );
}
