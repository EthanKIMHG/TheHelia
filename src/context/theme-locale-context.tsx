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

type ThemeMode = "light" | "dark";
type SupportedLocale = "ko" | "en";

type ThemeLocaleContextValue = {
  theme: ThemeMode;
  locale: SupportedLocale;
  setTheme: (value: ThemeMode) => void;
  setLocale: (value: SupportedLocale) => void;
  toggleTheme: () => void;
  toggleLocale: () => void;
};

const ThemeLocaleContext = createContext<ThemeLocaleContextValue | undefined>(
  undefined,
);

const THEME_STORAGE_KEY = "theme";
const LOCALE_STORAGE_KEY = "locale";

const resolveInitialTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const resolveInitialLocale = (): SupportedLocale => {
  if (typeof window === "undefined") return "ko";

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return stored === "en" ? "en" : "ko";
};

export function ThemeLocaleProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => resolveInitialTheme());
  const [locale, setLocaleState] = useState<SupportedLocale>(() =>
    resolveInitialLocale(),
  );

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale;
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    }
  }, [locale]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = (event: StorageEvent) => {
      if (event.storageArea !== window.localStorage) return;
      if (event.key === THEME_STORAGE_KEY) {
        if (event.newValue === "light" || event.newValue === "dark") {
          setThemeState(event.newValue);
        }
      }
      if (event.key === LOCALE_STORAGE_KEY) {
        if (event.newValue === "ko" || event.newValue === "en") {
          setLocaleState(event.newValue);
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setTheme = useCallback((value: ThemeMode) => {
    setThemeState(value);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const setLocale = useCallback((value: SupportedLocale) => {
    setLocaleState(value);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((current) => (current === "ko" ? "en" : "ko"));
  }, []);

  const value = useMemo<ThemeLocaleContextValue>(
    () => ({
      theme,
      locale,
      setTheme,
      setLocale,
      toggleTheme,
      toggleLocale,
    }),
    [locale, setLocale, setTheme, theme, toggleLocale, toggleTheme],
  );

  return (
    <ThemeLocaleContext.Provider value={value}>
      {children}
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
