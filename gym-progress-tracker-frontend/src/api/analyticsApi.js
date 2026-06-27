import api from './axios';

export const getExerciseAnalytics = (exercise) =>
  api.get(`/analytics/exercise/${exercise}`);
