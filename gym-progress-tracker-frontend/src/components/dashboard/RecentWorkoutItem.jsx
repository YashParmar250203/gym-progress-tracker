import { formatIsoToDisplay } from '../../utils/dateFormat';

export default function RecentWorkoutItem({ summary, isSelected, onSelect }) {
  const exerciseLabel =
    summary.totalExercises === 1 ? '1 exercise' : `${summary.totalExercises} exercises`;

  return (
    <button
      type="button"
      className={`recent-workout recent-workout--selectable${isSelected ? ' recent-workout--selected' : ''}`}
      onClick={() => onSelect(summary.workoutDate)}
      aria-pressed={isSelected}
    >
      <div className="recent-workout__main">
        <div className="recent-workout__icon" aria-hidden="true">
          {summary.workoutDate.split('-')[2]}
        </div>
        <div className="recent-workout__info">
          <h3>{formatIsoToDisplay(summary.workoutDate)}</h3>
          <div className="recent-workout__meta">
            <span className="recent-workout__badge">{exerciseLabel}</span>
          </div>
        </div>
      </div>

      <span className="recent-workout__chevron" aria-hidden="true">
        {isSelected ? '▲' : '▼'}
      </span>
    </button>
  );
}
