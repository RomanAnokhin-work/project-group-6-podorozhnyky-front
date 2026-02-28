import {User} from "../../types/user";
import {nextServer} from "./api";

interface GetUsersResponse {
  page: number;
  perPage: number;
  totalUser: number;
  totalPages: number;
  users: User[];
}

export const checkSession = async () => {
  // логіка перевірки сесії користувача
};

export const getMe = async () => {
  // логіка отримання поточного користувача
};
export const getUsers = async ():Promise<GetUsersResponse> => {
const {data} = await nextServer.get<GetUsersResponse>('/users');
console.log(data.users)
return data
}