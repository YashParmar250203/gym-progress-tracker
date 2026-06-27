import { MUSCLE_GROUP_LABELS } from '../../constants/enums';
import { getExerciseLabel } from '../../constants/exerciseLabels';
import { formatIsoToDisplay } from '../../utils/dateFormat';
import { getMaxWeight } from '../../utils/workoutStats';

export default function WorkoutDayDetail({
  workoutDate,
  workouts,
  loading,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="workout-day-detail">
        <p className="workout-day-detail__loading">Loading workouts…</p>
      </div>
    );
  }

  if (workouts.length === 0) {
    return (
      <div className="workout-day-detail">
        <p className="workout-day-detail__empty">No workouts found for this date.</p>
      </div>
    );
  }

  return (
    <div className="workout-day-detail">
      <h3 className="workout-day-detail__title">
        {formatIsoToDisplay(workoutDate)}
      </h3>
      <div className="workout-day-detail__list">
        {workouts.map((workout) => {
          const setCount = workout.sets?.length ?? 0;
          const maxWeight = getMaxWeight(workout.sets);

          return (
            <article key={workout.id} className="workout-day-detail__item">
              <div className="workout-day-detail__item-header">
                <div>
                  <h4>{getExerciseLabel(workout.exercise)}</h4>
                  <span className="workout-day-detail__muscle">
                    {MUSCLE_GROUP_LABELS[workout.muscleGroup]}
                  </span>
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

              <div className="workout-day-detail__sets">
                {workout.sets?.map((set, index) => (
                  <span key={`${set.setNumber}-${index}`} className="workout-day-detail__set">
                    Set {set.setNumber}: {set.reps} reps · {set.weight} kg
                  </span>
                ))}
              </div>

              <div className="workout-day-detail__summary">
                <span>{setCount} sets</span>
                <span>Max {maxWeight} kg</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
