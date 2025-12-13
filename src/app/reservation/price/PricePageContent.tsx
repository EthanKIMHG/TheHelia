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
    <div className="space-y-24 pb-20">
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
      <header className="text-center space-y-6 mt-16 mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          {isKo ? "2025 프로모션" : "2025 Promotion"}
        </div>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground font-serif leading-tight tracking-tight">
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
        <p className="text-lg md:text-xl leading-relaxed text-stone-500 dark:text-stone-400 max-w-2xl mx-auto font-medium">
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
      desc: isKo ? "합리적인 가격의 프리미엄 케어" : "Rational Premium Care",
      features: [
        { label: isKo ? "신생아 케어 3.5 : 1" : "Baby Care 3.5 : 1", included: true },
        { label: isKo ? "산모 헤드스파 1회" : "Mother Head Spa 1x", included: true },
        { label: isKo ? "보호자 식사 (입실 당일 1회)" : "Partner Meal (Check-in 1x)", included: true },
        { label: isKo ? "베이비 스파 1회" : "Baby Spa 1x", included: true },
        { label: isKo ? "가슴 마사지 (입실 기간 무제한)" : "Breast Care (Unlimited)", included: true },
        { label: isKo ? "퇴실 후 유축기 할인 대여" : "Pump Rental Discount", included: true },
      ],
      highlight: false,
    },
    {
      type: "VVIP",
      price: "650",
      desc: isKo ? "가장 많은 분들이 선택한 베스트" : "Most Popular Choice",
      features: [
        { label: isKo ? "신생아 케어 3.5 : 1" : "Baby Care 3.5 : 1", included: true },
        { label: isKo ? "산모 헤드스파 1회 + 보호자 1회" : "Mother Head Spa 1x + Partner 1x", included: true },
        { label: isKo ? "보호자 식사 2회 (입실/토요일)" : "Partner Meal 2x", included: true },
        { label: isKo ? "베이비 스파 1회" : "Baby Spa 1x", included: true },
        { label: isKo ? "가슴 마사지 (입실 기간 무제한)" : "Breast Care (Unlimited)", included: true },
        { label: isKo ? "퇴실 후 유축기 무상 대여" : "Free Pump Rental", included: true },
      ],
      highlight: true,
      tag: isKo ? "MOST POPULAR" : "MOST POPULAR",
    },
    {
      type: "PRESTIGE",
      price: "950",
      desc: isKo ? "압도적인 럭셔리와 프라이빗 케어" : "Overwhelming Luxury & Private Care",
      features: [
        { label: isKo ? "신생아 케어 2 : 1 (단독 신생아실)" : "Baby Care 2 : 1 (Private Room)", included: true },
        { label: isKo ? "산모 헤드스파 2회 + 보호자 1회" : "Mother Head Spa 2x + Partner 1x", included: true },
        { label: isKo ? "보호자 주말 식사 전체 제공" : "Partner Meal (All Weekends)", included: true },
        { label: isKo ? "베이비 스파 2회" : "Baby Spa 2x", included: true },
        { label: isKo ? "가슴 관리 퇴실 후 3회 추가" : "Breast Care (+3x After)", included: true },
        { label: isKo ? "병원 → 조리원 리무진 의전" : "Limousine Service", included: true },
      ],
      highlight: false,
      isPremium: true
    },
  ];

  return (
    <ScrollReveal>
      <section className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto px-4 md:px-0">
        {plans.map((plan) => {
          // Color Logic based on User Image
          const isPrestige = plan.isPremium;
          const isVVIP = plan.highlight;
          const isVIP = !isPrestige && !isVVIP;

          return (
            <div 
              key={plan.type} 
              className={`group relative rounded-[2.5rem] p-8 md:p-10 flex flex-col transition-all duration-500
                ${isVVIP 
                  ? 'bg-[#FAF9F6] border-2 border-[#D4C3B3] shadow-2xl shadow-[#D4C3B3]/20 z-10 md:scale-105' 
                  : isPrestige
                    ? 'bg-[#1C1C1C] text-white border border-white/5 shadow-xl'
                    : 'bg-white border border-stone-200 shadow-lg hover:border-[#D4C3B3]/50'
                }
              `}
            >
              {plan.tag && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <span className="bg-[#A48F79] text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-md uppercase tracking-widest flex items-center gap-1">
                     <Sparkles className="w-3 h-3 fill-white" />
                     {plan.tag}
                   </span>
                </div>
              )}
              
              <div className="mb-10">
                <h3 className={`font-serif text-3xl font-bold mb-3 ${isPrestige ? 'text-white' : 'text-[#2C2C2C]'}`}>
                  {plan.type}
                </h3>
                <p className={`text-sm mb-8 font-medium ${isPrestige ? 'text-white/60' : 'text-[#888888]'}`}>
                  {plan.desc}
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-5xl font-bold font-serif tracking-tight ${isPrestige ? 'text-white' : 'text-[#2C2C2C]'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-base font-medium ${isPrestige ? 'text-white/60' : 'text-[#888888]'}`}>
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
                        ? 'bg-white/10 text-white' 
                        : isVVIP 
                          ? 'bg-[#A48F79]/10 text-[#A48F79]' 
                          : 'bg-stone-100 text-stone-400'
                      }
                    `}>
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className={`font-medium ${isPrestige ? 'text-white/80' : 'text-[#555555]'}`}>
                      {feature.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-dashed"
                   style={{ borderColor: isPrestige ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)" }}
              >
                 <Link href={`/${isKo ? 'ko' : 'en'}/reservation`} className="block w-full">
                   <button className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300
                     ${isPrestige
                       ? 'bg-white text-black hover:bg-stone-200'
                       : isVVIP
                         ? 'bg-[#A48F79] text-white hover:bg-[#8C7B6D] shadow-lg shadow-[#A48F79]/30'
                         : 'bg-[#F5F5F5] text-[#666666] hover:bg-[#EAEAEA]'
                     }
                   `}>
                     {isKo ? "상담 예약하기" : "Book Now"}
                   </button>
                 </Link>
              </div>
            </div>
          );
        })}
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
        <div className="group rounded-[2.5rem] border border-stone-200/60 dark:border-white/5 bg-white/60 dark:bg-[#2A2928]/60 backdrop-blur-xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
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
              <li key={i} className="flex items-start gap-4 text-[15px] leading-relaxed text-stone-600 dark:text-stone-300 group/item">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/40 group-hover/item:bg-primary transition-colors" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="group rounded-[2.5rem] border border-stone-200/60 dark:border-white/5 bg-white/40 dark:bg-[#2A2928]/40 backdrop-blur-md p-8 md:p-10 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-500">
               <Check className="h-6 w-6" />
            </div>
            <div>
              <span className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">Check List</span>
              <h3 className="text-2xl font-bold font-serif text-foreground">
                {isKo ? "이용 안내" : "Service Details"}
              </h3>
            </div>
          </div>
          <ul className="space-y-4">
            {notes.map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-[15px] leading-relaxed text-stone-600 dark:text-stone-300">
                <Check className="h-4 w-4 text-stone-400 mt-1 flex-shrink-0" />
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
    ? ["구분", "정상가 (만원)", "Package 할인가 (만원)", "산전 예약 할인가 (만원)"]
    : ["Course", "Regular Price", "Package Discount", "Pre-booking Discount"];

  const spaRows = [
    { type: "PRESTIGE Course", reg: "320", pkg: "288 (-10%)", pre: "267 (-10% Add)" },
    { type: "VIP Course", reg: "300", pkg: "270 (-10%)", pre: "243 (-10% Add)" },
    { type: "A Course", reg: "250", pkg: "225 (-10%)", pre: "198 (-10% Add)" },
    { type: "B Course", reg: "195", pkg: "175 (-10%)", pre: "158 (-10% Add)" },
    { type: "C Course", reg: "140", pkg: "126 (-10%)", pre: "-" },
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
          <div className="overflow-hidden rounded-[2.5rem] border border-stone-200/60 dark:border-white/5 bg-white/60 dark:bg-[#2A2928]/60 backdrop-blur-xl shadow-sm">
            <div className="overflow-x-auto p-4 md:p-6">
              <table className="w-full min-w-[600px] text-sm md:text-base border-collapse">
                <thead className="bg-stone-50/50 dark:bg-white/5 rounded-xl">
                  <tr>
                    {roomHeaders.map((h, i) => (
                      <th key={i} className="px-6 py-5 font-serif font-bold text-stone-600 dark:text-stone-300 text-center first:text-left first:rounded-l-xl last:rounded-r-xl">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-white/5">
                  {roomRows.map((row) => (
                    <tr key={row.type} className="hover:bg-primary/5 dark:hover:bg-[#333231]/50 transition-colors group">
                      <td className="px-6 py-6 font-serif font-bold text-primary text-lg">{row.type}</td>
                      <td className="px-6 py-6 text-center text-stone-600 dark:text-stone-300 group-hover:text-foreground transition-colors">{row.w1}</td>
                      <td className="px-6 py-6 text-center text-stone-600 dark:text-stone-300 group-hover:text-foreground transition-colors">{row.d10}</td>
                      <td className="px-6 py-6 text-center font-bold text-foreground">{row.w2}</td>
                      <td className="px-6 py-6 text-center text-stone-600 dark:text-stone-300 group-hover:text-foreground transition-colors">{row.w3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-8 pb-6 text-right text-xs text-primary/60 md:hidden font-medium">
              {isKo ? "* 좌우로 스크롤하여 확인하실 수 있습니다." : "* Scroll horizontally to view more."}
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
          <div className="overflow-hidden rounded-[2.5rem] border border-stone-200/60 dark:border-white/5 bg-white/60 dark:bg-[#2A2928]/60 backdrop-blur-xl shadow-sm">
            <div className="overflow-x-auto p-4 md:p-6">
              <table className="w-full min-w-[600px] text-sm md:text-base border-collapse">
                <thead className="bg-stone-50/50 dark:bg-white/5 rounded-xl">
                  <tr>
                    {spaHeaders.map((h, i) => (
                      <th key={i} className="px-6 py-5 font-serif font-bold text-stone-600 dark:text-stone-300 text-center first:text-left first:rounded-l-xl last:rounded-r-xl">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-white/5">
                  {spaRows.map((row) => (
                    <tr key={row.type} className="hover:bg-primary/5 dark:hover:bg-[#333231]/50 transition-colors group">
                      <td className="px-6 py-6 font-serif font-bold text-primary text-lg">{row.type}</td>
                      <td className="px-6 py-6 text-center text-stone-400 line-through decoration-stone-400/50 decoration-2">{row.reg}</td>
                      <td className="px-6 py-6 text-center text-stone-600 dark:text-stone-300 group-hover:text-foreground font-medium">{row.pkg}</td>
                      <td className="px-6 py-6 text-center font-bold text-primary text-lg bg-primary/5 rounded-lg m-2 box-decoration-clone">{row.pre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-8 pb-6 text-right text-xs text-primary/60 md:hidden font-medium">
              {isKo ? "* 좌우로 스크롤하여 확인하실 수 있습니다." : "* Scroll horizontally to view more."}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}

function RefundPolicySection({ isKo }: { isKo: boolean }) {
  const headers = isKo
    ? ["구분", "31일 전", "21일 ~ 30일 사이", "10일 ~ 20일 사이", "9일 전"]
    : ["Type", "31+ Days Before", "21-30 Days Before", "10-20 Days Before", "9 Days Before"];

  const row = {
    type: isKo ? "계약금" : "Deposit",
    d31: isKo ? "100% 환급" : "100% Refund",
    d21: isKo ? "60% 환급" : "60% Refund",
    d10: isKo ? "30% 환급" : "30% Refund",
    d9: isKo ? "미환급" : "No Refund",
  };

  return (
    <ScrollReveal>
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8 px-2">
            <span className="h-8 w-1.5 bg-primary rounded-full" />
            <h3 className="text-2xl font-bold font-serif text-foreground">
            {isKo ? "환불 규정" : "Refund Policy"}
            </h3>
        </div>
        <div className="overflow-hidden rounded-[2.5rem] border border-stone-200/60 dark:border-white/5 bg-white/60 dark:bg-[#2A2928]/60 backdrop-blur-xl shadow-sm">
          <div className="overflow-x-auto p-4 md:p-6">
            <table className="w-full min-w-[600px] text-sm md:text-base border-collapse">
              <thead className="bg-stone-50/50 dark:bg-white/5 rounded-xl">
                <tr>
                  {headers.map((h, i) => (
                    <th key={i} className="px-6 py-5 font-serif font-bold text-stone-600 dark:text-stone-300 text-center first:text-left first:rounded-l-xl last:rounded-r-xl">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-white/5">
                <tr className="hover:bg-primary/5 dark:hover:bg-[#333231]/50 transition-colors">
                  <td className="px-6 py-6 font-serif font-bold text-primary">{row.type}</td>
                  <td className="px-6 py-6 text-center text-foreground/80 font-medium">{row.d31}</td>
                  <td className="px-6 py-6 text-center text-foreground/80">{row.d21}</td>
                  <td className="px-6 py-6 text-center text-foreground/80">{row.d10}</td>
                  <td className="px-6 py-6 text-center text-stone-400">{row.d9}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-8 pb-6 text-right text-xs text-primary/60 md:hidden font-medium">
            {isKo ? "* 좌우로 스크롤하여 확인하실 수 있습니다." : "* Scroll horizontally to view more."}
          </div>
        </div>
        <p className="mt-6 text-xs text-stone-400 dark:text-stone-500 leading-relaxed px-4">
          {isKo
            ? "* 태아와 산모의 질환, 단순변심, 부적응 등은 총 이용금액에서 이용기간에 해당하는 요금을 공제하고 남은 금액에 대하여, 미이용금액의 10%를 공제한 잔액을 환급한다. (단, 이용기간 요금 공제시 할인가가 아닌 정상가로 한다.)"
            : "* For cancellations due to medical reasons, change of mind, or maladjustment, the refund will be calculated by deducting the usage fee from the total amount, and then deducting 10% of the remaining unused amount. (Usage fee is based on regular price, not discounted price.)"}
        </p>
      </section>
    </ScrollReveal>
  );
}
