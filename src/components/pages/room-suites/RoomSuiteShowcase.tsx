"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import type { Locale } from "@/components/header/types";
import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import {
  Baby,
  BedDouble, ChevronLeft,
  ChevronRight,
  Clock,
  Coffee, Heart, LaptopMinimal,
  Sofa,
  Sparkles,
  Utensils
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

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
  const [currentIndex, setCurrentIndex] = useState(1);

  const currentImage = copy.carousel[currentIndex] ?? copy.carousel[1];

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
      <ScrollReveal>
      <section className="border-t border-border pt-8 md:pt-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="eyebrow">
              {copy.carouselBadge}
            </p>
            <h3 className="mt-4 font-display-serif text-2xl font-normal leading-[1.4] text-foreground md:text-3xl">
              {copy.carouselTitle}
            </h3>
            <p className="mx-auto mt-3 max-w-[34ch] text-sm leading-[1.85] text-secondary md:mx-0 md:max-w-none md:text-base">
              {copy.carouselDescription}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="inline-flex h-11 w-11 items-center justify-center border border-border bg-background text-foreground transition-colors hover:border-foreground"
              aria-label={copy.prevLabel}
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-11 w-11 items-center justify-center border border-border bg-background text-foreground transition-colors hover:border-foreground"
              aria-label={copy.nextLabel}
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div className="mt-6 overflow-hidden bg-accent/30">
          <div className="relative h-[320px] w-full md:h-[520px] lg:h-[620px]">
            <Image
              key={currentImage.src}
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              sizes="(min-width: 1280px) 76vw, (min-width: 768px) 78vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 text-sm text-white/90 drop-shadow">
              {currentImage.caption}
            </div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 md:flex md:flex-wrap md:items-center">
          {copy.carousel.map((image, index) => (
            <button
              key={image.src + index}
              type="button"
              onClick={() => goToIndex(index)}
              className={`relative aspect-[4/3] w-full overflow-hidden border transition md:h-20 md:w-32 ${
                currentIndex === index
                  ? "border-foreground"
                  : "border-border opacity-70 hover:opacity-100"
              }`}
              aria-label={`${copy.thumbnailLabel} ${index + 1}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 768px) 128px, calc((100vw - 72px) / 2)"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal>
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {copy.featureGroups.map((group, idx) => (
            <article
              key={group.title}
              className={`border-t border-border pt-6 ${idx === 0 ? 'sm:col-span-2' : ''}`}
            >
              <h4 className="mb-4 flex items-center gap-3 font-display-serif text-lg font-normal leading-[1.5] text-foreground">
                {idx === 0 && <Sofa className="h-5 w-5 text-primary" strokeWidth={1.5} />}
                {idx === 1 && <LaptopMinimal className="h-5 w-5 text-primary" strokeWidth={1.5} />}
                {idx === 2 && <Baby className="h-5 w-5 text-primary" strokeWidth={1.5} />}
                {idx === 3 && <Sparkles className="h-5 w-5 text-primary" strokeWidth={1.5} />}
                {group.title}
              </h4>
              <ul className={`grid gap-x-8 text-sm text-foreground/80 ${idx === 0 ? 'sm:grid-cols-2' : ''}`}>
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 border-b border-border py-2.5">
                    <span className="h-px w-3 flex-shrink-0 bg-primary" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <aside className="sticky top-24 flex h-fit flex-col gap-6 border border-border bg-background p-7 md:p-8">
          <div>
            <span className="eyebrow mb-5 inline-block">
              {copy.facts.badge}
            </span>
            <div>
               {copy.facts.items.map((fact) => (
                <div key={fact.title} className="flex items-center justify-between gap-4 border-b border-border py-3.5">
                  <span className="flex items-center gap-2.5">
                    <fact.icon className="h-4 w-4 flex-shrink-0 text-primary" strokeWidth={1.5} />
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                      {fact.title}
                    </span>
                  </span>
                  <span className="text-right text-sm leading-snug text-foreground/80">{fact.detail}</span>
                </div>
               ))}
            </div>
          </div>
          <div className="mt-auto text-sm leading-[1.85] text-secondary">
            <span className="text-primary mr-1">*</span>{copy.facts.note}
          </div>
        </aside>
      </section>
      </ScrollReveal>

      <AmenitiesSection copy={copy.amenities} />
      <PartnerBreakfastSection locale={activeLocale} />
    </div>
  );
}

function AmenitiesSection({ copy }: { copy: SuiteCopy["amenities"] }) {
  return (
    <ScrollReveal>
      <section className="border-t border-border pt-10 md:pt-12">
        <div className="space-y-10">
          <header className="space-y-4 text-center md:text-left">
            <span className="eyebrow inline-flex items-center gap-2">
               <Sparkles className="h-3 w-3" strokeWidth={1.5} />
               {copy.badge}
            </span>
            <div>
              <h3 className="mb-3 font-display-serif text-2xl font-normal leading-[1.4] text-foreground md:text-3xl">
                {copy.title}
              </h3>
              <p className="mx-auto max-w-[34ch] text-base leading-[1.85] text-secondary md:mx-0 md:max-w-2xl">
                {copy.subtitle}
              </p>
            </div>
          </header>

          <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {copy.groups.map((group) => (
              <article
                key={group.title}
                className="border-t border-border pt-6"
              >
                <h4 className="mb-4 font-display-serif text-lg font-normal leading-[1.5] text-foreground">
                  {group.title}
                </h4>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-[1.85] text-secondary">
                      <Heart className="mt-1.5 h-3 w-3 flex-shrink-0 text-primary" strokeWidth={1.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-xs leading-[1.85] text-secondary">
              {copy.notice}
            </p>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}

function PartnerBreakfastSection({ locale }: { locale: Locale }) {
  const isKo = locale === "ko";
  
  return (
    <ScrollReveal>
      <section className="border-t border-border pt-10 md:pt-12">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="space-y-4">
            <span className="eyebrow inline-flex items-center gap-2">
              <Coffee className="h-3 w-3" strokeWidth={1.5} />
              {isKo ? "보호자 서비스" : "Partner Service"}
            </span>
            <h3 className="font-display-serif text-2xl font-normal leading-[1.4] text-foreground md:text-3xl">
              {isKo ? "보호자를 위한 조식 서비스" : "Complimentary Partner Breakfast"}
            </h3>
          </div>

          <p className="mx-auto max-w-[34ch] text-base leading-[1.85] text-secondary md:mx-0 md:max-w-none md:text-lg">
            {isKo
              ? "든든한 아침을 위해 토스트, 시리얼, 신선한 우유와 주스, 그리고 다양한 스낵바를 무료로 제공합니다."
              : "Start your day with toast, cereal, fresh milk, juice, and a variety of snacks at our complimentary bar."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-2 md:justify-start">
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <Clock className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <span>{isKo ? "오전 7:00 ~ 오전 10:00" : "07:00 AM ~ 10:00 AM"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-foreground/80">
              <Utensils className="h-4 w-4 text-primary" strokeWidth={1.5} />
              <span>{isKo ? "토스트 · 시리얼 · 스낵바" : "Toast · Cereal · Snack Bar"}</span>
            </div>
          </div>
        </div>
      </section>
    </ScrollReveal>
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
        title: "호텔 스위트보다 넓은 13평형 프라이빗 라운지",
        subtitle: "투룸 구조로 가족과 함께 머물기에 이상적인 공간입니다. 최고급 모션 베드와 다이슨 풀 라인업, 단독 신생아실 케어로 완벽한 휴식을 선사합니다.",
        highlights: [
          { title: "객실 크기", value: "13평 / 43㎡", note: "투룸 구조, 논밭뷰(Field View)" },
          { title: "베드", value: "라클라우드 모션베드 S * 2", note: "트윈 베드 구성" },
          { title: "신생아 케어", value: "2 : 1 케어", note: "단독 신생아실 이용" },
        ],
      },
      carouselBadge: "ROOM GALLERY",
      carouselTitle: "프레스티지 스위트 둘러보기",
      carouselDescription: "가족을 위한 여유로운 거실과 독립된 침실, 프리미엄 가전이 갖춰진 공간을 확인하세요.",
      thumbnailLabel: "프레스티지 이미지",
      prevLabel: "이전",
      nextLabel: "다음",
      carousel: [
        { src: "/img/room/prestige1.jpg", alt: "프레스티지 거실", caption: "넓은 거실과 편안한 소파 공간" },
        { src: "/img/room/prestige2.jpg", alt: "프레스티지 침실", caption: "독립된 침실 공간" },
        { src: "/img/room/prestige3.jpg", alt: "프레스티지 침실", caption: "편안한 수면을 위한 프리미엄 침구" },
        { src: "/img/room/prestige4.jpg", alt: "프레스티지 파우더룸", caption: "프레스티지 스위트 파우더룸 디테일" },
        { src: "/img/room/prestige5.jpg", alt: "프레스티지 라운지", caption: "프레스티지 스위트 라운지 디테일" },
        { src: "/img/room/prestige6.jpg", alt: "프레스티지 객실", caption: "프레스티지 스위트 객실 전경" },
        { src: "/img/room/prestige7.jpg", alt: "프레스티지 창가", caption: "프레스티지 스위트 창가 공간" },
        { src: "/img/room/prestige8.jpg", alt: "프레스티지 침실 디테일", caption: "프레스티지 스위트 침실 디테일" },
        { src: "/img/room/prestige9.jpg", alt: "프레스티지 휴식 공간", caption: "프레스티지 스위트 휴식 공간" },
        { src: "/img/room/prestige10.jpg", alt: "프레스티지 인테리어", caption: "프레스티지 스위트 프리미엄 인테리어" },
      ],
      featureGroups: [
        {
          title: "객실 컨디션",
          items: ["13평형 투룸 구조 (43㎡)", "이중 통유리 창문 (논밭뷰)", "라클라우드 모션베드 싱글 2개", "바디프랜드 안마의자"],
        },
        {
          title: "가구 & 가전을 갖춘 라운지",
          items: ["LG 스탠바이미 + UHD TV", "다이슨 공기청정기 & 에어랩", "LG 스타일러 & 필립스 살균기", "캡슐 커피 머신 & 미니바"],
        },
        {
          title: "산모 & 아기 케어",
          items: ["스토케(Stokke) 아기침대", "메델라 심포니 유축기 (퇴실 후 대여)", "좌욕기 & 비데 (자온 적외선)", "회음부 방석 & 수유 쿠션"],
        },
        {
          title: "스페셜 서비스",
          items: ["신생아 케어 2 : 1 (단독 신생아실)", "가슴 관리: 입실 기간 무제한 + 퇴실 후 3회", "헤드스파 3회 / 베이비 스파 2회", "병원 ↔ 조리원 리무진 의전"],
        },
      ],
      facts: {
        badge: "FAST FACTS",
        note: "프레스티지 룸은 단독 신생아실 케어가 제공되는 최상위 객실입니다.",
        items: [
           { icon: BedDouble, title: "Bed Type", detail: "라클라우드 모션베드 싱글 2개" },
           { icon: Baby, title: "Care Ratio", detail: "2 : 1 프라이빗 케어" },
           { icon: Sparkles, title: "Signature", detail: "다이슨 풀세트 & 의전 서비스" },
           { icon: Utensils, title: "Special Meal", detail: "보호자 주말 식사 전체 제공 (12회)" },
        ],
      },
      amenities: buildAmenityCopy("ko"),
    },
    en: {
      name: "PRESTIGE",
      hero: {
         badge: "PRESTIGE SUITE",
         title: "Expansive 13-Pyeong Private Lounge",
         subtitle: "Ideal for families with a two-room layout. Offers perfect relaxation with premium motion beds, Dyson full lineup, and private newborn care.",
         highlights: [
            { title: "Size", value: "13 P / 43㎡", note: "Two-room, Field View" },
            { title: "Bed", value: "La Cloud Motion Bed S x2", note: "Twin setup" },
            { title: "Care", value: "2 : 1 Ratio", note: "Private Nursery Room" },
         ],
      },
      carouselBadge: "ROOM GALLERY",
      carouselTitle: "Preview Prestige Suite",
      carouselDescription: "Explore the spacious living room, separate bedroom, and premium appliances.",
      thumbnailLabel: "Prestige Image",
      prevLabel: "Prev",
      nextLabel: "Next",
      carousel: [
        { src: "/img/room/prestige1.jpg", alt: "Living Room", caption: "Spacious Living Area" },
        { src: "/img/room/prestige2.jpg", alt: "Bedroom", caption: "Separate Bedroom" },
        { src: "/img/room/prestige3.jpg", alt: "Bedding", caption: "Premium Bedding" },
        { src: "/img/room/prestige4.jpg", alt: "Powder Room", caption: "Powder Room Detail" },
        { src: "/img/room/prestige5.jpg", alt: "Lounge Detail", caption: "Lounge Detail" },
        { src: "/img/room/prestige6.jpg", alt: "Full Room View", caption: "Full Room View" },
        { src: "/img/room/prestige7.jpg", alt: "Window-side Space", caption: "Window-side Space" },
        { src: "/img/room/prestige8.jpg", alt: "Bedroom Detail", caption: "Bedroom Detail" },
        { src: "/img/room/prestige9.jpg", alt: "Relaxation Corner", caption: "Relaxation Corner" },
        { src: "/img/room/prestige10.jpg", alt: "Premium Interior", caption: "Premium Interior" },
      ],
      featureGroups: [
         {
            title: "Room Condition",
            items: ["13 Pyeong Two-Room (43㎡)", "Double-glazed Windows (Field View)", "La Cloud Motion Bed S x2", "Bodyfriend Massage Chair"],
         },
         {
            title: "Furniture & Device",
            items: ["LG StanbyME + UHD TV", "Dyson Purifier & Airwrap", "LG Styler & Philips Sterilizer", "Capsule Coffee & Minibar"],
         },
         {
            title: "Mother & Baby Care",
            items: ["Stokke Baby Crib", "Medela Symphony Pump (Free Rental)", "Sitz Bath & Bidet", "Nursing Cushion & Pads"],
         },
         {
            title: "Special Service",
            items: ["Newborn Care 2:1 (Private Room)", "Unlimited Breast Care + 3x After", "Head Spa 3x / Baby Spa 2x", "Limousine Transfer Service"],
         },
      ],
      facts: {
         badge: "FAST FACTS",
         note: "Prestige includes private nursery care.",
         items: [
            { icon: BedDouble, title: "Bed Type", detail: "Two Motion Bed Singles" },
            { icon: Baby, title: "Care Ratio", detail: "2 : 1 Private Care" },
            { icon: Sparkles, title: "Signature", detail: "Dyson Full Set & Limousine" },
            { icon: Utensils, title: "Special Meal", detail: "Partner Meals (All Weekends)" },
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
        title: "10.5평의 넉넉하고 편안한 힐링 공간",
        subtitle: "논밭뷰의 탁 트인 전망과 함께 안마의자, 모션베드 등 프리미엄 설비를 갖춘 가장 인기 있는 객실입니다.",
        highlights: [
          { title: "객실 크기", value: "10.5평 / 34㎡", note: "원룸형, 논밭뷰(Field View)" },
          { title: "베드", value: "라클라우드 모션베드 Q", note: "퀸 사이즈" },
          { title: "신생아 케어", value: "3.5 : 1 케어", note: "전문 케어팀 상주" },
        ],
      },
      carouselBadge: "ROOM GALLERY",
      carouselTitle: "VVIP 스위트 둘러보기",
      carouselDescription: "탁 트인 뷰와 여유로운 공간, 프리미엄 안마의자가 있는 VVIP 룸을 확인하세요.",
      thumbnailLabel: "VVIP 이미지",
      prevLabel: "이전",
      nextLabel: "다음",
      carousel: [
        { src: "/img/room/vvip1.jpg", alt: "VVIP 전경", caption: "탁 트인 논밭뷰와 모션베드" },
        { src: "/img/room/vvip2.jpg", alt: "VVIP 침실", caption: "안마의자와 휴식 공간" },
        { src: "/img/room/vvip3.jpg", alt: "VVIP 라운지", caption: "쾌적한 실내 컨디션" },
        { src: "/img/room/vvip4.jpg", alt: "VVIP 객실", caption: "넓은 객실 동선" },
        { src: "/img/room/vvip5.jpg", alt: "VVIP 침구", caption: "프리미엄 침구와 조명" },
        { src: "/img/room/vvip6.jpg", alt: "VVIP 가전", caption: "객실 내 수납 및 가전" },
        { src: "/img/room/vvip7.jpg", alt: "VVIP 창가", caption: "창가 휴식 코너" },
        { src: "/img/room/vvip8.jpg", alt: "VVIP 인테리어", caption: "안정감 있는 인테리어 톤" },
      ],
      featureGroups: [
        {
          title: "객실 컨디션",
          items: ["10.5평형 원룸 구조 (34㎡)", "이중 통유리 창문 (논밭뷰)", "라클라우드 모션베드 퀸(Q)", "바디프랜드 안마의자"],
        },
        {
          title: "가구 & 가전",
          items: ["LG 스탠바이미 + UHD TV", "다이슨 슈퍼소닉 드라이어", "LG 스타일러 & 필립스 살균기", "LG 공기청정기 & 정수기"],
        },
        {
          title: "산모 & 아기 케어",
          items: ["세이지폴(Sagepole) 아기침대", "메델라 심포니 유축기 (퇴실 후 대여)", "좌욕기 & 비데 (자온 적외선)", "수유 쿠션 & 회음부 방석"],
        },
        {
          title: "스페셜 서비스",
          items: ["신생아 케어 3.5 : 1", "가슴 관리: 입실 기간 무제한", "헤드스파 2회 / 베이비 스파 1회", "보호자 식사 2회 (입실/토요일)"],
        },
      ],
      facts: {
         badge: "FAST FACTS",
         note: "가장 많은 산모님들이 선택하는 베스트 객실입니다.",
         items: [
            { icon: BedDouble, title: "Bed Type", detail: "라클라우드 모션베드 퀸(Q)" },
            { icon: Baby, title: "Care Ratio", detail: "3.5 : 1 케어" },
            { icon: Sparkles, title: "Device", detail: "다이슨 드라이어 & 메델라 심포니" },
            { icon: Utensils, title: "Partner Meal", detail: "입실 당일 + 토요일 특식" },
         ],
      },
      amenities: buildAmenityCopy("ko"),
    },
    en: {
      name: "VVIP",
      hero: {
         badge: "VVIP SUITE",
         title: "Spacious 10.5-Pyeong Healing Space",
         subtitle: "Our most popular room featuring open field views, premium massage chair, and motion bed for ultimate comfort.",
         highlights: [
            { title: "Size", value: "10.5 P / 34㎡", note: "Studio, Field View" },
            { title: "Bed", value: "La Cloud Motion Bed Q", note: "Queen Size" },
            { title: "Care", value: "3.5 : 1 Ratio", note: "Professional Team" },
         ],
      },
      carouselBadge: "ROOM GALLERY",
      carouselTitle: "Preview VVIP Suite",
      carouselDescription: "Check out the open view, spacious room, and premium massage chair.",
      thumbnailLabel: "VVIP Image",
      prevLabel: "Prev",
      nextLabel: "Next",
      carousel: [
        { src: "/img/room/vvip1.jpg", alt: "VVIP View", caption: "Open Field View & Motion Bed" },
        { src: "/img/room/vvip2.jpg", alt: "VVIP Room", caption: "Massage Chair & Relax Zone" },
        { src: "/img/room/vvip3.jpg", alt: "VVIP Lounge", caption: "Comfortable Room Condition" },
        { src: "/img/room/vvip4.jpg", alt: "VVIP Layout", caption: "Spacious In-room Layout" },
        { src: "/img/room/vvip5.jpg", alt: "VVIP Bedding", caption: "Premium Bedding & Lighting" },
        { src: "/img/room/vvip6.jpg", alt: "VVIP Appliances", caption: "Storage & Essential Appliances" },
        { src: "/img/room/vvip7.jpg", alt: "VVIP Window Spot", caption: "Window-side Relaxation Corner" },
        { src: "/img/room/vvip8.jpg", alt: "VVIP Interior", caption: "Balanced Interior Tone" },
      ],
      featureGroups: [
         {
            title: "Room Condition",
            items: ["10.5 Pyeong Studio (34㎡)", "Double-glazed Windows (Field View)", "La Cloud Motion Bed Q", "Bodyfriend Massage Chair"],
         },
         {
            title: "Furniture & Device",
            items: ["LG StanbyME + UHD TV", "Dyson Supersonic Dryer", "LG Styler & Philips Sterilizer", "LG Purifier & Water Purifier"],
         },
         {
            title: "Mother & Baby Care",
            items: ["Sagepole Baby Crib", "Medela Symphony Pump (Free Rental)", "Sitz Bath & Bidet", "Nursing Cushion & Pads"],
         },
         {
            title: "Special Service",
            items: ["Newborn Care 3.5:1", "Unlimited Breast Care", "Head Spa 2x / Baby Spa 1x", "Partner Meal 2x"],
         },
      ],
      facts: {
         badge: "FAST FACTS",
         note: "The most popular choice for mothers.",
         items: [
            { icon: BedDouble, title: "Bed Type", detail: "La Cloud Motion Bed Q" },
            { icon: Baby, title: "Care Ratio", detail: "3.5 : 1 Ratio" },
            { icon: Sparkles, title: "Device", detail: "Dyson Dryer & Medela Symphony" },
            { icon: Utensils, title: "Partner Meal", detail: "Check-in Lunch + Sat Special" },
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
        title: "8.5평의 실속 있고 아늑한 공간",
        subtitle: "시티뷰를 배경으로 꼭 필요한 설비를 갖춘 합리적인 객실입니다. 라클라우드 모션베드와 바디프랜드 안마의자가 기본 제공됩니다.",
        highlights: [
          { title: "객실 크기", value: "8.5평 / 28㎡", note: "원룸형, 시티뷰(City View)" },
          { title: "베드", value: "라클라우드 모션베드 Q", note: "퀸 사이즈" },
          { title: "신생아 케어", value: "3.5 : 1 케어", note: "전문 케어팀 상주" },
        ],
      },
      carouselBadge: "ROOM GALLERY",
      carouselTitle: "VIP 스위트 둘러보기",
      carouselDescription: "아늑한 분위기와 효율적인 동선을 갖춘 VIP 룸을 확인하세요.",
      thumbnailLabel: "VIP 이미지",
      prevLabel: "이전",
      nextLabel: "다음",
      carousel: [
        { src: "/img/room/vvip1.jpg", alt: "VIP 전경", caption: "아늑한 시티뷰 객실" },
        { src: "/img/room/vvip2.jpg", alt: "VIP 설비", caption: "안마의자와 모션베드" },
        { src: "/img/room/vvip3.jpg", alt: "VIP 객실", caption: "효율적인 객실 동선" },
        { src: "/img/room/vvip4.jpg", alt: "VIP 침실", caption: "편안한 침실 무드" },
        { src: "/img/room/vvip5.jpg", alt: "VIP 수납 공간", caption: "실용적인 수납 공간" },
        { src: "/img/room/vvip6.jpg", alt: "VIP 가전", caption: "기본 가전이 갖춰진 공간" },
        { src: "/img/room/vvip7.jpg", alt: "VIP 창가 코너", caption: "조용한 휴식 코너" },
        { src: "/img/room/vvip8.jpg", alt: "VIP 인테리어", caption: "따뜻한 톤의 인테리어" },
      ],
      featureGroups: [
        {
          title: "객실 컨디션",
          items: ["8.5평형 원룸 구조 (28㎡)", "이중 통유리 창문 (시티뷰)", "라클라우드 모션베드 퀸(Q)", "바디프랜드 안마의자"],
        },
        {
          title: "가구 & 가전",
          items: ["LG UHD TV (43인치)", "필립스 드라이어", "LG 스타일러 & 필립스 살균기", "LG 공기청정기 & 정수기"],
        },
        {
          title: "산모 & 아기 케어",
          items: ["원목형 아기침대", "메델라 락티나 유축기 (할인 대여)", "좌욕기 & 비데 (자온 적외선)", "수유 쿠션 & 회음부 방석"],
        },
        {
          title: "스페셜 서비스",
          items: ["신생아 케어 3.5 : 1", "가슴 관리: 입실 기간 무제한", "헤드스파 1회 / 베이비 스파 1회", "보호자 식사 1회 (입실 당일)"],
        },
      ],
      facts: {
         badge: "FAST FACTS",
         note: "합리적인 가격에 프리미엄 케어를 누릴 수 있습니다.",
         items: [
            { icon: BedDouble, title: "Bed Type", detail: "라클라우드 모션베드 퀸(Q)" },
            { icon: Baby, title: "Care Ratio", detail: "3.5 : 1 케어" },
            { icon: Sparkles, title: "Device", detail: "안마의자 & 유축기 기본 제공" },
            { icon: Utensils, title: "Partner Meal", detail: "입실 당일 점심 제공" },
         ],
      },
      amenities: buildAmenityCopy("ko"),
    },
    en: {
      name: "VIP",
      hero: {
         badge: "VIP SUITE",
         title: "Cozy 8.5-Pyeong Essential Space",
         subtitle: "A practical choice with City View and essential premium amenities like Motion Bed and Massage Chair.",
         highlights: [
            { title: "Size", value: "8.5 P / 28㎡", note: "Studio, City View" },
            { title: "Bed", value: "La Cloud Motion Bed Q", note: "Queen Size" },
            { title: "Care", value: "3.5 : 1 Ratio", note: "Professional Team" },
         ],
      },
      carouselBadge: "ROOM GALLERY",
      carouselTitle: "Preview VIP Suite",
      carouselDescription: "Check out the cozy atmosphere and efficient layout of the VIP suite.",
      thumbnailLabel: "VIP Image",
      prevLabel: "Prev",
      nextLabel: "Next",
      carousel: [
        { src: "/img/room/vvip1.jpg", alt: "VIP View", caption: "Cozy City View Room" },
        { src: "/img/room/vvip2.jpg", alt: "VIP Room", caption: "Massage Chair & Motion Bed" },
        { src: "/img/room/vvip3.jpg", alt: "VIP Layout", caption: "Efficient In-room Layout" },
        { src: "/img/room/vvip4.jpg", alt: "VIP Bedroom", caption: "Comfortable Bedroom Mood" },
        { src: "/img/room/vvip5.jpg", alt: "VIP Storage", caption: "Practical Storage Space" },
        { src: "/img/room/vvip6.jpg", alt: "VIP Appliances", caption: "Essential In-room Appliances" },
        { src: "/img/room/vvip7.jpg", alt: "VIP Window Corner", caption: "Quiet Relaxation Corner" },
        { src: "/img/room/vvip8.jpg", alt: "VIP Interior", caption: "Warm Interior Tone" },
      ],
      featureGroups: [
         {
            title: "Room Condition",
            items: ["8.5 Pyeong Studio (28㎡)", "Double-glazed Windows (City View)", "La Cloud Motion Bed Q", "Bodyfriend Massage Chair"],
         },
         {
            title: "Furniture & Device",
            items: ["LG UHD TV (43_inch)", "Philips Dryer", "LG Styler & Philips Sterilizer", "LG Purifier & Water Purifier"],
         },
         {
            title: "Mother & Baby Care",
            items: ["Wooden Baby Crib", "Medela Lactina Pump (Discount Rental)", "Sitz Bath & Bidet", "Nursing Cushion & Pads"],
         },
         {
            title: "Special Service",
            items: ["Newborn Care 3.5:1", "Unlimited Breast Care", "Head Spa 1x / Baby Spa 1x", "Partner Meal 1x"],
         },
      ],
      facts: {
         badge: "FAST FACTS",
         note: "Enjoy premium care at a rational price.",
         items: [
            { icon: BedDouble, title: "Bed Type", detail: "La Cloud Motion Bed Q" },
            { icon: Baby, title: "Care Ratio", detail: "3.5 : 1 Ratio" },
            { icon: Sparkles, title: "Device", detail: "Massage Chair & Pump Included" },
            { icon: Utensils, title: "Partner Meal", detail: "Check-in Lunch Included" },
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
              "웰컴 기프트 (머그 텀블러, 생리대, 베베숲 물티슈, 호두강정 등)",
              "굿바이 기프트 (아기 욕조, 젖병, 아기 이불, 가재손수건 등)",
            ]
          : [
              "Welcome gift set (mug tumbler, sanitary pads, wet wipes, walnut sweets)",
              "Goodbye gift set (baby bathtub, bottle, baby blanket, baby towel)",
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
              "실내용 슬리퍼"
            ]
          : [
              "Molton Brown four-piece amenity set",
              "Four towels including one bath mat",
              "Nursing cushion & perineal pillow",
              "Two sets of mother wear & one partner loungewear",
              "Indoor Slipers"
            ],
      },
      {
        title: isKo ? "케어 & 위생" : "Care & Hygiene",
        items: isKo
          ? [
              
              "손 소독제 및 티슈",
              
              
            ]
          : [
              
              "Hand sanitiser and wipes",
            ],
      },
    ],
  };
}
