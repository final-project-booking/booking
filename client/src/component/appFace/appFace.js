import React from 'react'
import { View, Text, StyleSheet, ViewBase,Image,Button ,ImageBackground,TouchableOpacity} from 'react-native';

const appFace = () => {

 

    return (
      <View >
      <ImageBackground
        source={require('../../Photo/face.png')}
        style={styles.image}
      >
        <View style={styles.content}>
        <TouchableOpacity
            style={styles.buttonContainer}
            >
            <Text style={styles.Text}>Get Start</Text>
            </TouchableOpacity>
          <Text style={styles.text}>If you have an Account? Login</Text>
          <Text style={styles.text}>If you don't have an Account? Sign Up</Text>
        </View>
      </ImageBackground>
      
    </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  content: {
    marginBottom: 20, 
    top:200,
    lineHeight: 24,
  },
  text: {
    color: 'white',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    borderStyle:"solid",
    backgroundColor: '#00b5ec'
  },
  Text:{
    color:'white',
    fontSize:20,
    fontWeight: 'bold',
  }
});

export default appFace
