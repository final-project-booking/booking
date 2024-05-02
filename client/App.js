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
import Home from './src/component/HomePage/Home'
import HotelsByLocation from './src/component/HomePage/HotelsByLocation'
import AppFace from './src/component/appFace/appFace'
import ChatPage from './src/component/chat/chatPage'
import Detail from './src/component/detail/detail'
const stack = createNativeStackNavigator();
function NAVSTART() {
  return (
    <NavigationContainer>
      <stack.Navigator>
        {/* <Stack.Screen name="Start" component={UserProfile} options={{ headerShown: false }} />
        <Stack.Screen name="Start" component={EditProfile} options={{ headerShown: false }} /> */}
      <stack.Screen name="UserProfile" component={Home}   options={{ headerShown: false }} />

<stack.Screen name="HotelsByLocation" component={HotelsByLocation} options={{ headerShown: false }} />
<stack.Screen name="App" component={App} options={{ headerShown: false }} />


      </stack.Navigator>
    </NavigationContainer>
  );
}
function App() {
console.log("App",process.env.hello);
  return (

    // <NavigationContainer>
    //    <Tab.Navigator>
    //   {/* <Tab.Screen name="EditProfile" component={EditProfile} />  */}
    //   <Tab.Screen name="AppFace" component={AppFace} options={{ headerShown: false }} />
    //   </Tab.Navigator>
    // </NavigationContainer>
    <Detail/>

  );                                      



}
export default App;
