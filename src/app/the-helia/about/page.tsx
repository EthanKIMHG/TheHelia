import { SubPageTemplate } from "@/components/SubPageTemplate";
import { AboutPageShowcase } from "./AboutPageShowcase";

export default function AboutHeliaPage() {
  return (
    <SubPageTemplate path="/the-helia/about" localeOverride="ko">
      <AboutPageShowcase locale="ko" />
    </SubPageTemplate>
  );
}
