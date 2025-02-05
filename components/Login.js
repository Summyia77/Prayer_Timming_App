import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    try {
      const storedPassword = await AsyncStorage.getItem(email);
      if (storedPassword === password) {
        console.log('User signed in!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ImageBackground source={require('../Images/signup_bg.jpg')} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
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
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.button}>Login</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.signUpText} onPress={() => navigation.navigate('SignUp')}>
            Don't have an account? Sign Up
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: 'center',
    height: 550,
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
    position: "absolute",
    bottom: 40,
  },
  button: {
    textAlign: "center",
    borderColor: "white",
    color: "white",
    backgroundColor: "#A0522D",
    width: 100,
    height: 40,
    paddingTop: 6,
    borderRadius: 7,
    borderWidth: 2
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#6E260E',
  },
  input: {
    height: 40,
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
    alignItems: "center"
  },
  signUpText: {
    marginTop: 16,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
