"use client";

import { useEffect, useState } from "react";
import css from "./TravellersPageById.module.css";
import { User } from "@/types/user";
import { ApiStory } from "@/types/story";
import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
import TravellersStories from "@/components/TravellersStories/TravellersStories";
import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";

type Props = {
  user: User;
  articles: ApiStory[];
};

export default function TravellerPageByIdClient({ user, articles }: Props) {
  const getPerPage = () => {
    if (window.innerWidth < 1440) return 4;
    return 6;
  };

  const [perPage, setPerPage] = useState(getPerPage());
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setPerPage(getPerPage());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(articles.length / perPage);

  const visibleStories = articles.slice(0, page * perPage);

  const handleLoadMore = () => {
    setIsFetching(true);

    setTimeout(() => {
      setPage((prev) => prev + 1);
      setIsFetching(false);
    }, 400);
  };

  return (
    <div className="container">
      <TravellerInfo user={user} />

      <h2 className={css.h2}>Історії Мандрівника</h2>

      {articles.length > 0 ? (
        <TravellersStories
          stories={visibleStories}
          page={page}
          totalPages={totalPages}
          onLoadMore={handleLoadMore}
          isFetching={isFetching}
        />
      ) : (
        <MessageNoStories
          text="Цей користувач ще не публікував історій"
          buttonText="Назад до мандрівників"
          buttonRoute="/travellers"
        />
      )}
    </div>
  );
}
