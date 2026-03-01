"use client";

import TravellersList from "@/components/TravellersList/TravellersList";
import { usePagination } from "@/hooks/usePagination";

export default function TravellersClient() {
  const { users, page, totalPages, handleLoadMore } = usePagination();

  return (
    <div>
      <h1 style={{textAlign: 'center', padding: '32px 20px 24px 20px' }}>
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
