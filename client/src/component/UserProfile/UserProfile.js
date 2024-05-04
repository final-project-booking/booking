import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView ,TouchableOpacity} from 'react-native';
import EditProfile from '../editprofile/EditProfile';
// import MapView, { PROVIDER_GOOGLE } from 'UserProfile.js";serProfile.js";eact-native-maps';
const UserProfile = ({navigation}) => {
  const profile = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password',
    imageUrl: 'https://th.bing.com/th/id/OIP.2i5UaEHaQM3PYAYXQyM1AAAAAA?w=177&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', // Provided image URL
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    }
  };
  const handleSave = () => {
    console.log('Changes saved');
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Your Profile</Text>
        <View style={styles.profileInfo}>
          <Image source={{ uri: profile.imageUrl }} style={styles.image} />
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.infoText}>{profile.name}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.infoText}>{profile.email}</Text>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.infoText}>{`Latitude: ${profile.location.latitude}, Longitude: ${profile.location.longitude}`}</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 75,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  editButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default UserProfile;
