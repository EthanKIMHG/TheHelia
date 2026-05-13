'use client'

import { ScrollReveal } from '@/components/common/ScrollReveal'
import type { Locale } from '@/components/header/types'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  BedDouble,
  ChevronRight,
  Handshake,
  HeartPulse,
  Route,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useId, useState } from 'react'

type HomeProgramsProps = {
  locale: Locale
  onSectionMount?: (node: HTMLElement | null) => void
}

type ProgramItem = {
  title: string
  eyebrow: string
  summary: string
  description: string
  details: string[]
  icon: LucideIcon
}

type ProgramCopy = {
  badgeLabel: string
  title: string
  subtitle: string
  detailEyebrow: string
  detailHeading: string
  openLabel: string
  closeLabel: string
  programs: ProgramItem[]
}

const SOFT_EASE = [0.22, 1, 0.36, 1] as const

export function HomePrograms({
  locale,
  onSectionMount,
}: HomeProgramsProps): React.JSX.Element {
  const copy = locale === 'ko' ? KOREAN_COPY : ENGLISH_COPY
  const [activeProgram, setActiveProgram] = useState<ProgramItem | null>(null)
  const dialogTitleId = useId()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!activeProgram || typeof window === 'undefined') return

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setActiveProgram(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeProgram])

  return (
    <>
      <section
        ref={onSectionMount ? (node) => onSectionMount(node) : undefined}
        className="w-full bg-[#FDFBF9] py-24 dark:bg-background"
      >
        <ScrollReveal>
          <div className="container mx-auto px-4">
            <div className="mb-16 flex flex-col items-center text-center">
              <span className="mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Sparkles className="mr-1.5 h-3.5 w-3.5 fill-current" />
                {copy.badgeLabel}
              </span>
              <h2 className="mb-4 break-keep text-3xl font-serif leading-tight text-foreground md:text-4xl lg:text-4xl">
                {copy.title}
              </h2>
              <p className="mx-auto max-w-[32ch] break-keep text-lg text-foreground/85 md:max-w-3xl">
                {copy.subtitle}
              </p>
            </div>

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {copy.programs.map((program) => {
                const Icon = program.icon

                return (
                  <motion.button
                    type="button"
                    key={program.title}
                    onClick={() => setActiveProgram(program)}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -5,
                            transition: {
                              duration: 0.34,
                              ease: SOFT_EASE,
                            },
                          }
                    }
                    whileTap={reduceMotion ? undefined : { scale: 0.992 }}
                    className="group flex min-h-[248px] w-full flex-col rounded-[2rem] border border-primary/10 bg-white p-6 text-left transition-[border-color,box-shadow,background-color] duration-500 ease-out hover:shadow-[0_20px_44px_rgba(105,79,55,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:bg-[#2A2928]/40 sm:min-h-[264px] sm:p-7"
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition-colors duration-500 ease-out group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="mb-3 text-[11px] font-semibold tracking-[0.18em] text-primary/75 sm:text-xs">
                      {program.eyebrow}
                    </span>
                    <h3 className="mb-3 break-keep text-xl font-bold text-foreground">
                      {program.title}
                    </h3>
                    <p className="break-keep text-sm leading-relaxed text-foreground/78 sm:text-[15px]">
                      {program.summary}
                    </p>

                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-primary">
                      {copy.openLabel}
                      <ChevronRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:translate-x-1" />
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <AnimatePresence>
        {activeProgram ? (
          <ProgramDetailDialog
            copy={copy}
            dialogTitleId={dialogTitleId}
            program={activeProgram}
            onClose={() => setActiveProgram(null)}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}

type ProgramDetailDialogProps = {
  copy: ProgramCopy
  dialogTitleId: string
  program: ProgramItem
  onClose: () => void
}

function ProgramDetailDialog({
  copy,
  dialogTitleId,
  program,
  onClose,
}: ProgramDetailDialogProps): React.JSX.Element {
  const Icon = program.icon
  const reduceMotion = useReducedMotion()
  const overlayTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.26, ease: SOFT_EASE }
  const dialogTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.34, ease: SOFT_EASE }
  const listTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: SOFT_EASE }

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex items-end bg-black/58 backdrop-blur-[3px] md:items-center md:justify-center md:px-6 md:py-8"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={overlayTransition}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
        className="relative flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-[2rem] border border-border/40 bg-background shadow-[0_26px_80px_rgba(0,0,0,0.22)] md:max-w-3xl md:rounded-[2rem]"
        onClick={(event) => event.stopPropagation()}
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 42, scale: 0.985 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28, scale: 0.992 }}
        transition={dialogTransition}
      >
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={overlayTransition}
        />

        <motion.div
          className="flex items-start justify-between gap-4 border-b border-border/40 px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6"
          initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 6 }}
          transition={
            reduceMotion
              ? undefined
                  : {
                      delay: 0.05,
                      duration: 0.28,
                      ease: SOFT_EASE,
                    }
          }
        >
          <div className="min-w-0">
            <motion.div
              className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary"
              initial={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={
                reduceMotion
                  ? undefined
                  : {
                      delay: 0.1,
                      duration: 0.24,
                      ease: SOFT_EASE,
                    }
              }
            >
              <Icon className="h-3.5 w-3.5" />
              {copy.detailEyebrow}
            </motion.div>
            <motion.h3
              id={dialogTitleId}
              className="break-keep text-2xl font-serif font-semibold leading-tight text-foreground sm:text-3xl"
              initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={
                reduceMotion
                  ? undefined
                  : {
                      delay: 0.12,
                      duration: 0.28,
                      ease: SOFT_EASE,
                    }
              }
            >
              {program.title}
            </motion.h3>
            <motion.p
              className="mt-3 break-keep text-sm leading-relaxed text-foreground/78 sm:text-base"
              initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={
                reduceMotion
                  ? undefined
                  : {
                      delay: 0.16,
                      duration: 0.3,
                      ease: SOFT_EASE,
                    }
              }
            >
              {program.description}
            </motion.p>
          </div>

          <motion.button
            type="button"
            aria-label={copy.closeLabel}
            onClick={onClose}
            className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-border/50 bg-primary/5 text-foreground transition hover:bg-primary/10"
            whileHover={reduceMotion ? undefined : { rotate: 90, scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            transition={listTransition}
          >
            <X className="h-4 w-4" />
          </motion.button>
        </motion.div>

        <motion.div
          data-lenis-prevent
          className="overflow-y-auto overscroll-contain px-5 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-5 sm:px-6 sm:pb-6"
          initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: 6 }}
          transition={
            reduceMotion
              ? undefined
                : {
                    delay: 0.18,
                    duration: 0.3,
                    ease: SOFT_EASE,
                  }
          }
        >
          <motion.div
            className="rounded-[1.6rem] border border-border/40 bg-primary/5 p-5 sm:p-6"
            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.985 }}
            animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={
              reduceMotion
                ? undefined
                : {
                    delay: 0.2,
                    duration: 0.3,
                    ease: SOFT_EASE,
                  }
            }
          >
            <motion.p
              className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary/78"
              initial={reduceMotion ? undefined : { opacity: 0 }}
              animate={reduceMotion ? undefined : { opacity: 1 }}
              transition={
                reduceMotion
                  ? undefined
                  : {
                      delay: 0.24,
                      duration: 0.22,
                      ease: SOFT_EASE,
                    }
              }
            >
              {copy.detailHeading}
            </motion.p>
            <motion.ul
              className="grid gap-3 sm:gap-4"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: {
                  transition: reduceMotion
                    ? undefined
                    : { staggerChildren: 0.06, delayChildren: 0.24 },
                },
              }}
            >
              {program.details.map((detail) => (
                <motion.li
                  key={detail}
                  className="flex items-start gap-3 rounded-2xl border border-border/35 bg-background/80 px-4 py-3 text-sm leading-relaxed text-foreground/84 sm:text-[15px]"
                  variants={{
                    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 },
                    visible: reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
                  }}
                  transition={listTransition}
                >
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                  <span className="break-keep">{detail}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const KOREAN_COPY: ProgramCopy = {
  badgeLabel: '핵심 강점',
  title: '후기에서 반복된 더헬리아의 강점',
  subtitle:
    '먼저 핵심만 빠르게 보고, 궁금한 항목만 열어 자세히 확인할 수 있도록 구성했습니다.',
  detailEyebrow: '상세 강점',
  detailHeading: '후기에서 자주 언급된 만족 포인트',
  openLabel: '자세히 보기',
  closeLabel: '모달 닫기',
  programs: [
    {
      title: '세인트마리와 가까운 회복 동선',
      eyebrow: '퇴원부터 검진까지 편안하게',
      summary: '병원과 가까워 이동 부담과 검진 동선이 한결 가볍습니다.',
      description:
        '세인트마리 여성병원과 가까워 퇴원 직후부터 산후 검진, 아기 진료까지 더 가볍고 편안한 동선으로 이어집니다.',
      details: [
        '퇴원 직후 긴 이동 없이 바로 이어지는 편안한 입실 동선',
        '산모 검진과 아기 진료까지 자연스럽게 이어지는 편리한 이동 루트',
        '남편 출퇴근과 보호자 방문까지 부담을 덜어주는 단순한 동선',
      ],
      icon: Route,
    },
    {
      title: '안심되는 신생아실 운영',
      eyebrow: '관찰실과 위생 중심 케어',
      summary: '관찰실과 위생 운영 흐름이 안심 포인트로 반복 언급됐습니다.',
      description:
        '초기 관찰부터 위생 중심 운영까지, 예민한 신생아 시기에 더 안심할 수 있는 케어 환경을 갖추고 있습니다.',
      details: [
        '초기 관찰과 분리 운영 흐름으로 더 세심한 신생아 케어',
        '위생과 감염 관리에 신경 쓴 차별화된 운영 방식',
        '처음부터 믿고 맡길 수 있는 신생아실 중심 케어 시스템',
      ],
      icon: ShieldCheck,
    },
    {
      title: '회복에 집중되는 프리미엄 객실',
      eyebrow: '모션베드와 편의 설비',
      summary: '객실 설비가 회복 편의성을 직접 높였다는 반응이 많았습니다.',
      description:
        '모션베드와 스타일러, 안마의자 등 회복에 필요한 설비를 세심하게 갖춘 객실에서 한결 편안한 시간을 보낼 수 있습니다.',
      details: [
        '회복 초기에 몸을 더 편하게 받쳐주는 모션베드와 안마의자',
        '머무는 내내 기분 좋게 쉬어갈 수 있는 밝고 깨끗한 객실 컨디션',
        '남편과 함께 있어도 답답하지 않은 편안한 생활 동선',
      ],
      icon: BedDouble,
    },
    {
      title: '가슴관리와 산후 회복 케어',
      eyebrow: '몸이 가벼워지는 회복 루틴',
      summary: '가슴관리와 회복 케어는 가장 자주 언급된 만족 포인트 중 하나입니다.',
      description:
        '가슴관리와 산후 케어를 통해 수유 적응과 붓기 완화, 컨디션 회복까지 더헬리아만의 회복 루틴을 경험하실 수 있습니다.',
      details: [
        '수유 적응 초기를 부드럽게 도와주는 가슴관리 케어',
        '붓기와 몸의 긴장을 덜어주는 산후 회복 루틴',
        '퇴실 전까지 컨디션을 탄탄하게 끌어올리는 프리미엄 케어',
      ],
      icon: HeartPulse,
    },
    {
      title: '회복을 돕는 식사와 간식',
      eyebrow: '하루 리듬을 채우는 영양 밸런스',
      summary: '식사와 간식은 하루 만족도를 높여주는 안정적인 강점으로 보였습니다.',
      description:
        '따뜻한 식사와 간식이 하루 흐름에 맞춰 제공되어 회복기에 필요한 에너지와 만족감을 함께 채워드립니다.',
      details: [
        '병원 식사와는 다른 만족감을 주는 따뜻한 식사 구성',
        '하루 리듬을 편안하게 채워주는 간식과 특식',
        '주변 상권과 함께 더 넓어지는 식사 선택지',
      ],
      icon: UtensilsCrossed,
    },
    {
      title: '부담 없는 안내와 따뜻한 응대',
      eyebrow: '초산모도 편안한 분위기',
      summary: '과하게 개입하지 않으면서도 필요한 설명은 챙겨준다는 인상이 강했습니다.',
      description:
        '기본 케어부터 모자동실 흐름까지 차분하고 다정하게 안내해, 초산모도 편안하게 적응할 수 있는 분위기를 만들었습니다.',
      details: [
        '차분하고 다정하게 이어지는 스태프 안내',
        '초산모도 부담 없이 익힐 수 있는 기본 케어 설명',
        '과한 분위기 없이 편안하게 머물 수 있는 조용한 환경',
      ],
      icon: Handshake,
    },
  ],
}

const ENGLISH_COPY: ProgramCopy = {
  badgeLabel: 'Signature Strengths',
  title: 'What Families Notice Most At The Helia',
  subtitle:
    'Scan the essentials first, then open only the programs you want to explore in more detail.',
  detailEyebrow: 'Program Detail',
  detailHeading: 'Why this stood out in guest reviews',
  openLabel: 'View details',
  closeLabel: 'Close modal',
  programs: [
    {
      title: 'A Smoother Recovery Flow',
      eyebrow: 'Easy movement from hospital to suite',
      summary: 'Less transfer stress after discharge, and easier follow-up movement afterward.',
      description:
        'Being close to St. Mary’s Women’s Hospital makes the full recovery route feel easier, calmer, and more comfortable from the very first transfer.',
      details: [
        'An easy arrival flow right after discharge',
        'A simpler route for postpartum checkups and baby appointments',
        'A more comfortable daily rhythm for partners and family visits',
      ],
      icon: Route,
    },
    {
      title: 'Reassuring Newborn Care',
      eyebrow: 'Observation-first and hygiene-aware',
      summary: 'The nursery flow and hygiene emphasis were repeated trust signals in reviews.',
      description:
        'From early observation to hygiene-focused operation, the nursery is designed to help families feel at ease during the most delicate newborn days.',
      details: [
        'More attentive newborn care through an observation-first flow',
        'A differentiated nursery system built around hygiene and infection control',
        'A nursery environment families can trust from the beginning',
      ],
      icon: ShieldCheck,
    },
    {
      title: 'Premium Rooms For Real Rest',
      eyebrow: 'Comfort features that support recovery',
      summary: 'In-room comfort features were described as genuinely helpful, not just premium on paper.',
      description:
        'Motion beds, garment care, air care, and recovery-focused room comforts make every part of the stay feel more restful and considered.',
      details: [
        'Motion beds and recovery comforts that support the body from day one',
        'Clean, bright rooms that feel calm and uplifting throughout the stay',
        'A room layout that stays comfortable even with a partner staying over',
      ],
      icon: BedDouble,
    },
    {
      title: 'Breast Care And Recovery Support',
      eyebrow: 'Support that helps you feel lighter',
      summary: 'Breast care and recovery support came up as one of the most memorable strengths.',
      description:
        'Breast care and recovery treatments are designed to support feeding adjustment, reduce swelling, and help the body feel lighter before going home.',
      details: [
        'Breast care that supports a smoother start to feeding',
        'Recovery treatments that help ease swelling and body tension',
        'A premium recovery routine that helps build comfort before checkout',
      ],
      icon: HeartPulse,
    },
    {
      title: 'Meals And Snacks That Sustain You',
      eyebrow: 'Warm rhythm throughout the day',
      summary: 'Food and snack service read as a steady, dependable source of daily comfort.',
      description:
        'Thoughtfully timed meals and snacks help restore energy and add a warm sense of comfort to the recovery routine.',
      details: [
        'Warm meals that feel more satisfying than standard hospital food',
        'Snacks and special treats that make the daily rhythm feel easier',
        'Extra flexibility through nearby dining and takeout options',
      ],
      icon: UtensilsCrossed,
    },
    {
      title: 'Gentle Guidance, No Pressure',
      eyebrow: 'Especially comforting for first-time moms',
      summary: 'Guests often described the tone as warm and supportive without feeling intrusive.',
      description:
        'From everyday care basics to rooming-in flow, the guidance stays calm, warm, and easy to follow so new mothers can settle in with confidence.',
      details: [
        'Warm staff guidance that feels calm and reassuring',
        'Clear everyday care support for first-time mothers',
        'A relaxed atmosphere that feels comfortable without pressure',
      ],
      icon: Handshake,
    },
  ],
}
