import axios from "axios";

const API = axios.create({
  baseURL: "http://10.0.2.2:5001",
});

export const registerUser = async (userData) => {
  try {
    const res = await API.post("/auth/register", userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (credentials) => {
  try {
    const res = await API.post("/auth/login", credentials);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};