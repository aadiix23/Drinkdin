import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { leaderboardApi } from '../../services/api';

const initialState = {
  rankings: [],
  isLoading: false,
  error: null,
};

export const fetchLeaderboard = createAsyncThunk('leaderboard/fetchLeaderboard', async (_, { rejectWithValue }) => {
  try {
    const response = await leaderboardApi.getLeaderboard();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch leaderboard');
  }
});

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    clearLeaderboard: (state) => {
      state.rankings = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rankings = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;