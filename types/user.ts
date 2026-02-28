export interface User {
  _id: string;
  name: string;
  avatarUrl: string;
  articlesAmount: number;
  description: string;
  savedArticles: string[];
}
