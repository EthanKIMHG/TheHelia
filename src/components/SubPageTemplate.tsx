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

  return (
    <div className="pb-12 ">
      <SubPageHero
        title={main?.title ?? primary.title}
        imageSrc={main?.imageSrc ?? primary.imageSrc}
        imageAlt={main?.imageAlt ?? primary.imageAlt}
      />

      <section
        className={clsx(
          "mx-auto flex w-full flex-col items-center gap-8 pt-20 text-secondary",
          fullWidth ? "max-w-none px-0" : "max-w-6xl px-4",
        )}
      >
        <div className="px-4 text-left md:text-center">
          <ScrollReveal>
            <h2 className="break-keep text-3xl font-serif font-semibold leading-[1.28] text-foreground md:text-4xl md:leading-tight">
              {primary.title}
            </h2>
            <p className="mt-4 max-w-[30ch] break-keep text-base leading-relaxed text-secondary/80 md:mx-auto md:max-w-3xl md:text-lg">
              {primary.copy ?? primary.description}
            </p>
          </ScrollReveal>
        </div>
        {children ? (
          <div
            className={clsx(
              "w-full rounded-xl backdrop-blur",
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
