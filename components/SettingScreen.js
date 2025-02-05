import React from 'react';
import { View, TouchableOpacity, ImageBackground, Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MethodSelectionScreen = () => {
  const navigation = useNavigation();

  const handleMethodSelection = (method) => {
    navigation.navigate('CurrentLocationPrayer', { selectedMethod: method });
  };

  return (
    <ImageBackground source={require("../Images/islamic-wallpaper-islamic-posters_941097-23439.avif")} style={styles.container}>
      <Image source={require("../Images/museum_7808152.png")} style={styles.logo} />
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Select Your Preferred Method</Text>
        <Text style={styles.description}>
          Choose the method of prayer calculation that aligns with your beliefs and preferences.
        </Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={() => handleMethodSelection(0)} style={styles.button}>
            <Text style={styles.buttonText}>Hanafi</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMethodSelection(1)} style={[styles.button, { marginTop: 10 }]}>
            <Text style={styles.buttonText}>Shafi</Text>
          </TouchableOpacity>
        </View>
        <Image source={require("../Images/happy_13827475.png")} style={{height:250,width:250,left:-60,bottom:0,position:"absolute"}}/>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: 850,
  },
  logo: {
    height: 100,
    width: 90,
    position: "absolute",
    top: 10,
    left: 10,
  },
  contentContainer: {
    top:0,
    bottom:0,
    position:"relative",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
   
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6E260E',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#7B3F00',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonsContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#6E260E", 
    color: "white",
    borderWidth: 2,
    borderRadius: 7,
    paddingVertical: 8,
    paddingHorizontal: 13,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
});

export default MethodSelectionScreen;
