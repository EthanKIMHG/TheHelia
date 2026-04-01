import { SmoothScroll } from "@/components/common/SmoothScroll";
import { Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const maruBuri = localFont({
  src: [
    {
      path: "../../public/font/MaruBuri-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/MaruBuri-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-maru-buri",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`antialiased text-black ${playfair.variable} ${maruBuri.variable}`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
