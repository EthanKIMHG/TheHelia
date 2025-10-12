import { RoomSuiteTemplate } from "@/components/RoomSuiteTemplate";
import { RoomSuiteShowcase } from "../RoomSuiteShowcase";

export default function PrestigeSuitePage() {
  return (
    <RoomSuiteTemplate path="/room-suites/prestige">
      <RoomSuiteShowcase suiteId="prestige" />
    </RoomSuiteTemplate>
  );
}
