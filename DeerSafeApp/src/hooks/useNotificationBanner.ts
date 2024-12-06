// src/hooks/useNotificationBanner.ts
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export const useNotificationBanner = (showBanner: boolean) => {
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showBanner) {
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
    }
  }, [showBanner]);

  return opacityAnim;
};

export default useNotificationBanner;
