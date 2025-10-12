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

  
  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-3xl border border-border/30 bg-background/70">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative h-80">
            <Image
              src="/img/location2.png"
              alt={isKo ? "더헬리아 외관 사진" : "The Helia exterior"}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 100vw, 100vw"
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
              <div className="rounded-2xl bg-background/85">
                <p className="font-semibold">
                  {isKo ? "상담 예약" : "Consultation Booking"}
                </p>
                <p className="mt-1 text-secondary/65">
                  010-5077-3962 (KakaoTalk {"@"}thehelia)
                </p>
              </div>
              <div className="rounded-2xl bg-background/85">
                <p className="font-semibold">
                  {isKo ? "상담 진행 장소" : "Consultation Venue"}
                </p>
                <p className="mt-1 text-secondary/65">
                  {isKo
                    ? "MS메디컬스퀘어 5층 라운지"
                    : "5F Lounge, MS Medical Square"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
