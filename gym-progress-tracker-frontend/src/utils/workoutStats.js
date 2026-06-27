/**
 * Builds pie-chart distribution data from workout counts.
 * Groups smaller slices into "Others" when exceeding maxSlices.
 */
export function buildDistribution(countsMap, labelFn, maxSlices = 6) {
  const entries = Object.entries(countsMap)
    .map(([key, count]) => ({ key, count }))
    .filter(({ count }) => count > 0)
    .sort((a, b) => b.count - a.count);

  const total = entries.reduce((sum, { count }) => sum + count, 0);
  if (total === 0) return [];

  const toSlice = (key, count) => ({
    key,
    name: labelFn(key),
    value: count,
    percent: Math.round((count / total) * 100),
  });

  if (entries.length <= maxSlices) {
    return entries.map(({ key, count }) => toSlice(key, count));
  }

  const top = entries.slice(0, maxSlices - 1);
  const othersCount = entries.slice(maxSlices - 1).reduce((sum, { count }) => sum + count, 0);

  return [
    ...top.map(({ key, count }) => toSlice(key, count)),
    {
      key: 'OTHERS',
      name: 'Others',
      value: othersCount,
      percent: Math.round((othersCount / total) * 100),
    },
  ];
}

export function getMuscleGroupDistribution(workouts, labelFn) {
  const counts = workouts.reduce((acc, workout) => {
    const group = workout.muscleGroup;
    if (group) acc[group] = (acc[group] || 0) + 1;
    return acc;
  }, {});

  return buildDistribution(counts, labelFn, 6);
}

export function getExerciseDistribution(workouts, labelFn) {
  const counts = workouts.reduce((acc, workout) => {
    const exercise = workout.exercise;
    if (exercise) acc[exercise] = (acc[exercise] || 0) + 1;
    return acc;
  }, {});

  return buildDistribution(counts, labelFn, 6);
}

export function getMaxWeight(sets = []) {
  if (!sets.length) return 0;
  return Math.max(...sets.map((set) => set.weight));
}

export const CHART_COLORS = [
  '#ff6b00',
  '#ff8534',
  '#ffa04d',
  '#e55a00',
  '#cc5000',
  '#6b7280',
  '#9ca3af',
  '#4b5563',
];
