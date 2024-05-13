import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Onboarding from '../src/component/Inboarding/Inboarding'; 
import UserProfile from "../src/component/UserProfile/UserProfile"
import EditProfile from '../src/component/editprofile/EditProfile';
import Home from "../src/component/HomePage/Home"
import OwnerProfile from "../src/component/OwnerProfile/OwnerProfile"
import AppFace from "../src/component/AppFace/AppFace.js";

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFa from 'react-native-vector-icons/FontAwesome';
import Hotels, { FA5Style } from 'react-native-vector-icons/FontAwesome5'
import Favorite from "react-native-vector-icons/MaterialIcons"
import Reservation  from '../src/component/detail/Reservation.js';
import ChooseChildren from '../src/component/detail/ChooseChildren.js';
import Login from "../src/component/authentication/Login"
import SignUp from '../src/component/authentication/SigneUp';
import Hotelprofile from '../src/component/Hotelprofile/Hotelprofile.js';
import AllHotels from '../src/component/allHotels/AllHotels.js';
import RoomByHotel from '../src/component/allHotels/RoomByHotel.js';
import ChooseGategory from '../src/component/allHotels/ChooseGategory.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function Nav() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="AllHotels" component={AllHotels} options={{ headerShown: false }}/>
        <Stack.Screen name="ChooseGategory" component={ChooseGategory} options={{ headerShown: false }}/>
        <Stack.Screen name="Reservation" component={Reservation} options={{ headerShown: false }}/> */}
        <Stack.Screen name="Onboarding"  component={Onboarding}  options={{ headerShown: false }} />

        <Stack.Screen name="AppFace"  component={AppFace} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />

        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="TabNavigator"  component={TabNavigator}  options={{ headerShown: false }} />
        
        <Stack.Screen name="AllHotels" component={AllHotels} options={{ headerShown: false }}/>
        <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown: false}} />
        <Stack.Screen name="OwnerProfile" component={OwnerProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="Hotelprofile" component={Hotelprofile} options={{ headerShown: false }}/>
       
        <Stack.Screen name="ChooseChildren" component={ChooseChildren} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
  name="Home"
  component={Home}
  options={{
    headerShown: false,
    tabBarIcon: ({ color, size }) => (
      <Icon name="home" color={color} size={size} />
    ),
    tabBarLabelStyle: {
      fontSize: 14
    }
  }}
/>
<Tab.Screen
  name="Hotel"
  component={UserProfile}
  options={{
    headerShown: false,
    tabBarIcon: ({ color, size }) => (
      <Hotels name="hotel" color={color} size={20} />
    ),
    tabBarLabelStyle: {
      fontSize: 14
    }
  }}
/>
<Tab.Screen
  name="Favorite"
  component={Home}
  options={{
    headerShown: false,
    tabBarIcon: ({ color, size }) => (
      <Favorite name="favorite" color={color} size={size} />
    ),
    tabBarLabelStyle: {
      fontSize: 14
    }
  }}
/>
<Tab.Screen
  name="Profile"
  component={UserProfile}
  options={{
    headerShown: false,
    tabBarIcon: ({ color, size }) => (
      <IconFa name="user-circle-o" color={color} size={size} />
    ),
    tabBarLabelStyle: {
      fontSize: 14
    }
  }}
/>
    </Tab.Navigator>
  );
}

export default Nav;
