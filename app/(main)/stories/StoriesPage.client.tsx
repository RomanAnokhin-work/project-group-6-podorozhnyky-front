"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/Container/Container";
import TravellersStories from "@/components/TravellersStories/TravellersStories";
import { instance } from "@/lib/api/api";
import type { ApiStory, StoriesResponse } from "@/types/story";
import css from "./StoriesPage.module.css";

const LOAD_STEP = 3;
const MIN_API_SIZE = 5;
const MAX_API_SIZE = 20;

const fetchStoriesForPage = async (
  page = 1,
  perPage = 10,
  category?: string,
) => {
  const { data } = await instance.get<StoriesResponse>("/stories", {
    params: {
      page,
      perPage,
      ...(category ? { category } : {}),
    },
  });

  return data;
};

const STORY_FILTERS = [
  { label: "Всі історії", value: "" },
  { label: "Європа", value: "Європа" },
  { label: "Азія", value: "Азія" },
  { label: "Пустелі", value: "Пустелі" },
  { label: "Африка", value: "Африка" },
  { label: "Балкани", value: "Балкани" },
  { label: "Гори", value: "Гори" },
  { label: "Америка", value: "Америка" },
  { label: "Океанія", value: "Океанія" },
  { label: "Кавказ", value: "Кавказ" },
];

const getInitialCount = () => {
  if (typeof window === "undefined") return 9;

  const width = window.innerWidth;
  if (width >= 768 && width < 1440) return 8;

  return 9;
};

export default function StoriesPageClient() {
  const [stories, setStories] = useState<ApiStory[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [activeCategory, setActiveCategory] = useState("");
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState("");
  const categoryMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadInitialStories = async () => {
      const initialCount = getInitialCount();
      setLoading(true);
      setError("");

      try {
        const data = await fetchStoriesForPage(
          1,
          Math.min(MAX_API_SIZE, Math.max(MIN_API_SIZE, initialCount)),
          activeCategory || undefined,
        );

        setStories(data.stories);
        setTotalItems(data.totalItems);
      } catch {
        setError("Не вдалося завантажити історії");
      } finally {
        setLoading(false);
      }
    };

    loadInitialStories();
  }, [activeCategory]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(event.target as Node)
      ) {
        setIsCategoryMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLoadMore = async () => {
    if (isFetchingMore) return;

    const nextCount = Math.min(
      stories.length + LOAD_STEP,
      totalItems,
      MAX_API_SIZE,
    );
    if (nextCount <= stories.length) return;
    setIsFetchingMore(true);
    setError("");

    try {
      const data = await fetchStoriesForPage(
        1,
        Math.min(MAX_API_SIZE, Math.max(MIN_API_SIZE, nextCount)),
        activeCategory || undefined,
      );

      setStories(data.stories);
      setTotalItems(data.totalItems);
    } catch {
      setError("Не вдалося завантажити історії");
    } finally {
      setIsFetchingMore(false);
    }
  };

  const activeCategoryLabel =
    STORY_FILTERS.find((filter) => filter.value === activeCategory)?.label ??
    STORY_FILTERS[0].label;

  const handleCategorySelect = (value: string) => {
    setActiveCategory(value);
    setIsCategoryMenuOpen(false);
  };

  const hasMoreStories = stories.length < Math.min(totalItems, MAX_API_SIZE);

  return (
    <Container className={css.container}>
      <h1 className={css.title}>Історії Мандрівників</h1>

      <div className={css.mobileFilters}>
        <label id="stories-category-label" className={css.selectLabel}>
          Категорії
        </label>

        <div className={css.selectWrap} ref={categoryMenuRef}>
          <button
            id="stories-category"
            type="button"
            className={
              isCategoryMenuOpen
                ? `${css.select} ${css.selectOpen}`
                : css.select
            }
            aria-haspopup="listbox"
            aria-expanded={isCategoryMenuOpen}
            aria-labelledby="stories-category-label stories-category"
            onClick={() => setIsCategoryMenuOpen((prev) => !prev)}
          >
            <span className={css.selectValue}>{activeCategoryLabel}</span>
          </button>

          <svg
            className={
              isCategoryMenuOpen
                ? `${css.selectIcon} ${css.selectIconOpen}`
                : css.selectIcon
            }
            width="24"
            height="24"
            aria-hidden="true"
          >
            <use href="/icons.svg#icon-keyboard_arrow_down" />
          </svg>

          {isCategoryMenuOpen && (
            <ul
              id="stories-category-menu"
              className={css.selectMenu}
              role="listbox"
              aria-labelledby="stories-category-label"
            >
              {STORY_FILTERS.map((filter) => (
                <li key={filter.label}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={activeCategory === filter.value}
                    className={
                      activeCategory === filter.value
                        ? `${css.selectOption} ${css.selectOptionActive}`
                        : css.selectOption
                    }
                    onClick={() => handleCategorySelect(filter.value)}
                  >
                    {filter.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={css.filters}>
        {STORY_FILTERS.map((filter) => (
          <button
            key={filter.label}
            type="button"
            onClick={() => setActiveCategory(filter.value)}
            className={
              activeCategory === filter.value
                ? `${css.filterButton} ${css.filterButtonActive}`
                : css.filterButton
            }
          >
            {filter.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className={css.status}>Завантаження...</p>
      ) : error ? (
        <p className={css.status}>{error}</p>
      ) : (
        <TravellersStories
          stories={stories}
          onLoadMore={handleLoadMore}
          isFetching={isFetchingMore}
          page={1}
          totalPages={hasMoreStories ? 2 : 1}
        />
      )}
    </Container>
  );
}
