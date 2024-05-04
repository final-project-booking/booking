import React, { useState,useEffect } from 'react';
import { decode } from "base-64";
global.atob = decode;
import {cloud_name,preset} from "../../apAdress"
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { TextInput, SafeAreaView, StyleSheet, View, Text, TouchableOpacity,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getOneAsync} from "../../reduce/getOne"
import {editeAsync} from "../../reduce/editeProfile"
import { useDispatch } from 'react-redux'; 
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditProfile = () => {
    const [view, setView] = useState("firstView");
    const [user,setUser]=useState({})
    
    const dispatch = useDispatch();
    const tokenGeted = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log(token);
        const decoded = jwtDecode(token);
        console.log("decoded",decoded.id);
        return decoded.id;
      } catch (error) {
        console.log(error);
      }
    }
    
    const imageHandler=async(image)=>{
      try{
        const form=new FormData()
      form.append("file",image)
      form.append("upload_preset",preset)
      form.append("cloud_name",cloud_name)
      const res=await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`)
      console.log(res.data.secure_url)
      return res.data.secure_url
    }
    catch(error){
      console.log(error);
    }
    }


  
    useEffect(() => {
      const fetchUserId = async () => {
        const userId = await tokenGeted();
        dispatch(getOneAsync(userId))
          .then(data => {
            setUser(data.payload);
            console.log("User data:", data.payload);
            
          })
          .catch(error => console.log("Error fetching user data:", error)); // Error handling
      };
    
      fetchUserId();
    }, []);
    console.log("userNumber",user.phoneNumber);
    const handleSave = async () => {
      try {
        const userId = await tokenGeted();
        const result =  dispatch(editeAsync({ id: userId, userData: user }));
        const newData = result.payload;
        setUser({
          ...user,
          firstName: newData.firstName,
          lastName: newData.lastName,
          email: newData.email,
          phoneNumber: newData.phoneNumber,
        });
      } catch (error) {
        console.log(error);
      }
    };
    
    
    
  
  

  const changeView = (v) => {
    setView(v);
  };

  const handleInputChange = (name, value) => {
      setUser({ ...user, [name]: value });
    }
  
    const ImageIcone=<Icon size={25} name='add-a-photo'/>

  if (view === "firstView") {
    return (
      <SafeAreaView>
        <View style={styles.editProfileContainer}>

        <Image
            source={{ uri: user.imgUrl}}
            style={{width:'38%',height:'24%',marginTop:50,borderRadius:100}}
          />
          <View style={styles.camera}>

          <Text style={{color:"black"}}>{ImageIcone}</Text>
          </View>
          <View style={styles.inputsContainer}>
            <Text style={{color:'black',fontSize:18,marginLeft:9,marginBottom:10}}>First name</Text>
            <TextInput
            value={user.firstName}
            onChangeText={(text)=>handleInputChange("firstName", text)}
            style={styles.editProfile_inputs}  />
          </View>
          <View style={styles.inputsContainer}>
            <Text style={{color:'black',fontSize:18,marginLeft:9,marginBottom:10}}>Last name</Text>
            <TextInput
            value={user.lastName}
            onChangeText={(text)=>handleInputChange("lastName",text)}
            style={styles.editProfile_inputs}  />
          </View>
          <View style={styles.inputsContainer}>
            <Text style={{color:'black',fontSize:18,marginLeft:9,marginBottom:10}}>Phone number</Text>
            <TextInput
            value={user.phoneNumber? (user.phoneNumber).toString() : ''}
            onChangeText={(text)=>handleInputChange("phoneNumber",text)}
            style={styles.editProfile_inputs}  />
          </View>

          
          <View style={styles.inputsContainer}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => changeView("secondView")}>
              <Text style={styles.next}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  } else if (view === "secondView") {
    return (
      <SafeAreaView>
        <View style={styles.editProfileContainer}>
          <View style={styles.inputsContainer}>
            <Text style={{color:'black',fontSize:18,marginLeft:9,marginBottom:10}}>Email</Text>
            <TextInput
            value={user.email}
            onChangeText={(text)=>handleInputChange("email",text)}
            style={styles.editProfile_inputs}  />
          </View>
          <View style={styles.inputsContainer}>
            <Text style={{color:'black',fontSize:18,marginLeft:9,marginBottom:10}}>Old password</Text>
            <TextInput
            style={styles.editProfile_inputs} placeholder='********' />
          </View>
          <View style={styles.inputsContainer}>
            <Text style={{color:'black',fontSize:18,marginLeft:9,marginBottom:10}}>New password</Text>
            <TextInput style={styles.editProfile_inputs} placeholder='********' />
          </View>
          <View style={styles.inputsContainer}>
            <Text style={{color:'black',fontSize:18,marginLeft:9,marginBottom:10}}>Confirm new password</Text>
            <TextInput style={styles.editProfile_inputs} placeholder='********' />
          </View>
          <View style={styles.inputsContainer}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() =>handleSave()}>
              <Text style={styles.next}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  editProfile_inputs: {
    borderStyle: "solid",
    borderWidth: 1,
    width: 400,
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    color: "black",
    fontSize:18
  },
  camera:{
    backgroundColor:"#E7E9F2",
    borderWidth:1.5,
    width:37,
    height:37,
    borderRadius:100,
    marginTop:-40,
    marginLeft:110,
    justifyContent:'center',
    opacity:0.8,
    alignItems:"center"},
  inputsContainer: {
    marginTop: 20,
  },
  editProfileContainer: {
    alignItems: "center"
  },
  buttonContainer: {
    marginTop: 20,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 400,
    borderRadius: 30,
    borderStyle: "solid",
    backgroundColor: '#0000FF'
  },
  next: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default EditProfile;
