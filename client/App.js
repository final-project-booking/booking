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
import AppFace from './src/component/AppFace/AppFace';
import Inboarding from './src/component/Inboarding/Inboarding';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from './src/component/HomePage/Home';
import Nav from './screens/Nav';

import Map from "./src/component/Map/Map"
import AllHotels from './src/component/allHotels/AllHotels';
import RoomByHotel from './src/component/allHotels/RoomByHotel';
import ChooseChildren from './src/component/detail/ChooseChildren';
import ChooseGategory from './src/component/allHotels/ChooseGategory';
import OwnerProfile from './src/component/OwnerProfile/OwnerProfile'
// import Calendar from './src/component/Detail/Reservation';
import Hotelprofile from './src/component/Hotelprofile/Hotelprofile';
import AdvancedFilter from './src/component/AdvancedFilter/AdvancedFilter';
import Detail from './src/component/detail/Detail';
import Reservation from './src/component/detail/Reservation';
import { race } from 'core-js/library/es6/promise';
import SignUp from './src/component/authentication/SigneUp';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
 
  return (
    // <UserProfile/>
    // <EditProfile/> 
// {/* <Map/>    */}
//        {/* <Payment/>  */}
//       {/* <AppFace/> 
//        <Inboarding/>  */}
    
    // <GestureHandlerRootView style={{flex: 1}}>
    //   <Hotelprofile/>
    // //  <AdvancedFilter/> 
    // // <GestureHandlerRootView style={{flex: 1}}>
    //   // {/* <Login/> */}
    //   //<Hotelprofile />
    //       // <Hotelprofile/> 

    <GestureHandlerRootView> 
     <Nav/>
    </GestureHandlerRootView>
  )}
  
export default App;
