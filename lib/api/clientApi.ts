import { User } from "../../types/user";
import { instance } from "./api";
//import { isAxiosError } from "axios";
import { ApiStory } from "@/types/story";

interface GetUsersResponse {
  page: number;
  perPage: number;
  totalUser: number;
  totalPages: number;
  users: User[];
}
interface CheckSessionResponse {
  success: boolean;
}
interface LoginRequest {
  email: string;
  password: string;
}
interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}
interface GetUsersParams {
  page?: number;
  perPage?: number;
}

export type PopularResponse = {
  page: number;
  perPage: number;
  totalPages: number;
  totalItems: number;
  stories: ApiStory[];
};

interface LoginResponse {
  message: string;
  user: User;
}
interface CreateStoryData {
  cover: File;
  title: string;
  category: string;
  description: string;
  article: string;
}


export const createStory = async (storyData: CreateStoryData) => {
  const formData = new FormData();
  formData.append("img", storyData.cover);
  formData.append("title", storyData.title);
  formData.append("category", storyData.category);
  formData.append("description", storyData.description);
  formData.append("article", storyData.article);

  const { data } = await instance.post("/stories", formData);
  
  return data;
};

export async function fetchPopularStoriesPage(
  page = 1,
  perPage = 10,
): Promise<PopularResponse> {
  const { data } = await instance.get(
    `/stories/popular?page=${page}&perPage=${perPage}`,
  );

  return data;
}

export const fetchStoryById = async (storyId: string): Promise<ApiStory> => {
  const { data } = await instance.get(`/stories/${storyId}`);
  return data.data;
};

export const deleteStory = async (storyId: string) => {
  const res = await instance.delete(`/stories/${storyId}`);
  return res.data;
};

export const addFavorite = async (storyId: string): Promise<User> => {
  const { data } = await instance.patch("/stories/saved", { storyId });
  return data.data;
};

export const removeFavorite = async (storyId: string): Promise<User> => {
  const { data } = await instance.delete("/stories/saved", {
    data: { storyId },
  });
  return data.data;
};

export const addArticleToSaved = async (articleId: string) => {
  const { data } = await instance.patch('/stories/saved', { articleId });
  return data;
};

export const removeArticleFromSaved = async (articleId: string) => {
  const { data } = await instance.delete('/stories/saved', {
    data: { articleId },
  });
  return data;
};

export const getUsers = async (
  { page, perPage }: GetUsersParams
): Promise<GetUsersResponse> => {
  const { data } = await instance.get<GetUsersResponse>("/users", {
    params: {
      page,
      perPage,
    },
  });

  return data;
};

interface GetPopularUsersResponse {
  users: User[];
}

export const getPopularUsers = async (): Promise<GetPopularUsersResponse> => {
  const { data } = await instance.get<GetPopularUsersResponse>(
    "/users/popular-users",
  );
  return data;
};

export async function checkSession(): Promise<CheckSessionResponse> {
  const { data } = await instance.post<CheckSessionResponse>("/auth/session");
  console.log(data);
  
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await instance.get<User>("/users/me");
  return data;
}

export async function login(loginData: LoginRequest): Promise<LoginResponse> {
  const { data } = await instance.post<LoginResponse>("/auth/login", loginData);
  return data;
}

export async function register(registerData: RegisterRequest) {
  const { data } = await instance.post<User>("/auth/register", registerData);
  return data;
}

export async function logout(): Promise<void> {
  await instance.post("/auth/logout");
}
export type { LoginRequest, RegisterRequest };

export type ApiCategory = { _id: string; name: string };

export async function fetchCategories() {
  const res = await instance.get("/categories");
  console.log("AXIOS categories url:", res.config.baseURL, res.config.url);
  console.log("AXIOS categories status:", res.status);
  console.log("AXIOS categories data:", res.data);
  return res.data;
}
export const getMyStories = async (page = 1, perPage = 10) => {

  const { data } = await instance.get(`/stories/own`, {
    params: {
      page,
      perPage
    }
  });
  
  return data; 
};

export const getSavedStories = async () => {
  try {
    const user = await getMe();
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