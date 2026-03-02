import type { ApiStory } from "@/types/story";
import { User } from "@/types/user";
import { cookies } from "next/headers";
import { instance } from "./api";

export type PopularResponse = {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  stories: ApiStory[];
};

export async function fetchPopularStoriesPage(
  page = 1,
  perPage = 10,
): Promise<PopularResponse> {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) throw new Error("BACKEND_URL is not defined");

  const res = await fetch(
    `${backendUrl}/stories/popular?page=${page}&perPage=${perPage}`,
    {
      headers: { Accept: "application/json" },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Popular stories error ${res.status}: ${text.slice(0, 200)}`,
    );
  }

  return (await res.json()) as PopularResponse;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();

  const { data } = await instance.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function getTravellerById(id: string): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await instance.get<User>(`/users/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
}

// export async function name(params:type) {

// }
