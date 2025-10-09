"use client";

import clsx from "clsx";
import Link from "next/link";
import {
  Building,
  Calendar1Icon,
  CalendarClock,
  Instagram,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";
import { useThemeLocale } from "@/context/theme-locale-context";

type FooterSection = {
  title: string;
  items: { label: string; href?: string }[];
};

type FooterContent = {
  tagline: string;
  description: string;
  contact: {
    address: string;
    phone: string;
    email: string;
    biz: string;
    instagram: string;
  };
  sections: FooterSection[];
  consultation: {
    weekday: { title: string; hours: string; note?: string };
    weekend: { title: string; hours: string; note?: string };
  };
  copyright: string;
};

const FOOTER_COPY: Record<"ko" | "en", FooterContent> = {
  ko: {
    tagline: "더헬리아 산후조리원",
    description:
      "휴식과 회복, 그리고 가족의 시간을 담아내는 프리미엄 산후케어 공간입니다.",
    contact: {
      address:
        "경기도 수원시 권선구 금곡로 197번길 18-39, 5,6층(금곡동, MS메디컬스퀘어)",
      phone: "010-5077-3962",
      email: "Pyrite1@naver.com",
      biz: "481-41-00935",
      instagram: "@thehelia-official"
    },
    sections: [
      {
        title: "둘러보기",
        items: [
          { label: "룸 & 스위트", href: "/ko/room-suites/prestige" },
          { label: "서비스", href: "/ko/service/helia-spa" },
          { label: "예약 안내", href: "/ko/reservation" },
          { label: "가격", href: "/ko/reservation/price" },
        ],
      },
      {
        title: "스토리",
        items: [
          { label: "고객 후기", href: "/ko/stories/guest-reviews" },
          { label: "FAQ", href: "/ko/stories/faq" },
        ],
      },
      {
        title: "정책",
        items: [
          { label: "이용약관" },
          { label: "개인정보 처리방침" },
        ],
      },
    ],
    consultation: {
      weekday: {
        title: "평일 상담",
        hours: "09:00 - 18:00",
        note: "점심시간 12:00 - 13:00 (예약상담 우선)",
      },
      weekend: {
        title: "주말 · 공휴일",
        hours: "10:00 - 16:00",
        note: "사전 예약 후 방문 안내",
      },
    },
    copyright: "© 더헬리아 산후조리원. All rights reserved 2023.",
  },
  en: {
    tagline: "The Helia Post Partum Care Center",
    description:
      "A premium sanctuary curated for recovery, rest, and cherished family moments.",
    contact: {
      address:
        "18-39, Geumgok-ro 197beon-gil, Gwonseon-gu, Suwon-si, Gyeonggi-do, Republic of Korea",
      phone: "+82-10-5077-3962",
      email: "hello@thehelia.co.kr",
      biz: "481-41-00935",
      instagram: "@thehelia-official"
    },
    sections: [
      {
        title: "Explore",
        items: [
          { label: "Rooms & Suites", href: "/en/room-suites/prestige" },
          { label: "Services", href: "/en/service/helia-spa" },
          { label: "Reservation", href: "/en/reservation" },
          { label: "Pricing", href: "/en/reservation/price" },
        ],
      },
      {
        title: "Stories",
        items: [
          { label: "Guest Reviews", href: "/en/stories/guest-reviews" },
          { label: "FAQ", href: "/en/stories/faq" },
        ],
      },
      {
        title: "Policies",
        items: [
          { label: "Terms of Service" },
          { label: "Privacy Policy" },
        ],
      },
    ],
    consultation: {
      weekday: {
        title: "Weekday Consultation",
        hours: "09:00 - 18:00",
        note: "Lunch 12:00 - 13:00 (Reservation priority)",
      },
      weekend: {
        title: "Weekend & Holidays",
        hours: "10:00 - 16:00",
        note: "Visits available only with reservation",
      },
    },
    copyright: "© The Helia Retreat. All rights reserved. 2023",
  },
};

export function Footer() {
  const { locale } = useThemeLocale();
  const isKorean = locale === "ko";
  const copy = FOOTER_COPY[locale];
  const fontClass = isKorean ? "font-maru" : "font-source-semi";

  return (
    <footer
      className={clsx(
        "bg-[#191919] px-6 py-14 text-white md:px-12 md:py-20",
        fontClass,
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl space-y-4">
            <span className="inline-block py-2 text-base uppercase tracking-[0.18em] text-primary">
              {copy.tagline}
            </span>
            <p className="text-[28px] font-semibold leading-relaxed">
              {copy.description}
            </p>
          </div>
          <div className="flex flex-col gap-4 text-sm text-foreground">
            <div className="flex items-start gap-3">
              <MapPinIcon className="h-4 w-4 " />
              <span className="text-sm md:text-base">{copy.contact.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <PhoneIcon className="h-4 w-4 " />
              <span className="text-sm md:text-base">{copy.contact.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MailIcon className="h-4 w-4 " />
              <span className="text-sm md:text-base">{copy.contact.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Building className="h-4 w-4 " />
              <span className="text-sm md:text-base">biz: {copy.contact.biz}</span>
            </div>
            <div className="flex items-center gap-3">
              <Instagram className="h-4 w-4 " />
              <span className="text-sm md:text-base">{copy.contact.instagram}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/12 bg-[#141414] p-6">
            <div className="flex items-center gap-3 text-white/80">
              <Calendar1Icon className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold uppercase tracking-[0.18em]">
                {copy.consultation.weekday.title}
              </span>
            </div>
            <div className="mt-4 text-2xl font-semibold text-white">
              {copy.consultation.weekday.hours}
            </div>
            {copy.consultation.weekday.note && (
              <p className="mt-2 text-xs text-white/60">
                {copy.consultation.weekday.note}
              </p>
            )}
          </div>
          <div className="rounded-3xl border border-white/12 bg-[#141414] p-6">
            <div className="flex items-center gap-3 text-white/80">
              <CalendarClock className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold uppercase tracking-[0.18em]">
                {copy.consultation.weekend.title}
              </span>
            </div>
            <div className="mt-4 text-2xl font-semibold text-white">
              {copy.consultation.weekend.hours}
            </div>
            {copy.consultation.weekend.note && (
              <p className="mt-2 text-xs text-white/60">
                {copy.consultation.weekend.note}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-8 border-t border-white/12 pt-8 md:grid-cols-3">
          {copy.sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                {section.title}
              </h4>
              <div className="flex flex-col gap-3 text-sm text-white/82">
                {section.items.map((item) =>
                  item.href ? (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="transition hover:text-primary/80"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span key={item.label}>{item.label}</span>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/12 pt-6 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <span>{copy.copyright}</span>
          <div className="flex gap-5">
            {copy.sections[2].items.map((item) => (
              <span key={item.label}>{item.label}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}