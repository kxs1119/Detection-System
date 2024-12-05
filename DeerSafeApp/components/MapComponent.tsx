import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';

const MapComponent = () => {
  const { width, height } = Dimensions.get('window');
  const aspectRatio = width / height;
  const latitude = 41.0632; // Latitude for 1 Morrow Way, Slippery Rock, PA
  const longitude = -80.0461; // Longitude for 1 Morrow Way, Slippery Rock, PA
  const latitudeDelta = 0.005; // Smaller delta for a closer zoom
  const longitudeDelta = latitudeDelta * aspectRatio;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta,
        }}
      >
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />
        <Marker
          coordinate={{ latitude, longitude }}
          title="1 Morrow Way"
          description="Slippery Rock, PA 16057"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;
