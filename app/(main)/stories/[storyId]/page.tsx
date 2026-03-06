import StoryDetails from "@/components/StoryDetails/StoryDetails";
import { fetchStoryById } from "@/lib/api/clientApi";
import { emit } from "node:process";



export default function StoryPage({
  params,
}: {
  params: { storyId: string };
}) {
  const { storyId } = params;

  return (
    <main className="storyPageWrapper">
      <StoryDetails storyId={storyId} />
    </main>
  );
}
