"use client";

import { FadeInUp } from "@/components/common/FadeInUp";
import type { Locale } from "@/components/header/types";
import { CalendarDays, Sparkles } from "lucide-react";
import Image from "next/image";

export function ClassSchedule({ locale }: { locale: Locale }) {
  const isKo = locale === "ko";

  type ScheduleItem = {
    time: string;
    title: string;
    group?: string;
  };

  type ScheduleDay = {
    day: string;
    cadence: string;
    items: ScheduleItem[];
  };

  const scheduleItem = (
    timeKo: string,
    timeEn: string,
    titleKo: string,
    titleEn: string,
    groupKo?: string,
    groupEn?: string
  ): ScheduleItem => ({
    time: isKo ? timeKo : timeEn,
    title: isKo ? titleKo : titleEn,
    group: groupKo && groupEn ? (isKo ? groupKo : groupEn) : undefined
  });

  const weeklySchedule: ScheduleDay[] = [
    {
      day: isKo ? "일요일" : "Sunday",
      cadence: isKo ? "매주" : "Every week",
      items: [
        scheduleItem("PM 02:00", "2:00 PM", "퇴실교육", "Discharge education")
      ]
    },
    {
      day: isKo ? "월요일" : "Monday",
      cadence: isKo ? "매주" : "Every week",
      items: [
        scheduleItem("AM 11:00", "11:00 AM", "스튜디오 촬영", "Studio photo session"),
        scheduleItem("PM 02:00", "2:00 PM", "산후 필라테스", "Postpartum Pilates")
      ]
    },
    {
      day: isKo ? "화요일" : "Tuesday",
      cadence: isKo ? "격주 순환" : "Alternate weeks",
      items: [
        scheduleItem("PM 01:00", "1:00 PM", "아기 언어, 울음 알아듣기", "Understanding baby's language and cries", "격주 A", "Week A"),
        scheduleItem("AM 11:00", "11:00 AM", "유니콘베이비 수면교육", "Unicorn Baby sleep education", "격주 B", "Week B"),
        scheduleItem("PM 01:30", "1:30 PM", "베이비 마사지 및 아토피 예방교육", "Baby massage and atopy prevention", "격주 B", "Week B")
      ]
    },
    {
      day: isKo ? "수요일" : "Wednesday",
      cadence: isKo ? "매주 + 격주" : "Weekly + alternating",
      items: [
        scheduleItem("PM 12:20", "12:20 PM", "소아과 상담", "Pediatric consultation"),
        scheduleItem("AM 11:00", "11:00 AM", "손발조형(유료)", "Hand and foot casting (paid)", "격주 A", "Week A"),
        scheduleItem("AM 11:00", "11:00 AM", "신생아 응급처치", "Newborn emergency care", "격주 B", "Week B")
      ]
    },
    {
      day: isKo ? "목요일" : "Thursday",
      cadence: isKo ? "매주" : "Every week",
      items: [
        scheduleItem("AM 11:00", "11:00 AM", "책 육아법", "Book parenting method"),
        scheduleItem("PM 02:00", "2:00 PM", "산후 필라테스", "Postpartum Pilates")
      ]
    },
    {
      day: isKo ? "금요일" : "Friday",
      cadence: isKo ? "자율 회복일" : "Rest day",
      items: []
    },
    {
      day: isKo ? "토요일" : "Saturday",
      cadence: isKo ? "매주" : "Every week",
      items: [
        scheduleItem("AM 08:00", "8:00 AM", "소아과 상담", "Pediatric consultation")
      ]
    }
  ];

  const alternatingGroups = isKo ? ["격주 A", "격주 B"] : ["Week A", "Week B"];

  const programs = [
    {
      id: "pediatric",
      image: "/img/momclass/us/pediatric.jpg",
      title: isKo ? "소아과 상담" : "Pediatric Consultation",
      desc: isKo ? "토요일 08:00 · 수요일 12:20" : "Saturday 8:00 AM · Wednesday 12:20 PM",
    },
    {
      id: "discharge",
      image: "/img/momclass/us/discharge.jpg",
      title: isKo ? "퇴실교육" : "Discharge Education",
      desc: isKo ? "매주 일요일 14:00" : "Every Sunday 2:00 PM",
    },
    {
      id: "photo",
      image: "/img/momclass/us/photo.jpg",
      title: isKo ? "스튜디오 촬영" : "Studio Photo",
      desc: isKo ? "매주 월요일 11:00" : "Every Monday 11:00 AM",
    },
    {
      id: "pilates",
      image: "/img/momclass/us/pilates.jpg",
      title: isKo ? "산후 필라테스" : "Postpartum Pilates",
      desc: isKo ? "매주 월·목요일 14:00" : "Every Monday and Thursday 2:00 PM",
    },
    {
      id: "sleep",
      image: "/img/momclass/us/sleep.jpg",
      title: isKo ? "유니콘베이비 수면교육" : "Unicorn Baby Sleep",
      desc: isKo ? "격주 화요일 11:00" : "Alternate Tuesdays 11:00 AM",
    },
    {
      id: "language",
      image: "/img/momclass/us/cues.jpg",
      title: isKo ? "아기 언어·울음 이해" : "Baby Cues & Cries",
      desc: isKo ? "격주 화요일 13:00" : "Alternate Tuesdays 1:00 PM",
    },
    {
      id: "book",
      image: "/img/momclass/us/book.jpg",
      title: isKo ? "책 육아법" : "Book Parenting",
      desc: isKo ? "매주 목요일 11:00" : "Every Thursday 11:00 AM",
    },
    {
      id: "massage",
      image: "/img/momclass/us/massage.jpg",
      title: isKo ? "베이비 마사지·아토피 예방" : "Baby Massage & Atopy",
      desc: isKo ? "격주 화요일 13:30" : "Alternate Tuesdays 1:30 PM",
    },
    {
      id: "casting",
      image: "/img/momclass/us/casting.jpg",
      title: isKo ? "손발조형(유료)" : "Hand & Foot Casting",
      desc: isKo ? "격주 수요일 11:00" : "Alternate Wednesdays 11:00 AM",
    },
    {
      id: "first-aid",
      image: "/img/momclass/us/first-aid.jpg",
      title: isKo ? "신생아 응급처치" : "Newborn First Aid",
      desc: isKo ? "격주 수요일 11:00" : "Alternate Wednesdays 11:00 AM",
    }
  ];

  return (
    <section className="w-full px-4 mb-20 text-foreground">
      <div className="mx-auto max-w-6xl mt-20">
         <div className="mb-16 space-y-8">
            <FadeInUp>
               <div className="mx-auto max-w-3xl text-center">
                  <div className="eyebrow inline-flex items-center gap-2">
                     <CalendarDays className="h-3 w-3" strokeWidth={1.5} />
                     {isKo ? "Weekly Routine" : "Weekly Routine"}
                  </div>
                  <h2 className="mt-5 break-keep font-display-serif text-2xl font-normal leading-[1.4] text-foreground md:text-3xl">
                     {isKo ? "반복 교육 프로그램 캘린더" : "Recurring Class Calendar"}
                  </h2>
                  <p className="mx-auto mt-4 max-w-[32ch] break-keep text-sm leading-[1.85] text-secondary md:max-w-2xl md:text-base">
                     {isKo
                      ? "매주 고정 일정과 격주 순환 수업을 요일별로 확인할 수 있습니다."
                      : "Weekly classes and alternate-week sessions are grouped by day."}
                  </p>
               </div>
            </FadeInUp>

            <FadeInUp delay={0.1}>
               <div className="hidden overflow-hidden border border-border bg-background md:block">
                  <div className="flex items-center justify-between border-b border-border px-6 py-4">
                     <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                        {isKo ? "매월 반복" : "Every Month"}
                     </p>
                     <p className="break-keep text-sm text-secondary">
                        {isKo ? "강사 일정에 따라 변동될 수 있습니다." : "Subject to instructor availability."}
                     </p>
                  </div>

                  <div className="grid grid-cols-7 divide-x divide-border">
                     {weeklySchedule.map((scheduleDay) => (
                        <article key={scheduleDay.day} className="flex min-h-[260px] flex-col p-4">
                           <div className="mb-4 border-b border-border pb-3">
                              <h5 className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">{scheduleDay.day}</h5>
                              <p className="mt-1 text-[10px] text-secondary">{scheduleDay.cadence}</p>
                           </div>
                           <div className="flex flex-1 flex-col gap-2">
                              {scheduleDay.items.length > 0 ? (
                                 <>
                                    {scheduleDay.items.filter((item) => !item.group).map((item) => (
                                       <div key={`${scheduleDay.day}-${item.time}-${item.title}`} className="border-b border-border/70 pb-2 last:border-b-0">
                                          <time className="block font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                                             {item.time}
                                          </time>
                                          <p className="mt-1 break-keep text-[11px] font-medium leading-snug text-foreground">
                                             {item.title}
                                          </p>
                                       </div>
                                    ))}

                                    {alternatingGroups.map((group) => {
                                       const groupItems = scheduleDay.items.filter((item) => item.group === group);

                                       if (groupItems.length === 0) {
                                          return null;
                                       }

                                       return (
                                          <div key={`${scheduleDay.day}-${group}`} className="border-t border-border pt-2">
                                             <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">{group}</p>
                                             <div className="mt-1.5 space-y-2">
                                                {groupItems.map((item) => (
                                                   <div key={`${scheduleDay.day}-${group}-${item.time}-${item.title}`}>
                                                      <time className="block font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-secondary">
                                                         {item.time}
                                                      </time>
                                                      <p className="mt-1 break-keep text-[11px] font-medium leading-snug text-foreground">
                                                         {item.title}
                                                      </p>
                                                   </div>
                                                ))}
                                             </div>
                                          </div>
                                       );
                                    })}
                                 </>
                              ) : (
                                 <div className="flex flex-1 items-center justify-center border border-dashed border-border px-3 py-4 text-center text-xs leading-relaxed text-secondary/80">
                                    {isKo ? "정규 교육 없음" : "No regular class"}
                                 </div>
                              )}
                           </div>
                        </article>
                     ))}
                  </div>
               </div>
            </FadeInUp>

            <div className="space-y-3 md:hidden">
               {weeklySchedule.map((scheduleDay, idx) => (
                  <FadeInUp key={scheduleDay.day} delay={idx * 0.04}>
                     <article className="border-t border-border pt-5 pb-3">
                        <div className="mb-3 flex items-start justify-between gap-3">
                           <div>
                              <h4 className="font-display-serif text-lg font-normal text-foreground">{scheduleDay.day}</h4>
                              <p className="mt-1 text-xs text-secondary">{scheduleDay.cadence}</p>
                           </div>
                        </div>
                        <div className="mt-3 space-y-2.5">
                           {scheduleDay.items.length > 0 ? (
                              <>
                                 {scheduleDay.items.filter((item) => !item.group).map((item) => (
                                    <div key={`${scheduleDay.day}-${item.time}-${item.title}`} className="border-b border-border/70 pb-2.5 last:border-b-0">
                                       <time className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                                          {item.time}
                                       </time>
                                       <p className="mt-1 break-keep text-sm font-medium leading-snug text-foreground">
                                          {item.title}
                                       </p>
                                    </div>
                                 ))}

                                 {alternatingGroups.map((group) => {
                                    const groupItems = scheduleDay.items.filter((item) => item.group === group);

                                    if (groupItems.length === 0) {
                                       return null;
                                    }

                                    return (
                                       <div key={`${scheduleDay.day}-${group}`} className="bg-accent/30 px-3 py-3">
                                          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">{group}</p>
                                          <div className="mt-2 space-y-2">
                                             {groupItems.map((item) => (
                                                <div key={`${scheduleDay.day}-${group}-${item.time}-${item.title}`}>
                                                   <time className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary">
                                                      {item.time}
                                                   </time>
                                                   <p className="mt-1 break-keep text-sm font-medium leading-snug text-foreground">
                                                      {item.title}
                                                   </p>
                                                </div>
                                             ))}
                                          </div>
                                       </div>
                                    );
                                 })}
                              </>
                           ) : (
                              <p className="border border-dashed border-border px-3 py-4 text-center text-sm text-secondary/80">
                                 {isKo ? "정규 교육 없음" : "No regular class"}
                              </p>
                           )}
                        </div>
                     </article>
                  </FadeInUp>
               ))}
            </div>
         </div>

         <FadeInUp delay={0.1}>
            <div className="mb-12 mt-24 text-center">
               <div className="eyebrow inline-flex items-center gap-2">
                  <Sparkles className="h-3 w-3" strokeWidth={1.5} />
                  {isKo ? "Lineup" : "Lineup"}
               </div>
               <h2 className="mt-5 font-display-serif text-2xl font-normal leading-[1.4] text-foreground md:text-3xl">
                  {isKo ? "프로그램 구성" : "Program Lineup"}
               </h2>
            </div>
         </FadeInUp>

         {/* Program Grid — photo-forward */}
         <div className="grid grid-cols-2 items-stretch gap-x-4 gap-y-10 md:grid-cols-5 md:gap-x-5 md:gap-y-12">
            {programs.map((item, idx) => (
                <FadeInUp key={item.id} delay={idx * 0.05} className="h-full">
                    <div className="group flex h-full flex-col text-left">
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-accent/60">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="(min-width: 768px) 20vw, 50vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                            />
                        </div>
                        <div className="space-y-1 pt-4 md:space-y-1.5">
                             <h3 className="font-display-serif text-base md:text-lg font-normal leading-[1.5] text-foreground break-keep">
                                 {item.title}
                             </h3>
                             <p className="text-xs md:text-sm text-secondary break-keep leading-[1.85]">
                                 {item.desc}
                             </p>
                        </div>
                    </div>
                </FadeInUp>
            ))}
         </div>
      </div>
    </section>
  );
}
