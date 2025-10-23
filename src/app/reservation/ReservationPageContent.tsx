"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarClock, CalendarHeart, CheckCircle2, ClipboardList, Inbox, MessageCircle, NotebookText, Phone } from "lucide-react";
import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import type { Locale } from "@/components/header/types";

type ReservationPageContentProps = {
  locale?: Locale;
};

export function ReservationPageContent({ locale }: ReservationPageContentProps) {
  const context = useOptionalThemeLocale();
  const activeLocale = locale ?? context?.locale ?? "ko";
  const copy = useMemo(() => getReservationCopy(activeLocale), [activeLocale]);

  return (
    <div className="space-y-16">
      <ContactSection copy={copy.contact} />
      <NoticeSection copy={copy.notice} />
    </div>
  );
}

type ContactCopy = ReturnType<typeof getReservationCopy>["contact"];

function ContactSection({ copy }: { copy: ContactCopy }) {
  return (
    <section className="rounded-3xl border border-border/30 bg-background/90 p-6 shadow md:p-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          {copy.badge}
        </p>
        <h2 className="text-3xl font-semibold text-foreground md:text-3xl">
          {copy.title}
        </h2>
        <p className="text-base leading-relaxed text-foreground/70 md:text-lg">
          {copy.subtitle}
        </p>
      </header>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {copy.channels.map((channel) => (
          <div
            key={channel.label}
            className="rounded-2xl border border-border/30 bg-background/95 p-6 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
              {channel.label}
            </p>
            <div className="mt-3 flex items-center gap-2 text-lg font-semibold text-foreground">
              <channel.icon className="h-5 w-5 text-primary" />
              <span>{channel.value}</span>
            </div>
            <p className="mt-2 text-sm text-foreground/65">{channel.note}</p>
            {channel.href ? (
              <Link
                href={channel.href}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-background"
              >
                {channel.cta}
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}



type NoticeCopy = ReturnType<typeof getReservationCopy>["notice"];

function NoticeSection({ copy }: { copy: NoticeCopy }) {
  return (
    <section className="rounded-3xl border border-dashed border-primary/40 bg-gradient-to-br from-primary/5 via-primary/5 to-background/95 p-6 text-primary/80 shadow md:p-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em]">
          {copy.badge}
        </p>
        <h2 className="text-2xl font-semibold text-secondary md:text-3xl">
          {copy.title}
        </h2>
        <p className="text-sm leading-relaxed text-secondary md:text-base">
          {copy.subtitle}
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {copy.items.map((group) => (
          <article
            key={group.title}
            className="rounded-2xl border border-primary/20 bg-background/95 p-5 text-secondary shadow-sm"
          >
            <h3 className="text-base font-semibold">{group.title}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {group.points.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function getReservationCopy(locale: Locale) {
  const isKo = locale === "ko";
  return {
    contact: {
      badge: isKo ? "상담 예약 안내" : "Reservation Guidance",
      title: isKo ? "방문 상담은 사전 예약제로 진행됩니다" : "Consultations Are By Appointment Only",
      subtitle: isKo
        ? "전화 또는 카카오톡으로 편안하게 문의를 남겨 주세요. 담당 매니저가 빠르게 도와드립니다."
        : "Reach out by phone or KakaoTalk—our concierge team gets back to you promptly with available slots.",
      channels: [
        {
          label: isKo ? "전화 문의" : "Phone Reservation",
          value: "010-5077-3962",
          note: isKo
            ? "평일 09:00 - 18:00 / 주말·공휴일 10:00 - 16:00"
            : "Weekdays 09:00 - 18:00 · Weekends & holidays via prior booking",
          cta: isKo ? "전화 걸기" : "Call now",
          href: "tel:01050773962",
          icon: Phone,
        },
        {
          label: isKo ? "카카오톡" : "KakaoTalk",
          value: "THEHELIA",
          note: isKo
            ? "카카오톡 채널에서 상담 가능 · 빠른 메시지 회신"
            : "Chat via KakaoTalk channel for quick responses",
          cta: isKo ? "카카오톡 연결" : "Open KakaoTalk",
          href: "https://pf.kakao.com/_Zxnxkxj/chat",
          icon: MessageCircle,
        },
      ],
    },
    process: {
      badge: isKo ? "예약 절차" : "Booking Process",
      title: isKo ? "예약에서 방문까지, 이렇게 진행됩니다" : "From Booking to Visit",
      subtitle: isKo
        ? "편안한 상담을 위해 사전 안내와 방문 시간을 조율해 드려요."
        : "We coordinate each step ahead so your consultation day stays relaxed.",
      steps: [
        {
          label: isKo ? "Step 1" : "Step 1",
          title: isKo ? "문의 접수" : "Initial Inquiry",
          description: isKo
            ? "전화 또는 카카오톡으로 희망 일정을 알려주세요."
            : "Share your preferred consultation date via phone or KakaoTalk.",
          tips: isKo
            ? ["산모 성함과 출산 예정일을 함께 알려주세요.", "상담 목적(투어, 가격 문의 등)을 남겨주세요."]
            : ["Provide mother’s name and expected due date.", "Let us know your focus—tour, pricing, or care details."],
        },
        {
          label: isKo ? "Step 2" : "Step 2",
          title: isKo ? "일정 확정" : "Schedule Confirmation",
          description: isKo
            ? "담당 매니저가 가능 일정을 확인 후 확정 안내 드립니다."
            : "Our manager confirms availability and locks in your visit.",
          tips: isKo
            ? ["원하시는 시간대를 말씀해 주세요.", "방문 인원과 동반 가족 여부를 알려주세요."]
            : ["Share preferred time windows.", "Tell us who will accompany you on the visit."],
        },
        {
          label: isKo ? "Step 3" : "Step 3",
          title: isKo ? "방문 상담" : "On-Site Consultation",
          description: isKo
            ? "1층 안내 데스크에서 등록 후, 라운지에서 프라이빗 상담이 진행됩니다."
            : "Check in at the ground-floor desk; a private lounge consultation follows.",
          tips: isKo
            ? ["예약 시간 10분 전에 도착해 주세요.", "필요시 아기와 동행 여부를 미리 알려주세요."]
            : ["Arrive about 10 minutes early.", "Let us know if baby or family will come along."],
        },
        {
          label: isKo ? "Step 4" : "Step 4",
          title: isKo ? "예약 확정" : "Finalize Reservation",
          description: isKo
            ? "상담 후 희망 객실과 일정에 맞춰 계약 절차를 안내해 드립니다."
            : "After the consultation, we guide you through selecting rooms and confirming your stay.",
          tips: isKo
            ? ["객실 타입과 이용 기간을 확정합니다.", "필요시 계약 관련 서류를 안내해 드립니다."]
            : ["Confirm suite type and duration.", "Receive any paperwork needed to finalise."],
        },
      ],
    },
    notice: {
      badge: isKo ? "이용 안내" : "Helpful Notes",
      title: isKo ? "방문 전 알아두면 좋은 안내" : "Good to Know Before You Visit",
      subtitle: isKo
        ? "예약 상담은 산모의 컨디션과 일정에 맞춰 조율됩니다."
        : "We adjust consultation details around mother’s condition and timing.",
      items: [
        {
          title: isKo ? "상담 준비" : "Preparing for Consultation",
          points: isKo
            ? [
                "의료 기록 또는 산모 수첩이 있다면 지참해 주세요.",
                "동반 가족이 있다면 편안한 라운지 좌석을 준비해 드립니다.",
              ]
            : [
                "Bring medical notes or maternity records if available.",
                "Family members can relax in our lounge while you consult.",
              ],
        },
        {
          title: isKo ? "주차 & 이동" : "Parking & Access",
          points: isKo
            ? [
                "MS메디컬스퀘어 지하주차장 이용 시 주차권을 제공해 드립니다.",
                "택시 또는 대중교통 이용 시 도착 시간에 맞춰 안내해 드립니다.",
              ]
            : [
                "Parking validation is available for MS Medical Square’s garage.",
                "We help coordinate arrival if you’re taking a taxi or subway.",
              ],
        },
      ],
    },
    gallery: {
      badge: isKo ? "상담 공간 미리보기" : "Preview the Consultation Areas",
      title: isKo ? "더헬리아에서 맞이하는 첫 순간" : "First Moments at The Helia",
      subtitle: isKo
        ? "상담은 프라이빗 라운지에서 진행되며, 투어를 통해 객실과 공용 공간을 안내해 드립니다."
        : "Consultations take place in a private lounge, followed by a guided tour of suites and shared spaces.",
      items: [
        {
          src: "/img/main/homepage_2.jpg",
          alt: isKo ? "라운지 전경" : "Lounge interior",
          caption: isKo
            ? "도착 후 웰컴 티와 함께 간단한 안내가 진행됩니다."
            : "Begin with a welcome tea and a gentle orientation in our lounge.",
        },
        {
          src: "/img/main/homepage_3.jpg",
          alt: isKo ? "상담 공간" : "Consultation room",
          caption: isKo
            ? "프라이빗 상담실에서 맞춤 케어 플랜을 안내해 드립니다."
            : "A private consultation room is ready for tailored care planning",
        },
        {
          src: "/img/main/homepage_5.jpg",
          alt: isKo ? "객실 투어" : "Suite tour",
          caption: isKo
            ? "객실과 케어 설비를 직접 확인하실 수 있습니다."
            : "Walk through suites and amenities to explore every detail.",
        },
      ],
    },
  };
}
