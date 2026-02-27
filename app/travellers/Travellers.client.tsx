"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getUsers } from "@/lib/api/clientApi";
import TravellersList from "@/components/TravellersList/TravellersList";
import css from "./Travellers.module.css";
import { useEffect, useRef, useState } from "react";
import { User } from "@/types/user";

const LOAD_MORE_SIZE = 4;

export default function TravellersClient() {
  const [page, setPage] = useState(1); 
  const [users, setUsers] = useState<User[]>([]);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  const lastAppendedBackendPageRef = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1440px)");
    const handleChange = () => setIsDesktop(media.matches);

    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  // Якщо режим (desktop/mobile) змінився — ресетим пагінацію
  useEffect(() => {
    if (isDesktop === null) return;
    setPage(1);
    setUsers([]);
    lastAppendedBackendPageRef.current = null;
  }, [isDesktop]);

  const initialSize = isDesktop ? 12 : 8;
  const perPage = page === 1 ? initialSize : LOAD_MORE_SIZE;

  const initialPagesCovered = initialSize / LOAD_MORE_SIZE;

  const backendPage = page === 1 ? 1 : initialPagesCovered + (page - 1);

  const { data, isFetching } = useQuery({
    queryKey: ["travellers", backendPage, perPage, isDesktop],
    queryFn: () => getUsers({ page: backendPage, perPage }),
    enabled: isDesktop !== null, 
    placeholderData: keepPreviousData, 
  });

  useEffect(() => {
    if (!data) return;

    if (data.page !== backendPage) return;

    if (lastAppendedBackendPageRef.current === backendPage) return;
    lastAppendedBackendPageRef.current = backendPage;

    if (page === 1) {
      setUsers(data.users);
    } else {
      setUsers((prev) => [...prev, ...data.users]);
    }
  }, [data, page, backendPage]);

  const handleLoadMore = () => {
    if (!data || isFetching) return;
    if (data.page >= data.totalPages) return;
    setPage((p) => p + 1);
  };

  return (
    <div>
      <h1 className={css.title}>Мандрівники</h1>

      <TravellersList
        users={users}
        onLoadMore={handleLoadMore}
        page={page} 
        totalPages={data?.totalPages}
      />
    </div>
  );
}
