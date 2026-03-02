import TravellersStoriesItem from '../../TravellersStoriesItem/TravellersStoriesItem';
import  MessageNoStories  from '@/components/MessageNoStories/MessageNoStories';
import css from './TravellersStories.module.css';
import Button from '@/components/Button/Button';

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

if (!stories || stories.length === 0) {
    const isOwn = variant === 'own';

    return (
      <MessageNoStories 
        text={isOwn 
          ? "У вас ще немає створених історій. Поділіться своїми пригодами з іншими!" 
          : "Ваш список збережених історій поки що порожній."
        }
        buttonText={isOwn ? "Опублікувати історію" : "Перейти до історій"}
        buttonRoute={isOwn ? "/stories/create" : "/stories"}
      />
    );
  }

  
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
      
      {stories.length >= 6 && ( 
        <Button />
      )}
    </div>
  );
};

export default TravellersStories;