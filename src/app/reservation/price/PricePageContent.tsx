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
      <header className="text-center space-y-4 mt-12">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary font-playfair italic">
          {isKo ? "이용 요금" : "Price List"}
        </p>
        <h2 className="text-3xl font-semibold text-foreground md:text-4xl font-serif">
          {isKo ? "가격표" : "Price of The Helia"}
        </h2>
        <p className="text-base leading-relaxed text-foreground/70 md:text-lg max-w-2xl mx-auto">
          {isKo
            ? "더헬리아의 모든 프로그램은 산모와 아기를 위한 최상의 케어를 포함하고 있습니다."
            : "All The Helia programmes include premium care for both mother and baby."}
        </p>
      </header>
    </ScrollReveal>
  );
}

function MainPriceSection({ isKo }: { isKo: boolean }) {
  const headers = isKo
    ? ["구분 (2주)", "BABY CARE", "HEAD SPA", "BABY SPA", "보호자 식사", "가슴관리", "기타 혜택", "금액 (만원)"]
    : ["Type (2 Weeks)", "Baby Care", "Head Spa", "Baby Spa", "Partner Meals", "Breast Care", "Benefits", "Price (10k KRW)"];

  const rows = [
    {
      type: "PRESTIGE",
      care: isKo ? "2 : 1\n(신생아실 별도 운영)" : "2 : 1\n(Separate Nursery)",
      headSpa: isKo ? "산모 2회\n보호자 1회" : "Mom 2x\nPartner 1x",
      babySpa: "2회",
      meals: isKo ? "주말 식사 제공 / 12회" : "Weekend Meals / 12x",
      breast: isKo ? "입실 기간 / FREE\n퇴실 이후 / 3회" : "During Stay / FREE\nAfter Stay / 3x",
      benefits: isKo ? "퇴실 (병원 -> 조리원)\n퇴실 후 유축기 무상 대여" : "Transfer Service\nBreast Pump Rental",
      price: "950",
    },
    {
      type: "VVIP",
      care: "3.5 : 1",
      headSpa: isKo ? "산모 1회\n보호자 1회" : "Mom 1x\nPartner 1x",
      babySpa: "1회",
      meals: isKo ? "입실 당일 점심 제공 / 1회\n토요일 특식 점심 제공 / 1회" : "Check-in Lunch / 1x\nSat Special Lunch / 1x",
      breast: isKo ? "입실 기간 / FREE" : "During Stay / FREE",
      benefits: isKo ? "퇴실 후 유축기 무상 대여" : "Breast Pump Rental",
      price: "650",
    },
    {
      type: "VIP",
      care: "3.5 : 1",
      headSpa: isKo ? "산모 1회" : "Mom 1x",
      babySpa: "1회",
      meals: isKo ? "입실 당일 점심 제공 / 1회" : "Check-in Lunch / 1x",
      breast: isKo ? "입실 기간 / FREE" : "During Stay / FREE",
      benefits: isKo ? "퇴실 후 유축기 할인 대여" : "Pump Rental Discount",
      price: "550",
    },
  ];

  return (
    <ScrollReveal>
      <section className="overflow-hidden rounded-3xl border border-border/40 bg-white/80 dark:bg-[#2A2928]/60 backdrop-blur-md shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-sm md:text-base">
            <thead className="bg-primary/10 dark:bg-[#333231] text-primary/90 dark:text-primary/90">
              <tr>
                {headers.map((header, i) => (
                  <th key={i} className="px-6 py-4 font-serif font-semibold whitespace-nowrap text-center first:text-left">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {rows.map((row) => (
                <tr key={row.type} className="hover:bg-primary/5 dark:hover:bg-[#333231]/50 transition-colors">
                  <td className="px-6 py-6 font-serif font-semibold text-primary">{row.type}</td>
                  <td className="px-6 py-6 text-center whitespace-pre-line text-foreground/80">{row.care}</td>
                  <td className="px-6 py-6 text-center whitespace-pre-line text-foreground/80">{row.headSpa}</td>
                  <td className="px-6 py-6 text-center text-foreground/80">{row.babySpa}</td>
                  <td className="px-6 py-6 text-center whitespace-pre-line text-foreground/80">{row.meals}</td>
                  <td className="px-6 py-6 text-center whitespace-pre-line text-foreground/80">{row.breast}</td>
                  <td className="px-6 py-6 text-center whitespace-pre-line text-foreground/80">{row.benefits}</td>
                  <td className="px-6 py-6 text-center font-semibold text-foreground">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-2 px-4 pb-4 text-right text-xs text-primary/60 md:hidden">
          {isKo ? "* 좌우로 스크롤하여 확인하실 수 있습니다." : "* Scroll horizontally to view more."}
        </div>
      </section>
    </ScrollReveal>
  );
}

function PromotionSection({ isKo }: { isKo: boolean }) {
  const promotions = isKo
    ? [
        "당일 할인 이벤트로 기간 한정으로 20만원 할인 프로모션을 진행합니다. (* 조기 마감될 수 있습니다.)",
        "제왕둔 검사 할인 이벤트로 기간 한정 10만원 할인 프로모션을 진행합니다. (* 조기 마감될 수 있습니다.)",
        "당일 할인 및 재방문 감사 할인 이벤트는 2주 입실 예약에 한하여 적용됩니다.",
        "SPA는 2주 입실 기준 총 4회 제공(산전 2회, 산후 2회 회당 60분)됩니다. (* Prestige, VVIP, VIP 객실 모두 동일하게 적용됩니다.)",
        "Prestige 객실 예약 산모님들께는 의전 서비스 (병원->조리원) 1회 제공합니다.",
        "Prestige, VVIP 객실 예약 산모님들께는 메델라 유축기 2주 무상 대여 진행합니다. (* 유축기 재고 현황에 따라 선착순으로 진행합니다.)",
      ]
    : [
        "Limited time promotion: 200,000 KRW discount for same-day booking. (* May close early)",
        "C-section check-up event: 100,000 KRW discount for limited time. (* May close early)",
        "Same-day & Re-visit discounts apply only to 2-week bookings.",
        "SPA: Total 4 sessions (2 pre-natal, 2 post-natal, 60 mins each) for 2-week stays. (* Applies to all room types)",
        "Prestige booking includes 1-time transfer service (Hospital -> Center).",
        "Prestige & VVIP bookings include 2-week free Medela breast pump rental. (* Subject to availability)",
      ];

  const notes = isKo
    ? [
        "식사 (1일 3식), 간식 (1일 3회)",
        "보호자 식사: 15,000원 / 1식",
        "PRESTIGE 객실의 보호자 식사는 주말 3식 모두 제공됩니다. (아침, 점심, 저녁)",
        "동이추가: 90만원 / 1주",
        "BABY SPA 추가: 15만원 / 1회",
        "HEAD SPA 추가: 10만원 / 1회",
        "신생아 케어, 산모 케어, 청소, 세탁, 산모/보호자교육 등이 포함되며, 기타 편의시설이 제공됩니다.",
        "위 가격표는 스파와 바디케어가 포함된 2주 기준 이용 금액으로 입실 기간에 따라 금액 및 서비스가 변경될 수 있습니다.",
        "무료로 제공되는 보호자 식사는 변경이 불가합니다.",
      ]
    : [
        "Meals (3/day), Snacks (3/day)",
        "Partner Meal: 15,000 KRW / meal",
        "Prestige Partner Meals: All 3 weekend meals provided (Breakfast, Lunch, Dinner)",
        "Twin Surcharge: 900,000 KRW / week",
        "Baby Spa Add-on: 150,000 KRW / session",
        "Head Spa Add-on: 100,000 KRW / session",
        "Includes newborn care, mother care, cleaning, laundry, education, and amenities.",
        "Prices are based on a 2-week stay including spa/body care; rates/services may vary by duration.",
        "Complimentary partner meals cannot be exchanged.",
      ];

  return (
    <ScrollReveal>
      <section className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-primary/20 bg-primary/10 dark:bg-[#2A2928]/40 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold font-serif text-primary">
              {isKo ? "프로모션" : "Promotions"}
            </h3>
          </div>
          <ul className="space-y-4">
            {promotions.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/80">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-border/40 bg-white/80 dark:bg-[#2A2928]/60 backdrop-blur-md p-8">
          <h3 className="text-xl font-semibold font-serif text-foreground mb-6">
            {isKo ? "이용 안내" : "Service Details"}
          </h3>
          <ul className="space-y-3">
            {notes.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/70">
                <Check className="h-4 w-4 text-primary/60 mt-0.5 flex-shrink-0" />
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
    <div className="space-y-12">
      <ScrollReveal>
        <section>
          <h3 className="text-xl font-semibold font-serif text-foreground mb-6 flex items-center gap-2">
            <span className="h-6 w-1 bg-primary rounded-full" />
            {isKo ? "객실 요금 상세" : "Room Rates Detail"}
          </h3>
          <div className="overflow-hidden rounded-3xl border border-border/30 bg-white/60 dark:bg-[#2A2928]/60 backdrop-blur-md shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm md:text-base">
                <thead className="bg-primary/5 dark:bg-[#333231] text-primary/80 dark:text-primary/90">
                  <tr>
                    {roomHeaders.map((h, i) => (
                      <th key={i} className="px-6 py-4 font-serif font-semibold text-center first:text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {roomRows.map((row) => (
                    <tr key={row.type} className="hover:bg-primary/5 dark:hover:bg-[#333231]/50 transition-colors">
                      <td className="px-6 py-4 font-serif font-semibold text-primary">{row.type}</td>
                      <td className="px-6 py-4 text-center text-foreground/80">{row.w1}</td>
                      <td className="px-6 py-4 text-center text-foreground/80">{row.d10}</td>
                      <td className="px-6 py-4 text-center text-foreground/80">{row.w2}</td>
                      <td className="px-6 py-4 text-center text-foreground/80">{row.w3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-2 px-4 pb-4 text-right text-xs text-primary/60 md:hidden">
              {isKo ? "* 좌우로 스크롤하여 확인하실 수 있습니다." : "* Scroll horizontally to view more."}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section>
          <h3 className="text-xl font-semibold font-serif text-foreground mb-6 flex items-center gap-2">
            <span className="h-6 w-1 bg-primary rounded-full" />
            {isKo ? "스파 요금 상세" : "Spa Rates Detail"}
          </h3>
          <div className="overflow-hidden rounded-3xl border border-border/30 bg-white/60 dark:bg-[#2A2928]/60 backdrop-blur-md shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm md:text-base">
                <thead className="bg-primary/5 dark:bg-[#333231] text-primary/80 dark:text-primary/90">
                  <tr>
                    {spaHeaders.map((h, i) => (
                      <th key={i} className="px-6 py-4 font-serif font-semibold text-center first:text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {spaRows.map((row) => (
                    <tr key={row.type} className="hover:bg-primary/5 dark:hover:bg-[#333231]/50 transition-colors">
                      <td className="px-6 py-4 font-serif font-semibold text-primary">{row.type}</td>
                      <td className="px-6 py-4 text-center text-foreground/80">{row.reg}</td>
                      <td className="px-6 py-4 text-center text-foreground/80">{row.pkg}</td>
                      <td className="px-6 py-4 text-center text-foreground/80">{row.pre}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-2 px-4 pb-4 text-right text-xs text-primary/60 md:hidden">
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
      <section>
        <h3 className="text-xl font-semibold font-serif text-foreground mb-6 flex items-center gap-2">
          <span className="h-6 w-1 bg-primary rounded-full" />
          {isKo ? "환불 규정" : "Refund Policy"}
        </h3>
        <div className="overflow-hidden rounded-3xl border border-border/40 bg-white/80 dark:bg-[#2A2928]/60 backdrop-blur-md shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm md:text-base">
              <thead className="bg-primary/10 dark:bg-[#333231] text-primary/90 dark:text-primary/90">
                <tr>
                  {headers.map((h, i) => (
                    <th key={i} className="px-6 py-4 font-serif font-semibold text-center first:text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                <tr className="hover:bg-primary/5 dark:hover:bg-[#333231]/50 transition-colors">
                  <td className="px-6 py-6 font-serif font-semibold text-primary">{row.type}</td>
                  <td className="px-6 py-6 text-center text-foreground/80">{row.d31}</td>
                  <td className="px-6 py-6 text-center text-foreground/80">{row.d21}</td>
                  <td className="px-6 py-6 text-center text-foreground/80">{row.d10}</td>
                  <td className="px-6 py-6 text-center text-foreground/80">{row.d9}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-2 px-4 pb-4 text-right text-xs text-primary/60 md:hidden">
            {isKo ? "* 좌우로 스크롤하여 확인하실 수 있습니다." : "* Scroll horizontally to view more."}
          </div>
        </div>
        <p className="mt-4 text-xs text-foreground/60 leading-relaxed">
          {isKo
            ? "* 태아와 산모의 질환, 단순변심, 부적응 등은 총 이용금액에서 이용기간에 해당하는 요금을 공제하고 남은 금액에 대하여, 미이용금액의 10%를 공제한 잔액을 환급한다. (단, 이용기간 요금 공제시 할인가가 아닌 정상가로 한다.)"
            : "* For cancellations due to medical reasons, change of mind, or maladjustment, the refund will be calculated by deducting the usage fee from the total amount, and then deducting 10% of the remaining unused amount. (Usage fee is based on regular price, not discounted price.)"}
        </p>
      </section>
    </ScrollReveal>
  );
}
