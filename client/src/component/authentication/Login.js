import React,{ useState } from 'react'
import{
    SafeAreaView,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    View
}from "react-native"
// import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch ,useSelector} from 'react-redux';
import {signInAsync} from "../../reduce/authentication/signInReducer"

const Login = () => {
  const [login,setLogin]=useState({
    email:'',
    password:''
  })
  const error = useSelector(state => state.userSignIn.error);
  const dispatch=useDispatch()
  console.log(error);
  const handleInputChange = (name, value) => {
        setLogin({ ...login, [name]: value });
      };

      const handleSignIn=()=>{
        dispatch(signInAsync(login))
      }

      const isError = error && (error.email || error.password);

  return (
    <SafeAreaView style={styles.safeAreaView}>
          <Text style={styles.previousBtn}>Previous</Text>
          <Text style={styles.login}>Log in</Text>
          {isError && (
        <Text style={styles.errorText}>Invalid email or password</Text>
      )}
          <View style={styles.loginContainer}>
          <View style={styles.login_inputsContainer}>
            <Text style={styles.login_label}>Email</Text>
            <TextInput
            placeholder='----------------------------------------------'
            style={styles.input}
            onChangeText={(text) => handleInputChange('email', text)}
            value={login.email}
            />
            <Text style={styles.login_label}>Password</Text>
            <TextInput
            style={styles.input}
            secureTextEntry
            placeholder='********'
            onChangeText={(text) => handleInputChange('password', text)}
            value={login.password}
            />
          </View>
          <Text style={styles.login_forget}>Forget password ?</Text>
            <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleSignIn}
            >
            <Text style={styles.loginText}>Login</Text>
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
  previousBtn:{
    fontSize:20,
    backgroundColor:"#2f55a4",
    width:100,
    height:30,
    paddingLeft:10,
   paddingRight:10,
   borderRadius:10,
   marginTop:5,
   marginLeft:5,
   color:"white"
  },
  login_label:{
    marginBottom:-20,
    marginTop:30,
    marginLeft:10,
    color:"black",
    fontSize:15,
  },
  loginContainer:{
    alignItems:"center",
    marginTop:-130
  },
  login:{
    fontSize:30,
    marginTop:50,
    textAlign:"center",
    color:"#2f55a4",
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
      borderColor: "black",
      borderWidth:20,
      borderStyle:"solid",
      height: 60,
      width: 400,
      fontSize: 20,
      borderWidth: 1,
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
        width: 400,
        borderRadius: 30,
        borderStyle:"solid",
        backgroundColor: '#2f55a4'
      },
      
      loginText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize:20
      }
})

export default Login
