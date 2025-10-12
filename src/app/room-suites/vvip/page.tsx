import { RoomSuiteTemplate } from "@/components/RoomSuiteTemplate";
import { RoomSuiteShowcase } from "../RoomSuiteShowcase";

export default function VvipSuitePage() {
  return (
    <RoomSuiteTemplate path="/room-suites/vvip">
      <RoomSuiteShowcase suiteId="vvip" />
    </RoomSuiteTemplate>
  );
}
