const config = {
  homepage: process.env.REACT_APP_HOMEPAGE || '',
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
  environment: process.env.REACT_APP_ENV || 'development',
  isDevelopment: process.env.REACT_APP_ENV === 'development',
  isProduction: process.env.REACT_APP_ENV === 'production'
};

export default config; 