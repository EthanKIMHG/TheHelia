import { AboutPageShowcase } from "@/app/the-helia/about/AboutPageShowcase";
import { SubPageTemplate } from "@/components/SubPageTemplate";
import { Locale } from "@/components/header/types";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const normalizedLocale: Locale = locale === "en" ? "en" : "ko";

  return (
    <SubPageTemplate path="/the-helia/about" localeOverride={normalizedLocale}>
      <AboutPageShowcase locale={normalizedLocale} />
    </SubPageTemplate>
  );
}
