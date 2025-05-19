import React, { useState } from 'react';

const OtpValidation = ({ onNext, onPrev }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 6 && /^\d*$/.test(value)) {
      setOtp(value);
      if (error) setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setError('El código OTP debe tener 6 dígitos');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call to verify OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      onNext();
    } catch (error) {
      setError('Error al verificar el código OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h5>7. Validación OTP</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            Hemos enviado un código al número registrado
          </label>
          <input
            type="text"
            className={`form-control ${error ? 'is-invalid' : ''}`}
            placeholder="Código OTP"
            value={otp}
            onChange={handleChange}
            maxLength={6}
            required
          />
          {error && <div className="error-message">{error}</div>}
        </div>

        <div className="d-grid gap-3 mt-3">
          <button
            type="submit"
            className="btn btn-success btn-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Verificando...
              </>
            ) : (
              'Verificar'
            )}
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
      </form>
    </div>
  );
};

export default OtpValidation; 