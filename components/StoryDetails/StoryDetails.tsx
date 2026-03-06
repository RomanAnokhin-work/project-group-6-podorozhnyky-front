"use client";

import {
  addArticleToSaved,
  deleteStory,
  fetchStoryById,
  removeArticleFromSaved,
} from "@/lib/api/clientApi";
import { ApiStory } from "@/types/story";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "../../lib/store/authStore";
import Loader from "../Loader/Loader";
import FavoriteActions from "./FavoriteActions/FavoriteActions";
import PopularStories from "../PopularStories/PopularStories";
import Container from "../Container/Container";
import css from "./StoryDetails.module.css";

const StoryDetails = ({ storyId }: { storyId: string }) => {
  const [story, setStory] = useState<ApiStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const { user, isAuthenticated, setUser } = useAuthStore();
  const router = useRouter();

  const isFavorite = user?.savedArticles?.includes(storyId) ?? false;

  useEffect(() => {
    const loadStory = async () => {
      try {
        const data = await fetchStoryById(storyId);

        setStory(data);
      } catch {
        toast.error("Помилка завантаження історії");
      } finally {
        setLoading(false);
      }
    };
    loadStory();
  }, [storyId]);

  const toggleFavorite = async () => {
    if (!isAuthenticated || !user) {
      router.push("/auth/login");
      return;
    }

    setSaving(true);

    try {
      let updatedFavorites: string[] = [];

      if (isFavorite) {
        const res = await removeArticleFromSaved(storyId);
        const rawFavorites = res.savedArticles || user.savedArticles.filter(id => id !== storyId);
        updatedFavorites = rawFavorites.map((item: any) => typeof item === 'object' ? item._id : item);
        toast.success("Історію видалено із збережених");
      } else {
        const res = await addArticleToSaved(storyId);
        const rawFavorites = res.savedArticles || [...user.savedArticles, storyId];
        updatedFavorites = rawFavorites.map((item: any) => typeof item === 'object' ? item._id : item);
        toast.success("Історію збережено!");
      }

      // просто замінюємо популяцію
        setUser({
          ...user,
          savedArticles: updatedFavorites, 
        });
    } catch {
      toast.error("Сталася помилка");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;
  if (!story) return <p>Історію не знайдено</p>;

  const formattedDate = new Date(story.date).toLocaleDateString("uk-UA", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const deleteHandler = async () => {
    try {
      const res = await deleteStory(storyId);

      if (res?.message || res?.success) {
        toast.success("Історію видалено");
        router.push("/stories");
        router.refresh();
        return;
      }

      toast.error("Не вдалося видалити історію");
    } catch {
      toast.error("Помилка під час видалення");
    }
  };
  return (
    <Container className={css.container}>
      <section className={css.storyDetails}>
        <div className={css.info}>
          <div className={css.block_title}>
            <h2 className={css.title}>{story.title}</h2>
          </div>
          <div className={css.infoDetails}>
            <div className={css.info_text}>
              <p className={css.value}>
                <strong className={css.label}>Автор статті </strong>{" "}
                {story.ownerId.name}
              </p>
              <p className={css.value}>
                <strong className={css.label}>Опубліковано </strong>{" "}
                {formattedDate}
              </p>
            </div>
            <div className={css.block_category}>
              <p className={css.infoCategory}>{story.category.name}</p>
            </div>
          </div>
        </div>{" "}
        <Image
          className={css.image}
          src={story.img || "/placeholder-image.png"}
          alt={story.title}
          width={1312}
          height={874}
        />{" "}
        <div className={css.content}>
          <p className={css.article}>{story.article}</p>

          <FavoriteActions
            articleId={storyId}
            isAuthenticated={isAuthenticated}
            isFavorite={isFavorite}
            saving={saving}
            onToggle={toggleFavorite}
            isOwner={user?._id === story.ownerId._id}
            onDelete={deleteHandler}
          />
        </div>
        <PopularStories mobileLimit={2} showMoreButton={false} />
      </section>
    </Container>
  );
};
export default StoryDetails;
