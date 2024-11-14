// src/models/AlertLocation.ts

export interface AlertLocation {
  id: number;
  device: string;
  time_stamp: string;
  latitude: string;
  longitude: string;
  location: string;
  detection_time: string;
  detection_id: number;
  alert_count: number;
  animal_type: string;
  token: string;
  viewed: boolean; // Add the viewed property here
}
