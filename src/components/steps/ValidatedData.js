import React from 'react';

const ValidatedData = ({ onNext, onPrev }) => {
  const clientData = {
    nombre: 'Juan Pérez',
    curp: 'PERJ880101HDFRZN07',
    rfc: 'PERJ880101AB3',
    fechaNacimiento: '01/01/1988'
  };

  return (
    <div>
      <div className="alert alert-success mb-3">
        Validación conforme
      </div>
      <h5>6. Datos encontrados y validados</h5>
      <div className="card">
        <div className="card-body">
          <ul className="list-unstyled mb-0">
            <li className="mb-2">
              <strong>Nombre:</strong> {clientData.nombre}
            </li>
            <li className="mb-2">
              <strong>CURP:</strong> {clientData.curp}
            </li>
            <li className="mb-2">
              <strong>RFC:</strong> {clientData.rfc}
            </li>
            <li className="mb-2">
              <strong>Fecha de nacimiento:</strong> {clientData.fechaNacimiento}
            </li>
          </ul>
        </div>
      </div>
      <div className="d-grid gap-3 mt-3">
        <button
          type="button"
          className="btn btn-success btn-lg"
          onClick={onNext}
        >
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
    </div>
  );
};

export default ValidatedData; 