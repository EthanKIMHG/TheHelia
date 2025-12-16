"use client";

import type { Locale } from "@/components/header/types";
import {
  Building2,
  BusFrontIcon,
  Calendar1Icon,
  CalendarClock,
  CarFrontIcon,
  MapPinIcon,
  PhoneCall,
  TrainFrontIcon,
} from "lucide-react";

type LocationDesignVariantProps = {
  locale: Locale;
};

export function LocationDesignVariantClassic({
  locale,
}: LocationDesignVariantProps) {
  const copy = getLocalizedCopy(locale);

  return (
    <section className="overflow-hidden rounded-3xl border border-border/30 bg-gradient-to-br from-background via-background/85 to-background shadow-lg">
      <div className="space-y-8 p-8 lg:p-10">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-primary">
            {copy.badges.primary}
          </p>
          <h3 className="text-3xl font-semibold text-secondary">
            {copy.headings.arrival}
          </h3>
          <p className="text-base text-secondary/70">
            {copy.descriptions.overview}
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-border/40 bg-gradient-to-br from-primary-5 via-primary/5 to-background/95 p-6 shadow-inner">
              <h4 className="flex items-center gap-2 text-base font-semibold text-secondary">
                <Building2 className="h-5 w-5 text-primary" />
                {copy.headings.address}
              </h4>
              <p className="mt-2 text-base text-secondary/80">
                {copy.address.full}
              </p>
              <dl className="mt-4 grid gap-4 text-sm text-secondary/70 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/40 bg-background/95 p-5 shadow-sm">
                  <dt className="text-base font-semibold text-secondary">
                    {copy.headings.hours}
                  </dt>
                  <dd className="mt-3 space-y-2">
                    {copy.consultations.map((item) => (
                      <div key={item.title} className="space-y-1">
                        <p className="text-base font-semibold text-secondary/90">
                          {item.title} · {item.hours}
                        </p>
                        <p className="text-sm text-secondary/60">{item.note}</p>
                      </div>
                    ))}
                  </dd>
                </div>
                <div className="rounded-2xl border border-border/40 bg-background/95 p-5 shadow-sm">
                  <dt className="text-base font-semibold text-secondary">
                    {copy.headings.contact}
                  </dt>
                  <dd className="mt-3 space-y-2">
                    <p className="flex items-center gap-2 text-base font-semibold text-secondary/85">
                      <PhoneCall className="h-5 w-5 text-primary" />
                      {copy.contact.phone}
                    </p>
                    <p className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm text-secondary/65">
                      {copy.contact.note}
                    </p>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {copy.transport.map((item) => (
                <article
                  key={item.title}
                  className="flex flex-col gap-3 rounded-2xl border border-border/30 bg-background/90 p-5 shadow-sm backdrop-blur"
                >
                  <div className="flex items-center gap-2 text-secondary">
                    {item.icon}
                    <h5 className="text-sm font-semibold uppercase tracking-[0.2em]">
                      {item.title}
                    </h5>
                  </div>
                  <p className="text-sm text-secondary/65">{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-3xl border border-border/40 bg-background/90 p-6 shadow-sm">
            <div>
              <h4 className="flex items-center gap-2 text-base font-semibold text-secondary">
                <MapPinIcon className="h-5 w-5 text-primary" />
                {copy.headings.map}
              </h4>
              <p className="mt-2 text-sm text-secondary/60">
                {copy.descriptions.map}
              </p>
            </div>
            <div className="relative h-64 overflow-hidden rounded-2xl border border-border/40">
              <iframe
                title={copy.mapTitle}
                src={copy.mapEmbedUrl}
                className="h-full w-full"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <ul className="space-y-2 text-sm text-secondary/70">
              {copy.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function getLocalizedCopy(locale: Locale) {
  const isKo = locale === "ko";

  return {
    badges: {
      primary: isKo ? "방문 안내" : "Visit Info",
      featured: isKo ? "공간 미리보기" : "Preview The Space",
      minimal: isKo ? "간단 정리" : "Quick Facts",
    },
    headings: {
      arrival: isKo ? "더헬리아 오시는 길" : "Finding The Helia",
      address: isKo ? "위치 및 건물" : "Location & Building",
      hours: isKo ? "상담 시간" : "Consultation Hours",
      contact: isKo ? "문의 및 예약" : "Contact & Booking",
      map: isKo ? "주변 지도" : "Neighborhood Map",
      experience: isKo ? "방문 경험" : "Visit Experience",
      quick: isKo ? "더헬리아 핵심 정보" : "Key Details At A Glance",
      tips: isKo ? "방문 전 체크" : "Before You Arrive",
    },
    descriptions: {
      overview: isKo
        ? "MS메디컬스퀘어 5·6층 더헬리아 라운지는 예약 상담제로 운영됩니다. 아래 정보를 참고해 편안한 방문을 준비해 주세요."
        : "The Helia lounge on the 5th and 6th floors of MS Medical Square operates by appointment. Use the details below to plan a smooth visit.",
      map: isKo
        ? "주변 편의시설과 이동 동선을 지도에서 바로 확인하세요."
        : "Preview nearby amenities and walking routes directly on the map.",
      experience: isKo
        ? "첫 방문이더라도 걱정 없이 안내해 드립니다. 아래 상담 시간과 이동 방법을 참고해 주세요."
        : "We guide every first-time visitor with care. Review the consultation hours and access options below.",
      quick: isKo
        ? "상담 예약부터 찾아오시는 방법까지 한눈에 확인하세요."
        : "Review booking details and access information at a glance.",
    },
    address: {
      full: isKo
        ? "경기도 수원시 권선구 금곡로 197번길 18-39, MS메디컬스퀘어 5·6층"
        : "5F-6F, MS Medical Square, 18-39 Geumgok-ro 197beon-gil, Gwonseon-gu, Suwon",
      directions: isKo
        ? "1층 안내 데스크에서 방문 등록 후 엘리베이터를 이용해 주세요."
        : "Please register at the ground-floor desk before heading up via elevator.",
    },
    contact: {
      phone: "010-5077-3962 · KakaoTalk THEHELIA",
      note: isKo
        ? "상담은 사전 예약제로 운영됩니다."
        : "Consultations are available by reservation only.",
    },
    consultations: [
      {
        icon: <Calendar1Icon className="h-10 w-10 rounded-full bg-primary/10 p-2 text-primary" />,
        title: isKo ? "평일 상담" : "Weekday Consultations",
        hours: "10:00 - 19:00",
        note: isKo
          ? "점심시간 12:00 - 13:00 (예약 우선)"
          : "Lunch break 12:00 - 13:00 · Reservation priority",
      },
      {
        icon: <CalendarClock className="h-10 w-10 rounded-full bg-primary/10 p-2 text-primary" />,
        title: isKo ? "주말 · 공휴일" : "Weekends & Holidays",
        hours: "10:00 - 19:00",
        note: isKo
          ? "사전 예약 후 방문 가능"
          : "Visits available with reservation",
      },
    ],
    transport: [
      {
        title: isKo ? "지하철" : "Subway",
        description: isKo
          ? "홈플러스 서수원점에서 도보 5분 거리"
          : "5-minute walk from HomePlus West Suwon Branch",
        icon: <TrainFrontIcon className="h-6 w-6 text-primary" />,
        iconSmall: <TrainFrontIcon className="h-5 w-5 text-primary" />,
      },
      {
        title: isKo ? "버스" : "Bus",
        description: isKo
          ? "13-1, 64-2, 200번 탑승 후 ‘금곡동 주민센터’ 하차 → 도보 3분"
          : "Take bus 13-1, 64-2, or 200 → Get off at 'Geumgok-dong Community Center' → 3-minute walk",
        icon: <BusFrontIcon className="h-6 w-6 text-primary" />,
        iconSmall: <BusFrontIcon className="h-5 w-5 text-primary" />,
      },
      {
        title: isKo ? "자동차" : "By Car",
        description: isKo
          ? "MS메디컬스퀘어 지하주차장 이용 · 방문 고객 주차권 제공"
          : "Use the MS Medical Square underground parking · Parking validation provided",
        icon: <CarFrontIcon className="h-6 w-6 text-primary" />,
        iconSmall: <CarFrontIcon className="h-5 w-5 text-primary" />,
      },
    ],
    highlights: isKo
      ? [
          "상담 예약자 전용 대기 공간 제공",
          "아이와 동반 시 유모차 보관 가능",
          "주차권은 상담 종료 후 안내 데스크에서 수령",
        ]
      : [
          "Dedicated waiting lounge for reservations",
          "Stroller storage available for families",
          "Collect parking validation at the concierge after your visit",
        ],
    tips: isKo
      ? [
          "예약 시간 10분 전 도착 시 여유로운 상담 진행이 가능합니다.",
          "주차 확인 도장을 받으려면 차량 번호를 미리 알려주세요.",
          "간단한 웰컴 티가 제공됩니다.",
        ]
      : [
          "Arrive 10 minutes early for a relaxed consultation.",
          "Share your vehicle number for parking validation.",
          "Complimentary welcome tea is prepared for you.",
        ],
    mapTitle: isKo ? "더헬리아 위치" : "The Helia Location",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.087789999834!2d126.975!3d37.265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDE1JzU0LjAiTiAxMjbCsDU4JzMxLjYiRQ!5e0!3m2!1sko!2skr!4v1700000000000",
  };
}
