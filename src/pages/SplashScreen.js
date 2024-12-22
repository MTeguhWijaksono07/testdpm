import { ImageBackground, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import SplashImage from '../assets/Images/Splash.png'; 
import Logo from '../assets/Images/Logo.png'; 

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('LoginScreen'); 
    }, 3000); 
  }, [navigation]);

  return (
    <ImageBackground source={SplashImage} style={styles.background}>
      <Image source={Logo} style={styles.logo} />
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 147,
    height: 180,
    marginBottom: 20,
  },
});
