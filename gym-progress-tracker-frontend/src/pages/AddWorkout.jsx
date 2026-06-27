import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addWorkout } from '../api/workoutApi';
import { getExercisesByMuscleGroup, getMuscleGroups } from '../api/exerciseApi';
import { MUSCLE_GROUP_LABELS } from '../constants/enums';
import { getExerciseLabel } from '../constants/exerciseLabels';
import DatePickerField from '../components/DatePickerField';
import { getTodayIso } from '../utils/dateFormat';
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

  useEffect(() => {
    getMuscleGroups()
      .then(({ data }) => setMuscleGroups(data))
      .catch(() => setError('Failed to load muscle groups.'));
  }, []);

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
                  <img
                    src={MUSCLE_GROUP_IMAGES[mg]}
                    alt=""
                    className="muscle-group-card__image"
                  />
                )}
              </div>
              <div className="muscle-group-card__label">
                {MUSCLE_GROUP_LABELS[mg]}
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );

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

  const renderLogStep = () => (
    <>
      <div className="add-workout-header">
        <button type="button" className="add-workout-back" onClick={goBackToExercises}>
          ← {MUSCLE_GROUP_LABELS[muscleGroup]} exercises
        </button>
        <div className="page-header">
          <div>
            <h1>Log Workout</h1>
            <p className="text-muted">Record your sets and weight</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-card">
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="add-workout-form-header">
          <h2>{getExerciseLabel(exercise)}</h2>
          <p className="add-workout-form-meta">
            {MUSCLE_GROUP_LABELS[muscleGroup]}
          </p>
        </div>

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
              + Add Set
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
                  value={set.reps}
                  onChange={(e) => updateSet(index, 'reps', e.target.value)}
                  placeholder="10"
                  required
                />
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
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
    </>
  );

  return (
    <div className={`page${step === 'groups' ? ' add-workout-page--wide' : ''}`}>
      {step === 'groups' && renderGroupsStep()}
      {step === 'exercises' && renderExercisesStep()}
      {step === 'log' && renderLogStep()}
    </div>
  );
}
