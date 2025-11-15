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
            title: "더 헬리아의 다양한 모습 바로가기",
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
      className="w-full bg-background px-4 py-16 text-secondary sm:px-6 md:py-20 lg:px-12"
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
      <p className="text-xs  uppercase tracking-[0.4em] text-primary">
        {copy.badge}
      </p>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h2 className="text-3xl  md:text-4xl">{copy.title}</h2>
        <p className="max-w-xl text-sm text-secondary/70 md:text-base">
          {copy.subtitle}
        </p>
      </div>
    </div>
  );
}

type NavigationPanelGridProps = {
  items: NavItem[];
  activeId: string | null;
  onActivate: (id: string) => void;
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
    ? "mt-10 grid w-full gap-4"
    : "mt-10 flex w-full flex-col gap-4";

  return (
    <div
      className={wrapperClass}
      style={
        columnTemplate
          ? {
              gridTemplateColumns: columnTemplate,
              transition: "grid-template-columns 0.3s ease",
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
  onActivate: (id: string) => void;
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
  const shouldShowDetails = isDesktop ? isExpanded : active
  const shouldShowActions = isDesktop ? true : active
  const showSubLinks = shouldShowDetails && item.sub?.length

  const handleDesktopActivate = () => {
    if (!isDesktop) return
    onActivate(item.id)
  }

  const handleContainerClick = () => {
    if (isDesktop) return
    onActivate(item.id)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    if (!isDesktop) {
      onActivate(item.id)
    }
  }

  const handleToggleClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    if (!isDesktop) {
      onActivate(item.id)
    }
  }

  return (
    <motion.article
      layout
      transition={{ layout: { duration: 0.5, ease: 'easeOut' } }}
      role="button"
      tabIndex={0}
      aria-pressed={active}
      aria-expanded={!isDesktop ? active : isExpanded}
      onMouseEnter={handleDesktopActivate}
      onFocus={handleDesktopActivate}
      onClick={handleContainerClick}
      onKeyDown={handleKeyDown}
      className={clsx(
        'group relative min-h-[80px] overflow-hidden rounded-3xl border border-border/40 bg-background/70 text-left transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-ne-resize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
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
            'object-cover transition duration-500',
            active ? 'scale-110' : 'scale-100',
          )}
          
          priority={active}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/0" />
      </div>

      <div
        className={clsx(
          'relative flex h-full flex-col justify-between p-6 text-white transition-colors',
          active ? '' : 'backdrop-blur-sm',
        )}
      >
        <div>
          <div className="flex items-center justify-between gap-3">
            <h3
              className={clsx(
                'text-2xl uppercase tracking-[0.1em] text-white/80',
                localeClassName(locale),
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
            {shouldShowDetails ? (
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
                    'text-xl font-semibold leading-snug md:text-2xl',
                    active ? 'text-white' : 'text-white/85',
                  )}
                >
                  {item.description ?? item.label}
                </h3>
                {item.sub?.length ? (
                  <p className="mt-4 text-base text-white/80 line-clamp-3 md:text-lg">
                    {item.sub[0].description}
                  </p>
                ) : null}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <AnimatePresence initial={false}>
          {isDesktop || shouldShowActions ? (
            <motion.div
              key={`${item.id}-actions-${isDesktop ? 'desktop' : 'mobile'}`}
              className={clsx(
                'mt-auto flex w-full gap-4 pt-6',
                isExpanded
                  ? 'flex-col md:flex-row md:items-center md:justify-between'
                  : 'flex-col items-center',
              )}
              initial={
                isDesktop
                  ? false
                  : {
                      opacity: 0,
                      y: 12,
                    }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {showSubLinks ? (
                <div className="flex flex-wrap justify-center gap-2 text-xs text-white/90 md:justify-start">
                  {item.sub?.map((sub) => (
                    <Link
                      key={sub.id}
                      href={sub.href}
                      className="rounded-lg border border-white/40 transition hover:bg-white/15 px-5 py-2 "
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ) : null}
              <Link
                href={targetHref}
                className={clsx(
                  'inline-flex items-center gap-2 rounded-lg  px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-white cursor-pointer border border-white/20',
                  showSubLinks ? '' : 'justify-center border border-white/20 ',
                )}
              >
                {ctaLabel}
                <span aria-hidden className="text-base">↗</span>
              </Link>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}

const localeClassName = (locale: Locale) =>
  locale === 'ko' ? 'font-maru-semi' : 'font-source-semi'
