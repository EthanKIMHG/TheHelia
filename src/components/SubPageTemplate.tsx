"use client";

import { useThemeLocale } from "@/context/theme-locale-context";
import { SubPageHero } from "./SubPageHero";
import { getSubPageContent } from "./header/nav-data";
import clsx from "clsx";

interface SubPageTemplateProps {
  path: string;
}

export function SubPageTemplate({ path }: SubPageTemplateProps) {
  const { locale } = useThemeLocale();
  const primary = getSubPageContent(path, locale);
  if (!primary) {
    return null;
  }

  return (
    <div className={clsx("pb-16", {
      "font-maru-semi": locale === "ko",
      "font-source-semi": locale === "en"
    })}>
      <SubPageHero
        title={primary.title}
        description={primary.description}
        imageSrc={primary.imageSrc}
        imageAlt={primary.imageAlt}
      />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4">
        <p className="leading-relaxed text-secondary/80">
          {primary.copy ?? primary.description}
        </p>
      </div>
    </div>
  );
}
