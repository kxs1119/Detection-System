// DeerSafeApp/src/services/locationService.ts
import * as Location from 'expo-location';

const API_URL = 'http://127.0.0.1:8080/api';  // Added /api to match Flask url_prefix

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
                'Accept': 'application/json'  // Added Accept header
            },
            body: JSON.stringify({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
        });

        if (!response.ok) {  // Added error handling
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();  // Added response handling
    } catch (error) {
        console.error('Error sending location:', error);
        throw error;  // Re-throw the error for handling by the caller
    }
};

    export const recieveAlertFromBackend = async (location: Location.LocationObject) => {
        try {
            const url = `${API_URL}/alerts?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`;

            // Make a GET request to the backend
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',  
                },
            });

            // Check for successful response
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse and return the JSON response
            const alerts = await response.json();
            return alerts;
        } catch (error) {
            console.error('Error receiving alerts from backend:', error);
            throw error;  // Re-throw the error for handling by the caller
        }
    };