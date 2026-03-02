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
const API_URL = process.env.NEXT_PUBLIC_API_URL;

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


const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll()
    .map(cookie => `${cookie.name}=${cookie.value}`)
    .join('; ');

  return { 'Cookie': allCookies };
};
export const getMyStories = async () => {
  try {
    const user = await getMe();
    if (!user || !user._id) return [];

    // Використовуємо ID отриманого юзера для запиту його статей
    const { data } = await instance.get(`/users/${user._id}`);
    
    // Повертаємо масив статей (у Анатолія він поки порожній [])
    return data.articles || []; 
  } catch (error) {
    console.error("Error in getMyStories:", error);
    return [];
  }
};

// 2. Отримуємо ЗБЕРЕЖЕНІ історії
export const getSavedStories = async () => {
  try {
    const user = await getMe();
    // В Postman ми бачили, що це масив ID рядків
    const savedIds = user.savedArticles || [];

    if (savedIds.length === 0) return [];

    // Отримуємо всі доступні сторіз, щоб відфільтрувати їх за ID
    const { data } = await instance.get("/stories");
    const allStories = data.stories || data;

    // Фільтруємо, залишаючи лише ті, що є у списку збережених юзера
    return allStories.filter((story: any) => savedIds.includes(story._id));
  } catch (error) {
    console.error("Error in getSavedStories:", error);
    return [];
  }
};
export async function getTravellerById(id: string): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await instance.get<User>(`/users/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
}

// export async function name(params:type) {

// }
