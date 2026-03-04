"use client";

import Link from "next/link";
import TravellersStoriesItem from "@/components/TravellersStoriesItem/TravellersStoriesItem";
import css from "./PopularStories.module.css";
import type { ApiStory } from "@/types/story";

export default function PopularStoriesClient({
  stories,
}: {
  stories: ApiStory[];
}) {
  return (
    <>
      <ul className={css.list}>
        {stories.map((story, index) => (
          <li key={story._id} className={css.item}>
            <TravellersStoriesItem story={story} isLcpImage={index < 3} />
          </li>
        ))}
      </ul>

      <div className={css.footer}>
        <Link href="/stories" className={css.moreBtn}>
          Переглянути всі
        </Link>
      </div>
    </>
  );
}
