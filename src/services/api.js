import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL ||
    "https://backend-project-production-8a2e.up.railway.app/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach JWT token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
