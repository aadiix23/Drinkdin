import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import feedReducer from './slices/feedSlice';
import postReducer from './slices/postSlice';
import followReducer from './slices/followSlice';
import leaderboardReducer from './slices/leaderboardSlice';
import commentReducer from './slices/commentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    feed: feedReducer,
    post: postReducer,
    follow: followReducer,
    leaderboard: leaderboardReducer,
    comments: commentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
