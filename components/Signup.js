import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ImageBackground,TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }
    try {
      await AsyncStorage.setItem(email, password);
      console.log('User account created & signed in!');
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ImageBackground source={require('../Images/signup_bg.jpg')} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity  onPress={handleSignUp} >
              <Text style={styles.button}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>
            Already have an account? Login
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
   backgroundColor:"black",
    justifyContent: 'center',
    height:550,
   
   
  },
  overlay: {
    flex: 1,
  
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
   
    width: '80%',
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: 'center',
    position:"absolute",

    bottom:40
  },
  button:{
    textAlign:"center",
    borderColor:"white",
    color:"white",
    
    backgroundColor:"#A0522D",
    width:100,
    height:40,
    paddingTop:6,
    borderRadius:7,
    borderWidth:2
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#6E260E',
  },
  input: {
    height:40,
    width: '90%',
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    width: '100%',
    alignItems:"center"
  },
  loginText: {
    marginTop: 16,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
