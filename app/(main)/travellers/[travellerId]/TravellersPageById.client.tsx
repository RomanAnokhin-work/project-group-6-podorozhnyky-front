"use client";

import { useState, useSyncExternalStore } from "react";
import css from "./TravellersPageById.module.css";
import { User } from "@/types/user";
import { ApiStory } from "@/types/story";
import TravellerInfo from "@/components/TravellerInfo/TravellerInfo";
import TravellersStories from "@/components/TravellersStories/TravellersStories";
import MessageNoStories from "@/components/MessageNoStories/MessageNoStories";
import Container from "@/components/Container/Container";

type Props = {
  user: User;
  articles: ApiStory[];
};

const subscribeToResize = (callback: () => void) => {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};

const getPerPage = () => (window.innerWidth >= 1440 ? 6 : 4);
const getServerPerPage = () => 4;

export default function TravellerPageByIdClient({ user, articles }: Props) {
  const perPage = useSyncExternalStore(
    subscribeToResize,
    getPerPage,
    getServerPerPage,
  );
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

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
    <Container className="container">
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
    </Container>
  );
}
