import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUsers } from "@/lib/api/clientApi";
import TravellersClient from "./Travellers.client";
import type { Metadata } from "next";

export const metadata: Metadata = {
   icons: {
    icon: "/favicon-1.svg"
  },
  title: "Мандрівники | Podorozhnyky",
  description: "Знайомтесь із мандрівниками, читайте їхні історії та надихайтесь подорожами.",
  openGraph: {
    title: "Мандрівники | Podorozhnyky",
    description: "Читайте профілі та історії мандрівників.",
    url: "https://project-group-6-podorozhnyky-front.vercel.app/travellers",
    siteName: "Podorozhnyky",
    images: [{ url: "/images/cover/cover.jpg", width: 1200, height: 630, alt: "Travellers" }],
    type: "website",
    locale: "uk_UA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Мандрівники | Podorozhnyky",
    description: "Читайте профілі мандрівників та їхні історії.",
    images: ["/images/cover/cover.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://project-group-6-podorozhnyky-front.vercel.app/travellers" },
};

export default async function TravellersPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["travellers"],
    queryFn: ({ pageParam = 1 }) => getUsers({ page: pageParam, perPage: 4 }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TravellersClient />
    </HydrationBoundary>
  );
}