import * as Location from 'expo-location';

// Define API base URL for the backend
const API_URL = 'http://127.0.0.1:8080/api';  // Assuming the backend is hosted on localhost

// Function to get current location using Expo Location
export const getCurrentLocation = async (): Promise<Location.LocationObject> => {
    // Request permission to access location
    const { status } = await Location.requestForegroundPermissionsAsync();

    // If permission is denied, throw an error
    if (status !== 'granted') {
        throw new Error('Permission to access location denied by user');
    }

    // Retrieve and return the current location
    return await Location.getCurrentPositionAsync({});
};

// Function to send user's location data to backend
export const sendLocationToBackend = async (location: Location.LocationObject) => {
    try {
        const response = await fetch(`${API_URL}/alerts/location`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                radius: 0.1,  // Define a 100 meters radius
            })
        });

        // If the backend response is not OK, throw an error
        if (!response.ok) {
            throw new Error('Failed to send location data');
        }

        // Return the response data (alerts) from the backend
        return await response.json();
    } catch (error) {
        console.error('Error sending location:', error);
        throw error;
    }
};

// Function to retrieve alerts from the backend based on user's location
export const getAlertsFromBackend = async (location: Location.LocationObject) => {
    try {
        const response = await fetch(`${API_URL}/alerts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            })
        });

        // If the backend response is not OK, throw an error
        if (!response.ok) {
            throw new Error('Failed to retrieve alerts');
        }

        // Return the alert data from the backend
        return await response.json();
    } catch (error) {
        console.error('Error retrieving alerts:', error);
        throw error;
    }
};
