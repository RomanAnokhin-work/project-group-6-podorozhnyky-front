import { User } from "../../types/user";
import { instance } from "./api";
import { isAxiosError } from "axios";
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

export const fetchStoryById = async (storyId: string): Promise<ApiStory> => {
  const { data } = await instance.get(`/stories/${storyId}`);
  return data.data;
};

export const deleteStory = async (storyId: string) => {
  const res = await instance.delete(`/stories/${storyId}`);
  return res.data;
};

export const addFavorite = async (storyId: string): Promise<User> => {
  const { data } = await instance.patch('/stories/saved', { storyId });
  return data.data;
};

export const removeFavorite = async (storyId: string): Promise<User> => {
  const { data } = await instance.delete('/stories/saved', {
    data: { storyId }
  });
  return data.data;
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

export async function checkSession(): Promise<CheckSessionResponse> {
  try {
    await instance.post("/auth/session");
    return { success: true };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return { success: false };
    }
    throw error;
  }
}

export async function getMe(): Promise<User> {
  const { data } = await instance.get<User>("/users/me");
  return data;
}

export async function login(loginData: LoginRequest): Promise<User> {
  const { data } = await instance.post<User>("/auth/login", loginData);
  return data;
}

export async function register(registerData: RegisterRequest) {
  const { data } = await instance.post<User>("/auth/register", registerData);
  return data;
}

export type { LoginRequest, RegisterRequest };
