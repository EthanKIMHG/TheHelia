import { ReservationPageContent } from "@/app/reservation/ReservationPageContent";
import { SubPageTemplate } from "@/components/SubPageTemplate";
import { Locale } from "@/components/header/types";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function ReservationPage({ params }: PageProps) {
  const { locale } = await params;
  const normalizedLocale: Locale = locale === "en" ? "en" : "ko";

  return (
    <SubPageTemplate path="/reservation" localeOverride={normalizedLocale}>
      <ReservationPageContent locale={normalizedLocale} />
    </SubPageTemplate>
  );
}
