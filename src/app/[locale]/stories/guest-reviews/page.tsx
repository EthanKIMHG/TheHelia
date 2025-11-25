import { SubPageTemplate } from "@/components/SubPageTemplate";
import { GuestReviewsPageContent } from "@/components/stories/GuestReviewsPageContent";

export default function GuestReviewsPage() {
  return (
    <SubPageTemplate path="/stories/guest-reviews">
      <GuestReviewsPageContent />
    </SubPageTemplate>
  );
}
