"use client";

import { ScrollReveal } from "@/components/common/ScrollReveal";
import type { Locale } from "@/components/header/types";
import { Star } from "lucide-react";
import Link from "next/link";

type HomeReviewsProps = {
  locale: Locale;
  onSectionMount?: (node: HTMLElement | null) => void;
};

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
];

export function HomeReviews({ locale, onSectionMount }: HomeReviewsProps) {
  const isKo = locale === "ko";

  return (
    <section
      ref={onSectionMount ? (node) => onSectionMount(node) : undefined}
      className="w-full py-24 bg-[#FDFBF9] dark:bg-background"
    >
      <ScrollReveal>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
              {isKo ? "Reviews" : "Reviews"}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground leading-tight">
              {isKo ? (
                <>
                  실제 이용하신 분들의<br />
                  <span className="text-primary">소중한 후기</span>
                </>
              ) : (
                <>
                  Precious Reviews from<br />
                  <span className="text-primary">Our Guests</span>
                </>
              )}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
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
                    <p className="text-foreground/80 text-lg leading-relaxed mb-8 font-medium">
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
        </div>
      </ScrollReveal>
    </section>
  );
}
