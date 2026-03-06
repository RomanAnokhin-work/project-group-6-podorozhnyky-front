import { getTravellerById } from "@/lib/api/serverApi";
import TravellerPageByIdClient from "./TravellersPageById.client";

export async function generateMetadata({
  params,
}: {
  params: { travellerId: string };
}) {
  const { user } = await getTravellerById(params.travellerId);

  return {
    icons: {
      icon: "/favicon-1.svg",
    },
    title: user.name,
    description: user.description,
    openGraph: {
      title: user.name,
      description: user.description,
      images: [user.avatarUrl],
    },
  };
}


type Props = {
  params: { travellerId: string };
};

export default async function TravellersPageById({ params }: Props) {
  const { travellerId } = params;

  const { user, articles } = await getTravellerById(travellerId);

  return <TravellerPageByIdClient user={user} articles={articles} />;
}
