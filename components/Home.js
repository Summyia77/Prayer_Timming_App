import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require('../Images/home_img.jpg')} style={styles.background}>
      <View style={{ flexDirection: "row" }}>
        <Image source={require("../Images/icon.png")} style={{ height: 80, width: 70 }} />
        <Text style={styles.title}>Spiritual Journey</Text>
      </View>
      <Text style={styles.description1}>
  Welcome to the Spiritual Journey app! 
</Text>  <Text style={styles.description2}>
  Use the buttons below to explore prayer times in different locations or customize your settings.
</Text>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('PrayerTimes')}
          style={styles.button}
        >
          <Text style={styles.buttonLabel}>Pakistan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CurrentLocationPrayer')}
          style={styles.button}
        >
          <Text style={styles.buttonLabel}>Current Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SettingScreen')}
          style={styles.button}
        >
          <Text style={styles.buttonLabel}>Setting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    height:900
  },description1: {
    color: "white",
    textAlign: "center",
    fontSize: 22,
    fontWeight:"bold",
    marginTop: 210, // Adjust the spacing as needed
    paddingHorizontal: 20, // Adjust the padding as needed
  },
  description2: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
    fontWeight:"bold",
    marginTop: 20, // Adjust the spacing as needed
    paddingHorizontal: 20,
    marginBottom:170 // Adjust the padding as needed
  },
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'transparent',
    top:20,
    left:-90
  },
  button: {
    marginBottom: 16,
    width: '50%',
    borderRadius: 10,
    backgroundColor: '#ECB32D',
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: "white",
  
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    color: "white",
    top: 30,
    fontWeight: "bold",
  },
});

export default HomeScreen;
