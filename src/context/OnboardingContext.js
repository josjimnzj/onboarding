import React, { createContext, useContext, useReducer } from 'react';
import { TOTAL_STEPS } from '../constants/onboarding';

const OnboardingContext = createContext();

const initialState = {
  currentStep: 0,
  progress: 0,
  formData: {},
  errors: {}
};

function onboardingReducer(state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload,
        progress: ((action.payload + 1) / TOTAL_STEPS) * 100
      };
    case 'UPDATE_FORM_DATA':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload }
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: {}
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function OnboardingProvider({ children }) {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  return (
    <OnboardingContext.Provider value={{ state, dispatch }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
} 