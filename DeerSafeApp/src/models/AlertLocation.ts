export interface AlertLocation {
  id: number;
  device: string;
  time_stamp: string;
  latitude: number;
  longitude: number;
  location: string;
  detection_time: string;
  detection_id: number;
  alert_count: number;
  title: string;
  description: string;
  animal_type?: string; // Make this optional
}
