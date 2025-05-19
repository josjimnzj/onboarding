import React, { useState, useRef } from 'react';

const ElectronicSignature = ({ onNext, onPrev }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const [error, setError] = useState('');

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setError('');
  };

  return (
    <div>
      <h5>12. Firma Electrónica</h5>
      <div className="card mb-4">
        <div className="card-body">
          <p className="mb-3">
            Por favor, firme en el recuadro inferior para aceptar los términos y condiciones del crédito.
          </p>

          <div className="border rounded p-3 mb-3">
            <canvas
              ref={canvasRef}
              width={400}
              height={200}
              style={{
                width: '100%',
                height: '200px',
                border: '1px solid #ccc',
                touchAction: 'none'
              }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />
          </div>

          {error && <div className="error-message mb-3">{error}</div>}

          <div className="d-flex gap-2 mb-3">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={clearSignature}
            >
              Limpiar firma
            </button>
          </div>

          <div className="alert alert-info">
            <small>
              * Su firma electrónica tiene la misma validez legal que una firma física.
              <br />
              * Al firmar, acepta los términos y condiciones del crédito.
            </small>
          </div>
        </div>
      </div>

      <div className="d-grid gap-3 mt-3">
        <button
          type="button"
          className="btn btn-success btn-lg"
          onClick={onNext}>
          Guardar Firma
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

export default ElectronicSignature; 