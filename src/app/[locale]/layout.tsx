import { LocaleShell } from "@/components/LocaleShell";
import type { Locale } from "@/components/header/types";
import { notFound } from "next/navigation";

const SUPPORTED_LOCALES: Locale[] = ["ko", "en"];

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params;
  if (!SUPPORTED_LOCALES.includes(localeParam as Locale)) {
    notFound();
  }

  const locale = localeParam as Locale;

  return <LocaleShell locale={locale}>{children}</LocaleShell>;
}
