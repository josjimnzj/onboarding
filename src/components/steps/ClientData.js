import React, { useState, useEffect } from 'react';

const ClientData = ({ onNext, onPrev }) => {
  const [clientFound, setClientFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to check if client exists
    const checkClient = async () => {
      try {
        // This would be replaced with an actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setClientFound(true); // For demo purposes, we'll always find the client
        setLoading(false);
      } catch (error) {
        console.error('Error checking client:', error);
        setLoading(false);
      }
    };

    checkClient();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h5>4. Datos del cliente</h5>
      {clientFound ? (
        <div>
          <div className="alert alert-success" role="alert">
            Cliente encontrado en la base
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <p><strong>Nombre:</strong> Juan Pérez</p>
              <p><strong>Email:</strong> juan@email.com</p>
              <p><strong>Teléfono:</strong> 5512345678</p>
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
      ) : (
        <div>
          <div className="alert alert-danger" role="alert">
            Cliente no encontrado. Se requiere validación biométrica.
          </div>
          <div className="d-grid gap-3 mt-3">
            <button
              type="button"
              className="btn btn-success btn-lg"
              onClick={onNext}
            >
              Iniciar Validación
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
      )}
    </div>
  );
};

export default ClientData; 