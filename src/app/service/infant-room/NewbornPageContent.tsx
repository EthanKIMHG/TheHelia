"use client";

import type { Locale } from "@/components/header/types";
import { NewbornProcess } from "@/components/nursery/NewbornProcess";
import { NewbornStrengths } from "@/components/nursery/NewbornStrengths";
import { SpaServiceBento } from "@/components/service/SpaServiceBento";

export function NewbornPageContent({ locale }: { locale: Locale }) {
  const isKo = locale === "ko";
  const copy = isKo ? KOREAN_COPY : ENGLISH_COPY;

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* 1. Admission Process */}
      <NewbornProcess locale={locale} />

      {/* 2. Observation Room (Existing Content) */}
      <section className="px-4">
        <div className="mx-auto max-w-7xl">
            <SpaServiceBento
                badge={copy.observationRoom.badge}
                title={copy.observationRoom.title}
                description={copy.observationRoom.description}
                images={copy.observationRoom.images}
                features={copy.observationRoom.features}
                reversed
            />
        </div>
      </section>

      {/* 3. Newborn Room (Existing Content) */}
      <section className="px-4">
        <div className="mx-auto max-w-7xl">
            <SpaServiceBento
                badge={copy.newbornRoom.badge}
                title={copy.newbornRoom.title}
                description={copy.newbornRoom.description}
                images={copy.newbornRoom.images}
                features={copy.newbornRoom.features}
            />
        </div>
      </section>

      {/* 4. Premium Care Strengths (New Design) */}
      <NewbornStrengths locale={locale} />
    </div>
  );
}

const KOREAN_COPY = {
    newbornRoom: {
        badge: "NEWBORN ROOM",
        title: "신생아실",
        description: "엄마의 품처럼 따뜻한 온도와 습도, 전문 간호 선생님들의 사랑이 가득한 공간입니다.\n24시간 세심한 케어로 아기의 편안함을 지켜드립니다.",
        images: [
            "/img/infant/infant1.jpg",
            "/img/infant/infant2.jpg",
            "/img/infant/infant4.jpg",
        ],
        features: [
            {
                title: "케어 & 모니터링",
                items: [
                    "분리형 신생아실 운영 (교차 감염 예방)",
                    "1:1 전담 케어 시스템",
                    "24시간 젤리캠 모니터링",
                ],
            },
            {
                title: "프리미엄 & 건강",
                items: [
                    "소아과 전문의 회진 (주 2회)",
                    "1:1 전용 처치대 개인 케어",
                    "최고급 아기용품 제공 (일루마, 리베로)",
                ],
            },
        ],
    },
    observationRoom: {
        badge: "PRE-OBSERVATION",
        title: "사전 관찰실",
        description: "건강한 첫 만남을 위한 준비 공간입니다.\n입실 초기 모든 아기들은 이곳에서 세심한 컨디션 체크를 받습니다.",
        images: [
            "/img/infant/infant3.jpg",
            "/img/infant/infant5.jpg",
            "/img/infant/infant6.jpg",
        ],
        features: [
            {
                title: "안전 & 격리",
                items: [
                    "총 3개의 독립된 관찰실 운영",
                    "철저한 감염 예방 및 관리",
                    "잠복기 질환 유무 확인",
                ],
            },
            {
                title: "집중 관리",
                items: [
                    "전문 의료진 전담 케어",
                    "초기 건강 상태 집중 모니터링",
                    "안전한 합류를 위한 체계적 절차",
                ],
            },
        ],
    },
};

const ENGLISH_COPY = {
    newbornRoom: {
        badge: "NEWBORN ROOM",
        title: "Newborn Room",
        description: "A space full of love from professional nurses, with warmth and humidity just like a mother's embrace.\nWe protect your baby's comfort with 24-hour meticulous care.",
        images: [
            "/img/infant/infant1.jpg",
            "/img/infant/infant2.jpg",
            "/img/infant/infant4.jpg",
        ],
        features: [
            {
                title: "Care & Monitoring",
                items: [
                    "Separated newborn room (Infection prevention)",
                    "1:1 Dedicated Care System",
                    "24-hour Jelly Cam Monitoring",
                ],
            },
            {
                title: "Premium & Health",
                items: [
                    "Pediatrician rounds (Twice a week)",
                    "Personal care on 1:1 dedicated station",
                    "Premium baby supplies provided",
                ],
            },
        ],
    },
    observationRoom: {
        badge: "PRE-OBSERVATION",
        title: "Pre-Observation Room",
        description: "Preparation space for a healthy first meeting.\nAll babies receive meticulous condition checks here upon initial entry.",
        images: [
            "/img/infant/infant3.jpg",
            "/img/infant/infant5.jpg",
            "/img/infant/infant6.jpg",
        ],
        features: [
            {
                title: "Safety & Isolation",
                items: [
                    "3 Independent Observation Rooms",
                    "Thorough Infection Prevention",
                    "Check for Latent Diseases",
                ],
            },
            {
                title: "Intensive Care",
                items: [
                    "Professional Medical Staff Care",
                    "Intensive Monitoring of Initial Health",
                    "Systematic Procedures for Safe Joining",
                ],
            },
        ],
    },
};
