import React from 'react';
import {Picker} from '@react-native-picker/picker';
import { SafeAreaView, StyleSheet } from 'react-native';
import SignUp from './src/component/authentication/SigneUp';
import signIn from "./src/component/authentication/Login"
import EditProfile from './src/component/editprofile/EditProfile';
import UserProfile from './src/component/UserProfile/UserProfile'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapCoffe from "../client/src/component/map/main"
import HomePage from './src/component/HomePage/Home';
import SideBar from './src/component/sideBar/screen';
import AboutUs from './src/component/aboutUs/screen'; 
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import Icon from 'react-native-vector-icons/FontAwesome';

function NAVSTART() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Start" component={UserProfile} options={{ headerShown: false }} />
        <Stack.Screen name="Start" component={EditProfile} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}


function App() {
console.log("App",process.env.hello);
  return (

    <NavigationContainer>
       <Tab.Navigator
       initialRouteName='Side bar'
       >
       {/* <Tab.Screen name="signUp" component={SignUp}   options={{ headerShown: false }} /> */}
       <Tab.Screen name="signIn" component={signIn}   options={{ headerShown: false }} />
       {/* <Tab.Screen name="About Us" component={AboutUs}/>
       <Tab.Screen name="Side bar" component={SideBar} /> */}
       {/* <Stack.Screen name="about us" component={AboutUs} /> */}
        
      {/* <Tab.Screen name="UserProfile" component={MapCoffe}   options={{ headerShown: false }} /> */}
    {/*   <Tab.Screen name="EditProfile" component={EditProfile} /> 
      <Tab.Screen name="Start" component={map} options={{ headerShown: false }} />*/}
      </Tab.Navigator>
    </NavigationContainer>

  );                                      



}
export default App;
