export interface News {
  id: number;
  title: string;
  content: string;
  image: string | null;
  created_at?: string;
}

export type NewsWithoutId = Omit<News, 'id'>;

export interface Comments {
  id: number;
  news_id: number;
  author: string | null;
  content: string;
}

export type CommentsWithoutId = Omit<Comments, 'id'>;