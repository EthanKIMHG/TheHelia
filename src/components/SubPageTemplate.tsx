"use client";

import { ReactNode } from "react";
import { useThemeLocale } from "@/context/theme-locale-context";
import { SubPageHero } from "./SubPageHero";
import { getMainPageContent, getSubPageContent } from "./header/nav-data";

interface SubPageTemplateProps {
  path: string;
  children?: ReactNode;
}

export function SubPageTemplate({ path, children }: SubPageTemplateProps) {
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
    <div className="pb-12 ">
      <SubPageHero
        title={main?.title ?? primary.title}
        imageSrc={main?.imageSrc ?? primary.imageSrc}
        imageAlt={main?.imageAlt ?? primary.imageAlt}
      />

      <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 pt-12 text-secondary ">
        <div className="text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">
            {primary.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-secondary/80 md:text-lg">
            {primary.copy ?? primary.description}
          </p>
          
        </div>

        {children ? (
          <div className=" w-full max-w-5xl rounded-xl backdrop-blur ">
            {children}
          </div>
        ) : null}
      </section>
    </div>
  );
}
