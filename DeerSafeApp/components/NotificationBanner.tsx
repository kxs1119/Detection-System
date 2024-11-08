// components/NotificationBanner.tsx
import React from 'react';
import { Animated, Text } from 'react-native';

interface NotificationBannerProps {
  opacityAnim: Animated.Value;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({ opacityAnim }) => (
  <Animated.View
    style={{
      opacity: opacityAnim,
      position: 'absolute',
      top: 50,
      left: 0,
      right: 0,
      padding: 10,
      backgroundColor: 'lightblue',
      borderRadius: 8,
      alignItems: 'center',
    }}
  >
    <Text>New Notification!</Text>
  </Animated.View>
);

export default NotificationBanner;
