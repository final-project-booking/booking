import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import EditProfile from './src/component/editprofile/EditProfile';
import UserProfile from './src/component/UserProfile/UserProfile'



function App() {
 
  return (
<SafeAreaView style={styles.container}>

<UserProfile/>

</SafeAreaView>
  );                                      


}

const styles = StyleSheet.create({
  container: {
    flex: 1,

   
  },
});




export default App;
