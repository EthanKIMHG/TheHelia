"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import { Star } from "lucide-react";
import Link from "next/link";

const REVIEWS = [
  {
    id: 1,
    author: { ko: "김민지", en: "Minji Kim" },
    date: "2025.01",
    content: {
      ko: "최고급 시설과 친절한 케어 덕분에 편안한 산후조리를 할 수 있었습니다. 정말 감사합니다.",
      en: "Thanks to the top-notch facilities and kind care, I was able to recover comfortably. Thank you so much.",
    },
    initial: "김",
    link: "https://cafe.naver.com/imsanbu/77216967?art=ZXh0ZXJuYWwtc2VydmljZS1uYXZlci1zZWFyY2gtaW50ZW50LXZpZXc=.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYWZlVHlwZSI6IkNBRkVfVVJMIiwiY2FmZVVybCI6Imltc2FuYnUiLCJhcnRpY2xlSWQiOjc3MjE2OTY3LCJpc3N1ZWRBdCI6MTc2NDA1MzAxNDQ2NX0.dkXeh4HbeklBu6GjOT2XUaqMm6J7m9umgHeX30_iCig",
  },
  {
    id: 2,
    author: { ko: "이서연", en: "Seoyeon Lee" },
    date: "2024.12",
    content: {
      ko: "의료진의 전문성과 세심한 배려가 돋보이는 곳입니다. 둘째도 이곳에서 조리하고 싶어요.",
      en: "The professionalism and careful consideration of the medical staff stand out. I want to come back for my second child.",
    },
    initial: "이",
    link: "https://blog.naver.com/jisu9690/224082981058",
  },
  {
    id: 3,
    author: { ko: "박지은", en: "Jieun Park" },
    date: "2024.11",
    content: {
      ko: "음식이 정말 맛있고 영양가 있어요. 모유 수유 교육도 큰 도움이 되었습니다.",
      en: "The food is delicious and nutritious. The breastfeeding education was also very helpful.",
    },
    initial: "박",
    link: "https://blog.naver.com/yoouni77/224022794132",
  },
  // Adding more placeholder reviews to fill the grid
  {
    id: 4,
    author: { ko: "최수진", en: "Sujin Choi" },
    date: "2024.10",
    content: {
      ko: "마사지가 정말 훌륭했습니다. 붓기가 금방 빠져서 몸이 가벼워졌어요.",
      en: "The massage was excellent. The swelling went down quickly and I felt lighter.",
    },
    initial: "최",
    link: "#",
  },
  {
    id: 5,
    author: { ko: "정미영", en: "Miyoung Jung" },
    date: "2024.09",
    content: {
      ko: "남편과 함께 지내기에도 불편함이 없었습니다. 프라이빗한 공간이 너무 좋았어요.",
      en: "It was comfortable to stay with my husband. I loved the private space.",
    },
    initial: "정",
    link: "#",
  },
  {
    id: 6,
    author: { ko: "강혜진", en: "Hyejin Kang" },
    date: "2024.08",
    content: {
      ko: "신생아실 선생님들이 아기를 정말 예뻐해주시는 게 느껴져서 안심이 되었습니다.",
      en: "I felt relieved because I could feel that the nursery teachers really loved the baby.",
    },
    initial: "강",
    link: "#",
  },
];

export function GuestReviewsPageContent() {
  const themeLocale = useOptionalThemeLocale();
  const locale = themeLocale?.locale ?? "ko";
  const isKo = locale === "ko";

  return (
    <div className="w-full">
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {REVIEWS.map((review) => (
            <Link
              key={review.id}
              href={review.link}
              className="group block h-full"
            >
              <div className="h-full bg-white border border-primary/10 dark:bg-[#2A2928]/40 rounded-[2rem] p-8 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5 text-primary fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-foreground/80 text-lg leading-relaxed mb-8 font-medium line-clamp-4">
                    "{isKo ? review.content.ko : review.content.en}"
                  </p>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <p className="font-bold text-foreground text-lg mb-1">
                      {isKo ? review.author.ko : review.author.en}
                    </p>
                    <p className="text-secondary/60 text-sm">
                      {review.date}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:bg-primary group-hover:text-white transition-colors">
                    {review.initial}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
