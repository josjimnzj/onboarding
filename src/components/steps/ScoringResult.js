import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const ScoringResult = ({ onNext, onPrev }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      series: [75],
      chart: {
        height: 250,
        type: 'radialBar',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            margin: 0,
            size: '70%',
          },
          track: {
            background: '#e7e7e7',
            strokeWidth: '97%',
            margin: 5,
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              offsetY: 10,
              fontSize: '22px',
              color: '#0062A3',
              formatter: function (val) {
                return val + '%';
              }
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91]
        },
      },
      stroke: {
        dashArray: 4
      },
      colors: ['#0062A3'],
      labels: ['Score'],
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div>
      <h5>9. Resultado del Scoring</h5>
      <div className="d-flex flex-column align-items-center mb-4">
        <div ref={chartRef} className="gauge-container"></div>
        <div className="text-center mt-2">
          <span className="badge bg-success" style={{ fontSize: '1em' }}>
            Aprobado
          </span>
        </div>
      </div>

      <div className="mb-3">
        <div className="row g-2">
          <div className="col-12 col-md-4">
            <div className="card text-center border-success">
              <div className="card-header py-1 bg-success text-white">
                Buró de Crédito
              </div>
              <div className="card-body py-2">
                <span style={{ fontSize: '2em', fontWeight: 'bold' }}>A</span>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card text-center border-success">
              <div className="card-header py-1 bg-success text-white">
                Score Interno
              </div>
              <div className="card-body py-2">
                <span style={{ fontSize: '2em', fontWeight: 'bold' }}>750</span>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card text-center border-success">
              <div className="card-header py-1 bg-success text-white">
                Capacidad de Pago
              </div>
              <div className="card-body py-2">
                <span style={{ fontSize: '2em', fontWeight: 'bold' }}>85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="d-grid gap-3 mt-3">
          <button type="button" className="btn btn-success btn-lg"
            onClick={onNext}>
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

export default ScoringResult; 