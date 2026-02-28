import {User} from "../../types/user";
import {nextServer} from "./api";

interface GetUsersResponse {
  page: number;
  perPage: number;
  totalUser: number;
  totalPages: number;
  users: User[];
}


export const getUsers = async ():Promise<GetUsersResponse> => {
const {data} = await nextServer.get<GetUsersResponse>('/users');
console.log(data.users)
return data
}