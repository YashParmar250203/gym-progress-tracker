import { parseDdMmYyyyToIso, validateDateOfBirth } from '../dateFormat';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  const trimmed = email.trim();
  if (!trimmed) return 'Email is required';
  if (!EMAIL_REGEX.test(trimmed)) return 'Enter a valid email address';
  return '';
}

export function validatePassword(password) {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (password.length > 50) return 'Password must be at most 50 characters';
  return '';
}

export function validateFullName(fullName) {
  const trimmed = fullName.trim();
  if (!trimmed) return 'Full name is required';
  if (trimmed.length < 2) return 'Full name must be at least 2 characters';
  if (trimmed.length > 100) return 'Full name must be at most 100 characters';
  return '';
}

export function validateHeight(height) {
  if (height === '' || height === null || height === undefined) {
    return 'Height is required';
  }

  const value = parseFloat(height);
  if (Number.isNaN(value) || value <= 0) return 'Height must be a positive number';
  if (value < 50 || value > 300) return 'Enter a valid height between 50 and 300 cm';

  return '';
}

export function validateWeight(weight) {
  if (weight === '' || weight === null || weight === undefined) {
    return 'Weight is required';
  }

  const value = parseFloat(weight);
  if (Number.isNaN(value) || value <= 0) return 'Weight must be a positive number';
  if (value < 20 || value > 500) return 'Enter a valid weight between 20 and 500 kg';

  return '';
}

export function validateFitnessGoal(fitnessGoal) {
  if (!fitnessGoal) return 'Fitness goal is required';
  return '';
}

export function validateGender(gender) {
  if (!gender) return 'Gender is required';
  return '';
}

export function validateLoginForm({ email, password }) {
  const errors = {};

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  return errors;
}

export function validateRegisterField(name, value) {
  switch (name) {
    case 'email':
      return validateEmail(value);
    case 'password':
      return validatePassword(value);
    case 'fullName':
      return validateFullName(value);
    case 'height':
      return validateHeight(value);
    case 'weight':
      return validateWeight(value);
    case 'dateOfBirth':
      return validateDateOfBirth(value);
    case 'fitnessGoal':
      return validateFitnessGoal(value);
    case 'gender':
      return validateGender(value);
    default:
      return '';
  }
}

export function validateRegisterForm(form) {
  const fields = [
    'fullName',
    'email',
    'password',
    'dateOfBirth',
    'height',
    'weight',
    'fitnessGoal',
    'gender',
  ];

  return fields.reduce((errors, field) => {
    const error = validateRegisterField(field, form[field]);
    if (error) errors[field] = error;
    return errors;
  }, {});
}

export function buildRegisterPayload(form) {
  const isoDate = parseDdMmYyyyToIso(form.dateOfBirth);

  return {
    email: form.email.trim(),
    password: form.password,
    fullName: form.fullName.trim(),
    height: parseFloat(form.height),
    weight: parseFloat(form.weight),
    dateOfBirth: isoDate,
    fitnessGoal: form.fitnessGoal,
    gender: form.gender,
  };
}
