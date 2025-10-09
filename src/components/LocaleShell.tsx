"use client";

import clsx from "clsx";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import { Footer } from "@/components/Footer";
import { ThemeLocaleProvider } from "@/context/theme-locale-context";
import type { Locale } from "./header/types";

interface LocaleShellProps {
  locale: Locale;
  theme: "light" | "dark";
  children: React.ReactNode;
}

export function LocaleShell({ locale, theme, children }: LocaleShellProps) {
  const fontClass = locale === "ko" ? "font-maru-semi" : "font-source-semi";

  return (
    <ThemeLocaleProvider initialLocale={locale} initialTheme={theme}>
      <Header />
      <main
        className={clsx(
          "min-h-[calc(100dvh-4rem)] w-full transition-colors",
          fontClass,
        )}
      >
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </ThemeLocaleProvider>
  );
}
