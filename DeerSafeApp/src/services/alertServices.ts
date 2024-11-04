// src/services/alertService.ts
import apiClient from './apiClient';
import { AlertLocation } from '../models/AlertLocation';

export const getAlertLocations = async (): Promise<AlertLocation[]> => {
  const response = await apiClient.get<AlertLocation[]>('/alerts');
  return response.data;
};
