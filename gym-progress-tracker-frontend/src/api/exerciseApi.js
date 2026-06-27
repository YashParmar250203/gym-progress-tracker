import api from './axios';

export const getMuscleGroups = () => api.get('/exercise/muscle-groups');

export const getExercisesByMuscleGroup = (muscleGroup) =>
  api.get(`/exercise/muscle-group/${muscleGroup}`);
