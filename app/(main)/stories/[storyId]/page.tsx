import StoryDetails from "@/components/StoryDetails/StoryDetails";
import { fetchStoryById } from "@/lib/api/clientApi";
import { emit } from "node:process";

export async function generateMetadata({
  params,
}: {
  params: { storyId: string };
}) {
  const story = await fetchStoryById(params.storyId);

  return {
    icons: {
      icon: "/favicon-1.svg",
    },
    title: story.title,
    description: story.article,
    openGraph: {
      title: story.title,
      description: story.article,
      images: [story.img],
    },
  };
}

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
