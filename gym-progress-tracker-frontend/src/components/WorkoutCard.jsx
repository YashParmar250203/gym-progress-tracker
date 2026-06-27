import { MUSCLE_GROUP_LABELS } from '../constants/enums';
import { getExerciseLabel } from '../constants/exerciseLabels';

export default function WorkoutCard({ workout, onDelete }) {
  const totalVolume = workout.sets?.reduce(
    (sum, set) => sum + set.weight * set.reps,
    0,
  );

  return (
    <article className="workout-card">
      <div className="workout-card-header">
        <div>
          <h3>{getExerciseLabel(workout.exercise)}</h3>
          <p className="text-muted">
            {MUSCLE_GROUP_LABELS[workout.muscleGroup]} · {workout.workoutDate}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(workout.id)}
        >
          Delete
        </button>
      </div>
      <div className="sets-grid">
        {workout.sets?.map((set) => (
          <div key={set.setNumber} className="set-chip">
            <span className="set-number">Set {set.setNumber}</span>
            <span>{set.reps} reps</span>
            <span>{set.weight} kg</span>
          </div>
        ))}
      </div>
      {totalVolume > 0 && (
        <p className="workout-volume">Total volume: {totalVolume.toFixed(1)} kg</p>
      )}
    </article>
  );
}
