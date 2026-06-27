export default function FormField({
  id,
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  hint,
  required = false,
  disabled = false,
  autoComplete,
  inputMode,
  maxLength,
  className = '',
  children,
}) {
  const hasError = Boolean(error);
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const describedBy = [hasError ? errorId : null, hint && !hasError ? hintId : null]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div className={`form-field ${hasError ? 'form-field--error' : ''} ${className}`.trim()}>
      <label htmlFor={id} className="form-field__label">
        {label}
        {required && <span className="form-field__required" aria-hidden="true">*</span>}
      </label>

      {children ?? (
        <input
          id={id}
          className="form-field__input"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          aria-invalid={hasError}
          aria-describedby={describedBy}
        />
      )}

      {hint && !hasError && (
        <p id={hintId} className="form-field__hint">
          {hint}
        </p>
      )}

      {hasError && (
        <p id={errorId} className="form-field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
