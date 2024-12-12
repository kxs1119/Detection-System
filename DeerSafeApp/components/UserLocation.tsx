import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
interface UserLocationProps {
  setLocation: (location: LocationObject) => void;  // Prop to pass the location data back to the parent
}

const UserLocation: React.FC<UserLocationProps> = ({ setLocation }) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    // Function to start tracking the user's location
    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Watch the user's location at a high accuracy with intervals
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,  // Update every 1 second
          distanceInterval: 1, // Update for each 1 meter of movement
        },
        (loc) => {
          setLocation(loc);  // Pass the new location back to the parent
        }
      );




      return () => {
        locationSubscription.remove();
      };
    };

    startTracking();
  }, []);

  if (errorMsg) {
    return (
      <View>
        <Text>{errorMsg}</Text>  {/* Show error if location permission is denied */}
      </View>
    );
  }

  return null;
};

export default UserLocation;
