import { createSlice } from '@reduxjs/toolkit';

interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
}

interface NewsState {
  posts: Post[];
  skip: number;
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  posts: [],
  skip: 0,
  loading: false,
  error: null,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    fetchNewsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchNewsSuccess: (state, action: { payload: Post[] }) => {
      state.posts = [...state.posts, ...action.payload];
      state.skip += 10;
      state.loading = false;
    },
    fetchNewsFailure: (state, action: { payload: string }) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchNewsStart, fetchNewsSuccess, fetchNewsFailure } = newsSlice.actions;
export default newsSlice.reducer;