import axios from "axios";

// Get API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default api;