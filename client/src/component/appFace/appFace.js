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
    navigation.navigate('SignUp');
  };

  return (
    <View>
      <ImageBackground
        source={require('../../Photo/pexels-tobiasbjorkli-2690807.jpg')}
        style={styles.image}
      >
        <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={handleButton}>
            <Text style ={styles.textbutton}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={handleLogin}>
            <Text style ={styles.text} >If you have an Account? Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignup}>
            <Text style ={styles.text}  >If you don't have an Account? Sign Up</Text>
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
    marginTop: 500,
  },
  button: {
    backgroundColor: '#161618',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom:5,
  },
  textbutton: {
    color: '#DCE2FC',
    fontFamily: 'BoldItalic',
    justifyContent: 'center',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 3,

  },
  text: {
    color: 'white',
    fontFamily: 'BoldItalic',
    justifyContent: 'center',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 3,
  },
  buttonContainer: {
    marginTop: 2,
    backgroundColor: '#112678',

  },
});

export default AppFace;