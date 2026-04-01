"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import {
  Building,
  Calendar1Icon,
  CalendarClock,
  FileText,
  Instagram,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  X,
} from "lucide-react";

import { useThemeLocale } from "@/context/theme-locale-context";
import { FOOTER_CONTENT } from "./footer/footer-data";

export function Footer() {
  const { locale } = useThemeLocale();
  const lenis = useLenis();
  const copy = FOOTER_CONTENT[locale];
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [policyModalTitle, setPolicyModalTitle] = useState("");
  const [policyTextByLocale, setPolicyTextByLocale] = useState<{
    ko: string;
    en: string;
  }>({
    ko: "",
    en: "",
  });
  const [isPolicyLoading, setIsPolicyLoading] = useState(false);
  const [policyLoadError, setPolicyLoadError] = useState<string | null>(null);
  const policyText = policyTextByLocale[locale];

  const policyLabels =
    locale === "ko"
      ? ["이용약관", "개인정보 처리방침"]
      : ["Terms of Service", "Privacy Policy"];

  const isPolicyItem = (label: string) => policyLabels.includes(label);

  const closePolicyModal = () => {
    setIsPolicyModalOpen(false);
  };

  const openPolicyModal = async (title: string) => {
    setPolicyModalTitle(title);
    setIsPolicyModalOpen(true);

    if (policyTextByLocale[locale] || isPolicyLoading) return;

    setPolicyLoadError(null);
    setIsPolicyLoading(true);
    try {
      const response = await fetch(`/api/terms-policy?locale=${locale}`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch terms and policy");
      }
      const text = await response.text();
      setPolicyTextByLocale((prev) => ({ ...prev, [locale]: text }));
    } catch {
      setPolicyLoadError(
        locale === "ko"
          ? "약관/정책 내용을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."
          : "Unable to load the terms and policy right now. Please try again.",
      );
    } finally {
      setIsPolicyLoading(false);
    }
  };

  useEffect(() => {
    if (!isPolicyModalOpen) return;

    lenis?.stop();
    const scrollY = window.scrollY;
    const previousBodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
    };
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPolicyModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyStyles.overflow;
      document.body.style.position = previousBodyStyles.position;
      document.body.style.top = previousBodyStyles.top;
      document.body.style.left = previousBodyStyles.left;
      document.body.style.right = previousBodyStyles.right;
      document.body.style.width = previousBodyStyles.width;
      window.scrollTo(0, scrollY);
      lenis?.start();
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isPolicyModalOpen, lenis]);

  return (
    <footer className="bg-[#191919] px-6 py-14 text-white md:px-12 md:py-20">
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
              <Link href={`/${locale}/reservation`} className=" cursor-pointer hover:underline underline-offset-4 rounded-xl p-2 px-4 border-border/30 border-[1px] ">
                <span className="text-base">{copy.linkLabel.reservation}</span>
              </Link>
              <Link href={`/${locale}/the-helia/location`} className=" cursor-pointer underline-offset-4  hover:underline rounded-xl p-2 px-4 border-border/30 border-[1px]">
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
                <p className="mt-2 text-xs text-white/80">{block.note}</p>
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
                  ) : isPolicyItem(item.label) ? (
                    <button
                      type="button"
                      key={item.label}
                      onClick={() => void openPolicyModal(item.label)}
                      className="w-fit text-left transition hover:text-primary/80"
                    >
                      {item.label}
                    </button>
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
            {copy.sections[2].items.map((item) =>
              isPolicyItem(item.label) ? (
                <button
                  type="button"
                  key={item.label}
                  onClick={() => void openPolicyModal(item.label)}
                  className="text-left transition hover:text-primary/80"
                >
                  {item.label}
                </button>
              ) : (
                <span key={item.label}>{item.label}</span>
              ),
            )}
          </div>
        </div>
      </div>

      {isPolicyModalOpen ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/68 px-4 py-5 backdrop-blur-[3px] md:px-10"
          onClick={closePolicyModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="policy-modal-title"
            className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#e4d8c8]/22 bg-[linear-gradient(160deg,rgba(33,30,28,0.96),rgba(15,14,13,0.97))] p-5 shadow-[0_34px_120px_rgba(0,0,0,0.56)] md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute left-0 top-0 h-24 w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d7c3ab]/28 bg-[#d5c0a8]/12 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#f1dfcc]/82">
                  <FileText className="h-3.5 w-3.5" />
                  {locale === "ko" ? "정책 안내" : "Policy Notice"}
                </div>
                <h3
                  id="policy-modal-title"
                  className="text-xl font-semibold tracking-[0.02em] text-[#f8efe4] md:text-2xl"
                >
                  {policyModalTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#d8c8b8]/78">
                  {locale === "ko"
                    ? "스크롤하여 이용약관 및 개인정보 처리방침 전문을 확인하세요."
                    : "Scroll to read the full Terms of Service and Privacy Policy text."}
                </p>
              </div>
              <button
                type="button"
                aria-label={locale === "ko" ? "모달 닫기" : "Close modal"}
                onClick={closePolicyModal}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#f0dcc4]/24 bg-[#f0dcc4]/10 text-[#f7ece0] transition hover:bg-[#f0dcc4]/18"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              data-lenis-prevent
              className="mt-6 max-h-[68vh] overflow-y-auto overscroll-contain rounded-2xl border border-[#e4d6c5]/14 bg-[#0f0f0f]/35 p-5 touch-pan-y md:p-7"
            >
              {isPolicyLoading ? (
                <p className="text-sm text-[#efe1d1]/78">
                  {locale === "ko"
                    ? "약관/정책 내용을 불러오는 중입니다..."
                    : "Loading terms and policy..."}
                </p>
              ) : policyLoadError ? (
                <p className="text-sm text-[#ffb4b4]">{policyLoadError}</p>
              ) : (
                <pre
                  className={`whitespace-pre-wrap break-words text-[13px] leading-[1.95] tracking-[0.01em] text-[#f3e7da]/90 md:text-[15px] ${locale === "ko" ? "font-maru-semi" : "font-source-semi"}`}
                >
                  {policyText}
                </pre>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </footer>
  );
}
