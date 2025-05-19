import React, { useState } from 'react';

const ProductSelection = ({ onNext }) => {
  const [formData, setFormData] = useState({
    tipoCredito: '',
    montoSolicitado: '',
    plazoSolicitado: '',
    motivoPersonal: '',
    tipoVivienda: '',
    inicialHipotecario: '',
    motivoHipotecario: '',
    tipoAuto: '',
    inicialAuto: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.tipoCredito) {
      newErrors.tipoCredito = 'Debe seleccionar un tipo de crédito';
    }

    if (!formData.montoSolicitado || formData.montoSolicitado <= 0) {
      newErrors.montoSolicitado = 'El monto solicitado debe ser mayor a cero';
    }

    if (!formData.plazoSolicitado || formData.plazoSolicitado <= 0) {
      newErrors.plazoSolicitado = 'El plazo debe ser mayor a cero';
    }

    // Conditional validations based on credit type
    if (formData.tipoCredito === 'personal' && !formData.motivoPersonal) {
      newErrors.motivoPersonal = 'Debe ingresar el motivo del préstamo personal';
    }

    if (formData.tipoCredito === 'hipotecario') {
      if (!formData.tipoVivienda) {
        newErrors.tipoVivienda = 'Debe indicar el tipo de vivienda';
      }
      if (!formData.inicialHipotecario || formData.inicialHipotecario < 0) {
        newErrors.inicialHipotecario = 'Debe ingresar un pago inicial válido';
      }
      if (!formData.motivoHipotecario) {
        newErrors.motivoHipotecario = 'Debe ingresar el motivo del crédito hipotecario';
      }
    }

    if (formData.tipoCredito === 'auto') {
      if (!formData.tipoAuto) {
        newErrors.tipoAuto = 'Debe seleccionar si el auto es nuevo o usado';
      }
      if (!formData.inicialAuto || formData.inicialAuto < 0) {
        newErrors.inicialAuto = 'Debe ingresar un pago inicial válido para auto';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div>
      <h5>1. ¿Qué tipo de crédito desea el cliente?</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="tipoCredito" className="form-label">Tipo de crédito</label>
          <select
            className={`form-select ${errors.tipoCredito ? 'is-invalid' : ''}`}
            id="tipoCredito"
            name="tipoCredito"
            value={formData.tipoCredito}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una opción</option>
            <option value="personal">Préstamo Personal</option>
            <option value="hipotecario">Crédito Hipotecario</option>
            <option value="auto">Crédito Automotriz</option>
          </select>
          {errors.tipoCredito && <div className="error-message">{errors.tipoCredito}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="montoSolicitado" className="form-label">Monto solicitado (MXN)</label>
          <input
            type="number"
            className={`form-control ${errors.montoSolicitado ? 'is-invalid' : ''}`}
            id="montoSolicitado"
            name="montoSolicitado"
            value={formData.montoSolicitado}
            onChange={handleChange}
            min="1"
            required
          />
          {errors.montoSolicitado && <div className="error-message">{errors.montoSolicitado}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="plazoSolicitado" className="form-label">Plazo (meses)</label>
          <input
            type="number"
            className={`form-control ${errors.plazoSolicitado ? 'is-invalid' : ''}`}
            id="plazoSolicitado"
            name="plazoSolicitado"
            value={formData.plazoSolicitado}
            onChange={handleChange}
            min="1"
            required
          />
          {errors.plazoSolicitado && <div className="error-message">{errors.plazoSolicitado}</div>}
        </div>

        {/* Conditional fields for Personal Loan */}
        {formData.tipoCredito === 'personal' && (
          <div className="mb-3">
            <label htmlFor="motivoPersonal" className="form-label">Motivo del préstamo</label>
            <input
              type="text"
              className={`form-control ${errors.motivoPersonal ? 'is-invalid' : ''}`}
              id="motivoPersonal"
              name="motivoPersonal"
              value={formData.motivoPersonal}
              onChange={handleChange}
              required
            />
            {errors.motivoPersonal && <div className="error-message">{errors.motivoPersonal}</div>}
          </div>
        )}

        {/* Conditional fields for Mortgage Loan */}
        {formData.tipoCredito === 'hipotecario' && (
          <>
            <div className="mb-3">
              <label htmlFor="tipoVivienda" className="form-label">Tipo de vivienda</label>
              <input
                type="text"
                className={`form-control ${errors.tipoVivienda ? 'is-invalid' : ''}`}
                id="tipoVivienda"
                name="tipoVivienda"
                value={formData.tipoVivienda}
                onChange={handleChange}
                required
              />
              {errors.tipoVivienda && <div className="error-message">{errors.tipoVivienda}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="inicialHipotecario" className="form-label">Pago inicial (MXN)</label>
              <input
                type="number"
                className={`form-control ${errors.inicialHipotecario ? 'is-invalid' : ''}`}
                id="inicialHipotecario"
                name="inicialHipotecario"
                value={formData.inicialHipotecario}
                onChange={handleChange}
                min="0"
                required
              />
              {errors.inicialHipotecario && <div className="error-message">{errors.inicialHipotecario}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="motivoHipotecario" className="form-label">Motivo del crédito hipotecario</label>
              <input
                type="text"
                className={`form-control ${errors.motivoHipotecario ? 'is-invalid' : ''}`}
                id="motivoHipotecario"
                name="motivoHipotecario"
                value={formData.motivoHipotecario}
                onChange={handleChange}
                required
              />
              {errors.motivoHipotecario && <div className="error-message">{errors.motivoHipotecario}</div>}
            </div>
          </>
        )}

        {/* Conditional fields for Auto Loan */}
        {formData.tipoCredito === 'auto' && (
          <>
            <div className="mb-3">
              <label htmlFor="tipoAuto" className="form-label">Tipo de auto</label>
              <select
                className={`form-select ${errors.tipoAuto ? 'is-invalid' : ''}`}
                id="tipoAuto"
                name="tipoAuto"
                value={formData.tipoAuto}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una opción</option>
                <option value="nuevo">Auto Nuevo</option>
                <option value="usado">Auto Usado</option>
              </select>
              {errors.tipoAuto && <div className="error-message">{errors.tipoAuto}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="inicialAuto" className="form-label">Pago inicial (MXN)</label>
              <input
                type="number"
                className={`form-control ${errors.inicialAuto ? 'is-invalid' : ''}`}
                id="inicialAuto"
                name="inicialAuto"
                value={formData.inicialAuto}
                onChange={handleChange}
                min="0"
                required
              />
              {errors.inicialAuto && <div className="error-message">{errors.inicialAuto}</div>}
            </div>
          </>
        )}

        <div className="d-grid gap-3 mt-3">
          <button type="submit" className="btn btn-success btn-lg">
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductSelection; 