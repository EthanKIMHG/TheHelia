import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import { ThemeLocaleProvider } from "@/context/theme-locale-context";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
      </head>
      <body className="antialiased text-black">
        <ThemeLocaleProvider>
          <Header />
          <main className="min-h-[calc(100dvh-4rem)] w-full">
            <PageTransition>{children}</PageTransition>
          </main>
          <footer className="border-t border-[color:rgb(0,0,0,0.06)] py-8">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 text-sm text-secondary">
              © {new Date().getFullYear()} 더헬리아 산후조리원
            </div>
          </footer>
        </ThemeLocaleProvider>
      </body>
    </html>
  );
}
