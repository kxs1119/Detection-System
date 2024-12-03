import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { splashStyles } from '../../components/styles/SplashScreen.styles';

// Prevent the splash screen from auto-hiding until we are ready
SplashScreen.preventAutoHideAsync();

const SplashScreenComponent: React.FC = () => {
  useEffect(() => {
    // Hide splash screen after app is initialized
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };

    // Call hideSplash when app is ready 
    hideSplash();
  }, []); // Only run once, when component mounts

  return (
    <View style={splashStyles.container}>
      <View style={splashStyles.logoContainer}>
        <Image source={require('../../assets/logo.png')} style={splashStyles.logo} />
      </View>
      <Text style={splashStyles.text}>Welcome To Deer Safe</Text>
    </View>
  );
};

export default SplashScreenComponent;