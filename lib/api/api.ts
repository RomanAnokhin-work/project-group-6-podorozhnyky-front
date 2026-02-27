import axios from "axios";
import type { ApiStory } from "@/types/story";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export { instance };

import type { StoriesResponse } from "@/types/story";

export async function fetchStories(
  page = 1,
  perPage = 10,
  category?: string,
): Promise<StoriesResponse> {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) throw new Error("BACKEND_URL is not defined in .env.local");

  const qs = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  });
  if (category) qs.set("category", category);

  const res = await fetch(`${backendUrl}/stories?${qs.toString()}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text.slice(0, 200)}`);
  }

  return (await res.json()) as StoriesResponse;
}



export type PopularResponse = {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  stories: ApiStory[];
};

export async function fetchPopularStoriesPage(page = 1, perPage = 10): Promise<PopularResponse> {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) throw new Error("BACKEND_URL is not defined");

  const res = await fetch(`${backendUrl}/stories/popular?page=${page}&perPage=${perPage}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Popular stories error ${res.status}: ${text.slice(0, 200)}`);
  }

  return (await res.json()) as PopularResponse;
}