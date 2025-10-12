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
import { FOOTER_CONTENT } from "./footer/footer-data";

export function Footer() {
  const { locale } = useThemeLocale();
  const copy = FOOTER_CONTENT[locale];
  const fontClass = locale === "ko" ? "font-maru" : "font-source-semi";
  console.log(locale)
  return (
    <footer
      className={clsx(
        "bg-[#191919] px-6 py-14 text-white md:px-12 md:py-20",
        fontClass,
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 ">
        <div className="flex flex-col xl:gap-32 md:gap-12 md:flex-row md:items-start md:justify-between gap-4">
          <div className="max-w-xl ">
            <span className="inline-block py-2 text-base uppercase tracking-[0.18em] text-primary">
              {copy.tagline}
            </span>
            <p className="text-[24px] font-semibold leading-relaxed">
              {copy.description}
            </p>
            <div className="flex gap-4 mt-3">
              <Link href={`/${locale}/reservation`} className=" cursor-pointer hover:underline underline-offset-4 rounded-xl p-2 border-border/20 border-[1px] ">
                <span className="text-base">{copy.linkLabel.reservation}</span>
              </Link>
              <Link href={`/${locale}/the-helia/location`} className=" cursor-pointer underline-offset-4  hover:underline rounded-xl p-2 border-border/20 border-[1px]">
                <span className="text-base">{copy.linkLabel.location}</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-start gap-3">
              <MapPinIcon className="h-4 w-4" />
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
          {(
            [copy.consultation.weekday, copy.consultation.weekend] as const
          ).map((block, idx) => (
            <div
              key={block.title}
              className="rounded-3xl border border-white/12 bg-[#141414] p-6"
            >
              <div className="flex items-center gap-3 text-white/82">
                {idx === 0 ? (
                  <Calendar1Icon className="h-6 w-6 text-primary" />
                ) : (
                  <CalendarClock className="h-6 w-6 text-primary" />
                )}
                <span className="text-sm font-semibold uppercase tracking-[0.18em]">
                  {block.title}
                </span>
              </div>
              <div className="mt-4 text-[22px] font-semibold text-white">
                {block.hours}
              </div>
              {block.note && (
                <p className="mt-2 text-xs text-foreground">{block.note}</p>
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-8 border-t border-white/12 pt-8 md:grid-cols-3">
          {copy.sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
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

        <div className="flex flex-col gap-3 border-t border-white/12 pt-6 text-xs text-foreground md:flex-row md:items-center md:justify-between">
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
