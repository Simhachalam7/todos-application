import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// User Signup
export const signup = (userData) => api.post('/users/signup', userData);

// User Login
export const login = (userData) => api.post('/users/login', userData);

// Get User Profile (JWT protected)
export const getProfile = (token) => api.get('/users/profile', {
  headers: { Authorization: token }
});

// Update User Profile (JWT protected)
export const updateProfile = (profileData, token) => api.put('/users/profile', profileData, {
  headers: { Authorization: token }
});

// Get Tasks (JWT protected)
export const getTasks = (token) => api.get('/tasks', {
  headers: { Authorization: token }
});

// Create Task (JWT protected)
export const createTask = (taskData, token) => api.post('/tasks', taskData, {
  headers: { Authorization: token }
});

// Update Task (JWT protected)
export const updateTask = (taskId, updatedTask, token) => api.put(`/tasks/${taskId}`, updatedTask, {
  headers: { Authorization: token }
});

// Delete Task (JWT protected)
export const deleteTask = (taskId, token) => api.delete(`/tasks/${taskId}`, {
  headers: { Authorization: token }
});
