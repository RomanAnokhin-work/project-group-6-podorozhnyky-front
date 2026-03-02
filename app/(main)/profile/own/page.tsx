import TravellersStories from "@/components/Profile/TravellersStories/TravellersStories";
import { getMyStories } from "@/lib/api/serverApi";

export default async function OwnStoriesPage() {
  const stories = await getMyStories();

  return (
    <section>
      <TravellersStories stories={stories} variant="own" />
    </section>
  );
}