import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { feedApi, followApi } from '../../services/api';

const initialState = {
  connections: [],
  following: [],
  followers: [],
  isLoading: false,
  error: null,
};

export const fetchNetwork = createAsyncThunk('follow/fetchNetwork', async (_, { rejectWithValue }) => {
  try {
    const response = await feedApi.getFeed();
    const posts = response.data?.posts || [];

    const uniqueConnections = posts.reduce((accumulator, post) => {
      const user = post?.user;
      if (!user?._id) {
        return accumulator;
      }

      const existingUser = accumulator.find((person) => person._id === user._id);
      if (existingUser) {
        return accumulator;
      }

      accumulator.push({
        _id: user._id,
        fullname: user.fullname || 'Unknown User',
        username: user.username ? `@${user.username}` : '@unknown',
        role: post.content || 'Drinkdin member',
      });

      return accumulator;
    }, []);

    return uniqueConnections;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch network');
  }
});

export const toggleFollow = createAsyncThunk('follow/toggleFollow', async (userId, { rejectWithValue }) => {
  try {
    const response = await followApi.toggleFollow(userId);
    return {
      userId,
      isFollowing: Boolean(response.data?.following),
    };
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to toggle follow');
  }
});

const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {
    clearFollow: (state) => {
      state.connections = [];
      state.following = [];
      state.followers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNetwork.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNetwork.fulfilled, (state, action) => {
        state.isLoading = false;
        state.connections = action.payload;
      })
      .addCase(fetchNetwork.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(toggleFollow.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleFollow.fulfilled, (state, action) => {
        state.isLoading = false;
        const { userId, isFollowing } = action.payload;
        const index = state.following.findIndex((id) => id === userId);
        if (isFollowing && index === -1) {
          state.following.push(userId);
        } else if (!isFollowing && index !== -1) {
          state.following.splice(index, 1);
        }
      })
      .addCase(toggleFollow.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFollow } = followSlice.actions;
export default followSlice.reducer;
