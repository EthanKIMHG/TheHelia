"use client";

import { FadeInUp } from "@/components/common/FadeInUp";
import { useOptionalThemeLocale } from "@/context/theme-locale-context";
import { Quote, Star } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
const REVIEWS = [
  {
    id: 1,
    author: { ko: "김민지", en: "Minji Kim" },
    date: "2025.01",
    content: {
      ko: "최고급 시설과 친절한 케어 덕분에 편안한 산후조리를 할 수 있었습니다. 특히 룸 컨디션이 호텔 같아서 2주 동안 정말 힐링하는 기분이었어요. 식사도 매끼 너무 훌륭했습니다.",
      en: "Thanks to the top-notch facilities and kind care, I was able to recover comfortably. The room condition was like a hotel, so I felt truly healed for 2 weeks. The meals were excellent every time.",
    },
    initial: "김",
    link: "https://cafe.naver.com/imsanbu/77216967?art=ZXh0ZXJuYWwtc2VydmljZS1uYXZlci1zZWFyY2gtaW50ZW50LXZpZXc=.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYWZlVHlwZSI6IkNBRkVfVVJMIiwiY2FmZVVybCI6Imltc2FuYnUiLCJhcnRpY2xlSWQiOjc3MjE2OTY3LCJpc3N1ZWRBdCI6MTc2NDA1MzAxNDQ2NX0.dkXeh4HbeklBu6GjOT2XUaqMm6J7m9umgHeX30_iCig",
    platform: "cafe",
    thumbnail: "/img/room/vip.jpg"
  },
  {
    id: 2,
    author: { ko: "이서연", en: "Seoyeon Lee" },
    date: "2024.12",
    content: {
      ko: "의료진의 전문성과 세심한 배려가 돋보이는 곳입니다. 소아과 회진 때 꼼꼼하게 봐주셔서 안심할 수 있었어요. 둘째도 꼭 여기서 조리하고 싶습니다.",
      en: "The professionalism and careful consideration of the medical staff stand out. I was relieved because they checked carefully during the pediatrician rounds. I definitely want to come back for my second child.",
    },
    initial: "이",
    link: "https://blog.naver.com/jisu9690/224082981058",
    platform: "blog",
    thumbnail: "/img/headerpreview/infantroom.png"
  },
  {
    id: 3,
    author: { ko: "박지은", en: "Jieun Park" },
    date: "2024.11",
    content: {
      ko: "음식이 정말 맛있고 영양가 있어요. 모유 수유 교육도 큰 도움이 되었습니다. 처음엔 막막했는데 전문가 선생님들 덕분에 자신감을 얻고 가요.",
      en: "The food is delicious and nutritious. The breastfeeding education was also very helpful. I was lost at first, but thanks to the expert teachers, I gained confidence.",
    },
    initial: "박",
    link: "https://blog.naver.com/yoouni77/224022794132",
    platform: "blog",
    thumbnail: "/img/room/prestige5.jpg"
  },
  {
    id: 4,
    author: { ko: "최수진 님", en: "Sujin Choi" },
    date: "2024.10",
    content: {
      ko: "마사지가 정말 훌륭했습니다. 붓기가 금방 빠져서 몸이 가벼워졌어요. 스파 선생님들 손길이 정말 약손이에요!",
      en: "The massage was excellent. The swelling went down quickly and I felt lighter. The spa teachers have magic hands!",
    },
    initial: "최",
    link: null,
    platform: "instagram",
    thumbnail: "/img/spa/spa_main.png"
  },
  {
    id: 5,
    author: { ko: "정미영 님", en: "Miyoung Jung" },
    date: "2024.09",
    content: {
      ko: "남편과 함께 지내기에도 불편함이 없었습니다. 프라이빗한 공간이 너무 좋았고, 방음도 잘 되어서 조용히 쉴 수 있었어요.",
      en: "It was comfortable to stay with my husband. I loved the private space, and it was soundproof so I could rest quietly.",
    },
    initial: "정",
    link: null,
    platform: "google",
    thumbnail: "/img/room/vvip6.jpg"
  },
  {
    id: 6,
    author: { ko: "강혜진 님", en: "Hyejin Kang" },
    date: "2024.08",
    content: {
      ko: "신생아실 선생님들이 아기를 정말 예뻐해주시는 게 느껴져서 안심이 되었습니다. 젤리캠으로 언제든 아기를 볼 수 있는 점도 좋았어요.",
      en: "I felt relieved because I could feel that the nursery teachers really loved the baby. It was also nice to be able to see the baby anytime with JellyCam.",
    },
    initial: "강",
    link: null,
    platform: "google",
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
          <div className="mb-12 text-center md:mb-20">
              <span className="mb-4 block font-sans text-sm font-bold uppercase tracking-[0.2em] text-primary">
                  {isKo ? "생생한 이용 후기" : "Real Stories"}
              </span>
              <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                  {isKo ? "엄마들의 진솔한 이야기" : "Reviews from Families"}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-secondary/80 md:text-lg">
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
