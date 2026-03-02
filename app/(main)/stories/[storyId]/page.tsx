import StoryDetails from '@/components/StoryDetails/StoryDetails';
import PopularStoriesClient from '@/components/PopularStories/PopularStoriesClient';
import { fetchPopularStoriesPage } from '@/lib/api/clientApi';

export default async function StoryPage({
  params,
}: {
  params: Promise<{ storyId: string }>;
}) {
  const { storyId } = await params;

  const { stories } = await fetchPopularStoriesPage();

  return (
    <>
      <StoryDetails storyId={storyId} />
      <PopularStoriesClient stories={stories} />
    </>
  );
}
