import css from "./TravellersList.module.css";
import { User } from "@/types/user";
import TravellersListItem from "../TravellersListItem/TravellersListItem";

type Props = {
  users: User[];
  page?: number;
  totalPages?: number;
  onLoadMore?: () => void;
};

const TravellersList = ({ users, page, totalPages, onLoadMore }: Props) => {
  return (
    <div className={css.travellersListWrapper}>
      {users.length === 0 ? (
        <p>Немає користувачів для відображення</p>
      ) : (
        <ul className={css.travellersList}>
          {users.map((user) => (
            <li key={user._id} className={css.travellersItem}>
              <TravellersListItem user={user} />
            </li>
          ))}
        </ul>
      )}
      {onLoadMore && page && totalPages && page < totalPages && (
        <button onClick={onLoadMore} className={css.loadMoreBtn}>
          Показати ще
        </button>
      )}
    </div>
  );
};

export default TravellersList;
