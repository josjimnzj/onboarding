import React, { useState } from 'react';

const CreditConsent = ({ onNext, onPrev }) => {
  const [consentSent, setConsentSent] = useState(false);
  const [consentApproved, setConsentApproved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendConsent = async () => {
    setLoading(true);
    try {
      // Simulate API call to send SMS
      await new Promise(resolve => setTimeout(resolve, 2000));
      setConsentSent(true);
      
      // Simulate client approval
      setTimeout(() => {
        setConsentApproved(true);
      }, 3000);
    } catch (error) {
      console.error('Error sending consent:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h5>8. Consentimiento para análisis crediticio</h5>
      <div className="mb-3">
        <textarea
          className="form-control"
          rows="4"
          readOnly
          value="Acepto que mis datos sean utilizados para realizar un análisis crediticio con el buró de crédito."
        />
      </div>

      <div className="d-grid gap-3 mt-3">
        {!consentSent ? (
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleSendConsent}
            disabled={loading}
          >
            📲 Enviar link por SMS para consentimiento
          </button>
        ) : loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Enviando SMS...</span>
            </div>
            <div className="mt-2">Esperando respuesta del cliente...</div>
          </div>
        ) : consentApproved ? (
          <div className="alert alert-success" role="alert">
            Consentimiento Aprobado
          </div>
        ) : null}

        <button
          type="button"
          className="btn btn-success btn-lg"
          onClick={onNext}
          disabled={!consentApproved}
        >
          Continuar
        </button>
        <button
          type="button"
          className="btn btn-warning btn-lg"
          onClick={onPrev}
          disabled={loading}
        >
          ← Regresar
        </button>
      </div>
    </div>
  );
};

export default CreditConsent; 