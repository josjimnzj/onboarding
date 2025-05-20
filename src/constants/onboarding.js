export const STEPS = {
  PRODUCT_SELECTION: 0,
  DOCUMENT_NUMBER: 1,
  BIOMETRIC_VALIDATION: 2,
  VALIDATED_DATA: 3,
  CLIENT_DATA: 4,
  AVAILABLE_OFFERS: 5,
  OTP_VALIDATION: 6,
  CREDIT_CONSENT: 7,
  SCORING_RESULT: 8,
  ADDITIONAL_DOCUMENTS: 9,
  FINAL_OFFER: 10,
  ELECTRONIC_SIGNATURE: 11,
  DISBURSEMENT_CODE: 12
};

export const TOTAL_STEPS = Object.keys(STEPS).length;

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Este campo es obligatorio',
  INVALID_DOCUMENT: 'Número de documento inválido',
  INVALID_OTP: 'Código OTP inválido',
  NETWORK_ERROR: 'Error de conexión. Por favor intente nuevamente'
}; 