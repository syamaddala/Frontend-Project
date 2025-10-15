import API from './api';
export const createTask = (t) => API.post('/tasks', t);
export const getTasks = () => API.get('/tasks');
export const updateTask = (id, t) => API.put(`/tasks/${id}`, t);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
