import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import ProfileStoriesClient from "../ProfileStories.client";

export default async function OwnStoriesPage() {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <ProfileStoriesClient variant="own" />
    </HydrationBoundary>
  );
}