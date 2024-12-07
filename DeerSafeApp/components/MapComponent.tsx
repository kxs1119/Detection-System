import React from 'react';
import { Dimensions, View, Text, Button, StyleSheet, Linking } from 'react-native';
import MapView, { Circle, Marker, UrlTile } from 'react-native-maps';
import mapStyles from './styles/MapComponent.styles';
import { AlertLocation } from '../src/models/AlertLocation';

interface MapComponentProps {
  alerts: AlertLocation[];
}

const MapComponent: React.FC<MapComponentProps> = ({ alerts }) => {
  const { width, height } = Dimensions.get('window');
  const aspectRatio = width / height;
  const latitudeDelta = 0.005;
  const longitudeDelta = latitudeDelta * aspectRatio;

  const initialRegion = {
    latitude: 41.0632, // Default latitude
    longitude: -80.0461, // Default longitude
    latitudeDelta,
    longitudeDelta,
  };

  // Function to open Google Maps
  const openGoogleMaps = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url).catch(err => console.error('Error opening Google Maps:', err));
  };

  return (
    <View style={mapStyles.container}>
      <MapView style={mapStyles.map} initialRegion={initialRegion}>
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <Circle
              key={index}
              center={{
                latitude: typeof alert.latitude === 'string' ? parseFloat(alert.latitude) : alert.latitude,
                longitude: typeof alert.longitude === 'string' ? parseFloat(alert.longitude) : alert.longitude,
              }}
              radius={10} // Radius of n {whatever is changed}
              fillColor='pink'
            />
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>No alerts to display</Text>
        )}
      </MapView>
    </View>
  );
};


export default MapComponent;
