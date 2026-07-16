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
        <div className="eyebrow">
          {isKo ? "2025 프로모션" : "2025 Promotion"}
        </div>
        <h2 className="break-keep font-display-serif text-4xl font-normal leading-[1.4] text-foreground md:text-5xl">
          {isKo ? (
            <>
              Premium <span className="text-primary italic">Recovery</span>
            </>
          ) : (
             <>
              Premium <span className="text-primary italic">Recovery</span>
            </>
          )}
        </h2>
        <p className="mx-auto max-w-[30ch] break-keep text-lg leading-[1.85] text-secondary md:max-w-2xl md:text-xl">
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
        <div className="md:hidden space-y-6">
          <div className="border-t border-border pt-6 text-center">
            <p className="eyebrow">
              {isKo ? "Room Price" : "Room Price"}
            </p>
            <h3 className="mt-3 break-keep font-display-serif text-2xl font-normal leading-[1.4] text-foreground">
              {isKo ? "2주 기준 객실 요금" : "2-Week Room Rates"}
            </h3>
            <p className="mx-auto mt-2 max-w-[28ch] break-keep text-sm leading-[1.85] text-secondary">
              {isKo
                ? "등급별 금액과 핵심 차이만 간단히 정리했습니다."
                : "A simple summary of rates and key differences."}
            </p>
          </div>

          <div className="space-y-4">
            {plans.map((plan) => {
              const isVVIP = plan.highlight;
              const highlights = [
                { label: isKo ? "신생아 케어" : "Baby Care", value: plan.quickCompare.babyCare },
                { label: isKo ? "헤드스파" : "Head Spa", value: plan.quickCompare.headSpa },
                { label: isKo ? "대표 혜택" : "Key Benefit", value: plan.quickCompare.special },
              ];

              return (
                <article
                  key={plan.type}
                  className={`border bg-background p-5 ${
                    isVVIP ? "border-foreground/40" : "border-border"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                        {plan.type}
                      </p>
                      <p className="mt-2 break-keep text-sm leading-[1.85] text-secondary">
                        {plan.desc}
                      </p>
                    </div>
                    {isVVIP ? (
                      <span className="shrink-0 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-foreground">
                        {isKo ? "추천" : "Popular"}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-5 flex items-end gap-2">
                    <p className="font-display-serif text-[2.4rem] font-normal leading-none tabular-nums text-foreground">
                      {plan.mobilePriceLabel}
                    </p>
                    <p className="pb-1 text-xs text-secondary">
                      {isKo ? "/ 2주" : "/ 2w"}
                    </p>
                  </div>

                  <dl className="mt-5">
                    {highlights.map((item) => (
                      <div
                        key={`${plan.type}-${item.label}`}
                        className="flex items-center justify-between gap-4 border-b border-border py-2.5"
                      >
                        <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                          {item.label}
                        </dt>
                        <dd className="max-w-[58%] break-keep text-right text-sm leading-snug text-foreground/80">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </article>
              );
            })}
          </div>

          <Link href={`/${isKo ? "ko" : "en"}/reservation`} className="block w-full bg-foreground py-4 text-center font-sans text-sm font-semibold tracking-wide text-background transition-opacity hover:opacity-90">
            {isKo ? "상담 예약하기" : "Book Now"}
          </Link>
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => {
            const isVVIP = plan.highlight;

            return (
              <div
                key={plan.type}
                className={`relative flex flex-col border bg-background p-8 transition-colors duration-500 md:p-10
                  ${isVVIP ? "border-foreground/40" : "border-border hover:border-foreground/30"}
                `}
              >
                {plan.tag && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="flex items-center gap-1.5 bg-background px-4 font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                      <Sparkles className="h-3 w-3" strokeWidth={1.5} />
                      {plan.tag}
                    </span>
                  </div>
                )}

                <div className="mb-10">
                  <h3 className="mb-3 font-display-serif text-3xl font-normal text-foreground">
                    {plan.type}
                  </h3>
                  <p className="mb-8 text-sm leading-[1.85] text-secondary">
                    {plan.desc}
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display-serif text-4xl font-normal tabular-nums text-foreground">
                      {plan.price}
                    </span>
                    <span className="text-base text-secondary">
                      {isKo ? "만원" : "0k KRW"}
                      <span className="text-xs ml-1 font-normal opacity-70">
                        {isKo ? "/ 2주" : "/ 2w"}
                      </span>
                    </span>
                  </div>
                </div>

                <ul className="mb-10 flex-1 space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />
                      <span className="text-foreground/80">
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border pt-6">
                  <Link href={`/${isKo ? "ko" : "en"}/reservation`} className="block w-full">
                    <button className={`w-full py-4 font-sans text-sm font-semibold tracking-wide transition-all duration-300
                      ${isVVIP
                        ? "bg-foreground text-background hover:opacity-90"
                        : "border border-foreground/30 bg-background text-foreground hover:border-foreground"
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
        "당일 할인 이벤트: 20만원 할인 (매월 선착순 한정)",
        "재방문 감사 할인: 10만원 할인",
        "SPA: 산전 2회 + 산후 2회 (총 4회/60분)",
        "Prestige & VVIP: 메델라 유축기 2주 무상 대여 (2주 이상 예약시)",
      ]
    : [
        "Same-Day Reservation Benefit: ₩200,000 discount (Limited availability each month)",
        "Returning Guest Benefit: ₩100,000 discount",
        "SPA Benefit: 2 prenatal + 2 postnatal spa sessions (4 sessions total, 60 minutes each)",
        "Prestige & VVIP Benefit: Complimentary 2-week rental of a Medela breast pump (for reservations of 2 weeks or longer)",
      ];

  const notes = isKo
    ? [
        "식사 (1일 3식) 및 간식 (1일 3회) 제공",
        "보호자 식사: 20,000원 / 1식",
        "쌍둥이 추가 비용: 90만원 / 1주",
        "BABY SPA 추가: 15만원 / HEAD SPA 추가: 10만원",
        "포함: 신생아/산모 케어, 청소/세탁, 교육 프로그램",
        "입실 기간에 따라 금액 및 서비스가 변동될 수 있습니다.",
      ]
    : [
        "Meals (3/day) & Snacks (3/day) included",
        "Partner Meal: 20,000 KRW / meal",
        "Twin Surcharge: 900,000 KRW / week",
        "Add-ons: Baby Spa 150k / Head Spa 100k",
        "Includes: Care, Cleaning, Laundry, Education",
        "Rates/Services may vary by stay duration.",
      ];

  return (
    <ScrollReveal>
      <section className="grid gap-x-10 gap-y-12 md:grid-cols-2 max-w-7xl mx-auto">
        <div className="border-t border-border pt-6">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <span className="eyebrow mb-3 block">Benefit</span>
              <h3 className="font-display-serif text-2xl font-normal leading-[1.4] text-foreground">
                {isKo ? "프로모션 & 혜택" : "Special Promotions"}
              </h3>
            </div>
            <Sparkles className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} />
          </div>
          <ul>
            {promotions.map((item, i) => (
              <li key={i} className="flex items-center gap-3 border-b border-border py-3 text-[15px] leading-relaxed text-foreground/80">
                <span className="h-px w-3 flex-shrink-0 bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-border pt-6">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <span className="eyebrow mb-3 block">Check List</span>
              <h3 className="font-display-serif text-2xl font-normal leading-[1.4] text-foreground">
                {isKo ? "이용 안내" : "Service Details"}
              </h3>
            </div>
            <Check className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} />
          </div>
          <ul>
            {notes.map((item, i) => (
              <li key={i} className="flex items-start gap-3 border-b border-border py-3 text-[15px] leading-relaxed text-foreground/80">
                <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" strokeWidth={1.5} />
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
    { type: "PRESTIGE", w1: "715", d10: "885", w2: "950", w3: "1520" },
    { type: "VVIP", w1: "490", d10: "605", w2: "650", w3: "1040" },
    { type: "VIP", w1: "415", d10: "515", w2: "550", w3: "880" },
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
          <div className="mb-8 border-t border-border pt-6">
            <h3 className="font-display-serif text-2xl font-normal leading-[1.4] text-foreground">
              {isKo ? "객실 요금 상세" : "Room Rates Detail"}
            </h3>
          </div>
          <div>
            <div className="md:hidden space-y-4">
              {roomRows.map((row) => (
                <article key={row.type} className="border border-border bg-background p-4">
                  <div className="mb-3 flex items-center justify-between border-b border-border pb-3">
                    <h4 className="font-display-serif text-lg font-normal text-foreground">{row.type}</h4>
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                      {isKo ? "객실" : "Room"}
                    </span>
                  </div>
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-2">
                    {roomMobileFields.map((field) => {
                      const value = row[field.key as keyof typeof row];
                      return (
                        <div key={`${row.type}-${field.key}`} className="border-b border-border py-2">
                          <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">{field.label}</dt>
                          <dd className="mt-1 font-display-serif text-sm tabular-nums text-foreground">
                            {value}
                            <span className="ml-1 font-sans text-[11px] text-secondary">
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

            <div className="hidden md:block overflow-x-auto border-y border-border">
              <table className="w-full min-w-[600px] text-sm md:text-base border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    {roomHeaders.map((h, i) => (
                      <th key={i} className="px-6 py-4 font-sans text-[10px] tracking-[0.24em] uppercase font-semibold text-primary text-center first:text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {roomRows.map((row) => (
                    <tr key={row.type}>
                      <td className="px-6 py-6 font-display-serif text-lg font-normal text-foreground">{row.type}</td>
                      <td className="px-6 py-6 text-center font-display-serif tabular-nums text-foreground/70">{row.w1}</td>
                      <td className="px-6 py-6 text-center font-display-serif tabular-nums text-foreground/70">{row.d10}</td>
                      <td className="px-6 py-6 text-center font-display-serif tabular-nums text-foreground">{row.w2}</td>
                      <td className="px-6 py-6 text-center font-display-serif tabular-nums text-foreground/70">{row.w3}</td>
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
          <div className="mb-8 border-t border-border pt-6">
            <h3 className="font-display-serif text-2xl font-normal leading-[1.4] text-foreground">
              {isKo ? "스파 요금 상세" : "Spa Rates Detail"}
            </h3>
          </div>
          <div>
            <div className="md:hidden space-y-4">
              {spaRows.map((row) => (
                <article key={row.type} className="border border-border bg-background p-4">
                  <h4 className="mb-3 border-b border-border pb-3 font-display-serif text-lg font-normal text-foreground">{row.type}</h4>
                  <dl>
                    {spaMobileFields.map((field) => {
                      const value = row[field.key as keyof typeof row];
                      const isRegular = field.key === "reg";
                      const isPreBooking = field.key === "pre";
                      return (
                        <div key={`${row.type}-${field.key}`} className="flex items-center justify-between gap-3 border-b border-border py-2.5">
                          <dt className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">{field.label}</dt>
                          <dd className={`text-right text-[15px] leading-snug tabular-nums ${isPreBooking ? "font-display-serif text-foreground" : isRegular ? "text-secondary line-through decoration-border" : "text-foreground/80"}`}>
                            {value}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </article>
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto border-y border-border">
              <table className="w-full min-w-[600px] text-sm md:text-base border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    {spaHeaders.map((h, i) => (
                      <th key={i} className="px-6 py-4 font-sans text-[10px] tracking-[0.24em] uppercase font-semibold text-primary text-center first:text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {spaRows.map((row) => (
                    <tr key={row.type}>
                      <td className="px-6 py-6 font-display-serif text-lg font-normal text-foreground">{row.type}</td>
                      <td className="px-6 py-6 text-center tabular-nums text-secondary line-through decoration-border">{row.reg}</td>
                      <td className="px-6 py-6 text-center tabular-nums text-foreground/80">{row.pkg}</td>
                      <td className="px-6 py-6 text-center font-display-serif text-lg tabular-nums text-foreground">{row.pre}</td>
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
      tone: "border-foreground/40 text-foreground",
    },
    {
      period: isKo ? "61일 ~ 90일" : "61-90 Days",
      value: row.d61,
      tone: "border-border text-foreground/90",
    },
    {
      period: isKo ? "31일 ~ 60일" : "31-60 Days",
      value: row.d31,
      tone: "border-border text-foreground/85",
    },
    {
      period: isKo ? "30일 이내" : "30 Days or Less",
      value: row.d30,
      tone: "border-border text-foreground/80",
    },
  ];

  return (
    <ScrollReveal>
      <section className="mb-20">
        <div className="mb-8 border-t border-border pt-6">
            <h3 className="font-display-serif text-2xl font-normal leading-[1.4] text-foreground">
            {isKo ? "환불 규정" : "Refund Policy"}
            </h3>
        </div>
        <div>
          <div className="md:hidden">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">{isKo ? "기준" : "Basis"}</span>
              <span className="font-display-serif text-base font-normal text-foreground">{row.type}</span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {mobileRefundCards.map((card) => (
                <article key={card.period} className={`border bg-background p-3 ${card.tone}`}>
                  <p className="font-sans text-[11px] font-semibold text-secondary">{card.period}</p>
                  <p className="mt-1.5 font-display-serif text-base leading-tight tabular-nums">{card.value}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="hidden md:block overflow-x-auto border-y border-border">
            <table className="w-full min-w-[600px] text-sm md:text-base border-collapse">
              <thead>
                <tr className="border-b border-border">
                  {headers.map((h, i) => (
                    <th key={i} className="px-6 py-4 font-sans text-[10px] tracking-[0.24em] uppercase font-semibold text-primary text-center first:text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-6 py-6 font-display-serif text-lg font-normal text-foreground">{row.type}</td>
                  <td className="px-6 py-6 text-center tabular-nums text-foreground">{row.d91}</td>
                  <td className="px-6 py-6 text-center tabular-nums text-foreground/80">{row.d61}</td>
                  <td className="px-6 py-6 text-center tabular-nums text-foreground/80">{row.d31}</td>
                  <td className="px-6 py-6 text-center tabular-nums text-foreground/70">{row.d30}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="mt-6 text-xs leading-[1.85] text-secondary">
          {isKo
            ? "* 태아와 산모의 질환, 단순변심, 부적응 등은 총 이용금액에서 이용기간에 해당하는 요금을 공제하고 남은 금액에 대하여, 미이용금액의 10%를 공제한 잔액을 환급한다. (단, 이용기간 요금 공제시 할인가가 아닌 정상가로 한다.)"
            : "* For cancellations due to medical reasons, change of mind, or maladjustment, the refund will be calculated by deducting the usage fee from the total amount, and then deducting 10% of the remaining unused amount. (Usage fee is based on regular price, not discounted price.)"}
        </p>
      </section>
    </ScrollReveal>
  );
}
