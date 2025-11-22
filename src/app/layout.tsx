import { SmoothScroll } from "@/components/common/SmoothScroll";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased text-black">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
