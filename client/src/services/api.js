import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Backend API base URL

const api = axios.create({
  baseURL: API_URL,
});

// User Signup
export const signup = (userData) => api.post('/users/signup', userData);

// User Login
export const login = (userData) => api.post('/users/login', userData);

// Fetch Tasks (JWT protected)
export const getTasks = (token) => {
  return api.get('/tasks', {
    headers: { Authorization: `Bearer ${token}` },  // Include token in headers
  });
};

// Create Task (JWT protected)
export const createTask = (taskData, token) => {
  return api.post('/tasks', taskData, {
    headers: { Authorization: `Bearer ${token}` },  // Include token in headers
  });
};

// Update Task (JWT protected)
export const updateTask = (taskId, updatedTask, token) => {
  return api.put(`/tasks/${taskId}`, updatedTask, {
    headers: { Authorization: `Bearer ${token}` },  // Include token in headers
  });
};

// Delete Task (JWT protected)
export const deleteTask = (taskId, token) => {
  return api.delete(`/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },  // Include token in headers
  });
};
