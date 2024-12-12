import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { AlertLocation } from '../src/models/AlertLocation';  // Ensure this model matches the structure of your alert data

interface AlertListProps {
  alerts: AlertLocation[];  // Alerts array to be displayed
  error: string | null;  // Error message if something goes wrong
}

const AlertList: React.FC<AlertListProps> = ({ alerts, error }) => {
  // Display error if it exists
  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  // Get the most recent alerts
  const recentAlerts = Array.isArray(alerts) ? [...alerts].slice(-3).reverse() : [];

  if (recentAlerts.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noAlertsText}>No alerts nearby</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header for the alerts section */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Recent Alerts</Text>
      </View>

      {/* Horizontal scroll for recent alerts */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recentAlerts.map((alert) => (
          <TouchableOpacity 
            key={alert.id} 
            onPress={() => console.log('Alert pressed:', alert.id)}
          >
            <View style={styles.imageContainer}>
              {/* Display image in a circle without card */}
              <Image
                source={require('../assets/deer-shadow.webp')}  // Path to the image
                style={styles.alertImage}  // Apply custom styles
              />
            </View>
            <Text style={styles.descripText}>{alert.location}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  noAlertsText: {
    textAlign: 'center',
    color: 'red',
    padding: 16,
  },
  descripText: {
    fontSize: 16,
    color: 'white',
    padding: 1,
    margin: 20
  },
  headerContainer: {
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'red',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,  // Circle shape
    overflow: 'hidden', // Ensure image fits within the circle
    marginBottom: 10,
    marginRight: 12, // Space between images
  },
  alertImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensures the image fills the container without distortion
  },
});

export default AlertList;
