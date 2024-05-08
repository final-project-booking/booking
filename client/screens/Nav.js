import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Onboarding from '../src/component/Inboarding/Inboarding'; 
import UserProfile from "../src/component/UserProfile/UserProfile"
import EditProfile from '../src/component/editprofile/EditProfile';
import Home from "../src/component/HomePage/Home"
import OwnerProfile from "../src/component/OwnerProfile/OwnerProfile"
import AppFace from "../src/component/AppFace/AppFace";
import Reservation  from '../src/component/Detail/Reservation';
import ChooseChildren from '../src/component/Detail/ChooseChildren';
const Tab = createBottomTabNavigator();
import Login from "../src/component/authentication/Login"
import SignUp from '../src/component/authentication/SigneUp';
import Detail from '../src/component/Detail/Detail';
const Stack = createNativeStackNavigator();
const Nav = () =>{
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Onboarding"  component={Onboarding}  options={{ headerShown: false }} />
        <Stack.Screen name="AppFace"  component={AppFace} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
        <Stack.Screen name="OwnerProfile" component={OwnerProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }}/> 
        <Stack.Screen name="Reservation" component={Reservation} options={{ headerShown: false }}/>
        <Stack.Screen name="ChooseChildren" component={ChooseChildren} options={{ headerShown: false }}/>
     </Stack.Navigator>
    </NavigationContainer>

  );
}
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Start" component={AppFace} options={{ headerShown: false }} />
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default Nav;
