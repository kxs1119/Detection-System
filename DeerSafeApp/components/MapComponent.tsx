import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Circle, Marker, UrlTile, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import { AlertLocation } from '../src/models/AlertLocation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface EnhancedMapComponentProps {
  alerts: AlertLocation[];
}

const isPointInViewingAngle = (
  userHeading: number,
  userLocation: { latitude: number; longitude: number },
  pointLocation: { latitude: number; longitude: number },
  viewAngle: number = 60
): boolean => {
  const toRadian = (angle: number) => (angle * Math.PI) / 180;  // convert to radians
  const toDegree = (radian: number) => (radian * 180 / Math.PI); // convert to degrees

  const lat1 = toRadian(userLocation.latitude);
  const lon1 = toRadian(userLocation.longitude);
  const lat2 = toRadian(pointLocation.latitude);
  const lon2 = toRadian(pointLocation.longitude);

  const dLon = lon2 - lon1;

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) -
           Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  let bearing = toDegree(Math.atan2(y, x));
  bearing = (bearing + 360) % 360;

  const diff = Math.abs((bearing - userHeading + 360) % 360);
  return diff <= viewAngle / 2 || diff >= (360 - viewAngle / 2);
};

const MapComponent: React.FC<EnhancedMapComponentProps> = ({ alerts }) => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [heading, setHeading] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowingUser, setIsFollowingUser] = useState(true);
  const [visibleAlerts, setVisibleAlerts] = useState<AlertLocation[]>([]);
  const mapRef = useRef<MapView | null>(null);

  const { width, height } = Dimensions.get('window');
  const aspectRatio = width / height;
  const latitudeDelta = 0.005;
  const longitudeDelta = latitudeDelta * aspectRatio;

  // Update visible alerts whenever heading or location changes
  useEffect(() => {
    if (location) {
      const filteredAlerts = alerts.filter(alert => 
        isPointInViewingAngle(
          heading,
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          },
          {
            latitude: typeof alert.latitude === 'string' ? parseFloat(alert.latitude) : alert.latitude,
            longitude: typeof alert.longitude === 'string' ? parseFloat(alert.longitude) : alert.longitude
          }
        )
      );
      setVisibleAlerts(filteredAlerts);
    }
  }, [heading, location, alerts]);

  const centerOnUser = () => {
    if (location && mapRef.current) {
      const { latitude, longitude } = location.coords;
      mapRef.current.animateToRegion({
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      }, 500);
      setIsFollowingUser(true);
    }
  };

  useEffect(() => {
    const startTracking = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          setIsLoading(false);
          return;
        }

        const initialLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High
        });
        setLocation(initialLocation);
        setIsLoading(false);

        const locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (loc) => {
            setLocation(loc);
            if (isFollowingUser && mapRef.current) {
              mapRef.current.animateToRegion({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta,
                longitudeDelta,
              }, 500);
            }
          }
        );

        const headingSubscription = await Location.watchHeadingAsync((headingData) => {
          setHeading(headingData.trueHeading);
        });

        return () => {
          locationSubscription.remove();
          headingSubscription.remove();
        };
      } catch (error) {
        setErrorMsg('Error accessing location services');
        setIsLoading(false);
      }
    };

    startTracking();
  }, [isFollowingUser]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Unable to get location</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView 
        ref={mapRef}
        style={styles.map} 
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta,
          longitudeDelta,
        }}
        showsUserLocation={false}
        onPanDrag={() => setIsFollowingUser(false)}
      >
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />

        {visibleAlerts.map((alert, index) => (
          <Circle
            key={index}
            center={{
              latitude: typeof alert.latitude === 'string' ? parseFloat(alert.latitude) : alert.latitude,
              longitude: typeof alert.longitude === 'string' ? parseFloat(alert.longitude) : alert.longitude,
            }}
            radius={10}
            fillColor="rgba(255, 192, 203, 0.6)"
            strokeColor="rgb(255, 192, 203)"
            strokeWidth={2}
          />
        ))}

        <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          anchor={{ x: 0.5, y: 0.5 }}
          flat
          rotation={heading}
        >
          <View style={styles.markerContainer}>
            <MaterialCommunityIcons 
              name="navigation" 
              size={24} 
              color="#007AFF"
              style={{ transform: [{ rotate: '-45deg' }] }}
            />
          </View>
        </Marker>
      </MapView>

      <TouchableOpacity 
        style={styles.recenterButton} 
        onPress={centerOnUser}
      >
        <MaterialCommunityIcons 
          name="crosshairs-gps" 
          size={24} 
          color="#007AFF"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#007AFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recenterButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
});

export default MapComponent;