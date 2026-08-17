"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MotionConfig } from "framer-motion";

type ThemeMode = "light" | "dark";
type SupportedLocale = "ko" | "en";

type ThemeLocaleContextValue = {
  theme: "light";
  locale: SupportedLocale;
  setLocale: (value: SupportedLocale) => void;
  toggleLocale: () => void;
};

const ThemeLocaleContext = createContext<ThemeLocaleContextValue | undefined>(
  undefined,
);

const THEME_STORAGE_KEY = "theme";
const THEME_COOKIE_KEY = "theme";
const LOCALE_STORAGE_KEY = "locale";

const resolveInitialLocale = (preferred: SupportedLocale): SupportedLocale => {
  if (typeof window === "undefined") return preferred;

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === "ko" || stored === "en") {
    if (stored === preferred) {
      return stored;
    }
    window.localStorage.setItem(LOCALE_STORAGE_KEY, preferred);
    return preferred;
  }

  window.localStorage.setItem(LOCALE_STORAGE_KEY, preferred);
  return preferred;
};

type ThemeLocaleProviderProps = {
  children: ReactNode;
  initialLocale?: SupportedLocale;
  initialTheme?: ThemeMode;
};

export function ThemeLocaleProvider({
  children,
  initialLocale = "ko",
}: ThemeLocaleProviderProps) {
  const [locale, setLocaleState] = useState<SupportedLocale>(() =>
    resolveInitialLocale(initialLocale),
  );

  useEffect(() => {
    setLocaleState(initialLocale);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, initialLocale);
    }
  }, [initialLocale]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", "light");
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, "light");
      document.cookie = `${THEME_COOKIE_KEY}=light; path=/; max-age=31536000`;
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    }
  }, [locale]);

  const setLocale = useCallback((value: SupportedLocale) => {
    setLocaleState(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, value);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((current) => {
      const next = current === "ko" ? "en" : "ko";
      if (typeof window !== "undefined") {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
      }
      return next;
    });
  }, []);

  const value = useMemo<ThemeLocaleContextValue>(
    () => ({
      theme: "light",
      locale,
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale],
  );

  return (
    <ThemeLocaleContext.Provider value={value}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeLocaleContext.Provider>
  );
}

export function useThemeLocale() {
  const context = useContext(ThemeLocaleContext);
  if (!context) {
    throw new Error("useThemeLocale must be used within ThemeLocaleProvider");
  }
  return context;
}

export function useOptionalThemeLocale() {
  return useContext(ThemeLocaleContext);
}
