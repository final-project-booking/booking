import React from 'react';
import {Picker} from '@react-native-picker/picker';
import Login from "./src/component/authentication/Login"
import { SafeAreaView, StyleSheet, View } from 'react-native';
import EditProfile from './src/component/editprofile/EditProfile';
import UserProfile from './src/component/UserProfile/UserProfile'
import { NavigationContainer } from '@react-navigation/native';
import Payment from "./src/component/Payment/Payment"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppFace from './src/component/AppFace/AppFace';
import Home from './src/component/HomePage/Home';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// import Icon from 'react-native-vector-icons/FontAwesome';
import Nav from './screens/Nav';
function App() {
  return (
    <Login/>
    // <Nav/>ytdy
      //  < Home/>
  // <Payment/>
  );                                     
}
export default App;
