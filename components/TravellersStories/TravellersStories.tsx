"use client";

import { ApiStory } from "@/types/story";
import TravellersStoriesItem from "../TravellersStoriesItem/TravellersStoriesItem";
import Button from "../Button/Button";
import css from "./TravellersStories.module.css";
import { useAuthStore } from "@/lib/store/authStore";

interface Props {
  stories: ApiStory[];
  isFetching?: boolean;
  page?: number;
  totalPages?: number;
  onLoadMore: () => void;
}

const TravellersStories = ({
  stories,
  page = 1,
  totalPages = 1,
  onLoadMore,
  isFetching = false,
}: Props) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!stories) {
    return <p>Немає історій</p>;
  }

  return (
    <div className={css.travellersStoriesWrapper}>
      <ul className={css.travellersStoriesList}>
      {stories?.map((story) => (
          <li key={story._id} className={css.travellersStoriesItem}>
            <TravellersStoriesItem
              story={story}
              isAuthenticated={isAuthenticated}
              isSaved={user?.savedArticles?.includes(story._id) ?? false}
            />
          </li>
        ))}
      </ul>
      {page < totalPages && (
        <Button buttonType="button" onClick={onLoadMore} isFetching={isFetching} />
      )}
    </div>
  );
};

export default TravellersStories;
