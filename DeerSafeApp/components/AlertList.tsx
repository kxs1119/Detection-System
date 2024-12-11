// AlertList.tsx
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AlertLocation } from '../src/models/AlertLocation';
import { getElapsedTime } from '../src/utils/timeElapsed';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface AlertListProps {
  alerts: AlertLocation[];
  error: string | null;
}

const AlertList: React.FC<AlertListProps> = ({ alerts, error }) => {
  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  // Get the most recent alerts in LIFO order
  const recentAlerts = [...alerts].slice(-3).reverse();

  if (recentAlerts.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noAlertsText}>No alerts nearby</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons name="alert-circle" size={24} color="#FF4444" />
        <Text style={styles.title}>Recent Alerts</Text>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recentAlerts.map((alert) => (
          <TouchableOpacity 
            key={alert.id} 
            style={styles.alertCard}
            onPress={() => console.log('Alert pressed:', alert.id)}
          >
            <View style={styles.alertHeader}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../assets/deer-shadow.webp')}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.alertBadge}>
                <Text style={styles.alertCount}>{alert.alert_count}</Text>
              </View>
            </View>

            <View style={styles.alertInfo}>
              <Text style={styles.locationText} numberOfLines={1}>
                {alert.location}
              </Text>
              <Text style={styles.descriptionText} numberOfLines={2}>
                {alert.description || 'No description provided'}
              </Text>
              <View style={styles.timeContainer}>
                <MaterialCommunityIcons name="clock-outline" size={14} color="#666" />
                <Text style={styles.timeText}>
                  {getElapsedTime(alert.time_stamp)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: 200,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333',
  },
  alertCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    marginRight: 12,
    width: 200,
    borderWidth: 1,
    borderColor: '#eee',
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: 40,
    height: 40,
  },
  alertBadge: {
    backgroundColor: '#FF4444',
    borderRadius: 12,
    padding: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  alertCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  alertInfo: {
    marginTop: 12,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  errorText: {
    color: '#FF4444',
    textAlign: 'center',
    padding: 16,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 12,
  },
  noAlertsText: {
    textAlign: 'center',
    color: '#666',
    padding: 16,
  }
});

export default AlertList;