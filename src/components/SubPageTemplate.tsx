"use client";

import { useThemeLocale } from "@/context/theme-locale-context";
import { SubPageHero } from "./SubPageHero";
import { getMainPageContent, getSubPageContent } from "./header/nav-data";

interface SubPageTemplateProps {
  path: string;
}

export function SubPageTemplate({ path }: SubPageTemplateProps) {
  const { locale } = useThemeLocale();

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
    <div className="pb-16">
      <SubPageHero
        title={main?.title ?? primary.title}
        description={main?.description ?? primary.description}
        imageSrc={main?.imageSrc ?? primary.imageSrc}
        imageAlt={main?.imageAlt ?? primary.imageAlt}
      />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4">
        <h2 className="text-2xl font-semibold text-secondary">{primary.title}</h2>
        <p className="leading-relaxed text-secondary/80">
          {primary.copy ?? primary.description}
        </p>
      </div>
    </div>
  );
}
