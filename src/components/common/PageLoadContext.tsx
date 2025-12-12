"use client";


import {
  createContext, useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";

type PageLoadContextType = {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setCriticalImageLoading: (loading: boolean) => void;
  setNavigationPending: (pending: boolean) => void;
};

const PageLoadContext = createContext<PageLoadContextType | undefined>(undefined);

export function PageLoadProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCriticalImageLoading, setIsCriticalImageLoading] = useState(false);
  const [isNavigationPending, setIsNavigationPending] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  // Trigger loading state handling
  useEffect(() => {
    if (isLoading) {
       // Reset minute time elapsed when loading starts
       setMinTimeElapsed(false);
       
       const minLoadTime = 800; // Increased feel
       const timer = setTimeout(() => {
           setMinTimeElapsed(true);
       }, minLoadTime);
       
       return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Main Dismiss Logic
  useEffect(() => {
      // Only dismiss if:
      // 1. Loading is active
      // 2. Minimum time has passed
      // 3. No navigation is pending (router has finished)
      // 4. No critical image is loading
      if (isLoading && minTimeElapsed && !isNavigationPending && !isCriticalImageLoading) {
          setIsLoading(false);
      }
  }, [isLoading, minTimeElapsed, isNavigationPending, isCriticalImageLoading]);

  // Special safety timeout
  useEffect(() => {
    if (isLoading) { // Use isLoading as the trigger, covering navigation hangs too
        const safety = setTimeout(() => {
            setIsLoading(false);
            setIsCriticalImageLoading(false); 
            setIsNavigationPending(false);
        }, 5000); // 5s safety
        return () => clearTimeout(safety);
    }
  }, [isLoading]);

  return (
    <PageLoadContext.Provider
      value={{
        isLoading,
        setIsLoading,
        setCriticalImageLoading: setIsCriticalImageLoading,
        setNavigationPending: setIsNavigationPending,
      }}
    >
      {children}
    </PageLoadContext.Provider>
  );
}

export function usePageLoad() {
  const context = useContext(PageLoadContext);
  if (context === undefined) {
    throw new Error("usePageLoad must be used within a PageLoadProvider");
  }
  return context;
}
