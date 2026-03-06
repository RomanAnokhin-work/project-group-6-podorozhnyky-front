import StoryDetails from "@/components/StoryDetails/StoryDetails";
import { fetchStoryById } from "@/lib/api/clientApi";

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

export default async function StoryPage({
  params,
}: {
  params: Promise<{ storyId: string }>;
}) {
  const { storyId } = await params;

  return (
    <main className="storyPageWrapper">
      <StoryDetails storyId={storyId} />
    </main>
  );
}
