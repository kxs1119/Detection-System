// NotificationBanner.tsx
import React from 'react';
import { Animated, Text, View } from 'react-native';
import { notificationBannerStyles } from './styles/NotificationBanner.styles';

interface NotificationBannerProps {
  opacityAnim: Animated.Value;
  message: string;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({ opacityAnim, message }) => (
  <Animated.View style={[notificationBannerStyles.bannerContainer, { opacity: opacityAnim }]}>
    <Text style={notificationBannerStyles.bannerText}>{message}</Text>
  </Animated.View>
);

export default NotificationBanner;
