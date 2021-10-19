import axios from 'axios';

const api = axios.create({
  baseURL: 'http://104.131.99.230',
});

export default api;
