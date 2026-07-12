import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  deleteWorkout,
  getDashboard,
  getWorkoutsByDate,
} from '../api/workoutApi';
import DistributionChart from '../components/dashboard/DistributionChart';
import RecentWorkoutItem from '../components/dashboard/RecentWorkoutItem';
import WorkoutDayDetail from '../components/dashboard/WorkoutDayDetail';
import { MUSCLE_GROUP_LABELS } from '../constants/enums';
import { getExerciseLabel } from '../constants/exerciseLabels';
import {
  getExerciseDistribution,
  getMuscleGroupDistribution, 
} from '../utils/workoutStats';
import '../styles/dashboard.css';

const RECENT_LIMIT = 8;

export default function Dashboard() {
  const [summary, setSummary] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dayWorkouts, setDayWorkouts] = useState([]);
  const [dayLoading, setDayLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboardData = useCallback(async () => {
    const { data } = await getDashboard();
    setSummary(data.summary);
    setWorkouts(data.workouts);
  }, []);

  useEffect(() => {
    loadDashboardData()
      .catch(() => setError('Failed to load workouts.'))
      .finally(() => setLoading(false));
  }, [loadDashboardData]);

  useEffect(() => {
    if (!selectedDate) {
      setDayWorkouts([]);
      return;
    }

    setDayLoading(true);
    getWorkoutsByDate(selectedDate)
      .then(({ data }) => setDayWorkouts(data))
      .catch(() => setError('Failed to load workouts for this date.'))
      .finally(() => setDayLoading(false));
  }, [selectedDate]);

  const muscleGroupData = useMemo(
    () => getMuscleGroupDistribution(workouts, (key) => MUSCLE_GROUP_LABELS[key] || key),
    [workouts],
  );

  const exerciseData = useMemo(
    () => getExerciseDistribution(workouts, (key) => getExerciseLabel(key)),
    [workouts],
  );

  const recentWorkouts = useMemo(() => summary.slice(0, RECENT_LIMIT), [summary]);

  const totalExercisesDone = useMemo(
    () => summary.reduce((sum, entry) => sum + entry.totalExercises, 0),
    [summary],
  );

  const uniqueMuscleGroups = useMemo(
    () => new Set(workouts.map((w) => w.muscleGroup)).size,
    [workouts],
  );

  const handleSelectDate = (date) => {
    setSelectedDate((prev) => (prev === date ? null : date));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this workout?')) return;

    try {
      await deleteWorkout(id);
      await loadDashboardData();

      if (selectedDate) {
        const { data } = await getWorkoutsByDate(selectedDate);
        setDayWorkouts(data);
        if (data.length === 0) {
          setSelectedDate(null);
        }
      }
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

  if (summary.length === 0) {
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
            {summary.length}
          </span>
        </div>
        <div className="dashboard-summary-card">
          <span className="dashboard-summary-card__label">Exercises Done</span>
          <span className="dashboard-summary-card__value">{totalExercisesDone}</span>
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
          {recentWorkouts.map((entry, index) => (
            <RecentWorkoutItem
              key={`${entry.workoutDate}-${index}`}
              summary={entry}
              isSelected={selectedDate === entry.workoutDate}
              onSelect={handleSelectDate}
            />
          ))}
        </div>
        {selectedDate && (
          <WorkoutDayDetail
            workoutDate={selectedDate}
            workouts={dayWorkouts}
            loading={dayLoading}
            onDelete={handleDelete}
          />
        )}
      </section>
    </div>
  );
}
