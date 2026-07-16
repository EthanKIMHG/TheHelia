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
      className="w-full bg-accent/35 px-4 py-24 text-foreground sm:px-6 md:px-8 md:py-32"
    >
      <ScrollReveal>
        <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <div className="text-center lg:text-left">
            <span className="eyebrow inline-flex items-center gap-2">
              <Sparkles className="h-3 w-3" strokeWidth={1.5} />
              {copy.badgeLabel}
            </span>

            <h2 className="mx-auto mt-6 max-w-[11ch] break-keep font-display-serif text-3xl font-normal leading-[1.4] text-foreground md:max-w-[10ch] md:text-4xl lg:mx-0">
              {copy.title}
            </h2>

            <p className="mx-auto mt-6 max-w-[30ch] break-keep text-base leading-loose text-secondary md:text-[17px] lg:mx-0">
              {copy.subtitle}
            </p>

            <div className="mt-10 border-t border-border pt-6">
              <p className="break-keep text-sm leading-[1.85] text-secondary md:text-[15px]">
                {copy.closing}
              </p>
            </div>
          </div>

          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {copy.items.map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.title}
                  className="flex flex-col border-t border-border pt-6 text-left"
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                    <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">
                      {item.label}
                    </span>
                  </div>

                  <h3 className="break-keep font-display-serif text-lg font-normal leading-[1.5] text-foreground md:text-xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 break-keep text-sm leading-[1.85] text-secondary sm:text-[14.5px]">
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
