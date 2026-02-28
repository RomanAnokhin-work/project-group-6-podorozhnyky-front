import StoryDetails from '@/components/StoryDetails/StoryDetails';

export default function StoryPage({ params }: { params: { id: string } }) {
  return <StoryDetails storyId={params.id} />;
}