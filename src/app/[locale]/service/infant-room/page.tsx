import { NewbornPageContent } from "@/app/service/infant-room/NewbornPageContent";
import { SubPageTemplate } from "@/components/SubPageTemplate";
import { Locale } from "@/components/header/types";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function InfantRoomPage({ params }: PageProps) {
  const { locale } = await params;
  const normalizedLocale: Locale = locale === "en" ? "en" : "ko";

  return (
    <SubPageTemplate path="/service/infant-room" localeOverride={normalizedLocale} fullWidth>
      <NewbornPageContent locale={normalizedLocale} />
    </SubPageTemplate>
  );
}
