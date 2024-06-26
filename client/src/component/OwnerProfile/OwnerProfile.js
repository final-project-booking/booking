import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity,Button,ImageBackground ,Dimensions} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Map from '../Map/Map';
import {launchImageLibrary} from 'react-native-image-picker';
import {cloud_name,preset} from "../../apAdress"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { promoteToOwner } from '../../reduce/Ownerprofile';
import pic from '../../Photo/owner.jpg'
import Icons from "react-native-vector-icons/Ionicons"
import socket from '../../../notificationSocket'
const OwnerProfile = ({route,navigation}) => {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    password: 'password',
    phoneNumber: '99999999',
    imageUrl: 'https://th.bing.com/th/id/OIP.2i5UaEHaQM3PYAYXQyM1AAAAAA?w=177&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  });

  const [hotelData, setHotelData] = useState({
    name: '',
    licence: '',
    description: '',
    rooms: '',
    rating: '',
    media: [],
  });

  const dispatch = useDispatch();

  const imageHandler = async (imageAsset) => {
    const form = new FormData();
    form.append("file", {
      uri: imageAsset.uri,
      type: imageAsset.type,
      name: imageAsset.fileName || 'photo.jpg'
    });
    form.append("upload_preset", preset);
    form.append("cloud_name", cloud_name);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: 'POST',
      body: form
    });
    const data = await res.json();
    return data.secure_url;
  };

  const pickImage = () => {
    const options = {
      selectionLimit: 0,
      mediaType: 'photo'
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error:', response.errorMessage);
      } else {
        try {
          const uploadPromises = response.assets.map(imageAsset => imageHandler(imageAsset));
          const imageUris = await Promise.all(uploadPromises);
          setHotelData(prevData => ({
            ...prevData,
            media: [...prevData.media, ...imageUris]
          }));
        } catch (error) {
          console.log('Error uploading images:', error);
        }
      }
    });
  };

  const handleSave = () => {
  

    dispatch(
      promoteToOwner({
        ...hotelData,
        longitude: profile.location.longitude,
        latitude: profile.location.latitude,
      })
    );
    navigation.navigate('TabNavigator')
  };

  const [view, setView] = useState('profile');
  const ImageIcon = <Icon size={25} name='add-a-photo' />;
 

  return (
    
<View style={styles.container}>
      {view === 'profile' && (
        <ImageBackground source={pic} style={styles.backgroundImage} resizeMode="cover">
          <Text style={styles.descriptionText}>
        Please ensure that all details are filled correctly. To promote to owner status,
        your hotel must comply with all local regulations and standards.
      </Text>
          <TouchableOpacity onPress={() => setView('inputs')} style={styles.promoteButton}>
            <Text style={styles.promoteText}>Promote To Owner →</Text>
          </TouchableOpacity>
        </ImageBackground>
      )}



        {view === 'inputs' && (
          <View style={styles.paddedContent}>
          <>
          <View style={ {
   
  height: 70,

justifyContent: 'center',
    backgroundColor:"#112678"

  }}>
            <TouchableOpacity onPress={() => setView('profile')}>
              <Icons name="chevron-back-circle-outline" color='#ffffff' size={40}  paddingLeft={10}/>
            </TouchableOpacity>
    </View>
            <View style={styles.formContainer}>
              <Text style={styles.formHeading}>Create Your Hotel</Text>
              <TextInput
                style={styles.input}
                placeholder="Hotel Name"
                value={hotelData.name}
                onChangeText={(name) => setHotelData({ ...hotelData, name })}
              />
              <TextInput
                style={styles.input}
                placeholder="Hotel Licence"
                value={hotelData.licence}
                onChangeText={(licence) => setHotelData({ ...hotelData, licence })}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={hotelData.description}
                onChangeText={(description) => setHotelData({ ...hotelData, description })}
              />
              <TextInput
                style={styles.input}
                placeholder="Rooms"
                keyboardType="numeric"
                value={hotelData.rooms}
                onChangeText={(rooms) => setHotelData({ ...hotelData, rooms })}
              />
               <View style={{flexDirection:'column', gap: 10 }}>
                <View />
                <View />
                <View />
                <View />
               </View>
              <Text onPress={pickImage} style={{color:"black"}}>Select your {ImageIcon}</Text>
              <View style={{flexDirection:'column', gap: 10 }}>
                <View />
                <View />
                <View />
                <View />
               </View>
               <ScrollView horizontal>
            {hotelData.media.map((uri, index) => (
              <Image key={index} source={{ uri }} style={{ width: 100, height: 100, marginRight: 10 }} />
            ))}
          </ScrollView>
              <Text style={styles.label}>Rating:</Text>
              <Picker
                selectedValue={hotelData.rating}
                style={styles.picker}
                onValueChange={(rating) => setHotelData({ ...hotelData, rating })}
              >
                <Picker.Item label="Please select a rating" value="" />
                <Picker.Item label="3 Stars" value="3" />
                <Picker.Item label="4 Stars" value="4" />
                <Picker.Item label="5 Stars" value="5" />
              </Picker>
            </View>
            <TouchableOpacity onPress={() => setView('map')} style={[{ width: 70, height: 40 , backgroundColor: '#112678', 
    borderRadius: 8,
    alignItems: 'center',marginLeft:150
     }]}>
              <Text style={{ alignItems: 'center' ,paddingTop:6,paddingRight:3,color:"#ffffff" ,fontSize:20}}> Next</Text>
            </TouchableOpacity>
          </>
          </View>
        )}

        {view === 'map' && (
          <View style={styles.paddedContent}>
          <>
          <View style={ {
   
   height: 70,
 
 justifyContent: 'center',
     backgroundColor:"#112678"
 
   }}>
            <TouchableOpacity onPress={() => setView('inputs')}>
            <Icons name="chevron-back-circle-outline" color='#ffffff' size={40}  paddingLeft={10}/>
            </TouchableOpacity>
            </View>
            <View style={styles.mapContainer}>
              <Map />
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </>
          </View>
        )}
      </View>
    
  );
};
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
  paddedContent: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  label: {
    fontWeight: '600',
    marginBottom: 5,
    color: '#444',
  },
  infoText: {
    marginBottom: 10,
    color: '#666',
  },
  linkText: {
    fontSize: 20,
    color: '#FFFFFF',
   
  },
  formContainer: {
    padding:43
  },
  formHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  mapContainer: {
    height: 650,
    marginTop: 5,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#112678',
    justifyContent: 'center',
    borderRadius:20,
    marginBottom: 10,
    width:90,
    height:40,
    alignItems: 'center',
    marginLeft:150
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  backgroundImage: {
    opacity:1,
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  promoteButton: {
    marginTop: 200,
    padding: 10,
    backgroundColor: '#112678',
    
    borderRadius: 5,
    alignSelf: 'center',
  },
  promoteText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  descriptionText: {
    color: 'white', 
    textAlign: 'center',
    marginTop: 200,
    fontSize: 22,
    padding: 10,
    borderRadius: 5,
  },
});

export default OwnerProfile;
