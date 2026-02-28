import css from "./TravellersList.module.css";
import TravellerInfo from "../TravellerInfo/TravellerInfo";
import { User } from "@/types/user";
import Button from "../Button/Button";

type Props = {
  users: User[];
  page?: number;
  totalPages?: number;
  onLoadMore?: () => void;
  isFetching?: boolean;
};

const TravellersList = ({ 
  users, 
  page = 1, 
  totalPages = 1, 
  onLoadMore, 
  isFetching 
}: Props) => {
  return (
    <div className={css.travellersListWrapper}>
      {users.length === 0 ? (
        <p>Немає користувачів для відображення</p>
      ) : (
        <ul className={css.travellersList}>
          {users.map((user) => (
            <li key={user._id} className={css.travellersItem}>
              <TravellerInfo user={user} />
            </li>
          ))}
        </ul>
      )}

      {page < totalPages && (
        <Button onClick={onLoadMore} isFetching={isFetching} />
      )}
    </div>
  );
};

export default TravellersList;