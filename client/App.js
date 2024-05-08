import React from 'react';
import Login from './src/component/authentication/Login';
import {Picker} from '@react-native-picker/picker';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import EditProfile from './src/component/editprofile/EditProfile';
import UserProfile from './src/component/UserProfile/UserProfile'
import { NavigationContainer } from '@react-navigation/native';
import Payment from "./src/component/Payment/Payment"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppFace from './src/component/AppFace/AppFace';
import Inboarding from './src/component/Inboarding/Inboarding';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './src/component/HomePage/Home';
import Nav from './screens/Nav';
import Map from "./src/component/Map/Map"
import Hotelprofile from './src/component/Hotelprofile/Hotelprofile';
// import Detail from './src/component/detail/Detail';
import OwnerProfile from './src/component/OwnerProfile/OwnerProfile';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
// import Icon from 'react-native-vector-icons/FontAwesome';
function App() {
 
  return (
    // <OwnerProfile/>
  <>
    <Nav/>
  </>
      
            //  <Hotelprofile /> 
//              {/* <Home/>  */}
// {/* 
    // <UserProfile/>
    // <EditProfile/> 
// {/* <Map/>    */}
//        {/* <Payment/>  */}
//       {/* <AppFace/> 
//        <Inboarding/>  */}
  )}
  
export default App;
