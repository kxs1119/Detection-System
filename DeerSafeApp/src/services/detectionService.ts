// src/services/detectionService.ts
import apiClient from './apiClient';

interface DetectionData {
  time: string;
  location: {
    latitude: string;
    longitude: string;
  };
  detection_type: string;
}

export const sendDeerDetection = async (detectionData: DetectionData) => {
  try {
    const response = await apiClient.post('/api/deer-detection', detectionData);
    return response.data;
  } catch (error) {
    console.error("Error sending detection data:", error);
    throw error;
  }
};
