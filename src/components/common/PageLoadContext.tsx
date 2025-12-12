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
};

const PageLoadContext = createContext<PageLoadContextType | undefined>(undefined);

export function PageLoadProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCriticalImageLoading, setIsCriticalImageLoading] = useState(false);
  

  // Trigger loading state handling
  useEffect(() => {
    if (isLoading) {
       // Minimum load time + Critical Image check
       const minLoadTime = 800;
       const timer = setTimeout(() => {
           // We only turn off if no critical image is pending
           // If critical image is pending, we wait for it (handled by effect below)
           if (!isCriticalImageLoading) {
               setIsLoading(false);
           }
       }, minLoadTime);
       
       return () => clearTimeout(timer);
    }
  }, [isLoading, isCriticalImageLoading]);

  // Special safety timeout for critical images
  useEffect(() => {
    if (isCriticalImageLoading) {
        // Force disable loading after max 4 seconds to prevent hanging
        const safety = setTimeout(() => {
            setIsLoading(false);
            setIsCriticalImageLoading(false); 
        }, 4000);
        return () => clearTimeout(safety);
    }
  }, [isCriticalImageLoading]);


  return (
    <PageLoadContext.Provider
      value={{
        isLoading,
        setIsLoading,
        setCriticalImageLoading: setIsCriticalImageLoading,
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
