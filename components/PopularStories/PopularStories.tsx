"use client";

import { useEffect, useState } from "react";
import Container from "../Container/Container";
import css from "./PopularStories.module.css";
import PopularStoriesClient from "./PopularStoriesClient";
import { fetchPopularStoriesPage } from "@/lib/api/clientApi";
import type { ApiStory } from "@/types/story";

const ITEMS_FOR_LAYOUT = 4;

export default function PopularStories() {
  const [stories, setStories] = useState<ApiStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStories() {
      try {
        const data = await fetchPopularStoriesPage(1, ITEMS_FOR_LAYOUT);
        setStories(data?.stories ?? []);
      } catch {
        setError("Не вдалося завантажити історії");
      } finally {
        setLoading(false);
      }
    }

    loadStories();
  }, []);

  return (
    <Container className={css.container}>
      <section className={css.section}>
        <h2 className={css.h2}>Популярні історії</h2>

        {loading && <p>Завантаження…</p>}
        {error && <p>{error}</p>}
        {!loading && !error && <PopularStoriesClient stories={stories} />}
      </section>
    </Container>
  );
}