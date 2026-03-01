import { getTravellerById } from "@/lib/api/serverApi";
import TravellerPageByIdClient from "./TravellersPageById.client";

type Props = {
  params: Promise<{ travellerId: string }>;
};

export default async function TravellersPageById({ params }: Props) {
  const { travellerId } = await params;
  const { user, articles } = await getTravellerById(travellerId);

  return <TravellerPageByIdClient user={user} articles={articles} />;
}
