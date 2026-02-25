import { User } from "@/types/user";
import { nextServer } from "./api";

interface FetchTravellersHttpResponse {
  travellers: User[];
  totalPages: number;
}

export const fetchTravellers = async (
  page: number,
): Promise<FetchTravellersHttpResponse> => {
  const { data } = await nextServer.get<FetchTravellersHttpResponse>("/users", {
    params: {
      page,
      perPage: 12,
    },
  });
  return data;
};
