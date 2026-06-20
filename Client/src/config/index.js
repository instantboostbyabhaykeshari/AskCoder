const config = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL
    || process.env.REACT_APP_API_URL
    || 'http://localhost:4000',
};

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  config.BASE_URL = process.env.NEXT_PUBLIC_API_URL
    || process.env.REACT_APP_API_URL
    || config.BASE_URL;
}

config.BASE_URL = config.BASE_URL.replace(/\/$/, '');

export default config;
