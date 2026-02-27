"use client";

import { useEffect, useMemo, useState } from "react";
import TravellersStoriesItem from "@/components/TravellersStoriesItem/TravellersStoriesItem";
import css from "./PopularStories.module.css";
import type { ApiStory } from "@/types/story";

type PopularResponse = {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  stories: ApiStory[];
};

function getStep() {
  if (typeof window === "undefined") return 3;

  const isTablet = window.matchMedia(
    "(min-width: 768px) and (max-width: 1023px)"
  ).matches;

  return isTablet ? 4 : 3;
}

export default function PopularStoriesClient({
  initial,
  fetchPerPage,
}: {
  initial: PopularResponse;
  fetchPerPage: number;
}) {
  const [all, setAll] = useState<ApiStory[]>(initial.stories ?? []);
  const [page, setPage] = useState<number>(initial.page ?? 1);
  const [totalPages, setTotalPages] = useState<number>(initial.totalPages ?? 1);
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(3);
  const [visibleCount, setVisibleCount] = useState(3);

  // считаем шаг по брейкпоинту
 useEffect(() => {
  const update = () => {
    const newStep = getStep();

    setStep((oldStep) => {
      // пересчитываем visibleCount под новый шаг
      setVisibleCount((v) => {
        // если шаг не изменился — ничего не делаем
        if (newStep === oldStep) return v;

        // если шаг увеличился (3 -> 4): минимум = 4
        if (newStep > oldStep) return Math.max(v, newStep);

        // если шаг уменьшился (4 -> 3): подрезаем до кратного 3
        const floored = v - (v % newStep);
        return Math.max(newStep, floored);
      });

      return newStep;
    });
  };

  update();
  window.addEventListener("resize", update);
  return () => window.removeEventListener("resize", update);
}, []);

  const hasMoreFromServer = useMemo(() => page < totalPages, [page, totalPages]);
  const canShowMoreFromCache = useMemo(() => visibleCount < all.length, [visibleCount, all.length]);

  const loadMore = async () => {
    if (loading) return;

    // 1) сначала пробуем просто показать то, что уже скачали
    if (canShowMoreFromCache) {
      setVisibleCount((v) => v + step);
      return;
    }

    // 2) если в кеше уже нет — качаем следующую страницу
    if (!hasMoreFromServer) return;

    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(`/api/stories/popular?page=${nextPage}&perPage=${fetchPerPage}`);
      if (!res.ok) throw new Error("Failed to load more popular stories");

      const data = (await res.json()) as PopularResponse;

      setAll((prev) => [...prev, ...(data.stories ?? [])]);
      setPage(nextPage);
      setTotalPages(data.totalPages ?? totalPages);

      // и сразу увеличиваем видимое
      setVisibleCount((v) => v + step);
    } finally {
      setLoading(false);
    }
  };

  const visible = all.slice(0, visibleCount);

  return (
    <>
      <div className={css.list}>
        {visible.map((story) => (
          <div key={story._id} className={css.item}>
            <TravellersStoriesItem story={story} />
          </div>
        ))}
      </div>

      <div className={css.footer}>
        <button
          type="button"
          className={css.moreBtn}
          onClick={loadMore}
          disabled={loading || (!canShowMoreFromCache && !hasMoreFromServer)}
        >
          {loading
            ? "Завантаження..."
            : !canShowMoreFromCache && !hasMoreFromServer
            ? "Більше немає"
            : "Показати ще"}
        </button>
      </div>
    </>
  );
}