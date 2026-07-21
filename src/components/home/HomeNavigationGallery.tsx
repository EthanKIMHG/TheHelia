'use client'

import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { getLocalizedNavItems } from '@/components/header/nav-data'
import type { Locale, NavItem } from '@/components/header/types'
import { GlassCard } from '@/components/ui/glass/GlassCard'

type NavigationCopy = {
  badge: string;
  title: string;
  subtitle: string;
  cta: string;
};

type HomeNavigationGalleryProps = {
  locale: Locale;
  sectionId?: string;
  onSectionMount?: (node: HTMLElement | null) => void;
};

export function HomeNavigationGallery({
  locale,
  sectionId = "nav-gallery",
  onSectionMount,
}: HomeNavigationGalleryProps) {
  const navItems = useMemo(() => getLocalizedNavItems(locale), [locale]);
  const [activeId, setActiveId] = useState<string | null>(
    navItems[0]?.id ?? null,
  );
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const copy = useMemo<NavigationCopy>(
    () =>
      locale === "ko"
        ? {
            badge: "HELIA NAVIGATION",
            title: "더헬리아의 다양한 모습 바로가기",
            subtitle:
              "원하는 메뉴에 마우스를 올려 미리보기를 확인하고 바로 이동해 보세요.",
            cta: "바로가기",
          }
        : {
            badge: "HELIA NAVIGATION",
            title: "Explore The Helia",
            subtitle:
              "Hover over any column to preview the destination instantly.",
            cta: "Open page",
          },
    [locale],
  );

  return (
    <section
      id={sectionId}
      ref={onSectionMount}
      className="glass-depth w-full px-4 py-16 text-foreground sm:px-6 md:py-20 lg:px-12"
      style={{ minHeight: isDesktop ? "80vh" : undefined }}
    >
      <NavigationGalleryHeader copy={copy} />
      <NavigationPanelGrid
        items={navItems}
        activeId={activeId}
        onActivate={setActiveId}
        copy={copy}
        isDesktop={isDesktop}
        locale={locale}
      />
    </section>
  );
}

function NavigationGalleryHeader({ copy }: { copy: NavigationCopy }) {
  return (
    <div className="mx-auto flex w-full flex-col gap-5 text-center md:text-left">
      <p className="eyebrow">
        {copy.badge}
      </p>
      <div className="flex flex-col items-center gap-3 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display-serif text-3xl font-normal leading-[1.4] text-foreground md:text-4xl">
          {copy.title}
        </h2>
        <p className="max-w-[34ch] text-sm leading-[1.85] text-secondary md:max-w-xl md:text-[15px]">
          {copy.subtitle}
        </p>
      </div>
    </div>
  );
}

type NavigationPanelGridProps = {
  items: NavItem[];
  activeId: string | null;
  onActivate: (id: string | null) => void;
  copy: NavigationCopy;
  isDesktop: boolean;
  locale: Locale;
};

function NavigationPanelGrid({
  items,
  activeId,
  onActivate,
  copy,
  isDesktop,
  locale,
}: NavigationPanelGridProps) {
  const columnTemplate = useMemo(() => {
    if (!isDesktop || !items.length) return undefined;
    return items.map((item) => (item.id === activeId ? "4fr" : "1fr")).join(" ");
  }, [activeId, isDesktop, items]);

  const wrapperClass = isDesktop
    ? "mt-10 grid w-full gap-4 transition-[grid-template-columns] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
    : "mt-10 flex w-full flex-col gap-4";

  return (
    <div
      className={wrapperClass}
      style={
        columnTemplate
          ? {
              gridTemplateColumns: columnTemplate,
              willChange: "grid-template-columns",
            }
          : undefined
      }
    >
      {items.map((item) => (
        <NavigationPanelCard
          key={item.id}
          item={item}
          active={item.id === activeId}
          ctaLabel={copy.cta}
          isDesktop={isDesktop}
          locale={locale}
          onActivate={onActivate}
        />
      ))}
    </div>
  );
}

type NavigationPanelCardProps = {
  item: NavItem;
  active: boolean;
  onActivate: (id: string | null) => void;
  ctaLabel: string;
  isDesktop: boolean;
  locale: Locale;
};

function NavigationPanelCard({
  item,
  active,
  onActivate,
  ctaLabel,
  isDesktop,
  locale,
}: NavigationPanelCardProps) {
  const targetHref =
    item.href ?? item.sub?.[0]?.href ?? item.sub?.[0]?.baseHref ?? '#'
  const previewSrc =
    item.previewImage?.src ??
    item.sub?.[0]?.previewImage?.src ??
    '/img/main/homepage_1.jpg'
  const previewAlt =
    item.previewImage?.alt ??
    item.sub?.[0]?.previewImage?.alt ??
    item.label

  const isExpanded = active && isDesktop
  const isInactiveOnDesktop = isDesktop && !active
  const shouldShowDesktopDetails = isExpanded
  const shouldShowDesktopActions = isExpanded
  const shouldShowMobilePanel = !isDesktop && active
  const showSubLinks =
    Boolean(item.sub?.length) &&
    (isDesktop ? shouldShowDesktopDetails : shouldShowMobilePanel)
  const quickRoutesLabel = locale === 'ko' ? '빠른 이동' : 'Quick Routes'

  const quickRouteRailClassName = 'flex flex-col gap-3'
  const glassSubLinkClassName =
    'glass-on-dark glass-press inline-flex min-h-9 items-center rounded-[var(--radius-pill)] px-4 py-1.5 text-[11px] tracking-[0.16em] text-white/95'
  const glassCtaClassName =
    'press-grow inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-white/95 px-6 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#3A2E22] shadow-[var(--shadow-glass-strong)] transition-colors duration-300 hover:bg-white'

  const handleDesktopActivate = () => {
    if (!isDesktop) return
    onActivate(item.id)
  }

  const toggleMobilePanel = () => {
    if (isDesktop) return
    onActivate(active ? null : item.id)
  }

  const handleContainerClick = () => {
    toggleMobilePanel()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    if (!isDesktop) {
      toggleMobilePanel()
    }
  }

  const handleToggleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (!isDesktop) {
      toggleMobilePanel()
    }
  }

  const handleActionAreaClick = (event: ReactMouseEvent<HTMLElement>) => {
    if (!isDesktop) {
      event.stopPropagation()
    }
  }

  return (
    <GlassCard
      as="article"
      radius="lg"
      interactive
      role="button"
      tabIndex={0}
      aria-pressed={active}
      aria-expanded={!isDesktop ? active : isExpanded}
      onMouseEnter={handleDesktopActivate}
      onFocus={handleDesktopActivate}
      onClick={handleContainerClick}
      onKeyDown={handleKeyDown}
      className={clsx(
        'group relative isolate min-h-[80px] min-w-0 overflow-hidden text-left cursor-ne-resize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
        'flex flex-col',
        isDesktop && 'md:min-h-[80vh]',
      )}
    >
      <span className="sr-only">{item.label}</span>
      <div className="absolute inset-0">
        <Image
          src={previewSrc}
          alt={previewAlt}
          fill
          className={clsx(
            'object-cover transform-gpu transition-[transform,filter,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform',
            active
              ? 'scale-[1.03] opacity-100'
              : 'scale-100 md:brightness-[0.88] md:opacity-90',
          )}
          priority={active}
        />
        <div
          className={clsx(
            'absolute inset-0 transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
            active ? 'bg-black/5' : 'bg-black/20',
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/26 to-black/0" />
      </div>

      <div
        className={clsx(
          'relative z-10 flex h-full flex-col justify-between p-6 text-white transition-opacity duration-500 [backface-visibility:hidden]',
          active ? 'opacity-100' : '',
          isInactiveOnDesktop && 'opacity-[0.9]',
        )}
      >
        <div>
          <div className="flex items-center justify-between gap-3 font-serif">
            <h3
              className={clsx(
                'text-xl md:text-2xl uppercase tracking-[0.14em] transition-colors duration-500 font-normal drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)]',
                active ? 'text-white' : 'text-white/85',
              )}
            >
              {item.label}
            </h3>
            {!isDesktop ? (
              <button
                type="button"
                aria-label="Toggle navigation details"
                aria-expanded={active}
                onClick={handleToggleClick}
                style={{ borderRadius: 'var(--radius-md)' }}
                className="glass-on-dark glass-press inline-flex h-9 w-9 items-center justify-center"
              >
                <ChevronDown
                  className={clsx(
                    'h-4 w-4 text-white transition-transform duration-300',
                    active ? 'rotate-180' : 'rotate-0',
                  )}
                />
              </button>
            ) : null}
          </div>
          <AnimatePresence initial={false}>
            {shouldShowDesktopDetails ? (
              <motion.div
                key={`${item.id}-copy`}
                className="mt-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <h3
                  className={clsx(
                    'text-xl leading-snug md:text-2xl font-serif transition-colors duration-500',
                    active ? 'text-white' : 'text-white/85',
                  )}
                >
                  {item.description ?? item.label}
                </h3>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {!isDesktop ? (
            <motion.div
              initial={false}
              className="grid overflow-hidden"
              animate={{
                gridTemplateRows: shouldShowMobilePanel ? '1fr' : '0fr',
                opacity: shouldShowMobilePanel ? 1 : 0,
              }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="overflow-hidden">
                <motion.div
                  initial={false}
                  onClick={handleActionAreaClick}
                  className="pt-4"
                  animate={{
                    y: shouldShowMobilePanel ? 0 : -10,
                    filter: shouldShowMobilePanel ? 'blur(0px)' : 'blur(8px)',
                  }}
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="text-xl font-semibold leading-snug text-white">
                    {item.description ?? item.label}
                  </h3>

                  <div className="mt-5 flex w-full flex-col gap-3">
                    {showSubLinks ? (
                      <div className={quickRouteRailClassName}>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-white/58">
                          {quickRoutesLabel}
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                          {item.sub?.map((sub) => (
                            <Link
                              key={sub.id}
                              href={sub.href}
                              className={glassSubLinkClassName}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    <Link href={targetHref} className={glassCtaClassName}>
                      {ctaLabel}
                      <span aria-hidden className="text-base">→</span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : null}
        </div>

        <AnimatePresence initial={false}>
          {shouldShowDesktopActions ? (
            <motion.div
              key={`${item.id}-actions-${isDesktop ? 'desktop' : 'mobile'}`}
              className={clsx(
                'mt-auto flex w-full gap-4 pt-6',
                showSubLinks
                  ? 'flex-col md:flex-row md:items-end md:justify-between'
                  : 'justify-start',
              )}
              initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              onClick={handleActionAreaClick}
            >
              {showSubLinks ? (
                <div
                  className={clsx(
                    quickRouteRailClassName,
                    'md:max-w-[calc(100%-12rem)]',
                  )}
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/54">
                    {quickRoutesLabel}
                  </p>
                  <div className="flex flex-wrap gap-2.5 md:justify-start">
                    {item.sub?.map((sub) => (
                      <Link
                        key={sub.id}
                        href={sub.href}
                        className={glassSubLinkClassName}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
              <Link
                href={targetHref}
                className={clsx(
                  glassCtaClassName,
                  showSubLinks ? 'self-start md:self-end' : 'self-start',
                )}
              >
                {ctaLabel}
                <span aria-hidden className="text-base">→</span>
              </Link>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </GlassCard>
  )
}
