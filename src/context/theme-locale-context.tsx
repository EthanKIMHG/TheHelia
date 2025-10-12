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
const THEME_COOKIE_KEY = "theme";
const LOCALE_STORAGE_KEY = "locale";

const resolveInitialTheme = (fallback: ThemeMode = "light"): ThemeMode => {
  if (typeof window === "undefined") return fallback;

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

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
  initialTheme = "light",
}: ThemeLocaleProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(initialTheme);
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
    if (typeof window === "undefined") return;
    const stored = resolveInitialTheme(initialTheme);
    if (stored !== theme) {
      setThemeState(stored);
    }
  }, [initialTheme, theme]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
      document.cookie = `${THEME_COOKIE_KEY}=${theme}; path=/; max-age=31536000`;
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
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setTheme = useCallback((value: ThemeMode) => {
    setThemeState(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(THEME_STORAGE_KEY, value);
      document.cookie = `${THEME_COOKIE_KEY}=${value}; path=/; max-age=31536000`;
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const next = current === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
        document.cookie = `${THEME_COOKIE_KEY}=${next}; path=/; max-age=31536000`;
      }
      return next;
    });
  }, []);

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

export function useOptionalThemeLocale() {
  return useContext(ThemeLocaleContext);
}
