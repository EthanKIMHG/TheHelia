"use client";

import {
  CalendarClock,
  CarFrontIcon,
  MapPinIcon,
  PhoneCall,
  TrainFrontIcon,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/components/header/types";
import { LocationContent } from "./LocationContent";


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
    <div className="space-y-12">
      <LocationHeroSection locale={locale} />
      <LocationContent locale={locale} />
    </div>
  );
}

function LocationHeroSection({ locale }: { locale: Locale }) {
  const content = getHeroContent(locale);

  return (
    <section className="overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-background via-background/95 to-background mt-12">
      <div className="grid gap-10 p-8 lg:grid-cols-[1.3fr_0.7fr] lg:p-12">
        <div className="flex flex-col gap-6 justify-center">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              {content.badge}
            </p>
            <h2 className="text-2xl font-semibold leading-tight text-secondary md:text-3xl">
              {content.title}
            </h2>
            <p className="text-lg leading-relaxed text-secondary/75 md:text-xl">
              {content.subtitle}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-primary/40 bg-primary px-6 py-3 text-base font-semibold text-background transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {content.buttonLabel}
            </a>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {content.highlights.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border border-border/40 bg-background/95 p-3 shadow-sm"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <item.Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-primary/80">
                    {item.label}
                  </p>
                  <p className="text-lg font-semibold text-secondary">
                    {item.value}
                  </p>
                  <p className="text-xs text-secondary/65">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-3xl border border-border/40">
            <iframe
              title="The Helia Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.8384058135257!2d126.95109607716499!3d37.275258840774896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x277bcbed795ddd7%3A0xad9cdb91d0fde45f!2z642U7Zes66as7JWEIOyCsO2bhOyhsOumrOybkA!5e0!3m2!1sko!2sus!4v1760246577990!5m2!1sko!2sus"
              loading="lazy"
              className="h-56 w-full md:h-56"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            
          </div>
        </div>

        <div className="grid gap-4">
          {content.cards.map((card) => (
            <article
              key={card.id}
              className="flex flex-col gap-2 rounded-3xl border border-border/40 bg-background/90 p-4 shadow-sm h-fit"
            >
              <div className="flex items-center gap-3 text-secondary">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <card.Icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-sm font-semibold tracking-[0.05em]">
                  {card.title}
                </p>
              </div>
              <div className="text-lg font-semibold leading-relaxed text-secondary">
                {renderMultiline(card.value)}
              </div>
              <p className="text-sm leading-relaxed text-secondary/65">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
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
      label: isKo ? "예약 문의" : "Reservation",
      value: "010-5077-3962",
      description: isKo
        ? "카카오톡 THEHELIA 로도 상담 가능합니다."
        : "Also available via KakaoTalk THEHELIA.",
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
        ? "수인분당선 고색역 2번 출구 도보 8분"
        : "8-min walk from Gosaek Station Exit 2",
      description: isKo
        ? "버스 13-1, 64-2, 200번 이용 시 ‘금곡동 주민센터’ 정류장에서 하차 후 도보 3분."
        : "Buses 13-1, 64-2, 200 → alight at 'Geumgok-dong Community Center' and walk 3 minutes.",
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
    buttonLabel: isKo ? "방문 예약 하기" : "Book a Visit",
    highlights,
    cards,
  };
}
