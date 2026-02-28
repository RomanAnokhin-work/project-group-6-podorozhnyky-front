import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getUsers } from "@/lib/api/clientApi";
import TravellersClient from "./Travellers.client";
import Container from "@/components/Container/Container";
// import css from "@/components/Container/Container.module.css"


export default async function TravellersPage() {
  const queryClient = new QueryClient();
await queryClient.prefetchInfiniteQuery({
  queryKey: ["travellers"],
  queryFn: ({ pageParam = 1 }) =>
    getUsers({ page: pageParam, perPage: 4 }),
  initialPageParam: 1,
});
  return (
    // <section style={{paddingTop: '72px'}}>
    // <Container >
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TravellersClient/>
    </HydrationBoundary>
    // </Container>
    // </section>
  );
}