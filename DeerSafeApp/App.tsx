// App.tsx
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import * as Font from 'expo-font';
import { getAlertLocations } from './src/services/alertServices';
import { AlertLocation } from './src/models/AlertLocation';
import SplashScreenComponent from './src/screens/SplashScreen';
import Navbar from './components/Navbar';
import AlertList from './components/AlertList';
import NotificationBanner from './components/NotificationBanner';
import homeStyles from './components/styles/Homescreen.styles';
import { useNotificationBanner } from './src/hooks/useNotificationBanner';

const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [locations, setLocations] = useState<AlertLocation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notificationMessage, setNotificationMessage] = useState<string>('');

  // Use custom hook for notification banner animation
  const opacityAnim = useNotificationBanner(locations);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          MaterialIcons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf'),
        });

        await new Promise((resolve) => setTimeout(resolve, 3000));

        const data = await getAlertLocations();
        setLocations(data);
        setError(null);

        // Set the notification message when new data is received
        if (data.length > 0) {
          setNotificationMessage('New Alert: Deer has been detected.');
        }
      } catch (err) {
        setError('Failed to fetch alert locations');
        console.error('Error fetching alert locations:', err);
        Alert.alert(
          'Network Error',
          'Could not retrieve data. Please check your connection and try again.'
        );
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  if (!appIsReady) {
    return <SplashScreenComponent />;
  }

  return (
    <View style={homeStyles.container}>
      <Navbar />
      <ScrollView>
        <AlertList locations={locations} error={error} />
      </ScrollView>
      <NotificationBanner opacityAnim={opacityAnim} message={notificationMessage} />
    </View>
  );
};

export default App;
