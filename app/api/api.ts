import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
export interface SendResetEmailCredentials {
  email: string;
}

export const sendResetEmail = async (
  credentials: SendResetEmailCredentials,
): Promise<void> => {
  await api.post("/auth/send-reset-email", credentials);
};