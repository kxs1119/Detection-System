// components/AlertList.tsx
import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { AlertLocation } from '../src/models/AlertLocation';
import {styles} from './styles';

interface AlertListProps {
  locations: AlertLocation[];
  error: string | null;
}

const AlertList: React.FC<AlertListProps> = ({ locations, error }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>Recent Alerts</Text>
    {error && <Text style={styles.errorText}>{error}</Text>}
    <FlatList
      data={locations}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.alertContainer}>
          <View style={styles.circle}>
            <Image source={require('../assets/deer-shadow.webp')} style={styles.circle} />
          </View>
          <Text style={styles.locationText}>{item.location}</Text>
          <Text style={styles.timeText}>{item.time_stamp}</Text>
        </View>
      )}
    />
  </View>
);

export default AlertList;