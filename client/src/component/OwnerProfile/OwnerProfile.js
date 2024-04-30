import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
// import MapboxGL from '@react-native-mapbox-gl/maps';
// MapboxGL.setAccessToken('pk.eyJ1IjoicmlhZGhsb3VkaGFpZWYiLCJhIjoiY2x2Z2o5bmcwMG84cDJpbzV0MnVsd3UyNSJ9.rxoADhSxn7klh-OQFuafPg');

// import MapView, { Marker } from 'react-native-maps';

const OwnerProfile = () => {
  const [profile, setProfile] = useState({
    name:'Joh Doe',
    email: 'johndoe@example.com',
    password: 'password', 
    imageUrl: 'https://th.bing.com/th/id/OIP.2i5UaEHaQM3PYAYXQyM1AAAAAA?w=177&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7', // Provided image URL
    location: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  });
  
  const [rating, setRating] = useState('');
  const { name, email, imageUrl,location} = profile;

  // const location = {
  //   latitude: 37.78825,
  //   longitude: -122.4324,
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // };

  const handleSave = () => {
    console.log('Changes saved');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Hotel Owner</Text>
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
          <Text style={styles.formHeading}>Create ur Hotel</Text>
          <TextInput
            style={styles.input}
            placeholder="Hotel Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={(value) => setProfile({ ...profile, email: value })}
            placeholder="Hotel Image"
          />
          <TextInput
            style={styles.input}
            placeholder="Hotel Licence"
          />
          <TextInput
            style={styles.input}
            placeholder="description"
          />
          <TextInput
            style={styles.input}
            placeholder="Rooms"
          />
         <Text style={styles.label}>Rating:</Text>
         <Picker
         selectedValue={rating}
         style={styles.picker}
         onValueChange={(itemValue, itemIndex) =>
          setRating(itemValue)
         }>
         <Picker.Item label="Please select a rating" value="" />
         <Picker.Item label="3 Stars" value="3" />
         <Picker.Item label="4 Stars" value="4" />
         <Picker.Item label="5 Stars" value="5" />
        </Picker>
    
          
        <Text style={styles.label}>Location:</Text>
        {/* <SafeAreaView>
        <Text>Welcome to Mapbox</Text>
        <MapboxGL.MapView style={{ height: 300 }}>
        <MapboxGL.Camera
          zoomLevel={8}
          centerCoordinate={[-73.970895, 40.723279]}
        />
         </MapboxGL.MapView>
        </SafeAreaView> */}
          <Button title="Submit" onPress={handleSave} />
          
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
    height: 300,
    width: '100%',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  marker: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'red',
  }
});

export default OwnerProfile;