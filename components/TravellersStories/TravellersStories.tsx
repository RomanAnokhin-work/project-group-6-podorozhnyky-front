"use client";

import React, { useState, useEffect } from 'react';
import css from "./TravellersStories.module.css";
import TravellersStoriesItem from '../TravellersStoriesItem/TravellersStoriesItem'; 


interface StoryType {
  _id: string;
  title: string;
  img: string;
  article: string;
  date: string;
  favoriteCount: number;
}

interface CategoryType {
  _id: string;
  name: string;
}

const LOAD_MORE_SIZE = 3;
const MOBILE_DESKTOP_INITIAL_SIZE = 9;
const TABLET_INITIAL_SIZE = 8;
const TABLET_CATEGORY_PRIORITY = ["Європа", "Азія", "Пустелі", "Африка"];

const TravellersStories: React.FC = () => {
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
    <section className={css.sectionStories}>
      <h2 className={css.storisTitle}>Історії Мандрівників</h2>
        
      
      <div className={css.mobileCategorySelect}>
        <p className={css.categoryLabel}>Категорії</p>
        <select 
          className={css.categorySelect}
          value={activeCategory}
          onChange={(e) => handleCategoryClick(e.target.value)}
        >
          <option value="Всі історії">Всі історії</option>
          {orderedCategories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      
      <ul className={css.filtersList}>
        <li>
          <button
            type="button"
            className={`${css.filterButton} ${activeCategory === "Всі історії" ? css.filterButtonActive : ''}`}
            onClick={() => handleCategoryClick("Всі історії")}
          >
            Всі історії
          </button>
        </li>
        
       
        {orderedCategories.map((category, index) => (
          <li key={category._id} className={index >= 4 ? css.hideOnTablet : ""}>
            <button
              type="button"
              className={`${css.filterButton} ${activeCategory === category.name ? css.filterButtonActive : ''}`}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>

      <div className={css.storiesGrid}>
       
        {stories.map((story, index) => (
          <TravellersStoriesItem
            key={story._id}
            story={story}
            isLcpImage={index < 3}
          />
        ))}
      </div>

      {hasMore && (
        <div className={css.buttonLoadMore}>
          <button 
            className={css.morestories} 
            type="button" 
            onClick={handleLoadMore}
            disabled={isLoading} 
          >
            {isLoading ? "Завантаження..." : "Показати ще"}
          </button>
        </div>
      )}
    </section>
  );
};

export default TravellersStories;
