// App.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Font from 'expo-font';
import { getAlertLocations } from './src/services/alertServices';
import { AlertLocation } from './src/models/AlertLocation';
import SplashScreenComponent from './src/screens/SplashScreen';  // Import SplashScreen

const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [locations, setLocations] = useState<AlertLocation[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Pre-load any other fonts here if necessary
        const data = await getAlertLocations();
        setLocations(data);
      } catch (err) {
        setError('Failed to fetch alert locations');
        console.error('Error fetching alert locations:', err);
      } finally {
        setTimeout(() => {
          setAppIsReady(true);
        }, 2000);  // Adding 2 seconds delay
      }
    };
  
    prepare();
  }, []);
  

  if (!appIsReady) {
    return <SplashScreenComponent />; // Display splash screen until app is ready
  }

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon name="person" size={24} color="#CCCCCC" />
        </TouchableOpacity>

        <Text style={styles.title}>Home</Text>

        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="notifications" size={24} color="#CCCCCC" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="settings" size={24} color="#CCCCCC" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileCircle}>
            <Text style={styles.profileText}>K</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Alerts</Text>
          <FlatList
            data={locations}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.alertContainer}>
                <View style={styles.circle}>
                  <Image source={require('./assets/deer-shadow.webp')} style={styles.circle} />
                </View>
                <Text style={styles.locationText}>{item.location}</Text>
                <Text style={styles.timeText}>{item.time_stamp}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#1A1A1A',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginHorizontal: 8,
  },
  profileCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E53935',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  profileText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  alertContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: '#8C8C8C',
    fontSize: 12,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  timeText: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 4,
  },
  settingsContainer: {
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 10,
  },
  settingsItem: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  notificationsContainer: {
    backgroundColor: '#333333',
    padding: 15,
    borderRadius: 10,
  },
  notificationItem: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default App;