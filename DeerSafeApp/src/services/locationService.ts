// DeerSafeApp/src/services/locationService.ts
import * as Location from 'expo-location';

const API_URL = 'BACKEND_LOCATION'; // TODO -> Need to replace with backend route when made

export const getCurrentLocation = async (): Promise<Location.LocationObject> => {
    // Request permission to access location
    const { status } = await Location.requestForegroundPermissionsAsync();

    // condition to throw error if not granted
    if (status !== 'granted') {
        throw new Error('Permission to access location denied by user')
    }

    // Receive the location of the User 
    return await Location.getCurrentPositionAsync({});
};

export const sendLocationToBackend = async (location: Location.LocationObject) => {
    try {
        const response = await fetch(`${API_URL}/location`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                radius: 20 // raduis in miles around the end user 
            })
        });

        if (!response.ok) {
            throw new Error('Failed to send location data');
        }

        return await response.json();
    } catch (error) {
        console.error('Error sending location:', error);
        throw error;
    }
};