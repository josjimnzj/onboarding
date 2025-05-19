import React, { useState } from 'react';

const AdditionalDocuments = ({ onNext, onPrev }) => {
  const [errors, setErrors] = useState({});

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/') && !file.type.includes('pdf')) {
        setErrors(prev => ({
          ...prev,
          [type]: 'El archivo debe ser una imagen o PDF'
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
      <h5>10. Documentos adicionales</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            Comprobante de domicilio <small className="text-muted">(opcional)</small>
          </label>
          <input
            type="file"
            className={`form-control ${errors.comprobanteDomicilio ? 'is-invalid' : ''}`}
            accept="image/*,.pdf"
            onChange={(e) => handleFileChange(e, 'comprobanteDomicilio')}
          />
          {errors.comprobanteDomicilio && (
            <div className="error-message">{errors.comprobanteDomicilio}</div>
          )}
          <small className="text-muted">Acepta PDF o imágenes (máx. 5MB)</small>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Comprobante de ingresos <small className="text-muted">(opcional)</small>
          </label>
          <input
            type="file"
            className={`form-control ${errors.comprobanteIngresos ? 'is-invalid' : ''}`}
            accept="image/*,.pdf"
            onChange={(e) => handleFileChange(e, 'comprobanteIngresos')}
          />
          {errors.comprobanteIngresos && (
            <div className="error-message">{errors.comprobanteIngresos}</div>
          )}
          <small className="text-muted">Acepta PDF o imágenes (máx. 5MB)</small>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Identificación adicional <small className="text-muted">(opcional)</small>
          </label>
          <input
            type="file"
            className={`form-control ${errors.identificacionAdicional ? 'is-invalid' : ''}`}
            accept="image/*,.pdf"
            onChange={(e) => handleFileChange(e, 'identificacionAdicional')}
          />
          {errors.identificacionAdicional && (
            <div className="error-message">{errors.identificacionAdicional}</div>
          )}
          <small className="text-muted">Acepta PDF o imágenes (máx. 5MB)</small>
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

export default AdditionalDocuments; 