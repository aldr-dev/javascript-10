export interface News {
  id: number;
  title: string;
  image: string | null;
  created_at: string;
}

export interface FullNewsType {
  id: number;
  title: string;
  content: string;
  image: string | null;
  created_at: string;
}

export interface NewsMutation {
  title: string;
  content: string;
  image: File | null;
}

export interface Comments {
  id: number;
  news_id: number;
  author: string;
  content: string;
}

export interface CommentsMutation {
  news_id: number;
  author: string | null;
  content: string;
}