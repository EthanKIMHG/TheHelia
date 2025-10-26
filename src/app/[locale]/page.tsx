"use client";

import { useEffect, useMemo, useRef } from "react";
import clsx from "clsx";
import HomeCarousel from "@/components/HomeCarousel";
import LogoLoop from "@/components/LogoLoop";
import { HomeIntroSection } from "@/components/HomeIntroSection";
import { useThemeLocale } from "@/context/theme-locale-context";
const co_op_logos = [
  { src: '/img/logo/BodyFriend.png', alt: 'Bodyfriend' },
  { src: '/img/logo/LaCloud.png', alt: 'La Cloud' },
  { src: '/img/logo/LGElectronics.png', alt: 'LG Electronics' },
  { src: '/img/logo/Medela.png', alt: 'Medela' },
  { src: '/img/logo/MoltonBrown.png', alt: 'Molton Brown' },
  { src: '/img/logo/Philips.png', alt: 'Philips' },
  { src: '/img/logo/Dyson.png', alt: 'Dyson' },
  { src: '/img/logo/JellyView.png', alt: 'Jelly View' },
  { src: '/img/logo/Libero.png', alt: 'Libero' },
] as const;

export default function LocaleHomePage() {
  const { locale } = useThemeLocale();
  const sectionIds = useMemo(
    () => ["hero", "intro", "intro2", "partners"] as const,
    [],
  );
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 1024) return;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 20) return;
      event.preventDefault();
      if (isAnimatingRef.current) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.min(
        Math.max(0, currentIndexRef.current + direction),
        sectionIds.length - 1,
      );
      if (nextIndex === currentIndexRef.current) return;

      const target = sectionRefs.current[sectionIds[nextIndex]];
      if (!target) return;

      isAnimatingRef.current = true;
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      currentIndexRef.current = nextIndex;

      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 900);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [sectionIds]);

  const setSectionRef = (id: string) => (node: HTMLElement | null) => {
    sectionRefs.current[id] = node;
  };

  return (
    <div
      className={clsx(
        "font- min-h-screen scroll-smooth",
        locale === "ko" ? "font-maru-semi" : "font-source-semi",
      )}
    >
      <main className="flex flex-col items-center w-full">
        <section id="hero" ref={setSectionRef("hero")} className="w-full">
          <HomeCarousel />
        </section>

        <HomeIntroSection onSectionMount={setSectionRef} />

        <section id="partners" ref={setSectionRef("partners")} className="w-full py-12">
          <div className="px-12 py-12">
            <span className="text-4xl">
              {locale === "ko" ? "더 헬리아와 함께하는 기업들" : "Our Partners"}
            </span>
          </div>
          <LogoLoop
            logos={co_op_logos}
            speed={80}
            direction="left"
            logoHeight={40}
            gap={48}
            pauseOnHover
            scaleOnHover
            ariaLabel="cooperation logos"
            className="bg-white"
          />
        </section>
      </main>
    </div>
  );
}
