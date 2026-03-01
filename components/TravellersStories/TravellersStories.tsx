import { ApiStory } from "@/types/story";
import TravellersStoriesItem from "../TravellersStoriesItem/TravellersStoriesItem";

interface Props {
  stories: ApiStory[];
  page?: number;
  totalPages?: number;
  onLoadMore?: () => void;
}

const TravellersStories = ({
  stories,
  page = 1,
  totalPages = 1,
  onLoadMore,
}: Props) => {
  if (stories.length === 0) {
    return <p>Немає історій</p>;
  }

  return (
    <div>
      <ul>
        {stories.map((story) => (
          <li key={story._id}>
            <TravellersStoriesItem story={story} />
          </li>
        ))}
      </ul>
      {page < totalPages && onLoadMore && (
        <button onClick={onLoadMore}>Переглянути всі</button>
      )}
    </div>
  );
};

export default TravellersStories;
