export function formatIsoToDisplay(isoDate) {
  if (!isoDate) return '';

  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) return isoDate;

  return `${day}/${month}/${year}`;
}

export function formatDateInput(value) {
  const digits = value.replace(/\D/g, '').slice(0, 8);

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export function parseDdMmYyyyToIso(value) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return null;

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);

  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function validateDateOfBirth(value) {
  if (!value.trim()) return 'Date of birth is required';
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return 'Use DD/MM/YYYY format';

  const iso = parseDdMmYyyyToIso(value);
  if (!iso) return 'Enter a valid date';

  const birth = new Date(iso);
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
