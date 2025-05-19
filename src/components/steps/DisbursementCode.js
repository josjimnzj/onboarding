import React, { useState } from 'react';

const DisbursementCode = ({ onPrev, onReset }) => {
  const [downloading, setDownloading] = useState(false);

  const operationSummary = {
    numeroSolicitud: 'CRD-2024-001',
    fecha: new Date().toLocaleDateString(),
    monto: 50000,
    plazo: 24,
    tasa: 16.5,
    mensualidad: 2500,
    codigoDesembolso: 'DSB-' + Math.random().toString(36).substr(2, 9).toUpperCase()
  };

  const handleDownloadAmortization = async () => {
    setDownloading(true);
    try {
      // Simulate API call to generate and download amortization table
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, this would be a PDF or Excel file
      const content = `Tabla de Amortización
Número de Solicitud: ${operationSummary.numeroSolicitud}
Monto: $${operationSummary.monto.toLocaleString()}
Plazo: ${operationSummary.plazo} meses
Tasa: ${operationSummary.tasa}%

Pago # | Fecha | Capital | Interés | Total
1 | ${new Date().toLocaleDateString()} | $2,083.33 | $687.50 | $2,770.83
2 | ${new Date().toLocaleDateString()} | $2,111.81 | $658.02 | $2,769.83
...`;

      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `amortizacion-${operationSummary.numeroSolicitud}.txt`;
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
      <h5>13. Código de Desembolso</h5>
      
      <div className="alert alert-success mb-4">
        <h6 className="alert-heading">¡Felicidades! Tu crédito ha sido aprobado</h6>
        <p className="mb-0">Tu código de desembolso es:</p>
        <h4 className="text-center my-3">{operationSummary.codigoDesembolso}</h4>
        <small>Guarda este código, lo necesitarás para realizar el desembolso.</small>
      </div>

      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h6 className="mb-0">Resumen de la operación</h6>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-6">
              <p className="mb-1"><strong>Número de solicitud:</strong></p>
              <p className="mb-1"><strong>Fecha:</strong></p>
              <p className="mb-1"><strong>Monto del crédito:</strong></p>
              <p className="mb-1"><strong>Plazo:</strong></p>
              <p className="mb-1"><strong>Tasa anual:</strong></p>
              <p className="mb-1"><strong>Mensualidad:</strong></p>
            </div>
            <div className="col-6 text-end">
              <p className="mb-1">{operationSummary.numeroSolicitud}</p>
              <p className="mb-1">{operationSummary.fecha}</p>
              <p className="mb-1">${operationSummary.monto.toLocaleString()}</p>
              <p className="mb-1">{operationSummary.plazo} meses</p>
              <p className="mb-1">{operationSummary.tasa}%</p>
              <p className="mb-1">${operationSummary.mensualidad.toLocaleString()}</p>
            </div>
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

      <div className="alert alert-info">
        <h6 className="alert-heading">Próximos pasos</h6>
        <ol className="mb-0">
          <li>Guarda tu código de desembolso</li>
          <li>Acude a tu sucursal más cercana</li>
          <li>Presenta tu identificación oficial</li>
          <li>Menciona tu código de desembolso</li>
        </ol>
      </div>

      <div className="d-grid gap-3 mt-3">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={onReset}
        >
          Finalizar
        </button>
      </div>
    </div>
  );
};

export default DisbursementCode; 