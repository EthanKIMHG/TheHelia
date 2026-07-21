import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Nanum_Myeongjo, Playfair_Display } from 'next/font/google'

import { SmoothScroll } from '@/components/common/SmoothScroll'
import { SITE_URL } from '@/lib/site'

import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const nanumMyeongjo = Nanum_Myeongjo({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-nanum-myeongjo',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  manifest: '/favicon1.ico/manifest.json',
  icons: {
    icon: [
      { url: '/favicon1.ico/favicon.ico' },
      { url: '/favicon1.ico/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon1.ico/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon1.ico/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon1.ico/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: ['/favicon1.ico/favicon.ico'],
    apple: [
      { url: '/favicon1.ico/apple-icon.png' },
      { url: '/favicon1.ico/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  other: {
    'msapplication-config': '/favicon1.ico/browserconfig.xml',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <html lang="ko" className={`${playfair.variable} ${nanumMyeongjo.variable}`}>
      <body className="antialiased text-black">
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
        <SpeedInsights />
        {/* Liquid Glass refraction filter — warps the backdrop behind .glass surfaces
            for the "liquid" lens look (Chromium; Safari/Firefox fall back to blur). */}
        <svg
          aria-hidden
          width="0"
          height="0"
          style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
        >
          <filter
            id="liquidGlass"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.009 0.011"
              numOctaves={2}
              seed={7}
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="1.4" result="softNoise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="softNoise"
              scale={54}
              xChannelSelector="R"
              yChannelSelector="G"
              result="disp"
            />
            <feGaussianBlur in="disp" stdDeviation="1.2" />
          </filter>
        </svg>
      </body>
    </html>
  )
}
