import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/the-helia/about',
    '/the-helia/location',
    '/reservation',
    '/reservation/price',
    '/room-suites/vip',
    '/room-suites/vvip',
    '/room-suites/prestige',
    '/service/helia-spa',
    '/service/baby-spa',
    '/service/infant-room',
    '/service/moms-class',
    '/stories/faq',
    '/stories/guest-reviews',
  ] as const

  const locales = ['ko', 'en']

  const sitemapEntries: MetadataRoute.Sitemap = []

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${SITE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })

  return sitemapEntries
}
