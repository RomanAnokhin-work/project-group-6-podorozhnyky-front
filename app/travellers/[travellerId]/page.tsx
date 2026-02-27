import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";
import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
import { getTravellerById } from "@/lib/api/serverApi";
import css from "./TravellersPageById.module.css";

type Props = {
  params: Promise<{ travellerId: string }>;
};

export default async function TravellersPageById({ params }: Props) {
  const { travellerId } = await params;
  const { user, articles } = await getTravellerById(travellerId);

  return (
    <div className="container">
      <TravellerInfo user={user} />
      <h2 className={css.h2}>Історії Мандрівника</h2>
      {articles.length > 0 ? (
        <TravellerStories
          initialStories={stories}
          pagination={pagination}
          travellerId={travellerId}
        />
      ) : (
        <MessageNoStories
          text="Цей користувач ще не публікував історій"
          buttonText="Назад до мандрівників"
          buttonRoute="/travellers"
        />
      )}
    </div>
  );
}
