'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { GlassCard } from '@/components/ui/glass/GlassCard'

const DISMISS_UNTIL_KEY = 'the-helia:bed-upgrade-notice:2026-08:dismiss-until'
const PREVIEW_QUERY = 'previewNotice'
const PREVIEW_VALUE = 'bed-upgrade'
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000

export function BedUpgradeNoticeModal(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const isPreview = new URLSearchParams(window.location.search).get(PREVIEW_QUERY) === PREVIEW_VALUE
    if (isPreview) {
      setIsOpen(true)
      return
    }

    try {
      const dismissUntil = Number(window.localStorage.getItem(DISMISS_UNTIL_KEY))
      setIsOpen(!Number.isFinite(dismissUntil) || dismissUntil <= Date.now())
    } catch {
      setIsOpen(true)
    }
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const dismissForOneDay = (): void => {
    try {
      window.localStorage.setItem(
        DISMISS_UNTIL_KEY,
        String(Date.now() + ONE_DAY_IN_MS),
      )
    } catch {
      // Storage can be unavailable in strict privacy modes; the modal should still close.
    }

    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="zone-dark fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6">
          <motion.button
            type="button"
            aria-label="팝업 닫기"
            className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            className="relative z-10 w-fit max-w-full"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.38,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <GlassCard
              as="section"
              tone="dark"
              radius="lg"
              role="dialog"
              aria-modal="true"
              aria-labelledby="bed-upgrade-notice-title"
              aria-describedby="bed-upgrade-notice-description"
              className="max-w-full overflow-hidden"
            >
              <h2 id="bed-upgrade-notice-title" className="sr-only">
                더헬리아 침대 업그레이드 안내
              </h2>
              <p id="bed-upgrade-notice-description" className="sr-only">
                VVIP와 Prestige 객실의 모션베드 업그레이드 안내입니다.
              </p>

              <div className="relative bg-background">
                <Image
                  src="/img/notices/bed-upgrade.jpg"
                  alt="더헬리아 침대 업그레이드 안내. VVIP ROOM은 라클라우드 Q 모션베드 1대에서 템퍼 K 모션베드 1대로, PRESTIGE ROOM은 라클라우드 SS 모션베드 2대에서 템퍼 SS 모션베드 1대와 라클라우드 SS 모션베드 1대로 변경됩니다."
                  width={1020}
                  height={713}
                  priority
                  sizes="(max-width: 640px) calc(100vw - 24px), min(1020px, calc(100vw - 48px))"
                  className="block h-auto max-h-[calc(100dvh-7.25rem)] w-auto max-w-[calc(100vw-1.5rem)] object-contain sm:max-h-[calc(100dvh-8rem)] sm:max-w-[min(1020px,calc(100vw-3rem))]"
                />

                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label="팝업 닫기"
                  onClick={() => setIsOpen(false)}
                  style={{ borderRadius: 'var(--radius-pill)' }}
                  className="press-grow absolute right-2.5 top-2.5 grid size-9 place-items-center border border-border bg-accent/85 text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:right-4 sm:top-4 sm:size-10"
                >
                  <X aria-hidden size={19} strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex h-14 items-center justify-between gap-4 px-4 font-sans text-[13px] text-foreground sm:h-16 sm:px-6 sm:text-sm">
                <button
                  type="button"
                  onClick={dismissForOneDay}
                  className="group flex items-center gap-2.5 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <span className="grid size-4 place-items-center border border-primary transition-colors group-hover:border-foreground" />
                  1일 동안 보지 않기
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-secondary transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  닫기
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
