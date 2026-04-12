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
      className="w-full bg-background px-4 py-16 text-foreground sm:px-6 md:py-20 lg:px-12"
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
    <div className="mx-auto flex w-full flex-col gap-4 text-left">
      <p className="text-xs uppercase tracking-[0.4em] text-primary">
        {copy.badge}
      </p>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between font-serif">
        <h2 className=" text-3xl md:text-4xl text-foreground">
          {copy.title}
        </h2>
        <p className="max-w-xl text-sm text-foreground/70 md:text-base">
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
    'inline-flex min-h-10 items-center rounded-full border border-white/16 bg-white/[0.08] px-4 py-2 text-[11px] font-medium tracking-[0.14em] text-white/94 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] backdrop-blur-lg transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.16] hover:text-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.24),0_14px_28px_rgba(0,0,0,0.14)]'
  const glassCtaClassName =
    'inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/34 bg-white/[0.22] px-6 text-xs font-semibold uppercase tracking-[0.22em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.34),0_18px_40px_rgba(0,0,0,0.22)] hover:-translate-y-0.5 hover:border-white/46 hover:bg-white/[0.32] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_24px_48px_rgba(0,0,0,0.24)]'

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
    <article
      role="button"
      tabIndex={0}
      aria-pressed={active}
      aria-expanded={!isDesktop ? active : isExpanded}
      onMouseEnter={handleDesktopActivate}
      onFocus={handleDesktopActivate}
      onClick={handleContainerClick}
      onKeyDown={handleKeyDown}
      className={clsx(
        'group relative isolate min-h-[80px] min-w-0 overflow-hidden rounded-3xl border bg-background/70 text-left cursor-ne-resize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
        'flex flex-col',
        active
          ? 'border-white/40 shadow-[0_24px_80px_rgba(0,0,0,0.28)]'
          : 'border-border/40',
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
              ? 'scale-[1.045] blur-0 brightness-105 opacity-100'
              : 'scale-100 md:blur-[2px] md:brightness-[0.72] md:opacity-75',
          )}
          priority={active}
        />
        <div
          className={clsx(
            'absolute inset-0 transition-colors duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
            active ? 'bg-none' : 'bg-black/10',
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
                'text-xl md:text-2xl uppercase tracking-[0.1em] transition-colors duration-500 font-semibold',
                active ? 'text-white' : 'text-white/72',
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
                className={clsx(
                  'inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/20 transition',
                  active ? 'bg-white/15' : 'bg-black/40',
                )}
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
    </article>
  )
}
