import { SmoothScroll } from "@/components/common/SmoothScroll";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Nanum_Myeongjo, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const nanumMyeongjo = Nanum_Myeongjo({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-nanum-myeongjo",
  display: "swap",
});

export const metadata: Metadata = {
  manifest: "/favicon1.ico/manifest.json",
  icons: {
    icon: [
      { url: "/favicon1.ico/favicon.ico" },
      { url: "/favicon1.ico/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon1.ico/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon1.ico/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon1.ico/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: ["/favicon1.ico/favicon.ico"],
    apple: [
      { url: "/favicon1.ico/apple-icon.png" },
      { url: "/favicon1.ico/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "msapplication-config": "/favicon1.ico/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="ko" className={`${playfair.variable} ${nanumMyeongjo.variable}`}>
      <body className="antialiased text-black">
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
