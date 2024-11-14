import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { AlertLocation } from '../src/models/AlertLocation';
import { getElapsedTime } from '../src/utils/timeElapsed';
import { alertListStyles } from './styles/AlertList.styles';

interface AlertListProps {
  locations: AlertLocation[];
  error: string | null;
}

const AlertList: React.FC<AlertListProps> = ({ locations, error }) => {
  if (error) {
    return <Text style={alertListStyles.errorText}>{error}</Text>;
  }

  // Get the most recent 5 alerts in LIFO order
  const recentAlerts = [...locations].slice(-3).reverse();

  return (
    <View style={alertListStyles.container}>
      <Text style={alertListStyles.title}>Recent Alerts</Text>
      <FlatList
        data={recentAlerts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={alertListStyles.alertContainer}>
            <View style={alertListStyles.circle}>
              <Image
                source={require('../assets/deer-shadow.webp')}
                style={alertListStyles.image}
                resizeMode="cover"
              />
            </View>
            <Text style={alertListStyles.timeText}>{ item.location}</Text>
            <Text style={alertListStyles.timeText}>{getElapsedTime(item.time_stamp)}</Text>
          </View>
        )}
        horizontal // Enable horizontal scrolling
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
      />
    </View>
  );
};

export default AlertList;
