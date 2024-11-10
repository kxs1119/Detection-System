// components/Push.tsx
import React, { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';

interface PushNotificationHandlerProps {
  onNotification: () => void;
}

const PushNotificationHandler: React.FC<PushNotificationHandlerProps> = ({ onNotification }) => {
  const notificationListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(() => {
      onNotification();
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
    };
  }, [onNotification]);

  return null;
};

export default PushNotificationHandler;
