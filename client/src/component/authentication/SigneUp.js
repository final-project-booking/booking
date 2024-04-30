import React, { useState } from 'react';
import axios from 'axios';
import { SafeAreaView, TextInput, StyleSheet, View, Button, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {signUpAsync} from '../../SliceAction/authentication/signUpAction'


const SignUp = () => {
  const [view, setView] = useState('firstView');
  const [signUp, setSignUp] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    location: '',
    imgUrl:""
  });
  const imageUpload = async (imageUri) => {
    const form = new FormData();
    form.append("file", {
      uri: imageUri,
      name: "image.jpg",
      type: "image/jpeg",
    });
    form.append("upload_preset", "booking");
    
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dockwpvkl/image/upload",
        form
      );
      const imageUrl = res.data.secure_url;
      setSignUp((prevState) => ({
        ...prevState,
        imgUrl: imageUrl
      }));
    } catch (err) {
      console.log(err);
    }
  };
  

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (response && !response.didCancel) {
        await imageUpload(response.uri);
      }
    });
  };
  

  const handleInputChange = (name, value) => {
    setSignUp({ ...signUp, [name]: value });
  };
  

  const dispatch = useDispatch();

  const handleSignUp = () => {
    dispatch(signUpAsync(signUp));
  }
const user=useSelector((s) =>s.userSignUp.user)
console.log(user);
  const switchView = (v) => {
    setView(v);
  };

  if (view === 'firstView') {
    return (
      <>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.inputContainer} >
            <TextInput
              style={styles.input}
              placeholder='First name'
              onChangeText={(text)=>handleInputChange('firstName',text)}
              value={signUp.firstName}
            />
            <TextInput
              style={styles.input}
              placeholder='Last name'
              onChangeText={(text)=>handleInputChange('lastName',text)}
              value={signUp.lastName}
            />
            <TextInput
              style={styles.input}
              placeholder='email'
              onChangeText={(text)=>handleInputChange('email',text)}
              value={signUp.email}
            />
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder='password'
              onChangeText={(text)=>handleInputChange('password',text)}
              value={signUp.password}
            />
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => switchView("nextView")}
          >
            <Text style={styles.loginText}>Next</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </>
    );
  } else if (view === 'nextView') {
    return (
      <>
        <Text style={styles.previousBtn} onPress={() => switchView('firstView')}>Previous</Text>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder='Phone number'
              onChangeText={(text)=>handleInputChange('phoneNumber',text)}
              value={signUp.phoneNumber}
            />
            <TextInput
              style={styles.input}
              placeholder='location'
              onChangeText={(text)=>handleInputChange('location',text)}
              value={signUp.location}
            />
            <Text onPress={selectImage} style={styles.imageSelector}>upload 📷</Text>
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleSignUp}
          >
            <Text style={styles.loginText}>Sign up</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </>
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
  imageSelector:{
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
