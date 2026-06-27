import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addWorkout } from '../api/workoutApi';
import { getExercisesByMuscleGroup, getMuscleGroups } from '../api/exerciseApi';
import { MUSCLE_GROUP_LABELS } from '../constants/enums';
import { getExerciseLabel } from '../constants/exerciseLabels';

const emptySet = (setNumber) => ({ setNumber, reps: '', weight: '' });

export default function AddWorkout() {
  const navigate = useNavigate();
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [muscleGroup, setMuscleGroup] = useState('');
  const [exercise, setExercise] = useState('');
  const [workoutDate, setWorkoutDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [sets, setSets] = useState([emptySet(1)]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Add Workout</h1>
          <p className="text-muted">Log a new training session</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-card">
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="form-grid">
          <label>
            Muscle Group
            <select
              value={muscleGroup}
              onChange={(e) => setMuscleGroup(e.target.value)}
              required
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
              required
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

          <label>
            Workout Date
            <input
              type="date"
              value={workoutDate}
              onChange={(e) => setWorkoutDate(e.target.value)}
              required
            />
          </label>
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
    </div>
  );
}
