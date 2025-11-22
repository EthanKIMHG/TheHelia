import { notFound } from "next/navigation";

import { ReservationPageContent } from "@/app/reservation/ReservationPageContent";
import { PricePageContent } from "@/app/reservation/price/PricePageContent";
import { RoomSuiteShowcase } from "@/app/room-suites/RoomSuiteShowcase";
import { AboutPageShowcase } from "@/app/the-helia/about/AboutPageShowcase";
import { LocationPageShowcase } from "@/app/the-helia/location/LocationPageShowcase";
import { RoomSuiteTemplate } from "@/components/RoomSuiteTemplate";
import { SubPageTemplate } from "@/components/SubPageTemplate";
import { getSubPageContent } from "@/components/header/nav-data";
import type { Locale } from "@/components/header/types";
import type { ComponentType } from "react";

type LocaleSlugPageProps = {
  params: Promise<{
    locale: string;
    slug: string[];
  }>;
};

const PrestigeSuiteContent: ComponentType<{ locale: Locale }> = ({ locale }) => (
  <RoomSuiteShowcase suiteId="prestige" locale={locale} />
);

const VvipSuiteContent: ComponentType<{ locale: Locale }> = ({ locale }) => (
  <RoomSuiteShowcase suiteId="vvip" locale={locale} />
);

const VipSuiteContent: ComponentType<{ locale: Locale }> = ({ locale }) => (
  <RoomSuiteShowcase suiteId="vip" locale={locale} />
);

const CUSTOM_CONTENT: Record<string, ComponentType<{ locale: Locale }>> = {
  "/the-helia/location": LocationPageShowcase,
  "/the-helia/about": AboutPageShowcase,
  "/room-suites/prestige": PrestigeSuiteContent,
  "/room-suites/vvip": VvipSuiteContent,
  "/room-suites/vip": VipSuiteContent,
  "/reservation": ({ locale }) => <ReservationPageContent locale={locale} />,
  "/reservation/price": PricePageContent,
};


export default async function LocaleSlugPage({ params }: LocaleSlugPageProps) {

  const { locale, slug } = await params;
  const normalizedLocale: Locale = locale === "en" ? "en" : "ko";
  
  const segments = Array.isArray(slug) ? slug : [];
  const path = `/${segments.join("/")}`;

  if (!getSubPageContent(path, normalizedLocale)) {
    notFound();
  }

  const Content = CUSTOM_CONTENT[path];

  const isRoomSuite = path.startsWith("/room-suites/");

  if (isRoomSuite) {
    return (
      <RoomSuiteTemplate
        path={path}
        localeOverride={normalizedLocale}
        hrefPrefix={`/${normalizedLocale}`}
      >
        {Content ? <Content locale={normalizedLocale} /> : null}
      </RoomSuiteTemplate>
    );
  }

  return (
    <SubPageTemplate path={path} localeOverride={normalizedLocale}>
      {Content ? <Content locale={normalizedLocale} /> : null}
    </SubPageTemplate>
  );
}
