'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

import { ScrollReveal } from '@/components/common/ScrollReveal'
import { FAQ_ITEMS } from '@/components/stories/faq-data'
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
        <div className="flex flex-col gap-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#2A2928]/40 rounded-2xl border border-primary/10 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-lg font-semibold text-foreground pr-8">
                    {isKo ? item.question.ko : item.question.en}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
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
                      <div className="px-6 pb-6 pt-0">
                        <div className="h-px w-full bg-primary/10 mb-6" />
                        <p className="text-foreground leading-relaxed whitespace-pre-line">
                          {isKo ? item.answer.ko : item.answer.en}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </div>
  )
}
