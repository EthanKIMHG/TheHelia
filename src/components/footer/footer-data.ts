export type FooterLink = {
  label: string;
  href?: string;
};

export type FooterSection = {
  title: string;
  items: FooterLink[];
};

export type ConsultationBlock = {
  title: string;
  hours: string;
  note?: string;
};

export type FooterCopy = {
  tagline: string;
  description: string;
  linkLabel: {
    reservation: string;
    location: string;   
  }
  contact: {
    address: string;
    phone: string;
    email: string;
    biz: string;
    instagram: string
  };
  sections: FooterSection[];
  consultation: {
    weekday: ConsultationBlock;
    weekend: ConsultationBlock;
  };
  copyright: string;
};

export const FOOTER_CONTENT: Record<"ko" | "en", FooterCopy> = {
  ko: {
    tagline: "더헬리아 산후조리원",
    description:
      "휴식과 회복, 그리고 가족의 시간을 담아내는 프리미엄 산후케어 공간입니다.",
    linkLabel: {
      reservation: "예약 안내",
      location: "찾아 오시는 길"
    },
    contact: {
      address:
        "경기도 수원시 권선구 금곡로 197번길 18-39, 5,6층(금곡동, MS메디컬스퀘어)",
      phone: "010-5077-3962",
      email: "pyrite1@naver.com",
      biz: "481-41-00935",
      instagram: "@thehelia_official"
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
    linkLabel: {
      reservation: "Reservation",
      location: "Location"
    },
    contact: {
      address:
        "18-39, Geumgok-ro 197beon-gil, Gwonseon-gu, Suwon-si, Gyeonggi-do, Republic of Korea",
      phone: "+82-10-5077-3962",
      email: "pyrite1@naver.com",
      biz: "481-41-00935",
      instagram: "@thehelia_official"
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
