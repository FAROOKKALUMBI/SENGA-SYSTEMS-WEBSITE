import { useState } from 'react';

const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  name: /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[\s'-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/,
  phone: /^[0-9+()\s-]+$/,
};

export const validators = {
  email: (value) => patterns.email.test(value) ? '' : 'Please enter a valid email address.',
  name: (value) => value.length >= 2 && patterns.name.test(value) ? '' : 'Use at least 2 letters; spaces, hyphens and apostrophes are allowed.',
  phone: (value) => {
    const digits = value.replace(/\D/g, '');
    return patterns.phone.test(value) && digits.length >= 7 && digits.length <= 15 ? '' : 'Enter a valid phone number with 7–15 digits.';
  },
  message: (value) => value.length >= 10 ? '' : 'Please enter at least 10 characters.',
  password: (value) => /[A-Za-z]/.test(value) && /\d/.test(value) && value.length >= 8 ? '' : 'Use 8+ characters with at least one letter and number.',
  required: (value) => value ? '' : 'This field is required.',
  amount: (value) => Number(value) > 0 ? '' : 'Enter an amount greater than zero.',
};

export function useFormValidation(schema) {
  const [errors, setErrors] = useState({});
  const validate = (name, rawValue) => {
    const value = String(rawValue ?? '').trim();
    const rule = schema[name];
    if (!rule) return '';
    const error = !value && !rule.required ? '' : (validators[rule.type || 'required']?.(value) || '');
    setErrors((current) => ({ ...current, [name]: error }));
    return error;
  };
  const validateAll = (values) => {
    const next = {};
    Object.keys(schema).forEach((name) => {
      const value = String(values[name] ?? '').trim();
      const rule = schema[name];
      next[name] = !value && !rule.required ? '' : (validators[rule.type || 'required']?.(value) || '');
    });
    setErrors(next);
    return !Object.values(next).some(Boolean);
  };
  const fieldProps = (name, value) => ({
    onBlur: () => validate(name, value),
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });
  return { errors, validateAll, fieldProps };
}

export function FieldError({ name, error }) {
  return error ? <p id={`${name}-error`} role="alert" className="form-field-error">{error}</p> : null;
}
