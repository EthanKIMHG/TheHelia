import { notFound } from "next/navigation";

import { SubPageTemplate } from "@/components/SubPageTemplate";
import { getSubPageContent } from "@/components/header/nav-data";
import type { Locale } from "@/components/header/types";
import type { ComponentType } from "react";
import { LocationPageShowcase } from "@/app/the-helia/location/LocationPageShowcase";

type LocaleSlugPageProps = {
  params: Promise<{
    locale: string;
    slug: string[];
  }>;
};

const CUSTOM_CONTENT: Record<string, ComponentType<{ locale: Locale }>> = {
  "/the-helia/location": LocationPageShowcase,
};

export default async function LocaleSlugPage({ params }: LocaleSlugPageProps) {
  const { locale, slug } = await params;
  const normalizedLocale: Locale = locale === "en" ? "en" : "ko";
  
  const segments = Array.isArray(slug) ? slug : [];
  const path = `/${segments.join("/")}`;

  if (!getSubPageContent(path, normalizedLocale)) {
    notFound();
  }

  const Content = CUSTOM_CONTENT[path];

  return (
    <SubPageTemplate path={path} localeOverride={normalizedLocale}>
      {Content ? <Content locale={normalizedLocale} /> : null}
    </SubPageTemplate>
  );
}
