import axios from "axios";

const baseURL = process.env.SERVER_URL;

export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});
