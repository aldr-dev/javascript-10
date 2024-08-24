import {Comments} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {deleteOneComment, fetchCommentsData, postFormComments} from './commentsThunks';

export interface CommentsState {
  commentsData: Comments[];
  getCommentsIsLoading: boolean;
  postCommentsIsLoading: boolean;
  deleteCommentsIsLoading: boolean | string;
}

const initialState: CommentsState = {
  commentsData: [],
  getCommentsIsLoading: false,
  postCommentsIsLoading: false,
  deleteCommentsIsLoading: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postFormComments.pending, (state) => {
      state.postCommentsIsLoading = true;
    });
    builder.addCase(postFormComments.fulfilled, (state) => {
      state.postCommentsIsLoading = false;
    });
    builder.addCase(postFormComments.rejected, (state) => {
      state.postCommentsIsLoading = false;
    });

    builder.addCase(fetchCommentsData.pending, (state) => {
      state.getCommentsIsLoading = true;
    });
    builder.addCase(fetchCommentsData.fulfilled, (state, {payload: dataArray}) => {
      state.getCommentsIsLoading = false;
      state.commentsData = dataArray;
    });
    builder.addCase(fetchCommentsData.rejected, (state) => {
      state.getCommentsIsLoading = false;
    });

    builder.addCase(deleteOneComment.pending, (state, {meta: {arg: commentId}}) => {
      state.deleteCommentsIsLoading = commentId;
    });
    builder.addCase(deleteOneComment.fulfilled, (state) => {
      state.deleteCommentsIsLoading = false;
    });
    builder.addCase(deleteOneComment.rejected, (state) => {
      state.deleteCommentsIsLoading = false;
    });
  },
  selectors: {
    selectCommentsData: (state) => state.commentsData,
    selectGetCommentsIsLoading: (state) => state.getCommentsIsLoading,
    selectDeleteCommentsIsLoading: (state) => state.deleteCommentsIsLoading,
    selectPostCommentsIsLoading: (state) => state.postCommentsIsLoading,
  }
});

export const commentsReducer = commentsSlice.reducer;
export const {
  selectCommentsData,
  selectGetCommentsIsLoading,
  selectDeleteCommentsIsLoading,
  selectPostCommentsIsLoading,
} = commentsSlice.selectors;