import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteWorkout, getWorkoutHistory } from '../api/workoutApi';
import DistributionChart from '../components/dashboard/DistributionChart';
import RecentWorkoutItem from '../components/dashboard/RecentWorkoutItem';
import { MUSCLE_GROUP_LABELS } from '../constants/enums';
import { getExerciseLabel } from '../constants/exerciseLabels';
import {
  getExerciseDistribution,
  getMuscleGroupDistribution,
} from '../utils/workoutStats';
import '../styles/dashboard.css';

const RECENT_LIMIT = 8;

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getWorkoutHistory()
      .then(({ data }) => setWorkouts(data))
      .catch(() => setError('Failed to load workouts.'))
      .finally(() => setLoading(false));
  }, []);

  const muscleGroupData = useMemo(
    () => getMuscleGroupDistribution(workouts, (key) => MUSCLE_GROUP_LABELS[key] || key),
    [workouts],
  );

  const exerciseData = useMemo(
    () => getExerciseDistribution(workouts, (key) => getExerciseLabel(key)),
    [workouts],
  );

  const recentWorkouts = useMemo(() => workouts.slice(0, RECENT_LIMIT), [workouts]);

  const uniqueExercises = useMemo(
    () => new Set(workouts.map((w) => w.exercise)).size,
    [workouts],
  );

  const uniqueMuscleGroups = useMemo(
    () => new Set(workouts.map((w) => w.muscleGroup)).size,
    [workouts],
  );

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this workout?')) return;

    try {
      await deleteWorkout(id);
      setWorkouts((prev) => prev.filter((w) => w.id !== id));
    } catch {
      setError('Failed to delete workout.');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading">
          <div className="dashboard-loading__spinner" aria-hidden="true" />
          <p>Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  if (workouts.length === 0) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Your training overview at a glance</p>
          </div>
          <Link to="/add-workout" className="dashboard-btn">
            + Add Workout
          </Link>
        </div>

        <div className="dashboard-empty">
          <p>No workouts logged yet. Start tracking to see your stats here.</p>
          <Link to="/add-workout" className="dashboard-btn">
            Log your first workout
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Your training overview at a glance</p>
        </div>
        <Link to="/add-workout" className="dashboard-btn">
          + Add Workout
        </Link>
      </div>

      {error && (
        <div className="dashboard-alert" role="alert">
          {error}
        </div>
      )}

      <section className="dashboard-summary" aria-label="Workout summary">
        <div className="dashboard-summary-card">
          <span className="dashboard-summary-card__label">Total Workouts</span>
          <span className="dashboard-summary-card__value dashboard-summary-card__value--accent">
            {workouts.length}
          </span>
        </div>
        <div className="dashboard-summary-card">
          <span className="dashboard-summary-card__label">Exercises Done</span>
          <span className="dashboard-summary-card__value">{uniqueExercises}</span>
        </div>
        <div className="dashboard-summary-card">
          <span className="dashboard-summary-card__label">Muscle Groups</span>
          <span className="dashboard-summary-card__value">{uniqueMuscleGroups}</span>
        </div>
      </section>

      <section className="dashboard-charts" aria-label="Training distribution">
        <DistributionChart
          title="Muscle Group Split"
          subtitle="Which muscle groups you train the most"
          data={muscleGroupData}
          emptyMessage="Log workouts to see your muscle group distribution."
        />
        <DistributionChart
          title="Top Exercises"
          subtitle="Which exercises you perform the most"
          data={exerciseData}
          emptyMessage="Log workouts to see your exercise distribution."
        />
      </section>

      <section className="dashboard-recent" aria-label="Recent workouts">
        <div className="dashboard-recent__header">
          <h2>Recent Workouts</h2>
          <span>Last {recentWorkouts.length} sessions</span>
        </div>
        <div className="recent-workout-list">
          {recentWorkouts.map((workout) => (
            <RecentWorkoutItem
              key={workout.id}
              workout={workout}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
