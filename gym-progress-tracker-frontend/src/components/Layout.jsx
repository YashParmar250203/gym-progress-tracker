import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <header className="navbar">
        <NavLink to="/" className="navbar-brand">
          <span className="brand-icon">⚡</span>
          GymTracker
        </NavLink>
        <nav className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Dashboard
          </NavLink>
          <NavLink to="/add-workout" className={({ isActive }) => (isActive ? 'active' : '')}>
            Add Workout
          </NavLink>
          <NavLink to="/analytics" className={({ isActive }) => (isActive ? 'active' : '')}>
            Analytics
          </NavLink>
        </nav>
        <button type="button" className="btn btn-ghost btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
