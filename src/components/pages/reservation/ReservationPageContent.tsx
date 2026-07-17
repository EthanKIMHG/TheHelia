"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import type { Locale } from "@/components/header/types";
import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

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
    <section className="border-t border-border pt-10 md:pt-12">
      <header className="space-y-4">
        <p className="eyebrow">
          {copy.badge}
        </p>
        <h2 className="font-display-serif text-2xl font-normal leading-[1.4] text-foreground md:text-3xl">
          {copy.title}
        </h2>
        <p className="text-base leading-[1.85] text-secondary md:text-lg">
          {copy.subtitle}
        </p>
      </header>
      <div className="mt-10 space-y-10">
        {bookingChannel && (
          <article className="border border-foreground/40 bg-background p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                  {bookingChannel.label}
                </p>
                <div className="mt-3 flex items-center gap-2.5 font-display-serif text-xl font-normal text-foreground">
                  <bookingChannel.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  <span>{bookingChannel.value}</span>
                </div>
                <p className="mt-3 text-sm leading-[1.85] text-secondary">
                  {bookingChannel.note}
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {bookingHighlights.map((item) => (
                <span key={item} className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-secondary">
                  {item}
                </span>
              ))}
            </div>
            {bookingChannel.href && (
              <Link
                href={bookingChannel.href}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center bg-foreground p-3.5 font-sans text-sm font-semibold text-background transition-opacity hover:opacity-90 md:w-auto md:px-8"
              >
                {bookingChannel.cta}
              </Link>
            )}
          </article>
        )}

        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {supportChannels.map((channel) =>
            channel.id === "kakao" ? (
              <CopyChannelCard key={channel.label} channel={channel} isKo={isKo} />
            ) : (
              <Link
                key={channel.label}
                href={channel.href ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="group border-t border-border pt-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                      {channel.label}
                    </p>
                    <p className="mt-3 font-display-serif text-lg font-normal text-foreground">{channel.value}</p>
                    <p className="mt-2 text-sm leading-[1.85] text-secondary">{channel.note}</p>
                  </div>
                  <channel.icon className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} />
                </div>
                <div className="tlink mt-5">
                  {channel.cta}
                </div>
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
    </ScrollReveal>
  );
}

function copyTextFallback(text: string): boolean {
  if (typeof document === "undefined") return false;
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(textarea);
  return ok;
}

function CopyChannelCard({
  channel,
  isKo,
}: {
  channel: ContactCopy["channels"][number];
  isKo: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const markCopied = () => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    };
    try {
      await navigator.clipboard.writeText(channel.value);
      markCopied();
    } catch {
      // Async Clipboard API blocked (e.g. no focus); try the legacy fallback.
      if (copyTextFallback(channel.value)) markCopied();
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group border-t border-border pt-6 text-left"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
            {channel.label}
          </p>
          <p className="mt-3 font-display-serif text-lg font-normal text-foreground">{channel.value}</p>
          <p className="mt-2 text-sm leading-[1.85] text-secondary">{channel.note}</p>
        </div>
        <channel.icon className="h-5 w-5 shrink-0 text-primary" strokeWidth={1.5} />
      </div>
      <div className="tlink mt-5">
        {copied ? (isKo ? "복사됨!" : "Copied!") : channel.cta}
      </div>
    </button>
  );
}

type ProcessCopy = ReturnType<typeof getReservationCopy>["process"];

function ProcessSection({ copy }: { copy: ProcessCopy }) {
  return (
    <ScrollReveal>
      <section className="border-t border-border pt-10 md:pt-12">
        <header className="mb-10 space-y-4 text-center md:mb-12">
          <p className="eyebrow">
            {copy.badge}
          </p>
          <h2 className="break-keep font-display-serif text-2xl font-normal leading-[1.4] text-foreground md:text-3xl">
            {copy.title}
          </h2>
          <p className="mx-auto max-w-[30ch] break-keep text-base leading-[1.85] text-secondary md:max-w-2xl md:text-lg">
            {copy.subtitle}
          </p>
        </header>
        <div className="md:hidden space-y-6">
          {copy.steps.map((step, index) => (
            <article
              key={`${step.label}-mobile`}
              className="border-t border-border pt-5"
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                  {step.label}
                </p>
                <span className="font-display-serif text-sm tabular-nums text-foreground/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-2 break-keep font-display-serif text-base font-normal leading-[1.5] text-foreground">
                {step.title}
              </h3>
              <p className="mt-1.5 break-keep text-sm leading-[1.85] text-secondary">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-4 md:gap-8">
          {copy.steps.map((step, index) => (
            <article
              key={`${step.label}-desktop`}
              className="border-t border-border pt-6 text-left"
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                  {step.label}
                </p>
                <span className="font-display-serif text-lg tabular-nums text-foreground/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 mb-2 break-keep font-display-serif text-lg font-normal leading-[1.5] text-foreground">
                {step.title}
              </h3>
              <p className="break-keep text-sm leading-[1.85] text-secondary">
                {step.description}
              </p>
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
    <section className="border-t border-border pt-10 md:pt-12">
      <div className="space-y-4">
        <p className="eyebrow">
          {copy.badge}
        </p>
        <h2 className="font-display-serif text-2xl font-normal leading-[1.4] text-foreground md:text-3xl">
          {copy.title}
        </h2>
      </div>
      <div className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2">
        {copy.items.map((group) => (
          <article
            key={group.title}
            className="border-t border-border pt-6"
          >
            <h3 className="font-display-serif text-base font-normal leading-[1.5] text-foreground">{group.title}</h3>
            <ul className="mt-4 text-sm text-foreground/80">
              {group.points.map((point) => (
                <li key={point} className="flex items-center gap-3 border-b border-border py-2.5">
                  <span className="h-px w-3 flex-shrink-0 bg-primary" />
                  <span className="leading-relaxed">{point}</span>
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
          id: "kakao",
          label: isKo ? "카카오톡" : "KakaoTalk",
          value: "THEHELIA",
          note: isKo
            ? "카카오톡 → 친구추가 → ID 검색에서 위 아이디로 검색해 주세요."
            : "On KakaoTalk, go to Add Friend → Search by ID and enter the ID above.",
          cta: isKo ? "ID 복사하기" : "Copy ID",
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
          title: isKo ? "투어 문의" : "Initial Inquiry",
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
      items: [
        {
          title: isKo ? "상담 준비" : "Preparing for Consultation",
          points: isKo
            ? [
                "방문 시 산모수첩을 꼭 지참해 주세요.",
                "방문 예정일의 객실 운영 상황에 따라 객실 투어가 제한될 수 있습니다.",
                "모든 객실이 만실인 경우에는 객실 투어가 어려우며, 공용 시설 투어만 진행 가능한 점 양해 부탁드립니다."
              ]
            : [
                "Please bring your maternity record book (Maternal Health Record) when visiting",
                "Room tours are subject to room availability on the day of your visit.",
                "If all rooms are fully occupied, only a tour of the common facilities will be available."
              ],
        },
        {
          title: isKo ? "주차 & 이동" : "Parking & Access",
          points: isKo
            ? [
                "MS 메디컬 스퀘어 지하 1층(B1) 또는 지하 2층(B2) 주차장을 이용해 주세요",
                "치즈 아동복 매장 옆 주차장 입구를 통해 진입하시면 편리합니다.",
              ]
            : [
                "Please use the B1 or B2 parking garage at MS Medical Square.",
                "Enter through the parking entrance located next to the Cheese Kids Clothing Store.",
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
