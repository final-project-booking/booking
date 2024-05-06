import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import EditProfile from '../editprofile/EditProfile';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserProfile = ({ navigation }) => {
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

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: profile.imageUrl }} style={styles.image} />
          <View style={styles.imageOverlay} />
        </View>
        <Text style={styles.heading}>Your Profile</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Icon name="user" size={30} color="#000" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.infoText}>{profile.name}</Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <Icon name="envelope" size={30} color="#000" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.infoText}>{profile.email}</Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <Icon name="map-marker" size={30} color="#000" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.label}>Location:</Text>
              <Text style={styles.infoText}>{`Latitude: ${profile.location.latitude}, Longitude: ${profile.location.longitude}`}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  imageOverlay: {
    position: 'absolute',
    backgroundColor: '#DCF2EC', // Background color that extends halfway down the image
    width: '100%',
    height: '50%',
    bottom: 0,
    borderRadius: 100,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#DCF2EC',
    padding: 10,
    borderRadius: 10,
    width: '80%',
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 18,
  },
  infoTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  infoText: {
    fontSize: 18,
  },
  editButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  editButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default UserProfile;
