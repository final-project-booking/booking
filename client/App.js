import React from 'react';
import {Picker} from '@react-native-picker/picker';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import EditProfile from './src/component/editprofile/EditProfile';
import UserProfile from './src/component/UserProfile/UserProfile'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapCoffe from "../client/src/component/map/main"
import AppFace from './src/component/AppFace/AppFace';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import Icon from 'react-native-vector-icons/FontAwesome';
import Nav from './screens/Nav';
function App() {
  return (
       <View>
        {/* <Nav /> */}
        <AppFace/>
       </View> 


  );                                      



}
export default App;
