import React,{useState} from 'react';
import { Button } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import AppFace from './src/component/AppFace/AppFace';
import Home from './src/component/HomePage/Home';
import Detail from './src/component/Detail/Detail';
import Reservation from './src/component/Detail/Reservation';
import Choose from './src/component/Detail/ChooseChildren'
import User from './src/component/UserProfile/UserProfile'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// import Icon from 'react-native-vector-icons/FontAwesome';
import Nav from './screens/Nav';
function App() {
 
  return (

 
  <User />

  );                                     
}
export default App;
