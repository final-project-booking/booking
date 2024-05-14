import React,{ useEffect, useState } from 'react'
import{
    SafeAreaView,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Alert
}from "react-native"
import { useDispatch ,useSelector} from 'react-redux';
import {signInAsync} from "../../reduce/authentication/signInReducer"


const Login = ({navigation}) => {
  const handleLogin = ()=>{
navigation.navigate("Home");
  }
  const [login,setLogin]=useState({
    email:'',
    password:''
  })

  const error = useSelector(state => state.edite.error);
  const success=useSelector(state=>state.userSignIn.success)
  const user=useSelector(state=>state.userSignIn.userAuth)
  console.log(user);
  const dispatch=useDispatch()
  console.log(error);
  const handleInputChange = (name, value) => {
    setLogin({ ...login, [name]: value });
  };
  
  const handleSignIn=()=>{
    dispatch(signInAsync(login))
  }
  const checkLogin=()=>{
    if(success){
      navigation.navigate("Detail")
    }else{

      console.log(success);
        Alert.alert('check your information')
    }
    }

      const isError = error || (error.email || error.password);

  return (
    <SafeAreaView style={styles.safeAreaView}>
          <Text style={styles.login}>Log in</Text>
          
          <View style={styles.loginContainer}>
          <View style={styles.login_inputsContainer}>
            <Text style={styles.login_label}>Email</Text>
            <TextInput
            placeholder='Example@gmail.com'
            style={styles.input}
            onChangeText={(text) => handleInputChange('email', text)}
            value={login.email}
            />
            
            <Text style={styles.login_label}>Password</Text>
            <TextInput
            style={styles.input}
            secureTextEntry
            placeholder='Ex@mPl3'
            onChangeText={(text) => handleInputChange('password', text)}
            value={login.password}
            />
          </View><View>
            
          {isError && (
        <Text style={styles.errorText}>Invalid email or password</Text>
      )}
          </View>
          <Text style={styles.login_forget}>Forget password ?</Text>
            <TouchableOpacity
            style={styles.buttonContainer}
            onPress={()=>{handleSignIn(),checkLogin()}}
            >
            <Text style={styles.loginText} >Login  </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  
  login_inputsContainer:{
    marginTop:"40%",
    borderStyle:"solid",

  },
  safeAreaView:{
    marginTop:40
  },
  errorText:{
    color:"red",
    marginTop:15,
    fontSize:15,
    fontWeight:"bold"
  },
  
  login_label:{
    marginBottom:-10,
    marginTop:30,
    marginLeft:5,
    color:"black",
    fontSize:15,
    fontWeight:"bold"
  },
  loginContainer:{
    alignItems:"center",
    marginTop:-130
  },
  login:{
    fontSize:30,
    marginTop:50,
    textAlign:"center",
    color:"#112678",
    fontWeight:"bold"
  },
  login_forget:{
    color:"black",
    fontWeight:"bold",
    fontSize:20,
    marginTop:20,
    marginBottom:20
  },
    input: {
      color:"black",
      fontWeight:"bold",
      borderColor: "#DCE2FC",
      borderWidth:20,
      borderStyle:"solid",
      height: 60,
      width: 380,
      fontSize: 20,
      borderWidth: 3,
      borderRadius: 20,
      marginTop: 20,
      paddingLeft: 20,
    },
    
      buttonContainer: {
        marginTop: 10,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 380,
        borderRadius: 30,
        borderStyle:"solid",
        backgroundColor: '#112678'
      },
      
      loginText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize:20
      }
})

export default Login
