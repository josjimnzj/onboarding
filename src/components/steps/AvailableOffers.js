import React, { useState, useEffect } from 'react';

const AvailableOffers = ({ onNext, onPrev }) => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get offers
    const fetchOffers = async () => {
      try {
        // This would be replaced with an actual API call
        const mockOffers = [
          {
            id: 1,
            monto: 50000,
            plazo: 12,
            tasa: 15.9,
            mensualidad: 4500
          },
          {
            id: 2,
            monto: 50000,
            plazo: 24,
            tasa: 16.5,
            mensualidad: 2500
          },
          {
            id: 3,
            monto: 50000,
            plazo: 36,
            tasa: 17.2,
            mensualidad: 1800
          }
        ];
        setOffers(mockOffers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching offers:', error);
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const handleOfferSelect = (offerId) => {
    setSelectedOffer(offerId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedOffer) {
      alert('Por favor seleccione una oferta');
      return;
    }
    onNext();
  };

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
      <h5>3. Ofertas disponibles</h5>
      <div className="text-end">
        <small className="text-muted">Selecciona la oferta que prefiera el cliente</small>
      </div>

      <div className="mt-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`card mb-3 ${selectedOffer === offer.id ? 'border-primary' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => handleOfferSelect(offer.id)}
          >
            <div className="card-body">
              <div className="row">
                <div className="col-6">
                  <h6 className="card-title">Oferta {offer.id}</h6>
                  <p className="card-text">
                    <strong>Monto:</strong> ${offer.monto.toLocaleString()}
                  </p>
                  <p className="card-text">
                    <strong>Plazo:</strong> {offer.plazo} meses
                  </p>
                </div>
                <div className="col-6">
                  <p className="card-text">
                    <strong>Tasa:</strong> {offer.tasa}%
                  </p>
                  <p className="card-text">
                    <strong>Mensualidad:</strong> ${offer.mensualidad.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-grid gap-3 mt-3">
        <button
          type="button"
          className="btn btn-success btn-lg"
          onClick={handleSubmit}
        >
          Aceptar Oferta
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

export default AvailableOffers; 