import React, { useState } from 'react';

const FinalOffer = ({ onNext, onPrev }) => {
  const [accepted, setAccepted] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const offerDetails = {
    monto: 50000,
    plazo: 24,
    tasa: 16.5,
    mensualidad: 2500,
    seguro: 150,
    comision: 0,
    totalAPagar: 60000
  };

  const handleAccept = () => {
    setAccepted(true);
    // Simulate API call to accept offer
    setTimeout(() => {
      onNext();
    }, 1000);
  };

  const handleDownloadAmortization = async () => {
    setDownloading(true);
    try {
      // Simulate API call to generate and download amortization table
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, this would be a PDF or Excel file
      const content = `Tabla de Amortización
Monto: $${offerDetails.monto.toLocaleString()}
Plazo: ${offerDetails.plazo} meses
Tasa: ${offerDetails.tasa}%

Pago # | Fecha | Capital | Interés | Total
1 | ${new Date().toLocaleDateString()} | $2,083.33 | $687.50 | $2,770.83
2 | ${new Date().toLocaleDateString()} | $2,111.81 | $658.02 | $2,769.83
...`;

      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `amortizacion-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading amortization table:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div>
      <h5>11. Oferta final</h5>
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h6 className="mb-0">Resumen de la oferta</h6>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-6">
              <p className="mb-1"><strong>Monto del crédito:</strong></p>
              <p className="mb-1"><strong>Plazo:</strong></p>
              <p className="mb-1"><strong>Tasa anual:</strong></p>
              <p className="mb-1"><strong>Mensualidad:</strong></p>
              <p className="mb-1"><strong>Seguro:</strong></p>
              <p className="mb-1"><strong>Comisión:</strong></p>
              <p className="mb-1"><strong>Total a pagar:</strong></p>
            </div>
            <div className="col-6 text-end">
              <p className="mb-1">${offerDetails.monto.toLocaleString()}</p>
              <p className="mb-1">{offerDetails.plazo} meses</p>
              <p className="mb-1">{offerDetails.tasa}%</p>
              <p className="mb-1">${offerDetails.mensualidad.toLocaleString()}</p>
              <p className="mb-1">${offerDetails.seguro.toLocaleString()}</p>
              <p className="mb-1">${offerDetails.comision.toLocaleString()}</p>
              <p className="mb-1">${offerDetails.totalAPagar.toLocaleString()}</p>
            </div>
          </div>

          <div className="alert alert-info">
            <small>
              * Los montos mostrados son aproximados y pueden variar según el análisis final.
              <br />
              * La tasa puede variar según el perfil crediticio del cliente.
            </small>
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h6 className="card-title">Tabla de amortización</h6>
          <p className="card-text">
            Descarga la tabla de amortización completa con el detalle de todos los pagos.
          </p>
          <button
            className="btn btn-outline-primary"
            onClick={handleDownloadAmortization}
            disabled={downloading}
          >
            {downloading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Descargando...
              </>
            ) : (
              'Descargar tabla de amortización'
            )}
          </button>
        </div>
      </div>

      <div className="d-grid gap-3 mt-3">
        <button
          type="button"
          className="btn btn-success btn-lg"
          onClick={handleAccept}
          disabled={accepted}
        >
          {accepted ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Procesando...
            </>
          ) : (
            'Aceptar Oferta'
          )}
        </button>
        <button
          type="button"
          className="btn btn-warning btn-lg"
          onClick={onPrev}
          disabled={accepted}
        >
          ← Regresar
        </button>
      </div>
    </div>
  );
};

export default FinalOffer; 