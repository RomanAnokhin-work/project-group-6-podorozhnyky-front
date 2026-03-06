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

interface GetTavellerByIdResponse {
  user: User;
  articles: ApiStory[];
}

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

export async function getServerMe(): Promise<User> {
  const cookieStore = await cookies();
  console.log(cookieStore);

  const { data } = await instance.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function getMyStoriesServer(page = 1, perPage = 10) {
  const cookieStore = await cookies();
  console.log(cookieStore);

  const { data } = await instance.get(`/stories/own`, {
    params: {
      page,
      perPage,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
}

export const getSavedStories = async () => {
  try {
    const user = await getServerMe();
    const savedIds = user.savedArticles || [];
    if (savedIds.length === 0) return [];
    const { data } = await instance.get("/stories");
    const allStories = data.stories || data;
    return allStories.filter((story: any) => savedIds.includes(story._id));
  } catch (error) {
    console.error("Error in getSavedStories:", error);
    return [];
  }
};
export async function getTravellerById(
  id: string,
): Promise<GetTavellerByIdResponse> {
  const cookieStore = await cookies();
  const { data } = await instance.get<GetTavellerByIdResponse>(`/users/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
}
