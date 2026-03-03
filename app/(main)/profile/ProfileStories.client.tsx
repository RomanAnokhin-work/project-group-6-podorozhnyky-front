"use client";

import { usePagination } from "@/hooks/usePagination";
import { fetchStoryById, getMyStories } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { ApiStory } from "@/types/story";
import TravellersStories from "@/components/Profile/TravellersStories/TravellersStories";

interface ProfileStoriesClientProps {
  variant: "saved" | "own";
}

export default function ProfileStoriesClient({ variant }: ProfileStoriesClientProps) {
  const { user } = useAuthStore();

  const { data, handleLoadMore, totalPages, page, isFetching } = usePagination<ApiStory>({
    queryKey: variant === "saved" 
      ? `saved-stories-${user?.savedArticles?.join(",")}` 
      : "my-own-stories",
    initialSizeDesktop: 6,
    initialSizeMobile: 6,
    loadMoreSize: 3,
    fetchFn: async ({ page, perPage }) => {
      if (variant === "saved") {
        const allIds = user?.savedArticles || [];
        if (allIds.length === 0) return { items: [], totalPages: 0, page: 1 };
        const start = page === 1 ? 0 : 6 + (page - 2) * 3;
        const end = start + perPage;
        const idsToFetch = allIds.slice(start, end);
        const items = await Promise.all(idsToFetch.map(id => fetchStoryById(id)));
        return {
          items,
          totalPages: allIds.length <= 6 ? 1 : Math.ceil((allIds.length - 6) / 3) + 1,
          page
        };
      } else {
        const res = await getMyStories( page, perPage );
        return { items: res.stories, totalPages: res.totalPages, page: res.page };
      }
    },
  });

  return (
    <TravellersStories 
      stories={data} 
      variant={variant}
      onLoadMore={handleLoadMore}
      page={page}
      totalPages={totalPages ?? 1}
      isFetching={isFetching}
    />
  );
}