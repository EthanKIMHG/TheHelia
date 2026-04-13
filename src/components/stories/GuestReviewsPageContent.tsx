"use client";

import { FadeInUp } from "@/components/common/FadeInUp";
import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import { Quote, Star } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
const REVIEWS = [
  {
    id: 1,
    author: { ko: "뚱기 님", en: "Ddoonggi" },
    date: "2026.02",
    content: {
      ko: "VIP룸 2주 이용 후기에서 객실 컨디션과 위생 관리, 24시간 확인 가능한 신생아실, 베이비스파·목욕교육까지 전반 만족도가 높았다고 전합니다.",
      en: "This 2-week VIP review highlights strong room condition, hygiene routines, a nursery viewable anytime, and high satisfaction with baby spa and bathing education.",
    },
    initial: "뚱",
    link: "https://blog.naver.com/wodllove2/224199420109",
    platform: "blog",
    thumbnail: "/img/room/vip.jpg"
  },
  {
    id: 2,
    author: { ko: "하용이네", en: "Hayong's Story" },
    date: "2024.10",
    content: {
      ko: "조기출산으로 대기방부터 시작했지만 상담실 앞 신생아실 동선과 빠른 케어 대응이 특히 좋았고, 마사지·유축·식사 흐름도 실사용 관점에서 자세히 담긴 후기예요.",
      en: "Even starting from a waiting room due to early delivery, this review praises fast nursery-side care flow and gives practical details on massage, pumping, and meals.",
    },
    initial: "하",
    link: "https://blog.naver.com/jjcokoboolhj/223630616760",
    platform: "blog",
    thumbnail: "/img/headerpreview/infantroom.png"
  },
  {
    id: 3,
    author: { ko: "꼬대장 님", en: "Kkodaejang" },
    date: "2026.04",
    content: {
      ko: "산전케어 후기로, 컨디션에 맞춰 강도를 조절해주는 세심한 마사지와 산전·산후 패키지 구성이 구체적으로 정리되어 있어 관리 선택에 도움이 되는 글입니다.",
      en: "A prenatal care-focused review that details tailored massage intensity and package options, useful for deciding between prenatal and postpartum care programs.",
    },
    initial: "꼬",
    link: "https://blog.naver.com/kkodaejang/224247014451",
    platform: "blog",
    thumbnail: "/img/spa/spa_main.png"
  },
  {
    id: 4,
    author: { ko: "오늘 님", en: "Oneul" },
    date: "2025.04",
    content: {
      ko: "VIP 2주 기록 중심 후기로 객실 기본기와 신생아실/젤리캠 접근성, 남편 동반 동선, 붓기 관리에 도움된 마사지 경험까지 균형 있게 다뤘습니다.",
      en: "This 2-week VIP diary balances room basics, nursery/JellyCam access, partner-friendly flow, and massage experiences that helped with swelling recovery.",
    },
    initial: "오",
    link: "https://blog.naver.com/dongkozip/223828057989",
    platform: "blog",
    thumbnail: "/img/room/prestige5.jpg"
  },
  {
    id: 5,
    author: { ko: "단비 님", en: "Danbi" },
    date: "2026.02",
    content: {
      ko: "내돈내산 VIP 후기에서 웰컴키트·객실 비품·유축 환경과 함께 세탁/청소 서비스 만족도가 높고, 모자동실과 회복 루틴이 편했다는 점이 핵심입니다.",
      en: "A self-paid VIP review emphasizing welcome kit quality, in-room pumping setup, and highly rated laundry/cleaning support that made recovery and rooming-in easier.",
    },
    initial: "단",
    link: "https://blog.naver.com/taetae_1201/224179921722",
    platform: "blog",
    thumbnail: "/img/room/vvip6.jpg"
  },
  {
    id: 6,
    author: { ko: "초이 님", en: "Choi" },
    date: "2026.01",
    content: {
      ko: "프레스티지 13박14일 후기로 입소 초기 교육(수유·기저귀·유축)과 2:1 케어, 식단·간식·프로그램 참여 동선까지 실제 하루 루틴을 구체적으로 정리했어요.",
      en: "A 13-night Prestige review covering early education (feeding, diapering, pumping), 2:1 infant care, and a realistic daily rhythm of meals, snacks, and programs.",
    },
    initial: "초",
    link: "https://blog.naver.com/rlorxya/224158217705",
    platform: "blog",
    thumbnail: "/img/infant/strength_infant1.jpg"
  },
];

export function GuestReviewsPageContent() {
  const themeLocale = useOptionalThemeLocale();
  const locale = themeLocale?.locale ?? "ko";
  const isKo = locale === "ko";

  return (
    <div className="w-full pb-20">
      <FadeInUp>
          <div className="mb-12 text-left md:mb-20 md:text-center">
              <span className="mb-4 block font-sans text-sm font-bold uppercase tracking-[0.2em] text-primary">
                  {isKo ? "생생한 이용 후기" : "Real Stories"}
              </span>
              <h1 className="font-serif text-3xl font-bold leading-[1.26] break-keep text-foreground md:text-4xl md:leading-tight">
                  {isKo ? "엄마들의 진솔한 이야기" : "Reviews from Families"}
              </h1>
              <p className="mt-6 max-w-[30ch] break-keep text-base leading-relaxed text-foreground/85 md:mx-auto md:max-w-2xl md:text-lg">
                  {isKo 
                   ? "헬리아와 함께한 소중한 경험들을 만나보세요. 산모님들의 편안한 회복이 저희의 가장 큰 보람입니다." 
                   : "Meet the precious experiences with The Helia. Mothers' comfortable recovery is our greatest reward."}
              </p>
          </div>
      </FadeInUp>

      <div className="columns-1 gap-6 px-4 md:columns-2 lg:columns-3 xl:gap-8">
        {REVIEWS.map((review, idx) => {
           const CardContent = (
             <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-stone-50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:bg-stone-900 border border-stone-100 dark:border-white/5">
                {/* Decorative Background Icon */}
                <Quote className="absolute -right-4 -top-4 h-32 w-32 rotate-12 text-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-10 dark:text-white/5" />
                
                {/* Thumbnail Image */}
                {review.thumbnail && (
                    <div className="relative h-48 w-full overflow-hidden mb-6 rounded-2xl">
                        <NextImage 
                            src={review.thumbnail} 
                            alt="Review Thumbnail" 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-50/20 dark:from-stone-900/20 to-transparent" />
                    </div>
                )}
                
                <div className={`relative z-10 ${!review.thumbnail ? 'p-8 pt-12' : 'px-8 pb-8'}`}>
                  {!review.thumbnail && <Quote className="mb-4 h-8 w-8 text-primary/20" />}
                  
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 text-primary fill-current"
                      />
                    ))}
                  </div>

                  <p className="text-foreground/90 text-lg leading-relaxed mb-8 font-serif italic dark:text-stone-300">
                    "{isKo ? review.content.ko : review.content.en}"
                  </p>
                
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-stone-200 dark:border-white/10">
                    <div>
                        <p className="font-bold text-foreground text-base mb-1">
                        {isKo ? review.author.ko : review.author.en}
                        </p>
                        <p className="text-stone-400 text-xs uppercase tracking-wider font-medium">
                        {review.date}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {review.link && (
                            <span className="text-xs font-bold text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                View Review
                            </span>
                        )}
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-stone-800 shadow-sm border border-stone-100 dark:border-white/5 text-stone-600 dark:text-stone-300 flex items-center justify-center font-serif text-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            {review.initial}
                        </div>
                    </div>
                  </div>
                </div>
              </div>
           );

           return (
             <FadeInUp key={review.id} delay={idx * 0.1}>
                 <div className="mb-6 break-inside-avoid xl:mb-8">
                     {review.link ? (
                         <Link href={review.link} target="_blank" className="group block h-full">
                             {CardContent}
                         </Link>
                     ) : (
                         <div className="group block h-full cursor-default">
                             {CardContent}
                         </div>
                     )}
                 </div>
             </FadeInUp>
           );
        })}
      </div>
    </div>
  );
}
