import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import EditProfile from './src/component/editprofile/EditProfile';
import UserProfile from './src/component/UserProfile/UserProfile'
// import NAVSTART from './screens/Nav'
function App() {
  // const Stack = createStackNavigator();
  return (
<SafeAreaView style={styles.container}>
{/* <NAVSTART/> */}
<UserProfile/>
{/* <EditProfile/> */}
</SafeAreaView>
  );                                      


// import SigneUp from "./src/component/authentication/SigneUp.js"
// import {StyleSheet,Text,View} from "react-native"
// function App(){
//   // return <Text>hah</Text>
//   return(<SigneUp></SigneUp>)
// }



// import {SafeAreaView,  StyleSheet,  Text,  useColorScheme,  View,} from 'react-native';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
// import AppFace from './src/component/appFace/appFace.js';
// import Home from './src/component/HomePage/Home.js'
// import 'react-native-gesture-handler';


// import OwnerProfile from './src/component/OwnerProfile/OwnerProfile';
  
// function App() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <OwnerProfile />
//     </SafeAreaView>
//   );
// }
// import {SafeAreaView,  StyleSheet,  Text,  useColorScheme,  View,} from 'react-native';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
// import AppFace from './src/component/appFace/appFace.js';
// import Home from './src/component/HomePage/Home.js'
// import 'react-native-gesture-handler';
// function App(){




//   return (
//     // <SafeAreaView style={styles.container}>
//     // <NavigationContainer>
//     // <View>
//     //   <Text>hello</Text>
//     // </View>
//       <Home />
   
      // </NavigationContainer>
  // );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,

   
  },
});

//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });



export default App;
