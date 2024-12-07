// DeerSafeApp/src/services/locationService.ts
import * as Location from 'expo-location';

export const getCurrentLocation = async (): Promise<Location.LocationObject> => {
    // Request permission to access location
    const { status } = await Location.requestForegroundPermissionsAsync();

    // condition to throw error if not granted
    if (status !== 'granted') {
        throw new Error('Permission to access location denied by user')
    }

    // Recieve the location of the User 
    return await Location.getCurrentPositionAsync({});
};