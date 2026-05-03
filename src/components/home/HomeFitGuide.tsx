'use client'

import { ScrollReveal } from '@/components/common/ScrollReveal'
import type { Locale } from '@/components/header/types'
import {
  Baby,
  BedDouble,
  BookUser,
  Handshake,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

type HomeFitGuideProps = {
  locale: Locale
  onSectionMount?: (node: HTMLElement | null) => void
}

type FitGuideItem = {
  label: string
  title: string
  description: string
  icon: LucideIcon
}

type FitGuideCopy = {
  badgeLabel: string
  title: string
  subtitle: string
  closing: string
  items: FitGuideItem[]
}

export function HomeFitGuide({
  locale,
  onSectionMount,
}: HomeFitGuideProps): React.JSX.Element {
  const copy = locale === 'ko' ? KOREAN_COPY : ENGLISH_COPY

  return (
    <section
      ref={onSectionMount ? (node) => onSectionMount(node) : undefined}
      className="w-full bg-[linear-gradient(180deg,rgba(166,139,124,0.05),rgba(250,249,246,0.92))] px-4 py-20 text-foreground sm:px-6 md:px-8 md:py-24"
    >
      <ScrollReveal>
        <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[0.88fr_1.12fr] lg:gap-6">
          <div className="rounded-[2.4rem] border border-border/50 bg-primary/5 p-7 shadow-[0_24px_80px_rgba(105,79,55,0.06)] dark:border-border/40 dark:bg-primary/10 md:p-9">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/85 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary dark:bg-background/30">
              <Sparkles className="h-3.5 w-3.5" />
              {copy.badgeLabel}
            </span>

            <h2 className="max-w-[11ch] break-keep text-3xl font-serif font-semibold leading-[1.2] text-foreground md:max-w-[10ch] md:text-4xl">
              {copy.title}
            </h2>

            <p className="mt-5 max-w-[30ch] break-keep text-base leading-relaxed text-foreground/82 md:text-[18px]">
              {copy.subtitle}
            </p>

            <div className="mt-8 rounded-[1.8rem] border border-border/45 bg-background/82 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] dark:bg-background/25">
              <p className="break-keep text-sm leading-relaxed text-foreground/78 md:text-[15px]">
                {copy.closing}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {copy.items.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="group flex min-h-[220px] flex-col rounded-[2rem] border border-border/45 bg-background/92 p-6 shadow-[0_18px_50px_rgba(105,79,55,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/18 hover:shadow-[0_26px_60px_rgba(105,79,55,0.1)] dark:bg-[#1f1d1b]/72 sm:min-h-[236px] sm:p-7"
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-primary/8 px-3 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-primary/82">
                      {item.label}
                    </span>
                  </div>

                  <h3 className="break-keep text-xl font-semibold leading-[1.32] text-foreground">
                    {item.title}
                  </h3>

                  <p className="mt-4 break-keep text-sm leading-relaxed text-foreground/76 sm:text-[15px]">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}

const KOREAN_COPY: FitGuideCopy = {
  badgeLabel: 'Good Fit Guide',
  title: '이런 분께 더헬리아가 잘 맞아요',
  subtitle:
    '처음 보신다면, 아래 기준으로 먼저 나에게 잘 맞는 조리원인지 가볍게 확인해보세요.',
  closing:
    '위 항목이 중요하시다면, 이어지는 섹션에서 더헬리아의 강점을 더 자세히 살펴보셔도 좋습니다.',
  items: [
    {
      label: '신생아 케어',
      title: '위생적인 신생아실을 찾는 분',
      description:
        '사전 관찰실 운영, 개별 처치대 사용, 개별 욕조 사용 등 위생적으로 우리 아가를 케어하는 공간을 원하신다면.',
      icon: Baby,
    },
    {
      label: '부모 준비',
      title: '부모가 되기 위한 배움을 찾는분',
      description:
        '분유 조유, 트름시키기, 기저귀갈이 등 신생아 케어에 필요한 기본적인 교육을 원하신다면.',
      icon: BookUser,
    },
    
    {
      label: '객실·회복',
      title: '프라이빗한 회복공간을 찾는 분',
      description:
        '산후 회복에 필수적인 비품이 구비되어 있으며, 가슴관리 및 산후케어까지 온전한 쉼에 집중하고 싶으시다면.',
      icon: BedDouble,
    },
    {
      label: '분위기',
      title: '편안한 분위기를 원하시는 분',
      description:
        '북적이고 어수선하지 않은 공간에서 차분하고 따뜻한 쉼을 원하신다면',
      icon: Handshake,
    },
  ],
}

const ENGLISH_COPY: FitGuideCopy = {
  badgeLabel: 'Good Fit Guide',
  title: 'The Helia May Be Right For You If...',
  subtitle:
    'If this is your first visit, start here and quickly see whether The Helia matches what matters most to you.',
  closing:
    'If these points feel important, the next section will show The Helia’s strengths in more detail.',
  items: [
    {
      label: 'Nursery Care',
      title: 'You are looking for a hygienic nursery',
      description:
        'If you want a hygienic space for your baby, with a preliminary observation room, individual treatment stations, and individual bathtubs.',
      icon: Baby,
    },
    {
      label: 'Parent Preparation',
      title: 'You are looking for practical preparation for parenthood',
      description:
        'If you want foundational education for newborn care, including formula preparation, burping, and diaper changes.',
      icon: BookUser,
    },
    
    {
      label: 'Room & Recovery',
      title: 'You are looking for a private recovery space',
      description:
        'If you want essential postpartum recovery amenities, plus breast care and postpartum care, so you can focus fully on rest.',
      icon: BedDouble,
    },
    {
      label: 'Atmosphere',
      title: 'You want a comfortable atmosphere',
      description:
        'If you want calm, warm rest in a space that does not feel crowded or hectic.',
      icon: Handshake,
    },
  ],
}
