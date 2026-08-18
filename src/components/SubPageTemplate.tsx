"use client";

import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import clsx from "clsx";
import { ReactNode, useMemo } from "react";
import { getMainPageContent, getSubPageContent } from "./header/nav-data";
import type { Locale } from "./header/types";
import { SubPageHero } from "./SubPageHero";

interface SubPageTemplateProps {
  path: string;
  children?: ReactNode;
  localeOverride?: Locale;
  fullWidth?: boolean;
  heroVariant?: "default" | "cinematic";
  heroImageSrc?: string;
  heroImageAlt?: string;
}

const PAGE_IDENTITY_HERO_PATHS = new Set([
  "/the-helia/about",
  "/the-helia/location",
  "/reservation",
  "/reservation/price",
  "/stories/guest-reviews",
  "/stories/faq",
]);

export function SubPageTemplate({
  path,
  children,
  localeOverride,
  fullWidth = false,
  heroVariant = "default",
  heroImageSrc,
  heroImageAlt,
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
  const isCinematic = heroVariant === "cinematic";
  const showPageIdentityHero = isCinematic || PAGE_IDENTITY_HERO_PATHS.has(path);

  return (
    <div className="pb-16 md:pb-24">
      {showPageIdentityHero ? (
        <SubPageHero
          variant="cinematic"
          eyebrow={showEyebrow ? main?.title : undefined}
          title={primary.title}
          copy={primary.copy ?? primary.description}
          imageSrc={heroImageSrc ?? primary.imageSrc}
          imageAlt={heroImageAlt ?? primary.imageAlt}
        />
      ) : (
        <SubPageHero
          title={main?.title ?? primary.title}
          imageSrc={main?.imageSrc ?? primary.imageSrc}
          imageAlt={main?.imageAlt ?? primary.imageAlt}
        />
      )}

      <section
        className={clsx(
          "mx-auto flex w-full flex-col items-center gap-12 pt-16 text-foreground md:gap-16",
          fullWidth ? "max-w-none px-0" : "max-w-6xl px-4",
        )}
      >
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
