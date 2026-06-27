import FormField from './auth/FormField';

export default function DatePickerField({
  id,
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  hint,
  required = false,
  disabled = false,
  min,
  max,
  variant = 'default',
}) {
  const input = (
    <input
      id={id}
      className={variant === 'auth' ? 'form-field__input date-picker-input' : 'date-picker-input'}
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      required={required}
      disabled={disabled}
      min={min}
      max={max}
      aria-invalid={Boolean(error)}
    />
  );

  if (variant === 'auth') {
    return (
      <FormField
        id={id}
        label={label}
        name={name}
        error={error}
        hint={hint}
        required={required}
      >
        {input}
      </FormField>
    );
  }

  return (
    <label className={`date-picker-field${error ? ' date-picker-field--error' : ''}`}>
      {label}
      {required && <span className="date-picker-field__required" aria-hidden="true"> *</span>}
      {input}
      {hint && !error && <span className="date-picker-field__hint">{hint}</span>}
      {error && (
        <span className="date-picker-field__error" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
