// AlertList.tsx
import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { AlertLocation } from '../src/models/AlertLocation';
import { alertListStyles } from './styles/AlertList.styles';

interface AlertListProps {
  locations: AlertLocation[];
  error: string | null;
}

const AlertList: React.FC<AlertListProps> = ({ locations, error }) => (
  <View style={alertListStyles.container}>
    <Text style={alertListStyles.title}>Recent Alerts</Text>
    {error && <Text style={alertListStyles.errorText}>{error}</Text>}
    <FlatList
      data={locations}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={alertListStyles.alertContainer}>
          <View style={alertListStyles.circle}>
            <Image
              source={require('../assets/deer-shadow.webp')}
              style={alertListStyles.circle}
            />
          </View>
          <Text style={alertListStyles.locationText}>{item.location}</Text>
          <Text style={alertListStyles.timeText}>{item.time_stamp}</Text>
        </View>
      )}
    />
  </View>
);

export default AlertList;
