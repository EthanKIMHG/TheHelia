
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-black`}>
        <Header />
        <main className="min-h-[calc(100dvh-4rem)]">
          <PageTransition>{children}</PageTransition>
        </main>
        <footer className="border-t border-[color:rgb(0,0,0,0.06)] py-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 text-sm text-secondary">
            © {new Date().getFullYear()} 더헬리아 산후조리원
          </div>
        </footer>
      </body>
    </html>
  );
}
