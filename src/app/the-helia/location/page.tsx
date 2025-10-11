"use client";

import { useThemeLocale } from "@/context/theme-locale-context";
import { SubPageTemplate } from "@/components/SubPageTemplate";
import { LocationPageShowcase } from "./LocationPageShowcase";

export default function HeliaLocationPage() {
  const { locale } = useThemeLocale();
  return (
    <SubPageTemplate path="/the-helia/location" localeOverride={locale}>
      <LocationPageShowcase locale={locale} />
    </SubPageTemplate>
  );
}
