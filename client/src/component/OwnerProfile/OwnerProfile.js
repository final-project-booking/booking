import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity,Button,ImageBackground ,Dimensions} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Map from '../Map/Map';
import {launchImageLibrary} from 'react-native-image-picker';
import {cloud_name,preset} from "../../apAdress"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { promoteToOwner } from '../../reduce/Ownerprofile';
import pic from '../../Photo/hottell.webp'
const OwnerProfile = () => {
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
            <TouchableOpacity onPress={() => setView('profile')}>
              <Text style={styles.linkText}>← Back</Text>
            </TouchableOpacity>
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
            <TouchableOpacity onPress={() => setView('map')}>
              <Text style={styles.linkText}>Next →</Text>
            </TouchableOpacity>
          </>
          </View>
        )}

        {view === 'map' && (
          <View style={styles.paddedContent}>
          <>
            <TouchableOpacity onPress={() => setView('inputs')}>
              <Text style={styles.linkText}>← Back</Text>
            </TouchableOpacity>
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
  
  // scrollContainer: {
  //   backgroundColor: '#ffffff',
  //   // flex: 1,
  // },
  // container: {
  //   flex: 1,
  //   padding: 20,
  //   backgroundColor: '#ffffff',
  // },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  //
  paddedContent: {
    flex: 1,
    padding: 20,  // Apply padding here for other views
  },
  //
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
    fontSize: 18,
    color: '#007BFF',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 20,
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
    height: 400,
    marginTop: 20,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  promoteButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(0, 123, 255, 0.8)',
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
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent background for better readability
    padding: 10,
    borderRadius: 5,
  },
});

export default OwnerProfile;
