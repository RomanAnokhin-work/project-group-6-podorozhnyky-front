import StoryDetails from '@/components/StoryDetails/StoryDetails';

// export default function StoryPage({ params }: { params: { storyId: string } }) {
//   return <StoryDetails storyId={params.storyId} />;
// }

interface PageProps {
  params: Promise<{ storyId: string }>; 
}

export default async function Page({ params }: PageProps) {
  const { storyId } = await params;

  return (
    <main>
      <StoryDetails storyId={storyId} />
    </main>
  );
}