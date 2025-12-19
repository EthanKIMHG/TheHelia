import { LocaleShell } from "@/components/LocaleShell";
import { GlobalPageLoader } from "@/components/common/GlobalPageLoader";
import { PageLoadProvider } from "@/components/common/PageLoadContext";
import type { Locale } from "@/components/header/types";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const SUPPORTED_LOCALES: Locale[] = ["ko", "en"];

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  
  const isKo = locale === "ko";
  const title = isKo 
    ? "더 헬리아 | 프리미엄 산후조리원" 
    : "The Helia | Premium Postpartum Care Center";
  const description = isKo
    ? "더 헬리아는 산모와 아기를 위한 최상의 1:1 케어와 고품격 시설을 제공하는 프리미엄 산후조리원입니다."
    : "The Helia provides premium 1:1 care and high-end facilities for mothers and babies.";

  return {
    title: {
      template: `%s | ${isKo ? "더 헬리아" : "The Helia"}`,
      default: title,
    },
    description,
    keywords: isKo 
      ? ["산후조리원", "프리미엄 산후조리원", "더 헬리아", "산모 케어", "신생아 케어"]
      : ["Postpartum Care Center", "Korea Postpartum Care", "The Helia", "Newborn Care"],
    openGraph: {
      title,
      description,
      url: `https://www.thehelia.com/${locale}`,
      siteName: isKo ? "더 헬리아" : "The Helia",
      locale: locale,
      type: "website",
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'ko': '/ko',
        'en': '/en',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params;
  if (!SUPPORTED_LOCALES.includes(localeParam as Locale)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const themeCookie = (await cookies()).get("theme");
  const theme =
    themeCookie && (themeCookie.value === "dark" || themeCookie.value === "light")
      ? themeCookie.value
      : "light";

  return (
    <PageLoadProvider>
        <LocaleShell locale={locale} theme={theme}>
            {children}
        </LocaleShell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
             __html: JSON.stringify({
               "@context": "https://schema.org",
               "@type": "LodgingBusiness",
               "name": locale === "ko" ? "더 헬리아 산후조리원" : "The Helia Postpartum Care Center",
               "description": locale === "ko" 
                 ? "휴식과 회복, 그리고 가족의 시간을 담아내는 프리미엄 산후조리원" 
                 : "A premium sanctuary curated for recovery, rest, and cherished family moments.",
               "url": `https://www.thehelia.com/${locale}`,
               "telephone": "+82-10-5077-3962",
               "email": "thesaintmom@naver.com",
               "image": "https://www.thehelia.com/img/hero/hero-main.jpg",
               "address": {
                 "@type": "PostalAddress",
                 "streetAddress": locale === "ko" 
                   ? "권선구 금곡로 197번길 18-39, 5,6층" 
                   : "18-39, Geumgok-ro 197beon-gil, Gwonseon-gu",
                 "addressLocality": locale === "ko" ? "수원시" : "Suwon-si",
                 "addressRegion": locale === "ko" ? "경기도" : "Gyeonggi-do",
                 "addressCountry": "KR"
               },
               "priceRange": "KRW 5000000 - KRW 10000000",
               "openingHoursSpecification": {
                 "@type": "OpeningHoursSpecification",
                 "dayOfWeek": [
                   "Monday",
                   "Tuesday",
                   "Wednesday",
                   "Thursday",
                   "Friday",
                   "Saturday",
                   "Sunday"
                 ],
                 "opens": "00:00",
                 "closes": "23:59"
               }
             })
          }}
        />
        <GlobalPageLoader />
    </PageLoadProvider>
  );
}
