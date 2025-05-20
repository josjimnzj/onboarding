import { useCallback } from 'react';
import { useOnboarding } from '../context/OnboardingContext';
import { ERROR_MESSAGES } from '../constants/onboarding';

export const useApi = () => {
  const { dispatch } = useOnboarding();

  const handleApiCall = useCallback(async (apiFunction, successAction, errorAction) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await apiFunction();
      
      if (successAction) {
        dispatch({ type: successAction.type, payload: successAction.payload || response });
      }
      
      return response;
    } catch (error) {
      console.error('API Error:', error);
      
      if (errorAction) {
        dispatch({ type: errorAction.type, payload: errorAction.payload || error.message });
      } else {
        dispatch({ 
          type: 'SET_ERRORS', 
          payload: { api: ERROR_MESSAGES.NETWORK_ERROR } 
        });
      }
      
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [dispatch]);

  return { handleApiCall };
}; 