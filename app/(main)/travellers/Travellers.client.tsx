"use client";

import TravellersList from "@/components/TravellersList/TravellersList";
import { usePagination } from "@/hooks/usePagination";
import { getUsers } from "@/lib/api/clientApi";
import { User } from "@/types/user";

export default function TravellersClient() {
  const { data: users, handleLoadMore, totalPages, page} = usePagination<User>({
  queryKey: "travellers",
  initialSizeDesktop: 12,
  initialSizeMobile: 8,
  loadMoreSize: 4,
  fetchFn: async ({ page, perPage }) => {
    const res = await getUsers({ page, perPage });
    return { items: res.users, totalPages: res.totalPages, page: res.page };
  },
});

  return (
    <div>
      <h1 style={{ textAlign: "center", padding: "32px 20px 24px 20px", color: 'var(--color-dark-text)' }}>
        Мандрівники
      </h1>

      <TravellersList
        users={users}
        onLoadMore={handleLoadMore}
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
}
