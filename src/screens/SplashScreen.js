import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import splashimage from './images/splash.png';

const SplashScreen = ({ navigation }) => {
  useEffect(() => { 
    // setTimeout define um atraso de 2 segundos (2000 milissegundos).
    // Durante esse tempo a tela 'Main' será substituída por esta tela.
    setTimeout(() => {
      navigation.replace('Main');
    }, 2000);
  }, [navigation]);

  
  return (
    <View>
      <Image source={splashimage} style={{ width: '100%', height: '100%' }} />
    </View>
  );
};

export default SplashScreen;
