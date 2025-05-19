import React, { useState } from 'react';

const BiometricValidation = ({ onNext, onPrev }) => {
  const [errors, setErrors] = useState({});

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          [type]: 'El archivo debe ser una imagen'
        }));
        return;
      }
      setErrors(prev => ({
        ...prev,
        [type]: null
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div>
      <h5>5. Validación biométrica</h5>
      <div className="alert alert-danger" role="alert">
            Cliente no encontrado. Se requiere validación biométrica.
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            Frontal del documento <small className="text-muted">(opcional)</small>
          </label>
          <input
            type="file"
            className={`form-control ${errors.frontal ? 'is-invalid' : ''}`}
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'frontal')}
          />
          {errors.frontal && <div className="error-message">{errors.frontal}</div>}
          <small className="text-muted">Acepta imágenes (máx. 5MB)</small>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Reverso del documento <small className="text-muted">(opcional)</small>
          </label>
          <input
            type="file"
            className={`form-control ${errors.reverso ? 'is-invalid' : ''}`}
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'reverso')}
          />
          {errors.reverso && <div className="error-message">{errors.reverso}</div>}
          <small className="text-muted">Acepta imágenes (máx. 5MB)</small>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Selfie con el documento <small className="text-muted">(opcional)</small>
          </label>
          <input
            type="file"
            className={`form-control ${errors.selfie ? 'is-invalid' : ''}`}
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'selfie')}
          />
          {errors.selfie && <div className="error-message">{errors.selfie}</div>}
          <small className="text-muted">Acepta imágenes (máx. 5MB)</small>
        </div>

        <div className="d-grid gap-3 mt-3">
          <button type="submit" className="btn btn-success btn-lg">
            Analizar Documentos
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

export default BiometricValidation; 