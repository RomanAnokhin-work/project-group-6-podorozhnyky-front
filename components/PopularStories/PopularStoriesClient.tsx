"use client";

import Link from "next/link";
import TravellersStoriesItem from "@/components/TravellersStoriesItem/TravellersStoriesItem";
import css from "./PopularStories.module.css";
import type { ApiStory } from "@/types/story";

export default function PopularStoriesClient({
  stories,
  mobileLimit = 3,
  showMoreButton = true,
}: {
  stories: ApiStory[];
  mobileLimit?: number;
  showMoreButton?: boolean;
}) {
  return (
    <>
      <ul className={css.list}>
        {stories.slice(0, mobileLimit).map((story) => (
          <li key={story._id} className={css.item}>
            <TravellersStoriesItem story={story} />
          </li>
        ))}
      </ul>

      {showMoreButton && (
        <div className={css.footer}>
          <Link href="/stories" className={css.moreBtn}>
            Переглянути всі
          </Link>
        </div>
      )}
    </>
  );
}
