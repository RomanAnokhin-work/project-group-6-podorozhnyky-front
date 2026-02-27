import Container from "../Container/Container";
import css from "./PopularStories.module.css";
import PopularStoriesClient from "./PopularStoriesClient";
import { fetchPopularStoriesPage } from "@/lib/api/api";
import type { ApiStory } from "@/types/story";

type PopularResponse = {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  stories: ApiStory[];
};

const ITEMS_FOR_LAYOUT = 4;

export default async function PopularStories() {
  const data = (await fetchPopularStoriesPage(1, ITEMS_FOR_LAYOUT)) as PopularResponse;

  return (
    <Container className={css.container}>
      <section className={css.section}>
        <h2 className={css.h2}>Популярні історії</h2>
        <PopularStoriesClient stories={data.stories ?? []} />
      </section>
    </Container>
  );
}