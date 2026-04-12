import { SmoothScroll } from "@/components/common/SmoothScroll";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${playfair.variable} ${nanumMyeongjo.variable}`}>
      <body className="antialiased text-black">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
