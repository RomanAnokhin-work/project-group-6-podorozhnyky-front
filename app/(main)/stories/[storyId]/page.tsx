import StoryDetails from '@/components/StoryDetails/StoryDetails';

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
