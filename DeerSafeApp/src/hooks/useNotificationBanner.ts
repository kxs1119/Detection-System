// src/hooks/useNotificationBanner.ts
import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

export const useNotificationBanner = (locations: any[]) => {
  const [previousLocationCount, setPreviousLocationCount] = useState(0);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (initialLoadComplete && locations.length > previousLocationCount) {
      showNotificationBanner();
    } else if (!initialLoadComplete) {
      setInitialLoadComplete(true);
    }
    setPreviousLocationCount(locations.length);
  }, [locations]);

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

  return opacityAnim;
};

export default useNotificationBanner;
