import { LocaleShell } from "@/components/LocaleShell";
import { GlobalPageLoader } from "@/components/common/GlobalPageLoader";
import { PageLoadProvider } from "@/components/common/PageLoadContext";
import type { Locale } from "@/components/header/types";
import { cookies } from "next/headers";
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
  const themeCookie = (await cookies()).get("theme");
  const theme =
    themeCookie && (themeCookie.value === "dark" || themeCookie.value === "light")
      ? themeCookie.value
      : "light";

  return (
    <PageLoadProvider>
        <LocaleShell locale={locale} theme={theme}>
            {children}
        </LocaleShell>
        <GlobalPageLoader />
    </PageLoadProvider>
  );
}
