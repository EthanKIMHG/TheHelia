'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

import { ScrollReveal } from '@/components/common/ScrollReveal'
import { FAQ_ITEMS } from '@/components/stories/faq-data'
import { GlassCard } from '@/components/ui/glass/GlassCard'
import { useOptionalThemeLocale } from '@/context/theme-locale-context'

export function FaqPageContent() {
  const themeLocale = useOptionalThemeLocale()
  const locale = themeLocale?.locale ?? 'ko'
  const isKo = locale === 'ko'
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ScrollReveal>
        <GlassCard radius="lg" className="flex flex-col divide-y divide-border px-6 md:px-8">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="overflow-hidden"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex items-center justify-between py-6 text-left focus:outline-none"
                >
                  <span className="pr-8 font-display-serif text-lg font-normal leading-[1.5] text-foreground">
                    {isKo ? item.question.ko : item.question.en}
                  </span>
                  <div className="flex-shrink-0 text-primary">
                    {isOpen ? <Minus className="h-5 w-5" strokeWidth={1.5} /> : <Plus className="h-5 w-5" strokeWidth={1.5} />}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="pb-6 pt-0">
                        <p className="whitespace-pre-line leading-loose text-secondary">
                          {isKo ? item.answer.ko : item.answer.en}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </GlassCard>
      </ScrollReveal>
    </div>
  )
}
