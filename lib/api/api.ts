import axios, { AxiosError } from "axios";
import type { StoriesResponse } from "@/types/story";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

export type ApiError = AxiosError<{ error: string }>;

// const baseURL = process.env.NEXT_PUBLIC_API_URL;

// export const instance = axios.create({
//   baseURL: baseURL,
//   withCredentials: true,
// });

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
