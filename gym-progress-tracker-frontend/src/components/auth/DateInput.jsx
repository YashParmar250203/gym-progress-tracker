import FormField from './FormField';
import { formatDateInput } from '../../utils/dateFormat';

export default function DateInput({
  id,
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  required = false,
}) {
  const handleChange = (e) => {
    onChange({
      target: {
        name,
        value: formatDateInput(e.target.value),
      },
    });
  };

  return (
    <FormField
      id={id}
      label={label}
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      placeholder="DD/MM/YYYY"
      error={error}
      hint="Format: DD/MM/YYYY"
      required={required}
      inputMode="numeric"
      maxLength={10}
      autoComplete="bday"
    />
  );
}
