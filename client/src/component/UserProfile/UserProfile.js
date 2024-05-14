

  

  import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { getOneAsync } from '../../reduce/getOne';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  // const [profile, setProfile] = useState(null);

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('token');
  //       const decoded = jwtDecode(token);
  //       const userId = decoded.id;
  //       const userData = await dispatch(getOneAsync(userId));
  //       setProfile(userData.payload);
  //     } catch (error) {
  //       console.log('Error fetching user data:', error);
  //     }
  //   };
  
  //   fetchUserProfile();
  // }, [dispatch]);
const profile = {
  firstName: 'John' ,
  lastName:   'Doe',
    email: 'johndoe@example.com',
    password: 'password',
    imageUrl: 'https://th.bing.com/th/id/OIP.2i5UaEHaQM3PYAYXQyM1AAAAAA?w=177&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', // Provided image URL
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
      phoneNumber: 5457543
    }
  };
  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const renderProfileInfo = () => {
    return (
      <View style={styles.infoContainer}>
        <ProfileInfo label="Full name:" value={`${profile.firstName} ${profile.lastName}`} iconName="user" />
        <ProfileInfo label="Email:" value={profile.email} iconName="envelope" />
        <ProfileInfo label="Phone number:" value={profile.phoneNumber} iconName="phone" />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: profile?.imageUrl }} style={styles.image} />
        <Text style={styles.heading}>Your Profile</Text>
        {profile && renderProfileInfo()}
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const ProfileInfo = ({ label, value, iconName }) => {
  return (
    <View style={styles.infoBox}>
      <Icon name={iconName} size={30} color="#000" />
      <View style={styles.infoTextContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.infoText}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
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
  },
  editButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default UserProfile;
