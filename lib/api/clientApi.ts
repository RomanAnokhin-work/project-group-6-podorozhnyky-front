import {User} from "../../types/user";
import {instance} from "./api";

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


export const getUsers = async ():Promise<GetUsersResponse> => {
const {data} = await instance.get<GetUsersResponse>('/users');
console.log(data.users)
return data
}

export async function checkSession(): Promise<CheckSessionResponse> {
  const { data } = await instance.get<CheckSessionResponse>("/auth/session");
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await instance.get<User>("/users/me");
  return data;
}