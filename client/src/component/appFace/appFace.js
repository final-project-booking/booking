import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Home from "../HomePage/Home"
import Login from "../authentication/Login"
import SignUp from '../authentication/SigneUp';
import nav from '../../../screens/Nav';
const AppFace = ({ navigation }) => {
  const handleButton = () => {
    navigation.navigate('Home');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View>
      <ImageBackground
        source={require('../../Photo/face.png')}
        style={styles.image}
      >
        <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={handleButton}>
            <Text>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text>If you have an Account? Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text>If you don't have an Account? Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  content: {
    marginTop: 200,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  text: {
    color: 'white',
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

export default AppFace;
