// AlertLocation.ts
export interface AlertLocation {
  imageUrl: any;
  id: number;
  device: string;
  time_stamp: string;  // From the backend timestamp
  latitude: number;
  longitude: number;
  location: string;
  detection_time?: string;  // Made optional
  detection_id?: number;    // Made optional
  alert_count: number;
  title?: string;          // Made optional
  description: string;
  animal_type?: string;    // Already optional
  alerts: AlertLocation[];
}