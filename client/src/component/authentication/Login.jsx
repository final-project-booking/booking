import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';

const ownerProfile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password', 
    imageUrl: 'https://th.bing.com/th/id/OIP.2i5UaEHaQM3PYAYXQyM1AAAAAA?w=177&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', // Provided image URL
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  });

  const { name, email, imageUrl, location } = profile;

  const handleSave = () => {
    console.log('Changes saved');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>User Profile</Text>
        <View style={styles.profileInfo}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.infoText}>{name}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.infoText}>{email}</Text>
         <Text style={styles.label}>Location:</Text>
          <Text style={styles.infoText}>{`Latitude: ${location.latitude}, Longitude: ${location.longitude}`}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.formContainer}>
          <Text style={styles.formHeading}>Edit Profile</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(value) => setProfile({ ...profile, name: value })}
            placeholder="Enter your name"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(value) => setProfile({ ...profile, email: value })}
            placeholder="Enter your email"
          />
          <TextInput
            style={styles.input}
            value={profile.password}
            onChangeText={(value) => setProfile({ ...profile, password: value })}
            placeholder="Enter your password"
            secureTextEntry={true}
          />
           <Text style={styles.label}>Location:</Text> 
          <View style={styles.mapContainer}>
            {/* <MapView
              style={styles.map}
              initialRegion={{
                ...location,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker coordinate={location} />
            </MapView> */}
          </View> 
          <Button title="Save Changes" onPress={handleSave} />
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
    width: 150,
    height: 150,
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
  separator: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  formHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  mapContainer: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  }
});

export default ownerProfile;
