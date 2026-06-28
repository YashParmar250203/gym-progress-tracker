import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addWorkout } from '../api/workoutApi';
import { getExercisesByMuscleGroup, getMuscleGroups } from '../api/exerciseApi';
import { MUSCLE_GROUP_LABELS } from '../constants/enums';
import { getExerciseLabel } from '../constants/exerciseLabels';
import DatePickerField from '../components/DatePickerField';
import { getTodayIso } from '../utils/dateFormat';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import '../styles/addWorkout.css';
import absImg from '../images/abs.png';
import backImg from '../images/back.png';
import bicepsImg from '../images/biceps.png';
import chestImg from '../images/chest.png';
import forearmsImg from '../images/forearms.png';
import legsImg from '../images/legs.png';
import shouldersImg from '../images/shoulders.png';
import tricepsImg from '../images/triceps.png';

const MUSCLE_GROUP_IMAGES = {
  CHEST: chestImg,
  BACK: backImg,
  SHOULDERS: shouldersImg,
  BICEPS: bicepsImg,
  TRICEPS: tricepsImg,
  LEGS: legsImg,
  ABS: absImg,
  FOREARMS: forearmsImg,
};

const emptySet = (setNumber) => ({ setNumber, reps: '', weight: '' });

const API_BASE = 'http://localhost:8080';

// ── Recharts custom tooltip ──────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#1e2235',
      border: '1px solid #2a2f45',
      borderRadius: 8,
      padding: '8px 14px',
    }}>
      <p style={{ color: '#9ca3af', fontSize: 12, margin: '0 0 2px' }}>{label}</p>
      <p style={{ color: '#FF6B35', fontSize: 15, fontWeight: 600, margin: 0 }}>
        {payload[0].value} kg
      </p>
    </div>
  );
};

export default function AddWorkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState('groups');
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [muscleGroup, setMuscleGroup] = useState('');
  const [exercise, setExercise] = useState('');
  const [workoutDate, setWorkoutDate] = useState(getTodayIso);
  const [sets, setSets] = useState([emptySet(1)]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingExercises, setLoadingExercises] = useState(false);

  // analytics + history state
  const [analytics, setAnalytics] = useState(null);
  const [history, setHistory] = useState([]);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    getMuscleGroups()
      .then(({ data }) => setMuscleGroups(data))
      .catch(() => setError('Failed to load muscle groups.'));
  }, []);

  // fetch analytics + history whenever an exercise is selected
  useEffect(() => {
    if (!exercise) return;

    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    setLoadingAnalytics(true);
    axios
      .get(`${API_BASE}/analytics/exercise/${exercise}`, { headers })
      .then(({ data }) => setAnalytics(data))
      .catch(() => setAnalytics(null))
      .finally(() => setLoadingAnalytics(false));

    setLoadingHistory(true);
    axios
      .get(`${API_BASE}/workout/exercise/${exercise}`, { headers })
      .then(({ data }) => setHistory(data))
      .catch(() => setHistory([]))
      .finally(() => setLoadingHistory(false));
  }, [exercise]);

  const selectMuscleGroup = (mg) => {
    setError('');
    setMuscleGroup(mg);
    setExercise('');
    setLoadingExercises(true);
    setStep('exercises');

    getExercisesByMuscleGroup(mg)
      .then(({ data }) => setExercises(data))
      .catch(() => setError('Failed to load exercises.'))
      .finally(() => setLoadingExercises(false));
  };

  const selectExercise = (ex) => {
    setError('');
    setExercise(ex);
    setSets([emptySet(1)]);
    setAnalytics(null);
    setHistory([]);
    setStep('log');
  };

  const goBackToGroups = () => {
    setError('');
    setMuscleGroup('');
    setExercise('');
    setExercises([]);
    setStep('groups');
  };

  const goBackToExercises = () => {
    setError('');
    setExercise('');
    setSets([emptySet(1)]);
    setStep('exercises');
  };

  const updateSet = (index, field, value) => {
    setSets((prev) =>
      prev.map((set, i) => (i === index ? { ...set, [field]: value } : set)),
    );
  };

  const addSet = () => {
    setSets((prev) => [...prev, emptySet(prev.length + 1)]);
  };

  const removeSet = (index) => {
    if (sets.length <= 1) return;
    setSets((prev) =>
      prev.filter((_, i) => i !== index).map((set, i) => ({ ...set, setNumber: i + 1 })),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const payload = {
        muscleGroup,
        exercise,
        workoutDate,
        sets: sets.map((set) => ({
          setNumber: set.setNumber,
          reps: parseInt(set.reps, 10),
          weight: parseFloat(set.weight),
        })),
      };

      await addWorkout(payload);
      setSuccess('Workout saved successfully!');
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save workout.');
    } finally {
      setLoading(false);
    }
  };

  // ── Step: muscle groups ────────────────────────────────────────────────────
  const renderGroupsStep = () => (
    <>
      <div className="page-header">
        <div>
          <h1>Add Workout</h1>
          <p className="text-muted">Choose a muscle group to get started</p>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {muscleGroups.length === 0 && !error ? (
        <div className="loading-state">Loading muscle groups…</div>
      ) : (
        <div className="muscle-group-grid" role="list">
          {muscleGroups.map((mg) => (
            <button
              key={mg}
              type="button"
              className="muscle-group-card"
              role="listitem"
              onClick={() => selectMuscleGroup(mg)}
            >
              <div className="muscle-group-card__media">
                {MUSCLE_GROUP_IMAGES[mg] && (
                  <img src={MUSCLE_GROUP_IMAGES[mg]} alt="" className="muscle-group-card__image" />
                )}
              </div>
              <div className="muscle-group-card__label">{MUSCLE_GROUP_LABELS[mg]}</div>
            </button>
          ))}
        </div>
      )}
    </>
  );

  // ── Step: exercises ────────────────────────────────────────────────────────
  const renderExercisesStep = () => (
    <>
      <div className="add-workout-header">
        <button type="button" className="add-workout-back" onClick={goBackToGroups}>
          ← Muscle groups
        </button>
        <div className="page-header">
          <div>
            <h1>{MUSCLE_GROUP_LABELS[muscleGroup]}</h1>
            <p className="text-muted">Select an exercise to log</p>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {loadingExercises ? (
        <div className="loading-state">Loading exercises…</div>
      ) : exercises.length === 0 ? (
        <div className="empty-state">No exercises found for this muscle group.</div>
      ) : (
        <div className="exercise-grid" role="list">
          {exercises.map((ex) => (
            <button
              key={ex}
              type="button"
              className="selection-card"
              role="listitem"
              onClick={() => selectExercise(ex)}
            >
              <span className="selection-card__label">{getExerciseLabel(ex)}</span>
              <span className="selection-card__hint">Tap to log sets</span>
            </button>
          ))}
        </div>
      )}
    </>
  );

  // ── Step: log (the main new layout) ───────────────────────────────────────
  const renderLogStep = () => {
    const chartData = analytics?.progress?.map((p) => ({
      date: p.date,
      maxWeight: p.maxWeight,
    })) ?? [];

    return (
      <>
        {/* back nav */}
        <div className="add-workout-header">
          <button type="button" className="add-workout-back" onClick={goBackToExercises}>
            ← {MUSCLE_GROUP_LABELS[muscleGroup]} exercises
          </button>
          <div className="page-header">
            <div>
              <h1>{getExerciseLabel(exercise)}</h1>
              <p className="text-muted">{MUSCLE_GROUP_LABELS[muscleGroup]}</p>
            </div>
          </div>
        </div>

        {/* ── TOP 60% — log form + progress chart side by side ── */}
        <div className="log-top-row">

          {/* LEFT 50% — log form */}
          <div className="log-form-panel">
            <form onSubmit={handleSubmit} className="form-card">
              {error && <div className="alert alert-error">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <div className="form-section-title">Log workout</div>

              <div className="form-grid">
                <DatePickerField
                  id="workout-date"
                  label="Workout Date"
                  name="workoutDate"
                  value={workoutDate}
                  onChange={(e) => setWorkoutDate(e.target.value)}
                  required
                  hint="Defaults to today — change if logging a past session"
                />
              </div>

              <div className="sets-section">
                <div className="sets-section-header">
                  <h2>Sets</h2>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={addSet}>
                    + Add set
                  </button>
                </div>

                <div className="sets-table">
                  <div className="sets-table-head">
                    <span>Set</span>
                    <span>Reps</span>
                    <span>Weight (kg)</span>
                    <span></span>
                  </div>
                  {sets.map((set, index) => (
                    <div key={set.setNumber} className="sets-table-row">
                      <span className="set-label">{set.setNumber}</span>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={set.reps}
                        onChange={(e) => updateSet(index, 'reps', e.target.value)}
                        placeholder="10"
                        required
                      />
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={set.weight}
                        onChange={(e) => updateSet(index, 'weight', e.target.value)}
                        placeholder="60"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => removeSet(index)}
                        disabled={sets.length <= 1}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-ghost" onClick={() => navigate('/')}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving…' : 'Save Workout'}
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT 50% — progress chart */}
          <div className="log-chart-panel">
            <div className="panel-card">
              <div className="panel-card__header">
                <span className="panel-card__title">Progress</span>
                {analytics && (
                  <div className="analytics-stats">
                    <div className="stat-pill">
                      <span className="stat-pill__label">PR</span>
                      <span className="stat-pill__value">{analytics.maxWeight} kg</span>
                    </div>
                    <div className="stat-pill">
                      <span className="stat-pill__label">Current</span>
                      <span className="stat-pill__value">{analytics.currentWeight} kg</span>
                    </div>
                    <div className="stat-pill">
                      <span className="stat-pill__label">Sessions</span>
                      <span className="stat-pill__value">{analytics.totalWorkouts}</span>
                    </div>
                  </div>
                )}
              </div>

              {loadingAnalytics ? (
                <div className="loading-state">Loading progress…</div>
              ) : chartData.length === 0 ? (
                <div className="empty-state">
                  No progress data yet — save your first set to see the graph.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={chartData} margin={{ top: 8, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2f45" />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                      tickLine={false}
                      axisLine={{ stroke: 'var(--border)' }}
                      angle={-35}
                      textAnchor="end"
                      height={50}
                    />
                    <YAxis
                      tick={{ fill: '#9ca3af', fontSize: 11 }}
                      tickLine={false}
                      axisLine={false}
                      unit=" kg"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="maxWeight"
                      stroke="#FF6B35"
                      strokeWidth={2.5}
                      dot={{ fill: '#FF6B35', r: 4, strokeWidth: 0 }}
                      activeDot={{ r: 6, fill: '#FF6B35' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* ── BOTTOM 40% — past sessions ── */}
        <div className="log-history-row">
          <div className="panel-card">
            <div className="panel-card__header">
              <span className="panel-card__title">Past sessions</span>
            </div>

            {loadingHistory ? (
              <div className="loading-state">Loading history…</div>
            ) : history.length === 0 ? (
              <div className="empty-state">No previous sessions recorded for this exercise.</div>
            ) : (
              <div className="history-list">
                {history.map((entry) => (
                  <div key={entry.id} className="history-card">
                    <div className="history-card__date">{entry.workoutDate}</div>
                    <div className="history-card__sets">
                      {entry.sets.map((s) => (
                        <div key={s.setNumber} className="history-set">
                          <span className="history-set__num">Set {s.setNumber}</span>
                          <span className="history-set__detail">{s.reps} reps</span>
                          <span className="history-set__weight">{s.weight} kg</span>
                        </div>
                      ))}
                    </div>
                    <div className="history-card__meta">
                      Max: <strong>
                        {Math.max(...entry.sets.map((s) => s.weight))} kg
                      </strong>
                      &nbsp;·&nbsp;
                      {entry.sets.length} sets
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className={`page${step === 'groups' ? ' add-workout-page--wide' : ''}`}>
      {step === 'groups' && renderGroupsStep()}
      {step === 'exercises' && renderExercisesStep()}
      {step === 'log' && renderLogStep()}
    </div>
  );
}
