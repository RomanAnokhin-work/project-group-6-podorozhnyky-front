"use client";
import Container from "../Container/Container";
import css from "./PopularStories.module.css";
import PopularStoriesClient from "./PopularStoriesClient";
import { fetchPopularStoriesPage } from "@/lib/api/clientApi";
import type { ApiStory } from "@/types/story";
import { useEffect, useState } from "react";

type PopularResponse = {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  stories: ApiStory[];
};

const ITEMS_FOR_LAYOUT = 4;

export default  function PopularStories() {
const [stories, setStories] = useState<ApiStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadStories() {
      try {
        const data = await fetchPopularStoriesPage(1, ITEMS_FOR_LAYOUT);
        if (mounted) {
          setStories(data.stories);
        }
      } catch (error) {
        setError("Не вдалося завантажити історії");
      } finally {
        setLoading(false);
      }
    }

    loadStories();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <p>Завантаження…</p>;
  if (error) return <p>{error}</p>;

  

  return (
    <Container className={css.container}>
      <section className={css.section}>
        <h2 className={css.h2}>Популярні історії</h2>
        <PopularStoriesClient stories={stories ?? []} />
      </section>
    </Container>
  );
}