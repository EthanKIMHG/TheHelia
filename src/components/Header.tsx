"use client";

import clsx from "clsx";
import { GlobeIcon, Languages, Menu, MoonIcon, SidebarCloseIcon, SunIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState, } from "react";

type Locale = "en" | "ko";

type SubNavItemDefinition = {
  id: string;
  href: string;
  label: Record<Locale, string>;
  description: Record<Locale, string>;
  previewImage?: {
    src: string;
    alt: Record<Locale, string>;
  };
};

type NavItemDefinition = {
  id: string;
  href?: string;
  comingSoon?: boolean;
  label: Record<Locale, string>;
  description?: Record<Locale, string>;
  sub?: SubNavItemDefinition[];
};

type NavItem = {
  id: string;
  label: string;
  href?: string;
  description?: string;
  comingSoon?: boolean;
  sub?: NavSubItem[];
};

type NavSubItem = {
  id: string;
  label: string;
  href: string;
  description: string;
  previewImage?: {
    src: string;
    alt: string;
  };
};

const NAV_ITEMS: NavItemDefinition[] = [
  {
    id: "the-helia",
    label: {
      en: "The Helia",
      ko: "더 헬리아",
    },
    sub: [
      {
        id: "about",
        href: "/the-helia/about",
        label: {
          en: "About Helia",
          ko: "더 헬리아",
        },
        description: {
          en: "Meet the story behind The Helia and the people who welcome you with care.",
          ko: "더헬리아의 따뜻한 이야기와 함께하는 사람들을 만나보세요.",
        },
        previewImage: {
          src: "/img/main/homepage_1.jpg",
          alt: {
            en: "Lobby view of The Helia",
            ko: "더헬리아 로비 전경",
          },
        },
      },
      {
        id: "location",
        href: "/the-helia/location",
        label: {
          en: "Location",
          ko: "찾아오시는 길",
        },
        description: {
          en: "Check the easiest route and arrival tips before your visit.",
          ko: "방문 전 가장 편안한 길 안내와 도착 팁을 확인하세요.",
        },
        previewImage: {
          src: "/img/main/homepage_2.jpg",
          alt: {
            en: "Map to The Helia",
            ko: "더헬리아 위치 안내 지도",
          },
        },
      },
    ],
  },
  {
    id: "room&suites",
    label: {
      en: "Room & Suites",
      ko: "룸 & 스위트",
    },
    description: {
      en: "Explore private rooms curated for every stage of recovery.",
      ko: "회복 단계에 맞춘 프라이빗 객실을 만나보세요.",
    },
    sub: [
      {
        id: "prestige",
        href: "/room-suites/prestige",
        label: {
          en: "PRESTIGE",
          ko: "PRESTIGE",
        },
        description: {
          en: "Discover the Prestige Suite prepared for serene recovery.",
          ko: "프레스티지 스위트에서의 고요한 회복 여정을 만나보세요.",
        },
        previewImage: {
          src: "/img/main/homepage_3.jpg",
          alt: {
            en: "Prestige suite interior",
            ko: "프레스티지 스위트 인테리어",
          },
        },
      },
      {
        id: "vvip",
        href: "/room-suites/vvip",
        label: {
          en: "VVIP",
          ko: "VVIP",
        },
        description: {
          en: "Experience our VVIP floor with personalized amenities.",
          ko: "맞춤 케어가 담긴 VVIP 플로어를 경험해 보세요.",
        },
        previewImage: {
          src: "/img/main/homepage_4.jpg",
          alt: {
            en: "VVIP suite lounge",
            ko: "VVIP 스위트 라운지",
          },
        },
      },
      {
        id: "vip",
        href: "/room-suites/vip",
        label: {
          en: "VIP",
          ko: "VIP",
        },
        description: {
          en: "Take a closer look at the calming VIP rooms.",
          ko: "아늑함을 더한 VIP 객실을 살펴보세요.",
        },
        previewImage: {
          src: "/img/main/homepage_5.jpg",
          alt: {
            en: "VIP room details",
            ko: "VIP 객실 디테일",
          },
        },
      },
    ],
  },
  {
    id: "service",
    label: {
      en: "Service",
      ko: "서비스",
    },
    description: {
      en: "Premium care designed for both mother and baby.",
      ko: "산모와 아기를 위한 프리미엄 케어를 만나보세요.",
    },
    sub: [
      {
        id: "helia-spa",
        href: "/service/helia-spa",
        label: {
          en: "Helia Spa",
          ko: "헬리아 스파",
        },
        description: {
          en: "Relax with signature therapies tailored for mothers.",
          ko: "산모를 위한 시그니처 테라피로 몸과 마음을 쉬어가세요.",
        },
        previewImage: {
          src: "/img/main/homepage_6.jpg",
          alt: {
            en: "Helia spa treatment",
            ko: "헬리아 스파 케어",
          },
        },
      },
      {
        id: "baby-spa",
        href: "/service/baby-spa",
        label: {
          en: "Baby Spa",
          ko: "베이비 스파",
        },
        description: {
          en: "Enjoy gentle spa care curated for newborns.",
          ko: "신생아를 위한 섬세한 스파 케어를 만나보세요.",
        },
        previewImage: {
          src: "/img/main/homepage_3.jpg",
          alt: {
            en: "Baby spa session",
            ko: "베이비 스파 세션",
          },
        },
      },
      {
        id: "infant-room",
        href: "/service/infant-room",
        label: {
          en: "Infant Room",
          ko: "신생아실",
        },
        description: {
          en: "See how we create a safe and cozy space for babies.",
          ko: "아기를 위한 안전하고 포근한 공간을 확인해 보세요.",
        },
        previewImage: {
          src: "/img/main/homepage_4.jpg",
          alt: {
            en: "Infant room care",
            ko: "신생아실 케어",
          },
        },
      },
      {
        id: "moms-class",
        href: "/service/moms-class",
        label: {
          en: "Mom's Class",
          ko: "교육 프로그램",
        },
        description: {
          en: "Join classes that support mothers day by day.",
          ko: "하루하루를 채워 줄 산모 클래스와 프로그램을 소개합니다.",
        },
        previewImage: {
          src: "/img/main/homepage_5.jpg",
          alt: {
            en: "Mom's class gathering",
            ko: "산모 교육 프로그램",
          },
        },
      },
    ],
  },
  {
    id: "reservation",
    label: {
      en: "Reservation",
      ko: "예약",
    },
    description: {
      en: "Plan your stay with tailored reservation support.",
      ko: "맞춤 예약 안내와 절차를 확인하세요.",
    },
    sub: [
      {
        id: "reservation-overview",
        href: "/reservation",
        label: {
          en: "Reservation",
          ko: "예약",
        },
        description: {
          en: "Check availability and request your preferred stay.",
          ko: "원하시는 기간을 확인하고 예약을 신청하세요.",
        },
        previewImage: {
          src: "/img/main/homepage_1.jpg",
          alt: {
            en: "Reservation concierge",
            ko: "예약 컨시어지",
          },
        },
      },
      {
        id: "price",
        href: "/price",
        label: {
          en: "Price",
          ko: "가격",
        },
        description: {
          en: "Browse pricing and tailored package options.",
          ko: "가격 정보와 맞춤 패키지를 살펴보세요.",
        },
        previewImage: {
          src: "/img/main/homepage_2.jpg",
          alt: {
            en: "Price detail brochure",
            ko: "가격 안내 브로슈어",
          },
        },
      },
    ],
  },
  {
    id: "stories",
    label: {
      en: "Stories",
      ko: "스토리",
    },
    description: {
      en: "Warm stories and helpful tips from The Helia community.",
      ko: "더헬리아와 함께한 따뜻한 이야기와 유익한 정보를 전해드립니다.",
    },
    sub: [
      {
        id: "guest-reviews",
        href: "/stories/guest-reviews",
        label: {
          en: "Guest Reviews",
          ko: "고객 후기",
        },
        description: {
          en: "Read heartfelt reviews from families who stayed with us.",
          ko: "더헬리아에서 머문 가족들의 진심 어린 후기를 만나보세요.",
        },
        previewImage: {
          src: "/img/main/homepage_6.jpg",
          alt: {
            en: "Guest review moments",
            ko: "고객 후기 장면",
          },
        },
      },
      {
        id: "faq",
        href: "/stories/faq",
        label: {
          en: "FAQ",
          ko: "FAQ",
        },
        description: {
          en: "Find quick answers to the questions we hear most.",
          ko: "자주 문의하시는 내용을 한눈에 확인하세요.",
        },
        previewImage: {
          src: "/img/main/homepage_5.jpg",
          alt: {
            en: "FAQ note board",
            ko: "FAQ 안내 보드",
          },
        },
      },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<NavItem | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [locale, setLocale] = useState<"ko" | "en">("ko");
  const [previewImage, setPreviewImage] = useState<{ src: string; alt: string } | null>(null);
  

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
    } else {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      setTheme(media.matches ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedLocale = window.localStorage.getItem("locale");
    if (storedLocale === "ko" || storedLocale === "en") {
      setLocale(storedLocale);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale;
    if (typeof window !== "undefined") {
      window.localStorage.setItem("locale", locale);
    }
  }, [locale]);

  useEffect(() => {
    if (!activeNav) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveNav(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeNav]);

  const toggleTheme = () =>
    setTheme((current) => (current === "dark" ? "light" : "dark"));

  const toggleLocale = () =>
    setLocale((current) => (current === "ko" ? "en" : "ko"));

  const handleNavClick = (item: NavItem) => {
    setActiveNav((current) => {
      const isSame = current?.id === item.id;
      if (isSame) {
        setPreviewImage(null);
        return null;
      }
      if (item.sub?.length) {
        setPreviewImage(item.sub[0].previewImage ?? null);
      } else {
        setPreviewImage(null);
      }
      return item;
    });
  };

  const closeOverlays = () => {
    setActiveNav(null);
    setMobileOpen(false);
    setPreviewImage(null);
  };

  const navItems = useMemo<NavItem[]>(
    () =>
      NAV_ITEMS.map(({ label, description, sub, ...rest }) => ({
        ...rest,
        label: label[locale],
        description: description?.[locale],
        sub: sub?.map(({ label: subLabel, description: subDescription, previewImage, ...subRest }) => ({
          ...subRest,
          label: subLabel[locale],
          description: subDescription[locale],
          previewImage: previewImage
            ? {
                src: previewImage.src,
                alt: previewImage.alt[locale],
              }
            : undefined,
        })),
      })),
    [locale],
  );

  useEffect(() => {
    setActiveNav(null);
    setMobileOpen(false);
    setPreviewImage(null);
  }, [pathname]);

  useEffect(() => {
    if (!activeNav) return;
    const updated = navItems.find((item) => item.id === activeNav.id);
    if (!updated || updated === activeNav) return;
    setActiveNav(updated);
    if (updated.sub?.length) {
      setPreviewImage(updated.sub[0].previewImage ?? null);
    } else {
      setPreviewImage(null);
    }
  }, [navItems, activeNav]);

  const isActivePath = (item: NavItem) => {
    if (item.sub?.some((subItem) => pathname.startsWith(subItem.href))) {
      return true;
    }
    if (item.id === "the-helia" && pathname === "/") {
      return true;
    }
    if (!item.href) return false;
    if (item.href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(item.href);
  };

  return (
    <header className={clsx("sticky top-0 z-50 w-full border-b border-border bg-background/90 text-lg backdrop-blur supports-[backdrop-filter]:bg-background/70", {
      "font-maru" : locale === "ko",
      "font-source-semi" : locale === "en"
    })}>
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 md:grid md:grid-cols-[auto_1fr_auto] md:gap-10 md:px-6">
        {/* 로고 */}
        <Link href="/" className="flex items-center">
          {theme === "light"
          ?
          <Image
              src="/img/logo/header_logo.png"
              alt="더헬리아 산후조리원 로고"
              width={160}
              height={40}
              priority
              className="h-10 w-auto"
            />
          : 
          <Image
              src="/img/logo/header_logo_white.png"
              alt="더헬리아 산후조리원 로고"
              width={160}
              height={40}
              priority
              className="h-10 w-auto"
            />
            }
        </Link>
        {/* 네비게이터 */}
        <nav className="hidden items-center justify-center md:gap-4 md:flex lg:gap-12">
          {navItems.map((item) => {
            const active = activeNav?.id === item.id || isActivePath(item);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item)}
                aria-haspopup="dialog"
                aria-expanded={activeNav?.id === item.id}
                aria-controls={activeNav?.id === item.id ? "desktop-nav-panel" : undefined}
                className={`relative text-base transition-colors rounded-2xl text-secondary`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-2 left-1/2 h-px w-6 -translate-x-1/2 transition-opacity ${
                    active ? "bg-secondary opacity-100" : "bg-secondary/40 opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </nav>
        {/* 로고 */}
        <div className="ml-auto flex items-center gap-4 md:ml-0 md:gap-1">
          <button
            type="button"
            onClick={toggleLocale}
            className="hidden h-10 w-10 items-center justify-center  text-secondary transition  md:inline-flex"
            aria-label={locale === "ko" ? "Switch to English" : "한국어로 전환"}
          >
            {locale === "ko" ? (
              <Languages className="h-5 w-5" />
            ) : (
              <GlobeIcon className="h-5 w-5" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="hidden h-10 w-10 items-center justify-center text-secondary transition md:inline-flex"
            aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-black/5 active:bg-black/10 md:hidden"
            aria-label="메뉴 열기"
            onClick={() => setMobileOpen(true)}
          >
            <span className="sr-only">모바일 메뉴 열기</span>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <>
        <div className="md:hidden inset-0 bg-black/30 absolute w-full h-screen "></div>
        <div className="md:hidden sticky top-0 z-50">
          <div className="fixed inset-0 z-40 " onClick={closeOverlays} />
          <div className="fixed right-0 inset-y-0 z-50 flex w-full max-w-md h-screen flex-col gap-4 border-l border-black/10 bg-background p-4 shadow-xl">
            <div className="flex h-12 items-center justify-between">
              {theme === "light"
                ?
                <Image
                    src="/img/logo/header_logo.png"
                    alt="더헬리아 산후조리원 로고"
                    width={120}
                    height={20}
                    priority
                    className="h-7 w-auto"
                  />
                : 
                <Image
                    src="/img/logo/header_logo_white.png"
                    alt="더헬리아 산후조리원 로고"
                    width={160}
                    height={40}
                    priority
                    className="h-7 w-auto"
                  />
                  }

            <div className="flex items-center">
              <button
                type="button"
                onClick={toggleLocale}
                className="flex-1 rounded-lg px-3 py-2 text-sm text-secondary "
              >
                {locale === "ko" ? (
                  <div className="flex items-center justify-center gap-2">
                    <Languages className="h-4 w-4" />
                    
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <GlobeIcon className="h-4 w-4" />
                    
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                className="flex-1 px-3 py-2 text-sm  rounded-lg text-secondary transition "
              >
                {theme === "dark" ? (
                  <div className="flex items-center justify-center gap-2">
                    <SunIcon className="h-4 w-4" />
                    
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <MoonIcon className="h-4 w-4" />
                    
                  </div>
                )}
              </button>
              <button
                className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-black/5"
                aria-label="메뉴 닫기"
                onClick={closeOverlays}
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            </div>

            

            <nav className="flex flex-col gap-3">
              {navItems.map((item) => {
                const hasSub = item.sub && item.sub.length > 0;

                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-black/10 p-3"
                  >
                    <span className="text-sm text-secondary">
                      {item.label}
                    </span>
                    {hasSub ? (
                      <ul className="mt-3 flex flex-col gap-2">
                        {item.sub?.map((subItem) => {
                          const active = pathname.startsWith(subItem.href);
                          return (
                            <li key={subItem.id}>
                              <Link
                                href={subItem.href}
                                onClick={closeOverlays}
                                className={clsx(
                                  "block rounded-lg px-3 py-2 text-left transition",
                                  active
                                    ? "bg-black/5 text-secondary"
                                    : "text-secondary/70 hover:bg-black/5 hover:text-secondary",
                                )}
                              >
                                <span className="block text-base">
                                  {subItem.label}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    ) : item.href ? (
                      <Link
                        href={item.href}
                        onClick={closeOverlays}
                        className={clsx(
                          "mt-3 block rounded-lg px-3 py-2 text-left transition",
                          isActivePath(item)
                            ? "bg-black/5 text-secondary"
                            : "text-secondary/70 hover:bg-black/5 hover:text-secondary",
                        )}
                      >
                        <span className="block text-base">{item.label}</span>
                      </Link>
                    ) : null}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
        </>
      )}

      {activeNav && (
        <>
        <div className="inset-0 bg-black/40 top-16 absolute w-full h-screen z-50" onClick={() => setActiveNav(null)}></div>
        <div className="hidden md:block">
          <div
            className="fixed inset-0 top-16 z-40 bg-black/30"
            onClick={() => setActiveNav(null)}
          />
          <div className="fixed left-1/2 top-16 z-50 w-fit md:max-w-xl lg:max-w-2xl -translate-x-1/2">
            <div
              id="desktop-nav-panel"
              role="dialog"
              aria-labelledby="desktop-nav-heading"
              aria-modal="true"
              className=" bg-background p-8 pb-9 rounded-b-2xl border-border border-[1px] flex gap-14 justify-center"
            >
              <div className="flex flex-col justify-between gap-6">
                  <h3 id="desktop-nav-heading" className="text-2xl text-secondary ">
                    {activeNav.label}
                  </h3>
                <div className="flex-1">
                  <div className="flex flex-col gap-2">
                    {activeNav.sub?.map((subItem) => {
                      const activePath = pathname.startsWith(subItem.href);
                      const matchesPreview =
                        !!previewImage &&
                        !!subItem.previewImage &&
                        previewImage.src === subItem.previewImage.src;
                      const isActive = activePath || matchesPreview;
                      return (
                        <Link
                          key={subItem.id}
                          href={subItem.href}
                          onClick={() => {
                            setActiveNav(null);
                            setPreviewImage(null);
                          }}
                          onMouseEnter={() =>
                            setPreviewImage(subItem.previewImage ?? null)
                          }
                          onFocus={() =>
                            setPreviewImage(subItem.previewImage ?? null)
                          }
                          className={clsx(
                            "flex items-center justify-between rounded-2xl py-2 text-left transition",
                            isActive
                              ? "text-primary underline underline-offset-8"
                              : "text-primary",
                          )}
                        >
                          <span className="text-lg truncate">
                            {subItem.label}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className=" flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
                <div className="hidden md:block h-full w-px bg-border" aria-hidden />

                <div className="hidden md:flex w-[280px] shrink-0 flex-col items-center justify-center gap-3">
                  <div className="relative h-[190px] w-full overflow-hidden rounded-2xl border border-foreground/10 bg-black/5">
                    {previewImage ? (
                      <Image
                        src={previewImage.src}
                        alt={previewImage.alt}
                        
                        width={280}
                        height={190}
                        sizes="280px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  {previewImage?.alt ? (
                    <span className="text-xs text-secondary/50 text-center">
                      {previewImage.alt}
                    </span>
                  ) : (
                    <span className="text-xs text-secondary/40">
                      이미지를 선택해 보세요
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
    </header>
  );
}
