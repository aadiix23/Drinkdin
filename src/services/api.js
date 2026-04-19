import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://10.0.2.2:5001';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const setAuthToken = async (token) => {
  if (token) {
    await AsyncStorage.setItem('authToken', token);
  } else {
    await AsyncStorage.removeItem('authToken');
  }
};

export const getAuthToken = async () => {
  return await AsyncStorage.getItem('authToken');
};

export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
};

export const feedApi = {
  getFeed: () => api.get('/feed'),
};

export const postApi = {
  createPost: (data) => api.post('/post', data),
  getAllPosts: () => api.get('/post'),
  deletePost: (id) => api.delete(`/post/${id}`),
  likePost: (id) => api.post(`/post/${id}/like`),
  unlikePost: (id) => api.delete(`/post/${id}/like`),
};

export const followApi = {
  toggleFollow: (userId) => api.post(`/follow/${userId}`),
};

export const leaderboardApi = {
  getLeaderboard: () => api.get('/leaderboard'),
};

export default api;