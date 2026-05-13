"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import type { Locale } from "@/components/header/types";
import { Check, Sparkles } from "lucide-react";

type PricePageContentProps = {
  locale: Locale;
};

export function PricePageContent({ locale }: PricePageContentProps) {
  const isKo = locale === "ko";

  return (
    <div className="space-y-12 md:space-y-24 pb-20">
      <PriceHeader isKo={isKo} />
      <MainPriceSection isKo={isKo} />
      <PromotionSection isKo={isKo} />
      <DetailRatesSection isKo={isKo} />
      <RefundPolicySection isKo={isKo} />
    </div>
  );
}

function PriceHeader({ isKo }: { isKo: boolean }) {
  return (
    <ScrollReveal>
      <header className="mt-16 mb-20 space-y-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          {isKo ? "2025 프로모션" : "2025 Promotion"}
        </div>
        <h2 className="text-4xl font-bold font-serif leading-[1.16] break-keep tracking-tight text-foreground md:text-6xl md:leading-tight lg:text-7xl dark:text-foreground">
          {isKo ? (
            <>
              Premium <span className="text-primary italic font-light">Recovery</span>
            </>
          ) : (
             <>
              Premium <span className="text-primary italic font-light">Recovery</span>
            </>
          )}
        </h2>
        <p className="mx-auto max-w-[30ch] break-keep text-lg font-medium leading-relaxed text-foreground/80 md:max-w-2xl md:text-xl dark:text-foreground/85">
          {isKo
            ? "가장 소중한 순간, 더헬리아가 선사하는 완벽한 휴식"
            : "The most precious moment, perfect relaxation presented by The Helia."}
        </p>
      </header>
    </ScrollReveal>
  );
}

import Link from "next/link";
// ... (imports remain)

// ... (PriceHeader remains)

function MainPriceSection({ isKo }: { isKo: boolean }) {
  const plans = [
    {
      type: "VIP",
      price: "550",
      mobilePriceLabel: isKo ? "550만원" : "5.5M KRW",
      desc: isKo ? "합리적인 가격의 프리미엄 케어" : "Rational Premium Care",
      features: [
        { label: isKo ? "신생아 케어 3.5 : 1" : "Baby Care 3.5 : 1", included: true },
        { label: isKo ? "산모 헤드스파 1회" : "Mother Head Spa 1x", included: true },
        { label: isKo ? "보호자 식사 (입실 당일 1회)" : "Partner Meal (Check-in 1x)", included: true },
        { label: isKo ? "베이비 스파 1회" : "Baby Spa 1x", included: true },
        { label: isKo ? "가슴 마사지 (입실 기간 무제한)" : "Breast Care (Unlimited)", included: true },
        { label: isKo ? "퇴실 후 유축기 할인 대여" : "Pump Rental Discount", included: true },
      ],
      quickCompare: {
        babyCare: "3.5 : 1",
        headSpa: isKo ? "1회" : "1x",
        partnerMeal: isKo ? "1회" : "1x",
        babySpa: isKo ? "1회" : "1x",
        special: isKo ? "합리형" : "Value",
      },
      highlight: false,
    },
    {
      type: "VVIP",
      price: "650",
      mobilePriceLabel: isKo ? "650만원" : "6.5M KRW",
      desc: isKo ? "가장 많은 분들이 선택한 베스트" : "Most Popular Choice",
      features: [
        { label: isKo ? "신생아 케어 3.5 : 1" : "Baby Care 3.5 : 1", included: true },
        { label: isKo ? "산모 헤드스파 1회 + 보호자 1회" : "Mother Head Spa 1x + Partner 1x", included: true },
        { label: isKo ? "보호자 식사 2회 (입실/토요일)" : "Partner Meal 2x", included: true },
        { label: isKo ? "베이비 스파 1회" : "Baby Spa 1x", included: true },
        { label: isKo ? "가슴 마사지 (입실 기간 무제한)" : "Breast Care (Unlimited)", included: true },
        { label: isKo ? "퇴실 후 유축기 무상 대여" : "Free Pump Rental", included: true },
      ],
      quickCompare: {
        babyCare: "3.5 : 1",
        headSpa: isKo ? "산모1+보호자1" : "Mother1+Partner1",
        partnerMeal: isKo ? "2회" : "2x",
        babySpa: isKo ? "1회" : "1x",
        special: isKo ? "유축기 무상" : "Free Pump",
      },
      highlight: true,
      tag: isKo ? "MOST POPULAR" : "MOST POPULAR",
    },
    {
      type: "PRESTIGE",
      price: "950",
      mobilePriceLabel: isKo ? "950만원" : "9.5M KRW",
      desc: isKo ? "압도적인 럭셔리와 프라이빗 케어" : "Overwhelming Luxury & Private Care",
      features: [
        { label: isKo ? "신생아 케어 2 : 1 (단독 신생아실)" : "Baby Care 2 : 1 (Private Room)", included: true },
        { label: isKo ? "산모 헤드스파 2회 + 보호자 1회" : "Mother Head Spa 2x + Partner 1x", included: true },
        { label: isKo ? "보호자 주말 식사 전체 제공" : "Partner Meal (All Weekends)", included: true },
        { label: isKo ? "베이비 스파 2회" : "Baby Spa 2x", included: true },
        { label: isKo ? "가슴 관리 퇴실 후 3회 추가" : "Breast Care (+3x After)", included: true },
        { label: isKo ? "병원 → 조리원 리무진 의전" : "Limousine Service", included: true },
      ],
      quickCompare: {
        babyCare: "2 : 1",
        headSpa: isKo ? "산모2+보호자1" : "Mother2+Partner1",
        partnerMeal: isKo ? "주말 전체" : "All weekend",
        babySpa: isKo ? "2회" : "2x",
        special: isKo ? "의전 서비스" : "Transfer",
      },
      highlight: false,
      isPremium: true
    },
  ];

  return (
    <ScrollReveal>
      <section className="max-w-7xl mx-auto px-4 md:px-0 space-y-6">
        <div className="md:hidden space-y-4">
          <div className="rounded-[1.75rem] border border-border/35 bg-background/90 p-5 text-center shadow-sm dark:bg-primary/10">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
              {isKo ? "Room Price" : "Room Price"}
            </p>
            <h3 className="mt-2 break-keep font-serif text-2xl font-semibold leading-[1.24] text-foreground">
              {isKo ? "2주 기준 객실 요금" : "2-Week Room Rates"}
            </h3>
            <p className="mx-auto mt-2 max-w-[28ch] break-keep text-sm leading-relaxed text-foreground/78">
              {isKo
                ? "등급별 금액과 핵심 차이만 간단히 정리했습니다."
                : "A simple summary of rates and key differences."}
            </p>
          </div>

          <div className="space-y-3">
            {plans.map((plan) => {
              const isPrestige = plan.isPremium;
              const isVVIP = plan.highlight;
              const highlights = [
                { label: isKo ? "신생아 케어" : "Baby Care", value: plan.quickCompare.babyCare },
                { label: isKo ? "헤드스파" : "Head Spa", value: plan.quickCompare.headSpa },
                { label: isKo ? "대표 혜택" : "Key Benefit", value: plan.quickCompare.special },
              ];

              return (
                <article
                  key={plan.type}
                  className={`rounded-[1.75rem] border p-5 shadow-sm ${
                    isPrestige
                      ? "border-primary/45 bg-foreground text-background dark:bg-primary/25 dark:text-foreground"
                      : isVVIP
                        ? "border-primary/40 bg-primary/10 text-foreground dark:bg-primary/20"
                        : "border-border/35 bg-background/95 text-foreground dark:bg-primary/10"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-[0.24em] ${isPrestige ? "text-background/75 dark:text-foreground/75" : "text-primary"}`}>
                        {plan.type}
                      </p>
                      <p className={`mt-1 break-keep text-sm leading-relaxed ${isPrestige ? "text-background/75 dark:text-foreground/78" : "text-foreground/74"}`}>
                        {plan.desc}
                      </p>
                    </div>
                    {isVVIP ? (
                      <span className="shrink-0 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-background">
                        {isKo ? "추천" : "Popular"}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-5 flex items-end gap-2">
                    <p className="font-serif text-[2.6rem] font-bold leading-none tracking-tight">
                      {plan.mobilePriceLabel}
                    </p>
                    <p className={`pb-1 text-xs font-semibold ${isPrestige ? "text-background/70 dark:text-foreground/70" : "text-foreground/65"}`}>
                      {isKo ? "/ 2주" : "/ 2w"}
                    </p>
                  </div>

                  <dl className="mt-5 space-y-2.5">
                    {highlights.map((item) => (
                      <div
                        key={`${plan.type}-${item.label}`}
                        className={`flex items-center justify-between gap-4 rounded-xl px-3 py-2.5 ${
                          isPrestige
                            ? "bg-background/15 dark:bg-primary/20"
                            : "bg-primary/5 dark:bg-primary/10"
                        }`}
                      >
                        <dt className={`text-xs font-semibold ${isPrestige ? "text-background/70 dark:text-foreground/70" : "text-foreground/65"}`}>
                          {item.label}
                        </dt>
                        <dd className="max-w-[58%] break-keep text-right text-sm font-bold leading-snug">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              );
            })}
          </div>

          <Link href={`/${isKo ? "ko" : "en"}/reservation`} className="block w-full rounded-2xl bg-primary py-4 text-center text-sm font-bold tracking-wide text-background shadow-sm transition-colors hover:bg-primary/90 dark:bg-primary dark:text-background dark:hover:bg-primary/90">
            {isKo ? "상담 예약하기" : "Book Now"}
          </Link>
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => {
            const isPrestige = plan.isPremium;
            const isVVIP = plan.highlight;

            return (
              <div
                key={plan.type}
                className={`group relative rounded-[2.5rem] p-8 md:p-10 flex flex-col transition-all duration-500
                  ${isVVIP
                    ? "bg-primary/10 border-2 border-primary/35 shadow-2xl shadow-primary/15 z-10 md:scale-105 dark:bg-primary/20 dark:border-primary/45 dark:shadow-none"
                    : isPrestige
                      ? "bg-foreground text-background border border-primary/40 shadow-xl dark:bg-primary/30 dark:text-foreground dark:border-primary/50 dark:shadow-none"
                      : "bg-background border border-primary/20 shadow-lg hover:border-primary/35 dark:bg-primary/10 dark:border-primary/30 dark:hover:border-primary/45 dark:shadow-none"
                  }
                `}
              >
                {plan.tag && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-primary text-background text-[10px] font-bold px-4 py-1.5 rounded-full shadow-md uppercase tracking-widest flex items-center gap-1">
                      <Sparkles className="w-3 h-3 fill-white" />
                      {plan.tag}
                    </span>
                  </div>
                )}

                <div className="mb-10">
                  <h3 className={`font-serif text-3xl font-bold mb-3 ${isPrestige ? "text-background dark:text-foreground" : "text-foreground dark:text-foreground"}`}>
                    {plan.type}
                  </h3>
                  <p className={`text-sm mb-8 font-medium ${isPrestige ? "text-background/80 dark:text-foreground/85" : "text-foreground/80 dark:text-foreground/85"}`}>
                    {plan.desc}
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className={`text-4xl font-bold font-serif tracking-tight ${isPrestige ? "text-background dark:text-foreground" : "text-foreground dark:text-foreground"}`}>
                      {plan.price}
                    </span>
                    <span className={`text-base font-medium ${isPrestige ? "text-background/80 dark:text-foreground/85" : "text-foreground/80 dark:text-foreground/85"}`}>
                      {isKo ? "만원" : "0k KRW"}
                      <span className="text-xs ml-1 font-normal opacity-70">
                        {isKo ? "/ 2주" : "/ 2w"}
                      </span>
                    </span>
                  </div>
                </div>

                <ul className="space-y-5 mb-10 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed group/item">
                      <div className={`mt-0.5 rounded-full p-0.5 shrink-0
                        ${isPrestige
                          ? "bg-background/15 text-background dark:bg-primary/35 dark:text-foreground"
                          : isVVIP
                            ? "bg-primary/15 text-primary dark:bg-primary/30 dark:text-foreground"
                            : "bg-primary/10 text-primary dark:bg-primary/25 dark:text-foreground/90"
                        }
                      `}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className={`font-medium ${isPrestige ? "text-background/90 dark:text-foreground/90" : "text-foreground dark:text-foreground/90"}`}>
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-dashed border-primary/25 dark:border-primary/35">
                  <Link href={`/${isKo ? "ko" : "en"}/reservation`} className="block w-full">
                    <button className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300
                      ${isPrestige
                        ? "bg-background text-foreground hover:bg-background/90 dark:bg-primary dark:text-background dark:hover:bg-primary/90"
                        : isVVIP
                          ? "bg-primary text-background hover:bg-primary/90 shadow-lg shadow-primary/30 dark:shadow-none"
                          : "bg-primary/15 text-foreground hover:bg-primary/25 dark:bg-primary/20 dark:text-foreground dark:hover:bg-primary/30"
                      }
                    `}>
                      {isKo ? "상담 예약하기" : "Book Now"}
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </ScrollReveal>
  );
}

function PromotionSection({ isKo }: { isKo: boolean }) {
  const promotions = isKo
    ? [
        "당일 할인 이벤트: 20만원 할인 (기간 한정)",
        "제왕둔 검사 할인: 10만원 할인 (기간 한정)",
        "당일 할인 및 재방문 할인은 2주 예약 시 적용",
        "SPA: 산전 2회 + 산후 2회 (총 4회/60분)",
        "Prestige: 병원→조리원 단독 의전 서비스",
        "Prestige & VVIP: 메델라 유축기 2주 무상 대여",
      ]
    : [
        "Same-day Booking: 200k KRW Discount",
        "C-section Check: 100k KRW Discount",
        "Discounts apply to 2-week bookings only",
        "SPA: 2 Pre-natal + 2 Post-natal (60min)",
        "Prestige: Private Transfer Service",
        "Prestige & VVIP: Free Medela Pump Rental",
      ];

  const notes = isKo
    ? [
        "식사 (1일 3식) 및 간식 (1일 3회) 제공",
        "보호자 식사: 15,000원 / 1식 (Prestige 주말 무료)",
        "쌍둥이 추가 비용: 90만원 / 1주",
        "BABY SPA 추가: 15만원 / HEAD SPA 추가: 10만원",
        "포함: 신생아/산모 케어, 청소/세탁, 교육 프로그램",
        "입실 기간에 따라 금액 및 서비스가 변동될 수 있습니다.",
      ]
    : [
        "Meals (3/day) & Snacks (3/day) included",
        "Partner Meal: 15,000 KRW (Free on Weekends for Prestige)",
        "Twin Surcharge: 900,000 KRW / week",
        "Add-ons: Baby Spa 150k / Head Spa 100k",
        "Includes: Care, Cleaning, Laundry, Education",
        "Rates/Services may vary by stay duration.",
      ];

  return (
    <ScrollReveal>
      <section className="grid gap-8 md:grid-cols-2 max-w-7xl mx-auto">
        <div className="group rounded-[2.5rem] border border-border/30 bg-white/80 dark:bg-primary/10 backdrop-blur-md p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
               <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-xs font-bold text-primary uppercase tracking-widest mb-1">Benefit</span>
              <h3 className="text-2xl font-bold font-serif text-foreground">
                {isKo ? "프로모션 & 혜택" : "Special Promotions"}
              </h3>
            </div>
          </div>
          <ul className="space-y-4">
            {promotions.map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-[15px] leading-relaxed text-foreground/85 group/item">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/40 group-hover/item:bg-primary transition-colors" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="group rounded-[2.5rem] border border-border/30 bg-primary/5 dark:bg-primary/10 backdrop-blur-md p-8 md:p-10 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
               <Check className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-xs font-bold text-primary/95 uppercase tracking-widest mb-1">Check List</span>
              <h3 className="text-2xl font-bold font-serif text-foreground">
                {isKo ? "이용 안내" : "Service Details"}
              </h3>
            </div>
          </div>
          <ul className="space-y-4">
            {notes.map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-[15px] leading-relaxed text-foreground/85">
                <Check className="h-4 w-4 text-primary/80 mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </ScrollReveal>
  );
}

function DetailRatesSection({ isKo }: { isKo: boolean }) {
  const roomHeaders = isKo
    ? ["구분", "1주 (만원)", "9박 10일 (만원)", "2주 (만원)", "3주 (만원)"]
    : ["Type", "1 Week", "9 Nights 10 Days", "2 Weeks", "3 Weeks"];

  const roomRows = [
    { type: "PRESTIGE", w1: "715", d10: "885", w2: "950", w3: "1425" },
    { type: "VVIP", w1: "490", d10: "605", w2: "650", w3: "975" },
    { type: "VIP", w1: "415", d10: "515", w2: "550", w3: "825" },
  ];

  const spaHeaders = isKo
    ? ["구분", "정상가", "Package 할인가", "산전 예약 할인가"]
    : ["Course", "Regular Price", "Package Discount", "Pre-booking Discount"];

  const spaRows = isKo
    ? [
        { type: "PRESTIGE Course", reg: "320만원", pkg: "288만원 (-10%)", pre: "267만원 (-10% 추가)" },
        { type: "VIP Course", reg: "300만원", pkg: "270만원 (-10%)", pre: "243만원 (-10% 추가)" },
        { type: "A Course", reg: "250만원", pkg: "225만원 (-10%)", pre: "198만원 (-10% 추가)" },
        { type: "B Course", reg: "195만원", pkg: "175만원 (-10%)", pre: "158만원 (-10% 추가)" },
        { type: "C Course", reg: "140만원", pkg: "126만원 (-10%)", pre: "-" },
      ]
    : [
        { type: "PRESTIGE Course", reg: "3.2M KRW", pkg: "2.88M KRW (-10%)", pre: "2.67M KRW (-10% Add)" },
        { type: "VIP Course", reg: "3M KRW", pkg: "2.7M KRW (-10%)", pre: "2.43M KRW (-10% Add)" },
        { type: "A Course", reg: "2.5M KRW", pkg: "2.25M KRW (-10%)", pre: "1.98M KRW (-10% Add)" },
        { type: "B Course", reg: "1.95M KRW", pkg: "1.75M KRW (-10%)", pre: "1.58M KRW (-10% Add)" },
        { type: "C Course", reg: "1.4M KRW", pkg: "1.26M KRW (-10%)", pre: "-" },
      ];

  const roomMobileFields = isKo
    ? [
        { key: "w1", label: "1주" },
        { key: "d10", label: "9박 10일" },
        { key: "w2", label: "2주" },
        { key: "w3", label: "3주" },
      ]
    : [
        { key: "w1", label: "1 Week" },
        { key: "d10", label: "9N 10D" },
        { key: "w2", label: "2 Weeks" },
        { key: "w3", label: "3 Weeks" },
      ];

  const spaMobileFields = isKo
    ? [
        { key: "reg", label: "정상가" },
        { key: "pkg", label: "Package" },
        { key: "pre", label: "산전 예약가" },
      ]
    : [
        { key: "reg", label: "Regular" },
        { key: "pkg", label: "Package" },
        { key: "pre", label: "Pre-booking" },
      ];

  return (
    <div className="space-y-16">
      <ScrollReveal>
        <section>
          <div className="flex items-center gap-3 mb-8 px-2">
            <span className="h-8 w-1.5 bg-primary rounded-full" />
            <h3 className="text-2xl font-bold font-serif text-foreground">
              {isKo ? "객실 요금 상세" : "Room Rates Detail"}
            </h3>
          </div>
          <div className="overflow-hidden rounded-[2.5rem] border border-border/30 bg-white/80 dark:bg-primary/10 backdrop-blur-md shadow-sm">
            <div className="md:hidden p-4 space-y-3">
              {roomRows.map((row) => (
                <article key={row.type} className="rounded-2xl border border-border/30 bg-background/90 dark:bg-primary/10 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="font-serif text-lg font-bold text-primary">{row.type}</h4>
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary dark:bg-primary/20">
                      {isKo ? "객실" : "Room"}
                    </span>
                  </div>
                  <dl className="grid grid-cols-2 gap-x-3 gap-y-2">
                    {roomMobileFields.map((field) => {
                      const value = row[field.key as keyof typeof row];
                      return (
                        <div key={`${row.type}-${field.key}`} className="rounded-lg bg-primary/5 px-2.5 py-2 dark:bg-primary/10">
                          <dt className="text-[11px] font-medium text-foreground/75">{field.label}</dt>
                          <dd className="mt-0.5 text-sm font-bold text-foreground">
                            {value}
                            <span className="ml-1 text-[11px] font-medium text-foreground/75">
                              {isKo ? "만원" : "10k KRW"}
                            </span>
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </article>
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto p-4 md:p-6">
              <table className="w-full min-w-[600px] text-sm md:text-base border-collapse">
                <thead className="bg-primary/5 rounded-xl dark:bg-primary/10">
                  <tr>
                    {roomHeaders.map((h, i) => (
                      <th key={i} className="px-6 py-5 font-serif font-bold text-foreground/80 text-center first:text-left first:rounded-l-xl last:rounded-r-xl">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {roomRows.map((row) => (
                    <tr key={row.type} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-6 py-6 font-serif font-bold text-primary text-lg">{row.type}</td>
                      <td className="px-6 py-6 text-center text-foreground/80 group-hover:text-foreground transition-colors">{row.w1}</td>
                      <td className="px-6 py-6 text-center text-foreground/80 group-hover:text-foreground transition-colors">{row.d10}</td>
                      <td className="px-6 py-6 text-center font-bold text-foreground">{row.w2}</td>
                      <td className="px-6 py-6 text-center text-foreground/80 group-hover:text-foreground transition-colors">{row.w3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section>
          <div className="flex items-center gap-3 mb-8 px-2">
            <span className="h-8 w-1.5 bg-primary rounded-full" />
            <h3 className="text-2xl font-bold font-serif text-foreground">
              {isKo ? "스파 요금 상세" : "Spa Rates Detail"}
            </h3>
          </div>
          <div className="overflow-hidden rounded-[2.5rem] border border-border/30 bg-white/80 dark:bg-primary/10 backdrop-blur-md shadow-sm">
            <div className="md:hidden p-4 space-y-3">
              {spaRows.map((row) => (
                <article key={row.type} className="rounded-2xl border border-border/30 bg-background/90 dark:bg-primary/10 p-4">
                  <h4 className="font-serif text-lg font-bold text-primary mb-3">{row.type}</h4>
                  <dl className="space-y-2">
                    {spaMobileFields.map((field) => {
                      const value = row[field.key as keyof typeof row];
                      const isRegular = field.key === "reg";
                      const isPreBooking = field.key === "pre";
                      return (
                        <div key={`${row.type}-${field.key}`} className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 ${isPreBooking ? "bg-primary/10" : "bg-primary/5 dark:bg-primary/10"}`}>
                          <dt className="text-xs font-semibold text-foreground/80">{field.label}</dt>
                          <dd className={`text-right text-[15px] font-bold leading-snug ${isPreBooking ? "text-primary" : isRegular ? "text-foreground/85 line-through decoration-primary/45 decoration-2" : "text-foreground"}`}>
                            {value}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </article>
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto p-4 md:p-6">
              <table className="w-full min-w-[600px] text-sm md:text-base border-collapse">
                <thead className="bg-primary/5 rounded-xl dark:bg-primary/10">
                  <tr>
                    {spaHeaders.map((h, i) => (
                      <th key={i} className="px-6 py-5 font-serif font-bold text-foreground/90 text-center first:text-left first:rounded-l-xl last:rounded-r-xl">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {spaRows.map((row) => (
                    <tr key={row.type} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-6 py-6 font-serif font-bold text-primary text-lg">{row.type}</td>
                      <td className="px-6 py-6 text-center font-semibold text-foreground/85 line-through decoration-primary/45 decoration-2">{row.reg}</td>
                      <td className="px-6 py-6 text-center text-foreground font-bold">{row.pkg}</td>
                      <td className="px-6 py-6 text-center font-bold text-primary text-lg bg-primary/10 rounded-lg m-2 box-decoration-clone">{row.pre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}

function RefundPolicySection({ isKo }: { isKo: boolean }) {
  const headers = isKo
    ? ["구분", "91일 이상 또는 계약 후 24시간 이내", "61일 ~ 90일 사이", "31일 ~ 60일 사이", "30일 이내"]
    : ["Type", "91+ Days Before or Within 24 Hours of Contract", "61-90 Days Before", "31-60 Days Before", "30 Days or Less Before"];

  const row = {
    type: isKo ? "계약금" : "Deposit",
    d91: isKo ? "100% 환급" : "100% Refund",
    d61: isKo ? "60% 환급" : "60% Refund",
    d31: isKo ? "30% 환급" : "30% Refund",
    d30: isKo ? "미환급" : "No Refund",
  };

  const mobileRefundCards = [
    {
      period: isKo ? "91일 이상 / 계약 후 24시간 이내" : "91+ Days / Within 24H",
      value: row.d91,
      tone: "bg-primary/20 border-primary/40 text-foreground dark:bg-primary/30 dark:border-primary/50 dark:text-foreground",
    },
    {
      period: isKo ? "61일 ~ 90일" : "61-90 Days",
      value: row.d61,
      tone: "bg-primary/15 border-primary/35 text-foreground/90 dark:bg-primary/25 dark:border-primary/45 dark:text-foreground/90",
    },
    {
      period: isKo ? "31일 ~ 60일" : "31-60 Days",
      value: row.d31,
      tone: "bg-primary/10 border-primary/30 text-foreground/85 dark:bg-primary/20 dark:border-primary/40 dark:text-foreground/85",
    },
    {
      period: isKo ? "30일 이내" : "30 Days or Less",
      value: row.d30,
      tone: "bg-primary/5 border-primary/25 text-foreground/80 dark:bg-primary/15 dark:border-primary/35 dark:text-foreground/80",
    },
  ];

  return (
    <ScrollReveal>
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8 px-2">
            <span className="h-8 w-1.5 bg-primary rounded-full" />
            <h3 className="text-2xl font-bold font-serif text-foreground">
            {isKo ? "환불 규정" : "Refund Policy"}
            </h3>
        </div>
        <div className="overflow-hidden rounded-[2.5rem] border border-border/30 bg-white/80 dark:bg-primary/10 backdrop-blur-md shadow-sm">
          <div className="md:hidden p-4">
            <div className="mb-4 flex items-center justify-between rounded-xl border border-border/30 bg-background/90 dark:bg-primary/10 px-3 py-2">
              <span className="text-xs font-semibold text-foreground/80">{isKo ? "기준" : "Basis"}</span>
              <span className="font-serif text-base font-bold text-primary">{row.type}</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {mobileRefundCards.map((card) => (
                <article key={card.period} className={`rounded-xl border p-3 ${card.tone}`}>
                  <p className="text-[11px] font-semibold">{card.period}</p>
                  <p className="mt-1.5 text-base font-bold leading-tight">{card.value}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="hidden md:block overflow-x-auto p-4 md:p-6">
            <table className="w-full min-w-[600px] text-sm md:text-base border-collapse">
              <thead className="bg-primary/5 rounded-xl dark:bg-primary/10">
                <tr>
                  {headers.map((h, i) => (
                    <th key={i} className="px-6 py-5 font-serif font-bold text-foreground/85 text-center first:text-left first:rounded-l-xl last:rounded-r-xl">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <tr className="hover:bg-primary/5 transition-colors dark:hover:bg-primary/10">
                  <td className="px-6 py-6 font-serif font-bold text-primary">{row.type}</td>
                  <td className="px-6 py-6 text-center text-foreground/90 font-medium">{row.d91}</td>
                  <td className="px-6 py-6 text-center text-foreground/85">{row.d61}</td>
                  <td className="px-6 py-6 text-center text-foreground/80">{row.d31}</td>
                  <td className="px-6 py-6 text-center text-foreground/75">{row.d30}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-6 text-xs text-foreground/80 leading-relaxed px-4">
          {isKo
            ? "* 태아와 산모의 질환, 단순변심, 부적응 등은 총 이용금액에서 이용기간에 해당하는 요금을 공제하고 남은 금액에 대하여, 미이용금액의 10%를 공제한 잔액을 환급한다. (단, 이용기간 요금 공제시 할인가가 아닌 정상가로 한다.)"
            : "* For cancellations due to medical reasons, change of mind, or maladjustment, the refund will be calculated by deducting the usage fee from the total amount, and then deducting 10% of the remaining unused amount. (Usage fee is based on regular price, not discounted price.)"}
        </p>
      </section>
    </ScrollReveal>
  );
}
