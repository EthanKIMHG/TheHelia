"use client";

import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import { ThemeLocaleProvider } from "@/context/theme-locale-context";
import type { Locale } from "./header/types";

interface LocaleShellProps {
  locale: Locale;
  children: React.ReactNode;
}

export function LocaleShell({ locale, children }: LocaleShellProps) {
  return (
    <ThemeLocaleProvider initialLocale={locale}>
      <Header />
      <main className="min-h-[calc(100dvh-4rem)] w-full">
        <PageTransition>{children}</PageTransition>
      </main>
      <footer className="border-t border-[color:rgb(0,0,0,0.06)] py-8">
        <div className="mx-auto max-w-6xl px-4 text-sm text-secondary">
          © {new Date().getFullYear()} 더헬리아 산후조리원
        </div>
      </footer>
    </ThemeLocaleProvider>
  );
}
