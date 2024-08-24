import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {FullNewsType, News, NewsMutation} from '../../types';
import {RootState} from '../../app/store';

export const postFormNews = createAsyncThunk<void, NewsMutation, { state: RootState }>(
  'news/postFormNews', async (newsData) => {
    const formData = new FormData();
    formData.append('title', newsData.title);
    formData.append('content', newsData.content);

    if (newsData.image) {
      formData.append('image', newsData.image);
    }

    await axiosApi.post<NewsMutation>('/news', formData);
  }
);

export const fetchNewsData = createAsyncThunk<News[], void, { state: RootState }>(
  'news/fetchNewsData', async () => {
    const response = await axiosApi.get<News[]>('/news');
    return response.data;
  }
);

export const fetchOneNewsData = createAsyncThunk<FullNewsType, string, { state: RootState }>(
  'news/fetchOneNewsData', async (id) => {
    const response = await axiosApi.get<FullNewsType>(`/news/${id}`);
    return response.data;
  }
);

export const deleteOneNews = createAsyncThunk<void, string, { state: RootState }>(
  'news/deleteOneNews', async (id) => {
    await axiosApi.delete<FullNewsType>(`/news/${id}`);
  }
);