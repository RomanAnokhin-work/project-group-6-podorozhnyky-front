import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getUsers } from "@/lib/api/clientApi";
import TravellersClient from "./Travellers.client";
import css from "./TravellersPage.module.css"

export default async function TravellersPage() {
  const queryClient = new QueryClient();
await queryClient.prefetchInfiniteQuery({
  queryKey: ["travellers"],
  queryFn: ({ pageParam = 1 }) =>
    getUsers({ page: pageParam, perPage: 4 }),
  initialPageParam: 1,
});
  return (
    <section className={css.container}>
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TravellersClient/>
    </HydrationBoundary>
    </section>
  );
}