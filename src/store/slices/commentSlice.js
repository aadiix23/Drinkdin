import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { commentsApi } from '../../services/api';

const initialState = {
  byPostId: {},
  isLoadingByPostId: {},
  isSubmittingByPostId: {},
  error: null,
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await commentsApi.getComments(postId);
      return {
        postId,
        comments: response.data?.comments || [],
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch comments');
    }
  }
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ postId, text }, { rejectWithValue }) => {
    try {
      const response = await commentsApi.addComment(postId, text);
      return {
        postId,
        comment: response.data?.Comment,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add comment');
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async ({ postId, commentId }, { rejectWithValue }) => {
    try {
      await commentsApi.deleteComment(commentId);
      return { postId, commentId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete comment');
    }
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        state.isLoadingByPostId[action.meta.arg] = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        state.isLoadingByPostId[postId] = false;
        state.byPostId[postId] = comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        const postId = action.meta.arg;
        state.isLoadingByPostId[postId] = false;
        state.error = action.payload;
      })
      .addCase(addComment.pending, (state, action) => {
        state.isSubmittingByPostId[action.meta.arg.postId] = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comment } = action.payload;
        state.isSubmittingByPostId[postId] = false;
        state.byPostId[postId] = [comment, ...(state.byPostId[postId] || [])];
      })
      .addCase(addComment.rejected, (state, action) => {
        const postId = action.meta.arg.postId;
        state.isSubmittingByPostId[postId] = false;
        state.error = action.payload;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { postId, commentId } = action.payload;
        state.byPostId[postId] = (state.byPostId[postId] || []).filter(
          (comment) => comment._id !== commentId
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default commentSlice.reducer;
