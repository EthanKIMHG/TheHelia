"use client";

import { FadeInUp } from "@/components/common/FadeInUp";
import type { Locale } from "@/components/header/types";
import {
  Baby,
  BookOpen,
  CalendarDays,
  Camera,
  DoorOpen,
  Heart,
  HeartPulse,
  Moon,
  Move,
  Palette,
  Stethoscope
} from "lucide-react";
import { EducationalStrengths } from "./EducationalStrengths";

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
      icon: Stethoscope,
      title: isKo ? "소아과 상담" : "Pediatric Consultation",
      desc: isKo ? "토요일 08:00 · 수요일 12:20" : "Saturday 8:00 AM · Wednesday 12:20 PM",
      color: "bg-primary/5 text-primary border border-primary/10"
    },
    {
      id: "discharge",
      icon: DoorOpen,
      title: isKo ? "퇴실교육" : "Discharge Education",
      desc: isKo ? "매주 일요일 14:00" : "Every Sunday 2:00 PM",
      color: "bg-primary/5 text-primary border border-primary/10"
    },
    {
      id: "photo",
      icon: Camera,
      title: isKo ? "스튜디오 촬영" : "Studio Photo",
      desc: isKo ? "매주 월요일 11:00" : "Every Monday 11:00 AM",
      color: "bg-primary/5 text-primary border border-primary/10"
    },
    {
      id: "pilates",
      icon: Move,
      title: isKo ? "산후 필라테스" : "Postpartum Pilates",
      desc: isKo ? "매주 월·목요일 14:00" : "Every Monday and Thursday 2:00 PM",
      color: "bg-primary/5 text-primary border border-primary/10"
    },
    {
      id: "sleep",
      icon: Moon,
      title: isKo ? "유니콘베이비 수면교육" : "Unicorn Baby Sleep",
      desc: isKo ? "격주 화요일 11:00" : "Alternate Tuesdays 11:00 AM",
      color: "bg-primary/5 text-primary border border-primary/10"
    },
    {
      id: "language",
      icon: Baby,
      title: isKo ? "아기 언어·울음 이해" : "Baby Cues & Cries",
      desc: isKo ? "격주 화요일 13:00" : "Alternate Tuesdays 1:00 PM",
      color: "bg-primary/5 text-primary border border-primary/10"
    },
    {
      id: "book",
      icon: BookOpen,
      title: isKo ? "책 육아법" : "Book Parenting",
      desc: isKo ? "매주 목요일 11:00" : "Every Thursday 11:00 AM",
      color: "bg-primary/5 text-primary border border-primary/10"
    },
    {
      id: "massage",
      icon: Heart,
      title: isKo ? "베이비 마사지·아토피 예방" : "Baby Massage & Atopy",
      desc: isKo ? "격주 화요일 13:30" : "Alternate Tuesdays 1:30 PM",
      color: "bg-primary/5 text-primary border border-primary/10"
    },
    {
      id: "casting",
      icon: Palette,
      title: isKo ? "손발조형(유료)" : "Hand & Foot Casting",
      desc: isKo ? "격주 수요일 11:00" : "Alternate Wednesdays 11:00 AM",
      color: "bg-primary/5 text-primary border border-primary/10"
    },
    {
      id: "first-aid",
      icon: HeartPulse,
      title: isKo ? "신생아 응급처치" : "Newborn First Aid",
      desc: isKo ? "격주 수요일 11:00" : "Alternate Wednesdays 11:00 AM",
      color: "bg-primary/5 text-primary border border-primary/10"
    }
  ];

  return (
    <section className="w-full px-4 mb-20 text-foreground">
      <EducationalStrengths locale={locale} />
      <div className="mx-auto max-w-6xl mt-20">
         <FadeInUp>
            <div className="mb-16 text-center">
               <h2 className="font-serif text-2xl font-bold text-foreground break-keep md:text-3xl">
                  {isKo ? "The Helia Programs" : "The Helia Programs"}
               </h2>
               <p className="mx-auto mt-4 max-w-[30ch] break-keep leading-relaxed text-stone-500 md:max-w-2xl">
                  {isKo
                   ? "매월 반복 운영되는 정규 교육 프로그램을 주간 흐름에 맞춰 정리했습니다."
                   : "Regular monthly education programs are organized as a recurring weekly routine."}
               </p>
            </div>
         </FadeInUp>

         <div className="mb-16 space-y-8">
            <FadeInUp delay={0.05}>
               <div className="mx-auto max-w-3xl text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                     <CalendarDays className="h-4 w-4" />
                     {isKo ? "Weekly Routine" : "Weekly Routine"}
                  </div>
                  <h3 className="mt-5 break-keep font-serif text-2xl font-bold leading-[1.25] text-foreground md:text-3xl">
                     {isKo ? "반복 교육 프로그램 캘린더" : "Recurring Class Calendar"}
                  </h3>
                  <p className="mx-auto mt-3 max-w-[32ch] break-keep text-sm leading-relaxed text-foreground/70 md:max-w-2xl md:text-base">
                     {isKo
                      ? "매주 고정 일정과 격주 순환 수업을 요일별로 확인할 수 있습니다."
                      : "Weekly classes and alternate-week sessions are grouped by day."}
                  </p>
               </div>
            </FadeInUp>

            <FadeInUp delay={0.1}>
               <div className="hidden overflow-hidden rounded-[2rem] border border-stone-100 bg-white shadow-sm dark:border-white/10 dark:bg-stone-900 md:block">
                  <div className="flex items-end justify-between border-b border-stone-100 px-6 py-5 dark:border-white/10">
                     <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Every Month</p>
                        <h4 className="mt-1 font-serif text-2xl font-bold text-foreground">
                           {isKo ? "주간 반복 일정" : "Weekly Recurring Schedule"}
                        </h4>
                     </div>
                     <p className="break-keep text-sm font-medium text-foreground/65">
                        {isKo ? "강사 일정에 따라 변동될 수 있습니다." : "Subject to instructor availability."}
                     </p>
                  </div>

                  <div className="grid grid-cols-7 gap-3 bg-primary/5 p-4 dark:bg-primary/10">
                     {weeklySchedule.map((scheduleDay) => (
                        <article key={scheduleDay.day} className="flex min-h-[260px] flex-col rounded-2xl border border-border/40 bg-background/95 p-3 dark:border-primary/20 dark:bg-background/20">
                           <div className="mb-3">
                              <h5 className="font-serif text-lg font-bold text-primary">{scheduleDay.day}</h5>
                              <p className="mt-1 text-[11px] font-semibold text-foreground/60">{scheduleDay.cadence}</p>
                           </div>
                           <div className="flex flex-1 flex-col gap-2">
                              {scheduleDay.items.length > 0 ? (
                                 <>
                                    {scheduleDay.items.filter((item) => !item.group).map((item) => (
                                       <div key={`${scheduleDay.day}-${item.time}-${item.title}`} className="border-b border-border/35 pb-2 last:border-b-0">
                                          <time className="block text-[10px] font-bold uppercase tracking-[0.08em] text-primary">
                                             {item.time}
                                          </time>
                                          <p className="mt-1 break-keep text-[11px] font-bold leading-snug text-foreground">
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
                                          <div key={`${scheduleDay.day}-${group}`} className="border-t border-border/40 pt-2">
                                             <p className="text-[10px] font-bold text-primary">{group}</p>
                                             <div className="mt-1.5 space-y-2">
                                                {groupItems.map((item) => (
                                                   <div key={`${scheduleDay.day}-${group}-${item.time}-${item.title}`}>
                                                      <time className="block text-[10px] font-bold uppercase tracking-[0.08em] text-foreground/55">
                                                         {item.time}
                                                      </time>
                                                      <p className="mt-1 break-keep text-[11px] font-bold leading-snug text-foreground">
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
                                 <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-border/50 px-3 py-4 text-center text-xs font-medium leading-relaxed text-foreground/45">
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
                     <article className="rounded-2xl border border-stone-100 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-stone-900">
                        <div className="mb-3 flex items-start justify-between gap-3">
                           <div>
                              <h4 className="font-serif text-lg font-bold text-primary">{scheduleDay.day}</h4>
                              <p className="mt-1 text-xs font-semibold text-foreground/60">{scheduleDay.cadence}</p>
                           </div>
                        </div>
                        <div className="mt-3 space-y-2.5">
                           {scheduleDay.items.length > 0 ? (
                              <>
                                 {scheduleDay.items.filter((item) => !item.group).map((item) => (
                                    <div key={`${scheduleDay.day}-${item.time}-${item.title}`} className="border-b border-border/40 pb-2.5 last:border-b-0">
                                       <time className="text-[11px] font-bold uppercase tracking-[0.08em] text-primary">
                                          {item.time}
                                       </time>
                                       <p className="mt-1 break-keep text-sm font-bold leading-snug text-foreground">
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
                                       <div key={`${scheduleDay.day}-${group}`} className="rounded-xl bg-primary/5 px-3 py-3 dark:bg-primary/10">
                                          <p className="text-xs font-bold text-primary">{group}</p>
                                          <div className="mt-2 space-y-2">
                                             {groupItems.map((item) => (
                                                <div key={`${scheduleDay.day}-${group}-${item.time}-${item.title}`}>
                                                   <time className="text-[11px] font-bold uppercase tracking-[0.08em] text-foreground/55">
                                                      {item.time}
                                                   </time>
                                                   <p className="mt-1 break-keep text-sm font-bold leading-snug text-foreground">
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
                              <p className="rounded-xl border border-dashed border-border/50 px-3 py-4 text-center text-sm font-medium text-foreground/45">
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
            <div className="mb-6 text-center">
               <h3 className="font-serif text-xl font-bold text-foreground md:text-2xl">
                  {isKo ? "프로그램 구성" : "Program Lineup"}
               </h3>
            </div>
         </FadeInUp>

         {/* Program Grid */}
         <div className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-5 md:gap-6">
            {programs.map((item, idx) => (
                <FadeInUp key={item.id} delay={idx * 0.05} className="h-full">
                    <div className="group flex h-[210px] flex-col items-start justify-center gap-4 rounded-[2rem] border border-stone-100 bg-white p-6 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg dark:border-white/5 dark:bg-stone-900 dark:hover:border-white/20 md:h-[230px] md:items-center md:p-8 md:text-center">
                        <div className={`flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl ${item.color} dark:bg-opacity-20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                            <item.icon className="h-6 w-6 md:h-7 md:w-7" />
                        </div>
                        <div className="space-y-1 md:space-y-2">
                             <h3 className="font-serif text-base md:text-lg font-bold text-foreground break-keep">
                                 {item.title}
                             </h3>
                             <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 break-keep leading-relaxed">
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
