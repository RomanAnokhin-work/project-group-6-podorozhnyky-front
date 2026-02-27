import Container from "../Container/Container";
import css from "./PopularStories.module.css";
import PopularStoriesClient from "./PopularStoriesClient";
import { fetchPopularStoriesPage } from "@/lib/api/api";

const FETCH_PER_PAGE = 10;

export default async function PopularStories() {
  const initial = await fetchPopularStoriesPage(1, FETCH_PER_PAGE);

  return (
    <Container className={css.container}>
      <section className={css.section}>
        <h2 className={css.h2}>Популярні історії</h2>
        <PopularStoriesClient initial={initial} fetchPerPage={FETCH_PER_PAGE} />
      </section>
    </Container>
  );
}