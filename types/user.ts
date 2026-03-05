export interface User {
  _id: string;
  name: string;
  avatarUrl: string;
  articlesAmount: number;
  description: string;
  email: string;
  savedArticles: string[];
}
