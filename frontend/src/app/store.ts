import {configureStore} from '@reduxjs/toolkit';
import {newsReducer} from '../store/news/newsSlice';
import {commentsReducer} from '../store/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    comments: commentsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;