"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import type { Locale } from "@/components/header/types";
import {
    CalendarCheck,
    CalendarClock,
    CarFrontIcon,
    MapPinIcon,
    PhoneCall,
    TrainFrontIcon,
    type LucideIcon,
} from "lucide-react";


const BOOKING_URL =
  "https://booking.naver.com/booking/6/bizes/1021790";

type HeroHighlight = {
  id: string;
  Icon: LucideIcon;
  label: string;
  value: string;
  description: string;
};

type HeroCard = {
  id: string;
  Icon: LucideIcon;
  title: string;
  value: string;
  description: string;
};

type LocationHeroContent = {
  badge: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
  highlights: HeroHighlight[];
  cards: HeroCard[];
};

type LocationPageShowcaseProps = {
  locale: Locale;
};

export function LocationPageShowcase({ locale }: LocationPageShowcaseProps) {
  return (
    <div className="space-y-24 pb-20">
      <LocationHeroSection locale={locale} />
      <LocationMapSection />
      <LocationInfoSection locale={locale} />
    </div>
  );
}

function LocationHeroSection({ locale }: { locale: Locale }) {
  const content = getHeroContent(locale);

  return (
    <ScrollReveal>
    <section className="overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-background via-background/95 to-background mt-12">
      <div className="grid gap-10 p-8 lg:grid-cols-2 lg:p-12 items-center">
        <div className="flex flex-col gap-6 justify-center">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary font-playfair italic">
              {content.badge}
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-secondary md:text-4xl font-serif">
              {content.title}
            </h2>
            <p className="text-lg leading-relaxed text-secondary/75 md:text-xl">
              {content.subtitle}
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 rounded-2xl border border-border/40 bg-white/80 dark:bg-[#2A2928]/60 backdrop-blur-sm p-5 shadow-sm w-full transition hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 dark:bg-[#333231] text-primary">
                <CalendarCheck className="h-6 w-6" />
              </div>
              
              <div className="space-y-1 w-full">
                <p className="text-sm font-semibold text-primary/80 font-serif">
                  {locale === "ko" ? "방문일정 예약하기" : "Book a Visit Schedule"}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-lg font-semibold text-secondary">
                    {locale === "ko" ? "온라인 예약하기" : "Online Reservation"}
                  </p>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-[#00DE5A] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-transform hover:scale-105 hover:bg-[#00c450]"
                  >
                    {content.buttonLabel}
                  </a>
                </div>
              </div>
            </div>
            <p className="text-xs text-secondary/50 px-2">
              {locale === "ko" ? "* 네이버 예약하기 페이지로 이동합니다." : "* Redirects to Naver Reservation page."}
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {content.highlights.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-5 rounded-2xl border border-border/40 bg-white/80 dark:bg-[#2A2928]/60 backdrop-blur-sm p-6 shadow-sm transition hover:bg-white/90 dark:hover:bg-[#2A2928]/80 hover:shadow-md"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 dark:bg-[#333231]">
                <item.Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-primary/80 font-serif">
                  {item.label}
                </p>
                <p className="text-xl font-semibold text-secondary">
                  {item.value}
                </p>
                <p className="text-sm text-secondary/65">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </ScrollReveal>
  );
}

function LocationMapSection() {
  return (
    <ScrollReveal>
      <section className="w-full h-[500px] rounded-3xl overflow-hidden shadow-lg border border-border/30 relative group">
        <iframe
          title="The Helia Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.8384058135257!2d126.95109607716499!3d37.275258840774896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x277bcbed795ddd7%3A0xad9cdb91d0fde45f!2z642U7Zes66as7JWEIOyCsO2bhOyhsOumrOybkA!5e0!3m2!1sko!2sus!4v1760246577990!5m2!1sko!2sus"
          loading="lazy"
          className="h-full w-full grayscale-[20%] transition-all duration-700 group-hover:grayscale-0"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold shadow-sm text-secondary pointer-events-none">
          MS Medical Square 5F-6F
        </div>
      </section>
    </ScrollReveal>
  );
}

function LocationInfoSection({ locale }: { locale: Locale }) {
  const content = getHeroContent(locale);
  
  return (
    <ScrollReveal>
      <section className="grid gap-6 md:grid-cols-3">
        {content.cards.map((card, index) => (
          <article
            key={card.id}
            className={`flex flex-col gap-4 rounded-3xl border border-border/40 bg-white/80 dark:bg-[#2A2928]/60 backdrop-blur-md p-8 shadow-sm transition hover:shadow-lg hover:-translate-y-1 ${
              index === 0 ? "md:col-span-3 md:flex-row md:items-center" : ""
            }`}
          >
            <div className={`flex items-center gap-4 text-secondary ${index === 0 ? "md:w-1/3" : ""}`}>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 dark:bg-[#333231]">
                <card.Icon className="h-7 w-7 text-primary" />
              </div>
              <p className="text-lg font-semibold tracking-[0.05em] font-serif">
                {card.title}
              </p>
            </div>
            <div className={index === 0 ? "md:w-2/3" : ""}>
              <div className="text-xl font-semibold leading-relaxed text-secondary mb-2">
                {renderMultiline(card.value)}
              </div>
              <p className="text-base leading-relaxed text-secondary/65">
                {card.description}
              </p>
            </div>
          </article>
        ))}
      </section>
    </ScrollReveal>
  );
}

function renderMultiline(value: string) {
  return value.split("\n").map((line, index) => (
    <span key={`${line}-${index}`} className="block">
      {line}
    </span>
  ));
}

function getHeroContent(locale: Locale): LocationHeroContent {
  const isKo = locale === "ko";

  const highlights: HeroHighlight[] = [
    
    {
      id: "contact",
      Icon: PhoneCall,
      label: isKo ? "예약 문의" : "Reservation Inquiry",
      value: "010-5077-3962",
      description: isKo
        ? "카카오톡 더헬리아 산후조리원 채널로도 상담 가능합니다."
        : "Also available via KakaoTalk 더헬리아 산후조리원 Plus Channel.",
    },
    {
      id: "hours",
      Icon: CalendarClock,
      label: isKo ? "상담 운영" : "Consultation Hours",
      value: isKo ? "평일 09:00 – 18:00" : "Weekdays 09:00 – 18:00",
      description: isKo
        ? "주말·공휴일은 사전 예약 후 방문해 주세요."
        : "Weekends & holidays by reservation only.",
    },
    
  ];

  const cards: HeroCard[] = [
    {
      id: "address",
      Icon: MapPinIcon,
      title: isKo ? "주소" : "Address",
      value: isKo
        ? "경기도 수원시 권선구 금곡로 197번길 18-39"
        : "18-39 Geumgok-ro 197beon-gil, Gwonseon-gu, Suwon",
      description: isKo
        ? "MS메디컬스퀘어 5·6층 · 5층 안내 데스크에서 등록 후 이동해 주세요."
        : "MS Medical Square 5F-6F · Register at the 5F ground desk before heading up.",
    },
    {
      id: "transit",
      Icon: TrainFrontIcon,
      title: isKo ? "대중교통" : "Transit",
      value: isKo
        ? "홈플러스 서수원점에서 도보 5분 거리"
        : "5-minute walk from HomePlus West Suwon Branch"
        ,
      description: isKo
        ? "버스 13-1, 64-2, 200번 이용 시 ‘금곡동 주민센터’ 정류장에서 하차 후 도보 5분. (2028년 신분당선 개통 예정)"
        : "Buses 13-1, 64-2, 200 → alight at 'Geumgok-dong Community Center' and walk 5 minutes.",
    },
    {
      id: "parking",
      Icon: CarFrontIcon,
      title: isKo ? "주차 안내" : "Parking",
      value: isKo
        ? "MS메디컬스퀘어 지하주차장"
        : "MS Medical Square underground parking",
      description: isKo
        ? "방문 고객 주차권을 제공해 드립니다."
        : "Parking validation provided for visitors.",
    },
  ];

  return {
    badge: isKo ? "방문 예약 안내" : "Visit Reservations",
    title: isKo ? "더헬리아 방문 상담을 예약하세요" : "Plan Your Visit to The Helia",
    subtitle: isKo
      ? "여유로운 상담과 투어를 위해 사전 예약으로 방문 일정을 안내해 드립니다."
      : "Reserve your consultation and tour in advance for a relaxed visit.",
    buttonLabel: isKo ? "네이버 예약 하기" : "Naver Reservation",
    highlights,
    cards,
  };
}
