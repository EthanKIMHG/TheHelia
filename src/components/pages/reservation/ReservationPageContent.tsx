"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import type { Locale } from "@/components/header/types";
import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

type ReservationPageContentProps = {
  locale?: Locale;
};

export function ReservationPageContent({ locale }: ReservationPageContentProps) {
  const context = useOptionalThemeLocale();
  const activeLocale = locale ?? context?.locale ?? "ko";
  const copy = useMemo(() => getReservationCopy(activeLocale), [activeLocale]);
  const isKo = activeLocale === "ko";

  return (
    <div className="space-y-24 pb-20">
      <ProcessSection copy={copy.process} />
      <ContactSection copy={copy.contact} isKo={isKo} />
      <NoticeSection copy={copy.notice} />
    </div>
  );
}

type ContactCopy = ReturnType<typeof getReservationCopy>["contact"];

function ContactSection({ copy, isKo }: { copy: ContactCopy; isKo: boolean }) {
  const bookingChannel = copy.channels.find((channel) => channel.id === "booking");
  const supportChannels = copy.channels.filter((channel) => channel.id !== "booking");
  const bookingHighlights = isKo
    ? ["24시간 예약 접수", "가용 일정 빠른 안내"]
    : ["24/7 Reservation Intake", "Fast Availability Response"];

  return (
    <ScrollReveal>
    <section className="rounded-3xl border border-border/30 bg-white/80 dark:bg-primary/10 backdrop-blur-md p-6 shadow-sm md:p-10">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary font-playfair italic">
          {copy.badge}
        </p>
        <h2 className="text-3xl font-semibold text-foreground md:text-3xl font-serif">
          {copy.title}
        </h2>
        <p className="text-base leading-relaxed text-foreground/80 md:text-lg">
          {copy.subtitle}
        </p>
      </header>
      <div className="mt-8 space-y-4">
        {bookingChannel && (
          <article className="rounded-2xl border border-primary/35 bg-gradient-to-br from-primary/15 via-background to-primary/5 p-5 shadow-md dark:from-primary/25 dark:via-primary/10 dark:to-primary/15 md:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/95 font-serif">
                  {bookingChannel.label}
                </p>
                <div className="mt-2 flex items-center gap-2 text-lg font-semibold text-foreground">
                  <bookingChannel.icon className="h-5 w-5 text-primary" />
                  <span>{bookingChannel.value}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                  {bookingChannel.note}
                </p>
              </div>
              <div className="hidden rounded-xl border border-primary/30 bg-primary/10 p-3 text-primary md:flex">
                <CalendarCheck className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-medium text-foreground/75">
              {bookingHighlights.map((item) => (
                <span key={item} className="rounded-full border border-primary/25 bg-background/80 px-2.5 py-1 dark:bg-primary/10">
                  {item}
                </span>
              ))}
            </div>
            {bookingChannel.href && (
              <Link
                href={bookingChannel.href}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-primary/50 bg-primary p-3 text-sm font-semibold text-background transition-colors hover:bg-primary/90 md:w-auto md:px-6"
              >
                {bookingChannel.cta}
              </Link>
            )}
          </article>
        )}

        <div className="grid gap-3 md:grid-cols-2">
          {supportChannels.map((channel) => (
            <Link
              key={channel.label}
              href={channel.href ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-border/40 bg-background/85 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-primary/5 dark:bg-primary/10 dark:border-primary/25 dark:hover:bg-primary/15"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/90">
                    {channel.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">{channel.value}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{channel.note}</p>
                </div>
                <div className="rounded-lg border border-primary/30 bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-background">
                  <channel.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4 inline-flex items-center rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1.5 text-xs font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-background">
                {channel.cta}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
    </ScrollReveal>
  );
}



type ProcessCopy = ReturnType<typeof getReservationCopy>["process"];

function ProcessSection({ copy }: { copy: ProcessCopy }) {
  return (
    <ScrollReveal>
      <section className="rounded-3xl border border-border/30 bg-white/80 dark:bg-[#2A2928]/60 backdrop-blur-md p-6 shadow-sm md:p-10">
        <header className="mb-8 space-y-3 text-left md:mb-10 md:text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary font-playfair italic">
            {copy.badge}
          </p>
          <h2 className="text-2xl font-semibold leading-[1.28] break-keep text-foreground md:text-3xl md:leading-tight font-serif">
            {copy.title}
          </h2>
          <p className="max-w-[30ch] break-keep text-base leading-relaxed text-foreground/80 md:mx-auto md:max-w-2xl md:text-lg">
            {copy.subtitle}
          </p>
        </header>

        <div className="md:hidden space-y-3">
          {copy.steps.map((step, index) => (
            <article
              key={`${step.label}-mobile`}
              className="relative rounded-2xl border border-primary/25 bg-background/90 p-4 pl-14 shadow-sm dark:bg-primary/10 dark:border-primary/35"
            >
              <div className="absolute left-2.5 top-3.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-background font-serif text-[11px] font-semibold shadow-sm ring-4 ring-background dark:ring-[#2A2928]">
                {String(index + 1).padStart(2, "0")}
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/90">
                {step.label}
              </p>
              <h3 className="mt-1 text-base font-semibold break-keep text-foreground font-serif">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed break-keep text-foreground/85">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-4 md:gap-5">
          {copy.steps.map((step, index) => (
            <article
              key={`${step.label}-desktop`}
              className="group relative rounded-2xl border border-primary/20 bg-background/90 p-5 shadow-sm transition-all duration-300 hover:border-primary/35 hover:bg-primary/5 dark:bg-primary/10 dark:border-primary/30 dark:hover:bg-primary/15"
            >
              {index < copy.steps.length - 1 && (
                <div className="absolute top-10 left-[calc(100%-0.35rem)] h-px w-[calc(100%+0.7rem)] bg-gradient-to-r from-primary/35 to-primary/10" />
              )}

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative mt-0.5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-background font-serif text-base shadow-md ring-4 ring-primary/15 dark:ring-primary/25">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="mt-2.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/90">
                    {step.label}
                  </p>
                  <h3 className="mt-1.5 mb-1.5 text-lg font-semibold break-keep text-foreground font-serif">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed break-keep text-foreground/85">
                    {step.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}


type NoticeCopy = ReturnType<typeof getReservationCopy>["notice"];

function NoticeSection({ copy }: { copy: NoticeCopy }) {
  return (
    <ScrollReveal>
    <section className="rounded-3xl border border-border/30 bg-primary/5 dark:bg-[#2A2928]/50 backdrop-blur-md p-6 text-foreground shadow-sm md:p-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] font-playfair italic text-primary/95">
          {copy.badge}
        </p>
        <h2 className="text-2xl font-semibold text-foreground md:text-3xl font-serif">
          {copy.title}
        </h2>
        <p className="text-sm leading-relaxed text-foreground/85 md:text-base">
          {copy.subtitle}
        </p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {copy.items.map((group) => (
          <article
            key={group.title}
            className="rounded-2xl border border-border/30 bg-background/90 dark:bg-[#2A2928]/70 backdrop-blur-sm p-5 text-foreground/85 shadow-sm"
          >
            <h3 className="text-base font-semibold font-serif text-foreground">{group.title}</h3>
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
    </ScrollReveal>
  );
}

function getReservationCopy(locale: Locale) {
  const isKo = locale === "ko";
  return {
    contact: {
      badge: isKo ? "상담 예약 안내" : "Reservation Guidance",
      title: isKo ? "방문 상담은 사전 예약제로 진행됩니다" : "Consultations Are By Appointment Only",
      subtitle: isKo
        ? "네이버 플레이스를 통해 투어 상담 예약을 해주세요. 관련 문의는 전화 또는 카카오톡으로 남겨주세요."
        : "Reach out by phone or KakaoTalk—our concierge team gets back to you promptly with available slots.",
      channels: [
        {
          id: "booking",
          label: isKo ? "온라인 예약" : "Online Reservation",
          value: isKo ? "온라인 예약하기" : "Online Reservation",
          note: isKo
            ? "네이버 예약하기 버튼을 누르면 네이버 예약하기 페이지로 이동합니다."
            : "Press the Naver Reservation button to navigate to the Naver Reservation page.",
          cta: isKo ? "네이버 예약하기" : "Naver Reservation",
          href: "https://booking.naver.com/booking/6/bizes/1021790",
          icon: CalendarCheck,
        },
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
          value: "더헬리아산후조리원",
          note: isKo
            ? "카카오톡 채널에서 상담 가능 · 빠른 메시지 회신"
            : "Chat via KakaoTalk channel for quick responses",
          cta: isKo ? "카카오톡 연결" : "Open KakaoTalk",
          href: "https://pf.kakao.com/_GGXHn",
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
            ? "네이버 플레이스를 통해 방문하고자 하는 일자와 시간을 선택 후 예약해주세요.."
            : "Please choose your preferred visit date and time through Naver Place to make a reservation.",
          tips: isKo
            ? ["산모 성함과 출산 예정일을 함께 알려주세요.", "상담 목적(투어, 가격 문의 등)을 남겨주세요."]
            : ["Provide mother’s name and expected due date.", "Let us know your focus—tour, pricing, or care details."],
        },
        {
          label: isKo ? "Step 2" : "Step 2",
          title: isKo ? "일정 확정" : "Schedule Confirmation",
          description: isKo
            ? "담당자가 예약내역 확인후 예약확정 안내 드립니다."
            : "Our team reviews your reservation details and confirms your booking.",
          tips: isKo
            ? ["원하시는 시간대를 말씀해 주세요.", "방문 인원과 동반 가족 여부를 알려주세요."]
            : ["Share preferred time windows.", "Tell us who will accompany you on the visit."],
        },
        {
          label: isKo ? "Step 3" : "Step 3",
          title: isKo ? "방문 상담" : "On-Site Consultation",
          description: isKo
            ? "5층 입구에서 소독 및 위생복 착용 후 조리원 시설 내부 투어 및 상담을 진행합니다."
            : "After sanitizing and putting on protective clothing at the 5th-floor entrance, you will tour the center and have a consultation.",
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
