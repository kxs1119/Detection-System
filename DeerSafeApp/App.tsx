import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Navbar from './components/Navbar';
import AlertList from './components/AlertList';
import NotificationBanner from './components/NotificationBanner';
import MapComponent from './components/MapComponent';
import { useNotificationBanner } from './src/hooks/useNotificationBanner';
import { getAlertLocations } from './src/services/alertServices';
import { AlertLocation } from './src/models/AlertLocation';
import homeStyles from './components/styles/Homescreen.styles';
import mapStyles from './components/styles/MapComponent.styles';
import { getElapsedTime } from './src/utils/timeElapsed';

const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [locations, setLocations] = useState<AlertLocation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notificationMessage, setNotificationMessage] = useState<string>('');
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const opacityAnim = useNotificationBanner(showBanner);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({});
        setAppIsReady(true);
      } catch (err) {
        console.error('Error loading fonts:', err);
      }
    };
    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) SplashScreen.hideAsync();
  }, [appIsReady]);

  useEffect(() => {
    const loadAlerts = async () => {
      setLoading(true); // Start loading
      try {
        const allAlerts = await getAlertLocations();

        const alertsWithElapsedTime = allAlerts.map(alert => ({
          ...alert,
          elapsedTime: getElapsedTime(alert.time_stamp),
        }));

        setLocations(alertsWithElapsedTime);
        setError(null);

        if (allAlerts.length > 0) {
          setNotificationMessage('New Alert: Deer has been detected.');
          setShowBanner(true);
        } else {
          setShowBanner(false);
        }
      } catch (err) {
        setError('Failed to fetch alert locations');
        console.error('Error fetching alerts:', err);
        Alert.alert(
          'Network Error',
          'Could not retrieve data. Please check your connection and try again.'
        );
      } finally {
        setLoading(false); // Stop loading
      }
    };

    loadAlerts();
  }, []);

  if (!appIsReady) {
    return null; // Optionally, render a splash screen component here
  }

  return (
    <View style={homeStyles.container}>
      <Navbar />

      {showBanner && (
        <NotificationBanner opacityAnim={opacityAnim} message={notificationMessage} />
      )}

      <View>
        {error && <Text style={{ color: 'red', padding: 10 }}>{error}</Text>}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
        ) : (
          <AlertList locations={locations} error={error} />
        )}
      </View>

      <View style={mapStyles.container}>
        <MapComponent alerts={locations} />
      </View>
    </View>
  );
};

export default App;
