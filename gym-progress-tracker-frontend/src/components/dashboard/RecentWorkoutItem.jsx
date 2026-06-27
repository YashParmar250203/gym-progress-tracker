import { MUSCLE_GROUP_LABELS } from '../../constants/enums';
import { getExerciseLabel } from '../../constants/exerciseLabels';
import { formatIsoToDisplay } from '../../utils/dateFormat';
import { getMaxWeight } from '../../utils/workoutStats';

export default function RecentWorkoutItem({ workout, onDelete }) {
  const maxWeight = getMaxWeight(workout.sets);
  const setCount = workout.sets?.length ?? 0;

  return (
    <article className="recent-workout">
      <div className="recent-workout__main">
        <div className="recent-workout__icon" aria-hidden="true">
          {MUSCLE_GROUP_LABELS[workout.muscleGroup]?.charAt(0) ?? '?'}
        </div>
        <div className="recent-workout__info">
          <h3>{getExerciseLabel(workout.exercise)}</h3>
          <div className="recent-workout__meta">
            <span className="recent-workout__badge">
              {MUSCLE_GROUP_LABELS[workout.muscleGroup]}
            </span>
            <span className="recent-workout__date">
              {formatIsoToDisplay(workout.workoutDate)}
            </span>
          </div>
        </div>
      </div>

      <div className="recent-workout__stats">
        <div className="recent-workout__stat">
          <span className="recent-workout__stat-label">Sets</span>
          <span className="recent-workout__stat-value">{setCount}</span>
        </div>
        <div className="recent-workout__stat">
          <span className="recent-workout__stat-label">Max</span>
          <span className="recent-workout__stat-value">{maxWeight} kg</span>
        </div>
        <button
          type="button"
          className="recent-workout__delete"
          onClick={() => onDelete(workout.id)}
          aria-label={`Delete ${getExerciseLabel(workout.exercise)} workout`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
