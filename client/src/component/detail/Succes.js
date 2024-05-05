import React from 'react'
import { View,Text,ImageBackground,Button } from 'react-native'

export default function Succes() {
  return (
    <ImageBackground source={{uri:'https://images.pexels.com/photos/381739/pexels-photo-381739.jpeg?cs=srgb&dl=pexels-sevenstormphotography-381739.jpg&fm=jpg'}} style={{width: '100%', height: '100%'}}>
    <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.5)'}}>
    <View>
    <Text style={{fontSize:50,textAlign:'center',marginTop:150,color:'blue'}}>Reservation successfully</Text>
    <Text style={{fontSize:25,textAlign:'center',marginTop:100,color:'red'}}>Thank you for your trust</Text>
    </View>
    <View style={{marginTop:'45%' , height:50,width:110,marginLeft:'auto',margin:19,borderBottomEndRadius:30}}>
    <Button title='Back' style={{marginTop:70,borderRadius:10,borderBottomEndRadius:30}}/>
    </View>
    </View>
    </ImageBackground>
  
  )
}
