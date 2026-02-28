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

const CHUNK_SIZE = 9; 

const TravellersStories: React.FC = () => {
  // Стан для історій та пагінації
  const [stories, setStories] = useState<StoryType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const fetchStories = async (pageNumber: number, category: string) => {
    setIsLoading(true);
    try {
      let url = `${baseUrl}/stories?page=${pageNumber}&perPage=${CHUNK_SIZE}`;
      if (category !== "Всі історії") {
        url += `&category=${category}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Помилка при завантаженні даних');
      
      const data = await response.json();
      
      setStories((prevStories) => 
        pageNumber === 1 ? data.stories : [...prevStories, ...data.stories]
      );
      
      setTotalPages(data.totalPages);
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
    fetchStories(page, activeCategory);
  }, [page, activeCategory]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1); 
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    if (activeCategory === categoryName) return; 
    
    setActiveCategory(categoryName); 
    setPage(1); 
    setStories([]); 
  };

  const hasMore = page < totalPages;

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
          {categories.map((category) => (
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
        
       
        {categories.map((category) => (
          <li key={category._id}>
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
       
        {stories.map((story) => (
          <TravellersStoriesItem key={story._id} story={story} />
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