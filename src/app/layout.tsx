import { AIAgentFAB } from "@/components/common/AIAgentFAB";
import { SmoothScroll } from "@/components/common/SmoothScroll";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`antialiased text-black ${playfair.variable}`}>
        <SmoothScroll>{children}</SmoothScroll>
        <AIAgentFAB />
      </body>
    </html>
  );
}
