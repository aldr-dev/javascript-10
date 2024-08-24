import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import axiosApi from '../../axiosApi';
import {Comments, CommentsMutation} from '../../types';

export const postFormComments = createAsyncThunk<void, CommentsMutation, { state: RootState }>(
  'comments/postFormComments', async (dataComment, thunkAPI) => {
    try {
      await axiosApi.post<CommentsMutation>('/comments', dataComment);
    } catch (error) {
      return thunkAPI.rejectWithValue(error + 'Ошибка, не удалось создать комментарий!');
    }
  }
);

export const fetchCommentsData = createAsyncThunk<Comments[],  string | undefined, { state: RootState }>(
  'comments/fetchCommentsData', async (news_id) => {
    const response = await axiosApi.get<Comments[]>(`/comments?news_id=${news_id}`);
    return response.data;
  }
);

export const deleteOneComment = createAsyncThunk<void, string, { state: RootState }>(
  'comments/deleteOneComment', async (id) => {
    await axiosApi.delete<Comments>(`/comments/${id}`);
  }
);