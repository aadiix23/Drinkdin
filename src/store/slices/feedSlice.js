import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { feedApi, postApi } from '../../services/api';

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

export const fetchFeed = createAsyncThunk('feed/fetchFeed', async (_, { rejectWithValue }) => {
  try {
    const response = await feedApi.getFeed();
    return response.data.posts || [];
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch feed');
  }
});

export const toggleFeedLike = createAsyncThunk(
  'feed/toggleFeedLike',
  async ({ postId, likedByMe }, { rejectWithValue }) => {
    try {
      const response = likedByMe
        ? await postApi.unlikePost(postId)
        : await postApi.likePost(postId);

      return {
        postId,
        post: response.data?.post,
        likedByMe: !likedByMe,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update like');
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearFeed: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload || [];
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(toggleFeedLike.fulfilled, (state, action) => {
        const { postId, post, likedByMe } = action.payload;
        const targetPost = state.posts.find((item) => item._id === postId);
        if (targetPost) {
          targetPost.likes = Array.isArray(post?.likes) ? post.likes : targetPost.likes;
          targetPost.likedByMe = likedByMe;
        }
      })
      .addCase(toggleFeedLike.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
