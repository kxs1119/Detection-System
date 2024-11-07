// components/PushNotificationHandler.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const Push: React.FC = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          Alert.alert('Permission not granted to receive push notifications!');
          return;
        }
        const projectId = Constants.expoConfig?.extra?.projectId;
        if (!projectId) {
          Alert.alert('Project ID not found!');
          return;
        }
        try {
          const token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
          setExpoPushToken(token);
          console.log('Expo Push Token:', token);
        } catch (error) {
          console.error('Error fetching Expo push token:', error);
        }
      } else {
        Alert.alert('Must use physical device for push notifications');
      }
    };

    registerForPushNotificationsAsync();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response received:', response);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return null;
};

export default Push;