import { notFound } from "next/navigation";

import { getSubPageContent } from "@/components/header/nav-data";
import type { Locale } from "@/components/header/types";
import { SubPageTemplate } from "@/components/SubPageTemplate";

type LocaleSlugPageProps = {
  params: Promise<{
    locale: string;
    slug: string[];
  }>;
};

export default async function LocaleSlugPage({ params }: LocaleSlugPageProps) {

  const { locale, slug } = await params;
  const normalizedLocale: Locale = locale === "en" ? "en" : "ko";
  
  const segments = Array.isArray(slug) ? slug : [];
  const path = `/${segments.join("/")}`;

  // If it's not a known path in our CMS/Nav data, 404
  if (!getSubPageContent(path, normalizedLocale)) {
    notFound();
  }

  // If we are here, it means we found metadata for the path, but no specific page.tsx caught it.
  // This serves as a generic fallback template for simple content pages if any.
  // Currently all known complex pages like Reservation, Rooms, etc have their own page.tsx.
  // We render a generic placeholder or empty template.
  
  return (
    <SubPageTemplate path={path} localeOverride={normalizedLocale}>
       {/* Future generic content or empty */}
    </SubPageTemplate>
  );
}
