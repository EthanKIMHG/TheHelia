import { Locale, NavItem, NavItemDefinition, SubNavItemDefinition } from "./types";

export const NAV_ITEMS: NavItemDefinition[] = [
  {
    id: "the-helia",
    label: {
      en: "The Helia",
      ko: "더 헬리아",
    },
    previewImage: {
      src: "/img/subhero/thehelia.jpg",
      alt: {
        en: "The Helia",
        ko: "더 헬리아"
      }
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
        previewCopy: {
          en: "Learn how Helia began and the craft behind every detail.",
          ko: "헬리아의 시작과 섬세한 공간 연출을 만나보세요.",
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
          src: "/img/headerpreview/location.png",
          alt: {
            en: "Map to The Helia",
            ko: "더헬리아 위치 안내 지도",
          },
        },
        previewCopy: {
          en: "Plan your arrival with gentle directions and parking tips.",
          ko: "부담 없이 방문할 수 있는 길 안내와 주차 정보를 확인하세요.",
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
    previewImage: {
      src: "/img/subhero/room&suite.jpg",
      alt: {
        en: "Room & Suites",
        ko: "룸 & 스위트"
      }
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
          src: "/img/headerpreview/prestige.jpg",
          alt: {
            en: "Prestige suite interior",
            ko: "프레스티지 스위트 인테리어",
          },
        },
        previewCopy: {
          en: "Prestige suites offer quiet luxury for the first days together.",
          ko: "프레스티지 스위트에서 조용한 럭셔리를 경험해 보세요.",
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
          src: "/img/headerpreview/vvip.jpg",
          alt: {
            en: "VVIP suite lounge",
            ko: "VVIP 스위트 라운지",
          },
        },
        previewCopy: {
          en: "Your VVIP floor includes bespoke touches and private moments.",
          ko: "VVIP 플로어에서 맞춤형 케어와 프라이빗한 여유를 누려보세요.",
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
          src: "/img/headerpreview/vip.jpg",
          alt: {
            en: "VIP room details",
            ko: "VIP 객실 디테일",
          },
        },
        previewCopy: {
          en: "VIP rooms balance soft light with calming amenities.",
          ko: "VIP 객실에서 은은한 조명과 편안한 어메니티를 느껴보세요.",
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
    previewImage: {
      src: "/img/subhero/service.jpg",
      alt: {
        en: "Service",
        ko: "서비스"
      }
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
          src: "/img/headerpreview/spa.png",
          alt: {
            en: "Helia spa treatment",
            ko: "헬리아 스파 케어",
          },
        },
        previewCopy: {
          en: "Signature therapies restore balance for body and mind.",
          ko: "시그니처 테라피로 몸과 마음의 균형을 회복하세요.",
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
          src: "/img/headerpreview/babyspa.jpg",
          alt: {
            en: "Baby spa session",
            ko: "베이비 스파 세션",
          },
        },
        previewCopy: {
          en: "Gentle floating sessions soothe and delight little ones.",
          ko: "섬세한 베이비 스파로 아기의 미소를 지켜주세요.",
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
          src: "/img/headerpreview/infantroom.png",
          alt: {
            en: "Infant room care",
            ko: "신생아실 케어",
          },
        },
        previewCopy: {
          en: "Warm lighting and expert care keep every baby at ease.",
          ko: "포근한 조명과 전문 케어가 아기를 안심시켜 드립니다.",
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
        previewCopy: {
          en: "Classes bring mothers together with hands-on learning.",
          ko: "산모들이 함께하는 실습형 클래스에 참여해 보세요.",
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
    previewImage: {
      src: "/img/subhero/reservation.jpg",
      alt: {
        en: "Reservation",
        ko: "예약"
      }
    },
    sub: [
      {
        id: "reservation-overview",
        href: "/reservation",
        label: {
          en: "Reservation",
          ko: "예약 하기",
        },
        description: {
          en: "Check availability and request your preferred stay.",
          ko: "원하시는 기간을 확인하고 예약을 신청하세요.",
        },
        previewImage: {
          src: "/img/headerpreview/reservation.png",
          alt: {
            en: "Reservation concierge",
            ko: "예약 컨시어지",
          },
        },
        previewCopy: {
          en: "Reserve easily with personal guides for tailored stays.",
          ko: "맞춤 가이드를 통해 간편하게 예약을 진행하세요.",
        },
      },
      {
        id: "price",
        href: "/reservation/price",
        label: {
          en: "Price",
          ko: "가격 보기",
        },
        description: {
          en: "Browse pricing and tailored package options.",
          ko: "가격 정보와 맞춤 패키지를 살펴보세요.",
        },
        previewImage: {
          src: "/img/headerpreview/price.jpg",
          alt: {
            en: "Price detail brochure",
            ko: "가격 안내 브로슈어",
          },
        },
        previewCopy: {
          en: "Browse pricing tiers and discover seasonal benefits.",
          ko: "가격 구성을 확인하고 시즌 혜택을 살펴보세요.",
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
    previewImage: {
      src: "/img/subhero/stories.jpg",
      alt: {
        en: "Stories",
        ko: "스토리"
      }
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
        previewCopy: {
          en: "Families share heartfelt stories from their Helia stay.",
          ko: "헬리아에서 남긴 가족들의 진솔한 이야기를 전해요.",
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
        previewCopy: {
          en: "Find quick answers and helpful tips for every visit.",
          ko: "방문 전 알아두면 좋은 안내와 답변을 모았습니다.",
        },
      },
    ],
  },
];

type SubPageDefinition = SubNavItemDefinition & { href: string };

const subPageList: SubPageDefinition[] = NAV_ITEMS.flatMap((section) =>
  (section.sub ?? []).map((sub) => ({ ...sub, href: sub.href })),
);

const subPageMap = new Map<string, SubPageDefinition>();
subPageList.forEach((sub) => {
  subPageMap.set(sub.href, sub);
});

const mainPathMap = new Map<string, NavItemDefinition>();

const normalizePath = (value: string) => {
  if (!value) return "/";
  if (!value.startsWith("/")) {
    return `/${value}`;
  }
  return value === "" ? "/" : value;
};

NAV_ITEMS.forEach((section) => {
  if (section.href) {
    mainPathMap.set(normalizePath(section.href), section);
  }
  section.sub?.forEach((sub) => {
    const parentSegments = sub.href.split("/").filter(Boolean).slice(0, -1);
    if (parentSegments.length) {
      const parentPath = normalizePath(parentSegments.join("/"));
      if (!mainPathMap.has(parentPath)) {
        mainPathMap.set(parentPath, section);
      }
    }
  });
});

export function getSubPageContent(path: string, locale: Locale = "ko") {
  const entry = subPageMap.get(path);
  if (!entry) return null;
  return {
    title: entry.label[locale],
    description: entry.description[locale],
    imageSrc: entry.previewImage?.src ?? "/img/main/homepage_1.jpg",
    imageAlt: entry.previewImage?.alt[locale] ?? entry.label[locale],
    copy: entry.previewCopy?.[locale],
  };
}

export function getAvailableSubPages() {
  return Array.from(subPageMap.keys());
}

const normalizeLocaleHref = (locale: Locale, href?: string) => {
  if (!href) return undefined;
  if (href === "/" || href === "") {
    return `/${locale}`;
  }
  const combined = `/${locale}${href}`.replace(/\/{2,}/g, "/");
  return combined.endsWith("/") && combined !== `/${locale}`
    ? combined.slice(0, -1)
    : combined;
};

export function getLocalizedNavItems(locale: Locale): NavItem[] {
  return NAV_ITEMS.map(({ label, description, sub, href, ...rest }) => ({
    ...rest,
    label: label[locale],
    description: description?.[locale],
    href: normalizeLocaleHref(locale, href),
    baseHref: href,
    sub: sub?.map(
      ({
        label: subLabel,
        description: subDescription,
        previewImage,
        previewCopy,
        ...subRest
      }) => ({
        ...subRest,
        label: subLabel[locale],
        description: subDescription[locale],
        href: normalizeLocaleHref(locale, subRest.href),
        baseHref: subRest.href,
        previewImage: previewImage
          ? {
              src: previewImage.src,
              alt: previewImage.alt[locale],
            }
          : undefined,
        previewCopy: previewCopy ? previewCopy[locale] : undefined,
      }),
    ),
  }));
}

export function getMainPageContent(path: string, locale: Locale = "ko") {
  const normalized = normalizePath(path);
  const entry = mainPathMap.get(normalized);
  if (!entry) return null;
  const fallbackPreview = entry.previewImage;
  return {
    title: entry.label[locale],
    description: entry.description?.[locale],
    imageSrc: fallbackPreview?.src ?? "/img/main/homepage_2.jpg",
    imageAlt: fallbackPreview?.alt[locale] ?? entry.label[locale],
  };
}
