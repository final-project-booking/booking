import React from 'react';
import {Picker} from '@react-native-picker/picker';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import EditProfile from './src/component/editprofile/EditProfile';
import UserProfile from './src/component/UserProfile/UserProfile'
import { NavigationContainer } from '@react-navigation/native';
import Payment from "./src/component/Payment/Payment"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppFace from './src/component/AppFace/AppFace';
import Inboarding from './src/component/Inboarding/Inboarding';
import Home from './src/component/HomePage/Home';
import Nav from './screens/Nav';
import Map from "./src/component/Map/Map"
import Hotelprofile from './src/component/Hotelprofile/Hotelprofile';
import Login from './src/component/authentication/Login';
import SignUp from './src/component/authentication/SigneUp';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// import Icon from 'react-native-vector-icons/FontAwesome';
function App() {
 
  return (
    // <SignUp/>
    // <Login/>
    <EditProfile/>
    // <Nav/>
            //  <Hotelprofile /> 
//              {/* <Home/>  */}
// {/* 
//     <UserProfile/>
/* <SignUp/> 
<EditProfile/>
// {/* <Map/>   */
//        {/* <Payment/>  */}
//       {/* <AppFace/> 
//        <Inboarding/>  */}
  )}
export default App;
