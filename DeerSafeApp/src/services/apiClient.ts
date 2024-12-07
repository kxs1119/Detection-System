// src/services/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://10.0.2.2:8000', // localhost
  timeout: 3000,
});

export default apiClient;
