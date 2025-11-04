"use client";

import HomeCarousel from "@/components/HomeCarousel";
import { HomeIntroSection } from "@/components/HomeIntroSection";
import LogoLoop from "@/components/LogoLoop";
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
      event.preventDefault();
      if (isAnimatingRef.current) return;

      const order = sectionOrderRef.current;
      if (order.length === 0) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.min(
        Math.max(0, currentIndexRef.current + direction),
        order.length - 1,
      );
      if (nextIndex === currentIndexRef.current) return;

      const targetId = order[nextIndex];
      const targetNode = targetId ? sectionRefs.current[targetId] : null;
      if (!targetNode) return;

      const targetOffset =
        targetNode.getBoundingClientRect().top + window.scrollY;
      isAnimatingRef.current = true;
      animationRef.current?.stop();
      animationRef.current = animate(window.scrollY, targetOffset, {
        duration: 0.9,
        ease: [0.16, 0.84, 0.44, 1],
        onUpdate: (value) => {
          window.scrollTo({ top: value, behavior: "auto" });
        },
        onComplete: () => {
          currentIndexRef.current = nextIndex;
          isAnimatingRef.current = false;
        },
        onStop: () => {
          isAnimatingRef.current = false;
        },
      });
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
      <main className="flex flex-col items-center w-full">
        <section
          id="hero"
          ref={(node) => registerSection("hero", node)}
          className="w-full "
        >
          <HomeCarousel />
        </section>

        <HomeIntroSection onSectionMount={registerSection} />

        <section
          id="highlight"
          ref={(node) => registerSection("highlight", node)}
          className="flex w-full items-center justify-center bg-background px-8 py-12"
          style={{ minHeight: "80vh" }}
        >
          <div className="flex h-full w-full max-w-6xl flex-col items-center justify-center rounded-3xl border border-dashed border-primary/30 bg-background/90 p-8 text-center text-secondary shadow-sm">
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              {locale === "ko" ? "섹션 플레이스홀더" : "Section Placeholder"}
            </span>
            <h2 className="mt-6 text-3xl font-semibold md:text-4xl">
              {locale === "ko"
                ? "곧 콘텐츠가 들어갈 영역입니다."
                : "Future content will live here."}
            </h2>
            <p className="mt-4 max-w-2xl text-base text-secondary/70 md:text-lg">
              {locale === "ko"
                ? "필요한 정보를 알려주시면 이 섹션을 완성해 드릴게요."
                : "Share the details when ready, and we’ll craft this section to match."}
            </p>
          </div>
        </section>

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
