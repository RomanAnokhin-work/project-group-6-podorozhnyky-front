"use client";

import TravellersStories from "@/components/Profile/TravellersStories/TravellersStories";
import { fetchStoryById } from "@/lib/api/clientApi";
import { getSavedStories } from "@/lib/api/serverApi";
import { useAuthStore } from "@/lib/store/authStore";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import  { ApiStory } from "@/types/story";

export default function SavedStoriesPage() {
  // Отримуємо дані з сервера (ми вже налаштували цей запит раніше)
  // const stories = await getSavedStories();
  
  const { isAuthenticated, user } = useAuthStore();
  const [savedStories, setSavedStories] = useState<ApiStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(user);
  
  if (!isAuthenticated || !user) redirect("/auth/login");
  
  const { savedArticles } = user;
  console.log(savedArticles);

  useEffect(() => {
    const fetchSavedStories = async () => {
      if (!savedArticles || savedArticles.length === 0) {
        setSavedStories([]);
        setIsLoading(false);
        return;
      }

      try {
        // Використовуємо Promise.all для отримання всіх історій одночасно
        const storiesPromises = savedArticles.map(id => fetchStoryById(id));
        const stories = await Promise.all(storiesPromises);
        console.log(stories);
        setSavedStories(stories);
      } catch (error) {
        console.error("Помилка завантаження збережених історій:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedStories();
  }, [savedArticles]);

  console.log(savedStories);

  if (isLoading) {
    return <div>Завантаження...</div>;
  }

  return (
    <section>
      {/* Передаємо масив історій та варіант для логіки кнопок */}
      <TravellersStories stories={savedStories } variant="saved" />
    </section>
  );
}
