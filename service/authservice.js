import axios from "axios";

const API = axios.create({
  baseURL: "https://nondomestically-supersubtle-taisha.ngrok-free.dev/", //
});

// Register API
export const registerUser = async (userData) => {
  try {
    const res = await API.post("/auth/register", userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login API
export const loginUser = async (credentials) => {
  try {
    const res = await API.post("/auth/login", credentials);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};