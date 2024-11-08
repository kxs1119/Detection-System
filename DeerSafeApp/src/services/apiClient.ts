// src/services/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://0.0.0.0:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
