import { LocationPageShowcase } from "@/app/the-helia/location/LocationPageShowcase";
import { SubPageTemplate } from "@/components/SubPageTemplate";
import { Locale } from "@/components/header/types";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocationPage({ params }: PageProps) {
  const { locale } = await params;
  const normalizedLocale: Locale = locale === "en" ? "en" : "ko";

  return (
    <SubPageTemplate path="/the-helia/location" localeOverride={normalizedLocale}>
      <LocationPageShowcase locale={normalizedLocale} />
    </SubPageTemplate>
  );
}
