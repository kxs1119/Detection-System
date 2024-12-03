import React, { useEffect, useState } from 'react';
import { View, Alert, Text } from 'react-native';
import * as Font from 'expo-font';
import { getAlertLocations, markAlertAsViewed } from './src/services/alertServices';
import { AlertLocation } from './src/models/AlertLocation';
import SplashScreenComponent from './src/screens/SplashScreen';
import Navbar from './components/Navbar';
import AlertList from './components/AlertList';
import NotificationBanner from './components/NotificationBanner';
import homeStyles from './components/styles/Homescreen.styles';
import { useNotificationBanner } from './src/hooks/useNotificationBanner';
import { getElapsedTime } from './src/utils/timeElapsed';
import * as SplashScreen from 'expo-splash-screen';

const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false); // Tracks if app is ready
  const [locations, setLocations] = useState<AlertLocation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [notificationMessage, setNotificationMessage] = useState<string>('');
  const [showBanner, setShowBanner] = useState<boolean>(false);

  const opacityAnim = useNotificationBanner(locations);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Load any required fonts here if necessary
        await Font.loadAsync({
          // Add any fonts you need here (if any)
          // 'CustomFont': require('./assets/fonts/CustomFont.ttf')
        });

        // App is ready, hide splash screen
        setAppIsReady(true);
      } catch (err) {
        console.error('Error loading fonts:', err);
      }
    };
    prepare();
  }, []); // This will run once when the app is mounted

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync(); // Hide splash screen after app is ready
    }
  }, [appIsReady]); // When appIsReady is set to true, hide the splash screen

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const allAlerts = await getAlertLocations();

        const alertsWithElapsedTime = allAlerts.map(alert => ({
          ...alert,
          elapsedTime: getElapsedTime(alert.time_stamp),
        }));

        setLocations(alertsWithElapsedTime);
        setError(null);

        const hasUnviewedAlerts = allAlerts.some(alert => !alert.viewed);
        if (hasUnviewedAlerts) {
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
      }
    };

    loadAlerts();
  }, []); // This will run once when the app is mounted

  // Display the splash screen until the app is ready
  if (!appIsReady) {
    return <SplashScreenComponent />;
  }

  // Main app content
  return (
    <View style={homeStyles.container}>
      <Navbar />

      {showBanner && notificationMessage && (
        <NotificationBanner opacityAnim={opacityAnim} message={notificationMessage} />
      )}

      <View>
        {error && <Text style={{ color: 'red', padding: 10 }}>{error}</Text>}

        <AlertList locations={locations} error={error} />
      </View>
    </View>
  );
};

export default App;