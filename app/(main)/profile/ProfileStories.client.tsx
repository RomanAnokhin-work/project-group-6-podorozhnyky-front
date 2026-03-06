"use client";

import { usePagination } from "@/hooks/usePagination";
import { fetchStoryById, getMyStories } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { ApiStory } from "@/types/story";
import TravellersStories from "@/components/Profile/TravellersStories/TravellersStories";
import { useEffect, useState } from "react";

export default function ProfileStoriesClient({ variant }: { variant: "saved" | "own" }) {
  const { user } = useAuthStore();
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1440);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Визначаємо розміри згідно з ТЗ та обмеженнями бекенду
  const initialSize = isDesktop ? 6 : 4;
  const nextStepSize = isDesktop ? 3 : 2;

  const { data, handleLoadMore, totalPages, page, isFetching } = usePagination<ApiStory>({
    queryKey: `${variant}-stories-${user?.savedArticles?.join(",")}-${initialSize}`,
    initialSizeDesktop: 6, // Перша порція для ПК
    initialSizeMobile: 4,  // Перша порція для мобілки/планшета
    loadMoreSize: nextStepSize,
    fetchFn: async ({ page, perPage }) => {
      // Важливо: для першої сторінки використовуємо initialSize, 
      // для наступних — perPage (який буде дорівнювати loadMoreSize)
      const currentLimit = page === 1 ? initialSize : perPage;

      if (variant === "saved") {
        const allIds = user?.savedArticles || [];
        if (allIds.length === 0) return { items: [], totalPages: 0, page: 1 };

        // Розрахунок відступу: перша сторінка завжди з 0
        // Наступні: пропускаємо першу порцію (initialSize) + попередні кроки (loadMoreSize)
        const start = page === 1 ? 0 : initialSize + (page - 2) * nextStepSize;
        const end = start + currentLimit;
        
        const idsToFetch = allIds.slice(start, end);
        const items = await Promise.all(idsToFetch.map(id => fetchStoryById(id)));

        return {
          items,
          // Розрахунок totalPages враховує різний розмір першої та наступних сторінок
          totalPages: allIds.length <= initialSize 
            ? 1 
            : Math.ceil((allIds.length - initialSize) / nextStepSize) + 1,
          page,
        };
      } else {
        // Запит до вашого API
        const res = await getMyStories(page, currentLimit);
        return {
          items: res.stories,
          totalPages: res.totalPages,
          page: res.page,
        };
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