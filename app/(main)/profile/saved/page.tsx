import TravellersStories from "@/components/Profile/TravellersStories/TravellersStories";
import { getSavedStories } from "@/lib/api/serverApi";

export default async function SavedStoriesPage() {
  // Отримуємо дані з сервера (ми вже налаштували цей запит раніше)
  const stories = await getSavedStories();

  return (
    <section>
      {/* Передаємо масив історій та варіант для логіки кнопок */}
      <TravellersStories stories={stories} variant="saved" />
    </section>
  );
}