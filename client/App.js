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
import Hotelprofile from './src/component/Hotelprofile/Hotelprofile';
import AllHotels from './src/component/allHotels/AllHotels';
import RoomByHotel from './src/component/allHotels/RoomByHotel';
import Detail from './src/component/detail/Detail';
import ChooseChildren from './src/component/detail/ChooseChildren';
import ChooseGategory from './src/component/allHotels/ChooseGategory';
import Calendar from './src/component/detail/Reservation';
import AdvancedFilter from './src/component/AdvancedFilter/AdvancedFilter';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
 
  return (
    // <UserProfile/>
  //  <AdvancedFilter/> 
    <GestureHandlerRootView style={{flex: 1}}>
      <Nav />
    </GestureHandlerRootView>
  )}
  
export default App;
