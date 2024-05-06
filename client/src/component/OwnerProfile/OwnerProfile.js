import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import Map from '../Map/Map';

const OwnerProfile = () => {
  const [profile, setProfile] = useState({
    firsttName: 'John ',
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

  const [rating, setRating] = useState('');
  const [view, setView] = useState('profile');
  const { firsttName, lastName, email, phoneNumber, imageUrl, location } = profile;

  const handleSave = () => {
    console.log('Changes saved');
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {view === 'profile' && (
          <>
            <Text style={styles.heading}>Hotel Owner</Text>
            <View style={styles.profileInfo}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
              <Text style={styles.label}>First Name:</Text>
              <Text style={styles.infoText}>{firsttName}</Text>
              <Text style={styles.label}>Last Name:</Text>
              <Text style={styles.infoText}>{lastName}</Text>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.infoText}>{email}</Text>
              <Text style={styles.label}>Phone Number:</Text>
              <Text style={styles.infoText}>{phoneNumber}</Text>
              <Text style={styles.label}>Location:</Text>
              <Text style={styles.infoText}>{`Latitude: ${location.latitude}, Longitude: ${location.longitude}`}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => setView('inputs')}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </>
        )}

        {view === 'inputs' && (
          <>
            <TouchableOpacity style={styles.button} onPress={() => setView('profile')}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.formContainer}>
              <Text style={styles.formHeading}>Create Your Hotel</Text>
              <TextInput style={styles.input} placeholder="Hotel Name" />
              <TextInput
                style={styles.input}
                placeholder="Hotel Image"
                onChangeText={(value) => setProfile({ ...profile, imageUrl: value })}
              />
              <TextInput style={styles.input} placeholder="Hotel Licence" />
              <TextInput style={styles.input} placeholder="Description" />
              <TextInput style={styles.input} placeholder="Rooms" />
              <Text style={styles.label}>Rating:</Text>
              <Picker selectedValue={rating} style={styles.picker} onValueChange={(itemValue) => setRating(itemValue)}>
                <Picker.Item label="Please select a rating" value="" />
                <Picker.Item label="3 Stars" value="3" />
                <Picker.Item label="4 Stars" value="4" />
                <Picker.Item label="5 Stars" value="5" />
              </Picker>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => setView('map')}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </>
        )}

        {view === 'map' && (
          <>
            <TouchableOpacity style={styles.button} onPress={() => setView('inputs')}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <View style={styles.mapContainer}>
              <Map />
            </View>
            <Button title="Submit" onPress={handleSave} color="#4CAF50" />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#f4f4f4',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  heading: {
    fontSize: 28,
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
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  infoText: {
    marginBottom: 10,
    color: '#555',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  formContainer: {
    marginTop: 20,
  },
  formHeading: {
    fontSize: 20,
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    height: 300,
  },
});

export default OwnerProfile;
