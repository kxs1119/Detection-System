import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { splashStyles } from '../../components/styles/SplashScreen.styles';

SplashScreen.preventAutoHideAsync();

const SplashScreenComponent: React.FC = () => {
  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    hideSplash();
  }, []);

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
