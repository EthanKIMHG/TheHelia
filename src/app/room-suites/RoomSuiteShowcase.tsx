"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Baby,
  BedDouble,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  CupSoda,
  Droplets,
  Fan,
  Heart,
  LaptopMinimal,
  Lamp,
  Sofa,
  Sparkles,
  Wifi,
} from "lucide-react";
import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import type { Locale } from "@/components/header/types";

type SuiteId = "prestige" | "vvip" | "vip";

type SuiteCopy = ReturnType<typeof getSuiteCopy>;

type RoomSuiteShowcaseProps = {
  suiteId: SuiteId;
  locale?: Locale;
};

export function RoomSuiteShowcase({ suiteId, locale }: RoomSuiteShowcaseProps) {
  const context = useOptionalThemeLocale();
  const activeLocale = locale ?? context?.locale ?? "ko";
  const copy = useMemo(
    () => getSuiteCopy(activeLocale, suiteId),
    [activeLocale, suiteId],
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentImage = copy.carousel[currentIndex] ?? copy.carousel[0];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? copy.carousel.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === copy.carousel.length - 1 ? 0 : prev + 1,
    );
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="space-y-14">
      <section className="rounded-3xl border border-border/30 bg-background/95 p-6 shadow md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              {copy.carouselBadge}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl">
              {copy.carouselTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70 md:text-base">
              {copy.carouselDescription}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/40 bg-background/80 text-foreground transition hover:bg-primary/10"
              aria-label={copy.prevLabel}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/40 bg-background/80 text-foreground transition hover:bg-primary/10"
              aria-label={copy.nextLabel}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="mt-6 overflow-hidden rounded-3xl border border-border/30">
          <div className="relative h-64 w-full md:h-[420px]">
            <Image
              key={currentImage.src}
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              sizes="(min-width: 768px) 70vw, 100vw"
              className=""
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 text-sm text-background/90">
              {currentImage.caption}
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {copy.carousel.map((image, index) => (
            <button
              key={image.src + index}
              type="button"
              onClick={() => goToIndex(index)}
              className={`relative h-16 w-24 overflow-hidden rounded-xl border transition ${
                currentIndex === index
                  ? "border-primary shadow"
                  : "border-border/40 opacity-75 hover:opacity-100"
              }`}
              aria-label={`${copy.thumbnailLabel} ${index + 1}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          {copy.featureGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-3xl border border-border/30 bg-background/95 p-6 shadow-sm"
            >
              <h4 className="text-lg font-semibold text-foreground">
                {group.title}
              </h4>
              <ul className="mt-4 grid gap-3 text-sm text-foreground/70 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <aside className="flex flex-col gap-4 rounded-3xl border border-border/30 bg-background/90 p-6 shadow-sm">
          <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            {copy.facts.badge}
          </h4>
          <ul className="space-y-4">
            {copy.facts.items.map((fact) => (
              <li key={fact.title} className="flex items-start gap-3 text-sm">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <fact.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {fact.title}
                  </p>
                  <p className="text-xs text-foreground/60">{fact.detail}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-auto rounded-2xl border border-primary/30 bg-primary/5 p-4 text-sm text-foreground/70">
            {copy.facts.note}
          </div>
        </aside>
      </section>

      <AmenitiesSection copy={copy.amenities} />
    </div>
  );
}

function AmenitiesSection({ copy }: { copy: SuiteCopy["amenities"] }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-border/30 bg-gradient-to-br from-primary/5 via-primary/5 to-background/95 shadow">
      <div className="space-y-6 p-8 md:p-12">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            {copy.badge}
          </p>
          <h3 className="text-2xl font-semibold text-foreground md:text-3xl">
            {copy.title}
          </h3>
          <p className="text-sm text-foreground/70 md:text-base">
            {copy.subtitle}
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          {copy.groups.map((group) => (
            <article
              key={group.title}
              className="rounded-2xl border border-border/30 bg-background/95 p-6 shadow-sm"
            >
              <h4 className="text-lg font-semibold text-foreground">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-2 text-sm text-foreground/70">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Heart className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="text-xs text-foreground/60">{copy.notice}</p>
      </div>
    </section>
  );
}

function getSuiteCopy(locale: Locale, suiteId: SuiteId) {
  const isKo = locale === "ko";

  const suiteMap = SUITE_CONTENT[suiteId];
  const localized = suiteMap[locale] ?? suiteMap["ko"];

  return {
    hero: {
      ...localized.hero,
      highlights: localized.hero.highlights ?? [],
    },
    carousel: localized.carousel ?? [],
    carouselBadge: localized.carouselBadge,
    carouselTitle: localized.carouselTitle,
    carouselDescription: localized.carouselDescription,
    thumbnailLabel: localized.thumbnailLabel,
    prevLabel: localized.prevLabel,
    nextLabel: localized.nextLabel,
    featureGroups: localized.featureGroups ?? [],
    facts: {
      ...localized.facts,
      items: localized.facts.items ?? [],
    },
    amenities: localized.amenities,
  };
}

const SUITE_CONTENT: Record<
  SuiteId,
  Record<
    Locale,
    {
      name: string;
      hero: {
        badge: string;
        title: string;
        subtitle: string;
        highlights: Array<{ title: string; value: string; note: string }>;
      };
      carouselBadge: string;
      carouselTitle: string;
      carouselDescription: string;
      thumbnailLabel: string;
      prevLabel: string;
      nextLabel: string;
      carousel: Array<{ src: string; alt: string; caption: string }>;
      featureGroups: Array<{ title: string; items: string[] }>;
      facts: {
        badge: string;
        note: string;
        items: Array<{
          title: string;
          detail: string;
          icon: typeof BedDouble;
        }>;
      };
      amenities: {
        badge: string;
        title: string;
        subtitle: string;
        notice: string;
        groups: Array<{ title: string; items: string[] }>;
      };
    }
  >
> = {
  prestige: {
    ko: {
      name: "PRESTIGE",
      hero: {
        badge: "PRESTIGE SUITE",
        title: "프레스티지 스위트에서 누리는 가장 넓은 프라이빗 라운지",
        subtitle:
          "40㎡ 투룸 구성으로 설계된 프레스티지 스위트는 산모와 가족이 함께 머물기 충분한 여유를 제공합니다. 모션 베드, 아기 케어, 웰니스 설비까지 모든 순간을 위한 디테일을 담았습니다.",
        highlights: [
          {
            title: "객실 크기",
            value: "약 12평 / 40㎡",
            note: "투룸 구조, 여유로운 라운지와 슬립 존",
          },
          {
            title: "베드 & 침구",
            value: "La Cloud 모션 베드 (2)",
            note: "헝가리산 구스 침구 세트",
          },
          {
            title: "프리미엄 설비",
            value: "LG 스탠바이미 · Dyson 라인업",
            note: "네스프레소 & 정수기 상시 구비",
          },
        ],
      },
      carouselBadge: "ROOM GALLERY",
      carouselTitle: "프레스티지 스위트 미리보기",
      carouselDescription:
        "투룸 구조의 넉넉한 휴식 공간과 맞춤형 케어 설비를 3D 투어처럼 살펴보세요.",
      thumbnailLabel: "프레스티지 이미지",
      prevLabel: "이전 이미지",
      nextLabel: "다음 이미지",
      carousel: [
        {
          src: "/img/room/prestige.jpg",
          alt: "프레스티지 스위트 전경",
          caption: "투룸 구조로 구분된 라운지와 휴식 공간",
        },
        {
          src: "/img/room/prestige2.jpg",
          alt: "프레스티지 스위트 라운지",
          caption: "가족이 함께하는 라운지 존",
        },
        {
          src: "/img/room/prestige3.jpg",
          alt: "프레스티지 스위트 침실",
          caption: "모션 베드와 구스 침구로 완성한 심플한 휴식",
        },
        {
          src: "/img/room/prestige4.jpg",
          alt: "프레스티지 스위트 침실",
          caption: "모션 베드와 구스 침구로 완성한 심플한 휴식",
        },
        {
          src: "/img/room/prestige5.jpg",
          alt: "프레스티지 스위트 침실",
          caption: "모션 베드와 구스 침구로 완성한 심플한 휴식",
        },
        {
          src: "/img/room/prestige6.jpg",
          alt: "프레스티지 스위트 침실",
          caption: "모션 베드와 구스 침구로 완성한 심플한 휴식",
        },
        {
          src: "/img/room/prestige7.jpg",
          alt: "프레스티지 스위트 침실",
          caption: "모션 베드와 구스 침구로 완성한 심플한 휴식",
        },
        {
          src: "/img/room/prestige8.jpg",
          alt: "프레스티지 스위트 침실",
          caption: "모션 베드와 구스 침구로 완성한 심플한 휴식",
        },
      ],
      featureGroups: [
        {
          title: "객실 구성",
          items: [
            "12평(40㎡) 투룸 구성",
            "La Cloud 슈퍼 싱글 모션 베드 2대",
            "헝가리산 구스 침구 세트",
            "스토케 아기 침대",
          ],
        },
        {
          title: "웰니스 & 케어",
          items: [
            "AMIGO 안마의자",
            "메델라 심포니 유축기",
            "좌욕기 & 비데",
            "Dyson 에어랩 멀티 스타일러",
          ],
        },
        {
          title: "엔터테인먼트 & 공조",
          items: [
            "LG UHD TV",
            "LG 스탠바이미",
            "Dyson 공기청정기",
            "Philips 공기 살균기",
          ],
        },
        {
          title: "스낵 & 편의",
          items: [
            "네스프레소 머신",
            "냉 · 온 정수기",
            "LG 스타일러",
            "프라이빗 미니바",
          ],
        },
      ],
      facts: {
        badge: "FAST FACTS",
        note: "프레스티지 스위트는 사전 예약제로 운영됩니다.",
        items: [
          {
            icon: BedDouble,
            title: "Room Type",
            detail: "12평 투룸 · 라운지 + 슬립 존",
          },
          {
            icon: CalendarClock,
            title: "Stay Rhythm",
            detail: "전담 케어팀이 24시간 상주",
          },
          {
            icon: Sparkles,
            title: "Signature Touch",
            detail: "Dyson & LG 하이엔드 디바이스 풀 패키지",
          },
          {
            icon: Sofa,
            title: "Family Lounge",
            detail: "가족 동반을 위한 독립 라운지 공간",
          },
          {
            icon: CupSoda,
            title: "Refreshments",
            detail: "네스프레소 & 냉·온 정수기 상시 구비",
          },
          {
            icon: Wifi,
            title: "Connectivity",
            detail: "전 객실 고속 Wi-Fi & 스탠바이미 스트리밍",
          },
        ],
      },
      amenities: buildAmenityCopy("ko"),
    },
    en: {
      name: "PRESTIGE",
      hero: {
        badge: "PRESTIGE SUITE",
        title: "Expansive Private Prestige Suite",
        subtitle:
          "Designed as a 40㎡ two-room residence, the Prestige Suite offers generous space for mothers and family members, with motion beds, baby care, and wellness equipment ready for every moment.",
        highlights: [
          {
            title: "Suite Size",
            value: "Approx. 40㎡ Two-Room",
            note: "Separate lounge and sleep zones for comfort",
          },
          {
            title: "Beds & Bedding",
            value: "Two La Cloud Motion Beds",
            note: "Hungarian goose down bedding set",
          },
          {
            title: "Premium Setup",
            value: "LG StanbyME · Dyson lineup",
            note: "Nespresso brewer & water purifier included",
          },
        ],
      },
      carouselBadge: "ROOM GALLERY",
      carouselTitle: "Preview the Prestige Suite",
      carouselDescription:
        "Explore the spacious layout and curated amenities through a gallery that feels like a 3D walkthrough.",
      thumbnailLabel: "Prestige image",
      prevLabel: "Previous image",
      nextLabel: "Next image",
      carousel: [
        {
          src: "/img/room/prestige.jpg",
          alt: "프레스티지 스위트 전경",
          caption: "투룸 구조로 구분된 라운지와 휴식 공간",
        },
        {
          src: "/img/room/prestige2.jpg",
          alt: "프레스티지 스위트 라운지",
          caption: "가족이 함께하는 라운지 존",
        },
        {
          src: "/img/room/prestige3.jpg",
          alt: "프레스티지 스위트 침실",
          caption: "모션 베드와 구스 침구로 완성한 심플한 휴식",
        },
        {
          src: "/img/room/prestige4.jpg",
          alt: "프레스티지 스위트 침실",
          caption: "모션 베드와 구스 침구로 완성한 심플한 휴식",
        },
        {
          src: "/img/room/prestige5.jpg",
          alt: "프레스티지 스위트 침실",
          caption: "모션 베드와 구스 침구로 완성한 심플한 휴식",
        },
        {
          src: "/img/room/prestige6.jpg",
          alt: "프레스티지 스위트 침실",
          caption: "모션 베드와 구스 침구로 완성한 심플한 휴식",
        },
        {
          src: "/img/room/prestige7.jpg",
          alt: "프레스티지 스위트 침실",
          caption: "모션 베드와 구스 침구로 완성한 심플한 휴식",
        },
        {
          src: "/img/room/prestige8.jpg",
          alt: "프레스티지 스위트 침실",
          caption: "모션 베드와 구스 침구로 완성한 심플한 휴식",
        },
      ],
      featureGroups: [
        {
          title: "Room Composition",
          items: [
            "Approx. 40㎡ two-room layout",
            "Two La Cloud motion beds",
            "Hungarian goose down bedding",
            "Stokke baby crib",
          ],
        },
        {
          title: "Wellness & Care",
          items: [
            "AMIGO massage chair",
            "Medela Symphony breast pump",
            "Bidet & sitz bath",
            "Dyson Airwrap multi-styler",
          ],
        },
        {
          title: "Entertainment & Air Quality",
          items: [
            "LG UHD TV",
            "LG StanbyME display",
            "Dyson air purifier",
            "Philips air steriliser",
          ],
        },
        {
          title: "In-Room Convenience",
          items: [
            "Nespresso machine",
            "Hot & cold water purifier",
            "LG Styler garment care",
            "Thoughtfully stocked minibar",
          ],
        },
      ],
      facts: {
        badge: "FAST FACTS",
        note: "Prestige Suites are available by advance reservation.",
        items: [
          {
            icon: BedDouble,
            title: "Room Type",
            detail: "Two-room layout with lounge & sleep zone",
          },
          {
            icon: CalendarClock,
            title: "Care Rhythm",
            detail: "24-hour dedicated nursing team",
          },
          {
            icon: Sparkles,
            title: "Signature Touch",
            detail: "Comprehensive Dyson & LG premium devices",
          },
          {
            icon: Sofa,
            title: "Family Lounge",
            detail: "Dedicated lounge space for visiting family",
          },
          {
            icon: CupSoda,
            title: "Refreshments",
            detail: "Nespresso brewer and hot & cold purifier",
          },
          {
            icon: Wifi,
            title: "Connectivity",
            detail: "High-speed Wi-Fi & StanbyME streaming",
          },
        ],
      },
      amenities: buildAmenityCopy("en"),
    },
  },
  vvip: {
    ko: {
      name: "VVIP",
      hero: {
        badge: "VVIP SUITE",
        title: "프라이빗 감각을 갖춘 VVIP 스위트",
        subtitle:
          "33㎡ 규모의 VVIP 스위트는 라운지와 슬립 존이 한 공간에 자연스럽게 이어져, 간결하면서도 프리미엄한 시간을 선사합니다.",
        highlights: [
          {
            title: "객실 크기",
            value: "약 10평 / 33㎡",
            note: "모노 스위트 플로우",
          },
          {
            title: "베드 & 침구",
            value: "La Cloud 퀸 모션 베드",
            note: "친환경 옥수수솜 침구",
          },
          {
            title: "베이비 케어",
            value: "세이지폴 아기 침대",
            note: "메델라 심포니 유축기 포함",
          },
        ],
      },
      carouselBadge: "ROOM GALLERY",
      carouselTitle: "VVIP 스위트 미리보기",
      carouselDescription:
        "간결한 레이아웃과 프리미엄 편의 설비로 완성된 VVIP 룸을 둘러보세요.",
      thumbnailLabel: "VVIP 이미지",
      prevLabel: "이전 이미지",
      nextLabel: "다음 이미지",
      carousel: [
        {
          src: "/img/room/vvip.jpg",
          alt: "VVIP 스위트 전경",
          caption: "프라이빗 라운지와 슬립 존이 자연스럽게 연결된 구조",
        },
        {
          src: "/img/room/vvip2.jpg",
          alt: "VVIP 스위트 전경",
          caption: "프라이빗 라운지와 슬립 존이 자연스럽게 연결된 구조",
        },
        {
          src: "/img/room/vvip3.jpg",
          alt: "VVIP 스위트 전경",
          caption: "프라이빗 라운지와 슬립 존이 자연스럽게 연결된 구조",
        },
        {
          src: "/img/room/vvip4.jpg",
          alt: "VVIP 스위트 전경",
          caption: "프라이빗 라운지와 슬립 존이 자연스럽게 연결된 구조",
        },
        {
          src: "/img/room/vvip5.jpg",
          alt: "VVIP 스위트 전경",
          caption: "프라이빗 라운지와 슬립 존이 자연스럽게 연결된 구조",
        },
      ],
      featureGroups: [
        {
          title: "객실 구성",
          items: [
            "10평(33㎡) 단일 존 구성",
            "La Cloud 퀸 사이즈 모션 베드",
            "친환경 옥수수솜 침구",
            "세이지폴 아기 침대",
          ],
        },
        {
          title: "프리미엄 설비",
          items: [
            "AMIGO 안마의자",
            "메델라 심포니 유축기",
            "LG 스타일러",
            "Dyson 헤어드라이어",
          ],
        },
        {
          title: "공기 & 위생 관리",
          items: [
            "LG 퓨리케어 공기청정기",
            "Philips 공기 살균기",
            "좌욕기 & 비데",
            "손소독 티슈 스테이션",
          ],
        },
        {
          title: "엔터테인먼트 & 편의",
          items: [
            "LG UHD TV",
            "LG 스탠바이미",
            "냉 · 온 정수기",
            "미니 와인 & 티 셋업",
          ],
        },
      ],
      facts: {
        badge: "FAST FACTS",
        note: "VVIP 스위트는 개인 프라이버시에 최적화된 구조입니다.",
        items: [
          {
            icon: BedDouble,
            title: "Room Type",
            detail: "10평 모노 스위트 레이아웃",
          },
          {
            icon: Fan,
            title: "Air Care",
            detail: "LG 퓨리케어 + Philips 살균 시스템",
          },
          {
            icon: Droplets,
            title: "Wellness Touch",
            detail: "좌욕기 · 시그니처 바스 케어",
          },
          {
            icon: Sofa,
            title: "Companion Comfort",
            detail: "AMIGO 안마의자와 파트너 라운지 시트",
          },
          {
            icon: CupSoda,
            title: "Refreshments",
            detail: "정수기와 미니 티·와인 셋업 제공",
          },
        ],
      },
      amenities: buildAmenityCopy("ko"),
    },
    en: {
      name: "VVIP",
      hero: {
        badge: "VVIP SUITE",
        title: "Refined VVIP Suite with Private Flow",
        subtitle:
          "The 33㎡ VVIP suite offers a seamless flow between lounge and sleep zones, delivering a cozy yet premium retreat.",
        highlights: [
          {
            title: "Suite Size",
            value: "Approx. 33㎡",
            note: "Open-concept private suite",
          },
          {
            title: "Beds & Bedding",
            value: "La Cloud Queen Motion Bed",
            note: "Eco-friendly corn fiber bedding",
          },
          {
            title: "Baby Care",
            value: "SeiJiFold baby crib",
            note: "Medela Symphony breast pump",
          },
        ],
      },
      carouselBadge: "ROOM GALLERY",
      carouselTitle: "Preview the VVIP Suite",
      carouselDescription:
        "Take a look at the refined layout and premium amenities curated for the VVIP suite.",
      thumbnailLabel: "VVIP image",
      prevLabel: "Previous image",
      nextLabel: "Next image",
      carousel: [
        {
          src: "/img/room/vvip.jpg",
          alt: "VVIP 스위트 전경",
          caption: "프라이빗 라운지와 슬립 존이 자연스럽게 연결된 구조",
        },
        {
          src: "/img/room/vvip2.jpg",
          alt: "VVIP 스위트 전경",
          caption: "프라이빗 라운지와 슬립 존이 자연스럽게 연결된 구조",
        },
        {
          src: "/img/room/vvip3.jpg",
          alt: "VVIP 스위트 전경",
          caption: "프라이빗 라운지와 슬립 존이 자연스럽게 연결된 구조",
        },
        {
          src: "/img/room/vvip4.jpg",
          alt: "VVIP 스위트 전경",
          caption: "프라이빗 라운지와 슬립 존이 자연스럽게 연결된 구조",
        },
        {
          src: "/img/room/vvip5.jpg",
          alt: "VVIP 스위트 전경",
          caption: "프라이빗 라운지와 슬립 존이 자연스럽게 연결된 구조",
        },
      ],
      featureGroups: [
        {
          title: "Room Composition",
          items: [
            "Approx. 33㎡ single-zone layout",
            "La Cloud queen-size motion bed",
            "Eco-friendly corn fiber bedding",
            "Seiji Fold baby crib",
          ],
        },
        {
          title: "Premium Equipment",
          items: [
            "AMIGO massage chair",
            "Medela Symphony breast pump",
            "LG Styler garment care",
            "Dyson hair dryer",
          ],
        },
        {
          title: "Air & Hygiene",
          items: [
            "LG PuriCare air purifier",
            "Philips air steriliser",
            "Bidet with sitz bath",
            "Sanitising wipes station",
          ],
        },
        {
          title: "Entertainment & Convenience",
          items: [
            "LG UHD TV",
            "LG StanbyME display",
            "Hot & cold water purifier",
            "Mini wine & tea setup",
          ],
        },
      ],
      facts: {
        badge: "FAST FACTS",
        note: "The VVIP suite is optimised for privacy and quiet moments.",
        items: [
          {
            icon: BedDouble,
            title: "Room Type",
            detail: "33㎡ mono suite layout",
          },
          {
            icon: Fan,
            title: "Air Care",
            detail: "LG PuriCare + Philips sterilising system",
          },
          {
            icon: Droplets,
            title: "Wellness Touch",
            detail: "Sitz bath and signature bath care amenities",
          },
          {
            icon: Sofa,
            title: "Companion Comfort",
            detail: "AMIGO massage chair & partner seating",
          },
          {
            icon: CupSoda,
            title: "Refreshments",
            detail: "Water purifier with curated tea/wine selection",
          },
        ],
      },
      amenities: buildAmenityCopy("en"),
    },
  },
  vip: {
    ko: {
      name: "VIP",
      hero: {
        badge: "VIP SUITE",
        title: "작지만 세심한 디테일이 살아있는 VIP 스위트",
        subtitle:
          "27㎡ 규모의 VIP 스위트는 가장 아늑한 스위트로, 산모가 집중적으로 회복할 수 있는 컴팩트하고 안정된 동선을 제공합니다.",
        highlights: [
          {
            title: "객실 크기",
            value: "약 8평 / 27㎡",
            note: "필수 동선만을 담은 컴팩트 구성",
          },
          {
            title: "베드 & 침구",
            value: "La Cloud 퀸 모션 베드",
            note: "친환경 옥수수솜 침구 세트",
          },
          {
            title: "케어 설비",
            value: "프리미엄 원목 아기침대",
            note: "메델라 락티나 유축기 상시 구비",
          },
        ],
      },
      carouselBadge: "ROOM GALLERY",
      carouselTitle: "VIP 스위트 미리보기",
      carouselDescription:
        "산모 회복과 아기 돌봄에 필요한 요소만 담은 VIP 스위트를 이미지로 둘러보세요.",
      thumbnailLabel: "VIP 이미지",
      prevLabel: "이전 이미지",
      nextLabel: "다음 이미지",
      carousel: [
        {
          src: "/img/room/vvip.jpg",
          alt: "VVIP 스위트 전경",
          caption: "프라이빗 라운지와 슬립 존이 자연스럽게 연결된 구조",
        },
        {
          src: "/img/room/vvip2.jpg",
          alt: "VVIP 스위트 전경",
          caption: "프라이빗 라운지와 슬립 존이 자연스럽게 연결된 구조",
        },
        {
          src: "/img/room/vvip3.jpg",
          alt: "VVIP 스위트 전경",
          caption: "프라이빗 라운지와 슬립 존이 자연스럽게 연결된 구조",
        },
        {
          src: "/img/room/vvip4.jpg",
          alt: "VVIP 스위트 전경",
          caption: "프라이빗 라운지와 슬립 존이 자연스럽게 연결된 구조",
        },
        {
          src: "/img/room/vvip5.jpg",
          alt: "VVIP 스위트 전경",
          caption: "프라이빗 라운지와 슬립 존이 자연스럽게 연결된 구조",
        },
      ],
      featureGroups: [
        {
          title: "객실 구성",
          items: [
            "8평(27㎡) 컴팩트 구성",
            "La Cloud 퀸 사이즈 모션 베드",
            "친환경 옥수수솜 침구",
            "프리미엄 원목 아기침대",
          ],
        },
        {
          title: "필수 설비",
          items: [
            "AMIGO 안마의자",
            "메델라 락티나 유축기",
            "LG 스타일러",
            "좌욕기 & 비데",
          ],
        },
        {
          title: "공기 & 편의",
          items: [
            "LG 퓨리케어 공기청정기",
            "Philips 공기 살균기",
            "냉 · 온 정수기",
            "드라이어",
          ],
        },
        {
          title: "엔터테인먼트",
          items: [
            "LG UHD TV",
            "따뜻한 무드 조명",
            "프라이빗 오디오 시스템",
            "간단한 티 & 스낵",
          ],
        },
      ],
      facts: {
        badge: "FAST FACTS",
        note: "VIP 스위트는 산모 집중 회복을 위한 핵심 설비만 엄선했습니다.",
        items: [
          {
            icon: BedDouble,
            title: "Room Type",
            detail: "8평 컴팩트 스위트",
          },
          {
            icon: Fan,
            title: "Air Care",
            detail: "LG 퓨리케어 & Philips 살균 조합",
          },
          {
            icon: LaptopMinimal,
            title: "Essentials",
            detail: "안마의자 · 정수기 · 유축기 풀세트",
          },
          {
            icon: Lamp,
            title: "Ambient Lighting",
            detail: "무드조명과 프라이빗 오디오로 편안한 밤",
          },
          {
            icon: Baby,
            title: "Baby Comfort",
            detail: "프리미엄 원목 아기침대와 케어 키트",
          },
        ],
      },
      amenities: buildAmenityCopy("ko"),
    },
    en: {
      name: "VIP",
      hero: {
        badge: "VIP SUITE",
        title: "Compact Yet Thoughtful VIP Suite",
        subtitle:
          "The 27㎡ VIP suite condenses everything a mother needs for focused recovery into a cozy, secure layout.",
        highlights: [
          {
            title: "Suite Size",
            value: "Approx. 27㎡",
            note: "Compact layout with essential zones",
          },
          {
            title: "Beds & Bedding",
            value: "La Cloud queen motion bed",
            note: "Eco-friendly corn fiber bedding set",
          },
          {
            title: "Care Equipment",
            value: "Premium wooden baby crib",
            note: "Medela Lactina pump ready to use",
          },
        ],
      },
      carouselBadge: "ROOM GALLERY",
      carouselTitle: "Preview the VIP Suite",
      carouselDescription:
        "Take a closer look at the intimate VIP suite designed with essentials for mother and baby.",
      thumbnailLabel: "VIP image",
      prevLabel: "Previous image",
      nextLabel: "Next image",
      carousel: [
        {
          src: "/img/room/vvip.jpg",
          alt: "VVIP 스위트 전경",
          caption: "프라이빗 라운지와 슬립 존이 자연스럽게 연결된 구조",
        },
        {
          src: "/img/room/vvip2.jpg",
          alt: "VVIP 스위트 전경",
          caption: "프라이빗 라운지와 슬립 존이 자연스럽게 연결된 구조",
        },
        {
          src: "/img/room/vvip3.jpg",
          alt: "VVIP 스위트 전경",
          caption: "프라이빗 라운지와 슬립 존이 자연스럽게 연결된 구조",
        },
        {
          src: "/img/room/vvip4.jpg",
          alt: "VVIP 스위트 전경",
          caption: "프라이빗 라운지와 슬립 존이 자연스럽게 연결된 구조",
        },
        {
          src: "/img/room/vvip5.jpg",
          alt: "VVIP 스위트 전경",
          caption: "프라이빗 라운지와 슬립 존이 자연스럽게 연결된 구조",
        },
      ],
      featureGroups: [
        {
          title: "Room Composition",
          items: [
            "Approx. 27㎡ compact layout",
            "La Cloud queen-size motion bed",
            "Eco-friendly corn fiber bedding",
            "Premium wooden baby crib",
          ],
        },
        {
          title: "Essential Equipment",
          items: [
            "AMIGO massage chair",
            "Medela Lactina breast pump",
            "LG Styler garment care",
            "Bidet with sitz bath",
          ],
        },
        {
          title: "Air & Convenience",
          items: [
            "LG PuriCare air purifier",
            "Philips air steriliser",
            "Hot & cold water purifier",
            "Hair dryer",
          ],
        },
        {
          title: "Entertainment",
          items: [
            "LG UHD TV",
            "Warm mood lighting",
            "Private audio setup",
            "Complimentary tea & snacks",
          ],
        },
      ],
      facts: {
        badge: "FAST FACTS",
        note: "VIP suites provide a curated set of essentials for focused recovery.",
        items: [
          {
            icon: BedDouble,
            title: "Room Type",
            detail: "Compact 27㎡ suite",
          },
          {
            icon: Fan,
            title: "Air Care",
            detail: "LG PuriCare + Philips sterilising combo",
          },
          {
            icon: LaptopMinimal,
            title: "Essentials",
            detail: "Massage chair, water purifier, Lactina pump included",
          },
          {
            icon: Lamp,
            title: "Ambient Lighting",
            detail: "Soft mood lighting with private audio",
          },
          {
            icon: Baby,
            title: "Baby Comfort",
            detail: "Premium wooden crib and care kit",
          },
        ],
      },
      amenities: buildAmenityCopy("en"),
    },
  },
};

function buildAmenityCopy(locale: Locale) {
  const isKo = locale === "ko";
  return {
    badge: isKo ? "어메니티" : "Amenities",
    title: isKo ? "머무는 동안 챙겨 드리는 것들" : "Everything Prepared for You",
    subtitle: isKo
      ? "산모와 가족이 머무는 동안 필요한 물품을 세심하게 갖추었습니다."
      : "A curated amenity set ensures comfort for both mother and family.",
    notice: isKo
      ? "* 물품 재고 상황에 따라 일부 품목이 변경될 수 있습니다."
      : "* Items may vary depending on inventory availability.",
    groups: [
      {
        title: isKo ? "웰컴 & 굿바이 기프트" : "Welcome & Goodbye Gifts",
        items: isKo
          ? [
              "웰컴 드링크 (논알콜 칵테일) 2잔",
              "웰컴 기프트 (머그 텀블러, 생리대, 수유패드, 베베숲 물티슈, 호두강정 등)",
              "굿바이 기프트 (아기 욕조, 젖병, 아기 이불, 리베로 기저귀, 배꼽 소독제 등)",
            ]
          : [
              "Welcome drinks (two non-alcohol mocktails)",
              "Welcome gift set (mug tumbler, sanitary pads, nursing pads, wet wipes, walnut sweets)",
              "Goodbye gift set (baby bathtub, bottle, baby blanket, Libero diapers, navel antiseptic)",
            ],
      },
      {
        title: isKo ? "어메니티 & 리넨" : "Amenities & Linen",
        items: isKo
          ? [
              "몰튼 브라운 4종 어메니티",
              "수건 4장 (발수건 1장 포함)",
              "수유 쿠션 & 회음부 방석",
              "산모복 2벌, 남편 생활복 1벌",
            ]
          : [
              "Molton Brown four-piece amenity set",
              "Four towels including one bath mat",
              "Nursing cushion & perineal pillow",
              "Two sets of mother wear & one partner loungewear",
            ],
      },
      {
        title: isKo ? "케어 & 위생" : "Care & Hygiene",
        items: isKo
          ? [
              "수유패드 · 회음부 케어 키트",
              "손 소독제 및 티슈",
              "산모 전용 워시 키트",
              "수유 기록 노트 & 필기 도구",
            ]
          : [
              "Nursing pads & perineal care kit",
              "Hand sanitiser and wipes",
              "Mother-exclusive cleansing kit",
              "Nursing journal & stationery",
            ],
      },
    ],
  };
}
