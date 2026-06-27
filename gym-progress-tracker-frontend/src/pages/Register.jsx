import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { register } from '../api/authApi';
import { isAuthenticated } from '../utils/auth';
import { FITNESS_GOALS, GENDERS } from '../constants/enums';
import {
  buildRegisterPayload,
  validateRegisterField,
  validateRegisterForm,
} from '../utils/validation/authValidation';
import AuthBrandPanel from '../components/auth/AuthBrandPanel';
import DateInput from '../components/auth/DateInput';
import FormField from '../components/auth/FormField';
import PasswordField from '../components/auth/PasswordField';
import '../styles/auth.css';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  password: '',
  dateOfBirth: '',
  height: '',
  weight: '',
  fitnessGoal: 'MUSCLE_GAIN',
  gender: 'MALE',
};

export default function Register() {
  const navigate = useNavigate();
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
      setErrors((prev) => ({
        ...prev,
        [name]: validateRegisterField(name, value),
      }));
    }

    if (formError) setFormError('');
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateRegisterField(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const validationErrors = validateRegisterForm(form);
    setErrors(validationErrors);
    setTouched(
      Object.keys(INITIAL_FORM).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    );

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      await register(buildRegisterPayload(form));
      navigate('/login', {
        state: { message: 'Account created successfully! Please sign in.' },
      });
    } catch (err) {
      setFormError(
        err.response?.data?.message || 'Registration failed. Please check your details and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <AuthBrandPanel
        title="Start your fitness journey"
        subtitle="Create your profile and begin logging workouts with precision."
      />

      <main className="auth-main">
        <div className="auth-form-panel auth-form-panel--wide">
          <div className="auth-mobile-brand">
            <span className="auth-mobile-brand__icon">⚡</span>
            GymTracker
          </div>

          <div className="auth-form-header">
            <h1>Create your account</h1>
            <p>Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            {formError && (
              <div className="auth-alert auth-alert--error" role="alert">
                {formError}
              </div>
            )}

            <div className="auth-form-grid">
              <FormField
                id="register-fullName"
                label="Full name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John Doe"
                error={touched.fullName ? errors.fullName : ''}
                required
                autoComplete="name"
                className="form-field--full"
              />

              <FormField
                id="register-email"
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
                id="register-password"
                label="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password ? errors.password : ''}
                required
                autoComplete="new-password"
                showStrength
              />

              <DateInput
                id="register-dob"
                label="Date of birth"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.dateOfBirth ? errors.dateOfBirth : ''}
                required
              />

              <FormField
                id="register-height"
                label="Height (cm)"
                type="number"
                name="height"
                value={form.height}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="175"
                error={touched.height ? errors.height : ''}
                required
                inputMode="decimal"
              />

              <FormField
                id="register-weight"
                label="Weight (kg)"
                type="number"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="70"
                error={touched.weight ? errors.weight : ''}
                required
                inputMode="decimal"
              />

              <FormField
                id="register-fitnessGoal"
                label="Fitness goal"
                name="fitnessGoal"
                error={touched.fitnessGoal ? errors.fitnessGoal : ''}
                required
              >
                <select
                  id="register-fitnessGoal"
                  className="form-field__select"
                  name="fitnessGoal"
                  value={form.fitnessGoal}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-invalid={Boolean(touched.fitnessGoal && errors.fitnessGoal)}
                >
                  {FITNESS_GOALS.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                id="register-gender"
                label="Gender"
                name="gender"
                error={touched.gender ? errors.gender : ''}
                required
              >
                <select
                  id="register-gender"
                  className="form-field__select"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  aria-invalid={Boolean(touched.gender && errors.gender)}
                >
                  {GENDERS.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="auth-btn__spinner" aria-hidden="true" />
                  Creating account…
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="auth-form-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
