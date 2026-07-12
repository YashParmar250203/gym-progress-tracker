import api from './axios';

export const addWorkout = (data) => api.post('/workout', data);

export const getWorkoutHistory = () => api.get('/workout/history');

export const getWorkoutSummary = () => api.get('/workout/summary');

// Add this to workoutApi.js
export const getDashboard = () => api.get('/workout/dashboard');

export const getWorkoutsByDate = (workoutDate) =>
  api.get('/workout/date', { params: { workoutDate } });

export const getWorkoutsByExercise = (exercise) =>
  api.get(`/workout/exercise/${exercise}`);

export const updateWorkout = (id, data) => api.put(`/workout/${id}`, data);

export const deleteWorkout = (id) => api.delete(`/workout/${id}`);
