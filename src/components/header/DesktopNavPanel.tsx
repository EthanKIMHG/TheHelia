"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { Locale, NavItem, NavSubItem, PreviewData } from "./types";

type DesktopNavPanelProps = {
  activeNav: NavItem | null;
  previewData: PreviewData | null;
  locale: Locale;
  normalizedPath: string;
  onClose: () => void;
  onPreviewChange: (data: PreviewData | null) => void;
  buildPreviewData: (subItem?: NavSubItem | null) => PreviewData | null;
};

export function DesktopNavPanel({
  activeNav,
  previewData,
  locale,
  normalizedPath,
  onClose,
  onPreviewChange,
  buildPreviewData,
}: DesktopNavPanelProps) {
  if (!activeNav || !activeNav.sub?.length) {
    return null;
  }

  const handlePreview = (subItem?: NavSubItem) => {
    onPreviewChange(buildPreviewData(subItem));
  };

  return (
    <div className="hidden md:block">
      <div className="fixed inset-0 top-16 z-40 bg-black/30" onClick={onClose} />
      <div className="fixed left-1/2 top-16 z-50 w-fit -translate-x-1/2 md:max-w-xl lg:max-w-2xl">
        <div
          id="desktop-nav-panel"
          role="dialog"
          aria-labelledby="desktop-nav-heading"
          aria-modal="true"
          className="flex justify-center gap-14 rounded-b-2xl border-[1px] border-t-0 border-border bg-background p-8 pb-9"
        >
          <div className="flex flex-col justify-between gap-6">
            <h3 id="desktop-nav-heading" className="text-lg text-secondary">
              {activeNav.label}
            </h3>
            <div className="flex-1">
              <div className="flex flex-col gap-2">
                {activeNav.sub.map((subItem) => {
                  const activePath = normalizedPath.startsWith(subItem.baseHref);
                  const matchesPreview =
                    !!previewData && !!subItem.previewImage && previewData.src === subItem.previewImage.src;
                  const isActive = activePath || matchesPreview;
                  return (
                    <Link
                      key={subItem.id}
                      href={subItem.href}
                      onClick={onClose}
                      onMouseEnter={() => handlePreview(subItem)}
                      onFocus={() => handlePreview(subItem)}
                      className="inline-flex py-1 text-left text-base text-primary transition"
                    >
                      <span
                        className={clsx(
                          "truncate border-b border-transparent pb-1 hover:underline hover:underline-offset-8",
                          isActive && "border-primary",
                        )}
                      >
                        {subItem.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
            <div className="hidden h-full w-px bg-border md:block" aria-hidden />

            <div className="hidden w-[260px] shrink-0 flex-col items-center justify-center gap-3 md:flex">
              <div className="relative flex h-[300px] w-full flex-col overflow-hidden rounded-2xl border-[1px] border-border/40 bg-background">
                {previewData ? (
                  <Image
                    src={previewData.src}
                    alt={previewData.alt}
                    width={260}
                    height={210}
                    sizes="(min-width: 768px) 260px, 100vw"
                    className="h-[210px] w-full object-cover"
                  />
                ) : null}
                <div className="flex flex-1 flex-col items-start justify-center px-4 py-3">
                  <span className="text-sm text-secondary">
                    {previewData?.label ??
                      (locale === "ko" ? "헬리아 미리보기" : "Helia Preview")}
                  </span>
                  <span className="mt-1 text-xs text-secondary/70">
                    {previewData?.copy ??
                      (locale === "ko"
                        ? "원하는 메뉴를 선택하면 소개가 제공돼요."
                        : "Choose a submenu to reveal its story.")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
