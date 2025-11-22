"use client";

import type { Locale } from "@/components/header/types";
import { CinematicHero } from "@/components/home/CinematicHero";
import { HomeIntroView } from "@/components/home/HomeIntroView";
import { HomeNavigationGallery } from "@/components/home/HomeNavigationGallery";
import PartnerLogoMarquee from "@/components/home/PartnerLogoMarquee";
import { useThemeLocale } from "@/context/theme-locale-context";
import clsx from "clsx";
import { animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
];

export default function LocaleHomePage() {
  const { locale } = useThemeLocale();
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const sectionOrderRef = useRef<string[]>([]);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    updateDesktop();
    window.addEventListener("resize", updateDesktop);
    return () => window.removeEventListener("resize", updateDesktop);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isDesktop) return;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 20) return;
      // Lenis handles smooth scrolling, so we might not need manual scroll jacking anymore.
      // However, if "snap" effect is desired, we can keep it.
      // For "Warmth & Breath", natural scroll is usually better than forced snap.
      // Let's disable the snap for now to test Lenis fully.
      return; 
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      animationRef.current?.stop();
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isDesktop]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncIndexWithScroll = () => {
      if (isAnimatingRef.current) return;
      const order = sectionOrderRef.current;
      if (order.length === 0) return;
      const scrollY = window.scrollY;
      let closestIndex = 0;
      let smallestDelta = Number.POSITIVE_INFINITY;

      order.forEach((id, index) => {
        const node = sectionRefs.current[id];
        if (!node) return;
        const nodeTop = node.getBoundingClientRect().top + window.scrollY;
        const delta = Math.abs(scrollY - nodeTop);
        if (delta < smallestDelta) {
          smallestDelta = delta;
          closestIndex = index;
        }
      });

      currentIndexRef.current = closestIndex;
    };

    window.addEventListener("scroll", syncIndexWithScroll, { passive: true });
    return () => window.removeEventListener("scroll", syncIndexWithScroll);
  }, []);

  const registerSection = (id: string, node: HTMLElement | null) => {
    if (node) {
      sectionRefs.current[id] = node;
      if (!sectionOrderRef.current.includes(id)) {
        sectionOrderRef.current.push(id);
      }
    } else {
      sectionRefs.current[id] = null;
    }
  };

  return (
    <div
      className={clsx(
        "font- min-h-screen",
        locale === "ko" ? "font-maru-semi" : "font-source-semi",
      )}
    >
      <main className="flex w-full flex-col items-center overflow-x-hidden">
        <section
          id="hero"
          ref={(node) => registerSection("hero", node)}
          className="w-full"
        >
          <CinematicHero locale={locale} />
        </section>
        

        <HomeIntroView onSectionMount={registerSection} />

        <HomeNavigationGallery
          locale={locale as Locale}
          sectionId="highlight"
          onSectionMount={(node) => registerSection("highlight", node)}
        />

        <section
          id="partners"
          ref={(node) => registerSection("partners", node)}
          className="w-full py-12"
        >
          <div className="px-12 py-12">
            <span className="text-4xl">
              {locale === "ko" ? "더 헬리아와 함께하는 기업들" : "Our Partners"}
            </span>
          </div>
          <PartnerLogoMarquee
            logos={co_op_logos}
            speed={80}
            direction="left"
            logoHeight={40}
            gap={48}
            pauseOnHover
            scaleOnHover
            ariaLabel="cooperation logos"
            className="bg-[#f5eee7]"
          />
        </section>
      </main>
    </div>
  );
}
