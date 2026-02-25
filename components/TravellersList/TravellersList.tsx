"use client";

import { User } from "@/types/user";
import TravellerInfo from "../TravellerInfo/TravellerInfo";
import css from "./TravellersList.module.css";

type Props = {
  users: User[];
  page: number;
  totalPages: number;
  //onLoadMore: () => void;
};

const TravellersList = ({ users, page, totalPages }: Props) => {
  const onLoadMore = () => {};
  return (
    <div className={css.travellersListWrapper}>
      {users.length === 0 ? (
        <p>Немає користувачів для відображення</p>
      ) : (
        <ul className={css.travellersList}>
          {users.map((user) => (
            <li key={user._id} className={css.travellersItem}>
              <TravellerInfo traveller={user} />
            </li>
          ))}
        </ul>
      )}
      {page < totalPages && (
        <button onClick={onLoadMore} className={css.loadMoreBtn}>
          Показати ще
        </button>
      )}
    </div>
  );
};

export default TravellersList;
