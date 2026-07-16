"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import type { Locale } from "@/components/header/types";
import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import { blobUrl } from "@/lib/media";
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

  const isKo = activeLocale === "ko";
  const currentImage = copy.carousel[currentIndex] ?? copy.carousel[1];
  const featureImage = copy.carousel[1] ?? copy.carousel[0] ?? { src: "", alt: "" };

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
    <div className="space-y-16 md:space-y-24">
      <ScrollReveal>
      <section>
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
              sizes="(min-width: 1152px) 1120px, calc(100vw - 32px)"
              quality={90}
              className="object-cover"
              priority
            />
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

      {copy.hero.highlights.length > 0 ? (
        <ScrollReveal>
        <section>
          <span className="eyebrow mb-8 inline-block">
            {isKo ? "한눈에 보기" : "At a Glance"}
          </span>
          <div className="grid grid-cols-1 border-t border-border sm:grid-cols-3">
            {copy.hero.highlights.map((highlight, index) => (
              <div
                key={highlight.title}
                className={`py-8 sm:px-8 sm:first:pl-0 ${
                  index > 0 ? "border-t border-border sm:border-t-0 sm:border-l" : ""
                }`}
              >
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                  {highlight.title}
                </p>
                <p className="mt-4 break-keep font-display-serif text-2xl font-normal leading-[1.4] text-foreground">
                  {highlight.value}
                </p>
                <p className="mt-2 break-keep text-sm leading-[1.75] text-secondary">
                  {highlight.note}
                </p>
              </div>
            ))}
          </div>
        </section>
        </ScrollReveal>
      ) : null}

      <ScrollReveal>
      <section className="grid gap-10 lg:grid-cols-3 lg:items-stretch lg:gap-14">
        <div className="relative order-1 min-h-[420px] overflow-hidden bg-accent/60 lg:order-2 lg:min-h-full col-span-2">
          <Image
            src={featureImage.src}
            alt={featureImage.alt}
            fill
            sizes="(min-width: 1152px) 548px, (min-width: 1024px) 47vw, calc(100vw - 40px)"
            quality={90}
            className="object-cover"
          />
        </div>
        <div className="order-2 flex flex-col gap-10 lg:order-1">
          {copy.featureGroups.map((group, idx) => (
            <article
              key={group.title}
              className="border-t border-border pt-6"
            >
              <h4 className="mb-4 flex items-center gap-3 font-display-serif text-lg font-normal leading-[1.5] text-foreground">
                {idx === 0 && <Sofa className="h-5 w-5 text-primary" strokeWidth={1.5} />}
                {idx === 1 && <LaptopMinimal className="h-5 w-5 text-primary" strokeWidth={1.5} />}
                {idx === 2 && <Baby className="h-5 w-5 text-primary" strokeWidth={1.5} />}
                {idx === 3 && <Sparkles className="h-5 w-5 text-primary" strokeWidth={1.5} />}
                {group.title}
              </h4>
              <ul className="text-sm text-foreground/80">
                {group.items.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-center gap-3 border-b border-border py-2.5 last:border-b-0">
                    <span className="h-px w-3 flex-shrink-0 bg-primary" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      </ScrollReveal>

      <AmenitiesSection copy={copy.amenities} locale={activeLocale} />
      <PartnerBreakfastSection locale={activeLocale} />
    </div>
  );
}

function AmenitiesSection({
  copy,
  locale,
}: {
  copy: SuiteCopy["amenities"];
  locale: Locale;
}) {
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
          <AmenityCarousel locale={locale} />
          <div className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {copy.groups.slice(0, 2).map((group) => (
              <AmenityGroupCard key={group.title} group={group} />
            ))}
            {copy.groups.slice(2).map((group) => (
              <AmenityGroupCard key={group.title} group={group} />
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

function AmenityGroupCard({
  group,
}: {
  group: SuiteCopy["amenities"]["groups"][number];
}): React.JSX.Element {
  return (
    <article className="border-t border-border pt-6">
      <h4 className="mb-4 font-display-serif text-lg font-normal leading-[1.5] text-foreground">
        {group.title}
      </h4>
      <ul className="space-y-3">
        {group.items.slice(0, 5).map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-[1.85] text-secondary">
            <Heart className="mt-1.5 h-3 w-3 flex-shrink-0 text-primary" strokeWidth={1.5} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

const AMENITY_IMAGES: Array<{ src: string; altKo: string; altEn: string }> = [
  { src: blobUrl("img/room/amenity/ameniti_moltonbrown2.jpg"), altKo: "몰튼 브라운 어메니티", altEn: "Molton Brown amenities" },
  { src: blobUrl("img/room/amenity/ameniti_towel.jpg"), altKo: "수건 세트", altEn: "Towel set" },
  { src: blobUrl("img/room/amenity/ameniti_cloth1.jpg"), altKo: "산모복", altEn: "Mother wear" },
  { src: blobUrl("img/room/amenity/ameniti_cloth2.jpg"), altKo: "산모복", altEn: "Mother wear" },
  { src: blobUrl("img/room/amenity/ameniti_cusion.png"), altKo: "수유 쿠션", altEn: "Nursing cushion" },
  { src: blobUrl("img/room/amenity/ameniti_cusion2.jpg"), altKo: "수유 쿠션", altEn: "Nursing cushion" },
];

function AmenityCarousel({ locale }: { locale: Locale }): React.JSX.Element {
  const isKo = locale === "ko";
  const [index, setIndex] = useState(0);
  const total = AMENITY_IMAGES.length;
  const current = AMENITY_IMAGES[index];
  const go = (next: number) => setIndex((next + total) % total);

  return (
    <div className="mx-auto w-full max-w-[600px] md:max-w-[720px] lg:max-w-[800px] ">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-accent/30">
        <Image
          key={current.src}
          src={current.src}
          alt={isKo ? current.altKo : current.altEn}
          fill
          sizes="(min-width: 768px) 600px, calc((100vw - 32px) * 1.7)"
          quality={90}
          className="object-cover"
        />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => go(index - 1)}
          className="inline-flex h-9 w-9 items-center justify-center border border-border bg-background text-foreground transition-colors hover:border-foreground"
          aria-label={isKo ? "이전" : "Prev"}
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <div className="flex items-center gap-1.5">
          {AMENITY_IMAGES.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => go(i)}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                index === i ? "bg-foreground" : "bg-border hover:bg-secondary"
              }`}
              aria-label={`${isKo ? "어메니티 이미지" : "Amenity image"} ${i + 1}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(index + 1)}
          className="inline-flex h-9 w-9 items-center justify-center border border-border bg-background text-foreground transition-colors hover:border-foreground"
          aria-label={isKo ? "다음" : "Next"}
        >
          <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
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
      carousel: Array<{ src: string; alt: string; caption?: string }>;
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
          { title: "베드", value: "템퍼 모션베드 SS * 2", note: "트윈 베드 구성" },
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
        { src: blobUrl("img/room/prestige_livingroom1.jpg"), alt: "프레스티지 스위트 거실" },
        { src: blobUrl("img/room/prestige_livingroom2.jpg"), alt: "프레스티지 스위트 거실" },
        { src: blobUrl("img/room/prestige_livingroom3.jpg"), alt: "프레스티지 스위트 거실" },
        { src: blobUrl("img/room/prestige_livingroom4.jpg"), alt: "프레스티지 스위트 거실" },
        { src: blobUrl("img/room/prestige_livingroom5.jpg"), alt: "프레스티지 스위트 거실" },
        { src: blobUrl("img/room/prestige_livingroom6.jpg"), alt: "프레스티지 스위트 거실" },
        { src: blobUrl("img/room/prestige_livingroom7.jpg"), alt: "프레스티지 스위트 거실" },
        { src: blobUrl("img/room/prestige_bathroom1.jpg"), alt: "프레스티지 스위트 욕실" },
        { src: blobUrl("img/room/prestige_bathroom2.jpg"), alt: "프레스티지 스위트 욕실" },
        { src: blobUrl("img/room/prestige_bathroom3.jpg"), alt: "프레스티지 스위트 욕실" },
        { src: blobUrl("img/room/prestige_standbyme.jpg"), alt: "LG 스탠바이미" },
        { src: blobUrl("img/room/prestige_massage_chair.jpg"), alt: "바디프랜드 안마의자" },
        { src: blobUrl("img/room/prestige_dyson.jpg"), alt: "다이슨 에어랩" },
        { src: blobUrl("img/room/prestige_styler.jpg"), alt: "LG 스타일러" },
        { src: blobUrl("img/room/prestige_stoke_babychair1.jpg"), alt: "스토케 아기 의자" },
        { src: blobUrl("img/room/prestige_stoke_babychair2.jpg"), alt: "스토케 아기 의자" },
        { src: blobUrl("img/room/prestige_medela_sympony.png"), alt: "메델라 심포니 유축기" },
      ],
      featureGroups: [
        {
          title: "객실 컨디션",
          items: ["13평형 투룸 구조 (43㎡)", "이중 통유리 창문 (논밭뷰)", "템퍼 모션베드 슈퍼 싱글 2개", "바디프랜드 안마의자"],
        },
        {
          title: "가구 & 가전을 갖춘 라운지",
          items: ["LG 스탠바이미 + UHD TV", "다이슨 공기청정기 & 에어랩", "LG 스타일러 & 필립스 살균기", "캡슐 커피 머신 & 미니바"],
        },
        {
          title: "산모 & 아기 케어",
          items: ["스토케(Stokke) 아기침대", "메델라 심포니 유축기", "좌욕기 & 비데 (자온 적외선)", "회음부 방석 & 수유 쿠션"],
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
           { icon: BedDouble, title: "Bed Type", detail: "템퍼 모션베드 슈퍼 싱글 2개" },
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
            { title: "Bed", value: "Tempur Motion Bed SS x2", note: "Twin setup" },
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
        { src: blobUrl("img/room/prestige_livingroom1.jpg"), alt: "Prestige Suite Living Room" },
        { src: blobUrl("img/room/prestige_livingroom2.jpg"), alt: "Prestige Suite Living Room" },
        { src: blobUrl("img/room/prestige_livingroom3.jpg"), alt: "Prestige Suite Living Room" },
        { src: blobUrl("img/room/prestige_livingroom4.jpg"), alt: "Prestige Suite Living Room" },
        { src: blobUrl("img/room/prestige_livingroom5.jpg"), alt: "Prestige Suite Living Room" },
        { src: blobUrl("img/room/prestige_livingroom6.jpg"), alt: "Prestige Suite Living Room" },
        { src: blobUrl("img/room/prestige_livingroom7.jpg"), alt: "Prestige Suite Living Room" },
        { src: blobUrl("img/room/prestige_bathroom1.jpg"), alt: "Prestige Suite Bathroom" },
        { src: blobUrl("img/room/prestige_bathroom2.jpg"), alt: "Prestige Suite Bathroom" },
        { src: blobUrl("img/room/prestige_bathroom3.jpg"), alt: "Prestige Suite Bathroom" },
        { src: blobUrl("img/room/prestige_standbyme.jpg"), alt: "LG StanbyME" },
        { src: blobUrl("img/room/prestige_massage_chair.jpg"), alt: "Bodyfriend Massage Chair" },
        { src: blobUrl("img/room/prestige_dyson.jpg"), alt: "Dyson Airwrap" },
        { src: blobUrl("img/room/prestige_styler.jpg"), alt: "LG Styler" },
        { src: blobUrl("img/room/prestige_stoke_babychair1.jpg"), alt: "Stokke Baby Chair" },
        { src: blobUrl("img/room/prestige_stoke_babychair2.jpg"), alt: "Stokke Baby Chair" },
        { src: blobUrl("img/room/prestige_medela_sympony.png"), alt: "Medela Symphony Pump" },
      ],
      featureGroups: [
         {
            title: "Room Condition",
            items: ["13 Pyeong Two-Room (43㎡)", "Double-glazed Windows (Field View)", "Tempur Motion Bed SS x2", "Bodyfriend Massage Chair"],
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
          { title: "베드", value: "템퍼 모션베드 Q", note: "퀸 사이즈" },
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
        { src: blobUrl("img/room/vvip_livingroom1.jpg"), alt: "VVIP 스위트 거실" },
        { src: blobUrl("img/room/vvip_livingroom2.jpg"), alt: "VVIP 스위트 거실" },
        { src: blobUrl("img/room/vvip_livingroom3.png"), alt: "VVIP 스위트 거실" },
        { src: blobUrl("img/room/vvip_livingroom4.png"), alt: "VVIP 스위트 거실" },
        { src: blobUrl("img/room/vvip_bed.jpg"), alt: "VVIP 스위트 침실" },
        { src: blobUrl("img/room/vvip_bathroom1.jpg"), alt: "VVIP 스위트 욕실" },
        { src: blobUrl("img/room/vvip_bathroom2.jpg"), alt: "VVIP 스위트 욕실" },
        { src: blobUrl("img/room/vvip_bathroom3.jpg"), alt: "VVIP 스위트 욕실" },
        { src: blobUrl("img/room/vvip_sagepole_babybed.jpg"), alt: "세이지폴 아기침대" },
        { src: blobUrl("img/room/vvip_dyson.jpg"), alt: "다이슨 슈퍼소닉 드라이어" },
        { src: blobUrl("img/room/vvip_styler1.jpg"), alt: "LG 스타일러" },
        { src: blobUrl("img/room/vvip_styler2.jpg"), alt: "LG 스타일러" },
      ],
      featureGroups: [
        {
          title: "객실 컨디션",
          items: ["10.5평형 원룸 구조 (34㎡)", "이중 통유리 창문 (논밭뷰)", "템퍼 모션베드 퀸(Q)", "바디프랜드 안마의자"],
        },
        {
          title: "가구 & 가전",
          items: ["LG 스탠바이미 + UHD TV", "다이슨 슈퍼소닉 드라이어", "LG 스타일러 & 필립스 살균기", "LG 공기청정기 & 정수기"],
        },
        {
          title: "산모 & 아기 케어",
          items: ["세이지폴(Sagepole) 아기침대", "메델라 심포니 유축기", "좌욕기 & 비데 (자온 적외선)", "수유 쿠션 & 회음부 방석"],
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
            { icon: BedDouble, title: "Bed Type", detail: "템퍼 모션베드 퀸(Q)" },
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
            { title: "Bed", value: "Tempur Motion Bed Q", note: "Queen Size" },
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
        { src: blobUrl("img/room/vvip_livingroom1.jpg"), alt: "VVIP Suite Living Room" },
        { src: blobUrl("img/room/vvip_livingroom2.png"), alt: "VVIP Suite Living Room" },
        { src: blobUrl("img/room/vvip_livingroom3.png"), alt: "VVIP Suite Living Room" },
        { src: blobUrl("img/room/vvip_livingroom4.jpg"), alt: "VVIP Suite Living Room" },
        { src: blobUrl("img/room/vvip_bed.jpg"), alt: "VVIP Suite Bedroom" },
        { src: blobUrl("img/room/vvip_bathroom1.jpg"), alt: "VVIP Suite Bathroom" },
        { src: blobUrl("img/room/vvip_bathroom2.jpg"), alt: "VVIP Suite Bathroom" },
        { src: blobUrl("img/room/vvip_bathroom3.jpg"), alt: "VVIP Suite Bathroom" },
        { src: blobUrl("img/room/vvip_sagepole_babybed.jpg"), alt: "Sagepole Baby Crib" },
        { src: blobUrl("img/room/vvip_dyson.jpg"), alt: "Dyson Supersonic Dryer" },
        { src: blobUrl("img/room/vvip_styler1.jpg"), alt: "LG Styler" },
        { src: blobUrl("img/room/vvip_styler2.jpg"), alt: "LG Styler" },
      ],
      featureGroups: [
         {
            title: "Room Condition",
            items: ["10.5 Pyeong Studio (34㎡)", "Double-glazed Windows (Field View)", "Tempur Motion Bed Q", "Bodyfriend Massage Chair"],
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
            { icon: BedDouble, title: "Bed Type", detail: "Tempur Motion Bed Q" },
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
        { src: blobUrl("img/room/vip_livingroom1.jpg"), alt: "VIP 스위트 거실" },
        { src: blobUrl("img/room/vip_livingroom2.jpg"), alt: "VIP 스위트 거실" },
        { src: blobUrl("img/room/vip_livingroom3.jpg"), alt: "VIP 스위트 거실" },
        { src: blobUrl("img/room/vip_livingroom4.jpg"), alt: "VIP 스위트 거실" },
        { src: blobUrl("img/room/vip_livingroom5.jpg"), alt: "VIP 스위트 거실" },
        { src: blobUrl("img/room/vip_bathroom1.jpg"), alt: "VIP 스위트 욕실" },
        { src: blobUrl("img/room/vip_bathroom2.jpg"), alt: "VIP 스위트 욕실" },
        { src: blobUrl("img/room/vip_babybed.png"), alt: "원목형 아기침대" },
        { src: blobUrl("img/room/medela_lactina.png"), alt: "메델라 락티나 유축기" },
        { src: blobUrl("img/room/vip_styler1.jpg"), alt: "LG 스타일러" },
        { src: blobUrl("img/room/vip_styler2.jpg"), alt: "LG 스타일러" },
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
          items: ["원목형 아기침대", "메델라 락티나 유축기", "좌욕기 & 비데 (자온 적외선)", "수유 쿠션 & 회음부 방석"],
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
        { src: blobUrl("img/room/vip_livingroom1.jpg"), alt: "VIP Suite Living Room" },
        { src: blobUrl("img/room/vip_livingroom2.jpg"), alt: "VIP Suite Living Room" },
        { src: blobUrl("img/room/vip_livingroom3.jpg"), alt: "VIP Suite Living Room" },
        { src: blobUrl("img/room/vip_livingroom4.jpg"), alt: "VIP Suite Living Room" },
        { src: blobUrl("img/room/vip_livingroom5.jpg"), alt: "VIP Suite Living Room" },
        { src: blobUrl("img/room/vip_bathroom1.jpg"), alt: "VIP Suite Bathroom" },
        { src: blobUrl("img/room/vip_bathroom2.jpg"), alt: "VIP Suite Bathroom" },
        { src: blobUrl("img/room/vip_babybed.png"), alt: "Wooden Baby Crib" },
        { src: blobUrl("img/room/medela_lactina.png"), alt: "Medela Lactina Pump" },
        { src: blobUrl("img/room/vip_styler1.jpg"), alt: "LG Styler" },
        { src: blobUrl("img/room/vip_styler2.jpg"), alt: "LG Styler" },
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
            items: ["Wooden Baby Crib", "Medela Lactina Pump", "Sitz Bath & Bidet", "Nursing Cushion & Pads"],
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
              "웰컴 기프트 (머그 텀블러, 생리대, 베베숲 물티슈, 호두강정, 리베로 기저귀 1팩, 등)",
              "굿바이 기프트 (아기 욕조, 젖병, 아기 이불, 가재손수건, 차량용 안전운전 스티커 등)",
            ]
          : [
              "Welcome gift set (mug tumbler, sanitary pads, wet wipes, walnut sweets, Libero diapers, etc.)",
              "Goodbye gift set (baby bathtub, bottle, baby blanket, baby towel, car safety driving sticker, etc.)",
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
              "실내용 슬리퍼",
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
              "손 소독제",
              "곽티슈",
              "롤휴지",
              "헤어드라이기"
            ]
          : [
              "Hand sanitiser and wipes",
              "Tissue box",
              "Toilet paper",
              "Hair dryer"
            ],
      },
      
    ],
  };
}
