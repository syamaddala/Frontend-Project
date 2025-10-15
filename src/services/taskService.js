import API from "./api";

// 🔹 Create new task
export const createTask = (taskData) => API.post("/tasks", taskData);

// 🔹 Get all tasks
export const getTasks = () => API.get("/tasks");

// 🔹 Update task
export const updateTask = (id, updatedData) => API.put(`/tasks/${id}`, updatedData);

// 🔹 Delete task
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
