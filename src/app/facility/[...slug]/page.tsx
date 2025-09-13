import { notFound } from "next/navigation";

type Props = {
  params: { slug: string[] }; // 예: /facility/babyspa → ["babyspa"]
};

export default function FacilityCatchAll({ params }: Props) {
  const [first, second, ...rest] = params.slug ?? [];

  // 간단한 라우팅 스위치
  if (first === "babyspa") return <div>Baby Spa</div>;
  if (first === "infantroom") return <div>Infant Room</div>;
  if (first === "room") return <div>Room</div>;

  // 매칭 안 되면 404
  notFound();
}
