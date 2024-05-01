import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppFace from "../src/component/AppFace/AppFace"
import UserProfile from "../src/component/UserProfile/UserProfile"
import EditProfile from '../src/component/editprofile/EditProfile';
import Home from "../src/component/HomePage/Home"
import OwnerProfile from "../src/component/OwnerProfile/OwnerProfile"

// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
       <Stack.Screen
          name="AppFace"
          component={AppFace}
          options={{ headerShown: false }}
          initialParams={{ navigation: navigation }}

        /> 
         <Stack.Screen
          name="Home"
          component={Home}
          options= {{ headerShown: false }}
        /> 
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={({ navigation }) => ({ headerShown: false, navigation })}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={({ navigation }) => ({ headerShown: false, navigation })}
        />
         <Stack.Screen
          name="OwnerProfile"
          component={OwnerProfile}
          options={({ navigation }) => ({ headerShown: false, navigation })}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Nav;
