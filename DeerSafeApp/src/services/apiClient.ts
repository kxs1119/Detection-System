// src/services/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://10.0.2.2:8000', // replace with the actual server IP if not on localhost
  timeout: 3000,
});

export default apiClient;
