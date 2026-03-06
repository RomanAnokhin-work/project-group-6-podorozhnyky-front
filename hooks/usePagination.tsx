"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

interface PaginationConfig<T> {
  queryKey: string;
  fetchFn: (params: { page: number; perPage: number }) => Promise<{
    items: T[];
    totalPages: number;
    page: number;
  }>;
  initialSizeDesktop: number;
  initialSizeMobile: number;
  loadMoreSize: number;
}

export function usePagination<T>({
  queryKey,
  fetchFn,
  initialSizeDesktop,
  initialSizeMobile,
  loadMoreSize,
}: PaginationConfig<T>) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<T[]>([]);
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
    setData([]);
    lastAppendedBackendPageRef.current = null;
  }, [isDesktop, queryKey]);

  const initialSize = isDesktop ? initialSizeDesktop : initialSizeMobile;
  const perPage = page === 1 ? initialSize : loadMoreSize;

  const backendPage = page === 1 ? 1 : initialSize / loadMoreSize + (page - 1);

  const query = useQuery({
    queryKey: [queryKey, backendPage, perPage, isDesktop],
    queryFn: () => fetchFn({ page: backendPage, perPage }),
    enabled: isDesktop !== null,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (!query.data) return;
    if (query.data.page !== backendPage) return;
    if (lastAppendedBackendPageRef.current === backendPage) return;

    lastAppendedBackendPageRef.current = backendPage;

    if (page === 1) {
      setData(query.data.items);
    } else {
      setData((prev) => [...prev, ...query.data.items]);
    }
  }, [query.data, page, backendPage]);

  const handleLoadMore = () => {
    if (!query.data || query.isFetching) return;
    if (backendPage >= query.data.totalPages) return;
    setPage((p) => p + 1);
  };

  return {
    data,
    page,
    totalPages: query.data?.totalPages,
    isFetching: query.isFetching,
    handleLoadMore,
  };
}
