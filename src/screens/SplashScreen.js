import React, { useEffect } from 'react';
import { View, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => { 
    setTimeout(() => {
      navigation.replace('Main');
    }, 2000);
  }, [navigation]);

  return (
    <View>
      <Image source={require('../splashscreenimg/splash.png')} style={{ width: '100%', height: '100%' }} />
    </View>
  );
};

export default SplashScreen;
