import API from "./api";

// 🔹 Register user
export const register = async (data) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};

// 🔹 Login user
export const login = async (data) => {
  const response = await API.post("/auth/login", data);
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

// 🔹 Logout
export const logout = () => {
  localStorage.removeItem("token");
};
