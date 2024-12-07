import apiClient from './apiClient';
import { AlertLocation } from '../models/AlertLocation';
import mockData from '../mocks/mock_data.json';

export const getAlertLocations = async (): Promise<AlertLocation[]> => {
  try {
    const response = await apiClient.get<AlertLocation[]>('/alerts', { timeout: 3000 });
    return response.data;
  } catch (error) {
    console.log('Error in getAlertLocations, using mock data:', error);
    return mockData;
  }
};

// export const fetchAlerts = async (): Promise<AlertLocation[]> => {
//   try {
//     const response = await apiClient.get<AlertLocation[]>('/alerts', { timeout: 3000 });
//     return response.data.filter(alert => !alert.viewed); // Only unviewed alerts
//   } catch (error) {
//     console.error('Error fetching alerts, using mock data:', error);
//     return mockData.filter(alert => !alert.viewed); // Filter unviewed mock alerts
//   }
// };

// export const markAlertAsViewed = async (token: string): Promise<void> => {
//   try {
//     await apiClient.post(`/alerts/${token}/viewed`);
//   } catch (error) {
//     console.error(`Error marking alert ${token} as viewed:`, error);
//   }
// };
