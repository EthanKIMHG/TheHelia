import { SubPageTemplate } from "@/components/SubPageTemplate";
import { ReservationPageContent } from "./ReservationPageContent";

export default function ReservationPage() {
  return (
    <SubPageTemplate path="/reservation">
      <ReservationPageContent />
    </SubPageTemplate>
  );
}
