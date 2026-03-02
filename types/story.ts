export interface ApiCategory {
  _id: string;
  name: string;
}

export interface ApiOwner {
  _id: string;
  name: string;
  avatarUrl: string;
  articlesAmount: number;
  description?: string;
}

export interface ApiStory {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: ApiCategory;
  ownerId: ApiOwner;
  date: string;
  favoriteCount: number;
}

export interface StoriesResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  stories: ApiStory[];
}
