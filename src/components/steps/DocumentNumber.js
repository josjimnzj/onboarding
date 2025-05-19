import React, { useState } from 'react';

const DocumentNumber = ({ onNext, onPrev }) => {
  const [documentNumber, setDocumentNumber] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setDocumentNumber(value);
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (documentNumber.length < 8) {
      setError('Debe ingresar al menos 8 caracteres.');
      return;
    }

    // Get the last digit of the document number
    const lastDigit = parseInt(documentNumber.slice(-1));
    
    // Check if the last digit is a number
    if (isNaN(lastDigit)) {
      setError('El último carácter debe ser un número.');
      return;
    }

    // Pass the last digit to the parent component
    onNext(lastDigit);
  };

  return (
    <div>
      <h5>2. Ingresa el número de documento</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            id="numeroDocumento"
            className={`form-control ${error ? 'is-invalid' : ''}`}
            placeholder="Ej. CURP / DNI / RFC"
            value={documentNumber}
            onChange={handleChange}
            required
            pattern=".{8,}"
          />
          {error && <div className="error-message">{error}</div>}
        </div>
        <div className="d-grid gap-3 mt-3">
          <button type="submit" className="btn btn-success btn-lg">
            Continuar
          </button>
          <button
            type="button"
            className="btn btn-warning btn-lg"
            onClick={onPrev}
          >
            ← Regresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentNumber; 