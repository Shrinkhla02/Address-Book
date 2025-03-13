// src/utils/validation.js
import { COUNTRIES } from '../constants/countries';

export const validateField = (fieldName, value, country) => {
  const countryConfig = COUNTRIES[country];
  
  if (!countryConfig) {
    return { isValid: false, error: 'Invalid country' };
  }
  
  // Find the field configuration
  const fieldConfig = countryConfig.fields.find(field => field.name === fieldName);
  
  if (!fieldConfig) {
    return { isValid: false, error: 'Invalid field' };
  }
  
  // Check if required field is empty
  if (fieldConfig.required && (!value || value.trim() === '')) {
    return { isValid: false, error: `${fieldConfig.label} is required` };
  }
  
  // Check pattern validation if exists
  if (fieldConfig.pattern && value) {
    const regex = new RegExp(fieldConfig.pattern);
    if (!regex.test(value)) {
      return { isValid: false, error: `Invalid format for ${fieldConfig.label}` };
    }
  }
  
  // Check specific validations from country config
  if (countryConfig.validation && countryConfig.validation[fieldName] && value) {
    const regex = countryConfig.validation[fieldName];
    if (!regex.test(value)) {
      return { isValid: false, error: `Invalid format for ${fieldConfig.label}` };
    }
  }
  
  return { isValid: true, error: null };
};

export const validateForm = (formData, country) => {
  if (!country || !COUNTRIES[country]) {
    return { isValid: false, errors: { country: 'Please select a valid country' } };
  }
  
  const errors = {};
  let isValid = true;
  
  // Validate each field based on country configuration
  COUNTRIES[country].fields.forEach(field => {
    const { isValid: fieldValid, error } = validateField(field.name, formData[field.name], country);
    
    if (!fieldValid) {
      errors[field.name] = error;
      isValid = false;
    }
  });
  
  return { isValid, errors };
};