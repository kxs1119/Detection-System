import * as Location from 'expo-location';

// Define API base URL for the backend
const API_URL = 'http://127.0.0.1:8080/api';

// Function to get current location using Expo Location
export const getCurrentLocation = async (): Promise<Location.LocationObject> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        throw new Error('Permission to access location denied by user');
    }
    return await Location.getCurrentPositionAsync({});
};

// Function to send user's location data to the backend
export const sendLocationToBackend = async (location: Location.LocationObject) => {
    try {
        const response = await fetch(`${API_URL}/proximity`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }),
        });

        if (!response.ok) throw new Error('Failed to send location data');
        return await response.json();
    } catch (error) {
        console.log('Error sending location:', error);
        throw error;
    }
};

// Function to retrieve alerts from the backend
export const getAlertsFromBackend = async (location: Location.LocationObject) => {
    try {
        const response = await fetch(`${API_URL}/alerts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            }),
        });

        if (!response.ok) throw new Error('Failed to retrieve alerts');
        return await response.json();
    } catch (error) {
        console.error('Error retrieving alerts:', error);
        throw error;
    }
};