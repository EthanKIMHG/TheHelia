import { SubPageTemplate } from "@/components/SubPageTemplate";
import { Locale } from "@/components/header/types";
import { MomsClassPageContent } from "@/components/service/MomsClassPageContent";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function MomsClassPage({ params }: PageProps) {
  const { locale } = await params;
  const normalizedLocale: Locale = locale === "en" ? "en" : "ko";

  return (
    // fullWidth is enabled to allow custom spacing in the content components
    <SubPageTemplate path="/service/moms-class" localeOverride={normalizedLocale} fullWidth>
      <MomsClassPageContent locale={normalizedLocale} />
    </SubPageTemplate>
  );
}
