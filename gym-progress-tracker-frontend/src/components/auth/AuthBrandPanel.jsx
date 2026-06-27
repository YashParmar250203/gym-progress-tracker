export default function AuthBrandPanel({ title, subtitle }) {
  return (
    <aside className="auth-brand-panel" aria-hidden="true">
      <div className="auth-brand-panel__glow" />
      <div className="auth-brand-panel__content">
        <div className="auth-brand-panel__logo">
          <span className="auth-brand-panel__icon">⚡</span>
          <span>GymTracker</span>
        </div>
        <h2 className="auth-brand-panel__title">{title}</h2>
        <p className="auth-brand-panel__subtitle">{subtitle}</p>
        <ul className="auth-brand-panel__features">
          <li>Track every set, rep, and PR</li>
          <li>Visualize strength progress over time</li>
          <li>Built for serious lifters</li>
        </ul>
      </div>
    </aside>
  );
}
