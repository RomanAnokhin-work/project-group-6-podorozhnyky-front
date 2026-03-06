import css from "./TravellersList.module.css";
import { User } from "@/types/user";
import TravellersListItem from "../TravellersListItem/TravellersListItem";
import Button from "../Button/Button";

interface Props {
  users: User[];
  page?: number;
  totalPages?: number;
  onLoadMore?: () => void;
  isFetching?: boolean;
}

const TravellersList = ({
  users,
  page = 1,
  totalPages = 1,
  onLoadMore,
  isFetching,
}: Props) => {
  console.log(page, totalPages, isFetching);  
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
      
      {page < (totalPages-2) && (
        <Button
          buttonType="button"
          onClick={onLoadMore}
          isFetching={isFetching}
        />
      )}
    </div>
  );
};

export default TravellersList;
