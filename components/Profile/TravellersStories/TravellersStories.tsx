import TravellersStoriesItem from '../../TravellersStoriesItem/TravellersStoriesItem';
import  MessageNoStories  from '@/components/MessageNoStories/MessageNoStories';
import css from './TravellersStories.module.css';
import Button from '@/components/Button/Button';
import { ApiStory } from '@/types/story';

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
  stories: ApiStory[];
  variant: 'saved' | 'own';
  onLoadMore: ()=>void,
  page: number;
  totalPages:number;
  isFetching:boolean

}

const TravellersStories = ({ 
  stories, 
  variant, 
  onLoadMore, 
  page, 
  totalPages = 0, 
  isFetching 
}: Props) => {

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
      
      {/* Кнопка показується тільки якщо є ще сторінки для завантаження */}
      {page < (totalPages===2 ? totalPages : totalPages - 1) && ( 
        <div className={css.buttonWrapper}> {/* Додайте обгортку для центрування, якщо треба */}
         <Button
          buttonType="button" 
            onClick={onLoadMore}
            isFetching={isFetching}
          />

        </div>
      )}
    </div>
  );
};

export default TravellersStories;