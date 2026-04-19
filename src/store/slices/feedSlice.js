import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { feedApi } from '../../services/api';

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
      });
  },
});

export const { clearFeed } = feedSlice.actions;
export default feedSlice.reducer;