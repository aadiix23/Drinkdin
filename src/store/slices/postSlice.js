import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postApi } from '../../services/api';

const initialState = {
  posts: [],
  isLoading: false,
  isCreating: false,
  error: null,
};

export const fetchPosts = createAsyncThunk('post/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await postApi.getAllPosts();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch posts');
  }
});

export const createPost = createAsyncThunk('post/createPost', async (postData, { rejectWithValue }) => {
  try {
    const response = await postApi.createPost(postData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create post');
  }
});

export const deletePost = createAsyncThunk('post/deletePost', async (postId, { rejectWithValue }) => {
  try {
    await postApi.deletePost(postId);
    return postId;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete post');
  }
});

export const likePost = createAsyncThunk('post/likePost', async (postId, { rejectWithValue }) => {
  try {
    await postApi.likePost(postId);
    return postId;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to like post');
  }
});

export const unlikePost = createAsyncThunk('post/unlikePost', async (postId, { rejectWithValue }) => {
  try {
    await postApi.unlikePost(postId);
    return postId;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to unlike post');
  }
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isCreating = false;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const post = state.posts.find((p) => p._id === action.payload);
        if (post) {
          post.likes.push('currentUserId');
        }
      })
      .addCase(unlikePost.fulfilled, (state, action) => {
        const post = state.posts.find((p) => p._id === action.payload);
        if (post) {
          post.likes = post.likes.filter((id) => id !== 'currentUserId');
        }
      });
  },
});

export const { clearPosts } = postSlice.actions;
export default postSlice.reducer;