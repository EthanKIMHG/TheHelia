"use client";

import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import clsx from "clsx";
import { ReactNode, useMemo } from "react";
import { ScrollReveal } from "./common/ScrollReveal";
import { getMainPageContent, getSubPageContent } from "./header/nav-data";
import type { Locale } from "./header/types";
import { SubPageHero } from "./SubPageHero";

interface SubPageTemplateProps {
  path: string;
  children?: ReactNode;
  localeOverride?: Locale;
  fullWidth?: boolean;
}

export function SubPageTemplate({
  path,
  children,
  localeOverride,
  fullWidth = false,
}: SubPageTemplateProps) {
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

  const showEyebrow = Boolean(main?.title) && main?.title !== primary.title;

  return (
    <div className="pb-16 md:pb-24">
      <SubPageHero
        title={main?.title ?? primary.title}
        imageSrc={main?.imageSrc ?? primary.imageSrc}
        imageAlt={main?.imageAlt ?? primary.imageAlt}
      />

      <section
        className={clsx(
          "mx-auto flex w-full flex-col items-center gap-12 pt-16 text-foreground md:gap-16 md:pt-24",
          fullWidth ? "max-w-none px-0" : "max-w-6xl px-4",
        )}
      >
        <div className="px-4 text-center">
          <ScrollReveal>
            {showEyebrow ? (
              <span className="eyebrow mb-5 block">{main?.title}</span>
            ) : null}
            <h2 className="break-keep font-display-serif text-3xl font-normal leading-[1.4] text-foreground md:text-4xl">
              {primary.title}
            </h2>
            <span
              className="mx-auto mt-7 block h-px w-10 bg-primary/60"
              aria-hidden
            />
            <p className="mx-auto mt-7 max-w-[34ch] break-keep text-[15px] leading-[2] text-secondary md:max-w-2xl md:text-base">
              {primary.copy ?? primary.description}
            </p>
          </ScrollReveal>
        </div>
        {children ? (
          <div
            className={clsx(
              "w-full",
              fullWidth ? "max-w-none" : "max-w-7xl",
            )}
          >
            {children}
          </div>
        ) : null}
      </section>
    </div>
  );
}
