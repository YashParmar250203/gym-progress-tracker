function toIsoDate(year, month, day) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function parseIsoDate(isoDate) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return null;

  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

export function getTodayIso() {
  const today = new Date();
  return toIsoDate(today.getFullYear(), today.getMonth() + 1, today.getDate());
}

export function getYesterdayIso() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return toIsoDate(
    yesterday.getFullYear(),
    yesterday.getMonth() + 1,
    yesterday.getDate(),
  );
}

export function getMinBirthDateIso() {
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 120);
  return toIsoDate(minDate.getFullYear(), minDate.getMonth() + 1, minDate.getDate());
}

export function formatIsoToDisplay(isoDate) {
  if (!isoDate) return '';

  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) return isoDate;

  return `${day}/${month}/${year}`;
}

export function validateDateOfBirth(value) {
  if (!value?.trim()) return 'Date of birth is required';

  const birth = parseIsoDate(value);
  if (!birth) return 'Enter a valid date';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (birth >= today) return 'Date of birth must be in the past';

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }

  if (age < 13) return 'You must be at least 13 years old';
  if (age > 120) return 'Please enter a valid date of birth';

  return '';
}
