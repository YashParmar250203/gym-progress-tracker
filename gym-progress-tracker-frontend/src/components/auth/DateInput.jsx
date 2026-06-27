import DatePickerField from '../DatePickerField';
import { getMinBirthDateIso, getYesterdayIso } from '../../utils/dateFormat';

export default function DateInput({
  id,
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  min = getMinBirthDateIso(),
  max = getYesterdayIso(),
}) {
  return (
    <DatePickerField
      id={id}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      required={required}
      min={min}
      max={max}
      variant="auth"
    />
  );
}
