import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EditProfile = ({ profile, onSave }) => {
  const [editedProfile, setEditedProfile] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    console.log('Profile:', profile); // Log the profile object
    // Update the editedProfile state whenever the profile prop changes
    setEditedProfile({
      name: profile ? profile.name : '',
      email: profile ? profile.email : '',
      password: profile ? profile.password : '',
    });
  }, [profile]);

  const handleSave = () => {
    onSave(editedProfile);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.formHeading}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        value={editedProfile.name}
        onChangeText={(value) => setEditedProfile({ ...editedProfile, name: value })}
        placeholder="Enter your name"
      />
      <TextInput
        style={styles.input}
        value={editedProfile.email}
        onChangeText={(value) => setEditedProfile({ ...editedProfile, email: value })}
        placeholder="Enter your email"
      />
      <TextInput
        style={styles.input}
        value={editedProfile.password}
        onChangeText={(value) => setEditedProfile({ ...editedProfile, password: value })}
        placeholder="Enter your password"
        secureTextEntry={true}
      />
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default EditProfile;
