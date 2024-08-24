import {FullNewsType, News} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {deleteOneNews, fetchNewsData, fetchOneNewsData, postFormNews} from './newsThunks';

export interface NewsState {
  newsData: News[];
  getIsLoading: boolean;
  postIsLoading: boolean;
  deleteIsLoading: boolean | string;
  getOneNewsIsLoading: boolean;
  fullNewsData: FullNewsType | null;
}

const initialState: NewsState = {
  newsData: [],
  getIsLoading: false,
  postIsLoading: false,
  deleteIsLoading: false,
  getOneNewsIsLoading: false,
  fullNewsData: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postFormNews.pending, (state) => {
      state.postIsLoading = true;
    });
    builder.addCase(postFormNews.fulfilled, (state) => {
      state.postIsLoading = false;
    });
    builder.addCase(postFormNews.rejected, (state) => {
      state.postIsLoading = false;
    });

    builder.addCase(fetchNewsData.pending, (state) => {
      state.getIsLoading = true;
    });
    builder.addCase(fetchNewsData.fulfilled, (state, {payload: newsArray}) => {
      state.getIsLoading = false;
      state.newsData = newsArray;
    });
    builder.addCase(fetchNewsData.rejected, (state) => {
      state.getIsLoading = false;
    });

    builder.addCase(fetchOneNewsData.pending, (state) => {
      state.getOneNewsIsLoading = true;
    });
    builder.addCase(fetchOneNewsData.fulfilled, (state, {payload: newsOneData}) => {
      state.getOneNewsIsLoading = false;
      state.fullNewsData = newsOneData;
    });
    builder.addCase(fetchOneNewsData.rejected, (state) => {
      state.getOneNewsIsLoading = false;
    });

    builder.addCase(deleteOneNews.pending, (state, {meta: {arg: newsId}}) => {
      state.deleteIsLoading = newsId;
    });
    builder.addCase(deleteOneNews.fulfilled, (state) => {
      state.deleteIsLoading = false;
    });
    builder.addCase(deleteOneNews.rejected, (state) => {
      state.deleteIsLoading = false;
    });
  },
  selectors: {
    selectNewsData: (state) => state.newsData,
    selectGetIsLoading: (state) => state.getIsLoading,
    selectPostIsLoading: (state) => state.postIsLoading,
    selectDeleteIsLoading: (state) => state.deleteIsLoading,
    selectGetOneNewsIsLoading: (state) => state.getOneNewsIsLoading,
    selectFullNewsData: (state) => state.fullNewsData,
  }
});

export const newsReducer = newsSlice.reducer;
export const {
  selectNewsData,
  selectGetIsLoading,
  selectPostIsLoading,
  selectDeleteIsLoading,
  selectGetOneNewsIsLoading,
  selectFullNewsData,
} = newsSlice.selectors;