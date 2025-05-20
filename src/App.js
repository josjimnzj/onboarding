import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { OnboardingProvider, useOnboarding } from './context/OnboardingContext';
import { STEPS, TOTAL_STEPS } from './constants/onboarding';
import ProgressBar from './components/ProgressBar';
import ProductSelection from './components/steps/ProductSelection';
import DocumentNumber from './components/steps/DocumentNumber';
import AvailableOffers from './components/steps/AvailableOffers';
import ClientData from './components/steps/ClientData';
import BiometricValidation from './components/steps/BiometricValidation';
import ValidatedData from './components/steps/ValidatedData';
import OtpValidation from './components/steps/OtpValidation';
import CreditConsent from './components/steps/CreditConsent';
import ScoringResult from './components/steps/ScoringResult';
import AdditionalDocuments from './components/steps/AdditionalDocuments';
import FinalOffer from './components/steps/FinalOffer';
import ElectronicSignature from './components/steps/ElectronicSignature';
import DisbursementCode from './components/steps/DisbursementCode';

function OnboardingApp() {
  const { state, dispatch } = useOnboarding();
  const { currentStep, progress } = state;

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      const nextStep = currentStep === STEPS.VALIDATED_DATA ? STEPS.CLIENT_DATA : currentStep + 1;
      dispatch({ type: 'SET_STEP', payload: nextStep });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      dispatch({ type: 'SET_STEP', payload: currentStep - 1 });
    }
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  const handleCancel = () => {
    if (window.confirm('¿Está seguro que desea cancelar el proceso?')) {
      handleReset();
    }
  };

  const handleDocumentNumberSubmit = (lastDigit) => {
    const nextStep = lastDigit % 2 !== 0 ? STEPS.BIOMETRIC_VALIDATION : STEPS.CLIENT_DATA;
    dispatch({ type: 'SET_STEP', payload: nextStep });
  };

  const renderStep = () => {
    switch (currentStep) {
      case STEPS.PRODUCT_SELECTION:
        return <ProductSelection onNext={handleNext} />;
      case STEPS.DOCUMENT_NUMBER:
        return <DocumentNumber onNext={handleDocumentNumberSubmit} onPrev={handlePrev} />;
      case STEPS.BIOMETRIC_VALIDATION:
        return <BiometricValidation onNext={handleNext} onPrev={handlePrev} />;
      case STEPS.VALIDATED_DATA:
        return <ValidatedData onNext={handleNext} onPrev={handlePrev} />;
      case STEPS.CLIENT_DATA:
        return <ClientData onNext={handleNext} onPrev={handlePrev} />;
      case STEPS.AVAILABLE_OFFERS:
        return <AvailableOffers onNext={handleNext} onPrev={handlePrev} />;
      case STEPS.OTP_VALIDATION:
        return <OtpValidation onNext={handleNext} onPrev={handlePrev} />;
      case STEPS.CREDIT_CONSENT:
        return <CreditConsent onNext={handleNext} onPrev={handlePrev} />;
      case STEPS.SCORING_RESULT:
        return <ScoringResult onNext={handleNext} onPrev={handlePrev} />;
      case STEPS.ADDITIONAL_DOCUMENTS:
        return <AdditionalDocuments onNext={handleNext} onPrev={handlePrev} />;
      case STEPS.FINAL_OFFER:
        return <FinalOffer onNext={handleNext} onPrev={handlePrev} />;
      case STEPS.ELECTRONIC_SIGNATURE:
        return <ElectronicSignature onNext={handleNext} onPrev={handlePrev} />;
      case STEPS.DISBURSEMENT_CODE:
        return <DisbursementCode onPrev={handlePrev} onReset={handleReset} />;
      default:
        return null;
    }
  };

  return (
    <div className="container py-4 position-relative" style={{ maxWidth: '480px' }}>
      {(currentStep !== STEPS.DISBURSEMENT_CODE || currentStep === STEPS.PRODUCT_SELECTION) && (
        <button
          type="button"
          className="btn btn-danger cancel-btn"
          onClick={handleCancel}
        >
          X
        </button>
      )}
      <h4 className="mb-3 text-center">On Boarding de Crédito</h4>
      <ProgressBar progress={progress} />
      {renderStep()}
    </div>
  );
}

function App() {
  return (
    <OnboardingProvider>
      <OnboardingApp />
    </OnboardingProvider>
  );
}

export default App; 