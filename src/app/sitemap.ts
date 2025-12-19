import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://the-helia.vercel.app'; //도메인 변경 해야함.

  const routes = [
    '',
    '/the-helia/about',
    '/the-helia/location',
    '/room-suites',
    '/reservation',
    '/service/massage',
    '/service/spa',
    '/service/infant-room',
    '/service/moms-class',
    '/stories/faq',
    '/stories/guest-reviews'

  ];

  const locales = ['ko', 'en'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  return sitemapEntries;
}
