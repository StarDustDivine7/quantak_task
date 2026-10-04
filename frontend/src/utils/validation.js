export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateTitle = (title) => {
  if (!validateRequired(title)) {
    return 'Title is required';
  }
  if (title.length > 200) {
    return 'Title must be less than 200 characters';
  }
  return '';
};

export const validateDescription = (description) => {
  if (!validateRequired(description)) {
    return 'Description is required';
  }
  if (description.length > 2000) {
    return 'Description must be less than 2000 characters';
  }
  return '';
};

export const validateEmailField = (email) => {
  if (!validateRequired(email)) {
    return 'Email is required';
  }
  if (!validateEmail(email)) {
    return 'Please enter a valid email address';
  }
  return '';
};
