import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';
import { setToken, isAuthenticated } from '../utils/auth';
import { validateLoginForm } from '../utils/validation/authValidation';
import AuthBrandPanel from '../components/auth/AuthBrandPanel';
import FormField from '../components/auth/FormField';
import PasswordField from '../components/auth/PasswordField';
import '../styles/auth.css';

const INITIAL_FORM = { email: '', password: '' };

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const nextErrors = validateLoginForm({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: nextErrors[name] }));
    }

    if (formError) setFormError('');
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const nextErrors = validateLoginForm(form);
    setErrors((prev) => ({ ...prev, [name]: nextErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const validationErrors = validateLoginForm(form);
    setErrors(validationErrors);
    setTouched({ email: true, password: true });

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      const { data } = await login(form.email.trim(), form.password);
      setToken(data.token);
      navigate('/');
    } catch (err) {
      setFormError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <AuthBrandPanel
        title="Train smarter. Lift heavier."
        subtitle="Log workouts, track PRs, and watch your strength climb — all in one place."
      />

      <main className="auth-main">
        <div className="auth-form-panel">
          <div className="auth-mobile-brand">
            <span className="auth-mobile-brand__icon">⚡</span>
            GymTracker
          </div>

          <div className="auth-form-header">
            <h1>Welcome back</h1>
            <p>Sign in to continue tracking your progress</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {successMessage && (
              <div className="auth-alert auth-alert--success" role="status">
                {successMessage}
              </div>
            )}

            {formError && (
              <div className="auth-alert auth-alert--error" role="alert">
                {formError}
              </div>
            )}

            <FormField
              id="login-email"
              label="Email address"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@example.com"
              error={touched.email ? errors.email : ''}
              required
              autoComplete="email"
            />

            <PasswordField
              id="login-password"
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password ? errors.password : ''}
              required
              autoComplete="current-password"
            />

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="auth-btn__spinner" aria-hidden="true" />
                  Signing in…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="auth-form-footer">
            Don&apos;t have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
