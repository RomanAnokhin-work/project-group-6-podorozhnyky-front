import TravellersStories from "@/components/Profile/TravellersStories/TravellersStories";
import { getMyStoriesServer } from "@/lib/api/serverApi";

export default async function OwnStoriesPage() {
  const {stories} = await getMyStoriesServer();
  
console.log(stories)
  return (
    <section>
      <TravellersStories stories={stories} variant="own" />
    </section>
  );
}