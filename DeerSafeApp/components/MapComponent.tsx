import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LocationObject } from 'expo-location';
import { AlertLocation } from '../src/models/AlertLocation';

interface MapComponentProps {
  location: LocationObject;  // User's current location
  alerts: AlertLocation[];   // Alerts to be displayed on the map
}

const MapComponent: React.FC<MapComponentProps> = ({ location, alerts }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        showsUserLocation={true}  // Show the user's location on the map
      >
        {/* User's location marker */}
        <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }}>
          {/* Compass icon representing user's GPS direction */}
          <MaterialCommunityIcons name="navigation" size={40} color="blue" />
        </Marker>

        {/* Alert locations as red circles */}
        {alerts.map((alert, index) => (
          <Circle
            key={index}
            center={{ latitude: alert.latitude, longitude: alert.longitude }}
            radius={1}  // 1 meters radius for alerts
            fillColor="rgba(255, 0, 0, 0.3)"
            strokeColor="rgba(255, 0, 0, 0.7)"
            strokeWidth={2}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapComponent;
