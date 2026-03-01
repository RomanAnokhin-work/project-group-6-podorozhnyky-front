import StoryDetails from '@/components/StoryDetails/StoryDetails';

export default async function StoryPage({ params }: { params: { storyId: string } }) {
  const { storyId } = await params;
  console.log(storyId);
  
  return <StoryDetails storyId={storyId} />;
}