// alertServices.ts
import apiClient from './apiClient';
import { AlertLocation } from '../models/AlertLocation';
import mockData from '../mocks/mock_data.json';

export const getAlertLocations = async (): Promise<AlertLocation[]> => {
  try {
    const response = await apiClient.get<AlertLocation[]>('/alerts', { timeout: 3000 });
    return response.data;
  } catch (error) {
    console.log('Error in getAlertLocations, using mock data:', error);
    return mockData as unknown as AlertLocation[];
  }
};

export const sendAlert = async (alertData: Partial<AlertLocation>): Promise<void> => {
  try {
    const response = await apiClient.post('/alerts', alertData);
    if (response.status !== 200) {
      throw new Error('Failed to send alert');
    }
    return response.data;
  } catch (error) {
    console.error('Error sending alert:', error);
    throw error;
  }
};