import { User } from "@/types/user";
import { cookies } from "next/headers";
import { instance } from "./api";
import { ApiStory } from "@/types/story";

interface GetTravellerByIdResponse {
  user: User;
  articles: ApiStory[];
}

export const getTravellerById = async (
  id: string,
): Promise<GetTravellerByIdResponse> => {
  const cookieStore = await cookies();

  const { data } = await instance.get<GetTravellerByIdResponse>(
    `/users/${id}`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );

  return data;
};
