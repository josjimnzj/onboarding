import { useCallback } from 'react';
import { useOnboarding } from '../context/OnboardingContext';
import { ERROR_MESSAGES } from '../constants/onboarding';

export const useFormValidation = () => {
  const { state, dispatch } = useOnboarding();
  const { formData, errors } = state;

  const validateField = useCallback((field, value) => {
    let error = null;

    switch (field) {
      case 'documentNumber':
        if (!value) {
          error = ERROR_MESSAGES.REQUIRED_FIELD;
        } else if (!/^\d{8,12}$/.test(value)) {
          error = ERROR_MESSAGES.INVALID_DOCUMENT;
        }
        break;
      case 'otp':
        if (!value) {
          error = ERROR_MESSAGES.REQUIRED_FIELD;
        } else if (!/^\d{6}$/.test(value)) {
          error = ERROR_MESSAGES.INVALID_OTP;
        }
        break;
      default:
        if (!value) {
          error = ERROR_MESSAGES.REQUIRED_FIELD;
        }
    }

    return error;
  }, []);

  const validateForm = useCallback((fields) => {
    const newErrors = {};
    let isValid = true;

    fields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    dispatch({ type: 'SET_ERRORS', payload: newErrors });
    return isValid;
  }, [formData, validateField, dispatch]);

  const clearErrors = useCallback(() => {
    dispatch({ type: 'SET_ERRORS', payload: {} });
  }, [dispatch]);

  return {
    errors,
    validateField,
    validateForm,
    clearErrors
  };
}; 