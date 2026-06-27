import { useState } from 'react';
import FormField from './FormField';

export default function PasswordField({
  id,
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  hint,
  required = false,
  autoComplete = 'current-password',
  showStrength = false,
}) {
  const [visible, setVisible] = useState(false);

  const strengthChecks = showStrength
    ? [
        { label: 'At least 8 characters', met: value.length >= 8 },
        { label: 'At most 50 characters', met: value.length <= 50 },
      ]
    : [];

  return (
    <FormField
      id={id}
      label={label}
      name={name}
      error={error}
      hint={!showStrength ? hint : undefined}
      required={required}
    >
      <div className="password-field">
        <input
          id={id}
          className="form-field__input password-field__input"
          type={visible ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Enter your password"
          required={required}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
        />
        <button
          type="button"
          className="password-field__toggle"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>

      {showStrength && value.length > 0 && (
        <ul className="password-strength" aria-label="Password requirements">
          {strengthChecks.map(({ label: checkLabel, met }) => (
            <li key={checkLabel} className={met ? 'met' : ''}>
              {checkLabel}
            </li>
          ))}
        </ul>
      )}
    </FormField>
  );
}
