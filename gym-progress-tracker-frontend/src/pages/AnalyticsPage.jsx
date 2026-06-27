import { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getExerciseAnalytics } from '../api/analyticsApi';
import { getMuscleGroups, getExercisesByMuscleGroup } from '../api/exerciseApi';
import { MUSCLE_GROUP_LABELS } from '../constants/enums';
import { getExerciseLabel } from '../constants/exerciseLabels';

export default function AnalyticsPage() {
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [muscleGroup, setMuscleGroup] = useState('');
  const [exercise, setExercise] = useState('');
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getMuscleGroups()
      .then(({ data }) => setMuscleGroups(data))
      .catch(() => setError('Failed to load muscle groups.'));
  }, []);

  useEffect(() => {
    if (!muscleGroup) {
      setExercises([]);
      setExercise('');
      return;
    }

    getExercisesByMuscleGroup(muscleGroup)
      .then(({ data }) => {
        setExercises(data);
        setExercise(data[0] || '');
      })
      .catch(() => setError('Failed to load exercises.'));
  }, [muscleGroup]);

  useEffect(() => {
    if (!exercise) {
      setAnalytics(null);
      return;
    }

    setLoading(true);
    setError('');

    getExerciseAnalytics(exercise)
      .then(({ data }) => setAnalytics(data))
      .catch(() => setError('Failed to load analytics.'))
      .finally(() => setLoading(false));
  }, [exercise]);

  const chartData =
    analytics?.progress?.map((point) => ({
      date: point.date,
      maxWeight: point.maxWeight,
    })) ?? [];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Analytics</h1>
          <p className="text-muted">Track your strength progress over time</p>
        </div>
      </div>

      <div className="analytics-filters form-card">
        <div className="form-grid">
          <label>
            Muscle Group
            <select
              value={muscleGroup}
              onChange={(e) => setMuscleGroup(e.target.value)}
            >
              <option value="">Select muscle group</option>
              {muscleGroups.map((mg) => (
                <option key={mg} value={mg}>
                  {MUSCLE_GROUP_LABELS[mg]}
                </option>
              ))}
            </select>
          </label>

          <label>
            Exercise
            <select
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              disabled={!muscleGroup}
            >
              <option value="">Select exercise</option>
              {exercises.map((ex) => (
                <option key={ex} value={ex}>
                  {getExerciseLabel(ex)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {!exercise ? (
        <div className="empty-state">
          <p>Select a muscle group and exercise to view progress.</p>
        </div>
      ) : loading ? (
        <div className="loading-state">Loading analytics…</div>
      ) : analytics ? (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Starting Weight</span>
              <span className="stat-value">{analytics.startingWeight ?? '—'} kg</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Current Weight</span>
              <span className="stat-value">{analytics.currentWeight ?? '—'} kg</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Max Weight</span>
              <span className="stat-value highlight">{analytics.maxWeight ?? '—'} kg</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Total Workouts</span>
              <span className="stat-value">{analytics.totalWorkouts ?? 0}</span>
            </div>
          </div>

          <div className="chart-card">
            <h2>{getExerciseLabel(exercise)} — Max Weight Progress</h2>
            {chartData.length === 0 ? (
              <div className="empty-state compact">
                <p>No progress data yet for this exercise.</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={360}>
                <LineChart data={chartData} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2f3a" />
                  <XAxis
                    dataKey="date"
                    stroke="#8b95a8"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })
                    }
                  />
                  <YAxis
                    stroke="#8b95a8"
                    tick={{ fontSize: 12 }}
                    unit=" kg"
                  />
                  <Tooltip
                    contentStyle={{
                      background: '#1a1f2e',
                      border: '1px solid #2a2f3a',
                      borderRadius: '8px',
                    }}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value) => [`${value} kg`, 'Max Weight']}
                  />
                  <Line
                    type="monotone"
                    dataKey="maxWeight"
                    stroke="#22c55e"
                    strokeWidth={2.5}
                    dot={{ fill: '#22c55e', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
