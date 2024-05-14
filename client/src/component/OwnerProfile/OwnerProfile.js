import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity,Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Map from '../Map/Map';
import {launchImageLibrary} from 'react-native-image-picker';
import {cloud_name,preset} from "../../apAdress"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { promoteToOwner } from '../../reduce/Ownerprofile';

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
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {view === 'profile' && (
          <>
            <Text style={styles.heading}>Hotel Owner</Text>
            <View style={styles.profileInfo}>
              <Image source={{ uri: profile.imageUrl }} style={styles.image} />
              <Text style={styles.label}>First Name:</Text>
              <Text style={styles.infoText}>{profile.firstName}</Text>
              <Text style={styles.label}>Last Name:</Text>
              <Text style={styles.infoText}>{profile.lastName}</Text>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.infoText}>{profile.email}</Text>
              <Text style={styles.label}>Phone Number:</Text>
              <Text style={styles.infoText}>{profile.phoneNumber}</Text>
              <Text style={styles.label}>Location:</Text>
              <Text style={styles.infoText}>{`Latitude: ${profile.location.latitude}, Longitude: ${profile.location.longitude}`}</Text>
            </View>
            <TouchableOpacity onPress={() => setView('inputs')}>
              <Text style={styles.linkText}>Promote To Owner →</Text>
            </TouchableOpacity>
          </>
        )}

        {view === 'inputs' && (
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
        )}

        {view === 'map' && (
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
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
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
});

export default OwnerProfile;