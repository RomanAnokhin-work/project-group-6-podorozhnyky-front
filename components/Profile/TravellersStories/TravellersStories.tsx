// Додай це в самий кінець файлу TravellersStories.tsx
import TravellersStoriesItem from '../../TravellersStoriesItem/TravellersStoriesItem';
// import { MessageNoStories } from '@/components/MessageNoStories/MessageNoStories';
import css from './TravellersStories.module.css';

interface Story {
  _id: string;
  title: string;
  img: string;
  article: string;
  date: string;
  favoriteCount: number;
  category?: string;
}

interface Props {
  stories: Story[];
  variant: 'saved' | 'own';
}

const TravellersStories = ({ stories, variant }: Props) => {
  return (
    <div className={css.container}>
      <ul className={css.grid}>
        {stories.map((story) => (
          <TravellersStoriesItem 
            key={story._id} 
            story={story} 
            isOwnStory={variant === 'own'} 
            isSaved={variant === 'saved'} 
            isAuthenticated={true}
          />
        ))}
      </ul>
      
      {stories.length > 0 && (
        <button className={css.loadMore}>Показати ще</button>
      )}
    </div>
  );
};

export default TravellersStories;