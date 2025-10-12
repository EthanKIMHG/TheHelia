import { RoomSuiteTemplate } from "@/components/RoomSuiteTemplate";
import { RoomSuiteShowcase } from "../RoomSuiteShowcase";

export default function VipSuitePage() {
  return (
    <RoomSuiteTemplate path="/room-suites/vip">
      <RoomSuiteShowcase suiteId="vip" />
    </RoomSuiteTemplate>
  );
}
