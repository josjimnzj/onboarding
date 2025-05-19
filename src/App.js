import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
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

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const totalSteps = 13;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      const nextStep = currentStep === 3 ? 5 : currentStep + 1;
      setCurrentStep(nextStep);
      setProgress(((nextStep) / (totalSteps - 1)) * 100);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setProgress(((prevStep) / (totalSteps - 1)) * 100);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setProgress(0);
  };

  const handleCancel = () => {
    if (window.confirm('¿Está seguro que desea cancelar el proceso?')) {
      handleReset();
    }
  };

  const handleDocumentNumberSubmit = (lastDigit) => {
    // If last digit is odd, go to BiometricValidation
    if (lastDigit % 2 !== 0) {
      setCurrentStep(2); // BiometricValidation step
    } else {
      // If last digit is even, go to AvailableOffers
      setCurrentStep(4); // ClientData step
    }
    setProgress(((currentStep + 1) / (totalSteps - 1)) * 100);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ProductSelection onNext={handleNext} />;
      case 1:
        return <DocumentNumber onNext={handleDocumentNumberSubmit} onPrev={handlePrev} />;
      case 2:
        return <BiometricValidation onNext={handleNext} onPrev={handlePrev} />;
      case 3:
        return <ValidatedData onNext={handleNext} onPrev={handlePrev} />;
      case 4:
        return <ClientData onNext={handleNext} onPrev={handlePrev} />; 
      case 5:
        return <AvailableOffers onNext={handleNext} onPrev={handlePrev} />;       
      case 6:
        return <OtpValidation onNext={handleNext} onPrev={handlePrev} />;
      case 7:
        return <CreditConsent onNext={handleNext} onPrev={handlePrev} />;
      case 8:
        return <ScoringResult onNext={handleNext} onPrev={handlePrev} />;
      case 9:
        return <AdditionalDocuments onNext={handleNext} onPrev={handlePrev} />;
      case 10:
        return <FinalOffer onNext={handleNext} onPrev={handlePrev} />;
      case 11:
        return <ElectronicSignature onNext={handleNext} onPrev={handlePrev} />;
      case 12:
        return <DisbursementCode onPrev={handlePrev} onReset={handleReset} />;
      default:
        return null;
    }
  };

  return (
    <div className="container py-4 position-relative" style={{ maxWidth: '480px' }}>
      { (currentStep !== 12 || currentStep === 0) && (
        <button
          type="button"
          className="btn btn-danger cancel-btn"
          onClick={handleCancel}
        >
          Cancelar
        </button>
      )}
      <h4 className="mb-3 text-center">On Boarding de Crédito</h4>
      <ProgressBar progress={progress} />
      {renderStep()}
    </div>
  );
}

export default App; 