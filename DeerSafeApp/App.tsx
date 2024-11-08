// App.tsx
import React, { useEffect, useState, useRef } from 'react';
import { View, ScrollView, Alert, Animated } from 'react-native';
import * as Font from 'expo-font';
import { getAlertLocations } from './src/services/alertServices';
import { AlertLocation } from './src/models/AlertLocation';
import SplashScreenComponent from './src/screens/SplashScreen';
import PushNotificationHandler from './components/Push';
import Navbar from './components/Navbar';
import AlertList from './components/AlertList';
import NotificationBanner from './components/NotificationBanner';
import { styles } from './components/styles';

const App: React.FC = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [locations, setLocations] = useState<AlertLocation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          MaterialIcons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf'),
        });

        const data = await getAlertLocations();
        setLocations(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch alert locations');
        console.error('Error fetching alert locations:', err);
        Alert.alert("Network Error", "Could not retrieve data. Please check your connection and try again.");
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  const showNotificationBanner = () => {
    Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (!appIsReady) {
    return <SplashScreenComponent />;
  }

  return (
    <View style={styles.container}>
      <PushNotificationHandler onNotification={showNotificationBanner} />
      <Navbar />
      <ScrollView>
        <AlertList locations={locations} error={error} />
      </ScrollView>
      <NotificationBanner opacityAnim={opacityAnim} />
    </View>
  );
};

export default App;
