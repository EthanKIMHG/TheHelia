"use client";

import {
  Building2,
  BusFrontIcon,
  Calendar1Icon,
  CalendarClock,
  CarFrontIcon,
  MapPinIcon,
  TrainFrontIcon,
} from "lucide-react";
import Image from "next/image";
import type { Locale } from "@/components/header/types";

const ICON_CLASSES = "h-6 w-6 text-primary";

type LocationContentProps = {
  locale: Locale;
};

export function LocationContent({ locale }: LocationContentProps) {
  const isKo = locale === "ko";

  const consultationCards = [
    {
      icon: <Calendar1Icon className={ICON_CLASSES} />,
      title: isKo ? "평일 상담" : "Weekday Consultation",
      hours: "09:00 - 18:00",
      note: isKo
        ? "점심시간 12:00 - 13:00 (예약 상담 우선)"
        : "Lunch 12:00 - 13:00 · Reservation priority",
    },
    {
      icon: <CalendarClock className={ICON_CLASSES} />,
      title: isKo ? "주말 · 공휴일" : "Weekend & Holidays",
      hours: "10:00 - 16:00",
      note: isKo
        ? "사전 예약 후 방문이 가능합니다."
        : "Visits available with reservation only",
    },
  ];

  const accessCards = [
    {
      icon: <TrainFrontIcon className={ICON_CLASSES} />,
      title: isKo ? "지하철" : "Subway",
      desc: isKo
        ? "수인분당선 고색역 2번 출구에서 도보 8분"
        : "8-minute walk from Gosaek Station (Bundang Line)",
    },
    {
      icon: <BusFrontIcon className={ICON_CLASSES} />,
      title: isKo ? "버스" : "Bus",
      desc: isKo
        ? "13-1, 64-2, 200번 버스 ‘금곡동 주민센터’ 하차 후 도보 3분"
        : "Take bus 13-1, 64-2, or 200 → Get off at 'Geumgok-dong Community Center' → 3-minute walk",
    },
    {
      icon: <CarFrontIcon className={ICON_CLASSES} />,
      title: isKo ? "자가용" : "By Car",
      desc: isKo
        ? "MS메디컬스퀘어 지하주차장 이용 · 방문 고객 주차권 제공"
        : "Use MS Medical Square parking · Parking validation available",
    },
  ];

  return (
    <div className="space-y-10">
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-border/40 bg-background/70 p-6 shadow-sm">
          <div className="flex items-center gap-3 text-secondary">
            <Building2 className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">
              {isKo ? "더헬리아 안내" : "Visit Information"}
            </h3>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-secondary/70">
            {isKo
              ? "경기도 수원시 권선구 금곡로 197번길 18-39, MS메디컬스퀘어 5·6층에 위치해 있습니다. 1층 안내 데스크에서 방문 등록 후 엘리베이터를 이용해 주세요."
              : "We are located on the 5th and 6th floors of MS Medical Square, 18-39 Geumgok-ro 197beon-gil, Suwon. Please register at the ground floor desk and take the elevator."}
          </p>
          <ul className="mt-5 space-y-3 text-sm text-secondary/80">
            <li className="flex items-start gap-3">
              <MapPinIcon className={ICON_CLASSES} />
              <span>
                {isKo
                  ? "수인분당선 고색역 2번 출구 도보 8분"
                  : "8-minute walk from Gosaek Station (Exit 2)"}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BusFrontIcon className={ICON_CLASSES} />
              <span>
                {isKo
                  ? "13-1, 64-2, 200번 버스 ‘금곡동 주민센터’ 하차"
                  : "Bus 13-1, 64-2, 200 → 'Geumgok-dong Community Center'"}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CarFrontIcon className={ICON_CLASSES} />
              <span>
                {isKo
                  ? "지하주차장 이용 가능 · 방문 고객 주차권 제공"
                  : "Underground parking available · Parking validation provided"}
              </span>
            </li>
          </ul>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border/40">
          <iframe
            title="The Helia Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.087789999834!2d126.975!3d37.265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDE1JzU0LjAiTiAxMjbCsDU4JzMxLjYiRQ!5e0!3m2!1sko!2skr!4v1700000000000"
            loading="lazy"
            className="h-64 w-full md:h-full"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {accessCards.map((card) => (
          <article
            key={card.title}
            className="flex flex-col gap-3 rounded-3xl border border-border/30 bg-background/80 p-5 shadow-sm"
          >
            <div className="flex items-center gap-3 text-secondary">
              {card.icon}
              <h4 className="text-sm font-semibold uppercase tracking-[0.1em]">
                {card.title}
              </h4>
            </div>
            <p className="text-sm text-secondary/75">{card.desc}</p>
          </article>
        ))}
      </section>

      <section className="overflow-hidden rounded-3xl border border-border/30 bg-background/70">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative h-56 md:h-full">
            <Image
              src="/img/subhero/location.jpg"
              alt={isKo ? "더헬리아 외관" : "The Helia exterior"}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>
          <div className="flex flex-col gap-4 p-6 text-secondary">
            <h3 className="text-lg font-semibold">
              {isKo ? "방문 전 안내" : "Before You Visit"}
            </h3>
            <p className="text-sm leading-relaxed text-secondary/70">
              {isKo
                ? "방문 상담은 사전 예약제로 운영됩니다. 예약된 시간보다 10분 정도 일찍 도착하시면, 공간 소개와 프로그램 설명을 보다 여유롭게 도와드릴 수 있습니다."
                : "Consultations are by appointment only. Arriving 10 minutes early allows us to provide a more relaxed tour and introduction to our programs."}
            </p>
            <div className="grid gap-3 text-sm text-secondary/85 md:grid-cols-2">
              <div className="rounded-2xl bg-background/85 p-4">
                <p className="font-semibold">
                  {isKo ? "상담 예약" : "Consultation Booking"}
                </p>
                <p className="mt-1 text-secondary/65">
                  010-5077-3962 (KakaoTalk {"@"}thehelia)
                </p>
              </div>
              <div className="rounded-2xl bg-background/85 p-4">
                <p className="font-semibold">
                  {isKo ? "상담 진행 장소" : "Consultation Venue"}
                </p>
                <p className="mt-1 text-secondary/65">
                  {isKo
                    ? "MS메디컬스퀘어 6층 라운지"
                    : "6F Lounge, MS Medical Square"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
