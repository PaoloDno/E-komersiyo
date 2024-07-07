import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});



api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 && error.response.data.message === 'Token expired.') {
      window.location.href = '/expiredToken'; // Redirect landing page
    } else if (error.response.status === 403 && error.response.data.message === 'Invalid token.') {
      window.location.href = '/expiredToken'; // Not really expired just redirecting to login or landing page
    }
    return Promise.reject(error);
  }
);


export default api;