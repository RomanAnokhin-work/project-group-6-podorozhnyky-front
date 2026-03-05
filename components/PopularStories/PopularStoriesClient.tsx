"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TravellersStoriesItem from "@/components/TravellersStoriesItem/TravellersStoriesItem";
import css from "./PopularStories.module.css";
import type { ApiStory } from "@/types/story";

type Props = {
  stories: ApiStory[];
  mobileLimit?: number;
  tabletLimit?: number;
  desktopLimit?: number;
  showMoreButton?: boolean;
};

export default function PopularStoriesClient({
  stories,
  mobileLimit = 3,
  tabletLimit = 4,
  desktopLimit = 3,
  showMoreButton = true,
}: Props) {
  const [limit, setLimit] = useState(mobileLimit);

  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;

      if (width >= 1440) {
        setLimit(desktopLimit);
      } else if (width >= 768) {
        setLimit(tabletLimit);
      } else {
        setLimit(mobileLimit);
      }
    };

    updateLimit(); // при загрузке
    window.addEventListener("resize", updateLimit);

    return () => window.removeEventListener("resize", updateLimit);
  }, [mobileLimit, tabletLimit, desktopLimit]);

  return (
    <>
      <ul className={css.list}>
        {stories.slice(0, limit).map((story) => (
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