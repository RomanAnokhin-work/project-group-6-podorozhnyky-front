import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const addArticleToSaved = async (articleId: string) => {
  const { data } = await api.patch("/me/saved-articles", { articleId });
  return data;
};

export const removeArticleFromSaved = async (articleId: string) => {
  const { data } = await api.delete("/me/saved-articles", {
    data: { articleId },
  });
  return data;
};
