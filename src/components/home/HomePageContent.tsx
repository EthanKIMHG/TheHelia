'use client'

import { animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import type { Locale } from '@/components/header/types'
import { CinematicHero } from '@/components/home/CinematicHero'
import { HomeFitGuide } from '@/components/home/HomeFitGuide'
import { HomeIntroView } from '@/components/home/HomeIntroView'
import { HomeNavigationGallery } from '@/components/home/HomeNavigationGallery'
import { HomePrograms } from '@/components/home/HomePrograms'
import PartnerLogoMarquee from '@/components/home/PartnerLogoMarquee'

const coOpLogos = [
  { src: '/img/logo/BodyFriend.png', alt: 'Bodyfriend' },
  { src: '/img/logo/LaCloud.png', alt: 'La Cloud' },
  { src: '/img/logo/LGElectronics.png', alt: 'LG Electronics' },
  { src: '/img/logo/Medela.png', alt: 'Medela' },
  { src: '/img/logo/MoltonBrown.png', alt: 'Molton Brown' },
  { src: '/img/logo/Philips.png', alt: 'Philips' },
  { src: '/img/logo/Dyson.png', alt: 'Dyson' },
  { src: '/img/logo/JellyView.png', alt: 'Jelly View' },
  { src: '/img/logo/Libero.png', alt: 'Libero' },
  { src: '/img/logo/Cesco.png', alt: 'Cesco' },
  { src: '/img/logo/Secom.png', alt: 'Secom' },
  { src: '/img/logo/Evian.png', alt: 'Evian' },
  { src: '/img/logo/THALIC_Origin.png', alt: 'Thalic Origin' },
  { src: '/img/logo/tempur.png', alt: 'Tempur' },
]

type HomePageContentProps = {
  locale: Locale
}

export default function HomePageContent({
  locale,
}: HomePageContentProps): React.JSX.Element {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const sectionOrderRef = useRef<string[]>([])
  const animationRef = useRef<ReturnType<typeof animate> | null>(null)
  const isAnimatingRef = useRef(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateDesktop = (): void => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    updateDesktop()
    window.addEventListener('resize', updateDesktop)

    return () => window.removeEventListener('resize', updateDesktop)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !isDesktop) return

    const handleWheel = (event: WheelEvent): void => {
      if (Math.abs(event.deltaY) < 20) return
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      animationRef.current?.stop()
      window.removeEventListener('wheel', handleWheel)
    }
  }, [isDesktop])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const syncIndexWithScroll = (): void => {
      if (isAnimatingRef.current) return
      const order = sectionOrderRef.current
      if (order.length === 0) return
      const scrollY = window.scrollY
      let smallestDelta = Number.POSITIVE_INFINITY

      order.forEach((id) => {
        const node = sectionRefs.current[id]
        if (!node) return
        const nodeTop = node.getBoundingClientRect().top + window.scrollY
        const delta = Math.abs(scrollY - nodeTop)
        if (delta < smallestDelta) {
          smallestDelta = delta
        }
      })
    }

    window.addEventListener('scroll', syncIndexWithScroll, { passive: true })

    return () => window.removeEventListener('scroll', syncIndexWithScroll)
  }, [])

  const registerSection = (id: string, node: HTMLElement | null): void => {
    if (node) {
      sectionRefs.current[id] = node
      if (!sectionOrderRef.current.includes(id)) {
        sectionOrderRef.current.push(id)
      }

      return
    }

    sectionRefs.current[id] = null
  }

  return (
    <div className="min-h-screen">
      <main className="flex w-full flex-col items-center overflow-x-hidden">
        <section
          id="hero"
          ref={(node) => registerSection('hero', node)}
          className="w-full"
        >
          <CinematicHero locale={locale} />
        </section>

        <HomeIntroView onSectionMount={registerSection} />

        <HomeFitGuide
          locale={locale}
          onSectionMount={(node) => registerSection('fit-guide', node)}
        />

        <HomePrograms
          locale={locale}
          onSectionMount={(node) => registerSection('programs', node)}
        />

        <HomeNavigationGallery
          locale={locale}
          sectionId="highlight"
          onSectionMount={(node) => registerSection('highlight', node)}
        />

        <section
          id="partners"
          ref={(node) => registerSection('partners', node)}
          className="w-full py-12"
        >
          <div className="px-4 py-12 text-center md:px-12 md:text-left">
            <span className="break-keep text-3xl md:text-4xl">
              {locale === 'ko' ? '더헬리아와 함께하는 기업들' : 'Our Partners'}
            </span>
          </div>
          <PartnerLogoMarquee
            logos={coOpLogos}
            speed={40}
            direction="left"
            logoHeight={60}
            gap={60}
            pauseOnHover
            scaleOnHover
            ariaLabel="cooperation logos"
            className="bg-[#FAF9F6]"
          />
        </section>
      </main>
    </div>
  )
}
