import apiClient from './apiClient';
import { AlertLocation } from '../models/AlertLocation';
import mockData from '../mocks/mock_data.json';

export const getAlertLocations = async (): Promise<AlertLocation[]> => {
  try {
    // Fetch data with a limited timeout
    const response = await apiClient.get<AlertLocation[]>('/alerts', { timeout: 3000 });
    return response.data;
  } catch (error) {
    console.error('Error in getAlertLocations, using mock data:', error);
    return mockData;
  }
};