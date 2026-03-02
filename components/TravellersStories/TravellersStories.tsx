"use client";

import { ApiStory } from "@/types/story";
import TravellersStoriesItem from "../TravellersStoriesItem/TravellersStoriesItem";
import Button from "../Button/Button";
import css from "./TravellersStories.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useState, useEffect } from "react";

interface Props {
  stories: ApiStory[];
  page?: number;
  totalPages?: number;
  onLoadMore?: () => void;
  isFetching?: boolean;
}

const TravellersStories = ({
  stories,
  page = 1,
  totalPages = 1,
  onLoadMore,
  isFetching = false,
}: Props) => {
  const { isAuthenticated, user } = useAuthStore();

  interface TravellersStoriesProps {
    stories?: StoryType[];
    isOwnStories?: boolean;
  }

  const LOAD_MORE_SIZE = 3;
  const MOBILE_DESKTOP_INITIAL_SIZE = 9;
  const TABLET_INITIAL_SIZE = 8;
  const TABLET_CATEGORY_PRIORITY = ["Європа", "Азія", "Пустелі", "Африка"];

  const TravellersStories: React.FC<TravellersStoriesProps> = ({ stories: initialStories, isOwnStories = false }: TravellersStoriesProps) => {
    // Стан для історій та пагінації
    const [stories, setStories] = useState<StoryType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isTablet, setIsTablet] = useState<boolean | null>(null);

    // СТАНИ ДЛЯ КАТЕГОРІЙ
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>("Всі історії");

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseUrl}/categories`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Помилка при завантаженні категорій:", error);
      }
    };

    useEffect(() => {
      const media = window.matchMedia("(min-width: 768px) and (max-width: 1439px)");
      const handleChange = () => setIsTablet(media.matches);

      handleChange();
      media.addEventListener("change", handleChange);
      return () => media.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
      if (isTablet === null) return;
      setPage(1);
      setStories([]);
      setTotalItems(0);
    }, [isTablet]);

    const fetchStories = async (perPage: number, category: string) => {
      setIsLoading(true);
      try {
        let url = `${baseUrl}/stories?page=1&perPage=${perPage}`;
        if (category !== "Всі історії") {
          url += `&category=${category}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Помилка при завантаженні даних');
      
        const data = await response.json();
      
        setStories(data.stories);
        setTotalItems(data.totalItems ?? data.stories.length);
      } catch (error) {
        console.error("Сталася помилка:", error);
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      fetchCategories();
    }, []);

    useEffect(() => {
      if (isTablet === null) return;

      const initialSize = isTablet ? TABLET_INITIAL_SIZE : MOBILE_DESKTOP_INITIAL_SIZE;
      const perPage = initialSize + (page - 1) * LOAD_MORE_SIZE;
      fetchStories(perPage, activeCategory);
    }, [page, activeCategory, isTablet]);

    const handleLoadMore = () => {
      setPage((prev) => prev + 1);
    };

    const handleCategoryClick = (categoryName: string) => {
      if (activeCategory === categoryName) return;
    
      setActiveCategory(categoryName);
      setPage(1);
      setStories([]);
      setTotalItems(0);
    };

    const hasMore = stories.length < totalItems;
    const orderedCategories = [...categories].sort((a, b) => {
      const aIndex = TABLET_CATEGORY_PRIORITY.indexOf(a.name);
      const bIndex = TABLET_CATEGORY_PRIORITY.indexOf(b.name);

      if (aIndex === -1 && bIndex === -1) return 0;
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });

    return (
      <div className={css.travellersStoriesWrapper}>
        <ul className={css.travellersStoriesList}>
          {stories.map((story) => (
            <li key={story._id} className={css.travellersStoriesItem}>
              <TravellersStoriesItem
                story={story}
                isAuthenticated={isAuthenticated}
                isSaved={user?.savedArticles?.includes(story._id) ?? false}
              />
            </li>
          ))}
        </ul>
        {page < totalPages && (
          <Button onClick={onLoadMore} isFetching={isFetching} />
        )}
      </div>
    );
  };
}
  export default TravellersStories;
