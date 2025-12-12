import { PricePageContent } from "@/app/reservation/price/PricePageContent";
import { SubPageTemplate } from "@/components/SubPageTemplate";
import { Locale } from "@/components/header/types";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function PricePage({ params }: PageProps) {
  const { locale } = await params;
  const normalizedLocale: Locale = locale === "en" ? "en" : "ko";

  return (
    <SubPageTemplate path="/reservation/price" localeOverride={normalizedLocale}>
      <PricePageContent locale={normalizedLocale} />
    </SubPageTemplate>
  );
}
