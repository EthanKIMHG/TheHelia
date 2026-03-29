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
      <section className="rounded-3xl border border-border/30 bg-background/95 p-6 shadow md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              {copy.carouselBadge}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-foreground md:text-3xl font-serif">
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
              className="object-cover"
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
      </ScrollReveal>

      <ScrollReveal>
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-6 sm:grid-cols-2">
          {copy.featureGroups.map((group, idx) => (
            <article
              key={group.title}
              className={`rounded-[2rem] border border-stone-200/60 dark:border-white/5 bg-white/60 dark:bg-[#2A2928]/60 backdrop-blur-xl p-8 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 group
                ${idx === 0 ? 'sm:col-span-2 bg-gradient-to-br from-white/80 to-stone-50/50 dark:from-[#2A2928] dark:to-[#201F1E]' : ''}
              `}
            >
              <h4 className="flex items-center gap-2.5 text-lg font-bold text-foreground font-serif mb-5">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                  {idx === 0 && <Sofa className="w-4 h-4" />}
                  {idx === 1 && <LaptopMinimal className="w-4 h-4" />}
                  {idx === 2 && <Baby className="w-4 h-4" />}
                  {idx === 3 && <Sparkles className="w-4 h-4" />}
                </span>
                {group.title}
              </h4>
              <ul className={`grid gap-3 text-[15px] text-stone-600 dark:text-stone-300 ${idx === 0 ? 'sm:grid-cols-2' : ''}`}>
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 group/item">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/item:bg-primary transition-colors flex-shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        
        <aside className="flex flex-col gap-6 rounded-[2.5rem] border border-primary/10 bg-[#FAF9F6] dark:bg-[#2A2928] p-8 shadow-sm h-fit sticky top-24">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              {copy.facts.badge}
            </span>
            <div className="space-y-5">
               {copy.facts.items.map((fact) => (
                <div key={fact.title} className="flex items-start gap-4 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white dark:bg-stone-800 shadow-sm text-primary group-hover:scale-110 transition-transform">
                    <fact.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground font-serif mb-0.5">
                      {fact.title}
                    </p>
                    <p className="text-sm text-stone-500 dark:text-stone-400 leading-snug">{fact.detail}</p>
                  </div>
                </div>
               ))}
            </div>
          </div>
          <div className="mt-auto rounded-2xl bg-white dark:bg-stone-800 border border-stone-100 dark:border-white/5 p-5 text-sm font-medium text-stone-500 dark:text-stone-400 leading-relaxed shadow-sm">
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
      <section className="overflow-hidden rounded-[2.5rem] border border-stone-200/60 dark:border-white/5 bg-white/60 dark:bg-[#2A2928]/60 backdrop-blur-xl shadow-sm">
        <div className="space-y-8 p-8 md:p-12">
          <header className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
               <Sparkles className="w-3 h-3" />
               {copy.badge}
            </div>
            <div>
              <h3 className="text-3xl font-bold text-foreground font-serif mb-2">
                {copy.title}
              </h3>
              <p className="text-base text-stone-500 dark:text-stone-400 max-w-2xl leading-relaxed">
                {copy.subtitle}
              </p>
            </div>
          </header>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {copy.groups.map((group) => (
              <article
                key={group.title}
                className="group relative rounded-[2rem] border border-white/40 dark:border-white/5 bg-white/40 dark:bg-[#2A2928]/40 backdrop-blur-md p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <h4 className="text-lg font-bold text-foreground mb-4 font-serif flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {group.title}
                </h4>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-stone-600 dark:text-stone-300 group-hover:text-stone-800 dark:group-hover:text-stone-100 transition-colors">
                      <Heart className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-primary/40 group-hover:text-primary transition-colors" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          
          <div className="pt-6 border-t border-dashed border-stone-200 dark:border-white/10">
            <p className="text-xs font-medium text-stone-400 dark:text-stone-500 flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center text-[8px]">i</span>
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
      <section className="rounded-[2.5rem] border border-primary/10 bg-[#FAF9F6] dark:bg-[#2A2928] p-8 md:p-12 shadow-sm overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Icon / Visual Side */}
          <div className="shrink-0 relative">
            <div className="w-24 h-24 rounded-full bg-white dark:bg-stone-800 shadow-md flex items-center justify-center text-primary relative z-10">
               <Coffee className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping opacity-20" />
            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg border-2 border-white dark:border-[#2A2928]">
              <Utensils className="w-5 h-5" />
            </div>
          </div>

          {/* Content Side */}
          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-2">
              <span className="inline-block text-xs font-bold text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full">
                {isKo ? "보호자 서비스" : "Partner Service"}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold font-serif text-foreground">
                {isKo ? "보호자를 위한 조식 서비스" : "Complimentary Partner Breakfast"}
              </h3>
            </div>
            
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-lg">
              {isKo 
                ? "든든한 아침을 위해 토스트, 시리얼, 신선한 우유와 주스, 그리고 다양한 스낵바를 무료로 제공합니다."
                : "Start your day with toast, cereal, fresh milk, juice, and a variety of snacks at our complimentary bar."}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-white/5 shadow-sm text-sm font-medium text-stone-600 dark:text-stone-300">
                <Clock className="w-4 h-4 text-primary" />
                <span>{isKo ? "오전 7:00 ~ 오전 10:00" : "07:00 AM ~ 10:00 AM"}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-white/5 shadow-sm text-sm font-medium text-stone-600 dark:text-stone-300">
                <Utensils className="w-4 h-4 text-primary" />
                <span>{isKo ? "토스트 · 시리얼 · 스낵바" : "Toast · Cereal · Snack Bar"}</span>
              </div>
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
        { src: "/img/room/vvip4.jpg", alt: "VVIP 전경", caption: "탁 트인 논밭뷰와 모션베드" },
        { src: "/img/room/vvip2.jpg", alt: "VVIP 침실", caption: "안마의자와 휴식 공간" },
        { src: "/img/room/vvip1.jpg", alt: "VVIP 라운지", caption: "쾌적한 실내 컨디션" },
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
        { src: "/img/room/vvip4.jpg", alt: "VVIP View", caption: "Open Field View & Motion Bed" },
        { src: "/img/room/vvip2.jpg", alt: "VVIP Room", caption: "Massage Chair & Relax Zone" },
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
