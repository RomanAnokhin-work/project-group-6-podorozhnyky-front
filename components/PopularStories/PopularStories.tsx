import css from "./PopularStories.module.css";
import { fetchStories } from "@/lib/api/api";
import StoryCardStub from "./StoryCardStub";

const ITEMS_IN_LAYOUT = 4;

export default async function PopularStories() {
  const data = await fetchStories(1, 10);

 const stories = (data.stories ?? [])
  .slice()
  .sort((a, b) => (b.favoriteCount ?? 0) - (a.favoriteCount ?? 0))
    .slice(0, ITEMS_IN_LAYOUT);
  
  return (
    <section className={css.section}>
      <h2 className={css.h2}>Популярні історії</h2>

      <div className={css.list}>
        {stories.map((story) => (
          <div key={story._id} className={css.item}>
            <StoryCardStub story={story} />
          </div>
        ))}
      </div>
      <div className={css.footer}>
  <button type="button" className={css.moreBtn}>
    Переглянути всі
  </button>
</div>
    </section>
  );
}