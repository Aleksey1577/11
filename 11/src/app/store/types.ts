export interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
}

export interface NewsState {
  posts: Post[];
  skip: number;
  loading: boolean;
  error: null | string;
}

export interface RootState {
  news: NewsState;
}