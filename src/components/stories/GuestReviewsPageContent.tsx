'use client'

import { FadeInUp } from '@/components/common/FadeInUp'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { useOptionalThemeLocale } from '@/context/theme-locale-context'
import { blobUrl } from '@/lib/media'
import { ArrowUpRight, Quote, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Review = {
  id: number
  author: {
    ko: string
    en: string
  }
  date: string
  category: {
    ko: string
    en: string
  }
  headline: {
    ko: string
    en: string
  }
  content: {
    ko: string
    en: string
  }
  highlights: {
    ko: string[]
    en: string[]
  }
  initial: string
  link: string
  platform: 'blog'
  thumbnail: string
}

type PageCopy = {
  overview: {
    badge: string
    title: string
    description: string
    noteTitle: string
    noteBody: string
    stats: {
      label: string
      value: string
      description: string
    }[]
  }
  featured: {
    badge: string
    title: string
    description: string
  }
  archive: {
    badge: string
    title: string
    description: string
  }
  sourceLabel: string
  linkLabel: string
}

const REVIEWS: Review[] = [
  {
    id: 1,
    author: { ko: '뚱기 님', en: 'Ddoonggi' },
    date: '2026.02',
    category: { ko: 'VIP 2주 후기', en: 'VIP 2-week stay' },
    headline: {
      ko: '객실 기본기부터 베이비스파까지 고르게 담아낸 이용기',
      en: 'A balanced stay review from room quality to baby spa',
    },
    content: {
      ko: 'VIP룸 2주 이용 후기에서 객실 컨디션과 위생 관리, 24시간 확인 가능한 신생아실, 베이비스파·목욕교육까지 전반 만족도가 높았다고 전합니다.',
      en: 'This 2-week VIP review highlights strong room condition, hygiene routines, a nursery viewable anytime, and high satisfaction with baby spa and bathing education.',
    },
    highlights: {
      ko: ['객실 컨디션', '24시간 신생아실 확인', '베이비스파'],
      en: ['Room condition', '24/7 nursery viewing', 'Baby spa'],
    },
    initial: '뚱',
    link: 'https://blog.naver.com/wodllove2/224199420109',
    platform: 'blog',
    thumbnail: blobUrl('img/room/vip_livingroom1.jpg'),
  },
  {
    id: 2,
    author: { ko: '하용이네', en: "Hayong's Story" },
    date: '2024.10',
    category: { ko: '대기방 시작 후기', en: 'Started from waiting room' },
    headline: {
      ko: '조기출산 상황에서도 케어 동선이 안정적이었던 후기',
      en: 'A review showing stable care flow even after early delivery',
    },
    content: {
      ko: '조기출산으로 대기방부터 시작했지만 상담실 앞 신생아실 동선과 빠른 케어 대응이 특히 좋았고, 마사지·유축·식사 흐름도 실사용 관점에서 자세히 담긴 후기예요.',
      en: 'Even starting from a waiting room due to early delivery, this review praises fast nursery-side care flow and gives practical details on massage, pumping, and meals.',
    },
    highlights: {
      ko: ['빠른 케어 대응', '신생아실 동선', '마사지·유축 루틴'],
      en: ['Fast care response', 'Nursery flow', 'Massage and pumping routine'],
    },
    initial: '하',
    link: 'https://blog.naver.com/jjcokoboolhj/223630616760',
    platform: 'blog',
    thumbnail: '/img/headerpreview/infantroom.png',
  },
  {
    id: 3,
    author: { ko: '꼬대장 님', en: 'Kkodaejang' },
    date: '2026.04',
    category: { ko: '산전 케어 후기', en: 'Prenatal care review' },
    headline: {
      ko: '컨디션에 맞춘 강도 조절과 패키지 선택 포인트',
      en: 'A helpful guide to tailored intensity and package choice',
    },
    content: {
      ko: '산전케어 후기로, 컨디션에 맞춰 강도를 조절해주는 세심한 마사지와 산전·산후 패키지 구성이 구체적으로 정리되어 있어 관리 선택에 도움이 되는 글입니다.',
      en: 'A prenatal care-focused review that details tailored massage intensity and package options, useful for deciding between prenatal and postpartum care programs.',
    },
    highlights: {
      ko: ['강도 조절 마사지', '산전·산후 패키지', '관리 선택 참고'],
      en: ['Tailored massage', 'Pre and postpartum packages', 'Care planning'],
    },
    initial: '꼬',
    link: 'https://blog.naver.com/kkodaejang/224247014451',
    platform: 'blog',
    thumbnail: '/img/spa/spa_main.png',
  },
  {
    id: 4,
    author: { ko: '오늘 님', en: 'Oneul' },
    date: '2025.04',
    category: { ko: 'VIP 2주 기록', en: 'VIP 2-week diary' },
    headline: {
      ko: '남편 동선과 붓기 관리까지 함께 본 생활형 후기',
      en: 'A practical stay diary that also covers partner flow and swelling care',
    },
    content: {
      ko: 'VIP 2주 기록 중심 후기로 객실 기본기와 신생아실/젤리캠 접근성, 남편 동반 동선, 붓기 관리에 도움된 마사지 경험까지 균형 있게 다뤘습니다.',
      en: 'This 2-week VIP diary balances room basics, nursery/JellyCam access, partner-friendly flow, and massage experiences that helped with swelling recovery.',
    },
    highlights: {
      ko: ['젤리캠 접근성', '남편 동반 동선', '붓기 관리 마사지'],
      en: ['JellyCam access', 'Partner-friendly flow', 'Swelling care massage'],
    },
    initial: '오',
    link: 'https://blog.naver.com/dongkozip/223828057989',
    platform: 'blog',
    thumbnail: blobUrl('img/room/prestige_livingroom3.jpg'),
  },
  {
    id: 5,
    author: { ko: '단비 님', en: 'Danbi' },
    date: '2026.02',
    category: { ko: '내돈내산 VIP 후기', en: 'Self-paid VIP review' },
    headline: {
      ko: '웰컴키트와 회복 루틴 만족도가 잘 드러나는 후기',
      en: 'A review that clearly shows satisfaction with amenities and recovery rhythm',
    },
    content: {
      ko: '내돈내산 VIP 후기에서 웰컴키트·객실 비품·유축 환경과 함께 세탁/청소 서비스 만족도가 높고, 모자동실과 회복 루틴이 편했다는 점이 핵심입니다.',
      en: 'A self-paid VIP review emphasizing welcome kit quality, in-room pumping setup, and highly rated laundry/cleaning support that made recovery and rooming-in easier.',
    },
    highlights: {
      ko: ['웰컴키트', '유축 환경', '세탁·청소 서비스'],
      en: ['Welcome kit', 'Pumping setup', 'Laundry and cleaning'],
    },
    initial: '단',
    link: 'https://blog.naver.com/taetae_1201/224179921722',
    platform: 'blog',
    thumbnail: blobUrl('img/room/vvip_livingroom1.jpg'),
  },
  {
    id: 6,
    author: { ko: '초이 님', en: 'Choi' },
    date: '2026.01',
    category: { ko: 'Prestige 13박 14일', en: 'Prestige 13-night stay' },
    headline: {
      ko: '입소 초기 교육부터 하루 루틴까지 촘촘히 기록한 후기',
      en: 'A detailed stay review from early education to the daily rhythm',
    },
    content: {
      ko: '프레스티지 13박14일 후기로 입소 초기 교육(수유·기저귀·유축)과 2:1 케어, 식단·간식·프로그램 참여 동선까지 실제 하루 루틴을 구체적으로 정리했어요.',
      en: 'A 13-night Prestige review covering early education (feeding, diapering, pumping), 2:1 infant care, and a realistic daily rhythm of meals, snacks, and programs.',
    },
    highlights: {
      ko: ['수유·기저귀 교육', '2:1 케어', '식단·간식 루틴'],
      en: ['Feeding education', '2:1 care', 'Meals and snacks rhythm'],
    },
    initial: '초',
    link: 'https://blog.naver.com/rlorxya/224158217705',
    platform: 'blog',
    thumbnail: blobUrl('img/infant/strength_infant1.jpg'),
  },
  {
    id: 7,
    author: { ko: 'serrri 님', en: 'Serrri' },
    date: '2025.12',
    category: { ko: 'VIP 2주 + 베이비스파', en: 'VIP 2-week + baby spa' },
    headline: {
      ko: '더헬리아 산후조리원 VIP룸 이용후기',
      en: 'The Helia VIP Room Review',
    },
    content: {
      ko: 'VIP 2주 이용과 베이비스파 중심 후기로, 모자동실 대응·신생아실 수유콜 지원·젤리캠 접근성, 식사 만족도와 목욕교육 경험을 구체적으로 정리한 글입니다.',
      en: 'A VIP 2-week review centered on baby spa, covering rooming-in support, nursery call response, JellyCam access, meal satisfaction, and hands-on bathing education.',
    },
    highlights: {
      ko: ['베이비스파', '수유콜 지원', '목욕 교육'],
      en: ['Baby spa', 'Nursery call support', 'Bathing education'],
    },
    initial: '세',
    link: 'https://blog.naver.com/serrri/224106408914',
    platform: 'blog',
    thumbnail: '/img/headerpreview/infantroom.png',
  },
  {
    id: 8,
    author: { ko: 'fullcart 님', en: 'Fullcart' },
    date: '2026.02',
    category: { ko: 'VVIP 2주 + 산후마사지', en: 'VVIP 2-week + postpartum massage' },
    headline: {
      ko: '더헬리아 산후조리원 VVIP룸 이용후기',
      en: 'The Helia VVIP Room Review',
    },
    content: {
      ko: 'VVIP 2주 후기에서 객실 비품(원목 아기침대·메델라 유축기·좌욕기), 매일 청소/산모복 관리, 신생아실 관찰·수유콜 동선, 산후마사지 체감까지 실사용 관점으로 소개합니다.',
      en: 'This VVIP 2-week review details room amenities, daily cleaning and gown care, nursery visibility with flexible call flow, and practical postpartum massage outcomes.',
    },
    highlights: {
      ko: ['원목 아기침대', '수유콜 동선', '산후마사지 체감'],
      en: ['Wooden baby crib', 'Flexible feeding-call flow', 'Postpartum massage outcomes'],
    },
    initial: '풀',
    link: 'https://blog.naver.com/fullcart/224186390662',
    platform: 'blog',
    thumbnail: blobUrl('img/room/vvip_livingroom1.jpg'),
  },
]

const PAGE_COPY: Record<'ko' | 'en', PageCopy> = {
  ko: {
    overview: {
      badge: 'Real Stories',
      title: '실제 이용 후기로 보는 더헬리아 산후조리원',
      description:
        '후기 페이지는 단순한 칭찬 모음이 아니라, 객실 컨디션부터 신생아실 동선, 마사지와 베이비스파, 입소 후 하루 루틴까지 실제 체감 포인트를 빠르게 읽어볼 수 있도록 정리했습니다.',
      noteTitle: 'Review Curation',
      noteBody:
        '모든 카드는 실제 블로그 후기를 바탕으로 다시 정리한 요약이며, 클릭하면 원문 후기로 바로 이동합니다. 정보가 궁금한 영역부터 먼저 읽어보셔도 흐름이 자연스럽도록 구성했습니다.',
      stats: [
        {
          label: 'Curated Reviews',
          value: `${REVIEWS.length}`,
          description: '실제 블로그 기반으로 선별한 이용 후기',
        },
        {
          label: 'Coverage',
          value: '객실 · 신생아실 · 스파',
          description: '회복 생활 전반을 함께 살펴볼 수 있는 구성',
        },
        {
          label: 'Stay Types',
          value: 'VIP · VVIP · Prestige',
          description: '다양한 이용 유형과 상황을 포함한 기록',
        },
      ],
    },
    featured: {
      badge: 'Featured Stories',
      title: '먼저 읽어보면 좋은 후기',
      description:
        '처음 보는 분도 더헬리아의 생활감이 바로 잡히도록, 전체 흐름을 잘 보여주는 후기부터 앞에 배치했습니다.',
    },
    archive: {
      badge: 'More Reviews',
      title: '상황에 맞춰 더 살펴보세요',
      description:
        '산전 케어, 모자동실, 베이비스파, 산후마사지처럼 궁금한 주제에 따라 후기를 이어서 읽어보실 수 있습니다.',
    },
    sourceLabel: 'NAVER BLOG',
    linkLabel: '원문 후기 보기',
  },
  en: {
    overview: {
      badge: 'Real Stories',
      title: 'Real Stories from The Helia Families',
      description:
        'This page is not a simple collection of praise. It is arranged so you can quickly scan what families actually felt about room condition, nursery flow, massage, baby spa, and the rhythm of everyday recovery.',
      noteTitle: 'Review Curation',
      noteBody:
        'Every card is a rewritten summary based on a real blog review, and each one opens the original source. You can start with whichever topic matters most and still understand the full experience naturally.',
      stats: [
        {
          label: 'Curated Reviews',
          value: `${REVIEWS.length}`,
          description: 'Handpicked stories based on real blog reviews',
        },
        {
          label: 'Coverage',
          value: 'Room · Nursery · Spa',
          description: 'A practical view across the full recovery stay',
        },
        {
          label: 'Stay Types',
          value: 'VIP · VVIP · Prestige',
          description: 'A mix of room types and care situations',
        },
      ],
    },
    featured: {
      badge: 'Featured Stories',
      title: 'The first reviews worth reading',
      description:
        'These stories are placed first because they quickly reveal the overall rhythm of staying at The Helia.',
    },
    archive: {
      badge: 'More Reviews',
      title: 'Explore the topics that matter to you',
      description:
        'You can continue by topic, whether you want to read more about prenatal care, rooming-in, baby spa, nursery flow, or postpartum massage.',
    },
    sourceLabel: 'NAVER BLOG',
    linkLabel: 'Open original review',
  },
}

export function GuestReviewsPageContent() {
  const themeLocale = useOptionalThemeLocale()
  const locale: 'ko' | 'en' = themeLocale?.locale === 'en' ? 'en' : 'ko'
  const copy = PAGE_COPY[locale]
  const featuredReviewIds = new Set([7, 8])
  const featuredReviews = REVIEWS.filter((review) => featuredReviewIds.has(review.id))
  const archiveReviews = REVIEWS.filter((review) => !featuredReviewIds.has(review.id))

  const getReviewThumbnailAlt = (review: Review): string => {
    return locale === 'ko'
      ? `${review.author.ko} 후기 대표 이미지`
      : `Representative image from ${review.author.en}'s review`
  }

  return (
    <div className="w-full pb-24">
      <ReviewsOverview copy={copy.overview} />

      <section className="mt-24 space-y-12 md:mt-36 md:space-y-16">
        <SectionHeader
          badge={copy.featured.badge}
          title={copy.featured.title}
        />

        <div className="grid gap-8 xl:grid-cols-2 xl:gap-10">
          {featuredReviews.map((review, index) => (
            <FadeInUp key={review.id} delay={index * 0.08}>
              <FeaturedReviewCard
                review={review}
                locale={locale}
                sourceLabel={copy.sourceLabel}
                linkLabel={copy.linkLabel}
                thumbnailAlt={getReviewThumbnailAlt(review)}
              />
            </FadeInUp>
          ))}
        </div>
      </section>

      <section className="mt-24 space-y-12 md:mt-36 md:space-y-16">
        <SectionHeader
          badge={copy.archive.badge}
          title={copy.archive.title}
        />

        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 md:gap-x-10 xl:grid-cols-3">
          {archiveReviews.map((review, index) => (
            <FadeInUp key={review.id} delay={index * 0.06}>
              <ReviewCard
                review={review}
                locale={locale}
                sourceLabel={copy.sourceLabel}
                linkLabel={copy.linkLabel}
                thumbnailAlt={getReviewThumbnailAlt(review)}
              />
            </FadeInUp>
          ))}
        </div>
      </section>
    </div>
  )
}

function ReviewsOverview({
  copy,
}: {
  copy: PageCopy['overview']
}) {
  return (
    <ScrollReveal>
      <section className="mx-auto max-w-2xl py-8 text-center md:py-14">
        <p className="eyebrow">
          {copy.badge}
        </p>
        <h2 className="mx-auto mt-6 max-w-[18ch] break-keep font-display-serif text-3xl font-normal leading-[1.4] text-foreground md:text-4xl">
          {copy.title}
        </h2>
        <p className="mx-auto mt-6 max-w-[42ch] break-keep text-sm leading-[1.95] text-secondary md:text-base">
          {copy.description}
        </p>
      </section>
    </ScrollReveal>
  )
}

function SectionHeader({
  badge,
  title,
  description,
}: {
  badge: string
  title: string
  description?: string
}) {
  return (
    <ScrollReveal>
      <div className="space-y-4 text-center">
        <p className="eyebrow">
          {badge}
        </p>
        <h3 className="break-keep font-display-serif text-3xl font-normal leading-[1.4] text-foreground md:text-4xl">
          {title}
        </h3>
        {description ? (
          <p className="mx-auto max-w-[40ch] break-keep text-sm leading-[1.9] text-secondary md:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </ScrollReveal>
  )
}

function FeaturedReviewCard({
  review,
  locale,
  sourceLabel,
  linkLabel,
  thumbnailAlt,
}: {
  review: Review
  locale: 'ko' | 'en'
  sourceLabel: string
  linkLabel: string
  thumbnailAlt: string
}) {
  const localizedCategory = review.category[locale]
  const localizedHeadline = review.headline[locale]
  const localizedHighlights = review.highlights[locale]
  const localizedAuthor = review.author[locale]

  return (
    <Link
      href={review.link}
      target="_blank"
      rel="noreferrer"
      className="group block h-full"
    >
      <article className="overflow-hidden border border-border bg-background transition-colors duration-500 hover:border-foreground/40">
        <div className="grid h-full gap-0 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative min-h-[300px] overflow-hidden lg:min-h-full">
            <Image
              src={review.thumbnail}
              alt={thumbnailAlt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/22 via-black/5 to-transparent" />
            <div className="absolute left-6 top-6 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-white drop-shadow">
              {sourceLabel}
            </div>
          </div>

          <div className="relative flex h-full flex-col p-6 text-left md:p-8">
            <Quote className="absolute right-6 top-6 h-16 w-16 text-primary/10" strokeWidth={1.5} />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                  {localizedCategory}
                </span>
                <span className="font-sans text-xs font-medium tracking-[0.18em] text-secondary uppercase">
                  {review.date}
                </span>
              </div>

              <div className="mt-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-3.5 w-3.5 text-primary"
                    strokeWidth={1.5}
                  />
                ))}
              </div>

              <h4 className="mt-6 max-w-[20ch] break-keep font-display-serif text-2xl font-normal leading-[1.45] text-foreground md:text-[1.75rem]">
                {localizedHeadline}
              </h4>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {localizedHighlights.map((highlight) => (
                <span
                  key={highlight}
                  className="font-sans text-xs tracking-[0.08em] text-secondary"
                >
                  {highlight}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center border border-border font-display-serif text-lg text-primary">
                  {review.initial}
                </div>
                <div>
                  <p className="text-sm text-foreground">
                    {localizedAuthor}
                  </p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-secondary">
                    {review.date}
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 border-b border-border pb-1 font-sans text-xs font-semibold text-foreground transition-colors duration-300 group-hover:border-foreground">
                {linkLabel}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

function ReviewCard({
  review,
  locale,
  sourceLabel,
  linkLabel,
  thumbnailAlt,
}: {
  review: Review
  locale: 'ko' | 'en'
  sourceLabel: string
  linkLabel: string
  thumbnailAlt: string
}) {
  const localizedCategory = review.category[locale]
  const localizedHeadline = review.headline[locale]
  const localizedHighlights = review.highlights[locale]
  const localizedAuthor = review.author[locale]

  return (
    <Link
      href={review.link}
      target="_blank"
      rel="noreferrer"
      className="group block h-full"
    >
      <article className="relative flex h-full flex-col overflow-hidden border-t border-border pt-6 transition-colors duration-500">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={review.thumbnail}
            alt={thumbnailAlt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent" />
          <div className="absolute left-5 top-5 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-white drop-shadow">
            {sourceLabel}
          </div>
        </div>

        <div className="flex flex-1 flex-col pt-6 text-left">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              {localizedCategory}
            </span>
            <span className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-secondary">
              {review.date}
            </span>
          </div>

          <h4 className="mt-5 break-keep font-display-serif text-xl font-normal leading-[1.5] text-foreground md:text-[1.4rem]">
            {localizedHeadline}
          </h4>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {localizedHighlights.map((highlight) => (
              <span
                key={highlight}
                className="font-sans text-xs tracking-[0.08em] text-secondary"
              >
                {highlight}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center border border-border font-display-serif text-base text-primary">
                {review.initial}
              </div>
                <div>
                  <p className="text-sm text-foreground">
                    {localizedAuthor}
                  </p>
                  <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-secondary">
                    {sourceLabel}
                  </p>
                </div>
              </div>

            <div className="inline-flex items-center gap-2 border-b border-border pb-1 font-sans text-xs font-semibold text-foreground transition-colors duration-300 group-hover:border-foreground">
              {linkLabel}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
