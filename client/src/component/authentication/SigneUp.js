import React, { useState } from 'react';
import { 
    SafeAreaView,
    TextInput,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    PermissionsAndroid,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useDispatch, } from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {signUpAsync} from '../../SliceAction/authentication/signUpAction'


const SignUp = () => {
  const [view, setView] = useState('firstView');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUp, setSignUp] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    location: null,
    imgUrl:""
  });
  console.log("location",signUp.location);
  const permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'location Permission',
          message:
            'This application needs access to your location ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation()
        console.log('Location used');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getCurrentLocation=()=>{
    Geolocation.getCurrentPosition(
      position=>{
      const {latitude,longitude}=position.coords;
      setSignUp((prevState) => ({
        ...prevState,
        location:{latitude,longitude}
      }))
      console.log(latitude,longitude);
      },
      error=>alert("Error",error.message),
      {enableHighAccuracy: true,
      timeout:15000,
      maximumAge:10000
      }
    )
    
  }

  
  
  const imageUpload = async (obj) => {
    
    try {
      const form = new FormData();
      form.append("file", {
        uri: obj.assets[0].uri,
        name: "photo",
        type: obj.assets[0].type,
          });
      form.append("upload_preset", "psocp6cg");
  
      const response = await fetch("https://api.cloudinary.com/v1_1/dockwpvkl/image/upload", {
        method: "POST",
        body: form
      });

  
      if (!response.ok) {
        throw new Error(`Failed to upload image. Status: ${response.message}`);
      }
  
      const responseData = await response.json();
      const imageUrl = responseData.secure_url;
  
      console.log("Image uploaded successfully:", imageUrl);
  
      setSignUp((prevState) => ({
        ...prevState,
        imgUrl: imageUrl
      }));
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };
  
  

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' },(response) => {
      if (response && !response.didCancel) {
        imageUpload(response)
      
      }
    });
  };
  

  const handleInputChange = (name, value) => {
    if (name === 'password') {
      setSignUp({ ...signUp, [name]: value });
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setSignUp({ ...signUp, [name]: value });
    }
  };
  
  

  const dispatch = useDispatch();

  const handleSignUp = () => {
    if (signUp.password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    imageUpload();
    dispatch(signUpAsync(signUp));
  };
  
// const user=useSelector((s) =>s.userSignUp.user)
// console.log(user);
  const switchView = (v) => {
    setView(v);
  };

  if (view === 'firstView') {
    return (
      <ImageBackground source={require("../../Photo/face.png")}  style={{height:'100%',width:'100%'}}>
      
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='First name'
              onChangeText={(text) => handleInputChange('firstName', text)}
              value={signUp.firstName}
            />
            <TextInput
              style={styles.input}
              placeholder='Last name'
              onChangeText={(text) => handleInputChange('lastName', text)}
              value={signUp.lastName}
            />
            <TextInput
              style={styles.input}
              placeholder='Email'
              onChangeText={(text) => handleInputChange('email', text)}
              value={signUp.email}
            />
            <TextInput
              style={styles.input}
              placeholder='Phone number'
              onChangeText={(text)=>handleInputChange('phoneNumber',text)}
              value={signUp.phoneNumber}
            />
            
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {switchView("2ndView");permission()}}
          >
            <Text style={styles.loginText}>Next</Text>
          </TouchableOpacity>
        </SafeAreaView>
      
    </ImageBackground>
  );

  } else if (view === '2ndView') {
    return (
      <ImageBackground source={require("../../Photo/face.png")}  style={{height:'100%',width:'100%'}}>

      
        <Text style={styles.previousBtn} onPress={() => switchView('firstView')}>Previous</Text>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.inputContainer}>
          
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder='Password'
            onChangeText={(text) => handleInputChange('password', text)}
            value={signUp.password}
          />
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder='Confirm password'
            onChangeText={(text) => handleInputChange('confirmPassword', text)}
            value={confirmPassword}
          />
          {signUp.password !== confirmPassword && (
    <Text style={styles.errorMessage}>Passwords do not match</Text>)}

            <Text onPress={selectImage} style={styles.imageSelector}>upload 📷</Text>
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleSignUp}
          >
            <Text style={styles.loginText}>Sign up</Text>
          </TouchableOpacity>
        </SafeAreaView>
    </ImageBackground>
      
    );
  }
};

const styles = StyleSheet.create({
  input: {
    borderColor: "transparent",
    height: 60,
    marginBottom: 30,
    width: 300,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  buttonContainer: {
    marginTop: 20,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: '#00b5ec'
  },
  errorMessage: {
    width:250,
    borderRadius:10,
    marginLeft:33,
    textAlign:"center",
    fontSize:20,
    backgroundColor:"red",
    color: 'white',
    marginBottom: 10,
  },
  imageSelector:{
    backgroundColor:"white",
    paddingTop:5,
    textAlign:"center",
    fontSize:20,
    color:"black",
    fontWeight: 'bold',
    margin: 10,
    borderRadius:10,
    height: 40,
  },
  safeAreaView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:20
  },
  previousBtn: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  }
});

export default SignUp;
