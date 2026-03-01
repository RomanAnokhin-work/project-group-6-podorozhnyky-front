import { ApiStory } from "@/types/story";
import TravellersStoriesItem from "../TravellersStoriesItem/TravellersStoriesItem";
import Button from "../Button/Button";
import css from "./TravellersStories.module.css";
import { getMe } from "@/lib/api/clientApi";

interface Props {
  stories: ApiStory[];
  page?: number;
  totalPages?: number;
  onLoadMore?: () => void;
  isFetching?: boolean;
}

const TravellersStories = async ({
  stories,
  page = 1,
  totalPages = 1,
  onLoadMore,
  isFetching = false,
}: Props) => {
  if (stories.length === 0) {
    return <p>Немає історій</p>;
  }

  const currentUser = await getMe();

  return (
    <div className={css.travellersStoriesWrapper}>
      <ul className={css.travellersStoriesList}>
        {stories.map((story) => (
          <li key={story._id} className={css.travellersStoriesItem}>
            <TravellersStoriesItem
              story={story}
              isSaved={currentUser?.savedArticles?.includes(story._id)}
            />
          </li>
        ))}
      </ul>
      {page < totalPages && (
        <Button onClick={onLoadMore} isFetching={isFetching} />
      )}
    </div>
  );
};

export default TravellersStories;
