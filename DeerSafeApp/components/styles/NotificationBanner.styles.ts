// components/styles/NotificationBanner.styles.ts
import { StyleSheet } from 'react-native';

export const notificationBannerStyles = StyleSheet.create({
  bannerContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 8,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 16,
    color: '#000',
  },
});
