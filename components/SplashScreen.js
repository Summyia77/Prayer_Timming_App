import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigation]);

  return (
    <View >
      <Image source={require('../assets/splash.jpg')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
 
  logo: {
    width: 400,
    height: 900,
   
  },

});

export default SplashScreen;