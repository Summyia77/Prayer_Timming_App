import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/Home';

import PrayerTimesScreen from './components/Prayer';
import LoginScreen from './components/Login';
import SignUpScreen from './components/Signup';
import CurrentLocationPrayer from './components/CurrentLocationPrayer';
import SettingScreen from './components/SettingScreen';
import SplashScreen from './components/SplashScreen';

// Prevent the splash screen from auto-hiding

const Stack = createStackNavigator();

function App() {
  

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen">
  <Stack.Screen name="Home" component={HomeScreen} />
  
  <Stack.Screen name="PrayerTimes" component={PrayerTimesScreen} />
  <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="SignUp" component={SignUpScreen} />
  <Stack.Screen name="SplashScreen" component={SplashScreen} />

  
  <Stack.Screen
    name="CurrentLocationPrayer"
    component={CurrentLocationPrayer}
    initialParams={{ method: 1 }} // Pass the parameter here
  />
  <Stack.Screen name="SettingScreen" component={SettingScreen} />
</Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;
