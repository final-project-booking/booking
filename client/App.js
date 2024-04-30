import React from 'react';
import {Picker} from '@react-native-picker/picker';
import { SafeAreaView, StyleSheet } from 'react-native';
import EditProfile from './src/component/editprofile/EditProfile';
import UserProfile from './src/component/UserProfile/UserProfile'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapCoffe from "../client/src/component/map/main"
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
       <Tab.Navigator>
      <Tab.Screen name="UserProfile" component={MapCoffe}   options={{ headerShown: false }} />
    {/*   <Tab.Screen name="EditProfile" component={EditProfile} /> 
      <Tab.Screen name="Start" component={map} options={{ headerShown: false }} />*/}
      </Tab.Navigator>
    </NavigationContainer>

  );                                      



}
export default App;
