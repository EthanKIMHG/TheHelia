"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/facility", label: "시설" },
  { href: "/price", label: "이용요금" },
  { href: "/reservation", label: "예약" },
  { href: "/contact", label: "문의" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/70 bg-background/90 border-b border-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="h-16 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/img/logo/header_logo.png"
              alt="더헬리아 산후조리원 로고"
              width={200}
              height={200}
              priority
              sizes="(max-width: 768px) 140px, (max-width: 1024px) 180px, 220px"
              className="block w-auto max-h-8 sm:max-h-10 md:max-h-12 lg:max-h-14"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-12">
            {navItems.map((item) => {
              const active = item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "text-md font-medium transition-colors",
                    active ? "text-secondary" : "text-secondary/60 hover:text-secondary",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-black/5 active:bg-black/10"
            aria-label="메뉴 열기"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">메뉴</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />
          {/* Panel */}
          <div className="fixed inset-y-0 right-0 w-72 max-w-[85%] bg-background shadow-xl border-l border-[color:rgb(0,0,0,0.06)] p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between h-12">
              <span className="font-semibold">메뉴</span>
              <button
                className="inline-flex items-center justify-center h-9 w-9 rounded-md hover:bg-black/5"
                aria-label="메뉴 닫기"
                onClick={() => setOpen(false)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const active = item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={[
                      "px-2 py-2 rounded-md text-base",
                      active ? "bg-black/5 text-black" : "text-black/70 hover:bg-black/5 hover:text-black",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
