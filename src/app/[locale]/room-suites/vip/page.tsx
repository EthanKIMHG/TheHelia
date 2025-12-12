import { RoomSuiteShowcase } from "@/app/room-suites/RoomSuiteShowcase";
import { RoomSuiteTemplate } from "@/components/RoomSuiteTemplate";
import { Locale } from "@/components/header/types";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function VipSuitePage({ params }: PageProps) {
  const { locale } = await params;
  const normalizedLocale: Locale = locale === "en" ? "en" : "ko";

  return (
    <RoomSuiteTemplate
        path="/room-suites/vip"
        localeOverride={normalizedLocale}
        hrefPrefix={`/${normalizedLocale}`}
    >
      <RoomSuiteShowcase suiteId="vip" locale={normalizedLocale} />
    </RoomSuiteTemplate>
  );
}
