"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { User } from "@/types/user";

const LOAD_MORE_SIZE = 4;

export function usePagination() {
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

  const query = useQuery({
    queryKey: ["travellers", backendPage, perPage, isDesktop],
    queryFn: () => import("@/lib/api/clientApi").then(m => m.getUsers({ page: backendPage, perPage })),
    enabled: isDesktop !== null,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!query.data) return;
    if (query.data.page !== backendPage) return;
    if (lastAppendedBackendPageRef.current === backendPage) return;

    lastAppendedBackendPageRef.current = backendPage;

    if (page === 1) {
      setUsers(query.data.users);
    } else {
      setUsers((prev) => [...prev, ...query.data.users]);
    }
  }, [query.data, page, backendPage]);

  const handleLoadMore = () => {
    if (!query.data || query.isFetching) return;
    if (query.data.page >= query.data.totalPages) return;
    setPage((p) => p + 1);
  };

  return {
    users,
    page,
    totalPages: query.data?.totalPages,
    isFetching: query.isFetching,
    handleLoadMore,
  };
}